'use client';
// import { useEffect, useState } from 'react';
// import { usePathname } from 'next/navigation';
// import axios from 'axios';
// import { fetchDogs } from '../../utils/fetchDogs';

// const DogTerm = () => {
//   const pathname = usePathname();
//   const parts = pathname.split('/');
//   const id = parts[parts.length - 1];

//   const [taxonomyName, setTaxonomyName] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const [dogs, setDogs] = useState([]);

  
//   useEffect(() => {
//     const fetchTaxonomyName = async () => {
//       try {
//         if (id) {
//           const response = await axios.get(
//             `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/dog-option/`
//           );
  
//           const matchingTerm = response.data.find(term => term.slug === id);
  
//           if (matchingTerm) {
//             const name = matchingTerm.name;
//             setTaxonomyName(name);
//             setIsLoading(false);
//           } else {
//             console.warn(`No matching term found for slug ${id}`);
//             setIsLoading(false);
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching taxonomy name:', error);
//         setIsLoading(false);
//       }
//     };
  
//     fetchTaxonomyName();
//   }, [id]);

//   useEffect(() => {
//     fetchDogs()
//       .then((dogs) => {
//         setDogs(dogs);
//         console.log(dogs);
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.log('Error fetching Dogs:', error);
//         setIsLoading(false);
//       });
//   }, []);
  

//   if (isLoading) {
//     return (
//       <div className="loading">
//         <img src="/loading.gif" alt="Loading..." />
//       </div>
//     );
//   }

//   return (
//     <div>
//       {/* Display the taxonomy name */}
//       {taxonomyName && <p>Taxonomy Name: {taxonomyName}</p>}
//     </div>
//   );
// };
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import axios from 'axios';
import { fetchDogs } from '../../utils/fetchDogs';

const DogTerm = () => {
  const pathname = usePathname();
  const parts = pathname.split('/');
  const id = parts[parts.length - 1];

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

            // Set matchingTermId state
            setMatchingTermId(matchingTerm.id);

            // Fetch dogs
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
      // Filter dogs based on matchingTermId
      const filteredDogs = dogs.filter(dog =>
        dog['dog-option'] && dog['dog-option'].includes(matchingTermId)
      );
  
      console.log('Filtered Dogs:', filteredDogs);
  
      // Only update the state if it's different to avoid an infinite loop
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
      {/* Display the taxonomy name */}
      {taxonomyName && <p>Taxonomy Name: {taxonomyName}</p>}
  
      {/* Display the filtered dogs */}
      {dogs.length > 0 ? (
        <ul>
          {dogs.map(dog => (
            <li key={dog.id}>{dog.title.rendered}</li>
          ))}
        </ul>
      ) : (
        <p>No dogs found for the given term.</p>
      )}
    </div>
  );
  
};

export default DogTerm;
