import React, { useRef, useState, useEffect } from 'react';

const ImageUploader = ({ value, field, id, name, imageUrl }) => {
  const [preview, setPreview] = useState(imageUrl || null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setPreview(imageUrl || null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [imageUrl]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      field.handleChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <label htmlFor={id} className="image-uploader-label">
      <input
        ref={fileInputRef}
        type="file"
        id={id}
        name={name}
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      {preview ? (
        <img 
          src={preview} 
          alt="Preview" 
          className="image-preview"
          style={{
            width: '200px',
            height: '200px',
            objectFit: 'cover',
            cursor: 'pointer',
            borderRadius: '8px',
            border: '2px dashed #ccc'
          }}
        />
      ) : (
        <div 
          className="image-placeholder"
          style={{
            width: '200px',
            height: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            borderRadius: '8px',
            border: '2px dashed #ccc',
            backgroundColor: '#f5f5f5'
          }}
        >
          Click to upload image
        </div>
      )}
    </label>
  );
};

export default ImageUploader;
