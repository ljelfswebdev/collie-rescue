'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation'
import { fetchDogDetail } from '../../../utils/fetchDogs';

const DogDetail = () => {

  const pathname = usePathname();
  const parts = pathname.split('/');
  const id = parts[parts.length - 1];

  const [dogDetail, setDogDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchDogDetail(id)
        .then((dogWithImageUrls) => {
          setDogDetail(dogWithImageUrls);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log('Error fetching dog details', error);
          setIsLoading(false);
        });
    }
  }, [id]);

  if (isLoading || !dogDetail) {
    return (
      <div className="loading">
        <img src="/loading.gif" alt="Loading..." />
      </div>
    );
  }

  return (
    <div>
      <h1>{dogDetail.title.rendered}</h1>
      <p>text: {dogDetail.acf.dog_info}</p>
      {/* {serviceDetail.imageURL && (
        <img src={serviceDetail.imageURL} alt={serviceDetail.title.rendered} />
      )} */}
    </div>
  );
};

export default DogDetail;
