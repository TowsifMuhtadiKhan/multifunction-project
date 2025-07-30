import React from "react";
import { Box, Typography } from "@mui/material";

const HomePage: React.FC = () => {
  return (
    <Box width={"80%"} margin="auto" paddingTop="120px">
      <Typography variant="h4" gutterBottom>
        Welcome to the Tools Hub
      </Typography>

      <Typography variant="h6" gutterBottom>
        Here you can access various tools to work with images, PDFs, and videos.
      </Typography>
      <Typography variant="body1" paragraph>
        <strong>1. Image Compress:</strong> Compress images to reduce file size
        without sacrificing quality.
      </Typography>
      <Typography variant="body1" paragraph>
        <strong>2. Image Resize:</strong> Resize your images to the desired
        dimensions without losing quality.
      </Typography>
      <Typography variant="body1" paragraph>
        <strong>3. YouTube Video Download:</strong> Download YouTube videos and
        convert them into various formats easily. (Coming soon!)
      </Typography>
      <Typography variant="body1" paragraph>
        <strong>4. PDF Merger:</strong> Merge multiple PDF files into one
        document effortlessly. (Coming soon!)
      </Typography>
      <Typography variant="body1" paragraph>
        <strong>5. PDF Compress:</strong> Compress large PDF files to reduce
        their size without losing quality. (Coming soon!)
      </Typography>
    </Box>
  );
};

export default HomePage;
