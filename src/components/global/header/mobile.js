"use client"
import "../../../styles/header.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import supportUs from "./data/supportUs";
import advice from "./data/advice";
import about from "./data/about";

const MobileHeader = ({dogTerms}) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
      document.body.style.overflow = isChecked ? 'scroll' : 'hidden';
    };

    const handleLinkClick = () => {
        setIsChecked(false);
        document.body.style.overflow = 'scroll'; 
      };
    return (
        <div className="relative z-20">
            <div className="container relative z-10">
                <div className="flex gap-2 justify-between items-center">
                    <Link href="/">
                        <Image 
                        src="/logo.png"
                        alt="Logo"
                        width={150}
                        height={60}
                        className="relative top-4 min-w-36"
                        />
                    </Link>
                    <div className="flex gap-2 items-center ">
                    <div className="header-link">
                        <Link href="/cart">
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="21" height="24"><path data-name="Path 2018" d="M5.25 7.5V5.25A5.249 5.249 0 0 1 10.5 0a5.249 5.249 0 0 1 5.25 5.25V7.5h3A2.251 2.251 0 0 1 21 9.75v9.75a4.5 4.5 0 0 1-4.5 4.5h-12A4.5 4.5 0 0 1 0 19.5V9.75A2.25 2.25 0 0 1 2.25 7.5Zm2.25 0h6V5.25a3 3 0 0 0-3-3 3 3 0 0 0-3 3ZM2.25 9.75v9.75a2.25 2.25 0 0 0 2.25 2.25h12a2.251 2.251 0 0 0 2.25-2.25V9.75h-3v2.625a1.122 1.122 0 0 1-1.125 1.125 1.122 1.122 0 0 1-1.125-1.125V9.75h-6v2.625A1.122 1.122 0 0 1 6.375 13.5a1.122 1.122 0 0 1-1.125-1.125V9.75h-3Z" fill="#3a3735"/></svg>
                        </Link>
                    </div>
                    <div className="header-link">
                        <Link href="/account">
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path data-name="Path 2019" d="M12 5.25a4.125 4.125 0 0 0-4.125 4.125A4.125 4.125 0 0 0 12 13.5a4.125 4.125 0 0 0 4.125-4.125A4.125 4.125 0 0 0 12 5.25Zm0 6a1.877 1.877 0 0 1-1.875-1.875A1.874 1.874 0 0 1 12 7.5a1.876 1.876 0 0 1 1.875 1.875A1.874 1.874 0 0 1 12 11.25ZM12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0Zm0 21.75a9.681 9.681 0 0 1-5.836-1.959 4.669 4.669 0 0 1 4.158-2.541h3.36a4.675 4.675 0 0 1 4.157 2.541A9.7 9.7 0 0 1 12 21.75Zm7.509-3.539A6.894 6.894 0 0 0 13.678 15h-3.356a6.9 6.9 0 0 0-5.831 3.21A9.7 9.7 0 0 1 2.25 12 9.761 9.761 0 0 1 12 2.25 9.761 9.761 0 0 1 21.75 12a9.714 9.714 0 0 1-2.241 6.211Z" fill="#3a3735"/></svg>
                        </Link>
                    </div>
                    <div className="header-link">
                        <svg className="search w-6 h-6"xmlns="http://www.w3.org/2000/svg" width="23.994" height="24"><path data-name="Path 2020" d="M23.63 22.078 17.348 15.8a9.459 9.459 0 0 0 2.109-6.047A9.749 9.749 0 0 0 9.708 0 9.714 9.714 0 0 0 0 9.75a9.741 9.741 0 0 0 9.708 9.75 9.693 9.693 0 0 0 6.047-2.111l6.281 6.281a1.3 1.3 0 0 0 .839.33 1.125 1.125 0 0 0 .8-.33 1.1 1.1 0 0 0-.045-1.592ZM2.25 9.75a7.509 7.509 0 0 1 7.5-7.5 7.509 7.509 0 0 1 7.5 7.5 7.509 7.509 0 0 1-7.5 7.5 7.509 7.509 0 0 1-7.5-7.5Z" fill="#3a3735"/></svg>
                    </div>
                    <div className="header-link">
                        <Link href="/contact-us">
                        <svg xmlns="http://www.w3.org/2000/svg" width="23.977" height="24"><path data-name="Path 2023" d="m22.514 15.014-4.6-1.973a2.448 2.448 0 0 0-2.869.7l-1.286 1.57a13.985 13.985 0 0 1-5.063-5.02L10.266 9a2.465 2.465 0 0 0 .7-2.862l-1.98-4.66A2.462 2.462 0 0 0 6.18.063L1.9 1.05A2.439 2.439 0 0 0 0 3.44 20.579 20.579 0 0 0 20.559 24a2.359 2.359 0 0 0 2.348-1.9l.993-4.282a2.378 2.378 0 0 0-1.386-2.804Zm-.769 2.3-.988 4.286a.253.253 0 0 1-.2.154A18.329 18.329 0 0 1 2.25 3.44a.2.2 0 0 1 .157-.2l4.282-.988a.186.186 0 0 1 .045-.005.209.209 0 0 1 .19.122L8.9 6.981a.2.2 0 0 1-.059.237L6.553 9.052a1.125 1.125 0 0 0-.3 1.366 16.035 16.035 0 0 0 7.289 7.289 1.139 1.139 0 0 0 1.367-.3l1.875-2.291a.193.193 0 0 1 .231-.053l4.606 1.973a.3.3 0 0 1 .124.275Z" fill="#3a3735"/></svg>
                        </Link>
                    </div>
                        <label htmlFor="hamburger" className="flex flex-col gap-2 w-10 relative cursor-pointer">
                            <input 
                                type="checkbox" 
                                name="hamburger" 
                                id="hamburger" 
                                value="hamburger" 
                                className="peer" 
                                hidden
                                onChange={handleCheckboxChange}
                                checked={isChecked}
                            />
                            <span className=" transition-all w-full bg-text-title h-1 rounded-2xl peer-checked:rotate-45 peer-checked:absolute"></span>
                            <span className="w-full bg-text-title h-1 rounded-2xl peer-checked:hidden"></span>
                            <span className="transition-all w-full bg-text-title h-1 rounded-2xl peer-checked:-rotate-45 peer-checked:absolute"></span>
                        </label>
                    </div>
                </div>
            </div>
            <div className={`absolute top-full bg-green w-screen h-screen py-10 ${isChecked ? 'flex' : 'hidden'}`}>
                <div className="container">
                    <input type="radio" name="headerAcc" id="close" value="close" hidden/>
                    <ul className="flex flex-col gap-4 items-center justify-center">
                    <li className="header-link">
                        <Link href="/" onClick={handleLinkClick}>
                            Home
                        </Link>
                    </li>
                    <li className="header-link flex flex-col items-center gap-2 group">
                        <input type="radio" name="headerAcc" id="rehoming" value="rehoming" className="peer" hidden/>
                        <label htmlFor="rehoming" className="flex items-center gap-2 peer-checked:hidden">
                            Rehoming
                            <span className="transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" width="5.906" height="3.172"><path data-name="Path 2021" d="M5.805.566 3.191 3.069a.379.379 0 0 1-.239.1.347.347 0 0 1-.227-.091L.102.566A.327.327 0 0 1 .091.102a.326.326 0 0 1 .464-.01l2.4 2.3 2.4-2.3a.326.326 0 0 1 .464.01.325.325 0 0 1-.01.462Z" fill="#3a3735"/></svg>
                            </span>
                        </label>
                        <label htmlFor="close" className="items-center gap-2 hidden peer-checked:flex">
                            Rehoming
                            <span className="transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" width="5.906" height="3.172"><path data-name="Path 2021" d="M5.805.566 3.191 3.069a.379.379 0 0 1-.239.1.347.347 0 0 1-.227-.091L.102.566A.327.327 0 0 1 .091.102a.326.326 0 0 1 .464-.01l2.4 2.3 2.4-2.3a.326.326 0 0 1 .464.01.325.325 0 0 1-.01.462Z" fill="#3a3735"/></svg>
                            </span>
                        </label>
                        <div className="overflow-hidden transition-all max-h-0 peer-checked:max-h-96">
                            <ul className="flex flex-col gap-2 items-center">
                            {dogTerms.map((term) => (
                                <li key={term.id} className="font-normal text-center hover:font-bold">
                                <Link href={`dog-option/${term.slug}`} className="flex text-center"  onClick={handleLinkClick}>     
                                    {term.acf.page_title}
                                </Link>
                                </li>
                            ))}
                            <li className="font-normal text-center  hover:font-bold">
                                <Link href="/foreign-rescue-success-stores" className="flex text-center"  onClick={handleLinkClick}>
                                Foreign Rescue Success Stories
                                </Link>
                            </li>
                            <li className="font-normal text-center hover:font-bold">
                                <Link href="/" className="flex text-center" onClick={handleLinkClick}>
                                    Rainbow Bridge/Listening Ear Bereavement Service
                                </Link>
                            </li>
                            </ul>
                        </div>
                    </li>
                    <li className="header-link flex flex-col items-center gap-2 group">
                        <input type="radio" name="headerAcc" id="support" value="support" className="peer" hidden/>
                        <label htmlFor="support" className="flex items-center gap-2 peer-checked:hidden">
                            Support Us
                            <span className="transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" width="5.906" height="3.172"><path data-name="Path 2021" d="M5.805.566 3.191 3.069a.379.379 0 0 1-.239.1.347.347 0 0 1-.227-.091L.102.566A.327.327 0 0 1 .091.102a.326.326 0 0 1 .464-.01l2.4 2.3 2.4-2.3a.326.326 0 0 1 .464.01.325.325 0 0 1-.01.462Z" fill="#3a3735"/></svg>
                            </span>
                        </label>
                        <label htmlFor="close" className="items-center gap-2 hidden peer-checked:flex">
                            Support Us
                            <span className="transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" width="5.906" height="3.172"><path data-name="Path 2021" d="M5.805.566 3.191 3.069a.379.379 0 0 1-.239.1.347.347 0 0 1-.227-.091L.102.566A.327.327 0 0 1 .091.102a.326.326 0 0 1 .464-.01l2.4 2.3 2.4-2.3a.326.326 0 0 1 .464.01.325.325 0 0 1-.01.462Z" fill="#3a3735"/></svg>
                            </span>
                        </label>
                        <div className="overflow-hidden transition-all max-h-0 peer-checked:max-h-96">
                            <ul className="flex flex-col gap-2 items-center">
                                {supportUs.map((item) => (
                                <li key={item.id}  className="font-normal text-center hover:font-bold">
                                    <Link href={`/${item.link}`} className="flex text-center" onClick={handleLinkClick}>
                                       {item.name}
                                    </Link>
                                </li>
                                ))}
                            </ul>
                        </div>
                    </li>
                    <li className="header-link flex flex-col items-center gap-2 group">
                        <input type="radio" name="headerAcc" id="advice" value="advice" className="peer" hidden/>
                        <label htmlFor="advice" className="flex items-center gap-2 peer-checked:hidden">
                            Advice
                            <span className="transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" width="5.906" height="3.172"><path data-name="Path 2021" d="M5.805.566 3.191 3.069a.379.379 0 0 1-.239.1.347.347 0 0 1-.227-.091L.102.566A.327.327 0 0 1 .091.102a.326.326 0 0 1 .464-.01l2.4 2.3 2.4-2.3a.326.326 0 0 1 .464.01.325.325 0 0 1-.01.462Z" fill="#3a3735"/></svg>
                            </span>
                        </label>
                        <label htmlFor="close" className="items-center gap-2 hidden peer-checked:flex">
                            Advice
                            <span className="transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" width="5.906" height="3.172"><path data-name="Path 2021" d="M5.805.566 3.191 3.069a.379.379 0 0 1-.239.1.347.347 0 0 1-.227-.091L.102.566A.327.327 0 0 1 .091.102a.326.326 0 0 1 .464-.01l2.4 2.3 2.4-2.3a.326.326 0 0 1 .464.01.325.325 0 0 1-.01.462Z" fill="#3a3735"/></svg>
                            </span>
                        </label>
                        <div className="overflow-hidden transition-all max-h-0 peer-checked:max-h-96">
                            <ul className="flex flex-col gap-2 items-center">
                                {advice.map((item) => (
                                <li key={item.id}  className="font-normal text-center hover:font-bold">
                                    <Link href={`/${item.link}`} className="flex text-center" onClick={handleLinkClick}>
                                       {item.name}
                                    </Link>
                                </li>
                                ))}
                            </ul>
                        </div>
                    </li>
                    
                    <li className="header-link flex flex-col items-center gap-2 group">
                        <input type="radio" name="headerAcc" id="about" value="about" className="peer" hidden/>
                        <label htmlFor="about" className="flex items-center gap-2 peer-checked:hidden">
                            About
                            <span className="transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" width="5.906" height="3.172"><path data-name="Path 2021" d="M5.805.566 3.191 3.069a.379.379 0 0 1-.239.1.347.347 0 0 1-.227-.091L.102.566A.327.327 0 0 1 .091.102a.326.326 0 0 1 .464-.01l2.4 2.3 2.4-2.3a.326.326 0 0 1 .464.01.325.325 0 0 1-.01.462Z" fill="#3a3735"/></svg>
                            </span>
                        </label>
                        <label htmlFor="close" className="items-center gap-2 hidden peer-checked:flex">
                            About
                            <span className="transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" width="5.906" height="3.172"><path data-name="Path 2021" d="M5.805.566 3.191 3.069a.379.379 0 0 1-.239.1.347.347 0 0 1-.227-.091L.102.566A.327.327 0 0 1 .091.102a.326.326 0 0 1 .464-.01l2.4 2.3 2.4-2.3a.326.326 0 0 1 .464.01.325.325 0 0 1-.01.462Z" fill="#3a3735"/></svg>
                            </span>
                        </label>
                        <div className="overflow-hidden transition-all max-h-0 peer-checked:max-h-96">
                            <ul className="flex flex-col gap-2 items-center">
                            {about.map((item) => (
                                <li key={item.id}  className="font-normal text-center hover:font-bold">
                                    <Link href={`/${item.link}`} className="flex text-center" onClick={handleLinkClick}>
                                       {item.name}
                                    </Link>
                                </li>
                                ))}
                            </ul>
                        </div>
                    </li>
                    </ul>
                </div>
            </div>
        </div>
     );
}
 
export default MobileHeader;