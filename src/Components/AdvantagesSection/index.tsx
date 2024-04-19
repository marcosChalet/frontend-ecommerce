import Trophy from "../../assets/trophy.svg";
import Warranty from "../../assets/warranty.svg";
import FreeShipping from "../../assets/freeShipping.svg";
import Support from "../../assets/support.svg";
import Section from "../ui/Section";

import "./style.css";

export default function AdvantagesSection() {
  return (
    <Section className="advantages">
      <div className="advantage-item">
        <img src={Trophy} alt="A trophy logo for hight quality materials." />
        <div>
          <h4>High Quality</h4>
          <h6>crafted from top materials</h6>
        </div>
      </div>

      <div className="advantage-item">
        <img src={Warranty} alt="warranty protection badge." />
        <div>
          <h4>Warranty Protection</h4>
          <h6>Over 2 years</h6>
        </div>
      </div>

      <div className="advantage-item">
        <img src={FreeShipping} alt="free shipping logo." />
        <div>
          <h4>Free Shipping</h4>
          <h6>Order over 150$</h6>
        </div>
      </div>

      <div className="advantage-item">
        <img src={Support} alt="A callcenter suport girl logo." />
        <div>
          <h4>24 / 7 Support</h4>
          <h6>Dedicated support</h6>
        </div>
      </div>
    </Section>
  );
}
