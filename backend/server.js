// backend/server.js
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

const supabaseUrl = 'https://ttjorlieygyiqsjynsjy.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0am9ybGlleWd5aXFzanluc2p5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDA2NDgxNiwiZXhwIjoyMDY5NjQwODE2fQ.X5pmKgVZFrjHHX_Jlmx6k5bEhcObadCwsgRJ47UGQxg'; // Service role key only used on backend

const supabase = createClient(supabaseUrl, supabaseServiceKey);

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    const { uploaded_by } = req.body; // This should be startups.id (UUID)

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    if (!uploaded_by) {
      return res.status(400).json({ error: 'Missing uploaded_by (startup ID).' });
    }

    // Upload file to Supabase Storage in 'uploads' bucket
    const { data: storageData, error: storageError } = await supabase.storage
      .from('uploads')
      .upload(`${uploaded_by}/${Date.now()}_${file.originalname}`, file.buffer, {
        contentType: file.mimetype,
      });

    if (storageError) throw storageError;

    // Construct public URL for the uploaded file
    const fileUrl = `${supabaseUrl}/storage/v1/object/public/uploads/${storageData.path}`;

    // Insert metadata into files table
    const { error: insertError } = await supabase
      .from('files')
      .insert([
        {
          file_name: file.originalname,
          file_url: fileUrl,
          uploaded_at: new Date().toISOString(),
          uploaded_by,
        },
      ]);

    if (insertError) throw insertError;

    res.json({ message: '✅ File uploaded successfully', fileUrl });
  } catch (err) {
    console.error('Upload failed:', err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
