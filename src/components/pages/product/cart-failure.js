import Link from "next/link";

const CartFailure = ({ onClosePopup }) => {
    return ( 
        <div className="fixed h-screen w-screen z-10 top-0 left-0 flex items-center justify-center">
            <div className="absolute top-0 left-0 w-screen h-screen bg-black/70" onClick={onClosePopup} ></div>
            <div className="relative bg-white w-2/3 rounded-xl border-2 border-solid border-grey p-10 flex flex-col items-center justify-center">
                <div className="mb-10">ICON</div>
                <div className="font-primary text-text-title font-bold text-4xl mb-10 text-center">
                    There has been a problem, please try again later
                </div>
                <div className="flex flex-row gap-4">
                    <Link href="/shop" className="button button--blue">
                        Continue Shopping
                    </Link>
                    <button onClick={onClosePopup} className="button button--pink">Close</button>
                </div>
            </div>
        </div>
     );
}
 
export default CartFailure;