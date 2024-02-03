"use client"
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

const CounterCard = ({ data }) => {
    const [count, setCount] = useState(0);
    const cardRef = useRef(null);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const targetCount = data.quantity;
  
              const countingInterval = setInterval(() => {
                setCount((prevCount) => {
                  if (prevCount < targetCount) {
                    return prevCount + 1;
                  } else {
                    clearInterval(countingInterval);
                    return targetCount;
                  }
                });
              }, 1); 
  
              return () => clearInterval(countingInterval); 
            }
          });
        },
        { threshold: 0.5 }
      );
  
      observer.observe(cardRef.current);
  
      return () => observer.disconnect();
    }, [data.quantity]);
    return (
      <div ref={cardRef} className="flex gap-4 items-center">
        <div
          className="h-20 w-20 flex justify-center items-center rounded-xl"
          style={{ backgroundColor: data.background_colour }}
        >
          <Image
            src={data.icon}
            alt={data.title}
            width={40}
            height={40}
            className="h-auto w-auto"
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-moch text-4xl text-text-title">
            {count}
            {data.title === 'Collies Annually' && <span>+</span>}
            </span>
          <span className="font-moch  text-text-body">{data.title}</span>
        </div>
      </div>
    );
  };
  

const Counter = ({pageData}) => {
    return ( 
        <div className="flex flex-col justify-center sm:grid sm:grid-cols-2 gap-4 mlg:grid-cols-4">
            {pageData.acf.dogs_rescued.quantity && (
                <CounterCard data={pageData.acf.dogs_rescued} />
            )}

            {pageData.acf.collies_annually.quantity && (
                <CounterCard data={pageData.acf.collies_annually} />
            )}

            {pageData.acf.found_forever_homes.quantity && (
                <CounterCard data={pageData.acf.found_forever_homes} />
            )}

            {pageData.acf.committee_members.quantity && (
                <CounterCard data={pageData.acf.committee_members} />
            )}
            
        </div>
     );
}
 
export default Counter;