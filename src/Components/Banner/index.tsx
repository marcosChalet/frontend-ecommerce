import HomeBanner from "../../assets/home-banner.png";
import "./style.css";

export default function Banner() {
  return (
    <div className="banner">
      <img
        className="banner-image"
        src={HomeBanner}
        alt="Background banner with plants and a chair."
      />
      <div className="banner-message">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
          tellus, luctus nec ullamcorper mattis.
        </p>
      </div>
    </div>
  );
}
