'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation'
import { fetchPostDetail } from '../../../utils/fetchPosts';
import Link from "next/link";
import Image from "next/image";
import Loading from '../../../components/global/loading';
import LatestNews from '../../../components/global/latest-news-slider';

const PostDetail = () => {

  const pathname = usePathname();
  const parts = pathname.split('/');
  const id = parts[parts.length - 1];

  const [postDetail, setPostDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const apiBaseUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

  const [categoryName, setCategoryName] = useState('');
  const [formattedDate, setFormattedDate] = useState('');
  

  const [tagsName, setTagsName] = useState([]);

  console.log(postDetail);

  useEffect(() => {
    if (id) {
      fetchPostDetail(id)
        .then((post) => {
          setPostDetail(post);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log('Error fetching post details', error);
          setIsLoading(false);
        });
    }

    
  }, [id]);

  useEffect(() => {
    const fetchCategoryName = async () => {
      try {
        if (postDetail.categories && postDetail.categories.length > 0) {
          const categoryId = postDetail.categories[0];
          const response = await fetch(`${apiBaseUrl}/categories/${categoryId}`);
          const categoryData = await response.json();
          setCategoryName(categoryData.name);
        }
      } catch (error) {
       
      }
    };
  
    fetchCategoryName();
  }, [postDetail]);
  
  useEffect(() => {
    const fetchTags = async () => {
      try {
        if (postDetail && postDetail.tags && Array.isArray(postDetail.tags) && postDetail.tags.length > 0) {
          const tagsId = postDetail.tags;
          const tagsData = await Promise.all(tagsId.map(async (tagId) => {
            const response = await fetch(`${apiBaseUrl}/tags/${tagId}`);
            if (!response.ok) {
              throw new Error(`Error fetching tag ${tagId}: ${response.statusText}`);
            }
            return response.json();
          }));
          setTagsName(tagsData);
        }
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };
  
    fetchTags();
  }, [postDetail]);
  
  
  

  useEffect(() => {
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const dateObject = new Date(dateString);
      return dateObject.toLocaleDateString('en-UK', options);
    };
  
    if (postDetail && postDetail.date) {
      setFormattedDate(formatDate(postDetail.date));
    }
  }, [postDetail]);

  if (isLoading || !postDetail) {
    return (
     <Loading />
    );
  }

  return (
      <>
      <section className="bg-orange/20 py-16" id="Post-hero">
        <div className="container container--post">
          <div className="flex flex-col items-center justify-center">

            {categoryName && (
              <div className="mb-7 py-2 px-4 w-fit rounded bg-orange font-moch text-white">
                {categoryName}
              </div>
            )}
           
            <div className="mb-8 max-w-3xl mx-auto font-moch font-bold text-4xl text-center"
            dangerouslySetInnerHTML={{ __html: postDetail.title.rendered }}> 
            </div>
            <div className="flex gap-2 items-center mb-12">
                <Image 
                  src="../../svgs/clock.svg"
                  alt="clock"
                  width={16}
                  height={16}
                  className="min-w-4 min-h-4 max-w-4 max-h-4"
                />
                
                <span className="font-sans text-text-body">
                  {formattedDate}
                </span>
                {postDetail.acf.author &&(
                  <span className="font-sans text-orange">
                    By {postDetail.acf.author}
                  </span>
                )}
                
              </div>
              {postDetail.acf.image && (
              <div className="">
                <Image
                    src={postDetail.acf.image}
                    alt={postDetail.title.rendered}
                    width={1000}
                    height={640}
                    className="w-auto h-auto rounded-xl rounded-bl-none"
                />
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="py-16" id="Post-content">
        <div className="container container--post">
          <div className="flex flex-col gap-10">
          {postDetail.acf.post_blocks && postDetail.acf.post_blocks.map((block, index) => (
            <div key={index}>

            {block.text_or_image === 'Text' && (
              <div className={`post-block font-sans text-text-body text-base ${block.block_background ? 'post-bg p-10 rounded-2xl' : ''}`}
              style={{ backgroundColor: block.block_background }}
              dangerouslySetInnerHTML={{ __html: block.block_text }}
            />
            )}

             {block.text_or_image === 'Image' && (
              <Image 
                src={block.block_image}
                alt={postDetail.title.rendered}
                width={1100}
                height={1500}
                className="mb-4"
              />
             )}
              {block.text_or_image === 'Image' && block.block_photographer && (
                <span className="font-sans text-text-body text-sm">
                 Photo courtesy of {block.block_photographer}
                </span>
              )}


            </div>
          ))}
          </div>
          
        </div>
      </section>
      <section className="pb-16" id="Post-share">
        <div className="container container--post">
          <div className="flex flex-wrap gap-4 items-center">
            <span className="font-moch text-2xl text-text-body">Tags</span>
            {tagsName.map((tag, index) => (
                <Link href="/posts" key={index} className="button button--orange">
                    {tag.name}
                </Link>
              ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-orange/20" id="Post-related">
        <div className="container">
          <h2 className="font-moch text-4xl text-text-title text-center mb-10">
            Related Posts
          </h2>
          {/* {postDetail.acf.related_posts && (
            postDetail.acf.related_posts.map((related, index) => (
              <div key={index}>
                {related.post_title}
              </div>
              
            ))
          )} */}
          <LatestNews relatedPosts={postDetail.acf.related_posts} />
        </div>
      </section>
      </>
  );
};

export default PostDetail;
