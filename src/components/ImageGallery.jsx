import { useState } from "react";
import { BsImageAlt } from "react-icons/bs";

const ImageGallery = () => {
  const [images, setImages] = useState([
    "https://i.ibb.co/wJDt5FK/image-1.webp",
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
  const [showCheckbox, setShowCheckbox] = useState(false);

  const toggleImageSelection = (index) => {
    if (selectedImages.includes(index)) {
      setSelectedImages(selectedImages.filter((i) => i !== index));
    } else {
      setSelectedImages([...selectedImages, index]);
    }
    setShowCheckbox(true);
  };

  const handleDeleteSelectedImages = () => {
    const updatedImages = images.filter(
      (_, index) => !selectedImages.includes(index)
    );
    setImages(updatedImages);
    setSelectedImages([]);
    setShowCheckbox(false);
  };

  const handleDragStart = (index) => {
    setDraggedImageIndex(index);
  };

  const handleDragOver = (index) => {
    if (draggedImageIndex !== index) {
      const updatedImages = [...images];
      const [draggedImage] = updatedImages.splice(draggedImageIndex, 1);
      updatedImages.splice(index, 0, draggedImage);
      setImages(updatedImages);
      setDraggedImageIndex(index);
    }
  };

  const handleImageUpload = (event) => {
    const uploadedImage = URL.createObjectURL(event.target.files[0]);
    setImages([...images, uploadedImage]);
  };

  const selectedImagesCount = selectedImages.length;

  return (
    <div className="lg:px-[10rem] ">
      <div className="bg-white rounded-xl lg:pb-[4rem]">
        <div className="flex justify-between ">
          <div>
            <h2 className="text-sm p-4 ml-6 text-primary font-bold">
              {selectedImagesCount > 0 ? (
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked="checked"
                    className="checkbox bg-red-300 checkbox-xs m-2"
                  />
                  {`${selectedImagesCount} Images Selected`}
                </label>
              ) : (
                "Gallery"
              )}
            </h2>
          </div>

          <div className="mr-[58rem]"></div>
          <div className="">
            {selectedImages.length > 0 && (
              <button
                className="mt-4 me-5 bg-white text-red-600 py-2 px-4 rounded"
                onClick={handleDeleteSelectedImages}
              >
                Delete File
              </button>
            )}
          </div>
        </div>
        <hr className="border-2" />
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div
            className={`w-[100%] h-[100%] cursor-pointer p-[2rem] ms-4 my-1 relative`}
          >
            <div
              className={` rounded-xl overflow-hidden border-solid border-[.1rem]  border-slate-300 ${
                selectedImages.includes(0) ? "border-4 border-blue-500" : ""
              }`}
              onClick={() => toggleImageSelection(0)}
              draggable
              onDragStart={() => handleDragStart(0)}
              onDragOver={() => handleDragOver(0)}
            >
              {showCheckbox && (
                <input
                  type="checkbox"
                  className="daysi-checkbox absolute top-2 left-2"
                  checked={selectedImages.includes(0)}
                  readOnly
                />
              )}
              <img src={images[0]} alt="Large" className="w-[100%] h-[100%]" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 py-[2rem] pe-[2rem]">
            {images.slice(1, 7).map((image, index) => (
              <div
                key={index}
                className={`m-1  rounded-xl overflow-hidden border-solid border-[.1rem] border-slate-300 cursor-pointer relative ${
                  selectedImages.includes(index + 1)
                    ? "border-4 border-blue-500"
                    : ""
                }`}
                onClick={() => toggleImageSelection(index + 1)}
                draggable
                onDragStart={() => handleDragStart(index + 1)}
                onDragOver={() => handleDragOver(index + 1)}
              >
                {showCheckbox && (
                  <input
                    type="checkbox"
                    className="daysi-checkbox absolute top-2 left-2"
                    checked={selectedImages.includes(index + 1)}
                    readOnly
                  />
                )}
                <img
                  src={image}
                  alt={`Small ${index}`}
                  className="w-full h-[100%]"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-5 gap-4 me-5 lg:ms-[3rem]">
          {images.slice(7).map((image, index) => (
            <div
              key={index + 7}
              className={`bg-white m-2 rounded-lg overflow-hidden cursor-pointer border-solid border-[.1rem] border-slate-300 relative ${
                selectedImages.includes(index + 7)
                  ? "border-4 border-blue-500"
                  : ""
              }`}
              onClick={() => toggleImageSelection(index + 7)}
              draggable
              onDragStart={() => handleDragStart(index + 7)}
              onDragOver={() => handleDragOver(index + 7)}
            >
              {showCheckbox && (
                <input
                  type="checkbox"
                  className="daysi-checkbox absolute top-2 left-2"
                  checked={selectedImages.includes(index + 7)}
                  readOnly
                />
              )}
              <img
                src={image}
                alt={`Small ${index}`}
                className="w-full h-[100%]"
              />
            </div>
          ))}
          <div className="bg-white m-2 rounded-lg overflow-hidden border-dashed border-[.2rem] border-slate-300 relative p-4 flex flex-col items-center justify-center text-gray-600">
            <label
              htmlFor="file-upload"
              className="daysi-button daysi-button-primary mb-2"
            >
              <BsImageAlt className="text-3xl" />
            </label>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleImageUpload}
            />
            <p className="text-base">Add Image</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
