export default function AddButton({ label, onClick }) {
  return (
    <div className="clickable" onClick={onClick}>
      <span>Add a {label}</span>
    </div>
  );
}
