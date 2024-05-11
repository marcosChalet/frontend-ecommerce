import axios from "axios";
import AdvantagesSection from "../../Components/AdvantagesSection";
import CategoryCardLazyUi from "../../Components/CategoryCardLazyUi";
import ProductCardLazyUi from "../../Components/ProductCardLazyUi";
import ActionButton from "../../Components/ActionButton";
import HomeBanner from "../../assets/home-banner.png";
import Section from "../../Components/ui/Section";
import Banner from "../../Components/Banner";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import Main from "../../Components/ui/Main";
import { Category } from "../../interfaces/category.interface";
import { Product } from "../../interfaces/product.interface";
import { Suspense, lazy, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

const CATEGORIES_URL = process.env.REACT_APP_CATEGORIES_URL as string;
const PRODUCTS_URL = process.env.REACT_APP_PRODUCTS_URL as string;
const CategoryCard = lazy(() => import("../../Components/CategoryCard"));
const ProductCard = lazy(() => import("../../Components/ProductCard"));

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const categoriesPromise = axios.get(CATEGORIES_URL);
        const productsPromise = axios.get(`${PRODUCTS_URL}/our-products`);

        const [categoriesResponse, productsResponse] = await Promise.all([
          categoriesPromise,
          productsPromise,
        ]);

        setCategories(categoriesResponse.data);
        setProducts(productsResponse.data);
      } catch (err) {
        throw new Error(`Error ${err}`);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <Main>
        <Header />
        <Banner img={HomeBanner} />
        <Section className="category-section">
          <h3 className="category-title">Browse The Range</h3>
          <div className="category-list">
            {categories.map((category: Category) => {
              return (
                <Suspense
                  key={category.id}
                  fallback={<CategoryCardLazyUi name={category.name} />}
                >
                  <CategoryCard
                    name={category.name}
                    url={category.image_link ?? ""}
                    categoryId={category.id}
                  />
                </Suspense>
              );
            })}
          </div>
        </Section>

        <Section className="our-products-section">
          <h3 className="our-products-title">Our Products</h3>
          <div className="products-list">
            {products.map((product: Product) => {
              return (
                <Suspense key={product.id} fallback={<ProductCardLazyUi />}>
                  <ProductCard
                    refLink={`/product/${product.id}`}
                    name={product.name}
                    isNew={product.is_new}
                    shortDescription={product.description}
                    hasDiscount={product.discount_percent ? true : false}
                    price={
                      product.discount_price
                        ? product.discount_price
                        : product.price
                    }
                    discount={product.discount_percent}
                    prevPrice={product.price}
                    url={product.image_link ?? ""}
                  />
                </Suspense>
              );
            })}
          </div>

          <Link to={"/shop"}>
            <ActionButton className="show-more">Show More</ActionButton>
          </Link>
        </Section>

        <AdvantagesSection />
        <Footer />
      </Main>
    </>
  );
}
