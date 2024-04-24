import { Link, useLoaderData } from "react-router-dom";
import { Product } from "../../interfaces/product.interface";
import { MdKeyboardArrowRight } from "react-icons/md";
import Section from "../../Components/ui/Section";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useEffect, useState } from "react";
import ProductCard from "../../Components/ProductCard";
import axios from "axios";
import "./style.css";
import ActionButton from "../../Components/ActionButton";
import ProductButton from "../../Components/ProductButton";
import {
  FaFacebook,
  FaLinkedin,
  FaMinus,
  FaSquareXTwitter,
  FaStarHalf,
} from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import {
  CONCURRENCY_TYPE,
  FACEBOOK_PAGE_URL,
  LINKEDIN_PAGE_URL,
  TWITTER_PAGE_URL,
} from "../../helpers/helper";

const PRODUCTS_URL = process.env.REACT_APP_PRODUCTS_URL as string;

const optionColors = ["#816DFA", "#000000", "#B88E2F"];
const optionSizes = ["L", "XL", "XS"];

export default function SingleProduct() {
  const { productData } = useLoaderData() as { productData: { data: Product } };
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(1);
  const [color, setColor] = useState<null | number>(null);
  const [size, setSize] = useState<null | number>(null);
  const product: Product = productData.data;

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

  return (
    <>
      <Header />
      <div className="view-product-breadcrumb">
        <Link to={"/"}>Home</Link>
        <MdKeyboardArrowRight size={28} color="black" />
        <Link to={"/shop"}>Shop</Link>
        <MdKeyboardArrowRight size={28} color="black" />
        <div className="divisory" />
        {product ? <p>{product.name}</p> : <p>carregando...</p>}
      </div>
      <Section className="product-section">
        <section className="product-container">
          <div className="product-images">
            <div className="product-thumbnails">
              <img
                className="product-thumbnail"
                src="https://i.postimg.cc/XYD2ts21/miniatura1-sofa.png"
                alt=""
              />
              <img
                className="product-thumbnail"
                src="https://i.postimg.cc/XYvH2Rgy/miniatura2-sofa.png"
                alt=""
              />

              <img
                className="product-thumbnail"
                src="https://i.postimg.cc/DzJCh1Hv/miniatura3-sofa.png"
                alt=""
              />

              <img
                className="product-thumbnail"
                src="https://i.postimg.cc/KY608Rhn/miniatura4-sofa.png"
                alt=""
              />
            </div>
            <img
              className="product-principal-image"
              src={product.image_link}
              alt=""
            />
          </div>
          <div className="product-description">
            <h2 className="product-description-title">{product.name}</h2>
            <p className="product-description-price">
              {`${CONCURRENCY_TYPE}. ${Number(product.price).toLocaleString()}`}
            </p>
            <aside className="product-review">
              <div className="product-review-starts">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalf />
              </div>
              <div className="divisory" />
              <p>5 customer review</p>
            </aside>
            <p className="product-description-paragraph">
              Setting the bar as one of the loudest speakers in its class, the
              Kilburn is a compact, stout-hearted hero with a well-balanced
              audio which boasts a clear midrange and extended highs for a
              sound.
            </p>

            <h5 className="product-option-list-title">Size</h5>
            <ul className="product-option-list">
              {optionSizes.map((optionSize: string, idx: number) => {
                return (
                  <li key={optionSize}>
                    <button
                      onClick={() => setSize(idx)}
                      className={`product-option-size ${
                        size === idx ? "option-size-select" : ""
                      }`}
                    >
                      {optionSize}
                    </button>
                  </li>
                );
              })}
            </ul>

            <h5 className="product-option-list-title">Color</h5>
            <ul className="product-option-list">
              {optionColors.map((optionColor: string, idx: number) => {
                return (
                  <li key={optionColor}>
                    <button
                      onClick={() => setColor(idx)}
                      className={`product-option-color ${
                        color === idx ? "product-option-color-active" : ""
                      }`}
                      style={{ backgroundColor: optionColor }}
                    />
                  </li>
                );
              })}
            </ul>
            <div className="manage-product">
              <div className="manage-total-products">
                <button
                  onClick={() =>
                    totalProducts > 1
                      ? setTotalProducts((prev) => prev - 1)
                      : null
                  }
                >
                  <FaMinus />
                </button>
                <span>{totalProducts}</span>
                <button onClick={() => setTotalProducts((prev) => prev + 1)}>
                  <FaPlus />
                </button>
              </div>
              <ProductButton className="product-button-wrapper">
                Add To Cart
              </ProductButton>
              <ProductButton className="product-button-wrapper">
                <>
                  <FaPlus /> Compare
                </>
              </ProductButton>
            </div>
            <hr className="product-divisor" />
            <aside className="product-data">
              <div className="product-data-line">
                <p>SKU</p> <p>: SS001</p>
              </div>
              <div className="product-data-line">
                <p>Category</p> <p>: Sofas</p>
              </div>
              <div className="product-data-line">
                <p>Tags</p> <p>: Sofa, Chair, Home, Shop</p>
              </div>
              <div className="product-data-line">
                <p>Share</p>
                <div>
                  <div className="data-social-media">
                    :{" "}
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={FACEBOOK_PAGE_URL}
                    >
                      <FaFacebook />
                    </a>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={LINKEDIN_PAGE_URL}
                    >
                      <FaLinkedin />
                    </a>
                    <a target="_blank" rel="noreferrer" href={TWITTER_PAGE_URL}>
                      <FaSquareXTwitter />
                    </a>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <div className="single-product-resume">
          <div className="single-product-title">
            <h3 className="sp-title">Description</h3>
            <p className="sp-additional-information">Additional Information</p>
          </div>
          <p className="single-product-full-description">
            Embodying the raw, wayward spirit of rock ‘n’ roll, the Kilburn
            portable active stereo speaker takes the unmistakable look and sound
            of Marshall, unplugs the chords, and takes the show on the road.
            <br />
            <br />
            Weighing in under 7 pounds, the Kilburn is a lightweight piece of
            vintage styled engineering. Setting the bar as one of the loudest
            speakers in its class, the Kilburn is a compact, stout-hearted hero
            with a well-balanced audio which boasts a clear midrange and
            extended highs for a sound that is both articulate and pronounced.
            The analogue knobs allow you to fine tune the controls to your
            personal preferences while the guitar-influenced leather strap
            enables easy and stylish travel.
          </p>
        </div>

        <div className="related-products">
          <h2>Related Products</h2>
          <div className="products-list">
            {products.map((product: Product) => {
              return (
                <ProductCard
                  refLink={`/product/${product.id}`}
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
        </div>
      </Section>
      <Footer />
    </>
  );
}
