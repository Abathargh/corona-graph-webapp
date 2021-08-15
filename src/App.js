import './App.css';
import { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

const endpoint = "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni.json";

function extractFunction(dataset) {
  return dataset.map((element) => {
    return element["totale_casi"];
  });
}

// function derivative(dataset) {

// }

function Graph() {
  const labels = useState([]);
  const graphData = useState([]);

  useEffect(() => {
    let ctx = document.getElementById('mainChart').getContext('2d');
    let chart = new Chart(ctx, {
      type: 'line',

      data: {
        labels: labels,
        datasets: [{
          label: 'CoVID-19 spread in Italy',
          background: null,
          borderColor: 'rgb(255, 99, 132)',
          data: graphData,
        }]
      },
      options: {}
    });

    return () => {
      chart.destroy()
    }
  });

  return (
    <div className="mainGraph">
      <canvas id="mainChart" />
    </div>
  );
}

function App() {
  const [graphData, setGraphData] = useState({});
  // const [changeGraphData, setChangeGraphData] = useState({});

  useEffect(() => {
    async function fetchGraphData() {
      const data = await fetch(endpoint);
      const jsonData = await data.json();
      const extractedData = extractFunction(jsonData);

      setGraphData(extractedData);
      // setDerivative(derivative(extractedData));      
    }
    fetchGraphData();
  }, []);

  return (
    // if state is falsy then add loading 
    <div>
      <Graph labels={[]} data={graphData} />
      <button onclick={() => { }}>Derivative</button>
    </div >
  );
}


export default App;
