'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import axios from 'axios';
import { fetchDogs } from '../../../utils/fetchDogs';
import DogCard from '../../../components/cards/dog-card';
import Banner from '../../../components/global/banner';
import Loading from '../../../components/global/loading';
import { fetchTaxData } from '../../../utils/fetchPageData';

const DogTerm = () => {
  const pathname = usePathname();
  const parts = pathname.split('/');
  const id = parts[parts.length - 1];

  const [pageData, setPageData] = useState(null);

  const [taxonomyName, setTaxonomyName] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dogs, setDogs] = useState([]);
  const [matchingTermId, setMatchingTermId] = useState(null);


useEffect(() => {
  const fetchData = async () => {
    try {
      if (id) {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/dog-option/`
        );

        const matchingTerm = response.data.find(term => term.slug === id);

        if (matchingTerm) {
          const name = matchingTerm.name;
          setTaxonomyName(name);
          setMatchingTermId(matchingTerm.id);

          const dogsResponse = await fetchDogs();
          setDogs(dogsResponse);

          setIsLoading(false);
        } else {
          console.warn(`No matching term found for slug ${id}`);
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  fetchData();
}, [id]);

useEffect(() => {
  if (taxonomyName) {
    const slug = taxonomyName.toLowerCase();
    fetchTaxData(slug)
      .then((data) => {
        setPageData(data);
      })
      .catch((error) => {
        console.error("Error fetching page data:", error);
      });
  }
}, [taxonomyName]);

  useEffect(() => {
    if (matchingTermId && dogs.length > 0) {
      const filteredDogs = dogs.filter(dog =>
        dog['dog-option'] && dog['dog-option'].includes(matchingTermId)
      );
      if (JSON.stringify(filteredDogs) !== JSON.stringify(dogs)) {
        setDogs(filteredDogs);
      }
    }
  }, [matchingTermId, dogs]);
  

  if (isLoading || !pageData) {
    return (
      <Loading/>
    );
  }

  return (
    <div>
      <Banner pageData={pageData}/>
      
      {dogs.length > 0 ? (
        <div className="container">
          <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-10">
            {dogs.map(dog => (
              <DogCard dog={dog} key={dog.id} />
            ))}
          </div>
          </div>
      ) : (
        <p className="text-xl font-moch text-text-title">No dogs found for the given term.</p>
      )}
      
    </div>
  );
  
};

export default DogTerm;
