"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import dynamic from 'next/dynamic'
const  MobileHeader = dynamic(() => import('./mobile'), { ssr: false });
const  DesktopHeader = dynamic(() => import('./desktop'), { ssr: false });

const Header = () => {
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    const apiBaseUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
    const [dogTerms, setDogTerms] = useState([]);
  
    useEffect(() => {
      const fetchDogTerms = async () => {
        try {
          const response = await axios.get(`${apiBaseUrl}/dog-option`);
          const dogTerms = response.data;
          setDogTerms(dogTerms);
        } catch (error) {
          console.error('Error fetching terms of "dog" taxonomy:', error);
        }
      };
  
      fetchDogTerms();
    }, []);

    return ( 
        <header>
            <div className="bg-blue">
                <div className="container">
                    <div className="font-secondary text-white text-base text-center py-4">
                        <span className="font-bold">"Listening Ear" Bereavement Service</span> <Link href="">See Rainbow Bridge</Link> for all details
                    </div>
                </div>
            </div>
        {windowWidth > 1000 ? <DesktopHeader dogTerms={dogTerms} /> : <MobileHeader dogTerms={dogTerms} />}
        </header>
     );
}
 
export default Header;