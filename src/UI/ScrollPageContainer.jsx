const ScrollPageContainer = ({ children, customJustify, customMargin }) => {
    return (
        <>
            <div className={`pointer-events-none absolute z-10 w-screen h-screen grid grid-cols-2 justify-items-center gap-4 items-center ${customJustify, customMargin}`} >
              {children}
            </div>
        </>
    );
};


export default ScrollPageContainer;