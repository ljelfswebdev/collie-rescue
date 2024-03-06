"use client";

import React, { useEffect, useState } from 'react';
import { useCart } from '../../utils/cartContext';
import axios from "axios";
import OAuth from "oauth-1.0a";
import crypto from "crypto";
import Loading from '../../components/global/loading';
import Banner from '../../components/global/banner';
import { fetchPageData } from '../../utils/fetchPageData';
import CartCardDesktop from '../../components/pages/cart/cart-card-desktop';
import CartCardMobile from '../../components/pages/cart/cart-card-mobile';
import Link from 'next/link';
import debounce from 'lodash/debounce';




const CartPage = () => {
  const [pageData, setPageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const apiBaseUrl = process.env.NEXT_PUBLIC_WORDPRESS_WOO_API;
  const consumerKey = process.env.NEXT_PUBLIC_WOO_KEY;
  const consumerSecret = process.env.NEXT_PUBLIC_WOO_SECRET;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    country: '',
    state: '',
    postcode: '',
    email: '',
    phone: '',
    company: '',
    errors: null
  });


  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  useEffect(() => {
    const slug = 'cart';
    fetchPageData(slug)
      .then((data) => {
        setPageData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log('Error fetching page data');
      });
  }, []);


  const { cart, addToCart, removeFromCart, clearCart, updateQuantity } = useCart(); 

  const lineItems = cart.map(item => ({
    product_id: item.id,
    quantity: item.quantity,
    ...(item.variation_id && { variation_id: item.variation_id }) // Include variation_id if available
  }));

  const handleIncreaseQuantity = (identifier) => {
    updateQuantity(identifier, 1); 
  };

  const handleDecreaseQuantity = (identifier) => {

    const currentItem = cart.find(item => item.identifier === identifier);
    if (currentItem && currentItem.quantity > 1) {

      updateQuantity(identifier, -1);
    }
  };
  

  const calculateTotalCartPrice = () => {
    return cart.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
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
  
      const orderData = {
        url: `${apiBaseUrl}/orders`,
        method: "POST",
        data: {
          ...formData,
          line_items: lineItems
        },
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...oauth.toHeader(oauth.authorize({
            url: `${apiBaseUrl}/orders`,
            method: "POST",
          })),
        },
      };
  
      const order = await axios(orderData);
      console.log('Order submitted successfully:', order.data);
    } catch (error) {
      console.error("Error sending order:", error);
    }
  };
  

  const displayCheckout = () => {
    const checkoutSection = document.getElementById('checkout');
    checkoutSection.style.display = 'flex';
    checkoutSection.scrollIntoView({ behavior: 'smooth' });
  }


  const debouncedHandleChange = debounce((name, value) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  }, 10000);
  
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    debouncedHandleChange(name, value);
  };



  
  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      shippingSameAsBilling: checked,
      shipping: checked ? { ...prevFormData.billing } : { ...prevFormData.shipping },
    }));
  };
  



  const InputField = ({ label, name, value, onChange }) => (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="font-primary text-xl text-text-title">
        {label}
      </label>
      <input
        className="border border-solid border-grey rounded-xl px-4 h-12"
        type="text"
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );



  if (isLoading || !pageData) {
    return( 
        <Loading/>
    );
  }

  return (
    <>
      <Banner pageData={pageData}/>
      <section className="pb-10" id="Cart">
        <div className="container">
          
          <div className="flex flex-col w-full">
            <div className="hidden mlg:flex bg-orange h-16 w-full rounded-t items-center">
              <div className="w-[5%] h-full border-r border-grey border-solid flex items-center px-4"></div>
              <div className="w-[10%] h-full border-r border-grey border-solid flex items-center px-4"></div>
              <div className="w-[30%] h-full border-r border-grey border-solid flex items-center px-4 font-primary text-white">Product</div>
              <div className="w-[15%] h-full border-r border-grey border-solid flex items-center px-4 font-primary text-white">Price</div>
              <div className="w-[18%] h-full border-r border-grey border-solid flex items-center px-4 font-primary text-white">Quantity</div>
              <div className="w-[22%] h-full flex items-center px-4 font-primary text-white">Subtotal</div>
            </div>
            {cart.map(item => (
              windowWidth > 896 ? <CartCardDesktop 
              key={`${item.id}-${item.identifier}`} 
              item={item}
              addToCart={addToCart} 
              removeFromCart={removeFromCart} 
              updateQuantity={updateQuantity} 
              handleIncreaseQuantity={handleIncreaseQuantity} 
              handleDecreaseQuantity={handleDecreaseQuantity} 
              /> 
              : 
              <CartCardMobile 
              key={`${item.id}-${item.identifier}`} 
              item={item}
              addToCart={addToCart} 
              removeFromCart={removeFromCart} 
              updateQuantity={updateQuantity} 
              handleIncreaseQuantity={handleIncreaseQuantity} 
              handleDecreaseQuantity={handleDecreaseQuantity} 
              />
            ))}


          </div>



          <div className="flex flex-col gap-4 mt-4 items-end">
            <div className="font-primary text-xl text-text-title">
              Total to Pay - £{calculateTotalCartPrice().toFixed(2)}
            </div>
            <button className="button button--black w-60" onClick={() => displayCheckout()}>Proceed To Payment</button>
            
            <div className="font-primary text-xl text-text-title">
            <button className="button button--pink !w-60" onClick={() => clearCart()}>Clear Cart</button>
            </div>
          </div>
        </div>
      </section>
      <section className="hidden pb-20" id="checkout">
        <div className="container">
        <form onSubmit={handleSubmit} className="flex flex-col">
        <InputField
          label="Payment Method"
          name="payment_method"
          value={formData.payment_method}
          onChange={handleChange}
        />
          
          <fieldset>
            <legend  className="text-3xl text-text-title mb-4">Billing Details</legend>
            <InputField
              label="First Name"
              name="billing_first_name"
              value={formData.firstName}
              onChange={handleChange}
            />
            <InputField
              label="Last Name"
              name="billing_last_name"
              value={formData.billing_last_name}
              onChange={handleChange}
            />
            <InputField
              label="Address Line 1"
              name="billing_address_1"
              value={formData.billing_address_1}
              onChange={handleChange}
            />
            <InputField
              label="Address Line 2"
              name="billing_address_2"
              value={formData.billing_address_2}
              onChange={handleChange}
            />
            <InputField
              label="City"
              name="billing_city"
              value={formData.billing_city}
              onChange={handleChange}
            />
            <InputField
              label="State"
              name="billing_state"
              value={formData.billing_state}
              onChange={handleChange}
            />
            <InputField
              label="Postcode"
              name="billing_postcode"
              value={formData.billing_postcode}
              onChange={handleChange}
            />
            <InputField
              label="Country"
              name="billing_country"
              value={formData.billing_country}
              onChange={handleChange}
            />
            <InputField
              label="Email"
              name="billing_email"
              value={formData.billing_email}
              onChange={handleChange}
            />
            <InputField
              label="Phone"
              name="billing_phone"
              value={formData.billing_phone}
              onChange={handleChange}
            />
          </fieldset>

          <fieldset>
            <legend className="text-3xl text-text-title mb-4">Shipping Details</legend>
            <label>
              <input
                type="checkbox"
                name="shippingSameAsBilling"
                checked={formData.shippingSameAsBilling}
                onChange={handleCheckboxChange}
              />
              Same as Billing
            </label>
            {/* Shipping input fields */}
            {formData.shippingSameAsBilling ? null : (
              <fieldset>
                <legend className="text-3xl text-text-title mb-4">Shipping Details</legend>
                <InputField
                  label="First Name"
                  name="shipping_first_name"
                  value={formData.shipping_first_name}
                  onChange={handleChange}
                />
                <InputField
                  label="Last Name"
                  name="shipping_last_name"
                  value={formData.shipping_last_name}
                  onChange={handleChange}
                />
                <InputField
                  label="Address Line 1"
                  name="shipping_address_1"
                  value={formData.shipping_address_1}
                  onChange={handleChange}
                />
                <InputField
                  label="Address Line 2"
                  name="shipping_address_2"
                  value={formData.shipping_address_2}
                  onChange={handleChange}
                />
                <InputField
                  label="City"
                  name="shipping_city"
                  value={formData.shipping_city}
                  onChange={handleChange}
                />
                <InputField
                  label="State"
                  name="shipping_state"
                  value={formData.shipping_state}
                  onChange={handleChange}
                />
                <InputField
                  label="Postcode"
                  name="shipping_postcode"
                  value={formData.shipping_postcode}
                  onChange={handleChange}
                />
                <InputField
                  label="Country"
                  name="shipping_country"
                  value={formData.shipping_country}
                  onChange={handleChange}
                />
              </fieldset>
            )}
          </fieldset>


          <button type="submit">Submit</button>
        </form>

        </div>
      </section>
    </>
  );
};

export default CartPage;
