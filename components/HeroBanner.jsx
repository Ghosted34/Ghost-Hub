import React from "react";
import Link from "next/link";

import { urlFor } from "../lib/client";

const HeroBanner = ({ hero }) => {
  return (
    <section className="hero-banner-container">
      <div>
        <div style={{ zIndex: 2, position: "sticky" }}>
          <p className="beats-solo">{hero.smallText}</p>
          <h3>{hero.midText}</h3>
          <h1>{hero.largeText1}</h1>
        </div>
        <div className="hero-banner-image-container">
          <img
            src={urlFor(hero.image)}
            alt="headphones"
            className="hero-banner-image"
          />
        </div>

        <div>
          <Link href={`/product/${hero.product}`}>
            <button type="button">{hero.buttonText}</button>
          </Link>

          <div className="desc">
            <h5>Description</h5>
            <p>{hero.desc}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
