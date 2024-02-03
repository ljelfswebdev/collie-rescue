import axios from 'axios';

const apiBaseUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

export const fetchPosts = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/posts`, {
      params: {
        _fields: 'id,title,acf,tags,categories,date',
      },
    });

    const posts = response.data;
        return posts.map(post =>({
            ...post
        })) 
     


  } catch (error) {
    console.error('Error fetching Posts:', error);
    throw error;
  }
};


export const fetchPostDetail = async (id) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/posts/${id}`, {
      params: {
        _fields: 'id,title,acf,tags,categories,date', 
      },
    });

    const post = response.data;
    // const imageURL = dog.acf.dog_image; 

    return {
      ...post,
      // imageURL: imageURL,
    };
  } catch (error) {
    console.error('Error fetching post details:', error);
    throw error;
  }
};