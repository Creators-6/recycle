import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const AIAssistant = () => {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleImageUpload = async () => {
    if (!image || !description) {
      alert('Please select an image and enter a description.');
      return;
    }

    setUploading(true);
    setMessage('');

    try {
      // Upload image to Cloudinary
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'ml_default'); // Default unsigned preset
      formData.append('cloud_name', 'dxmjv8vff');

      const res = await fetch('https://api.cloudinary.com/v1_1/dxmjv8vff/image/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      // Store in Firestore
      await addDoc(collection(db, 'uploads'), {
        description,
        imageUrl: data.secure_url,
        createdAt: serverTimestamp(),
      });

      setMessage('✅ Upload successful!');
      setDescription('');
      setImage(null);
    } catch (error) {
      console.error('Upload failed:', error);
      setMessage('❌ Upload failed. Try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ padding: 12 }}>
      <h3 style={{ color: '#2E7D32', fontWeight: 'bold' }}>AI Assistant</h3>

      <textarea
        rows="3"
        placeholder="Describe your e-waste item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{
          width: '100%',
          padding: 10,
          marginTop: 12,
          borderRadius: 8,
          border: '1px solid #ccc',
          fontSize: 14,
        }}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        style={{ marginTop: 12 }}
      />

      <button
        onClick={handleImageUpload}
        disabled={uploading}
        style={{
          marginTop: 16,
          padding: '10px 20px',
          backgroundColor: '#2E7D32',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        {uploading ? 'Uploading...' : 'Upload & Analyze'}
      </button>

      {message && <p style={{ marginTop: 12, color: '#2E7D32' }}>{message}</p>}
    </div>
  );
};

export default AIAssistant;
