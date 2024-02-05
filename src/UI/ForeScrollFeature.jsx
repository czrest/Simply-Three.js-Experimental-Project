const ForeScrollFeature = ({ children, customClassName }) => {
    return (
        <>
            <div className={`pointer-events-none min-h-full grid grid-cols-2 gap-4 place-items-center content-center ${customClassName}`}>
                {children}
            </div>
        </>
    );
};


export default ForeScrollFeature;