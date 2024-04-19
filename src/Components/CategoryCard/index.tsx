import "./style.css";

type Category = {
  url: string;
  alt?: string;
  name: string;
};

export default function CategoryCard({ url, alt, name }: Category) {
  return (
    <div className="category-card">
      <img className="category-card-img" src={url} alt={alt} />
      <h4 className="category-card-title">{name}</h4>
    </div>
  );
}
