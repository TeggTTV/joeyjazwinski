import React, { useState } from 'react';

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;
    setUploading(true);
    setError(null);
    setUploadedUrl(null);
    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
      const res = await fetch('/api/uploadImage', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setUploadedUrl(data.url);
      } else {
        setError(data.message || 'Upload failed');
      }
    } catch (err) {
      setError('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Upload Image</h1>
      <form onSubmit={handleUpload} className="flex flex-col gap-4">
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={!selectedFile || uploading}
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      {uploadedUrl && (
        <div className="mt-4">
          <p className="text-green-600">Upload successful!</p>
          <img src={uploadedUrl} alt="Uploaded" className="mt-2 max-w-full rounded shadow" />
        </div>
      )}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
};

export default UploadPage;
