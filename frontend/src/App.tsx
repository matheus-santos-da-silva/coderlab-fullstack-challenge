import { ProductList } from "./pages/ProductList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/product" element={<ProductList />} />
      </Routes>
    </Router>
  );
}

export default App;
