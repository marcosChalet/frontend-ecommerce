import { GiHamburgerMenu } from "react-icons/gi";
import { BsPerson } from "react-icons/bs";
import { MdSearch } from "react-icons/md";
import { BsHeart } from "react-icons/bs";
import { BsCart3 } from "react-icons/bs";
import { BRAND_NAME } from "../../helpers/helper";
import Logo from "../../assets/logo.svg";
import "./style.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <div className="brand">
        <img draggable={false} src={Logo} alt="Web site logo" />
        <span className="logo">{BRAND_NAME}</span>
      </div>

      <nav className="nav-group-1">
        <Link to="/">Home</Link>
        <Link to="shop">Shop</Link>
        <Link to="/">About</Link>
        <Link to="/">Contact</Link>
      </nav>

      <nav className="nav-group-2">
        <button>
          <BsPerson />
        </button>

        <button>
          <MdSearch />
        </button>

        <button>
          <BsHeart />
        </button>

        <button>
          <BsCart3 />
        </button>

        <button className="hamburger">
          <GiHamburgerMenu />
        </button>
      </nav>
    </header>
  );
}
