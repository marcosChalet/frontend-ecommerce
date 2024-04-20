import "./style.css";

type BannerType = {
  img: string;
  showMsg?: boolean;
  className?: string;
  children?: JSX.Element | JSX.Element[];
};

export default function Banner({
  img,
  children,
  showMsg = true,
  className = "",
}: BannerType) {
  return (
    <div className={`banner ${className}`}>
      <img
        className="banner-image"
        src={img}
        alt="Background banner with plants and a chair."
      />
      {children}
      {showMsg && (
        <div className="banner-message">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis.
          </p>
        </div>
      )}
    </div>
  );
}
