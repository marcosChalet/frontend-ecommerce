import "./style.css";

export default function ProductCardLazyUi() {
  return (
    <div className="lazy-card">
      <div className="lazy-card-img bg-lazy" />
      <div>
        <div className="lazy-card-title" />
        <div className="lazy-card-description" />
        <div className="lazy-card-price" />
      </div>
    </div>
  );
}
