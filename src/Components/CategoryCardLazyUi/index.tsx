import "./style.css";

export default function CategoryCardLazyUi({ name }: { name: string }) {
  return (
    <div className="category-card">
      <div className="bg-lazy" />
      <h4 className="category-card-title">{name}</h4>
    </div>
  );
}
