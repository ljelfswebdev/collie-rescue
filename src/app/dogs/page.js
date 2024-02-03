"use client";

// components/Dogs.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchPageData } from '../../utils/fetchPageData';
import { fetchDogs } from '../../utils/fetchDogs';
import DogCard from '../../components/cards/dog-card';
import Link from 'next/link';

const Dogs = () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
  const [pageData, setPageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dogs, setDogs] = useState([]);
  const [dogTerms, setDogTerms] = useState([]);

  useEffect(() => {
    const slug = 'dogs';
    fetchPageData(slug)
      .then((data) => {
        setPageData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log('Error fetching page data');
      });
  }, []);

  useEffect(() => {
    fetchDogs()
      .then((dogs) => {
        setDogs(dogs);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log('Error fetching Dogs:', error);
        setIsLoading(false);
      });
  }, []);


  useEffect(() => {
    const fetchDogTerms = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/dog-option`);
        const dogTerms = response.data;
        setDogTerms(dogTerms);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching terms of "dog" taxonomy:', error);
        setIsLoading(false);
      }
    };

    fetchDogTerms();
  }, []);



  if (isLoading || !pageData) {
    return( 
    <div className="loading">
      <img src="/loading.gif"/>
    </div> );
  }



  return (
    <>
            <div className="">
              {pageData.acf.page_title}
            </div>

            {dogTerms &&
                  dogTerms.map((term) => (
                    <Link href={`dog-option/${term.slug}`}  key={term.id} value={term.id}>
                      {term.name}
                    </Link>
                  ))}


            <div className="">
            {dogs.map((dog) => (
              <DogCard dog={dog} key={dog.id} />
            ))}
          </div>
      
    </>
  );
};

export default Dogs;
