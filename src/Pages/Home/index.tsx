import { useEffect, useState } from "react";
import axios from "axios";
import ActionButton from "../../Components/ActionButton";
import AdvantagesSection from "../../Components/AdvantagesSection";
import Banner from "../../Components/Banner";
import CategoryCard from "../../Components/CategoryCard";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import ProductCard from "../../Components/ProductCard";
import Main from "../../Components/ui/Main";
import Section from "../../Components/ui/Section";
import HomeBanner from "../../assets/home-banner.png";
import { Category } from "../../interfaces/category.interface";
import { Product } from "../../interfaces/product.interface";
import "./style.css";

const CATEGORIES_URL = process.env.REACT_APP_CATEGORIES_URL as string;
const PRODUCTS_URL = process.env.REACT_APP_PRODUCTS_URL as string;

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function getCategories() {
      try {
        const categories = await axios.get(CATEGORIES_URL);
        setCategories(categories.data);
      } catch (err) {
        throw new Error(`Error ${err}`);
      }
    }

    async function getProducts() {
      try {
        const products = await axios.get(
          `${PRODUCTS_URL}?page=1&perPage=8&order=asc`
        );
        setProducts(products.data.products);
      } catch (err) {
        throw new Error(`Error ${err}`);
      }
    }

    getCategories();
    getProducts();
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
                <CategoryCard
                  key={category.id}
                  name={category.name}
                  url={category.image_link ?? ""}
                />
              );
            })}
          </div>
        </Section>

        <Section className="our-products-section">
          <h3 className="our-products-title">Our Products</h3>

          <div className="products-list">
            {products.map((product: Product) => {
              return (
                <ProductCard
                  key={product.id}
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
              );
            })}
          </div>

          <ActionButton className="show-more">Show More</ActionButton>
        </Section>

        <AdvantagesSection />
        <Footer />
      </Main>
    </>
  );
}
