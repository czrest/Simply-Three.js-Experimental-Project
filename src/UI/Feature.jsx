const Feature = ({ customClassName, text }) => {

  return (
    <>
      <p className={` p-10 whitespace-pre-line max-w-md h-full text-black ${customClassName}`}>
        {text}
      </p>
    </>
  );
}

export default Feature;
