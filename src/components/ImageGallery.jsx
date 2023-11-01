import  { useState } from "react";

const ImageGallery = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [images, setImages] = useState([
    "https://i.ibb.co/vc6pqZ3/logo.jpg",
    "https://i.ibb.co/vc6pqZ3/logo.jpg",
    "https://i.ibb.co/vc6pqZ3/logo.jpg",
    "https://i.ibb.co/vc6pqZ3/logo.jpg",
    "https://i.ibb.co/vc6pqZ3/logo.jpg",
    "https://i.ibb.co/vc6pqZ3/logo.jpg",
    "https://i.ibb.co/vc6pqZ3/logo.jpg",
    "https://i.ibb.co/vc6pqZ3/logo.jpg",
    // ... rest of your image URLs
  ]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        setImages([...images, reader.result]); // Update the images state with the uploaded image
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap">
      {/* Large Image Card */}
      <div className="w-full sm:w-1/2 p-2">
        <div className="bg-white rounded-lg overflow-hidden shadow-lg">
          <img src={images[0]} alt="Large" className="w-full h-auto" />
        </div>
      </div>
      {/* Small Image Cards (first row) */}
      <div className="w-full sm:w-1/2 sm:flex flex-wrap">
        {images.slice(1, 7).map((image, index) => (
          <div key={index} className="w-1/3 p-2">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <img
                src={image}
                alt={`Small ${index}`}
                className="w-full h-auto"
              />
            </div>
          </div>
        ))}
      </div>
      {/* Small Image Cards (second row) */}
      <div className="w-full sm:flex flex-wrap">
        {images.slice(7).map((image, index) => (
          <div key={index} className="w-1/5 p-2">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <img
                src={image}
                alt={`Small ${index}`}
                className="w-full h-auto"
              />
            </div>
          </div>
        ))}
        {/* New Image Upload Card */}
        <div className="w-1/5 p-2">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            {uploadedImage ? (
              <img
                src={uploadedImage}
                alt="Uploaded"
                className="w-full h-auto"
              />
            ) : (
              <label
                htmlFor="imageUpload"
                className="cursor-pointer block w-full h-40 border-dashed border-2 border-gray-300 flex justify-center items-center"
              >
                Click to upload image
                <input
                  type="file"
                  id="imageUpload"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
