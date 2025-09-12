import "./FeatureTimeline.scss"
import PopUpModal from "@components/Modal/PopUpModal/PopUpModal";
import {Bar} from "react-chartjs-2"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale ,
    BarElement ,
    Title ,
    Tooltip ,
    Legend
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
import {useFeatureStore} from "@store/FeatureStore";
import {useEffect, useState} from "react";
export default function FeatureTimeline({projectId}) {
    const { featuresByProject , loadProjectFeatures ,addFeature } = useFeatureStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        loadProjectFeatures(projectId);
    }, [projectId]);
    const features = featuresByProject[projectId] || [];

    const data = {
        labels: features.map(f => f.name),
        datasets: [
            {
                label: "Duration (days)",
                data: features.map(f => {
                    const start = new Date(f.startDate).getTime();
                    const end = new Date(f.endDate).getTime();
                    const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
                    return duration;
                }),
                backgroundColor: "rgba(75, 192, 192, 0.5)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1
            }
        ]
    };

    const options = {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            title: { display: false, text: "Features Timeline" },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const feature = features[context.dataIndex];
                        return `${feature.name}: ${feature.description} (${context.raw} days)`;
                    }
                }
            }
        },
        scales: {
            x: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Duration (days)"
                }
            },
            y: {
                title: {
                    display: false,
                    text: "Features"
                }
            }
        }
    };
    return (
        <div className="feature-timeline">
            <h3>Project {projectId} Features</h3>
            <Bar data={data} options={options} />
        </div>
    );
}