import ActionButton from "../../Components/ActionButton";
import AdvantagesSection from "../../Components/AdvantagesSection";
import Banner from "../../Components/Banner";
import CategoryCard from "../../Components/CategoryCard";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import ProductCard from "../../Components/ProductCard";
import Main from "../../Components/ui/Main";
import Section from "../../Components/ui/Section";

import "./style.css";

export default function Home() {
  return (
    <>
      <Main>
        <Header />
        <Banner />
        <Section className="category-section">
          <h3 className="category-title">Browse The Range</h3>

          <div className="category-list">
            <CategoryCard
              name="Dining"
              alt="Living room with plants and sofa."
              url="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsb2ZmaWNlNF9waG90b19vZl9hX2ZyYW1lX2luX3RoZV9saXZpbmdfcm9vbV9pbl90aGVfc3R5bF85YWM1MjY1ZS02OTdjLTQ4OWMtYTFmYS03NzgzMjJlMTEwODNfMi5qcGc.jpg"
            />

            <CategoryCard
              name="Living"
              alt="Living room with plants and sofa."
              url="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsb2ZmaWNlNF9waG90b19vZl9hX2ZyYW1lX2luX3RoZV9saXZpbmdfcm9vbV9pbl90aGVfc3R5bF85YWM1MjY1ZS02OTdjLTQ4OWMtYTFmYS03NzgzMjJlMTEwODNfMi5qcGc.jpg"
            />

            <CategoryCard
              name="Bedroom"
              alt="Living room with plants and sofa."
              url="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsb2ZmaWNlNF9waG90b19vZl9hX2ZyYW1lX2luX3RoZV9saXZpbmdfcm9vbV9pbl90aGVfc3R5bF85YWM1MjY1ZS02OTdjLTQ4OWMtYTFmYS03NzgzMjJlMTEwODNfMi5qcGc.jpg"
            />
          </div>
        </Section>

        <Section className="our-products-section">
          <h3 className="our-products-title">Our Products</h3>

          <div className="products-list">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((data: number) => {
              return (
                <ProductCard
                  key={data}
                  name="Grifo"
                  price={1500000}
                  shortDescription="Night lamp"
                  hasDiscount
                  discount={0.5}
                  prevPrice={3000000}
                  url="https://i.postimg.cc/RV4bt66d/abajur.png"
                  alt="White abajour"
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
