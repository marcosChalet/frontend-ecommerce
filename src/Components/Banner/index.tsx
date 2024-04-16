import HomeBanner from "../../assets/home-banner.png";
import "./style.css";

export default function Banner() {
  return (
    <img
      className="banner"
      src={HomeBanner}
      alt="Background banner with plants and a chair."
    />
  );
}
