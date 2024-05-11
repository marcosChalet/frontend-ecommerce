import { Suspense } from "react";
import { Product } from "../../interfaces/product.interface";
import ProductCard from "../ProductCard";
import ProductCardLazyUi from "../ProductCardLazyUi";
import "./style.css";

type ProductsListType = {
  products: Product[];
  numShowProducts?: number;
};

export default function ProductsList({
  products,
  numShowProducts = 8,
}: ProductsListType) {
  return (
    <div className="products-list">
      {products.slice(0, numShowProducts).map((product: Product) => {
        return (
          <Suspense key={product.id} fallback={<ProductCardLazyUi />}>
            <ProductCard
              refLink={`/product/${product.id}`}
              name={product.name}
              isNew={product.is_new}
              shortDescription={product.description}
              hasDiscount={product.discount_percent ? true : false}
              price={
                product.discount_price ? product.discount_price : product.price
              }
              discount={product.discount_percent}
              prevPrice={product.price}
              url={product.image_link ?? ""}
            />
          </Suspense>
        );
      })}
    </div>
  );
}
