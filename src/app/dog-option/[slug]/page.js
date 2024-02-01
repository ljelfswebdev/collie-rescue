'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import axios from 'axios';
import { fetchDogs } from '../../../utils/fetchDogs';
import DogCard from '../../../components/dog-card';

const DogTerm = () => {
  const pathname = usePathname();
  const parts = pathname.split('/');
  const id = parts[parts.length - 1];

  const [taxonomyName, setTaxonomyName] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dogs, setDogs] = useState([]);
  const [matchingTermId, setMatchingTermId] = useState(null);
// ... existing state variables ...

const [bannerText, setBannerText] = useState(null);

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

          const termBannerText = matchingTerm.acf.banner_text;
          setBannerText(termBannerText);

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
    if (matchingTermId && dogs.length > 0) {
      const filteredDogs = dogs.filter(dog =>
        dog['dog-option'] && dog['dog-option'].includes(matchingTermId)
      );
      if (JSON.stringify(filteredDogs) !== JSON.stringify(dogs)) {
        setDogs(filteredDogs);
      }
    }
  }, [matchingTermId, dogs]);
  

  if (isLoading) {
    return (
      <div className="loading">
        <img src="/loading.gif" alt="Loading..." />
      </div>
    );
  }

  return (
    <div>
      {taxonomyName && <p>Taxonomy Name: {taxonomyName}</p>}
      {bannerText && <div dangerouslySetInnerHTML={{ __html: bannerText }} />}

      {dogs.length > 0 ? (
        <ul>
          {dogs.map(dog => (
            <DogCard dog={dog} key={dog.id} />
          ))}
        </ul>
      ) : (
        <p>No dogs found for the given term.</p>
      )}
    </div>
  );
  
};

export default DogTerm;
