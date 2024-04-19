import { ADDRESS, BRAND_NAME, LOCATION } from "../../helpers/helper";
import Section from "../ui/Section";
import "./style.css";

export default function Footer() {
  return (
    <footer>
      <Section>
        <div className="footer-container">
          <div className="footer-col footer-col-brand">
            <h3>{BRAND_NAME}.</h3>
            <p>{ADDRESS}</p>
            <p>{LOCATION}</p>
          </div>

          <div className="footer-col">
            <h4>Links</h4>
            <a href="#test">Home</a>
            <a href="#test">Shop</a>
            <a href="#test">About</a>
            <a href="#test">Contact</a>
          </div>

          <div className="footer-col">
            <h4>Help</h4>
            <a href="#test">Payment Options</a>
            <a href="#test">Returns</a>
            <a href="#test">Privacy Policies</a>
          </div>

          <div className="footer-col">
            <h4>Newsletter</h4>
            <div className="newsletter">
              <input type="email" placeholder="Enter Your Email Address" />
              <button>SUBSCRIBE</button>
            </div>
          </div>
        </div>

        <hr className="footer-divisor" />

        <p className="rights-msg">{`2023 ${BRAND_NAME.toLowerCase()}. All rights reverved`}</p>
      </Section>
    </footer>
  );
}
