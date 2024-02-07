// 

"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OAuth from 'oauth-1.0a';
import crypto from 'crypto';

const Shop = () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_WORDPRESS_WOO_API;
  const consumerKey = process.env.NEXT_PUBLIC_WOO_KEY;
  const consumerSecret = process.env.NEXT_PUBLIC_WOO_SECRET;
  const [products, setProducts] = useState([]);


  useEffect(() => {
    const oauth = OAuth({
      consumer: { key: consumerKey, secret: consumerSecret },
      signature_method: 'HMAC-SHA1',
      hash_function: (base_string, key) => {
        return crypto.createHmac('sha1', key).update(base_string).digest('base64');
      },
    });

    const requestData = {
      url: `${apiBaseUrl}/products`,
      method: 'GET',
    };

    const oauthHeaders = oauth.toHeader(oauth.authorize(requestData));

    const fetchProducts = async () => {
      try {
        const response = await axios.get(requestData.url, {
          headers: {
            ...oauthHeaders,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          params: {
            _fields: 'id,name',
          },
        });

        const fetchedProducts = response.data;
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching Products:', error);
      }
    };

    fetchProducts();
  }, [apiBaseUrl, consumerKey, consumerSecret]);

  return (
    <>
      <h1>Shop Here</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </>
  );
};

export default Shop;
