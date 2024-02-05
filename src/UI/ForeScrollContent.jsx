const ForeScrollContent = ({ children, customClassName }) => {
    return (
        <>
            <div className={`pointer-events-none absolute w-screen h-screen flex flex-col ${customClassName}`}>
                {children}
            </div>
        </>
    );
};


export default ForeScrollContent;