"use client";

// components/Homepage.js
import React, { useEffect, useState } from 'react';
import { fetchPageData } from '../utils/fetchPageData';
import Loading from './components/global/loading';
import Hero from './components/pages/homepage/hero';

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
      <section className="bg-blue pt-48 pb-20" id="HomePage-Hero">
        <div className="container">
            <Hero pageData={pageData}/>
        </div>
      </section>
    </>
  );
};

export default Homepage;
