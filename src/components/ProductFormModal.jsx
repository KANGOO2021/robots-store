import { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import { Modal } from 'bootstrap';

/**
 * Modal para agregar o editar un producto.
 * Soporta carga de imágenes desde la PC y subida a Cloudinary.
 */
export default function ProductFormModal({ show, onClose, onSave, initialData = null }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    details: '',
    price: '',
    stock: '',
    image: ''
  });

  const modalRef = useRef(null);
  const bsModal = useRef(null);

  // Muestra u oculta el modal según el estado externo
  useEffect(() => {
    if (!bsModal.current) {
      bsModal.current = new Modal(modalRef.current, {
        backdrop: 'static',
        keyboard: false,
      });
    }
    show ? bsModal.current.show() : bsModal.current.hide();
  }, [show]);

  // Carga los datos iniciales si se edita un producto
  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || '',
        description: initialData.description || '',
        details: initialData.details || '',
        price: initialData.price !== undefined ? String(initialData.price) : '',
        stock: initialData.stock !== undefined ? String(initialData.stock) : '',
        image: initialData.image || ''
      });
    } else {
      setForm({
        title: '',
        description: '',
        details: '',
        price: '',
        stock: '',
        image: ''
      });
    }
  }, [initialData]);

  // Maneja los cambios de los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Enviar formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.price || !form.stock) {
      Swal.fire('Atención', 'Título, precio y stock son obligatorios', 'warning');
      return;
    }
    onSave({
      ...form,
      price: parseFloat(form.price),
      stock: parseInt(form.stock, 10)
    });
  };

  // Cierra el modal
  const handleClose = () => {
    bsModal.current.hide();
    onClose();
  };

  // Sube imagen a Cloudinary
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validaciones
    if (!file.type.startsWith('image/')) {
      Swal.fire('Archivo inválido', 'El archivo debe ser una imagen', 'error');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      Swal.fire('Muy grande', 'La imagen debe pesar menos de 2MB', 'warning');
      return;
    }

    Swal.fire({ title: 'Subiendo imagen...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'robots_upload'); // Usar tu upload preset

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/ddyxr8ikt/image/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (data.secure_url) {
        setForm(prev => ({ ...prev, image: data.secure_url }));
        Swal.fire('Listo', 'Imagen subida con éxito', 'success');
      } else {
        throw new Error('Fallo la subida');
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'No se pudo subir la imagen', 'error');
    }
  };

  return (
    <div
      className="modal fade"
      tabIndex="-1"
      ref={modalRef}
      aria-hidden="true"
      aria-labelledby="productModalTitle"
      role="dialog"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title" id="productModalTitle">
                {initialData ? 'Editar producto' : 'Agregar nuevo producto'}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleClose}
                aria-label="Cerrar modal"
              ></button>
            </div>
            <div className="modal-body">

              <div className="mb-3">
                <label htmlFor="inputTitle" className="form-label">Título*</label>
                <input
                  type="text"
                  id="inputTitle"
                  className="form-control"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  aria-required="true"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="inputDescription" className="form-label">Descripción corta</label>
                <textarea
                  id="inputDescription"
                  className="form-control"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={2}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="inputDetails" className="form-label">Detalles</label>
                <textarea
                  id="inputDetails"
                  className="form-control"
                  name="details"
                  value={form.details}
                  onChange={handleChange}
                  rows={4}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="inputPrice" className="form-label">Precio*</label>
                <input
                  type="number"
                  step="0.01"
                  id="inputPrice"
                  className="form-control"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  required
                  aria-required="true"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="inputStock" className="form-label">Stock*</label>
                <input
                  type="number"
                  id="inputStock"
                  className="form-control"
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                  required
                  aria-required="true"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="inputImage" className="form-label">URL Imagen o seleccionar archivo</label>
                <input
                  type="text"
                  id="inputImage"
                  className="form-control mb-2"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="URL o usar archivo abajo"
                />

                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  onChange={handleImageUpload}
                />

                {form.image && (
                  <div className="text-center mt-2">
                    <img
                      src={form.image}
                      alt="Vista previa"
                      style={{
                        maxWidth: '150px',
                        maxHeight: '150px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        border: '1px solid #ddd',
                        padding: '4px',
                      }}
                    />
                  </div>
                )}
              </div>

            </div>

            <div className="modal-footer">
              <button type="submit" className="btn btn-success">
                {initialData ? 'Actualizar' : 'Agregar'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleClose}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}




