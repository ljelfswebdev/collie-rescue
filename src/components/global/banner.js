"use client"
import Link from "next/link";

const Banner = ({pageData}) => {
    return ( 
        <>
        <div className="py-16 mb-12" style={{backgroundColor: pageData.acf.banner_background_colour}}>
            <div className="container">
                <div className="flex flex-col gap-4 justify-center items-center">
                    <div className="flex gap-2">
                        <Link href="/" className="font-sans font-bold text-green">Home</Link>
                        {pageData.acf.breadcrumb && (
                        <>
                            <span className="font-sans text-text-body">/</span>
                            <span className="font-sans text-tex-title">{pageData.acf.breadcrumb}</span> 
                        </>
                           )} 
                    </div>
                    {pageData.acf.page_title && (
                        <h1 className="font-moch font-bold text-4xl text-text-title">{pageData.acf.page_title}</h1>
                    )}
                </div>
            </div>
        </div>
        {pageData.acf.page_text && (
            <>
            <div className="container">
                <div className="mb-12 font-sans text-text-body text-center max-w-3xl mx-auto"
                dangerouslySetInnerHTML={{ __html: pageData.acf.page_text }}
                >
               </div>     
            </div>
            </>
        )}
        </>
     );
}
 
export default Banner;