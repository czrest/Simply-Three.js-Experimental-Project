const LoadingScreen = ({ customClassNameSpan }) => {
    return (
        <>
            <div className={`pointer-events-none z-20 w-screen h-screen flex justify-center flex-col items-center bg-white text-black`}>
                
                <div className={`pointer-events-none z-20 flex justify-center items-center`}>
                    <p className={`${customClassNameSpan}`}><span className={`text-2xl px-3`}>Hi,</span></p>
                    <p className={`${customClassNameSpan}`}><span className={`text-2xl px-3`}>I'm</span></p>
                    <p className={`${customClassNameSpan}`}><span className={`text-2xl px-3`}>Sam.</span></p>
                </div>
                <div className={`pointer-events-none z-20 flex justify-center items-center`}>
                    <p className={`swing-in-bottom-fwd2 font-codecl`}><span className={`px-3`}>Web Developer | Designer</span></p>
                </div>

                <div className="pointer-events-none mt-96 absolute flex justify-center items-center flex-col text-black puff-in-top"> 
                    <p className={`${customClassNameSpan}`}><span className={`text-sm px-3`}>SCROLL DOWN</span></p>
                    <svg width="30px" height="30px" viewBox="0 0 64 64" >
                        <g>
                            <polyline fill="none" stroke="#000000" points="48.936,31 
                                31.936,48 14.936,31 	"/>
                        </g>
                        <g>
                            <polyline fill="none" stroke="#000000" points="48.936,16 
                                31.936,33 14.936,16 	"/>
                        </g>
                    </svg>
                </div>
            </div>
        </>
    );
};


export default LoadingScreen;