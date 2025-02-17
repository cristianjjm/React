import React, { useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const VoiceInputComponent = () => {
  const [text, setText] = useState("");
  const [submittedText, setSubmittedText] = useState("");
  const { transcript, resetTranscript } = useSpeechRecognition();

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <p>Tu navegador no soporta la funcionalidad de reconocimiento de voz.</p>;
  }

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleSend = () => {
    setSubmittedText(text);
    setText("");
    resetTranscript();
  };

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: false, language: "es-ES" });
  };

  // Actualiza el input con el texto transcrito automáticamente
  React.useEffect(() => {
    setText(transcript);
  }, [transcript]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Reconocimiento de Voz</h1>
      <input
        type="text"
        value={text}
        onChange={handleInputChange}
        placeholder="Escribe o usa el micrófono..."
        style={styles.input}
      />
      <div style={styles.buttonContainer}>
        <button onClick={handleSend} style={styles.buttonPrimary}>
          Enviar
        </button>
        <button onClick={startListening} style={styles.buttonSecondary}>
          Escuchar
        </button>
      </div>
      <div style={styles.outputContainer}>
        <p style={styles.outputLabel}>Texto enviado:</p>
        <p style={styles.outputText}>{submittedText || "Nada enviado aún."}</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "500px",
    margin: "20px auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "20px",
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginBottom: "10px",
    fontSize: "16px",
    boxSizing: "border-box",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
  },
  buttonPrimary: {
    flex: 1,
    backgroundColor: "#007BFF",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  buttonSecondary: {
    flex: 1,
    backgroundColor: "#28A745",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  outputContainer: {
    marginTop: "20px",
    padding: "10px",
    backgroundColor: "white",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  outputLabel: {
    margin: 0,
    fontSize: "14px",
    color: "#666",
  },
  outputText: {
    marginTop: "5px",
    fontSize: "16px",
    color: "#333",
    fontWeight: "bold",
  },
};

export default VoiceInputComponent;
