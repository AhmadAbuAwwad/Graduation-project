import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import "primereact/resources/themes/saga-green/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useRef } from "react";

const FooterDemo = (props) => {
  const [visible, setVisible] = useState(false);
  const toast = useRef(null);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const footerContent = (
    <div>
      <Button
        label="لا"
        icon="pi pi-times"
        onClick={() => {
          props.acceptHandler(false);
        }}
        className="p-button-text"
      />
      <Button
        label="نعم"
        icon="pi pi-check"
        onClick={async () => {
          const response = await fetch(props.path, {
            method: props.method,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(props.dataObj),
          });

          if (!response.ok) {
            props.acceptHandler(false);
            toast.current.show({
              severity: "error",
              summary: "خطأ في إضافة المعلومات",
              detail: "خطأ في إضافات المعلومات على قاعدة البيانات",
              life: 3000,
            });
            await delay(3000);
            setVisible(false);
          }else{
            props.acceptHandler(true);
            setVisible(false);
          }
          
        }}
        autoFocus
      />
    </div>
  );

  return (
    <div className="card flex justify-content-center">
      <Toast ref={toast} />
      <Dialog
        header="إخلاء مسؤولية"
        visible={true}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
        footer={footerContent}
      >
        <p className="m-0">
          سيتم أعتماد المعلومات التي قمت بإدخالها كمعلومات موثوقة بناءً على
          ادخالها من المصدر الصحيح و بذلك نخلي مسؤوليتنا بالكامل من الخطأ الناتج
          عن الادخال الخاطئ من قبل المستخدم.<br></br>و بذلك يوافق المستخدم على
          المعلومات المدخلة هل تريد اتمام العملية؟
        </p>
      </Dialog>
    </div>
  );
};

export default FooterDemo;
