import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const Informes = () => {
  const [data, setData] = useState([]);
  const [difficulty, setDifficulty] = useState("");
  const [heroType, setHeroType] = useState("");
  const [filteredChampions, setFilteredChampions] = useState([]);

  useEffect(() => {
    fetch("/data/200125_LoL_champion_data.csv")
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          quoteChar: '"',
          complete: (results) => {
            setData(results.data);
          },
        });
      })
      .catch((error) => console.error("Error cargando el CSV:", error));
  }, []);

  const handleFilter = () => {
    const filtered = data.filter((champion) => {
      const champDifficulty = champion.difficulty?.trim();
      const champHeroType = champion.herotype?.trim();

      return (
        (!difficulty || champDifficulty === difficulty) &&
        (!heroType || champHeroType === heroType)
      );
    });

    setFilteredChampions(filtered);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const title = "Informe de Campeones";
    const headers = [["Nombre", "Dificultad", "Tipo"]];
    const rows = filteredChampions.map(champion => [
      champion.apiname,
      champion.difficulty,
      champion.herotype
    ]);

    // Título
    doc.setFontSize(18);
    doc.text(title, 14, 15);

    // Encabezado
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text("Filtros aplicados:", 14, 25);
    doc.text(`Dificultad: ${difficulty || "Ninguna"}`, 14, 30);
    doc.text(`Tipo: ${heroType || "Ninguno"}`, 14, 35);

    // Cabecera de Columna y Detalles
    doc.autoTable({
      startY: 40,
      head: headers,
      body: rows,
      theme: 'grid',
      styles: { fontSize: 10 },
      headStyles: { fillColor: [22, 160, 133] }
    });

    // Pie de Columnas
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Total de campeones: ${filteredChampions.length}`, 14, doc.lastAutoTable.finalY + 10);

    // Pie de Página
    const pageCount = doc.internal.getNumberOfPages();
    for(let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text(`Página ${i} de ${pageCount}`, doc.internal.pageSize.width - 30, doc.internal.pageSize.height - 10);
    }

    // Resumen
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text("Resumen:", 14, doc.lastAutoTable.finalY + 20);
    doc.text(`Se encontraron ${filteredChampions.length} campeones con los filtros aplicados.`, 14, doc.lastAutoTable.finalY + 25);

    doc.save("informe.pdf");
  };

  return (
    <div>
      <h1>Informes de Campeones</h1>

      <select style={{ marginRight: '10px' }} value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
        <option value="">Selecciona Dificultad</option>
        <option value="1">Baja</option>
        <option value="2">Media</option>
        <option value="3">Alta </option>
      </select>

      <select style={{ marginRight: '10px' }} value={heroType} onChange={(e) => setHeroType(e.target.value)}>
        <option value="">Selecciona Tipo de Héroe</option>
        <option value="Fighter">Luchador</option>
        <option value="Mage">Mago</option>
        <option value="Assassin">Asesino</option>
        <option value="Tank">Tanque</option>
      </select>

      <button style={{ marginRight: '10px' }} onClick={handleFilter}>Filtrar</button>
      <button style={{ marginRight: '10px' }} onClick={generatePDF} disabled={filteredChampions.length === 0}>
        Generar PDF
      </button>

      {filteredChampions.length > 0 ? (
        <ul>
          {/* {filteredChampions.map((champion, index) => (
            <li key={index}>
              <h2>{champion.apiname}</h2>
              <p>Dificultad: {champion.difficulty}</p>
              <p>Tipo: {champion.herotype}</p>
            </li>
          ))} */}
        </ul>
      ) : (
        <p>No hay campeones que coincidan.</p>
      )} 
    </div>
  );
};

export default Informes;