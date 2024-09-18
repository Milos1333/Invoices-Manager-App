import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { fetchData } from "./core/ApiService";
import Customers from "./features/customers/Customers";
import Sellers from "./features/sellers/Sellers";
import Invoices from "./features/invoices/Invoices";
import Navigation from "./components/navigation/Navigation";
import Notification from "./components/Notification/Notification";

const App = () => {
  const [invoices, setInvoices] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      const invoicesData = await fetchData("invoices");
      const sellersData = await fetchData("sellers");
      const customersData = await fetchData("customers");

      if (invoicesData && sellersData && customersData) {
        setInvoices(invoicesData);
        setSellers(sellersData);
        setCustomers(customersData);
      } else {
        return;
      }
    };

    fetchDataFromApi();
  }, []);

  return (
    <div>
      <Notification />
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route
            path="/"
            element={
              <Invoices
                invoices={invoices}
                sellers={sellers}
                customers={customers}
                setInvoices={setInvoices}
              />
            }
          />
          <Route
            path="/sellers"
            element={
              <Sellers
                sellers={sellers}
                setSellers={setSellers}
                invoices={invoices}
                setInvoices={setInvoices}
              />
            }
          />
          <Route
            path="/customers"
            element={
              <Customers
                customers={customers}
                setCustomers={setCustomers}
                invoices={invoices}
                setInvoices={setInvoices}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
