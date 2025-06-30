import React, { useState } from 'react';

const ImageUploader = ({ onUpload }) => {
  const [previewUrl, setPreviewUrl] = useState('');

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'robots_upload'); // Tu preset
    formData.append('folder', 'products'); // Opcional, crea carpeta 'products'

    const res = await fetch('https://api.cloudinary.com/v1_1/ddyxr8ikt/image/upload', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    setPreviewUrl(data.secure_url);
    onUpload(data.secure_url); // Envía la URL a tu formulario o donde quieras usarla
  };

  return (
    <div className="mb-3">
      <label className="form-label">Subir imagen del producto</label>
      <input type="file" accept="image/*" className="form-control" onChange={handleUpload} />
      {previewUrl && (
        <img src={previewUrl} alt="Vista previa" style={{ marginTop: '1rem', width: '200px' }} />
      )}
    </div>
  );
};

export default ImageUploader;
