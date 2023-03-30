import { Toast } from "primereact/toast";
import { useRef } from "react";
import Header from "../Header/Header";
import "./SearchForMedicine.css";
import { useEffect } from "react";
import { useState } from "react";
import DrugTable from "./DrugTable";
import Navigation from "../NavigationSlideBar/Navigation";
import { useAuth } from "../../hooks/auth-context";

const SearchForMedicinePage = () => {

  const [dataObj, setDataObj] = useState(null);
  const [drugData, setDrugData] = useState(null);
  const [donorData, setDonorData] = useState(null);
  const Auth = useAuth();
  const toast = useRef(null);

  /**
   * Read approved medicines from the database
   */

  useEffect(() => {
    fetch("http://localhost:8080/api/userDrug/getAllApprovedDrugUser")
      .then((response) => response.json())
      .then((data) => {
        setDataObj(data);
        setDrugData(data.map((item) => item.drug));
        setDonorData(data.map((item) => item.userDonor));
      })
      .catch((error) => console.error(error));

      Auth.hideNavigation();
  }, []); // run once, on mount


  return (
    <div className="container">
      <Header />
      {Auth.showNav && <Navigation />}
      <Toast ref={toast} />
    {dataObj &&  <div className="tableContainer"><DrugTable object={dataObj} drugs={drugData} donor={donorData} /></div> }
    </div>
  );
};

export default SearchForMedicinePage;
