import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://feujocmkbcambiyvcbss.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZldWpvY21rYmNhbWJpeXZjYnNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4ODkzODgsImV4cCI6MjA4MTQ2NTM4OH0.6vdr6Zcrs6BMzKTL83GX40X8vUccO3IeGVOcZL4XsGA"
);

export default function TestPage() {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState(null);

  // Handle file input change
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  // Upload image to Supabase
  const fileUpload = async () => {
    if (!image) {
      alert("Please select an image first!");
      return;
    }

    setUploading(true);

    // Generate a unique file name
    const fileName = `${Date.now()}_${image.name}`;

    // Upload to 'images' bucket (create this bucket in Supabase first)
    const { data, error } = await supabase.storage
      .from("images")
      .upload(fileName, image);

    if (error) {
      console.error("Upload error:", error);
      alert("Upload failed!");
    } else {
      // Get public URL
      const { publicURL, error: urlError } = supabase.storage
        .from("images")
        .getPublicUrl(fileName);

      if (urlError) {
        console.error("URL error:", urlError);
      } else {
        setUploadedUrl(publicURL);
      }
    }

    setUploading(false);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center flex-col bg-red-900 md:bg-blue-900 text-white p-4">
      <h1 className="mb-4 text-2xl">Welcome to the Test Page</h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />

      <button
        onClick={fileUpload}
        disabled={uploading}
        className="bg-white text-red-900 px-4 py-2 rounded font-bold mb-4"
      >
        {uploading ? "Uploading..." : "Upload Image"}
      </button>

      {uploadedUrl && (
        <div className="mt-4 flex flex-col items-center">
          <p className="mb-2">Uploaded Image:</p>
          <img src={uploadedUrl} alt="Uploaded" className="max-w-xs rounded" />
        </div>
      )}
    </div>
  );
}
