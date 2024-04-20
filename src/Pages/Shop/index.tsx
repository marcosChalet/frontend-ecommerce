import axios from "axios";
import { useEffect, useState } from "react";
import Banner from "../../Components/Banner";
import Header from "../../Components/Header";
import Section from "../../Components/ui/Section";
import ShopBanner from "../../assets/shop-banner.png";
import AdvantagesSection from "../../Components/AdvantagesSection";
import Footer from "../../Components/Footer";
import { MdKeyboardArrowRight } from "react-icons/md";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { PiCirclesFourFill } from "react-icons/pi";
import { BsViewList } from "react-icons/bs";
import { Product } from "../../interfaces/product.interface";
import ProductCard from "../../Components/ProductCard";
import "./style.css";

const PRODUCTS_URL = process.env.REACT_APP_PRODUCTS_URL as string;

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function getProducts() {
      try {
        const products = await axios.get(
          `${PRODUCTS_URL}?page=1&perPage=4&order=asc`
        );
        setProducts(products.data.products);
      } catch (err) {
        throw new Error(`Error ${err}`);
      }
    }

    getProducts();
  }, []);

  const tempData = [1, 2, 3, 4].map(() => {
    return products.map((product: Product) => {
      return (
        <ProductCard
          key={product.id}
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
      );
    });
  });

  return (
    <>
      <Header />
      <Banner img={ShopBanner} showMsg={false} className="shop-banner">
        <div className="shop-banner-container">
          <h2 className="shop-banner-title">Shop</h2>
          <div className="shop-breadcrumb">
            <strong>Home</strong> <MdKeyboardArrowRight size={28} /> <p>Shop</p>
          </div>
        </div>
      </Banner>
      <div className="shop-adjust-list">
        <div>
          <div className="adjust-filter">
            <TbAdjustmentsHorizontal />
            <p>Filter</p>
          </div>
          <PiCirclesFourFill className="adjust-filter-option" />
          <BsViewList className="adjust-filter-option" />
          <div className="divisory" />
          <p>Showing 1–16 of 32 results</p>
        </div>
        <div>
          <div className="adjust-total-products">
            <p>Show</p>
            <input
              type="number"
              defaultValue={16}
              onKeyDown={(event) => {
                event.preventDefault();
              }}
            />
          </div>
          <div className="adjust-sort-products">
            <p>Sort by</p>
            <input type="text" defaultValue={"Default"} disabled />
          </div>
        </div>
      </div>
      <Section>
        <div className="products-list">{tempData}</div>
        <div className="products-navigation">
          {[1, 2, 3].map((_: any, idx: number) => {
            return (
              <button
                className={`btn-select-page ${idx === 0 ? "select" : ""}`}
              >
                {idx + 1}
              </button>
            );
          })}
          <button className="btn-next-page btn-select-page">Next</button>
        </div>
      </Section>
      <AdvantagesSection />
      <Footer />
    </>
  );
}
