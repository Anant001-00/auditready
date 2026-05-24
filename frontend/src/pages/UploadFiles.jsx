// // src/pages/Dashboard.jsx
// import React, { useEffect, useState } from 'react';
// import { supabase } from '../supabaseClient';

// export default function UploadFiles() {
//   const [files, setFiles] = useState([]);
//   const [uploading, setUploading] = useState(false);
//   const [message, setMessage] = useState('');
//   const [user, setUser] = useState(null);
//   const [startupId, setStartupId] = useState(null); // Added startup ID state

//   useEffect(() => {
//     async function fetchUser() {
//       const { data } = await supabase.auth.getUser();
//       if (data?.user) setUser(data.user);
//     }
//     fetchUser();
//   }, []);

//   // Fetch startup ID for logged in user
//   useEffect(() => {
//     if (!user) return;

//     async function fetchStartup() {
//       const { data, error } = await supabase
//         .from('startups')
//         .select('id')
//         .eq('user_id', user.id)
//         .single();

//       if (error) {
//         console.error('Error fetching startup:', error);
//         setMessage('❌ Could not find your startup record.');
//       } else {
//         setStartupId(data.id);
//       }
//     }

//     fetchStartup();
//   }, [user]);

//   useEffect(() => {
//     if (!startupId) return;
//     fetchFiles();

//     const channel = supabase
//       .channel('file-updates')
//       .on(
//         'postgres_changes',
//         { event: 'INSERT', schema: 'public', table: 'files' },
//         (payload) => {
//           // Filter by startupId now, not user.id
//           if (payload.new.uploaded_by === startupId) {
//             setFiles((prev) => [payload.new, ...prev]);
//           }
//         }
//       )
//       .subscribe();

//     return () => {
//       supabase.removeChannel(channel);
//     };
//   }, [startupId]);

//   async function fetchFiles() {
//     const { data, error } = await supabase
//       .from('files')
//       .select('*')
//       .eq('uploaded_by', startupId)
//       .order('uploaded_at', { ascending: false });

//     if (error) {
//       console.error('Error fetching files:', error);
//       setMessage('❌ Could not fetch files');
//     } else {
//       setFiles(data);
//     }
//   }

//   async function handleFileUpload(e) {
//     const file = e.target.files[0];
//     if (!file || !startupId) {
//       setMessage('❌ File or startup info missing.');
//       return;
//     }

//     setUploading(true);
//     setMessage('');

//     // Build form data with file and startup ID (uploaded_by)
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('uploaded_by', startupId);  // <-- send startup id here

//     try {
//       const res = await fetch('http://localhost:5000/upload', {
//         method: 'POST',
//         body: formData,
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setMessage('✅ File uploaded successfully!');
//         fetchFiles();
//       } else {
//         setMessage('❌ Upload failed: ' + (data.error || 'Unknown error'));
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage('❌ Upload request failed');
//     }

//     setUploading(false);
//   }

//   if (!user) {
//     return <div className="text-center p-10">Loading user info...</div>;
//   }

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-6">
//       <h2 className="text-2xl font-semibold mb-4">📂 Your Uploaded Files</h2>

//       <input
//         type="file"
//         onChange={handleFileUpload}
//         disabled={uploading}
//         className="mb-4"
//       />
//       {message && <p>{message}</p>}

//       {files.length === 0 ? (
//         <p>No files uploaded yet.</p>
//       ) : (
//         <ul className="list-disc pl-5">
//           {files.map((file) => (
//             <li key={file.id} className="mb-2">
//               <a
//                 href={file.file_url}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="text-blue-600 hover:underline"
//               >
//                 {file.file_name}
//               </a>{' '}
//               <span className="text-gray-500 text-sm">
//                 ({new Date(file.uploaded_at).toLocaleString()})
//               </span>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }


import React, { useEffect, useState, useCallback } from 'react';
import { supabase } from '../supabaseClient';

export default function UploadFiles() {
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);
  const [startupId, setStartupId] = useState(null);

  // Fetch user
  useEffect(() => {
    async function fetchUser() {
      const { data } = await supabase.auth.getUser();
      if (data?.user) setUser(data.user);
    }
    fetchUser();
  }, []);

  // Fetch startup ID
  useEffect(() => {
    if (!user) return;

    async function fetchStartup() {
      const { data, error } = await supabase
        .from('startups')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (error) {
        setMessage('❌ Could not find your startup record.');
      } else {
        setStartupId(data.id);
      }
    }

    fetchStartup();
  }, [user]);

  // fetchFiles wrapped in useCallback to fix useEffect dependency warning
  const fetchFiles = useCallback(async () => {
    if (!startupId) return;

    const { data, error } = await supabase
      .from('files')
      .select('*')
      .eq('uploaded_by', startupId)
      .order('uploaded_at', { ascending: false });

    if (error) {
      setMessage('❌ Could not fetch files');
    } else {
      setFiles(data);
    }
  }, [startupId]);

  // Fetch files and subscribe to updates
  useEffect(() => {
    if (!startupId) return;

    fetchFiles();

    const channel = supabase
      .channel('file-updates')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'files' },
        (payload) => {
          if (payload.new.uploaded_by === startupId) {
            setFiles((prev) => [payload.new, ...prev]);
          }
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [startupId, fetchFiles]); // added fetchFiles to dependency

  if (!user) {
    return <div className="text-center p-10">Loading user info...</div>;
  }

  return (
    <div
      className="min-h-screen w-full relative overflow-hidden
                 bg-gradient-to-br from-[#0b0f1a] via-[#0e1426] to-[#0b0f1a]
                 flex items-center justify-center px-4"
    >
      {/* DEPTH GLOWS */}
      <div className="absolute top-24 left-32 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-24 right-32 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl" />

      {/* GLASS CARD */}
      <div
        className="relative z-10 w-full max-w-3xl p-8 rounded-2xl
                   bg-white/10 backdrop-blur-xl
                   border border-white/20
                   shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)]"
      >
        <h2 className="text-3xl font-bold text-white mb-6">
          📂 Your Uploaded Files
        </h2>

        {message && <p className="mb-4 text-sm text-white/80">{message}</p>}

        {files.length === 0 ? (
          <p className="text-white/70">No files uploaded yet.</p>
        ) : (
          <ul className="space-y-4">
            {files.map((file) => (
              <li
                key={file.id}
                className="flex items-center justify-between
                           p-4 rounded-xl
                           bg-white/10
                           border border-white/20
                           hover:bg-white/20 transition"
              >
                <div>
                  <a
                    href={file.file_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 font-medium hover:underline"
                  >
                    {file.file_name}
                  </a>
                  <div className="text-xs text-white/60 mt-1">
                    {new Date(file.uploaded_at).toLocaleString()}
                  </div>
                </div>

                <span className="text-xs px-3 py-1 rounded-full
                                 bg-cyan-400/10 text-cyan-300">
                  Uploaded
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
