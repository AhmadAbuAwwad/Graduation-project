import { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { useRef } from "react";

import "./CounterBoard.css"
import { Toast } from "primereact/toast";

function CounterBoard() {
  const [medicineDonation, setMedicineDonation] = useState(0);
  const [moneyDonation, setMoneyDonation] = useState(0);
  const [users, setUsers] = useState(0);
  const toast = useRef(null);


  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const handleRequest = async()=>{
  const response = await fetch(
    `http://localhost:8080/api/moneyDonating/getCounterOfDonation`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  
  if (response.ok) {
    const results = await response.json();
    console.log("result", results);
    setMoneyDonation(results);
  } else if (response.status == 404) {
    toast.current.show({
      severity: "error",
      summary: "خطأ في العملية",
      detail: " الرجاء تسجيل الدخول أولاً لإتمام هذه العملية",
      life: 3000,
    });
    await delay(3000);
    
  }

  const response2 = await fetch(
    `http://localhost:8080/api/userDrug/getCounterOfDonation`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  
  if (response2.ok) {
    const results = await response2.json();
    console.log("result", results);
    setMedicineDonation(results[0]);
    setUsers(results[1]);
  } else if (response.status == 404) {
    toast.current.show({
      severity: "error",
      summary: "خطأ في العملية",
      detail: " الرجاء تسجيل الدخول أولاً لإتمام هذه العملية",
      life: 3000,
    });
    await delay(3000);
    
  }
}

useEffect(()=>{
  handleRequest();
},[])

  return (
    <div className="p-d-flex p-ai-center p-jc-center style">
      <Toast ref={toast} />
      <Card className="p-shadow-10 p-mr-2 custom-card card">
        <h3 className="p-text-center p-text-bold">التبرع بالدواء</h3>
        <div className="p-text-center p-text-bold p-text-6xl">{medicineDonation}</div>
      </Card>
      <Card className="p-shadow-10 p-mr-2 custom-card card">
        <h3 className="p-text-center p-text-bold">التبرعات المالية</h3>
        <div className="p-text-center p-text-bold p-text-6xl">{moneyDonation}</div>
      </Card>
      <Card className="p-shadow-10 custom-card card">
        <h3 className="p-text-center p-text-bold">عدد المستفيدين</h3>
        <div className="p-text-center p-text-bold p-text-6xl">{users}</div>
      </Card>
    </div>
  );
}


export default CounterBoard;