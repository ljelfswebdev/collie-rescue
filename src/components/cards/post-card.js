import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const PostCard = ({ post }) => { 
  const apiBaseUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
  const [categoryName, setCategoryName] = useState('');
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    const fetchCategoryName = async () => {
      try {
        if (post.categories && post.categories.length > 0) {
          const categoryId = post.categories[0];
          const response = await fetch(`${apiBaseUrl}/categories/${categoryId}`);
          const categoryData = await response.json();
          setCategoryName(categoryData.name);
        }
      } catch (error) {
        console.error('Error fetching category name:', error);
      }
    };

    fetchCategoryName();
  }, [post]);

  useEffect(() => {
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const dateObject = new Date(dateString);
      return dateObject.toLocaleDateString('en-US', options);
    };

    if (post.date) {
      setFormattedDate(formatDate(post.date));
    }
  }, [post]);
  return ( 
    <Link href={`/posts/${post.id}`} className="">
      {post.acf.image && (
        <div className="">
          <Image
              src={post.acf.image}
              alt={post.title.rendered}
              width={400}
              height={400}
              className="w-auto h-auto rounded-xl rounded-bl-none"
          />
        </div>
      )}
      
      {categoryName && categoryName !== 'Uncategorized' && (
        <div className="w-fit px-4 py-2 bg-black rounded-t-none rounded-b font-moch text-white mb-4">
          {categoryName}
        </div>
      )}
      <div className="font-moch text-text-title font-2xl max-w-xs mb-5"
       dangerouslySetInnerHTML={{ __html: post.title.rendered }} />

      <div className="flex gap-2 items-center">
        <Image 
          src="./svgs/clock.svg"
          alt="clock"
          width={16}
          height={16}
          className="min-w-4 min-h-4 max-w-4 max-h-4"
        />
        
        <span className="font-sans text-text-body">
          {formattedDate}
        </span>
        {post.acf.author &&(
          <span className="font-sans text-orange">
            By {post.acf.author}
          </span>
        )}
        
      </div>

      </Link>
   );
}
 
export default PostCard;