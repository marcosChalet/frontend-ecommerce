import { useRef } from "react";
import { ADDRESS, BRAND_NAME, LOCATION } from "../../helpers/helper";
import Section from "../ui/Section";
import "./style.css";
import axios from "axios";

const EMAIL_URL = process.env.REACT_APP_EMAIL_URL ?? "";

export default function Footer() {
  const emailInput = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    axios.post(EMAIL_URL.toString(), {
      emailTo: emailInput.current?.value,
    });

    if (emailInput.current) {
      emailInput.current.value = "";
      emailInput.current.placeholder = "₊˚⊹♡ Successfully Registered";
    }
  }

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
            <form
              className="newsletter"
              onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                handleSubmit(e)
              }
            >
              <input
                ref={emailInput}
                id="email-newsletter"
                type="email"
                placeholder="Enter Your Email Address"
              />
              <button type="submit">SUBSCRIBE</button>
            </form>
          </div>
        </div>

        <hr className="footer-divisor" />

        <p className="rights-msg">{`2023 ${BRAND_NAME.toLowerCase()}. All rights reserved`}</p>
      </Section>
    </footer>
  );
}
