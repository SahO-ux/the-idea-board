import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Landing from "./pages/Landing";
import AppPage from "./pages/AppPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/app" element={<AppPage />} />
          <Route path="*" element={<Landing />} />
        </Routes>
        <Toaster position="top-right" />
      </BrowserRouter>
    </>
  );
}

export default App;
