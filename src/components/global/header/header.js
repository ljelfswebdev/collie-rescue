"use client"
import { useState, useEffect } from 'react';
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

    return ( 
        <header>
            <div className="bg-blue">
                <div className="container">
                    <div className="font-sans text-white text-base text-center py-4">
                        <span className="font-bold">"Listening Ear" Bereavement Service</span> <Link href="">See Rainbow Bridge</Link> for all details
                    </div>
                </div>
            </div>
        {windowWidth > 1000 ? <DesktopHeader /> : <MobileHeader />}
        </header>
     );
}
 
export default Header;