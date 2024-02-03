"use client"
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../../../styles/swiper.css';
import Link from 'next/link';

const Hero = ({ pageData }) => {
  const title = pageData.acf.hero_text;
  const heroGallery = pageData.acf.hero_gallery || [];

  return (
    <>

{title && (
  <h1 className="font-moch text-white font-bold text-4xl text-center max-w-lg mx-auto mb-10">
    {title}
  </h1>
)}
    <Swiper
      slidesPerView={1}
      navigation={true}
      pagination={true}
      modules={[Navigation, Pagination]}
      className="max-w-3xl mx-auto rounded-2xl"
    >
       {heroGallery.map((image, index) => (
        <SwiperSlide key={index}>
          <Image
            src={image}
            alt={`Hero Slide ${index + 1}`}
            width={896}
            height={415}
          />
        </SwiperSlide>
      ))}
    </Swiper>
    <div className="w-full mx-auto flex justify-center items-center gap-4 z-10 relative -mt-20">
        <Link href="rehoming" className="button button--orange">
            Dogs For Rehoming
        </Link>
        <Link href="donation" className="button button--pink">
            Make A Donation
        </Link>
    </div>
    </>
  );
};

export default Hero;
