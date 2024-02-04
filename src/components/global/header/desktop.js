"use client"
import "../../../styles/header.css";
import Image from "next/image";
import Link from "next/link";


const DesktopHeader = ({ dogTerms }) => {
    return ( 
        <div className="container">
            <div className="flex gap-32 justify-between items-center">
                <Link href="/">
                    <Image 
                    src="/logo.png"
                    alt="Logo"
                    width={250}
                    height={90}
                    className="relative top-4"
                    />
                </Link>
                <ul className="flex gap-1 lg:gap-2 items-center w-full justify-between">
                    <li className="header-link">
                        <Link href="/">
                            Home
                        </Link>
                    </li>
                    <li className="header-link flex items-center gap-2 group">
                        <span>Rehoming</span>
                        <span className="transition-all group-hover:rotate-180">
                        <svg xmlns="http://www.w3.org/2000/svg" width="5.906" height="3.172"><path data-name="Path 2021" d="M5.805.566 3.191 3.069a.379.379 0 0 1-.239.1.347.347 0 0 1-.227-.091L.102.566A.327.327 0 0 1 .091.102a.326.326 0 0 1 .464-.01l2.4 2.3 2.4-2.3a.326.326 0 0 1 .464.01.325.325 0 0 1-.01.462Z" fill="#3a3735"/></svg>
                        </span>
                        <div className="header-dropdown absolute hidden bg-white p-6 rounded-2xl shadow-xl min-w-80 top-full w-fit group-hover:flex">
                            <ul className="flex flex-col gap-2">
                            {dogTerms.map((term) => (
                                <li key={term.id} className="font-normal hover:font-bold">
                                <Link href={`dog-option/${term.slug}`}>    
                                    {term.acf.page_title}
                                </Link>
                                </li>
                            ))}
                            <li className="font-normal hover:font-bold">
                                <Link href="/foreign-rescue-success-stores">
                                Foreign Rescue Success Stories
                                </Link>
                            </li>
                            <li className="font-normal hover:font-bold">
                                <Link href="/">
                                    Rainbow Bridge/Listening Ear Bereavement Service
                                </Link>
                            </li>
                            </ul>
                        </div>
                    </li>
                    <li className="header-link flex items-center gap-2 group">
                        <span>Support Us</span>
                        <span className="transition-all group-hover:rotate-180">
                        <svg xmlns="http://www.w3.org/2000/svg" width="5.906" height="3.172"><path data-name="Path 2021" d="M5.805.566 3.191 3.069a.379.379 0 0 1-.239.1.347.347 0 0 1-.227-.091L.102.566A.327.327 0 0 1 .091.102a.326.326 0 0 1 .464-.01l2.4 2.3 2.4-2.3a.326.326 0 0 1 .464.01.325.325 0 0 1-.01.462Z" fill="#3a3735"/></svg>
                        </span>
                        <div className="header-dropdown absolute hidden bg-white p-6 rounded-2xl shadow-xl min-w-80 top-full w-fit group-hover:flex">
                        <ul className="flex flex-col gap-2">
                            <li className="font-normal hover:font-bold">
                                <Link href="/fundraising-and-donations">
                                    Fundraising & Donations
                                </Link>
                            </li>
                            <li className="font-normal hover:font-bold">
                                <Link href="/posts">
                                    News & Events
                                </Link>
                            </li>
                            <li className="font-normal hover:font-bold">
                                <Link href="/shop">
                                    Gift Shop
                                </Link>
                            </li>
                        </ul>
                        </div>
                    </li>
                    <li className="header-link flex items-center gap-2 group">
                        <span>Advice</span>
                        <span className="transition-all group-hover:rotate-180">
                        <svg xmlns="http://www.w3.org/2000/svg" width="5.906" height="3.172"><path data-name="Path 2021" d="M5.805.566 3.191 3.069a.379.379 0 0 1-.239.1.347.347 0 0 1-.227-.091L.102.566A.327.327 0 0 1 .091.102a.326.326 0 0 1 .464-.01l2.4 2.3 2.4-2.3a.326.326 0 0 1 .464.01.325.325 0 0 1-.01.462Z" fill="#3a3735"/></svg>
                        </span>
                        <div className="header-dropdown absolute hidden bg-white p-6 rounded-2xl shadow-xl min-w-80 top-full w-fit group-hover:flex">
                            <ul className="flex flex-col gap-2">
                                <li className="font-normal hover:font-bold">
                                    <Link href="/collie-heath">
                                        Collie Heath
                                    </Link>
                                </li>
                                <li className="font-normal hover:font-bold">
                                    <Link href="/poetry-corner">
                                        Poetry Corner
                                    </Link>
                                </li>
                                <li className="font-normal hover:font-bold">
                                    <Link href="/useful-links">
                                    Useful Links
                                    </Link>
                                </li>
                                <li className="font-normal hover:font-bold">
                                    <Link href="/contact-us">
                                    Contact Us
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className="header-link flex items-center gap-2 group">
                        <span>About Us</span>
                        <span className="transition-all group-hover:rotate-180">
                        <svg xmlns="http://www.w3.org/2000/svg" width="5.906" height="3.172"><path data-name="Path 2021" d="M5.805.566 3.191 3.069a.379.379 0 0 1-.239.1.347.347 0 0 1-.227-.091L.102.566A.327.327 0 0 1 .091.102a.326.326 0 0 1 .464-.01l2.4 2.3 2.4-2.3a.326.326 0 0 1 .464.01.325.325 0 0 1-.01.462Z" fill="#3a3735"/></svg>
                        </span>
                        <div className="header-dropdown absolute hidden bg-white p-6 rounded-2xl shadow-xl min-w-80 top-full w-fit group-hover:flex">
                            <ul className="flex flex-col gap-2">
                                <li className="font-normal hover:font-bold">
                                    <Link href="/about-us">
                                        About Our Rescue
                                    </Link>
                                </li>
                                <li className="font-normal hover:font-bold">
                                    <Link href="/newsletters">
                                        Newsletters
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className="header-link">
                        <Link href="/cart">
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="21" height="24"><path data-name="Path 2018" d="M5.25 7.5V5.25A5.249 5.249 0 0 1 10.5 0a5.249 5.249 0 0 1 5.25 5.25V7.5h3A2.251 2.251 0 0 1 21 9.75v9.75a4.5 4.5 0 0 1-4.5 4.5h-12A4.5 4.5 0 0 1 0 19.5V9.75A2.25 2.25 0 0 1 2.25 7.5Zm2.25 0h6V5.25a3 3 0 0 0-3-3 3 3 0 0 0-3 3ZM2.25 9.75v9.75a2.25 2.25 0 0 0 2.25 2.25h12a2.251 2.251 0 0 0 2.25-2.25V9.75h-3v2.625a1.122 1.122 0 0 1-1.125 1.125 1.122 1.122 0 0 1-1.125-1.125V9.75h-6v2.625A1.122 1.122 0 0 1 6.375 13.5a1.122 1.122 0 0 1-1.125-1.125V9.75h-3Z" fill="#3a3735"/></svg>
                        </Link>
                    </li>
                    <li className="header-link">
                        <Link href="/account">
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path data-name="Path 2019" d="M12 5.25a4.125 4.125 0 0 0-4.125 4.125A4.125 4.125 0 0 0 12 13.5a4.125 4.125 0 0 0 4.125-4.125A4.125 4.125 0 0 0 12 5.25Zm0 6a1.877 1.877 0 0 1-1.875-1.875A1.874 1.874 0 0 1 12 7.5a1.876 1.876 0 0 1 1.875 1.875A1.874 1.874 0 0 1 12 11.25ZM12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0Zm0 21.75a9.681 9.681 0 0 1-5.836-1.959 4.669 4.669 0 0 1 4.158-2.541h3.36a4.675 4.675 0 0 1 4.157 2.541A9.7 9.7 0 0 1 12 21.75Zm7.509-3.539A6.894 6.894 0 0 0 13.678 15h-3.356a6.9 6.9 0 0 0-5.831 3.21A9.7 9.7 0 0 1 2.25 12 9.761 9.761 0 0 1 12 2.25 9.761 9.761 0 0 1 21.75 12a9.714 9.714 0 0 1-2.241 6.211Z" fill="#3a3735"/></svg>
                        </Link>
                    </li>
                    <li className="header-link">
                        <svg className="search w-6 h-6"xmlns="http://www.w3.org/2000/svg" width="23.994" height="24"><path data-name="Path 2020" d="M23.63 22.078 17.348 15.8a9.459 9.459 0 0 0 2.109-6.047A9.749 9.749 0 0 0 9.708 0 9.714 9.714 0 0 0 0 9.75a9.741 9.741 0 0 0 9.708 9.75 9.693 9.693 0 0 0 6.047-2.111l6.281 6.281a1.3 1.3 0 0 0 .839.33 1.125 1.125 0 0 0 .8-.33 1.1 1.1 0 0 0-.045-1.592ZM2.25 9.75a7.509 7.509 0 0 1 7.5-7.5 7.509 7.509 0 0 1 7.5 7.5 7.509 7.509 0 0 1-7.5 7.5 7.509 7.509 0 0 1-7.5-7.5Z" fill="#3a3735"/></svg>
                    </li>
                    <li className="header-link">
                        <Link href="/contact-us" className="button button--green">
                            Contact Us
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
     );
}
 
export default DesktopHeader;