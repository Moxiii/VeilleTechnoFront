import "@components/Card/StatCard/StatCard.scss"
export default function StatCard({label , value}) {
  return (
    <div className="statCard">
    <h4 className="label">{label}</h4>
        <p className="value">{value}</p>
    </div>
  );
}