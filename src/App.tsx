import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./pages/Header";
import HomePage from "./pages/HomePage";
import ImageResize from "./pages/Feature/ImageResize";
import ImageCompress from "./pages/Feature/ImageCompress";

// Create placeholder components for Home, About, and Contact pages

const App = () => {
  return (
    <Router>
      <Header title="Multifuntion" />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/image-compress" element={<ImageCompress />} />
        <Route path="/image-resize" element={<ImageResize />} />
      </Routes>
    </Router>
  );
};

export default App;
