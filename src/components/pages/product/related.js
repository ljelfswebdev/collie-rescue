"use client"

// LatestNews.js
import ProductCard from "../../../components/cards/product-card";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import '../../../styles/swiper.css';

const RelatedProducts = ({relatedProducts}) => {

    return ( <section className="py-16 bg-grey/20" id="RelatedProducts">
        <div className="container">
            <div className="">
                <div className="text-4xl font-primary text-text-title font-bold text-center mb-10">
                    Related Products
                </div>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={0}
                    navigation={true}
                    modules={[Navigation]}
                    breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    900: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    }}
                    className="max-w-full related-slider"
                >
                    {relatedProducts.map((product, index) => (
                        <SwiperSlide key={index}>
                        <ProductCard product={product} key={product.id} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    </section>
    );
}
 
export default RelatedProducts;
