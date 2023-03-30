import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import "./DrugTable.css";
import { useAuth } from "../../hooks/auth-context";
import { useNavigate } from "react-router-dom";
import FooterDemo from "../AccpetCard/FooterDemo";

function DrugTable(props) {

  const [selectedDrug, setSelectedDrug] = useState(null);
  const [cardData, setCardData] = useState({});
  const [cardDonor, setCardDonor] = useState({});
  const [cardDrug, setCardDrug] = useState({});
  const [showCard, setShowCard] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  const [dataObj, setDataObj] = useState({});
  const [path, setPath] = useState("");
  const [method, setMethod] = useState("GET");
  const [globalFilter, setGlobalFilter] = useState("");
  const Navigate = useNavigate();
  const toast = useRef(null);
  const Auth = useAuth();

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleRequestClick = async (drug) => {
    // Handle request button click for the selected drug
    
    if (Auth.isLoggedIn) {
      const temp = props.object;
      console.log(drug);
      for (let i = 0; i < temp.length; i++) {
        const tt = props.object[i];
        if (drug == tt.drug) {
          const userDonor = tt.userDonor;
          setMethod("POST");
          setPath(
            `http://localhost:8080/api/userDrug/askForMedicine/${tt.id}/${userDonor.email}`
          );
          setShowFooter(true);
          // setShowFooter(true);
          // const response = await fetch(
          //   `http://localhost:8080/api/userDrug/askForMedicine/${tt.id}/${userDonor.email}`,
          //   {
          //     method: "POST",
          //     headers: {
          //       "Content-Type": "application/json",
          //     },
          //   }
          // );

          // if (!response.ok) {
          //   toast.current.show({
          //     severity: "error",
          //     summary: "خطأ في العملية",
          //     detail: " الرجاء تحديث الصفحة وإعادة المحاولة لاحقاً",
          //     life: 3000,
          //   });
          //   await delay(3000);
          // } else {
          //   toast.current.show({
          //     severity: "success",
          //     summary: "تمت العملية بنجاح",
          //     detail: " تم حجز الدواء و سيتم التواصل معك من قبل فريقنا المختص",
          //     life: 4000,
          //   });
          //   await delay(4000);
          //   window.location.reload(true);
          // }

          break;
        }
      }
    } else {
      toast.current.show({
        severity: "error",
        summary: "خطأ في العملية",
        detail: " الرجاء تسجيل الدخول أولاً لإتمام هذه العملية",
        life: 3000,
      });
      await delay(3000);
      Navigate("/login");
    }
  };

  const acceptHandler = async (flag) => {
    setShowFooter(false);
    if (flag) {
     
      toast.current.show({
        severity: "success",
        summary: "تمت العملية بنجاح",
        detail: " تم حجز الدواء و سيتم التواصل معك من قبل فريقنا المختص",
        life: 4000,
      });
      await delay(4000);
      window.location.reload(true);
    }
  };

  const handleDetailsClick = (drug) => {
    // Handle details button click for the selected drug
   
    const temp = props.object;
    console.log(drug);
    for (let i = 0; i < temp.length; i++) {
      const tt = props.object[i];
      if (drug == tt.drug) {
        console.log("Card Data ===> ", props.object[i]);
        setCardData(props.object[i]);
        setCardDonor(tt.userDonor);
        setCardDrug(tt.drug);
        setShowCard(true);
        break;
      }
    }
  };

  const actionTemplate = (rowData) => {
    return (
      <>
        <Toast ref={toast} />
        <Button
          label="المزيد"
          icon="pi pi-info-circle"
          className="detailsBtn"
          onClick={() => handleDetailsClick(rowData)}
        />

        <Button
          label="طلب الدواء"
          icon="pi pi-check"
          onClick={() => handleRequestClick(rowData)}
        />
      </>
    );
  };

  const expDate = new Date(cardData.expiration_date);

  return (
    <>
      <div className="p-mb-4">
        <i className="pi pi-search"></i>
        <InputText
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search"
          className="searchBar"
        />
      </div>
      <DataTable
        value={props.drugs}
        selectionMode="single"
        selection={selectedDrug}
        onSelectionChange={(e) => setSelectedDrug(e.value)}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 15, 30]}
        globalFilter={globalFilter}
      >
        <Column
          field="generic_names"
          header="Generic Names"
          filter
          filterMatchMode="contains"
        />

        <Column
          field="drug_name"
          header="Drug Name"
          filter
          filterMatchMode="contains"
        />
        <Column
          field="dose_type"
          header="Dose Type"
          filter
          filterMatchMode="contains"
        />
        <Column
          field="company"
          header="Company"
          filter
          filterMatchMode="contains"
        />
        <Column body={actionTemplate} header="Actions" />
      </DataTable>

      <Dialog
        visible={showCard}
        style={{ width: "40vw" }}
        onHide={() => setShowCard(false)}
        className="dialog"
      >
        <div style={{ direction: "rtl", padding: "15px" }}>
          <div>
            الاسم التجاري : <span className="spanSpace"> </span>{" "}
            {cardDrug.generic_names}{" "}
          </div>
          <div>
            الاسم العلمي : <span className="spanSpace" />
            {cardDrug.drug_name}
          </div>
          <div>
            الجرعة : <span className="spanSpace" /> {cardDrug.dose_type}
          </div>
          <div>
            تاريخ انتهاء الصلاحية : <span className="spanSpace" />
            {expDate.toLocaleDateString()}
          </div>
          <br />
          <hr />
          <h3>معلومات المتبرع</h3>
          <br />
          <div>
            الاسم : <span className="spanSpace" />
            {cardDonor.first_name} {cardDonor.last_name}
          </div>
          <div>
            الايميل : <span className="spanSpace" />
            {cardDonor.email}
          </div>
          <div>
            العنوان : <span className="spanSpace" />
            {cardDonor.address}
          </div>
          <div>
            أقرب مكان معروف : <span className="spanSpace" />
            {cardDonor.nearest_popular_place}
          </div>
          <div>
            رقم الهاتف : <span className="spanSpace" />
            {cardDonor.phone_number}{" "}
          </div>
        </div>
      </Dialog>
      {showFooter && (
        <FooterDemo
          acceptHandler={acceptHandler}
          dataObj={dataObj}
          method={method}
          path={path}
        />
      )}
    </>
  );
}

export default DrugTable;
