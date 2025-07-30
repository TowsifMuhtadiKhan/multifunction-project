import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useDropzone } from "react-dropzone"; // Import useDropzone from react-dropzone
import PhotoIcon from "@mui/icons-material/Photo";

const ImageResize: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [resizedImage, setResizedImage] = useState<string | null>(null);
  const [outputFormat, setOutputFormat] = useState<string>("image/jpeg");

  const handleImageChange = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Set the file object for later use (to display file name & type)
    setImageFile(file);

    // Create a new image object to get its natural width and height
    const img = new Image();
    img.onload = () => {
      setWidth(img.naturalWidth); // Set width to the image's original width
      setHeight(img.naturalHeight); // Set height to the image's original height
    };
    img.src = URL.createObjectURL(file); // Set the image source to the uploaded file
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        handleImageChange(acceptedFiles[0]);
      }
    },
  });

  const handleResizeImage = () => {
    if (!image) return;

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (ctx) {
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        // Create the resized image in the selected format
        const resizedImageUrl = canvas.toDataURL(outputFormat);
        setResizedImage(resizedImageUrl);
      }
    };
    img.src = image;
  };

  const handleDownloadImage = () => {
    if (!resizedImage) return;

    const extension = outputFormat === "image/jpeg" ? "jpg" : "png";
    const link = document.createElement("a");
    link.href = resizedImage;
    link.download = `resized-image.${extension}`;
    link.click();
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImageFile(null);
    setWidth(0);
    setHeight(0);
    setResizedImage(null);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      handleImageChange(file);
    }
  };

  return (
    <Box width={"80%"} margin="auto" paddingTop="140px">
      <Typography
        fontSize={"35px"}
        fontWeight={"bold"}
        gutterBottom
        color="#4646C6"
        mb={5}
      >
        Resize Image
      </Typography>

      {/* Flexbox Layout for Left and Right Sections */}
      <Box display="flex" justifyContent="space-between">
        {/* Left Section (Upload & Select File) */}
        <Box width={"35%"}>
          {/* Drag and Drop Section */}
          <Box
            border={2}
            borderColor="#4646C6"
            padding={2}
            marginBottom={2}
            borderRadius={3}
          >
            <div
              {...getRootProps()}
              style={{
                border: "2px dashed #4646C6",
                padding: "20px",
                textAlign: "center",
                cursor: "pointer",

                height: "200px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                borderRadius: "8px",
              }}
            >
              <input {...getInputProps()} />
              <PhotoIcon sx={{ fontSize: "40px", color: "#4646C6", mb: 1 }} />
              <Typography fontSize={"25px"} fontWeight={700}>
                Drag and drop an image here
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Or click to select an image (JPG, JPEG, PNG)
              </Typography>
            </div>
          </Box>

          {/* Select File Button */}
          <Button
            variant="outlined"
            component="label"
            sx={{ marginBottom: "20px", bgcolor: "#4646C6", color: "#fff" }}
          >
            Select File
            <input
              type="file"
              hidden
              accept="image/jpeg, image/jpg, image/png"
              onChange={handleFileSelect}
            />
          </Button>
        </Box>

        {/* Right Section (Image Preview and Resize Options) */}
        <Box
          width={"60%"}
          border={1}
          borderColor="#d1d1d1ff"
          padding={2}
          borderRadius={3}
        >
          <Box display={"flex"} alignItems={"top"}>
            {image && (
              <Box sx={{ marginBottom: "30px" }}>
                <Typography
                  fontSize={"20px"}
                  fontWeight={700}
                  gutterBottom
                  color="#4646C6"
                >
                  Image Preview
                </Typography>
                <Box
                  display={"flex"}
                  justifyContent="center"
                  border={1}
                  borderColor="#d1d1d1ff"
                  padding={2}
                  borderRadius={2}
                  bgcolor={"#f9f9f9"}
                >
                  <img
                    src={image}
                    alt="uploaded"
                    style={{ maxWidth: "100%", maxHeight: "300px" }}
                  />
                </Box>
                <Typography
                  variant="body2"
                  sx={{ marginTop: "10px" }}
                  color="#4646C6"
                >
                  <strong>File Name:</strong> {imageFile?.name}
                </Typography>
                <Typography variant="body2" color="#4646C6">
                  <strong>File Type:</strong> {imageFile?.type}
                </Typography>
                <Button
                  variant="contained"
                  onClick={handleRemoveImage}
                  sx={{
                    marginTop: "20px",
                    bgcolor: "#e01305ff",
                    color: "#fff",
                  }}
                >
                  Remove Image
                </Button>
              </Box>
            )}
            {resizedImage && (
              <Box>
                <Typography
                  fontSize={"20px"}
                  fontWeight={700}
                  gutterBottom
                  color="#4646C6"
                >
                  Resized Image Preview
                </Typography>
                <Box
                  display={"flex"}
                  justifyContent="center"
                  border={1}
                  borderColor="#d1d1d1ff"
                  padding={2}
                  borderRadius={2}
                  bgcolor={"#f9f9f9"}
                >
                  <img
                    src={resizedImage}
                    alt="resized"
                    style={{ maxWidth: "100%", maxHeight: "300px" }}
                  />
                </Box>
              </Box>
            )}
          </Box>
          {/* Width and Height Inputs */}
          <Box
            sx={{
              marginBottom: "20px",
            }}
            display={"flex"}
            flexDirection={"column"}
            gap={2}
          >
            <TextField
              label="Width"
              type="number"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              sx={{ marginRight: "10px" }}
              disabled={!imageFile} // Disable if no image is uploaded
              fullWidth
            />
            <TextField
              label="Height"
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              disabled={!imageFile}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Output Format</InputLabel>
              <Select
                value={outputFormat}
                onChange={(e) => setOutputFormat(e.target.value)}
                label="Output Format"
              >
                <MenuItem value="image/jpeg">JPEG</MenuItem>
                <MenuItem value="image/jpg">JPG</MenuItem>
                <MenuItem value="image/png">PNG</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Output Format Selection */}
          <Box sx={{ marginBottom: "20px" }}></Box>

          {/* Buttons to Resize and Download */}
          <Button
            variant="contained"
            onClick={handleResizeImage}
            sx={{ marginRight: "10px", bgcolor: "#4646C6", color: "#fff" }}
          >
            Resize Image
          </Button>
          {/* Add some border color */}
          <Button
            variant="outlined"
            onClick={handleDownloadImage}
            disabled={!resizedImage}
            sx={{ border: "1px solid #4646C6", color: "#4646C6" }}
          >
            Download Resized Image
          </Button>

          {/* Display Resized Image */}
        </Box>
      </Box>
    </Box>
  );
};

export default ImageResize;
