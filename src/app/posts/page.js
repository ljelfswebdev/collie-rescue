"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchPageData } from '../../utils/fetchPageData';
import { fetchPosts } from '../../utils/fetchPosts';
import PostCard from '../../components/cards/post-card';
import Link from 'next/link';
import Banner from '../../components/global/banner';
import Loading from '../../components/global/loading';
import Pagination from '../../components/global/pagination';


const Posts = () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
  const [pageData, setPageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTagId, setSelectedTagId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTagName, setSelectedTagName] = useState('');
  const [currentPage, setCurrentPage] = useState(1); 
  const [postsPerPage] = useState(6);

  useEffect(() => {
    const slug = 'posts';
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
    const newTagName = event.target.getAttribute('data_name') || '';

    setSelectedTagId(newTagId);
    setSelectedTagName(newTagName);
    setSearchQuery('');
    setCurrentPage(1); // Reset to the first page when tag changes
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setSelectedTagId(null);
    setSelectedTagName(null);
    setCurrentPage(1); // Reset to the first page when search changes
  };

  const filteredPosts = selectedTagId
    ? posts.filter((post) => post.tags.includes(parseInt(selectedTagId, 10)))
    : posts.filter((post) => {
        const postTitle = post.title.rendered.toLowerCase();
        const query = searchQuery.toLowerCase();
        return postTitle.includes(query);
      });

      const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
      };
   // Calculate the range of posts to display for the current page
   const indexOfLastPost = currentPage * postsPerPage;
   const indexOfFirstPost = indexOfLastPost - postsPerPage;
   const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
 
   // Calculate the total number of pages based on the number of filtered posts and posts per page
   const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  if (isLoading) {
    return( 
      <Loading/>
    );
  }



  return (
    <>
    <section className="" id="Posts-banner">
      <Banner pageData={pageData} />
    </section>

    <section className="mb-20" id="Posts-grid">
      <div className="container">
        <div className="grid gap-10 grid-cols-1 mlg:grid-cols-[1fr_380px]">
          <div className="flex flex-col gap-4">
            {selectedTagName && (
              <div className="font-moch text-xl font-bold text-text-title">
                {selectedTagName}
            </div>
            )}
            {searchQuery && (
              <div className="font-moch text-xl font-bold text-text-title">
                {searchQuery}
            </div>
            )}
            
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              {currentPosts.map((post) => (
                <PostCard post={post} key={post.id} />
              ))}
            </div>
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>

          <div className="w-full flex flex-col border-4 border-blue rounded-2xl p-8 h-fit">
          <input
            type="search"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            className="border-2 border-text-title rounded px-4 py-2 mb-8 font-sans"
          />
          <div className="font-moch text-blue mb-2">
            Tags
          </div>
          {tags &&
            tags.map((tag) => (
              <div key={tag.id} className="mb-2">
                <input
                  type="radio"
                  name="tags"
                  id={tag.id}
                  value={tag.id}
                  data_name={tag.name}
                  onChange={handleTagChange}
                  checked={selectedTagId === tag.id}
                  hidden
                />
                <label
                  htmlFor={tag.id}
                  className={`cursor-pointer font-moch hover:text-text-title ${
                    selectedTagId === tag.id ? 'text-blue' : 'text-text-body'
                  }`}
                >
                  {tag.name}
                </label>
              </div>
            ))}


          </div>
        </div>
      </div>
    </section>

  </>
  );
};

export default Posts;
