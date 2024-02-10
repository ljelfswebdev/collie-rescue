

"use client";
import React, { useState, useEffect } from "react";

import axios from "axios";
import OAuth from "oauth-1.0a";
import crypto from "crypto";
import Link from "next/link";
import Loading from '../../components/global/loading';
import Banner from "../../components/global/banner";
import ProductCard from "../../components/cards/product-card";

import { fetchPageData } from '../../utils/fetchPageData';

const Shop = () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_WORDPRESS_WOO_API;
  const consumerKey = process.env.NEXT_PUBLIC_WOO_KEY;
  const consumerSecret = process.env.NEXT_PUBLIC_WOO_SECRET;
  const [pageData, setPageData] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log(products);

  useEffect(() => {
    const slug = 'shop';
    fetchPageData(slug)
      .then((data) => {
        setPageData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log('Error fetching page data');
      });
  }, []);
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
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching Products:", error);
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [apiBaseUrl, consumerKey, consumerSecret]);

  if (isLoading || !pageData) {
    return( 
      <Loading/>
    );
  }
  return (
    <>
      <section className="" id="Shop-banner">
        <Banner pageData={pageData} />
      </section>
      <section className="pb-40" id="Shop-list">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
          </div>
        </div>
      </section>
    </>
  );
};
export default Shop;