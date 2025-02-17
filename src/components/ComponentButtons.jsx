import React, { useState } from 'react';
import { Contador } from './Contador';
import { InputBox } from './InputBox';
import { Bienvenida } from './Bienvenida';

export default function ComponentButtons() {
  const [visibleComponents, setVisibleComponents] = useState({
    showComponent1: false,
    showComponent2: false,
    showComponent3: false,
  });

  const toggleVisibility = (component) => {
    setVisibleComponents((prevState) => ({
      ...prevState,
      [component]: !prevState[component],
    }));
  };

  return (
    <div style={styles.container}>
      <h2>Components</h2>
      <div style={styles.buttonsContainer}>
        <button
          onClick={() => toggleVisibility('showComponent1')}
          style={styles.button}
        >
          InputBox
        </button>
        <button
          onClick={() => toggleVisibility('showComponent2')}
          style={styles.button}
        >
          Bienvenida
        </button>
        <button
          onClick={() => toggleVisibility('showComponent3')}
          style={styles.button}
        >
          Contador
        </button>
      </div>
      <div style={styles.componentsContainer}>
        {visibleComponents.showComponent1 && <Component1 />}
        {visibleComponents.showComponent2 && <Component2 />}
        {visibleComponents.showComponent3 && <Component3 />}
      </div>
    </div>
  );
}

function Component1() {
  return <div style={{ ...styles.component, backgroundColor: '#ffcccb' }}><InputBox /></div>;
}

function Component2() {
  return <div style={{ ...styles.component, backgroundColor: '#ccffcb' }}><Bienvenida /></div>;
}

function Component3() {
  return <div style={{ ...styles.component, backgroundColor: '#cbccff' }}><Contador /></div>;
}

const styles = {
  container: {
    padding: '2rem',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '2rem',
    flexWrap : 'wrap',

  },
  button: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    cursor: 'pointer',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#000000',
    marginBottom: '2rem',
    color: '#ffffff',
    transition: 'background-color 0.3s ease',
    width: '32%', 
  },
  componentsContainer: {
    marginTop: '2rem',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap : 'wrap',
    gap: '1rem', // Espaciado entre componentes
  },
  component: {
    padding: '1rem',
    borderRadius: '8px',
    color: '#333',
    fontSize: '1.2rem',
    textAlign: 'center',
    width: '300px',
  },
};


