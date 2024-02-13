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
import "../../../styles/dropdown.css";
import RelatedProducts from '../../../components/pages/product/related';
import CartSuccess from '../../../components/pages/product/cart-success';
import CartFailure from '../../../components/pages/product/cart-failure';

const Product = () => {
    const pathname = usePathname();
    const parts = pathname.split('/');
    const id = parts[parts.length - 1];

    const apiBaseUrl = process.env.NEXT_PUBLIC_WORDPRESS_WOO_API;
    const consumerKey = process.env.NEXT_PUBLIC_WOO_KEY;
    const consumerSecret = process.env.NEXT_PUBLIC_WOO_SECRET;
  
    const [productDetail, setProductDetail] = useState(null);
    const [productReviews, setProductReviews] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState(null);
    
    console.log(productReviews);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [quantity, setQuantity] = useState(1); 
    const [formSubmitted, setFormSubmitted] = useState(false);

    const { addToCart } = useCart();
    const [isSuccess, setIsSuccess] = useState(null);

    useEffect(() => {
        const fetchProductAndRelated = async () => {
            try {
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
    
                const productRequestData = {
                    url: `${apiBaseUrl}/products/${id}`,
                    method: "GET",
                };
    
                const productResponse = await axios.get(productRequestData.url, {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    params: oauth.authorize(productRequestData),
                });
    
                const fetchedProduct = productResponse.data;
                setProductDetail(fetchedProduct);
    
                if (fetchedProduct.upsell_ids && fetchedProduct.upsell_ids.length > 0) {
                    const relatedRequestData = {
                        url: `${apiBaseUrl}/products`,
                        method: "GET",
                        params: {
                            include: fetchedProduct.upsell_ids.join(','),
                        },
                    };
    
                    const relatedResponse = await axios.get(relatedRequestData.url, {
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                        params: oauth.authorize(relatedRequestData),
                    });
    
                    const fetchedRelatedProducts = relatedResponse.data.filter(product => fetchedProduct.upsell_ids.includes(product.id));
                    setRelatedProducts(fetchedRelatedProducts);
                } else {
                    setRelatedProducts([]);
                }

                //reviews
                if (id) {

                    const relatedReviewData = {
                        url: `${apiBaseUrl}/products/reviews`,
                        method: "GET",
                        params: {
                            status: 'all',
                        //    product: [id]
                        },
                    };

                    // console.log(relatedReviewData)
    
                    const fetchedReviewProducts = await axios.get(relatedReviewData.url, {
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                        params: oauth.authorize(relatedReviewData),
                    });
                
    
                
                    setProductReviews(fetchedReviewProducts);
                } else {
                    setProductReviews([]);
                }
    
    
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching product details and related products:", error);
                setIsLoading(false);
            }
        };
    
        fetchProductAndRelated();
    }, [id, apiBaseUrl, consumerKey, consumerSecret]);
    
    

    const handleAddToCart = () => {
        const identifier = JSON.stringify(selectedOptions);
        const productWithOptions = { ...productDetail, selectedOptions, identifier, quantity }; // Include quantity in productWithOptions
        addToCart(productWithOptions); // Update cart state
        setIsSuccess(true); // Set isSuccess to true as the product is successfully added to the cart
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
                        required 
                    />
                </div>
                {formSubmitted && !selectedOptions[attribute.name] && (
                    <span className="text-red-500">Please select an option for this attribute.</span>
                )}
            </div>
        ));
    };

    
    const handleClosePopup = () => {
        setIsSuccess(null);
    };
    

    if (isLoading) {
        return( 
            <Loading/>
        );
    }

    return (
        <>
        {isSuccess === true && <CartSuccess onClosePopup={handleClosePopup}/>}
        {isSuccess === false && <CartFailure  onClosePopup={handleClosePopup}/>}
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
                        dangerouslySetInnerHTML={{ __html: productDetail.short_description }}
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
                                <div  className="font-primary text-text-title font-bold text-sm cursor-pointer" onClick={handleDecreaseQuantity}>-</div>
                                <span className="font-primary text-text-title font-bold text-lg">{quantity}</span>
                                <div className="font-primary text-text-title font-bold text-sm cursor-pointer" onClick={handleIncreaseQuantity}>+</div>
                            </div>
                            <button type="submit" className="button button--black">Add to Cart</button>
                        </div>
                    </form>
                    
    
                    </div>
                </div>
            </div>
        </section>

        <section className="py-10" id="Product-lower">
            <div className="container">
                <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4">
                   
                    <input type="radio" name="product-detail-tabs" id="description" value="description" className="peer/description" hidden defaultChecked/>
                    <label htmlFor='description' className="text-2xl font-primary text-text-title font-bold cursor-pointer peer-checked/description:text-green">Description</label>
                    <div className="hidden w-full order-10 mt-4 peer-checked/description:flex">
                        {productDetail.description && (
                            <div className="font-secondary text-text-body text-base" dangerouslySetInnerHTML={{ __html: productDetail.description }}>

                            </div>
                        )}
                    </div>

                    <input type="radio" name="product-detail-tabs" id="reviews" value="reviews" className="peer/reviews" hidden/>
                    <label htmlFor='reviews' className="text-2xl font-primary text-text-title font-bold cursor-pointer peer-checked/reviews:text-green">Reviews</label>
                    <div className="hidden w-full order-10 mt-4 peer-checked/reviews:flex">
                         Reviews here
                    </div>
                </div>
            </div>
        </section>

        <RelatedProducts relatedProducts={relatedProducts} />
        </>
    );
}
 
export default Product;
