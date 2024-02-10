"use client";


import React, { useState, useEffect } from "react";
import axios from "axios";
import OAuth from "oauth-1.0a";
import crypto from "crypto";
import Link from "next/link";
import Loading from "../../components/global/loading";
import Banner from "../../components/global/banner";
import ProductCard from "../../components/cards/product-card";
import { fetchPageData } from "../../utils/fetchPageData";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import "../../styles/dropdown.css"


const Shop = () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_WORDPRESS_WOO_API;
  const consumerKey = process.env.NEXT_PUBLIC_WOO_KEY;
  const consumerSecret = process.env.NEXT_PUBLIC_WOO_SECRET;
  const [pageData, setPageData] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  

  useEffect(() => {
    const slug = "shop";
    fetchPageData(slug)
      .then((data) => {
        setPageData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching page data");
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

    const requestCats = {
      url: `${apiBaseUrl}/products/categories`,
      method: "GET",
    };


    const fetchCategories = async () => {
      try {
        const cats = await axios.get(requestCats.url, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          params: oauth.authorize(requestCats),
        });
        const fetchedCategories = cats.data;
        setCategories(fetchedCategories);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setIsLoading(false);
      }
    }
    fetchCategories();
  }, [apiBaseUrl, consumerKey, consumerSecret]);



  const handleCategoryChange = (selected) => {
    if (selected) {
      setSelectedCategory(selected.value);
      setSearchQuery("");
    } else {
      setSelectedCategory("");
    }
  };
  
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setSelectedCategory(""); 
  };

  const resetFilters = (e) => {
    e.preventDefault();
    setSearchQuery("");
    setSelectedCategory("");
  }

  const filteredProducts = products.filter((product) => {
    const nameMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const categoryMatch = selectedCategory === "" || product.categories.some(category => category.slug === selectedCategory);
    return nameMatch && categoryMatch;
  });

  const options = [
    { value: "", label: "All Categories" },
    ...categories.map((category) => ({
      value: category.slug,
      label: category.name,
    })),
  ];
  

  if (isLoading || !pageData) {
    return <Loading />;
  }

  return (
    <>
      <section className="" id="Shop-banner">
        <Banner pageData={pageData} />
      </section>
      <section className="pb-40" id="Shop-list">
        <div className="container">
          <div className="mb-8 flex flex-wrap justify-between gap-4">
            <div className="flex gap-4 flex-wrap">
              <input
                type="search"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full sm:w-fit h-[56px] border-2 border-text-title rounded px-4 py-2 font-primary"
              />

            <Dropdown
              options={options}
              onChange={handleCategoryChange}
              value={selectedCategory}
              placeholder="Select a Category"
            />
              
          </div>
          <button className="button button--green w-full sm:w-fit " onClick={resetFilters}>
            Reset Filters 
          </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProducts.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Shop;
