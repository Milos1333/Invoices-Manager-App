import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ApiService from "./core/ApiService";
import Customers from "./features/customers/Customers";
import Sellers from "./features/sellers/Sellers";
import Invoices from "./features/invoices/Invoices";
import Navigation from "./components/navigation/Navigation";

const App = () => {
  const [invoices, setInvoices] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await ApiService();
      if (data) {
        setInvoices(data.invoices);
        setSellers(data.sellers);
        setCustomers(data.customers);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Invoices invoices={invoices} />} />
          <Route path="/sellers" element={<Sellers sellers={sellers} />} />
          <Route
            path="/customers"
            element={<Customers customers={customers} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
