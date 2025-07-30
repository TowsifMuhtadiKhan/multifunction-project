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
    <Box
      sx={{
        width: { xs: "95%", sm: "90%", md: "80%" },
        margin: "auto",
        paddingTop: { xs: "120px", md: "140px" },
        px: { xs: 1, sm: 2 },
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: "24px", sm: "28px", md: "35px" },
          fontWeight: "bold",
          color: "#4646C6",
          mb: { xs: 3, md: 5 },
          textAlign: "center",
        }}
        gutterBottom
      >
        Resize Image
      </Typography>

      {/* Flexbox Layout for Left and Right Sections */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          gap: { xs: 3, md: 2 },
        }}
      >
        {/* Left Section (Upload & Select File) */}
        <Box sx={{ width: { xs: "100%", md: "35%" } }}>
          {/* Drag and Drop Section */}
          <Box
            sx={{
              border: 2,
              borderColor: "#4646C6",
              padding: { xs: 1, sm: 2 },
              marginBottom: 2,
              borderRadius: 3,
            }}
          >
            <div
              {...getRootProps()}
              style={{
                border: "2px dashed #4646C6",
                padding: "20px",
                textAlign: "center",
                cursor: "pointer",
                height: "180px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                borderRadius: "8px",
              }}
            >
              <input {...getInputProps()} />
              <PhotoIcon
                sx={{
                  fontSize: { xs: "32px", sm: "40px" },
                  color: "#4646C6",
                  mb: 1,
                }}
              />
              <Typography
                sx={{
                  fontSize: { xs: "18px", sm: "22px", md: "25px" },
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                Drag and drop an image here
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ textAlign: "center", mt: 1 }}
              >
                Or click to select an image (JPG, JPEG, PNG)
              </Typography>
            </div>
          </Box>

          {/* Select File Button */}
          <Button
            variant="outlined"
            component="label"
            fullWidth
            sx={{
              marginBottom: "20px",
              bgcolor: "#4646C6",
              color: "#fff",
              py: { xs: 1.5, sm: 2 },
            }}
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
          sx={{
            width: { xs: "100%", md: "60%" },
            border: 1,
            borderColor: "#d1d1d1ff",
            padding: { xs: 1, sm: 2 },
            borderRadius: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "top",
              flexDirection: { xs: "column", lg: "row" },
              gap: 2,
            }}
          >
            {image && (
              <Box sx={{ marginBottom: "30px", flex: 1 }}>
                <Typography
                  sx={{
                    fontSize: { xs: "16px", sm: "18px", md: "20px" },
                    fontWeight: 700,
                    color: "#4646C6",
                    textAlign: "center",
                    mb: 2,
                  }}
                  gutterBottom
                >
                  Image Preview
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    border: 1,
                    borderColor: "#d1d1d1ff",
                    padding: { xs: 1, sm: 2 },
                    borderRadius: 2,
                    bgcolor: "#f9f9f9",
                  }}
                >
                  <img
                    src={image}
                    alt="uploaded"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "250px",
                      objectFit: "contain",
                    }}
                  />
                </Box>
                <Box sx={{ mt: 2, textAlign: "center" }}>
                  <Typography
                    variant="body2"
                    sx={{ marginBottom: "5px" }}
                    color="#4646C6"
                  >
                    <strong>File Name:</strong> {imageFile?.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="#4646C6"
                    sx={{ marginBottom: "15px" }}
                  >
                    <strong>File Type:</strong> {imageFile?.type}
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={handleRemoveImage}
                    fullWidth
                    sx={{
                      bgcolor: "#e01305ff",
                      color: "#fff",
                      py: 1.5,
                    }}
                  >
                    Remove Image
                  </Button>
                </Box>
              </Box>
            )}
            {resizedImage && (
              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    fontSize: { xs: "16px", sm: "18px", md: "20px" },
                    fontWeight: 700,
                    color: "#4646C6",
                    textAlign: "center",
                    mb: 2,
                  }}
                  gutterBottom
                >
                  Resized Image Preview
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    border: 1,
                    borderColor: "#d1d1d1ff",
                    padding: { xs: 1, sm: 2 },
                    borderRadius: 2,
                    bgcolor: "#f9f9f9",
                  }}
                >
                  <img
                    src={resizedImage}
                    alt="resized"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "250px",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              </Box>
            )}
          </Box>
          {/* Width and Height Inputs */}
          <Box sx={{ marginBottom: "20px", width: "100%" }}>
            <Typography
              sx={{
                fontSize: { xs: "16px", sm: "18px", md: "20px" },
                fontWeight: 700,
                color: "#4646C6",
                textAlign: "center",
                mb: 2,
              }}
              gutterBottom
            >
              Resize Options
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                marginBottom: "20px",
              }}
            >
              <TextField
                label="Width"
                type="number"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
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
            </Box>

            <FormControl fullWidth sx={{ marginBottom: "20px" }}>
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

          {/* Buttons to Resize and Download */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "100%",
            }}
          >
            <Button
              variant="contained"
              onClick={handleResizeImage}
              disabled={!imageFile}
              fullWidth
              sx={{
                bgcolor: "#4646C6",
                color: "#fff",
                py: { xs: 1.5, sm: 2 },
              }}
            >
              Resize Image
            </Button>
            <Button
              variant="outlined"
              onClick={handleDownloadImage}
              disabled={!resizedImage}
              fullWidth
              sx={{
                border: "1px solid #4646C6",
                color: "#4646C6",
                py: { xs: 1.5, sm: 2 },
              }}
            >
              Download Resized Image
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ImageResize;
