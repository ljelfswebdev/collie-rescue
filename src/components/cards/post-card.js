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
      return dateObject.toLocaleDateString('en-UK', options);
    };

    if (post.date) {
      setFormattedDate(formatDate(post.date));
    }
  }, [post]);
  return ( 
    <Link href={`/posts/${post.id}`} className="rounded-xl overflow-hidden group">
      {post.acf.image && (
        <div className="overflow-hidden">
          <Image
              src={post.acf.image}
              alt={post.title.rendered}
              width={400}
              height={400}
              className="w-auto h-auto rounded-xl rounded-bl-none transition-all duration-200 group-hover:scale-125"
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
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path data-name="Path 2019" d="M7.25 3.75A.748.748 0 0 1 8 3a.748.748 0 0 1 .75.75V7.6l2.666 1.775a.724.724 0 0 1 .184 1.041.688.688 0 0 1-1.012.181l-3-2a.685.685 0 0 1-.334-.625ZM8 0a8 8 0 0 1 8 8 8 8 0 0 1-8 8 8 8 0 0 1-8-8 8 8 0 0 1 8-8ZM1.5 8A6.5 6.5 0 0 0 8 14.5 6.5 6.5 0 0 0 14.5 8 6.5 6.5 0 0 0 8 1.5 6.5 6.5 0 0 0 1.5 8Z" fill="#232120" opacity=".999"/></svg>
      
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