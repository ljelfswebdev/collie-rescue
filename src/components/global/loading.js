const Loading = () => {
    return ( 
        <div className="h-screen w-screen absolute flex justify-center items-center">
            <div className="h-screen w-screen absolute bg-blue/10"></div>
            <img className="relative animate-ping" src="/loading.png"/>
        </div>
     );
}
 
export default Loading;
