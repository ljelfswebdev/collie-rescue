import Link from "next/link";

const DogCard = ({ dog }) => { 
  return ( 
    <Link href={`/dogs/${dog.id}`} className="">
      <div className=""></div>
      <div className="">
        <p className="">{dog.title.rendered}</p>
      </div>

      {/* Display the image URL */}
      {/* {dog.imageURL && (
        <img src={dog.imageURL} alt={dog.title.rendered}  className="-image"/>
      )} */}
      </Link>
   );
}
 
export default DogCard;