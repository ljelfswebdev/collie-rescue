"use client"

// LatestNews.js
import PostCard from "../cards/post-card";
import { useEffect, useState } from "react";
import { fetchPosts } from "../../utils/fetchPosts";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import '../../styles/swiper.css';

const LatestNews = ({ relatedPosts }) => {
    const [posts, setPosts] = useState([]);
  
    useEffect(() => {
        fetchPosts()
          .then((allPosts) => {
            // If relatedPosts is provided, filter based on relatedPosts
            const filtered = relatedPosts ? allPosts.filter(post => relatedPosts.some(related => related.ID === post.id)) : allPosts;
            setPosts(filtered);
          })
          .catch((error) => {
            console.log('Error fetching Posts:', error);
          });
      }, [relatedPosts]);

    return ( 
        <Swiper
        slidesPerView={1}
        spaceBetween={0}
        navigation={true}
        modules={[Navigation]}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          900: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
        className="max-w-full news-slider"
      >
        {posts.slice(0, 5).map((post, index) => (
            <SwiperSlide key={index}>
              <PostCard post={post} key={post.id} />
            </SwiperSlide>
        ))}
      </Swiper>
    );
}
 
export default LatestNews;
