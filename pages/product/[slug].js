import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { Product } from "../../components";
import { client, urlFor } from "../../lib/client";
import { useCartContext } from "../../context/StateContext";

export const getStaticPaths = async () => {
  const slugQuery = `*[_type == "product"]{
    slug{current}
  }`;

  const products = await client.fetch(slugQuery);
  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const productQuery = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = `*[_type == "product" ]`;

  const product = await client.fetch(productQuery);
  const products = await client.fetch(productsQuery);

  return {
    props: { products, product },
  };
};
const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;

  const [index, setIndex] = useState(0);

  const { incQty, decQty, quantity, onAdd, setQuantity, setShowCart } =
    useCartContext();

  const router = useRouter();

  const handleBuyNow = () => {
    onAdd(product, quantity);
    setShowCart(true);
  };

  useEffect(() => {
    const handleRouteChange = () => {
      setQuantity(1);
    };
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", () => console.log("stopped"));
    };
  }, [router.events]);

  return (
    <>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              src={image && urlFor(image[index])}
              alt={name}
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                src={urlFor(item)}
                alt={name}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
                key={i}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity: </h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{quantity}</span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>

          <div className="buttons">
            <button
              className="add-to-cart"
              onClick={() => onAdd(product, quantity)}
            >
              Add to Cart
            </button>
            <button className="buy-now" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((product) => (
              <Product product={product} key={product._id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
