import "./TechnoChart.scss"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);
export default function TechnoChart({projects}) {
  const countTech = (projects)=>{
    const counts = {};
    projects.forEach(project=>{
      project.technology?.forEach(tech=>{
        const techName = tech.name;
        counts[techName] = (counts[techName] || 0) + 1;
      })
    })
    return counts;
  }
  const getRandomColor = () => {
    `hsl(${Math.floor(Math.random() * 360)}, 50%, 100%)`;
  }

  const generateRandomColors = (count) =>
      Array.from({ length: count }, () => getRandomColor());
  const techCounts = countTech(projects);
  const data = {
    labels: Object.keys(techCounts),
    datasets: [
      {
        label: 'count',
        data: Object.values(techCounts),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#C9CBCF',
          "#F57DB1",
          "#F9AA06",
          generateRandomColors(Object.keys(techCounts).length),
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="technoChart">
    <Doughnut data={data} />
    </div>
  );
}