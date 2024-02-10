'use client';
import { useState, useEffect } from 'react';
import axios from "axios";
import OAuth from "oauth-1.0a";
import crypto from "crypto";
import { usePathname } from 'next/navigation'
import Link from "next/link";
import Image from "next/image";
import Loading from '../../../components/global/loading';
import { useCart } from '../../../utils/cartContext';

const Product = () => {
    const pathname = usePathname();
    const parts = pathname.split('/');
    const id = parts[parts.length - 1];

    const apiBaseUrl = process.env.NEXT_PUBLIC_WORDPRESS_WOO_API;
    const consumerKey = process.env.NEXT_PUBLIC_WOO_KEY;
    const consumerSecret = process.env.NEXT_PUBLIC_WOO_SECRET;
  
    const [productDetail, setProductDetail] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [quantity, setQuantity] = useState(1); 

    const { addToCart } = useCart();

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
          url: `${apiBaseUrl}/products/${id}`,
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
            const fetchedProduct = response.data;
            setProductDetail(fetchedProduct);
            setIsLoading(false);
          } catch (error) {
            console.error("Error fetching Products:", error);
            setIsLoading(false);
          }
        };
        fetchProducts();
      }, [apiBaseUrl, consumerKey, consumerSecret]);

    const handleOptionChange = (attributeName, optionValue) => {
        setSelectedOptions({ ...selectedOptions, [attributeName]: optionValue });
    };

    const handleAddToCart = () => {
        const identifier = JSON.stringify(selectedOptions);
        const productWithOptions = { ...productDetail, selectedOptions, identifier, quantity }; // Include quantity in productWithOptions
        addToCart(productWithOptions);
    };

    const handleIncreaseQuantity = () => {
        setQuantity(quantity + 1); // Increase quantity by 1
    };

    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1); 
        }
    };

    const renderOptions = (attribute) => {
        return attribute.options.map((option, index) => (
            <label key={index}>
                <input
                    type="radio"
                    name={attribute.name}
                    value={option}
                    onChange={() => handleOptionChange(attribute.name, option)}
                    checked={selectedOptions[attribute.name] === option}
                />
                {option}
            </label>
        ));
    };

    const renderAttributes = () => {
        return productDetail.attributes.map((attribute, index) => (
            <div key={index}>
                <p>{attribute.name}:</p>
                {renderOptions(attribute)}
            </div>
        ));
    };

    if (isLoading) {
        return( 
            <Loading/>
        );
    }

    return (
        <>
            <h1>{productDetail.name}</h1>
            <p>£{productDetail.price}</p>
            {renderAttributes()}
            <div>
                <button onClick={handleDecreaseQuantity}>-</button>
                <span>{quantity}</span>
                <button onClick={handleIncreaseQuantity}>+</button>
            </div>
            <button onClick={handleAddToCart}>Add to Cart</button>
        </>
    );
}
 
export default Product;
