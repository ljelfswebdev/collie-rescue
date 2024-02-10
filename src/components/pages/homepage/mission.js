"use client"

import Link from "next/link";
import Image from "next/image";

const Mission = ({ pageData }) => {
    const sub = pageData.acf.mission_sub_text;
    const main_title = pageData.acf.mission_main_title;
    const main_text = pageData.acf.mission_main_text;
    const missions = pageData.acf.missions;
    return ( 
        <div className="flex flex-col items-center justify-center">
            {sub && (
               <span className="mb-2 px-3 py-2 bg-[#1f802f40] rounded text-white font-primary text-base">
                    {sub}
                </span> 
            )}
            {main_title &&(
                <h2 className="mb-6 font-primary text-white text-4xl">
                    {main_title}
                </h2>
            )}
            {main_text && (
                <div 
                    dangerouslySetInnerHTML={{ __html: main_text }} 
                    className="font-secondary text-text-body text-center text-base max-w-[912px] mx-auto mb-10"
                />
            )}
        

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {missions.map((mission, index) => (
                    <Link href={mission.mission_link} key={index} className="group relative w-full overflow-hidden rounded-2xl h-[500px] flex items-center justify-center">
                        <div className="absolute bg-black/40 h-full w-full top-0 left-0 z-10"></div>
                        <div className="absolute h-full w-full top-0 left-0">
                            <Image
                                src={mission.mission_image}
                                alt={mission.mission_text}
                                width={400}
                                height={500}
                                className="min-w-full h-full w-full object-cover transition-all duration-200 group-hover:scale-125"
                            />
                        </div>
                        <div 
                            className="absolute top-0 flex items-center justify-center h-12 w-12 z-10 mx-auto rounded-t-none rounded-b"
                            style={{ backgroundColor: mission.mission_icon_background }}
                        >
                            <Image
                                src={mission.mission_icon}
                                alt={mission.mission_text}
                                width={32}
                                height={32}
                                className="h-auto w-auto"
                            />
                        </div>
                        <div className="relative z-20 px-12 flex flex-col items-center h-full justify-center">
                            <div className="font-primary text-white text-3xl text-center mt-auto pt-8">
                                {mission.mission_text}
                            </div>
                            <span className="font-primary text-white text-base text-center mt-auto pb-8">
                                {mission.mission_link_text}
                            </span>
                        </div>
                        
                    </Link>
                ))}

            </div>
        </div>
     );
}
 
export default Mission;