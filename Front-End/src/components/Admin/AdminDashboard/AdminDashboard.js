
import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../../../hooks/auth-context";
import Navigation from "../../NavigationSlideBar/Navigation";
import RequestCard from "../../RequestCard/RequestCard";
import AdminNavBar from "../AdminNavBar/AdminNavBar";
import classes from "./AdminDashboard.module.css";

const AdminDashboard = () => {
  const [requests, setRequests] = useState(null);
  const Auth = useAuth();


  const fetchData = async () => {
    const response = await fetch(
      `http://localhost:8080/api/userDrug/getAllPendingDrugUser`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.log("error");
    } else {
      const result = await response.json();
      console.log(result);
      setRequests(result);
    }
  };

  useEffect(() => {
    Auth.hideNavigation();
    fetchData();
  }, []);

  return (
    <>
      <AdminNavBar />
      {Auth.showNav && <Navigation />}
      <div className={classes.container}>
        <h1 className={classes.title}>طلبات التبرع بالأدوية</h1>
        <div className={classes.cardBody}>
          {requests !== null ? (
            requests.map((request) => (
              <RequestCard key={request.id} id={request.id} request={request} />
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;