import React from "react";
import Link from "next/link";

import { Cart } from "./";
import { useCartContext } from "../context/StateContext";
import { AiOutlineShopping } from "react-icons/ai";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantity } = useCartContext();
  return (
    <nav className="navbar-container">
      <p className="logo">
        <Link href="/">Grey's Hub</Link>
      </p>

      <button className="cart-icon" onClick={() => setShowCart(true)}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantity}</span>
      </button>

      {showCart && <Cart />}
    </nav>
  );
};

export default Navbar;
