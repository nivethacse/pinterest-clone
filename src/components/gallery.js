import Image from "./image";

const Gallery = ({ imageArray, setsignIn }) => {
  return (
    <div className="gallery">
      <div className="imageContainer">
        {imageArray.map((item, index) => (
          <Image setsignIn={setsignIn} key={index} item={item} />
        ))}
      </div>
    </div>
  );
};
export default Gallery;
