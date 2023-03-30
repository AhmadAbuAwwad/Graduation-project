import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { useEffect } from "react";
import AdminNavBar from "../AdminNavBar/AdminNavBar";
import Navigation from "../../NavigationSlideBar/Navigation";
import { useAuth } from "../../../hooks/auth-context";
import { Toast } from "primereact/toast";

import "./AddAdmin.css";
import { useRef } from "react";

function AddAdmin() {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [emails, setEmails] = useState([]);
  const toast = useRef(null);
  const Auth = useAuth();


  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


  const fetchData = async () => {
    const response = await fetch(
      "http://localhost:8080/api/userlogin/getUsersLogin",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // TODO: change market name field to the complete field when search process success
    if (response.ok) {
      const results = await response.json();
      console.log(results.map((item) => item.email));
      setEmails(results.map((item) => item.email));
    }
  };

  useEffect(() => {
    Auth.hideNavigation();
    fetchData();
  }, []);

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedEmail) {
      console.log(`You selected email: ${selectedEmail}`);
      const response = await fetch(
        `http://localhost:8080/api/userlogin/makeAdmin/${selectedEmail}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      // TODO: change market name field to the complete field when search process success
      if (response.ok) {
        toast.current.show({
          severity: "success",
          summary: "تمت العملية بنجاح",
          detail:
            " تم اضافة المستخدم بدور آدمن",
          life: 3000,
        });
      }
      // Do something with the selected email here
    } else {
      toast.current.show({
        severity: "error",
        summary: "خطأ في العملية",
        detail: " الرجاء اختيار ايميل من القائمة",
        life: 3000,
      });
      await delay(3000);
    }
  };


  return (
    <div className="container">
      <AdminNavBar />
      <Toast ref={toast} />
      {Auth.showNav && <Navigation />}

      <form onSubmit={handleSubmit} className="form">
        <p>الرجاء اختيار ايميل المسؤول الجديد</p>
        <Dropdown
          value={selectedEmail}
          options={emails.map((email) => ({ label: email, value: email }))}
          onChange={(e) => setSelectedEmail(e.value)}
          placeholder="Select an email"
          className="list"
        />

        <Button type="submit" label="حفظ" className="btn" />
      </form>
    </div>
  );
}

export default AddAdmin;
