import { useEffect } from 'react';
import Chart from 'chart.js';

export default function Graph(props) {
    useEffect(() => {
        let ctx = document.getElementById('mainChart').getContext('2d');
        let chart = new Chart(ctx, {
            type: "line",
            labels: props.labels,
            data: {
                datasets: props.graphData
            },
            options: {}
        });

        return (() => { chart.destroy() })
    }, [props]);

    console.log(props)
    if (props.graphData.length === 0) {
        return (
            <div className="mainGraph">
                <canvas id="mainChart" />
                <p>Loading ...</p>
            </div>
        );
    }
    return (
        <div className="mainGraph">
            <canvas id="mainChart" />
        </div>
    );
}
