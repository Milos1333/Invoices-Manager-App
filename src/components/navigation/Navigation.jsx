import "./Navigation.style.css";
import { NavLink } from "react-router-dom";
import invoicesIcon from "../../assets/invoicesIcon.png";
import sellersIcon from "../../assets/sellersIcon.png";
import customersIcon from "../../assets/customersIcon.png";

const Navigation = () => {
  return (
    <div className="navigation-container">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "active-link" : "")}
      >
        <img src={invoicesIcon} width="30px" alt="Invoices" />
      </NavLink>
      <NavLink
        to="/sellers"
        className={({ isActive }) => (isActive ? "active-link" : "")}
      >
        <img src={sellersIcon} width="30px" alt="Sellers" />
      </NavLink>
      <NavLink
        to="/customers"
        className={({ isActive }) => (isActive ? "active-link" : "")}
      >
        <img src={customersIcon} width="30px" alt="Customers" />
      </NavLink>
    </div>
  );
};

export default Navigation;
