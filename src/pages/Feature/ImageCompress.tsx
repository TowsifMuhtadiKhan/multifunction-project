import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useDropzone } from "react-dropzone"; // Import useDropzone from react-dropzone
import PhotoIcon from "@mui/icons-material/Photo";

const ImageCompress: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [resizedImage, setResizedImage] = useState<string | null>(null);
  const [outputFormat, setOutputFormat] = useState<string>("image/jpeg");
  const [targetSize, setTargetSize] = useState<number>(0); // Target size in selected unit
  const [sizeUnit, setSizeUnit] = useState<string>("KB"); // Size unit (KB or MB)

  // Handle image change from drag-and-drop or file selection
  const handleImageChange = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Set the file object for later use (to display file name & type)
    setImageFile(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        handleImageChange(acceptedFiles[0]);
      }
    },
  });

  // Compress image based on target size in KB or MB
  const handleCompressImage = () => {
    if (!imageFile || targetSize <= 0) return;

    // Convert target size to KB if it's in MB
    const targetSizeInKB = sizeUnit === "MB" ? targetSize * 1024 : targetSize;

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (ctx) {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0);

        // Calculate quality to achieve the target size
        const quality = Math.min(
          1,
          targetSizeInKB / ((imageFile?.size ?? 0) / 1024)
        );

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const resizedImageUrl = URL.createObjectURL(blob);
              setResizedImage(resizedImageUrl);
            }
          },
          outputFormat,
          quality
        );
      }
    };
    img.src = URL.createObjectURL(imageFile);
  };

  // Download the resized/compressed image
  const handleDownloadImage = () => {
    if (!resizedImage) return;

    let extension = "jpg";
    if (outputFormat === "image/png") extension = "png";
    else if (outputFormat === "image/webp") extension = "webp";
    else if (outputFormat === "image/jpeg") extension = "jpg";

    const link = document.createElement("a");
    link.href = resizedImage;
    link.download = `compressed-image.${extension}`;
    link.click();
  };

  // Remove image and reset the states
  const handleRemoveImage = () => {
    setImage(null);
    setImageFile(null);
    setResizedImage(null);
  };

  // Handle file selection from input
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
        Compress Image
      </Typography>

      {/* Flexbox Layout for Left and Right Sections */}
      <Box display="flex" justifyContent="space-between">
        {/* Left Section (Upload & Select File) */}
        <Box width={"50%"}>
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

        {/* Right Section (Image Preview and Compress Options) */}
        <Box
          width={"40%"}
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
                <Typography variant="body2" color="#4646C6">
                  <strong>Original Size:</strong>{" "}
                  {imageFile ? (
                    <>
                      {(imageFile.size / 1024).toFixed(2)} KB
                      {imageFile.size > 1024 * 1024 && (
                        <> ({(imageFile.size / (1024 * 1024)).toFixed(2)} MB)</>
                      )}
                    </>
                  ) : (
                    "0 KB"
                  )}
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
          </Box>

          {/* Input for Target Size with Unit Selection */}
          <Box sx={{ marginBottom: "20px" }}>
            <Typography
              fontSize={"20px"}
              fontWeight={700}
              color="#4646C6"
              gutterBottom
              mb={2}
            >
              Target File Size
            </Typography>

            {/* Size Unit Selection */}
            <FormControl sx={{ marginBottom: "15px" }}>
              <InputLabel>Size Unit</InputLabel>
              <Select
                value={sizeUnit}
                onChange={(e) => setSizeUnit(e.target.value)}
                label="Size Unit"
              >
                <MenuItem value="KB">KB (Kilobytes)</MenuItem>
                <MenuItem value="MB">MB (Megabytes)</MenuItem>
              </Select>
            </FormControl>

            {/* Target Size Input */}
            <TextField
              label={`Target Size (${sizeUnit})`}
              type="number"
              value={targetSize}
              onChange={(e) => setTargetSize(Number(e.target.value))}
              sx={{ marginBottom: "20px", marginLeft: "25px" }}
              helperText={
                sizeUnit === "KB"
                  ? "Enter size in Kilobytes (e.g., 500 for 500KB)"
                  : "Enter size in Megabytes (e.g., 2 for 2MB)"
              }
            />

            {/* Output Format Selection */}
            <FormControl fullWidth>
              <InputLabel>Output Format</InputLabel>
              <Select
                value={outputFormat}
                onChange={(e) => setOutputFormat(e.target.value)}
                label="Output Format"
              >
                <MenuItem value="image/jpeg">JPEG</MenuItem>
                <MenuItem value="image/png">PNG</MenuItem>
                <MenuItem value="image/webp">WebP</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Buttons to Compress and Download */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              variant="contained"
              onClick={handleCompressImage}
              disabled={!imageFile || targetSize <= 0}
              sx={{ bgcolor: "#ff9800", color: "#fff" }}
            >
              Compress Image
            </Button>
            <Button
              variant="outlined"
              onClick={handleDownloadImage}
              disabled={!resizedImage}
              sx={{ border: "1px solid #4646C6", color: "#4646C6" }}
            >
              Download Compressed Image
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ImageCompress;
