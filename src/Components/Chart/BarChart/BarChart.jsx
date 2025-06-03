import "./BarChart.scss"
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
export default function BarChart({name,label , value}) {
    const barData = {
        label :label,
        datasets: [
            {
                label: label,
                data: value.data,
                backgroundColor: "rgba(75, 192, 192, 0.5)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1
            }
        ],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1
    }
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: true },
            title: { display: false }
        }
    };

    return (
    <div className="barChart" style={{ height: "300px" }}>
        <h3>{name}</h3>
        <Bar
        key={name}
            data={barData}
        options={chartOptions}/>
    </div>
  );
}