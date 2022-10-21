import React, { createContext, useContext, useState, useEffect } from "react";

import { toast } from "react-hot-toast";

const CartContext = createContext();

const { Provider } = CartContext;

export const CartProvider = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [quantity, setQuantity] = useState(1);

  let foundProduct, index;

  const onAdd = (product, quantity) => {
    const checkPrdInCart = cartItems.find((item) => item._id === product._id);

    setTotalPrice((prev) => prev + product.price * quantity);
    setTotalQuantity((prev) => prev + quantity);

    if (checkPrdInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
      });

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${quantity} ${product.name} added to the cart`);
  };

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    index = cartItems.findIndex((product) => product._id === product._id);

    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice((prev) => prev - foundProduct.price * foundProduct.quantity);
    setTotalQuantity((prev) => prev - foundProduct.quantity);

    setCartItems(newCartItems);
  };

  const incQty = () => {
    setQuantity((prev) => prev + 1);
  };
  const decQty = () => {
    setQuantity((prev) => {
      if (prev - 1 < 1) return 1;
      return prev - 1;
    });
  };

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);

    const newCartItems = cartItems.filter((item) => item._id !== id);
    if (value === "inc") {
      let newCart = [
        ...newCartItems.slice(0, index),
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
        ...newCartItems.slice(index),
      ];

      setCartItems(newCart);
      setTotalPrice((prev) => prev + foundProduct.price);
      setTotalQuantity((prev) => prev + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        let newCart = [
          ...newCartItems.slice(0, index),
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
          ...newCartItems.slice(index),
        ];

        setCartItems(newCart);
        setTotalPrice((prev) => prev - foundProduct.price);
        setTotalQuantity((prev) => prev - 1);
      }
    }
  };

  return (
    <Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        setCartItems,
        totalPrice,
        setTotalPrice,
        totalQuantity,
        setTotalQuantity,
        quantity,
        setQuantity,
        incQty,
        decQty,
        onAdd,
        onRemove,
        toggleCartItemQuantity,
      }}
    >
      {children}
    </Provider>
  );
};
export const useCartContext = () => useContext(CartContext);
