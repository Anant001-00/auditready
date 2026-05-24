// import React, { useState, useEffect } from 'react';
// import { supabase } from '../supabaseClient';

// export default function Upload() {
//   const [uploading, setUploading] = useState(false);
//   const [message, setMessage] = useState('');
//   const [startupId, setStartupId] = useState(null);

//   useEffect(() => {
//     const fetchStartup = async () => {
//       const user = supabase.auth.user();
//       if (!user) return;

//       const { data, error } = await supabase
//         .from('startups')
//         .select('id')
//         .eq('user_id', user.id)
//         .single();

//       if (error) {
//         setMessage('Failed to fetch startup info: ' + error.message);
//       } else {
//         setStartupId(data.id);
//       }
//     };

//     fetchStartup();
//   }, []);

//   async function handleFileUpload(e) {
//     const file = e.target.files[0];
//     if (!file || !startupId) {
//       setMessage('File or startup ID missing.');
//       return;
//     }

//     setUploading(true);
//     setMessage('');

//     const filePath = `${Date.now()}_${file.name}`;
//     const { error: uploadError } = await supabase.storage
//       .from('uploads')
//       .upload(filePath, file);

//     if (uploadError) {
//       setMessage('❌ Upload failed!');
//       setUploading(false);
//       return;
//     }

//     const { data: publicUrlData } = supabase.storage
//       .from('uploads')
//       .getPublicUrl(filePath);

//     const { error: insertError } = await supabase
//       .from('files')
//       .insert([
//         {
//           file_name: file.name,
//           file_url: publicUrlData.publicUrl,
//           uploaded_by: startupId,
//         },
//       ]);

//     if (insertError) {
//       setMessage('❌ Could not save file details!');
//     } else {
//       setMessage('✅ File uploaded successfully!');
//     }

//     setUploading(false);
//   }

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.heading}>📤 Upload a File</h2>
//       <input
//         type="file"
//         onChange={handleFileUpload}
//         disabled={uploading}
//         style={styles.fileInput}
//       />
//       {message && <p style={styles.message}>{message}</p>}
//     </div>
//   );
// }

// const styles = {
//   container: {
//     maxWidth: '400px',
//     margin: '20px auto',
//     padding: '20px',
//     background: '#fff',
//     borderRadius: '12px',
//     boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
//     textAlign: 'center',
//   },
//   heading: { marginBottom: '15px', color: '#333' },
//   fileInput: { marginTop: '10px' },
//   message: { marginTop: '10px', color: '#555' },
// };


import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import Tesseract from 'tesseract.js';

// ─── helpers ────────────────────────────────────────────────────────────────

/** Pull every number that looks like an amount from raw OCR text */
function extractAmounts(text) {
  // matches: 1,234.56 / 1234.56 / 1234 / $1,234 etc.
  const matches = text.match(/[\$₹€£]?\s*\d{1,3}(?:[,\s]\d{3})*(?:\.\d{1,2})?/g) || [];
  return matches.map((m) => parseFloat(m.replace(/[^0-9.]/g, ''))).filter(Boolean);
}

/** Pull dates in common formats: DD/MM/YYYY, MM-DD-YYYY, YYYY-MM-DD, Month DD YYYY */
function extractDates(text) {
  const patterns = [
    /\b(\d{4}[-/]\d{2}[-/]\d{2})\b/g,               // ISO
    /\b(\d{2}[-/]\d{2}[-/]\d{4})\b/g,               // DD/MM or MM/DD
    /\b([A-Za-z]+ \d{1,2},?\s*\d{4})\b/g,           // Month DD YYYY
    /\b(\d{1,2} [A-Za-z]+ \d{4})\b/g,               // DD Month YYYY
  ];
  const found = new Set();
  for (const pat of patterns) {
    let m;
    pat.lastIndex = 0;
    while ((m = pat.exec(text)) !== null) found.add(m[1]);
  }
  return [...found].map((d) => {
    const parsed = new Date(d);
    return isNaN(parsed) ? null : parsed.toISOString().split('T')[0];
  }).filter(Boolean);
}

// ─── component ──────────────────────────────────────────────────────────────

const STEPS = ['idle', 'reading', 'validating', 'uploading', 'done', 'error'];

export default function Upload() {
  const [startupId, setStartupId] = useState(null);
  const [startupName, setStartupName] = useState('');
  const [step, setStep] = useState('idle');       // idle | reading | validating | uploading | done | error
  const [progress, setProgress] = useState(0);    // OCR progress 0-100
  const [message, setMessage] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const inputRef = useRef();
  const navigate = useNavigate();

  // ── fetch startup ──────────────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setMessage('Not logged in.'); return; }

      const { data, error } = await supabase
        .from('startups')
        .select('id, startup_name')
        .eq('user_id', user.id)
        .single();

      if (error) { setMessage('Could not load startup info.'); return; }
      setStartupId(data.id);
      setStartupName(data.startup_name || '');
    })();
  }, []);

  // ── file selection ─────────────────────────────────────────────────────────
  const handleFileSelect = (file) => {
    if (!file) return;
    const allowed = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf', 'image/webp'];
    if (!allowed.includes(file.type)) {
      setMessage('Please upload a PDF or image file (PNG, JPG, WEBP).');
      setStep('error');
      return;
    }
    setSelectedFile(file);
    setStep('idle');
    setMessage('');
  };

  // ── main pipeline ──────────────────────────────────────────────────────────
  const handleProcess = async () => {
    if (!selectedFile || !startupId) return;

    // STEP 1 — OCR
    setStep('reading');
    setProgress(0);
    setMessage('');

    let ocrText = '';
    try {
      const result = await Tesseract.recognize(selectedFile, 'eng', {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            setProgress(Math.round(m.progress * 100));
          }
        },
      });
      ocrText = result.data.text;
    } catch {
      setStep('error');
      setMessage('OCR failed — could not read the document. Please try a clearer image.');
      return;
    }

    // STEP 2 — extract amounts + dates
    setStep('validating');
    const amounts = extractAmounts(ocrText);
    const dates   = extractDates(ocrText);

    if (!amounts.length || !dates.length) {
      setStep('error');
      setMessage(
        'Could not find recognisable amounts or dates in the document. ' +
        'Please ensure the file contains clear financial data.'
      );
      return;
    }

    // STEP 3 — compare with transactions table
    // Query: any transaction whose date matches AND amount is in the extracted list
    const { data: matches, error: txErr } = await supabase
      .from('transactions')
      .select('id, date, amount')
      .eq('startup_id', startupId)
      .in('date', dates);

    if (txErr) {
      setStep('error');
      setMessage('Could not verify against transaction records.');
      return;
    }

    // Check if at least one transaction amount matches extracted amounts (within ₹1 tolerance)
    const verified = (matches || []).some((tx) =>
      amounts.some((a) => Math.abs(a - parseFloat(tx.amount)) < 1)
    );

    if (!verified) {
      // ── FLAG startup in investor dashboard ────────────────────────────────
      await supabase
        .from('startups')
        .update({ flagged: true, flag_reason: 'Uploaded document did not match transaction records.' })
        .eq('id', startupId);

      setStep('error');
      setMessage(
        '⚠ Document could not be verified against your transaction records. ' +
        'Your account has been flagged. Please contact your investor or upload the correct document.'
      );
      return;
    }

    // STEP 4 — upload to Supabase Storage
    setStep('uploading');
    const filePath = `${startupId}/${Date.now()}_${selectedFile.name}`;

    const { error: uploadError } = await supabase.storage
      .from('uploads')
      .upload(filePath, selectedFile);

    if (uploadError) {
      setStep('error');
      setMessage('Storage upload failed. Please try again.');
      return;
    }

    const { data: urlData } = supabase.storage.from('uploads').getPublicUrl(filePath);

    const { error: insertError } = await supabase.from('files').insert([{
      file_name: selectedFile.name,
      file_url:  urlData.publicUrl,
      uploaded_by: startupId,
    }]);

    if (insertError) {
      setStep('error');
      setMessage('File saved but record insertion failed.');
      return;
    }

    setStep('done');
    setMessage('Document verified and uploaded successfully.');
    setTimeout(() => navigate('/upload-files'), 1800);
  };

  // ── drag & drop ────────────────────────────────────────────────────────────
  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  // ── derived UI state ───────────────────────────────────────────────────────
  const isProcessing = ['reading', 'validating', 'uploading'].includes(step);
  const statusLabel = {
    idle:       selectedFile ? 'Ready to verify & upload' : 'Drop a file or click to browse',
    reading:    `Reading document… ${progress}%`,
    validating: 'Verifying against transaction records…',
    uploading:  'Uploading to secure storage…',
    done:       'Verified & uploaded ✓',
    error:      'Upload blocked',
  }[step];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Josefin+Sans:wght@300;400;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .up-root {
          min-height: 100vh;
          background: #07090f;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 5rem 1.5rem 3rem;
          position: relative;
          overflow: hidden;
          font-family: 'Josefin Sans', sans-serif;
        }

        /* grid */
        .up-grid {
          position: fixed; inset: 0;
          background-image:
            linear-gradient(rgba(0,212,255,0.028) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.028) 1px, transparent 1px);
          background-size: 56px 56px;
          pointer-events: none; z-index: 0;
        }
        .up-glow-tl {
          position: fixed; top: -100px; left: -100px;
          width: 420px; height: 420px; border-radius: 50%;
          background: radial-gradient(circle, rgba(0,212,255,0.09), transparent 68%);
          pointer-events: none; z-index: 0;
        }
        .up-glow-br {
          position: fixed; bottom: -100px; right: -100px;
          width: 380px; height: 380px; border-radius: 50%;
          background: radial-gradient(circle, rgba(0,180,220,0.06), transparent 68%);
          pointer-events: none; z-index: 0;
        }
        .up-scanline {
          position: fixed; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, rgba(0,212,255,0.07), transparent);
          animation: scanline 10s linear infinite;
          pointer-events: none; z-index: 1;
        }
        @keyframes scanline {
          from { transform: translateY(0); }
          to   { transform: translateY(100vh); }
        }

        /* card */
        .up-card {
          position: relative; z-index: 2;
          width: 100%; max-width: 520px;
          background: linear-gradient(160deg, #0d1220 0%, #080b14 100%);
          border: 1px solid rgba(0,212,255,0.22);
          border-radius: 20px;
          padding: 2.8rem 2.5rem 2.5rem;
          box-shadow: 0 0 60px rgba(0,212,255,0.06), 0 32px 80px rgba(0,0,0,0.55);
          animation: fadeUp 0.5s ease both;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* top accent bar */
        .up-topbar {
          position: absolute; top: 0; left: 20px; right: 20px; height: 2px;
          background: linear-gradient(90deg, transparent, #00d4ff, transparent);
          border-radius: 0 0 2px 2px;
        }

        /* eyebrow */
        .up-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 0.65rem; font-weight: 600;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: rgba(0,212,255,0.65);
          margin-bottom: 0.9rem;
        }
        .up-eyebrow-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #00d4ff;
          animation: pulse-dot 2s ease infinite;
        }
        @keyframes pulse-dot {
          0%,100% { opacity:0.5; transform:scale(1); }
          50%      { opacity:1;   transform:scale(1.35); }
        }

        /* title */
        .up-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem; font-weight: 700;
          letter-spacing: -0.02em;
          background: linear-gradient(120deg, #ffffff 0%, #00d4ff 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.4rem;
        }
        .up-subtitle {
          font-size: 0.75rem; font-weight: 300;
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.06em;
          margin-bottom: 2rem;
        }

        /* divider */
        .up-divider {
          height: 1px; margin-bottom: 1.8rem;
          background: linear-gradient(90deg, transparent, rgba(0,212,255,0.2), transparent);
        }

        /* drop zone */
        .up-dropzone {
          border: 1.5px dashed rgba(0,212,255,0.3);
          border-radius: 14px;
          padding: 2.2rem 1.5rem;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 0.7rem;
          cursor: pointer;
          transition: border-color 0.25s, background 0.25s;
          background: transparent;
          position: relative;
          margin-bottom: 1.6rem;
        }
        .up-dropzone:hover, .up-dropzone.drag-over {
          border-color: rgba(0,212,255,0.65);
          background: rgba(0,212,255,0.04);
        }
        .up-dropzone-icon {
          width: 44px; height: 44px;
          border-radius: 10px;
          background: rgba(0,212,255,0.08);
          border: 1px solid rgba(0,212,255,0.2);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 0.3rem;
        }
        .up-dropzone-label {
          font-size: 0.8rem; font-weight: 400;
          color: rgba(255,255,255,0.55);
          letter-spacing: 0.05em;
          text-align: center;
        }
        .up-dropzone-label strong {
          color: #00d4ff; font-weight: 600;
        }
        .up-dropzone-hint {
          font-size: 0.65rem; color: rgba(255,255,255,0.25);
          letter-spacing: 0.08em; text-transform: uppercase;
        }
        .up-selected-file {
          display: flex; align-items: center; gap: 10px;
          padding: 0.65rem 1rem;
          background: rgba(0,212,255,0.06);
          border: 1px solid rgba(0,212,255,0.18);
          border-radius: 8px;
          margin-bottom: 1.6rem;
        }
        .up-selected-name {
          font-size: 0.78rem; color: #00d4ff;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          flex: 1;
        }
        .up-clear-btn {
          background: none; border: none; cursor: pointer;
          color: rgba(255,255,255,0.3); font-size: 1rem;
          line-height: 1; padding: 0;
          transition: color 0.2s;
        }
        .up-clear-btn:hover { color: rgba(255,100,100,0.7); }

        /* progress bar */
        .up-progress-wrap {
          height: 3px; border-radius: 2px;
          background: rgba(0,212,255,0.1);
          margin-bottom: 1.6rem; overflow: hidden;
        }
        .up-progress-fill {
          height: 100%; border-radius: 2px;
          background: linear-gradient(90deg, #00d4ff, #7dd3fc);
          transition: width 0.2s ease;
          box-shadow: 0 0 8px rgba(0,212,255,0.5);
        }

        /* status */
        .up-status {
          font-size: 0.7rem; letter-spacing: 0.1em;
          text-transform: uppercase; text-align: center;
          margin-bottom: 1.4rem;
        }
        .up-status.reading    { color: rgba(0,212,255,0.7); }
        .up-status.validating { color: rgba(0,212,255,0.7); }
        .up-status.uploading  { color: rgba(0,212,255,0.7); }
        .up-status.done       { color: #4ade80; }
        .up-status.error      { color: #f87171; }
        .up-status.idle       { color: rgba(255,255,255,0.35); }

        /* message box */
        .up-message {
          font-size: 0.78rem; font-weight: 300; line-height: 1.65;
          padding: 0.85rem 1rem;
          border-radius: 10px;
          margin-bottom: 1.5rem;
          letter-spacing: 0.02em;
        }
        .up-message.error {
          background: rgba(248,113,113,0.07);
          border: 1px solid rgba(248,113,113,0.22);
          color: #fca5a5;
        }
        .up-message.success {
          background: rgba(74,222,128,0.07);
          border: 1px solid rgba(74,222,128,0.22);
          color: #86efac;
        }

        /* button */
        .up-btn {
          width: 100%; padding: 0.9rem;
          border: none; border-radius: 10px; cursor: pointer;
          font-family: 'Josefin Sans', sans-serif;
          font-size: 0.78rem; font-weight: 600;
          letter-spacing: 0.18em; text-transform: uppercase;
          transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
          background: linear-gradient(135deg, rgba(0,212,255,0.18), rgba(0,180,220,0.1));
          border: 1px solid rgba(0,212,255,0.4);
          color: #00d4ff;
          box-shadow: 0 0 20px rgba(0,212,255,0.08);
        }
        .up-btn:hover:not(:disabled) {
          opacity: 0.9;
          transform: translateY(-1px);
          box-shadow: 0 0 28px rgba(0,212,255,0.2);
        }
        .up-btn:disabled {
          opacity: 0.4; cursor: not-allowed; transform: none;
        }

        /* spinner */
        @keyframes spin { to { transform: rotate(360deg); } }
        .up-spinner {
          display: inline-block;
          width: 13px; height: 13px;
          border: 1.5px solid rgba(0,212,255,0.3);
          border-top-color: #00d4ff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          margin-right: 8px;
          vertical-align: middle;
        }
      `}</style>

      <div className="up-root">
        <div className="up-grid" />
        <div className="up-glow-tl" />
        <div className="up-glow-br" />
        <div className="up-scanline" />

        <div className="up-card">
          <div className="up-topbar" />

          <div className="up-eyebrow">
            <div className="up-eyebrow-dot" />
            {startupName || 'Startup'} · Secure Upload
          </div>

          <h1 className="up-title">Upload Document</h1>
          <p className="up-subtitle">
            Financial records are verified against your transactions before storage
          </p>
          <div className="up-divider" />

          {/* Drop zone */}
          {!selectedFile ? (
            <div
              className={`up-dropzone${dragOver ? ' drag-over' : ''}`}
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
            >
              <div className="up-dropzone-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M12 15V3M12 3L8 7M12 3L16 7" stroke="#00d4ff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3 17v1a3 3 0 003 3h12a3 3 0 003-3v-1" stroke="#00d4ff" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </div>
              <p className="up-dropzone-label">
                <strong>Click to browse</strong> or drag & drop
              </p>
              <p className="up-dropzone-hint">PDF · PNG · JPG · WEBP</p>
              <input
                ref={inputRef}
                type="file"
                accept=".pdf,.png,.jpg,.jpeg,.webp"
                style={{ display: 'none' }}
                onChange={(e) => handleFileSelect(e.target.files[0])}
              />
            </div>
          ) : (
            <div className="up-selected-file">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="#00d4ff" strokeWidth="1.4" />
                <polyline points="14 2 14 8 20 8" stroke="#00d4ff" strokeWidth="1.4" />
              </svg>
              <span className="up-selected-name">{selectedFile.name}</span>
              <button
                className="up-clear-btn"
                onClick={() => { setSelectedFile(null); setStep('idle'); setMessage(''); }}
                title="Remove file"
              >×</button>
            </div>
          )}

          {/* Progress bar — only during OCR */}
          {step === 'reading' && (
            <div className="up-progress-wrap">
              <div className="up-progress-fill" style={{ width: `${progress}%` }} />
            </div>
          )}

          {/* Status label */}
          <div className={`up-status ${step}`}>{statusLabel}</div>

          {/* Message */}
          {message && (
            <div className={`up-message ${step === 'done' ? 'success' : 'error'}`}>
              {message}
            </div>
          )}

          {/* CTA button */}
          <button
            className="up-btn"
            onClick={handleProcess}
            disabled={!selectedFile || isProcessing || step === 'done'}
          >
            {isProcessing && <span className="up-spinner" />}
            {isProcessing ? statusLabel : 'Verify & Upload'}
          </button>
        </div>
      </div>
    </>
  );
}