"use client";

// components/Homepage.js
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchPageData } from '../utils/fetchPageData';
import Loading from '../components/global/loading';
import Hero from '../components/pages/homepage/hero';
// import Mission from '../components/pages/homepage/mission';
// import LatestNews from '../components/global/latest-news-slider';
import dynamic from 'next/dynamic'
const LatestNews = dynamic(() => import('../components/global/latest-news-slider'), { ssr: false });
const Mission = dynamic(() => import('../components/pages/homepage/mission'), { ssr: false });
const Counter = dynamic(() => import('../components/global/counter'), { ssr: false });


const Homepage = () => {
  const [pageData, setPageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // console.log(pageData);

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
      <section className="" id="Homepage-about">
        About
      </section>
      <section className="py-16 bg-blue/40" id="Homepage-counter">
        <div className="container">
          <Counter pageData={pageData}/>
        </div>
      </section>
      <section className="" id="Homepage-involved">
        Involved
      </section>
      <section className="py-16" id="Homepage-collies">
        Collies
      </section>
      <section className="py-16" id="Homepage-news">
          <div className="container">
            <div className="flex flex-col gap-10">
              {pageData.acf.latest_news_title && (
                <h2 className="font-primary text-4xl text-text-title text-center">
                  {pageData.acf.latest_news_title}
                </h2>
              )}
              <LatestNews/>
              <Link href="posts" className="button button--orange mx-auto mt-8">
                View All Posts
              </Link>
            </div>
          </div>
      </section>
      <section className="" id="Homepage-supporters">
        Supporters
      </section>
      <section className="" id="Homepage-donation">
        Dontions
      </section>
    </>
  );
};

export default Homepage;
