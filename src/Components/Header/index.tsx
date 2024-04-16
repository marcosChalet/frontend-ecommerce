import { GiHamburgerMenu } from "react-icons/gi";
import { BsPerson } from "react-icons/bs";
import { MdSearch } from "react-icons/md";
import { BsHeart } from "react-icons/bs";
import { BsCart3 } from "react-icons/bs";

import "./style.css";
import Logo from "../../assets/logo.svg";

export default function Header() {
  return (
    <header>
      <div className="brand">
        <img draggable={false} src={Logo} alt="Web site logo" />
        <span className="logo">Furniro</span>
      </div>

      <nav className="nav-group-1">
        <a href="#home">Home</a>
        <a href="#shop">Shop</a>
        <a href="#shop">About</a>
        <a href="#shop">Contact</a>
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
