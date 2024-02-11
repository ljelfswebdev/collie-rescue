import Link from "next/link";

const CartSuccess = ({ onClosePopup }) => {
    return ( 
        <div className="fixed h-screen w-screen z-10 top-0 left-0 flex items-center justify-center">
            <div className="absolute top-0 left-0 w-screen h-screen bg-black/70" onClick={onClosePopup} ></div>
            <div className="relative bg-white w-2/3 rounded-xl border-2 border-solid border-grey p-10 flex flex-col items-center justify-center">
                <div className="mb-10">
                <svg className="h-20 w-20" xmlns="http://www.w3.org/2000/svg" width="80" height="80"><path data-name="Path 2018" d="M25 4.688A20.313 20.313 0 1 1 4.687 25 20.313 20.313 0 0 1 25 4.688ZM25 50A25 25 0 1 0 0 25a25 25 0 0 0 25 25Zm11.035-29.59a2.341 2.341 0 0 0-3.31-3.31l-10.84 10.84-4.59-4.59a2.341 2.341 0 0 0-3.311 3.311l6.25 6.25a2.334 2.334 0 0 0 3.311 0Z" fill="#2bc342"/></svg>
                </div>
                <div className="font-primary text-text-title font-bold text-4xl mb-10 text-center">
                    Your item has successfully been added to your cart!!
                </div>
                <div className="flex flex-row gap-4">
                    <Link href="/cart" className="button button--green">
                        View Cart
                    </Link>
                    <Link href="/shop" className="button button--blue">
                        Continue Shopping
                    </Link>
                    <button onClick={onClosePopup} className="button button--pink">Close</button>
                </div>
            </div>
        </div>
     );
}
 
export default CartSuccess;