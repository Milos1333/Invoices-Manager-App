import { BrowserRouter, Route, Routes } from "react-router-dom";
import Customers from "./features/customers/Customers";
import Sellers from "./features/sellers/Sellers";
import Invoices from "./features/invoices/Invoices";
import Navigation from "./components/navigation/Navigation";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Invoices />} />
          <Route path="/sellers" element={<Sellers />} />
          <Route path="/customers" element={<Customers />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
