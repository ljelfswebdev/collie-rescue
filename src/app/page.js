"use client";

// components/Homepage.js
import React, { useEffect, useState } from 'react';
import { fetchPageData } from '../utils/fetchPageData';
import Loading from '../components/global/loading';
import Hero from '../components/pages/homepage/hero';
import Mission from '../components/pages/homepage/mission';

const Homepage = () => {
  const [pageData, setPageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const slug = 'homepage';
    fetchPageData(slug)
      .then((data) => {
        setPageData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log('Error fetching page data');
      });
  }, []);



  if (isLoading) {
    return( 
      <Loading/>
     );
  }

  return (
    <>
      <section className="bg-blue pt-48 pb-32" id="HomePage-hero">
        <div className="container">
            <Hero pageData={pageData}/>
        </div>
      </section>
      <section className="py-16 bg-green" id="Homepage-mission">
        <div className="container">
          <Mission pageData={pageData}/>
        </div>
      </section>
      <section className="" id="Homepage-about"></section>
      <section className="" id="Homepage-counter"></section>
      <section className="" id="Homepage-involved"></section>
      <section className="" id="Homepage-collies"></section>
      <section className="" id="Homepage-news"></section>
      <section className="" id="Homepage-supporters"></section>
      <section className="" id="Homepage-donation"></section>
    </>
  );
};

export default Homepage;
