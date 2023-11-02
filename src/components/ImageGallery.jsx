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
  ]);

  const [selectedImages, setSelectedImages] = useState([]);
  const [draggedImageIndex, setDraggedImageIndex] = useState(null);

  const toggleImageSelection = (index) => {
    const selectedIndex = selectedImages.indexOf(index);
    if (selectedIndex === -1) {
      setSelectedImages([...selectedImages, index]);
    } else {
      const updatedSelection = selectedImages.filter((i) => i !== index);
      setSelectedImages(updatedSelection);
    }
  };

  const handleDeleteSelectedImages = () => {
    const updatedImages = images.filter(
      (_, index) => !selectedImages.includes(index)
    );
    setImages(updatedImages);
    setSelectedImages([]);
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
    setDraggedImageIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedImageIndex !== index) {
      const newImages = [...images];
      const [draggedImage] = newImages.splice(draggedImageIndex, 1);
      newImages.splice(index, 0, draggedImage);
      setImages(newImages);
      setDraggedImageIndex(index);
    }
  };

  return (
    <div className=" ">
      <div className="grid grid-cols-1 sm:grid-cols-2 w-full">
        {/* Large Image */}
        <div
          className={`p-2 cursor-pointer ${
            selectedImages.includes(0) ? "border-4 border-blue-500" : ""
          }`}
          onClick={() => toggleImageSelection(0)}
          draggable
          onDragStart={(e) => handleDragStart(e, 0)}
          onDragOver={(e) => handleDragOver(e, 0)}
        >
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <img src={images[0]} alt="Large" className="w-full h-auto" />
          </div>
        </div>

        {/* Small Image Cards (right side) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-2">
          {images.slice(1, 7).map((image, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg overflow-hidden shadow-lg cursor-pointer ${
                selectedImages.includes(index + 1)
                  ? "border-4 border-blue-500"
                  : ""
              }`}
              draggable
              onDragStart={(e) => handleDragStart(e, index + 1)}
              onDragOver={(e) => handleDragOver(e, index + 1)}
              onClick={() => toggleImageSelection(index + 1)}
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
            className={`bg-white rounded-lg overflow-hidden shadow-lg cursor-pointer ${
              selectedImages.includes(index + 7)
                ? "border-4 border-blue-500"
                : ""
            }`}
            draggable
            onDragStart={(e) => handleDragStart(e, index + 7)}
            onDragOver={(e) => handleDragOver(e, index + 7)}
            onClick={() => toggleImageSelection(index + 7)}
          >
            <img src={image} alt={`Small ${index}`} className="w-full h-auto" />
          </div>
        ))}
      </div>

      {/* Delete Button */}
      {selectedImages.length > 0 && (
        <button
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
          onClick={handleDeleteSelectedImages}
        >
          Delete Selected Images
        </button>
      )}
    </div>
  );
};

export default ImageGallery;
