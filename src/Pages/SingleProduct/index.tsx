import axios from "axios";
import Section from "../../Components/ui/Section";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import ProductCard from "../../Components/ProductCard";
import ActionButton from "../../Components/ActionButton";
import ProductButton from "../../Components/ProductButton";
import { useEffect, useRef, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { Product } from "../../interfaces/product.interface";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import {
  FaFacebook,
  FaLinkedin,
  FaMinus,
  FaSquareXTwitter,
  FaStarHalf,
} from "react-icons/fa6";
import {
  CONCURRENCY_TYPE,
  FACEBOOK_PAGE_URL,
  LINKEDIN_PAGE_URL,
  TWITTER_PAGE_URL,
} from "../../helpers/helper";

import "./style.css";

const PRODUCTS_URL = process.env.REACT_APP_PRODUCTS_URL as string;

export default function SingleProduct() {
  const { productData } = useLoaderData() as { productData: { data: Product } };
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(1);
  const [color, setColor] = useState<null | number>(null);
  const [size, setSize] = useState<null | number>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const product: Product = productData.data;
  const principalImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    async function getProducts() {
      try {
        const products = await axios.get(
          `${PRODUCTS_URL}/?page=1&perPage=8&order=asc&orderType=category_id&category=${productData.data.category_id}`
        );

        setProducts(products.data.products);
      } catch (err) {
        throw new Error(`Error ${err}`);
      }
    }

    getProducts();
  });

  function changeImage(img: string) {
    if (principalImageRef.current) {
      principalImageRef.current.src = img;
    }
  }

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
            {product.other_images_link ? (
              <div className="product-thumbnails">
                {product.other_images_link?.split(";").map((img: string) => {
                  return (
                    <img
                      onClick={() => changeImage(img)}
                      key={img}
                      className="product-thumbnail"
                      src={img}
                      alt=""
                    />
                  );
                })}
                <img
                  onClick={() => changeImage(product.image_link ?? "")}
                  className="product-thumbnail"
                  src={product.image_link}
                  alt=""
                />
              </div>
            ) : null}
            <img
              ref={principalImageRef}
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
              {product.description}
            </p>

            <h5 className="product-option-list-title">Size</h5>
            <ul className="product-option-list">
              {product.sizes?.map(
                (optionSize: { name: string }, idx: number) => {
                  return (
                    <li key={optionSize.name}>
                      <button
                        onClick={() => setSize(idx)}
                        className={`product-option-size ${
                          size === idx ? "option-size-select" : ""
                        }`}
                      >
                        {optionSize.name}
                      </button>
                    </li>
                  );
                }
              )}
            </ul>

            <h5 className="product-option-list-title">Color</h5>
            <ul className="product-option-list">
              {product.colors?.map(
                (optionColor: { color_hex: string }, idx: number) => {
                  return (
                    <li key={optionColor.color_hex}>
                      <button
                        onClick={() => setColor(idx)}
                        className={`product-option-color ${
                          color === idx ? "product-option-color-active" : ""
                        }`}
                        style={{ backgroundColor: optionColor.color_hex }}
                      />
                    </li>
                  );
                }
              )}
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
          <div className="single-product-full-description">
            {product.large_description.split("\n").map((text: string) => (
              <div key={text}>
                <p>{text}</p>
                <br />
              </div>
            ))}
          </div>
        </div>

        <div className="related-products">
          <h2>Related Products</h2>
          <div className="products-list">
            {products.map((product: Product, idx: number) =>
              !isExpanded && idx > 3 ? null : (
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
              )
            )}
          </div>

          {isExpanded ? (
            <Link to={"/shop"}>
              <ActionButton className="show-more">Show More</ActionButton>
            </Link>
          ) : (
            <ActionButton
              click={() => setIsExpanded(true)}
              notScrollTop
              className="show-more"
            >
              Show More
            </ActionButton>
          )}
        </div>
      </Section>
      <Footer />
    </>
  );
}
