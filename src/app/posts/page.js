"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchPageData } from '../../utils/fetchPageData';
import { fetchPosts } from '../../utils/fetchPosts';
import PostCard from '../../components/post-card';
import Link from 'next/link';

const Posts = () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
//   const [pageData, setPageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTagId, setSelectedTagId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     const slug = 'posts';
//     fetchPageData(slug)
//       .then((data) => {
//         setPageData(data);
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.log('Error fetching page data');
//       });
//   }, []);

  useEffect(() => {
    fetchPosts()
      .then((posts) => {
        setPosts(posts);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log('Error fetching Posts:', error);
        setIsLoading(false);
      });
  }, []);


  useEffect(() => {
    const tags = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/tags`);
        const tags = response.data;
        setTags(tags);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching tags:', error);
        setIsLoading(false);
      }
    };

    tags();
  }, []);


  const handleTagChange = (event) => {
    const newTagId = event.target.value;
    setSelectedTagId(newTagId);
    setSearchQuery(''); // Clear search query when selecting a tag
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setSelectedTagId(null); // Clear selected tag when searching
  };

  // Filter posts based on selected tag or search query
  const filteredPosts = selectedTagId
    ? posts.filter((post) => post.tags.includes(parseInt(selectedTagId, 10)))
    : posts.filter((post) => {
        const postTitle = post.title.rendered.toLowerCase();
        const postContent = post.acf.post_content.toLowerCase();
        const query = searchQuery.toLowerCase();

        return postTitle.includes(query) || postContent.includes(query);
      });


  if (isLoading) {
    return( 
    <div className="loading">
      <img src="/loading.gif"/>
    </div> );
  }



  return (
    <>
          <form>
        {tags &&
          tags.map((tag) => (
            <div key={tag.id}>
              <input
                type="radio"
                name="tags"
                id={tag.id}
                value={tag.id}
                onChange={handleTagChange}
                checked={selectedTagId === tag.id}
              />
              <label htmlFor={tag.id}>{tag.name}</label>
            </div>
          ))}
      </form>

      <div>
        <input
          type="search"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

    <div className="">
      {filteredPosts.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}
    </div>
  </>
  );
};

export default Posts;
