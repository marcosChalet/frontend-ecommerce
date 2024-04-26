import { useState } from "react";
import Banner from "../../Components/Banner";
import Header from "../../Components/Header";
import Section from "../../Components/ui/Section";
import ShopBanner from "../../assets/shop-banner.png";
import AdvantagesSection from "../../Components/AdvantagesSection";
import ProductCard from "../../Components/ProductCard";
import Footer from "../../Components/Footer";
import { MdKeyboardArrowRight } from "react-icons/md";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { PiCirclesFourFill } from "react-icons/pi";
import { BsViewList } from "react-icons/bs";
import { FaGear } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Product } from "../../interfaces/product.interface";
import usePagination from "../../Hooks/page";
import "./style.css";

export default function Shop() {
  const {
    products,
    currentPage,
    pagesNavList,
    totalProducts,
    numShowProducts,
    changeSortOrder,
    handleChange,
    pageFilter,
    changePage,
    nextPage,
    prevPage,
  } = usePagination();
  const [activeDropdown, setActiveDropdown] = useState<boolean>(false);
  const [sortDisplay, setSortDisplay] = useState<string>("Default");

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
        <div className="shop-adjust-list-mobile">
          <FaGear />
          <h4>Configure</h4>
        </div>
        <div>
          <div className="adjust-filter">
            <TbAdjustmentsHorizontal />
            <p>Filter</p>
          </div>
          <PiCirclesFourFill className="adjust-filter-option" />
          <BsViewList className="adjust-filter-option" />
          <div className="divisory" />
          <p>
            Showing 1–{numShowProducts} of {totalProducts} results
          </p>
        </div>
        <div>
          <div className="adjust-total-products">
            <p>Show</p>
            <input
              id="total-products"
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
            <button
              className="adjust-sort-products-by"
              onClick={() => setActiveDropdown((prev) => !prev)}
            >
              {sortDisplay}
            </button>
            {activeDropdown && (
              <ul className="sort-options-dropdown">
                <li>
                  <button
                    onClick={() => {
                      changeSortOrder("asc");
                      setActiveDropdown(false);
                      setSortDisplay("Price -");
                    }}
                  >
                    Price: lowest first
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      changeSortOrder("desc");
                      setActiveDropdown(false);
                      setSortDisplay("Price +");
                    }}
                  >
                    Price: highest first
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      pageFilter();
                      setActiveDropdown(false);
                      setSortDisplay("Price %");
                    }}
                  >
                    Discount: highest first
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      <Section>
        <div className="products-list">
          {products.map((product: Product, idx: number) => {
            if (idx < numShowProducts) {
              return (
                <ProductCard
                  key={product.id}
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
              );
            }
            return null;
          })}
        </div>

        <div className="products-navigation">
          {currentPage > 1 && (
            <button
              className="btn-next-page btn-select-page"
              onClick={prevPage}
            >
              Prev
            </button>
          )}

          {pagesNavList?.map((_, idx) => {
            return idx < 3 ? (
              <button
                key={idx}
                className={`btn-select-page
                  ${idx + 1 === currentPage ? "select" : ""}
                `}
                onClick={() => changePage(idx + 1)}
              >
                {idx + 1}
              </button>
            ) : null;
          })}
          {pagesNavList && pagesNavList.length > 3 && (
            <div className="btn-select-page dots-select-page">...</div>
          )}
          <button className="btn-next-page btn-select-page" onClick={nextPage}>
            Next
          </button>
        </div>
      </Section>
      <AdvantagesSection />
      <Footer />
    </>
  );
}
