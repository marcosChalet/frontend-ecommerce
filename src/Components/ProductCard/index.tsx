import { CONCURRENCY_LOCALE, CONCURRENCY_TYPE } from "../../helpers/helper";
import ActionButton from "../ActionButton";
import { BsFillShareFill } from "react-icons/bs";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { CiHeart } from "react-icons/ci";

import "./style.css";
import { useState } from "react";

type ProductType = {
  url: string;
  alt?: string;
  name: string;
  shortDescription: string;
  price: number;
  hasDiscount?: boolean;
  discount?: number;
  prevPrice?: number;
  isNew?: boolean;
};

export default function ProductCard({
  name,
  url,
  alt,
  shortDescription,
  price,
  prevPrice,
  hasDiscount = false,
  discount,
  isNew = false,
}: ProductType) {
  const blobContent =
    (hasDiscount && `-${100 * (discount || 0)}%`) || (isNew && "New");

  const [hoverProduct, isHoverProduct] = useState(false);

  return (
    <div
      className="product-card"
      onMouseEnter={() => isHoverProduct(true)}
      onMouseLeave={() => isHoverProduct(false)}
    >
      {(hasDiscount || isNew) && (
        <p className={`card-blob ${hasDiscount ? "red-blob" : "green-blob"}`}>
          {blobContent}
        </p>
      )}
      <img className="product-image" src={url} alt={alt} />
      <div className="product-data-wrapper">
        <h4 className="product-name">{name}</h4>
        <p className="product-short-description">{shortDescription}</p>
        <div className="product-price-whrapper">
          <p className="product-price">
            {CONCURRENCY_TYPE}{" "}
            {price.toLocaleString(
              CONCURRENCY_LOCALE.type,
              CONCURRENCY_LOCALE.options
            )}
          </p>
          {hasDiscount && (
            <span className="product-prev-price">
              {CONCURRENCY_TYPE} {prevPrice}
            </span>
          )}
        </div>

        <div className={`on-hover-actions ${hoverProduct ? "active" : ""}`}>
          <ActionButton>See Details</ActionButton>
          <div className="product-actions">
            <p>
              <BsFillShareFill />
              <span>Share</span>
            </p>
            <p>
              <LiaExchangeAltSolid />
              <span>Compare</span>
            </p>
            <p>
              <CiHeart />
              <span>Like</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
