import React, { useState, useContext } from 'react';
import { LoginContext } from '../context/LoginContext'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  // Estado para manejar los datos del formulario
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  // Obtener el contexto
  const { updateLoginData } = useContext(LoginContext);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita la recarga de la página
    console.log('Form submitted:', formData);

    // Actualizar el contexto con los datos del formulario
    updateLoginData(formData);

    navigate("/Images")
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Campo de correo electrónico */}
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            style={styles.input}
            required
          />
        </div>

        {/* Campo de contraseña */}
        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            style={styles.input}
            required
          />
        </div>

        {/* Botón de enviar */}
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
}

// Estilos en línea para el componente
const styles = {
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px',
    color: 'white',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
    textAlign: 'left',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontSize: '14px',
    fontWeight: 'bold',
    color: 'white',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  button: {
    padding: '10px 15px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#007BFF',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    textTransform: 'uppercase',
    transition: 'background-color 0.3s ease',
  },
};

// Cambiar el color del botón al pasar el mouse
styles.button[':hover'] = {
  backgroundColor: '#0056b3',
};

export default LoginForm;