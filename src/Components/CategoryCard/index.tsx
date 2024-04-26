import { Link } from "react-router-dom";
import "./style.css";

type Category = {
  url: string;
  alt?: string;
  name: string;
  categoryId: number;
};

function scrollTo() {
  window.scrollTo({ top: 0 });
}

export default function CategoryCard({ url, alt, name, categoryId }: Category) {
  return (
    <Link
      to={`/shop/category/${categoryId}`}
      onClick={scrollTo}
      className="category-card"
    >
      <img className="category-card-img" src={url} alt={alt} />
      <h4 className="category-card-title">{name}</h4>
    </Link>
  );
}
