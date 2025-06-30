import { useState } from 'react';
import Swal from 'sweetalert2';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function CheckoutForm() {
  const { cart, clearCart, finishPurchase } = useCart();
  const navigate = useNavigate();

  // Estado del formulario de datos del comprador
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    zip: '',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });

  // Manejo de cambio en inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Etiquetas legibles para mostrar en alertas
  const fieldLabels = {
    name: 'Nombre',
    lastName: 'Apellido',
    email: 'Email',
    address: 'Dirección',
    city: 'Ciudad',
    province: 'Provincia',
    zip: 'Código Postal',
    cardNumber: 'Número de tarjeta',
    cardName: 'Tipo de tarjeta',
    expiry: 'Fecha de vencimiento',
    cvv: 'CVV',
  };

  // Validaciones de campos
  const isNumeric = (value) => /^\d+$/.test(value);
  const isAlpha = (value) => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value);
  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const isValidExpiry = (value) => /^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(value);

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ['name', 'lastName', 'email', 'address', 'cardNumber', 'cardName', 'expiry', 'cvv'];

    for (const field of requiredFields) {
      if (!formData[field]) {
        Swal.fire('Campo requerido', `Por favor completá el campo: ${fieldLabels[field]}`, 'warning');
        return;
      }
    }

    // Validaciones específicas
    if (!isAlpha(formData.name)) {
      Swal.fire('Error de validación', 'El Nombre solo debe contener letras.', 'warning');
      return;
    }
    if (!isAlpha(formData.lastName)) {
      Swal.fire('Error de validación', 'El Apellido solo debe contener letras.', 'warning');
      return;
    }
    if (!isValidEmail(formData.email)) {
      Swal.fire('Error de validación', 'Por favor ingresa un email válido.', 'warning');
      return;
    }
    if (formData.zip && !isNumeric(formData.zip)) {
      Swal.fire('Error de validación', 'El Código Postal solo debe contener números.', 'warning');
      return;
    }
    if (!isNumeric(formData.cardNumber) || formData.cardNumber.length < 22) {
      Swal.fire('Error de validación', 'El Número de tarjeta debe tener al menos 22 dígitos y solo contener números.', 'warning');
      return;
    }
    if (!isNumeric(formData.cvv) || formData.cvv.length !== 3) {
      Swal.fire('Error de validación', 'El CVV debe tener 3 dígitos numéricos.', 'warning');
      return;
    }
    if (!isValidExpiry(formData.expiry)) {
      Swal.fire('Error de validación', 'El formato de la Fecha de vencimiento debe ser MM/AA.', 'warning');
      return;
    }
    if (formData.phone && !isNumeric(formData.phone)) {
      Swal.fire('Error de validación', 'El Teléfono solo debe contener números.', 'warning');
      return;
    }
    if (formData.city && !isAlpha(formData.city)) {
      Swal.fire('Error de validación', 'La Ciudad solo debe contener letras.', 'warning');
      return;
    }
    if (formData.province && !isAlpha(formData.province)) {
      Swal.fire('Error de validación', 'La Provincia solo debe contener letras.', 'warning');
      return;
    }

    // Simulación de compra exitosa
    try {
      await finishPurchase();
      Swal.fire({
        icon: 'success',
        title: '¡Compra realizada con éxito! 🛍️',
        text: 'Gracias por tu compra. Pronto recibirás un correo con los detalles.',
        confirmButtonColor: '#28a745',
      }).then(() => {
        clearCart();
        navigate('/');
      });
    } catch (error) {
      // Error controlado si falla la función de compra
      Swal.fire('Error', 'Hubo un problema al finalizar la compra. Intentá nuevamente.', 'error');
      console.error(error);
    }
  };

  // Cálculo total de la compra
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container my-5">
      {/* Helmet para SEO dinámico */}
      <Helmet>
        <title>Checkout - Robots Store</title>
        <meta name="description" content="Formulario de compra para finalizar tu pedido en Robots Store." />
      </Helmet>

      <h2 className="mb-4">Finalizar Compra</h2>

      <form onSubmit={handleSubmit} className="row g-3" aria-label="Formulario de finalización de compra">
        {/* Datos personales */}
        <div className="col-md-6">
          <label htmlFor="name" className="form-label">Nombre *</label>
          <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required aria-required="true" />
        </div>
        <div className="col-md-6">
          <label htmlFor="lastName" className="form-label">Apellido *</label>
          <input type="text" className="form-control" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required aria-required="true" />
        </div>

        <div className="col-md-6">
          <label htmlFor="email" className="form-label">Email *</label>
          <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required aria-required="true" />
        </div>
        <div className="col-md-6">
          <label htmlFor="phone" className="form-label">Teléfono</label>
          <input type="tel" className="form-control" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
        </div>

        {/* Dirección y código postal */}
        <div className="row align-items-center">
          <div className="col-md-8">
            <label htmlFor="address" className="form-label">Dirección *</label>
            <input type="text" className="form-control" id="address" name="address" value={formData.address} onChange={handleChange} required aria-required="true" />
          </div>
          <div className="col-md-4">
            <label htmlFor="zip" className="form-label">Código Postal</label>
            <input type="text" className="form-control" id="zip" name="zip" value={formData.zip} onChange={handleChange} maxLength={10} />
          </div>
        </div>

        {/* Ciudad y Provincia */}
        <div className="col-md-6">
          <label htmlFor="city" className="form-label">Ciudad</label>
          <input type="text" className="form-control" id="city" name="city" value={formData.city} onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <label htmlFor="province" className="form-label">Provincia</label>
          <input type="text" className="form-control" id="province" name="province" value={formData.province} onChange={handleChange} />
        </div>

        {/* Datos de tarjeta */}
        <hr className="mt-4" />
        <h4 className="mb-3">Datos de la tarjeta</h4>

        <div className="col-md-6">
          <label htmlFor="cardName" className="form-label">Tipo de tarjeta *</label>
          <select className="form-select" id="cardName" name="cardName" value={formData.cardName} onChange={handleChange} required aria-required="true">
            <option value="">Seleccioná una opción</option>
            <option value="Visa">Visa</option>
            <option value="Mastercard">Mastercard</option>
            <option value="Amex">American Express</option>
            <option value="Discover">Discover</option>
          </select>
        </div>

        <div className="col-md-6">
          <label htmlFor="cardNumber" className="form-label">Número de tarjeta *</label>
          <input type="text" className="form-control" id="cardNumber" name="cardNumber" value={formData.cardNumber} onChange={handleChange} maxLength={22} required aria-required="true" />
        </div>

        <div className="row align-items-center">
          <div className="col-md-4">
            <label htmlFor="expiry" className="form-label">Vencimiento (MM/AA) *</label>
            <input type="text" className="form-control" id="expiry" name="expiry" value={formData.expiry} onChange={handleChange} maxLength={5} placeholder="MM/AA" required aria-required="true" />
          </div>
          <div className="col-md-2">
            <label htmlFor="cvv" className="form-label">CVV *</label>
            <input type="text" className="form-control" id="cvv" name="cvv" value={formData.cvv} onChange={handleChange} maxLength={3} required aria-required="true" />
          </div>
        </div>

        {/* Total y botón */}
        <div className="col-12 text-end">
          <h5 className="mt-4">Total: ${total.toFixed(2)}</h5>
          <button type="submit" className="btn btn-success mt-3" aria-label="Confirmar compra">
            Confirmar Compra
          </button>
        </div>
      </form>
    </div>
  );
}







