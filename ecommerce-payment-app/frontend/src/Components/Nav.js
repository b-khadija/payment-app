import "../index.css";
import { BsBag } from "react-icons/bs";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="flex w-full">
      <header className="flex w-full flex-wrap items-center justify-between mx-auto relative p-4 bg-[#fcf5ee]">
        <nav
          className="w-full flex mx-auto justify-between px-4 items-center"
          role="navigation"
          aria-label="Menu principal"
        >
          <a
            className="text-sm font-medium uppercase text-[#002961] hover:text-[#bb4430]"
            href="/"
            aria-current="page"
          >
            Accueil
          </a>
          <div className="flex items-center">
            <img className="logo" src="./images/logo.png" alt="logo" />
          </div>
          <div className="cart-icon">
            <Link to="/Cart.js">
              <BsBag
                size={23}
                onMouseOver={({ target }) => (target.style.color = "#bb4430")}
                onMouseOut={({ target }) => (target.style.color = "#002961")}
              />
            </Link>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Nav;
