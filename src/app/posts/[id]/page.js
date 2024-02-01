'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation'
import { fetchPostDetail } from '../../../utils/fetchPosts';

const PostDetail = () => {

  const pathname = usePathname();
  const parts = pathname.split('/');
  const id = parts[parts.length - 1];

  const [postDetail, setPostDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchPostDetail(id)
        .then((postWithImageUrls) => {
          setPostDetail(postWithImageUrls);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log('Error fetching post details', error);
          setIsLoading(false);
        });
    }
  }, [id]);

  if (isLoading || !postDetail) {
    return (
      <div className="loading">
        <img src="/loading.gif" alt="Loading..." />
      </div>
    );
  }

  return (
    <div>
      <h1>{postDetail.title.rendered}</h1>
      <p>text: {postDetail.acf.post_content}</p>
      {/* {serviceDetail.imageURL && (
        <img src={serviceDetail.imageURL} alt={serviceDetail.title.rendered} />
      )} */}
    </div>
  );
};

export default PostDetail;
