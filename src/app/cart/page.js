"use client";

import React, { useEffect, useState } from 'react';
import { useCart } from '../../utils/cartContext';
import Loading from '../../components/global/loading';
import Banner from '../../components/global/banner';
import { fetchPageData } from '../../utils/fetchPageData';
import CartCardDesktop from '../../components/pages/cart/cart-card-desktop';
import CartCardMobile from '../../components/pages/cart/cart-card-mobile';
import Link from 'next/link';

const CartPage = () => {
  const [pageData, setPageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
            <Link href="" className="button button--black w-60">Proceed To Payment</Link>
            
            <div className="font-primary text-xl text-text-title">
            <button className="button button--pink !w-60" onClick={() => clearCart()}>Clear Cart</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CartPage;
