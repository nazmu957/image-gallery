import { useState } from "react";

const ImageGallery = () => {
  const [images, setImages] = useState([
    "https://i.ibb.co/vc6pqZ3/logo.jpg",
    "https://i.ibb.co/4pJN4wJ/pc-4.jpg",
    "https://i.ibb.co/vc6pqZ3/logo.jpg",
    "https://i.ibb.co/vc6pqZ3/logo.jpg",
    "https://i.ibb.co/vc6pqZ3/logo.jpg",
    "https://i.ibb.co/vc6pqZ3/logo.jpg",
    "https://i.ibb.co/vc6pqZ3/logo.jpg",
    "https://i.ibb.co/vc6pqZ3/logo.jpg",
    "https://i.ibb.co/YRr2Bbm/pic6.jpg",
    "https://i.ibb.co/vc6pqZ3/logo.jpg",
    "https://i.ibb.co/vc6pqZ3/logo.jpg",
    "https://i.ibb.co/vc6pqZ3/logo.jpg",
    // ... rest of your initial image URLs
  ]);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex) => {
    const sourceIndex = e.dataTransfer.getData("index");
    const updatedImages = [...images];
    const [draggedImage] = updatedImages.splice(sourceIndex, 1);
    updatedImages.splice(targetIndex, 0, draggedImage);
    setImages(updatedImages);
  };

  return (
    <div className=" ">
      <div className="grid grid-cols-1 sm:grid-cols-2 w-full">
        {/* Large Image */}
        <div className="p-2">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <img src={images[0]} alt="Large" className="w-full h-auto" />
          </div>
        </div>

        {/* Small Image Cards (right side) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-2">
          {images.slice(1, 7).map((image, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-lg"
              draggable
              onDragStart={(e) => handleDragStart(e, index + 1)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index + 1)}
            >
              <img
                src={image}
                alt={`Small ${index}`}
                className="w-full h-auto"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Small Image Cards (second row) */}
      <div className="grid grid-cols-5 gap-4">
        {images.slice(7).map((image, index) => (
          <div
            key={index + 7}
            className="bg-white rounded-lg overflow-hidden shadow-lg"
            draggable
            onDragStart={(e) => handleDragStart(e, index + 7)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index + 7)}
          >
            <img src={image} alt={`Small ${index}`} className="w-full h-auto" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
