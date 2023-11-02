import { useState } from "react";

const ImageGallery = () => {
  const [images, setImages] = useState([
   " https://i.ibb.co/wJDt5FK/image-1.webp",
"https://i.ibb.co/9pxvQMm/image-2.webp",
"https://i.ibb.co/jyjgwJd/image-3.webp",
"https://i.ibb.co/4Wy00sx/image-4.webp",
"https://i.ibb.co/2vdMyjj/image-5.webp",
"https://i.ibb.co/8KKzjB1/image-6.webp",
"https://i.ibb.co/9HKLsRB/image-7.webp",
"https://i.ibb.co/YDB7kxr/image-8.webp",
"https://i.ibb.co/kq1qfr1/image-9.webp",
"https://i.ibb.co/D1NWWn7/image-10.jpg",
"https://i.ibb.co/C8fbBwt/image-11.jpg",
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
    <div className="lg:p-[10rem] ">
      <div className="bg-sky-300 lg:pb-[4rem]">
        <div>
          <h2 className="text-2xl p-4 font-bold">Gallery</h2>
          <hr />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2  ">
          {/* Large Image */}
          <div
            className={` w-[100%] h-[37rem] cursor-pointer  ${
              selectedImages.includes(0)
                ? "border-4 rounded-sm border-blue-500"
                : ""
            }`}
            onClick={() => toggleImageSelection(0)}
            draggable
            onDragStart={(e) => handleDragStart(e, 0)}
            onDragOver={(e) => handleDragOver(e, 0)}
          >
            <div className="bg-white rounded-xl  overflow-hidden border-solid border-[.1rem] m-[3rem] border-slate-300 ">
              <img
                src={images[0]}
                alt="Large"
                className="w-[100%] h-[32.5rem]  "
              />
            </div>
          </div>

          {/* Small Image Cards (right side) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
            {images.slice(1, 7).map((image, index) => (
              <div
                key={index}
                className={`m-5 rounded-xl  overflow-hidden  border-solid border-[.1rem] border-slate-300  cursor-pointer ${
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
                  className="w-full h-[100%]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Small Image Cards (second row) */}
        <div className="grid grid-cols-5 gap-4 lg:ms-[3rem]">
          {images.slice(7).map((image, index) => (
            <div
              key={index + 7}
              className={`bg-white rounded-lg overflow-hidden cursor-pointer  border-solid border-[.1rem] border-slate-300 ${
                selectedImages.includes(index + 7)
                  ? "border-4 border-blue-500"
                  : ""
              }`}
              draggable
              onDragStart={(e) => handleDragStart(e, index + 7)}
              onDragOver={(e) => handleDragOver(e, index + 7)}
              onClick={() => toggleImageSelection(index + 7)}
            >
              <img
                src={image}
                alt={`Small ${index}`}
                className="w-full h-[100%]"
              />
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
    </div>
  );
};

export default ImageGallery;
