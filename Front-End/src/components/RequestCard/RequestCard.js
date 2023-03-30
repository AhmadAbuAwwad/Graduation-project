import React, { useState } from "react";
import "./RequestCard.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Toast } from "primereact/toast";
import 'primereact/resources/themes/saga-green/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { useRef } from "react";


function RequestCard(props) {
  console.log("status",props.request);
  const [status, setStatus] = useState(props.request.status);
  const toast = useRef(null);

  const expDate = new Date(props.request.expiration_date);
  const releaseDate = new Date(props.request.production_date);
  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );
   
  const handelApprove = async () => {
 
    console.log("yes")
    console.log(props.id)
    const response = await fetch(
      `http://localhost:8080/api/userDrug/approveByMangerPost/${props.id}/${true}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if(response.ok){
      toast.current.show({ severity: 'success', summary: 'تمت العملية بنجاح', detail: 'تمت الموافقة على الطلب', life: 3000 });
      setStatus("Approved");
    }else{
      toast.current.show({ severity: 'error', summary: 'خطأ في إضافة المعلومات', detail: 'خطأ في إضافات المعلومات على قاعدة البيانات', life: 3000 });
    }
    await delay(3000);
    window.location.reload(true);
  };

  const handelReject = async () => {

    console.log("props",props.id);
    const response = await fetch(
      `http://localhost:8080/api/userDrug/approveByMangerPost/${props.id}/${false}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if(response.ok){
      toast.current.show({ severity: 'success', summary: 'تم رفض الدواء', detail: 'تم رفض التبرع بالدواء', life: 3000 });
      
    }else{
      toast.current.show({ severity: 'error', summary: 'خطأ في إضافة المعلومات', detail: 'خطأ في إضافات المعلومات على قاعدة البيانات', life: 3000 });
    }
    await delay(3000);
    window.location.reload(true);
  };

  const handelDelete = async () => {
    const response = await fetch(
      `http://localhost:8080/api/userDrug/approveByMangerPost/${props.id}/${false}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if(response.ok){
      toast.current.show({ severity: 'success', summary: 'تم حذف الطلب بنجاح', life: 3000 });
     
    }else{
      toast.current.show({ severity: 'error', summary: 'خطأ في إضافة المعلومات', detail: 'خطأ في إضافات المعلومات على قاعدة البيانات', life: 3000 });
    }
    await delay(3000);
    window.location.reload(true);
  };

  return (
    <>
      <div className="cardContainer">
        <div className="cardRow">
        <Toast ref={toast} />
          {status === 1 ? (
            <div className="approved">تمت الموافقة</div>
          ) : status === 0 ? (
            <div className="rejected">مرفوض</div>
          ) : status === 2 ? (
            <div className="pending">معلق</div>
          ) : null}

          <button onClick={handelDelete} className="trash">
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>

        <div className="cardRow">
          <div className="rightColumn">
            <label className="label">الإسم </label>
            <label className="data">{props.request.userDonor}</label>
          </div>
          <div className="leftColumn">
            <label className="label">الشركة المصنعة </label>
            <label className="data">{props.request.drug.company}</label>
          </div>
        </div>

        <div className="cardRow">
          <div className="rightColumn">
            <label className="label">الإسم التجاري </label>
            <label className="data">{props.request.drug.generic_names}</label>
          </div>
          <div className="leftColumn">
            <label className="label">تاريخ الانتاج </label>
            <label className="data">{releaseDate.toLocaleDateString()}</label>
          </div>
        </div>

        <div className="cardRow">
          <div className="rightColumn">
            <label className="label">الإسم العلمي </label>
            <label className="data">{props.request.drug.drug_name}</label>
          </div>
          <div className="leftColumn">
            <label className="label">تاريخ الانتهاء </label>
            <label className="data"> {expDate.toLocaleDateString()}</label>
          </div>
        </div>

        <div className="cardRow">
          <div className="rightColumn">
            <label className="label">الجرعة </label>
            <label className="data">{props.request.drug.dose_type} </label>
          </div>
          <div className="leftColumn">
          </div>
        </div>

        <div className="cardRow">
          <div className="rightColumn">
          <button
                onClick={handelApprove}
                className="btn-app"
              >
                موافقة
              </button>
          </div>
          <div className="leftColumn">
          <button
                onClick={handelReject}
                className="btn-rej"
              >
                رفض
              </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default RequestCard;