import { Link } from "react-router-dom";
import ButtonInterface from "../../interfaces/button.interface";
import Button from "../ui/Button";
import "./style.css";

export default function ActionButton({ className, children }: ButtonInterface) {
  return (
    <Link to={"/shop"}>
      <Button className={`action-button ${className}`}>{children}</Button>
    </Link>
  );
}
