

"use client";
import React, { useState, useEffect } from "react";

import axios from "axios";
import OAuth from "oauth-1.0a";
import crypto from "crypto";
import Link from "next/link";
import Loading from '../../components/global/loading';

const Shop = () => {
    const apiBaseUrl = process.env.NEXT_PUBLIC_WORDPRESS_WOO_API;
    const consumerKey = process.env.NEXT_PUBLIC_WOO_KEY;
    const consumerSecret = process.env.NEXT_PUBLIC_WOO_SECRET;
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const oauth = OAuth({
      consumer: { key: consumerKey, secret: consumerSecret },
      signature_method: "HMAC-SHA1",
      hash_function: (base_string, key) => {
        return crypto
          .createHmac("sha1", key)
          .update(base_string)
          .digest("base64");
      },
    });

    const requestData = {
      url: `${apiBaseUrl}/products`,
      method: "GET",
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get(requestData.url, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          params: oauth.authorize(requestData),
        });
        const fetchedProducts = response.data;
        setProducts(fetchedProducts);
        console.log(fetchedProducts);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching Products:", error);
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [apiBaseUrl, consumerKey, consumerSecret]);

  if (isLoading) {
    return( 
      <Loading/>
    );
  }
  return (
    <>
      <h1>Shop Here</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
             <Link href={`shop/${product.id}`}>
                {product.name}
            {product.price}
            </Link>
            </li>
        ))}
      </ul>
    </>
  );
};
export default Shop;