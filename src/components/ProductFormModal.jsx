import { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import { Modal } from 'bootstrap';

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

  useEffect(() => {
    if (!bsModal.current) {
      bsModal.current = new Modal(modalRef.current, {
        backdrop: 'static',
        keyboard: false,
      });
    }

    if (show) {
      bsModal.current.show();
    } else {
      bsModal.current.hide();
    }
  }, [show]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

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

  const handleClose = () => {
    bsModal.current.hide();
    onClose();
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
                <label htmlFor="inputImage" className="form-label">URL Imagen</label>
                <input
                  type="text"
                  id="inputImage"
                  className="form-control"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                />
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


