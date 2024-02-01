"use client";

// components/Homepage.js
import React, { useEffect, useState } from 'react';
import { fetchPageData } from '../utils/fetchPageData';

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
    <div className="loading">
      <img src="/loading.gif"/>
    </div> );
  }

  return (
    <>
      <div className="">
              {pageData.acf.homepage_text}
            </div>
    </>
  );
};

export default Homepage;
