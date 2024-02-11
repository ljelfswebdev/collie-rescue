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
import 'react-dropdown/style.css';
import "../../../styles/dropdown.css"

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
    const [formSubmitted, setFormSubmitted] = useState(false);

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

    const handleOptionChange = (attributeName, optionValue) => {
        setSelectedOptions({ ...selectedOptions, [attributeName]: optionValue });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setFormSubmitted(true);
        const allDropdownsSelected = productDetail.attributes.every(attribute => 
            selectedOptions[attribute.name]
        );

        if (allDropdownsSelected) {
            handleAddToCart();
        } else {

            console.error("Please select options for all attributes.");
        }
    };
    const renderAttributes = () => {
        return productDetail.attributes.map((attribute, index) => (
            <div key={index} className="flex flex-col gap-2">
                <p className="font-primary text-text-title text-base">{attribute.name}</p>
                <div className="flex gap-8">
                    <Dropdown
                        options={attribute.options}
                        value={selectedOptions[attribute.name]}
                        onChange={(option) => handleOptionChange(attribute.name, option.value)}
                        className="w-full mb-4"
                        required  // Mark dropdown as required
                    />
                </div>
                {formSubmitted && !selectedOptions[attribute.name] && (
                    <span className="text-red-500">Please select an option for this attribute.</span>
                )}
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

                    <span className="font-secondary text-2xl font-bold text-text-title mb-6">
                        £{parseFloat(productDetail.price).toFixed(2)}
                    </span>

                    <form onSubmit={handleSubmit} >
                        {renderAttributes()}
                        <div className="flex gap-4 mt-2">
                            <div className="h-[56px] w-40 rounded-xl border-2 border-blue border-solid flex justify-center items-center gap-4 ">
                                <button  className="font-primary text-text-title font-bold text-sm" onClick={handleDecreaseQuantity}>-</button>
                                <span className="font-primary text-text-title font-bold text-lg">{quantity}</span>
                                <button className="font-primary text-text-title font-bold text-sm" onClick={handleIncreaseQuantity}>+</button>
                            </div>
                            <button type="submit" className="button button--black">Add to Cart</button>
                        </div>
                    </form>
                    
    
                    </div>
                </div>
            </div>
        </section>
        </>
    );
}
 
export default Product;
