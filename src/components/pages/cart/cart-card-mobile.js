import Image from 'next/image';

const CartCardMobile = ({ item, addToCart, removeFromCart, updateQuantity, handleIncreaseQuantity, handleDecreaseQuantity }) => {
    return ( 
        <div className="w-full border border-solid border-grey rounded-xl p-10 mb-4">
            <div className="font-primary text-text-title text-xl mb-4 text-center">
                {item.name}
            </div>
            <div className="font-primary text-text-title text-base mb-4 text-center flex justify-center">
              {item.identifier && (() => {
              const identifierObject = JSON.parse(item.identifier); 
              const identifierValues = Object.values(identifierObject);
              return identifierValues.join(' - ');
            })()}
            </div>
            <div className="border-2 border-solid border-grey rounded-xl overflow-hidden max-h-80 max-w-80 h-full w-full mx-auto mb-4">
                <Image 
                src={item.images[0].src}
                alt={item.name}
                width={300}
                height={300}
                className="object-cover min-w-full"
                />
            </div>
            <div className="flex justify-center px-4 font-primary text-text-title mb-4">
              £{parseFloat(item.price).toFixed(2)}
            </div>
            <div className="font-primary text-text-title flex justify-center mb-4">
                <div className="h-[56px] w-40 rounded-xl border-2 border-blue border-solid flex justify-center items-center gap-4 ">
                    <div className="font-primary text-text-title font-bold text-sm cursor-pointer" onClick={() => handleDecreaseQuantity(item.identifier)}>- </div>
                        {item.quantity} 
                        <div className="font-primary text-text-title font-bold text-sm cursor-pointer" onClick={() => handleIncreaseQuantity(item.identifier)}>+</div> 
                    </div>
            </div>
            <div className="h-full flex justify-center px-4 font-primary text-text-title mb-4">
              Total - £{(item.price * item.quantity).toFixed(2)}
            </div>
            <div className="flex justify-center">
              <button onClick={() => removeFromCart(item.identifier)}>
              <svg className="w-5 h-6" xmlns="http://www.w3.org/2000/svg" width="19.25" height="22"><path data-name="Path 2021" d="M6.875 17.188a.69.69 0 0 1-.687.688.69.69 0 0 1-.688-.688V8.25a.69.69 0 0 1 .688-.687.69.69 0 0 1 .687.687Zm3.438 0a.69.69 0 0 1-.687.688.69.69 0 0 1-.687-.687V8.25a.69.69 0 0 1 .688-.687.69.69 0 0 1 .688.688Zm3.438 0a.69.69 0 0 1-.687.688.69.69 0 0 1-.687-.687V8.25a.69.69 0 0 1 .688-.687.69.69 0 0 1 .685.687Zm-.107-16.116 1.577 2.366h3a1.03 1.03 0 0 1 1.031 1.031A1.029 1.029 0 0 1 18.221 5.5h-.344v13.063A3.437 3.437 0 0 1 14.438 22H4.813a3.437 3.437 0 0 1-3.438-3.437V5.5h-.344A1.03 1.03 0 0 1 0 4.469a1.032 1.032 0 0 1 1.031-1.031h3l1.576-2.366a2.408 2.408 0 0 1 2-1.072h4.03a2.409 2.409 0 0 1 2.006 1.072ZM6.51 3.438h6.23l-.816-1.222a.345.345 0 0 0-.284-.153H7.61c-.112 0-.258.058-.284.153ZM3.438 18.563a1.374 1.374 0 0 0 1.375 1.375h9.625a1.374 1.374 0 0 0 1.375-1.375V5.5H3.438Z" fill="#f02525"/></svg>
              </button>
            </div>
        </div>
            
     );
}
 
export default CartCardMobile;