import { useState, useEffect } from 'react';
import Graph from './Graph';
import './App.css';



const endpoint = "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni.json";
const regions =
  ["Lombardia", "Lazio", "Campania", "Sicilia", "Veneto",
    "Emilia Romagna", "Abbruzzo", "Basilicata", "P.A. Bolzano",
    "Calabria", "Friuli Venezia Giulia", "Liguria", "Marche", "Molise",
    "Piemonte", "Puglia", "Sardegna", "Toscana", "P.A. Trento", "Umbria",
    "Valle d'Aosta"]

function extractFunction(dataset) {
  let regionDatasets = [];
  for (const region of regions) {
    regionDatasets.push({
      label: region,
      data: dataset
        .filter((element) => element["denominazione_regione"] === region)
        .map(((element) => element["totale_casi"]))
    });
  }
  return regionDatasets;
}

// function derivative(dataset) {

// }
function App() {
  const [graphData, setGraphData] = useState({
    dataset: [],
    labels: []
  });
  // const [changeGraphData, setChangeGraphData] = useState({});

  useEffect(() => {
    async function fetchGraphData() {
      const data = await fetch(endpoint);
      const jsonData = await data.json();
      const extractedData = extractFunction(jsonData);
      console.log(extractedData)
      setGraphData({
        dataset: extractedData,
        labels: [...Array(graphData.length).keys()]
      });
      // setDerivative(derivative(extractedData));      
    }
    fetchGraphData();
  }, []);

  return (
    <div id="mainBox">
      <Graph labels={graphData.labels} graphData={graphData.dataset} />
    </div >
  );
}


export default App;
