import { Toaster } from "./components/ui/toaster";
import { ProductForm } from "./pages/ProductForm";
import { ProductList } from "./pages/ProductList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/product" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductForm />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
