import axios from "axios";
import { useEffect, useRef, useState } from "react";
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
import { Link } from "react-router-dom";
import "./style.css";

const PRODUCTS_URL = process.env.REACT_APP_PRODUCTS_URL as string;
const DEFAULT_NUMBER_PRODUCTS = 16;
type PaginationData = {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: string;
  pageCount: number;
  prevPage: string;
  productCount: number;
  totalProducts: number;
};

export default function Shop() {
  let productOrder: "asc" | "desc" = "asc";
  const currentPage = useRef(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [pagesNavList, setPagesNavList] = useState<number[] | null>(null);
  console.log(Number(localStorage.getItem("@numShowProducts")));
  const [numShowProducts, setNumShowProducts] = useState(
    Number(localStorage.getItem("@numShowProducts")) !== 0
      ? Number(localStorage.getItem("@numShowProducts"))
      : DEFAULT_NUMBER_PRODUCTS
  );
  const [paginationData, setPaginationData] = useState<PaginationData | null>(
    null
  );

  async function getProducts(
    page: number,
    perPage: number,
    order: "asc" | "desc" = "asc"
  ) {
    try {
      const products = await axios.get(
        `${PRODUCTS_URL}?page=${page}&perPage=${perPage}&order=${order}`
      );
      const fetchProducts = products.data.products;
      setProducts(() => fetchProducts);
      const data: PaginationData = {
        hasNextPage: products.data.hasNextPage,
        hasPrevPage: products.data.hasPrevPage,
        nextPage: products.data.nextPage,
        pageCount: products.data.pageCount,
        prevPage: products.data.prevPage,
        productCount: products.data.productCount,
        totalProducts: products.data.totalProducts,
      };
      setPagesNavList(() =>
        Array.from({ length: data.pageCount }, (_, i) => i + 1)
      );
      setPaginationData(() => data);
    } catch (err) {
      throw new Error(`Error ${err}`);
    }
  }

  function handleChange(val: number) {
    getProducts(1, val, productOrder);
    if (val <= (paginationData?.totalProducts ?? 0)) {
      setNumShowProducts(() => val);
    }
  }

  function nextPage(page: number) {
    getProducts(page, numShowProducts);
  }

  useEffect(() => {
    localStorage.setItem("@numShowProducts", numShowProducts.toString());
  }, [numShowProducts, products]);

  useEffect(() => {
    let numProducts: number | null = Number(
      localStorage.getItem("@numShowProducts")
    );

    if (numProducts === null) {
      numProducts = DEFAULT_NUMBER_PRODUCTS;
    }

    getProducts(1, numProducts, productOrder);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <Banner img={ShopBanner} showMsg={false} className="shop-banner">
        <div className="shop-banner-container">
          <h2 className="shop-banner-title">Shop</h2>
          <div className="shop-breadcrumb">
            <Link to="/">
              <strong>Home</strong>
            </Link>
            <MdKeyboardArrowRight size={28} /> <p>Shop</p>
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
          <p>
            Showing 1–{numShowProducts} of {paginationData?.totalProducts}{" "}
            results
          </p>
        </div>
        <div>
          <div className="adjust-total-products">
            <p>Show</p>
            <input
              type="number"
              value={numShowProducts}
              min={1}
              max={50}
              onChange={(e) => handleChange(+e.target.value)}
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
        <div className="products-list">
          {products.map((product: Product, idx: number) => {
            if (idx < numShowProducts) {
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
            }
            return null;
          })}
        </div>

        <div className="products-navigation">
          {currentPage.current > 1 && (
            <button
              className="btn-next-page btn-select-page"
              onClick={(e) => {
                paginationData?.pageCount === 1 && e.preventDefault();
                currentPage.current -= 1;
                nextPage(currentPage.current);
              }}
            >
              Prev
            </button>
          )}

          {pagesNavList?.map((_, idx) => {
            return (
              <button
                key={idx}
                className={`btn-select-page ${
                  idx + 1 === currentPage.current ? "select" : ""
                }`}
                onClick={() => {
                  currentPage.current = idx + 1;
                  nextPage(currentPage.current);
                }}
              >
                {idx + 1}
              </button>
            );
          })}
          <button
            className="btn-next-page btn-select-page"
            onClick={(e) => {
              if (paginationData?.hasNextPage) {
                paginationData?.pageCount === 1 && e.preventDefault();
                currentPage.current += 1;
                nextPage(currentPage.current);
              }
            }}
          >
            Next
          </button>
        </div>
      </Section>
      <AdvantagesSection />
      <Footer />
    </>
  );
}
