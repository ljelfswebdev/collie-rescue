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
import Dropdown from 'react-dropdown';

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

    // console.log(productDetail);

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
        return attribute.options.map((option, index) => {
            // Dynamically generate a class name based on the option value
            const beforeBg = `before:bg-${option.toLowerCase()}`;
    
            return (
            <div key={index}>
                <input
                        type="checkbox"
                        name={attribute.name}
                        value={option}
                        onChange={() => handleOptionChange(attribute.name, option)}
                        checked={selectedOptions[attribute.name] === option}
                        id={option}
                        hidden
                        className="peer"
                    />
                   
               <label 
                    htmlFor={option} 
                    className={`relative font-primary text-text-body flex flex-col justify-center items-center
                                before:content-[''] before:relative before:h-12 before:w-12 before:rounded-full before:border before:border-solid before:border-grey
                                before:bg-${option.toLowerCase()}
                                peer-checked:before:border-4
                    `}
                >
                    {option}
                </label>

            </div>
            
            );
        });
    };

    
    const renderAttributes = () => {
        return productDetail.attributes.map((attribute, index) => (
            <div key={index} className="flex flex-col gap-2">
                <p className="font-primary text-text-title text-base">{attribute.name}</p>
                <div className="flex gap-8">
                {renderOptions(attribute)}
                </div>
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
        <section className="py-10" id="Product-info">
            <div className="container">
                <div className="grid grid-cols-1 gap-10 mlg:grid-cols-2">
                    <div className="border-2 border-solid border-grey rounded-xl overflow-hidden">
                        <Image 
                        src={productDetail.images[0].src}
                        alt={productDetail.name}
                        width={500}
                        height={600}
                        className="w-full min-h-[600px] object-cover"
                        />
                    </div>
                    <div className="flex flex-col">
                    {productDetail.categories.length > 0 && (
                        <span className="font-secondary text-orange mb-6">
                            {productDetail.categories[0].name}
                        </span>
                    )}
                    <h2 className="font-primary text-4xl text-text-title font-bold mb-6">
                        {productDetail.name}
                    </h2>
                    {productDetail.description && (
                        <span className="font-secondary text-text-body mb-6" 
                        dangerouslySetInnerHTML={{ __html: productDetail.description }}
                        >
                        </span>
                    )}
                    
                    {renderAttributes()}
                    
                    </div>
                </div>
            </div>
        </section>
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
