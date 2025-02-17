import React, { useState, useEffect } from "react";

const RandomImages = () => {
  const [images, setImages] = useState([]);
  const [nextImages, setNextImages] = useState([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Función para cargar nuevas imágenes
  const loadNewImages = () => {
    return Array.from({ length: 12 }, () => `https://picsum.photos/200?random=${Math.random()}`);
  };

  // Cargar imágenes iniciales
  useEffect(() => {
    const initialImages = loadNewImages();
    setImages(initialImages);
    setNextImages(loadNewImages());
  }, []);

  // Manejar el cambio de imágenes
  const handleRefresh = () => {
    if (nextImages.length === 0) return; // Asegurarnos de que haya imágenes en nextImages
    setIsTransitioning(true);

    // Transición suave entre imágenes
    setTimeout(() => {
      setImages(nextImages); // Reemplazar imágenes visibles
      setNextImages(loadNewImages()); // Cargar las siguientes imágenes en segundo plano
      setIsTransitioning(false);
    }, 500); // Tiempo de transición
  };

  return (
    <div style={styles.container}>
      <h1>Random Images from Picsum</h1>
      <div style={styles.imageGrid}>
        {images.map((url, index) => (
          <div
            key={index}
            style={{
              ...styles.imageWrapper,
              opacity: isTransitioning ? 0.5 : 1,
              transition: "opacity 0.5s ease",
            }}
          >
            <img src={url} alt={`Random ${index}`} style={styles.image} />
          </div>
        ))}
      </div>
      <button onClick={handleRefresh} style={styles.button}>
        Refresh Images
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  imageGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  imageWrapper: {
    overflow: "hidden",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  image: {
    width: "100%",
    height: "auto",
    display: "block",
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default RandomImages;
