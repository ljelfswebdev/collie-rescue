import Link from "next/link";

const PostCard = ({ post }) => { 
  return ( 
    <Link href={`/posts/${post.id}`} className="">
      <div className=""></div>
      <div className="">
        <p className="">{post.title.rendered}</p>
      </div>

      {/* Display the image URL */}
      {/* {dog.imageURL && (
        <img src={dog.imageURL} alt={dog.title.rendered}  className="-image"/>
      )} */}
      </Link>
   );
}
 
export default PostCard;