import "./AdminNavBar.css";
import {
  faGaugeHigh,
  faFileCirclePlus,
  faUsers,
  faGears,
  faSignOut,
  faNetworkWired,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../../hooks/auth-context";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const AdminNavBar = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handelLogout = () => {
    auth.logout();
    navigate("/");
  };

  const navBarHandler = () => {
    if (!auth.showNav) {
      auth.showNavigation();
    } else {
      auth.hideNavigation();
    }
  };

  return (
    <header className="main-nav">
      <div className="navButton"></div>
      <ul>
        <li onClick={navBarHandler} className="slideBar">
          <FaBars style={{ width: "35px", height: "35px" }} />
        </li>

        <li onClick={() => navigate("/adminDashboard")}>
          <FontAwesomeIcon icon={faFileCirclePlus} />
          <span>طلبات التبرع بالدواء</span>
        </li>
        <li
          onClick={() => {
            navigate("/moneyDonationHistory");
          }}
        >
          <FontAwesomeIcon icon={faGaugeHigh} />
          <span>التبرعات المالية</span>
        </li>
        <li
          onClick={() => {
            navigate("/medicineReservations");
          }}
        >
          <FontAwesomeIcon icon={faUsers} />
          <span>حجوزات الادوية</span>
        </li>
        <li
          onClick={() => {
            navigate("/drugsDatabase");
          }}
        >
          <FontAwesomeIcon icon={faNetworkWired} />
          <span>قاعدة البيانات</span>
        </li>

        <li
          onClick={() => {
            navigate("/addAdmin");
          }}
        >
          <FontAwesomeIcon icon={faGears} />
          <span>الحسابات</span>
        </li>

        <li onClick={handelLogout}>
          <FontAwesomeIcon icon={faSignOut} />
          <span>Log Out</span>
        </li>
      </ul>
    </header>
  );
};

export default AdminNavBar;
