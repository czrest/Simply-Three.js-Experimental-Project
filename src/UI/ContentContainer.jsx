const ContentContainer = ({ children, customClassName }) => {
    return(
        <div className={` bg-opacity-70 px-5  ${customClassName}`}>
            {children}
        </div>
    );
};

export default ContentContainer;