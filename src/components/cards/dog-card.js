import Link from "next/link";
import Image from "next/image";

const DogCard = ({ dog }) => { 

  const strippedText = dog.acf.dog_caption.replace(/<[^>]*>/g, '');
  const displayText = strippedText.length > 150
    ? strippedText.substring(0, 150) + '...'
    : strippedText;


  return ( 
    <Link href={`/dogs/${dog.id}`} className="flex flex-col items-center justify-center">
      <div className="mb-7 group w-full h-full max-w-72 max-h-72 min-w-72 min-h-72 object-cover rounded-full overflow-hidden group">
      {dog.acf.dog_image.length > 0 ? (
          <Image 
            src={dog.acf.dog_image[0]}
            alt={dog.title.rendered}
            width={288}
            height={288}
            className="max-w-full max-h-full min-w-full min-h-full object-cover transition-all duration-200  group-hover:scale-125"
          />
        ) : (
          <Image 
            src="/collie-placeholder.png"
            alt="Placeholder"
            width={288}
            height={288}
            className="max-w-full max-h-full min-w-full min-h-full object-cover transition-all duration-200  group-hover:scale-125"
          />
        )}
      </div>
      <div className="font-bold font-moch text-2xl text-text-title mb-5" dangerouslySetInnerHTML={{ __html: dog.title.rendered }}></div>
      <div className="text-center text-text-body font-sans mb-7" dangerouslySetInnerHTML={{ __html: displayText }} />
      <span className="button button--black">Read Story</span>
    </Link>
   );
}
 
export default DogCard;