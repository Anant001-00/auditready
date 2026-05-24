import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function FileList() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchFiles();
  }, []);

  async function fetchFiles() {
    const { data, error } = await supabase
      .from("files")
      .select("*")
      .order("uploaded_at", { ascending: false });

    if (error) {
      console.error("Error fetching files:", error);
    } else {
      setFiles(data);
    }
  }

  return (
    <div>
      <h2>Uploaded Files</h2>
      {files.length === 0 ? (
        <p>No files uploaded yet.</p>
      ) : (
        <ul>
          {files.map((file) => (
            <li key={file.id}>
              <a href={file.file_url} target="_blank" rel="noreferrer">
                {file.file_name}
              </a>{" "}
              <span>({new Date(file.uploaded_at).toLocaleString()})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
