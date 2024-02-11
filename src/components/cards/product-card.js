import Link from "next/link";
import Image from "next/image";

const ProductCard = ({product}) => {
    return ( 
        <Link href={`/shop/${product.id}`} className="w-full max-w-[380px] mx-auto flex flex-col h-[600px] border border-solid border-grey rounded-xl overflow-hidden group">
            <div className="w-full h-80 overflow-hidden">
            <Image
            src={product.images[0].src}
            alt={product.name}
            width={400}
            height={320}
            className="w-full max-h-80 min-h-80 object-cover group-hover:scale-125 group-hover:transition-all"
            />
            </div>
            <div className="p-8 flex flex-col h-[280px] bg-white">
                <div className="font-primary font-bold text-text-title font-2xl mb-4">
                    {product.name}
                </div>
                <div className="flex justify-between gap-10 items-center">
                    <span className="font-primary text-orange text-base">
                        {product.categories[0].name}
                    </span>
                    <span className="font-secondary text-text-body text-base">
                        £{parseFloat(product.price).toFixed(2)}
                    </span>
                </div>
                <div className="mt-auto button button--orange !w-full">
                    View Product
                </div>
            </div>
        </Link>
     );
}
 
export default ProductCard;