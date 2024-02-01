
// // utils/fetchDogs.js
// import axios from 'axios';

// const apiBaseUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

// export const fetchDogs = async (taxonomyName) => {
//   try {
//     const response = await axios.get(`${apiBaseUrl}/dog`, {
//       params: {
//         _fields: 'id,title,acf,dog,taxonomies',
//         taxonomy: taxonomyName,
//       },
//     });

//     const dogs = response.data;
//     console.log(dogs);

//     return dogs.map(dog => ({
//       ...dog,
//     }));
//   } catch (error) {
//     console.error('Error fetching Dogs:', error);
//     throw error;
//   }
// };

import axios from 'axios';

const apiBaseUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

export const fetchDogs = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/dog`, {
      params: {
        _fields: 'id,title,acf,dog-option',
      },
    });

    const dogs = response.data;
    // console.log(dogs);
        return dogs.map(dog =>({
            ...dog
        })) 
     


  } catch (error) {
    console.error('Error fetching Dogs:', error);
    throw error;
  }
};


export const fetchDogDetail = async (id) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/dog/${id}`, {
      params: {
        _fields: 'id,title,acf', 
      },
    });

    const dog = response.data;
    // const imageURL = dog.acf.dog_image; 

    return {
      ...dog,
      // imageURL: imageURL,
    };
  } catch (error) {
    console.error('Error fetching dog details:', error);
    throw error;
  }
};