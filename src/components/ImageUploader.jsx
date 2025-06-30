import React, { useState } from 'react';

const ImageUploader = ({ onUpload }) => {
  const [previewUrl, setPreviewUrl] = useState('');

  /**
   * Maneja la subida de archivos a Cloudinary.
   * Se construye un FormData con el archivo seleccionado y se envía por POST.
   * Al finalizar, actualiza la vista previa y devuelve la URL subida mediante `onUpload`.
   */
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'robots_upload'); // Nombre del preset configurado en Cloudinary
    formData.append('folder', 'products'); // Carpeta opcional para organizar en Cloudinary

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/ddyxr8ikt/image/upload', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();

      if (data.secure_url) {
        setPreviewUrl(data.secure_url);     // Muestra vista previa
        onUpload(data.secure_url);          // Devuelve la URL al componente padre
      } else {
        console.error('Error al subir imagen a Cloudinary', data);
      }
    } catch (error) {
      console.error('Error en la carga de imagen:', error);
    }
  };

  return (
    <div className="mb-3">
      <label htmlFor="product-image" className="form-label">Subir imagen del producto</label>
      <input
        type="file"
        accept="image/*"
        className="form-control"
        id="product-image"
        aria-label="Selector de imagen para el producto"
        onChange={handleUpload}
      />

      {previewUrl && (
        <img
          src={previewUrl}
          alt="Vista previa de la imagen seleccionada"
          style={{ marginTop: '1rem', width: '200px' }}
          role="img"
          aria-label="Imagen cargada como vista previa"
        />
      )}
    </div>
  );
};

export default ImageUploader;

