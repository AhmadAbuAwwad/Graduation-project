import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { InputText } from "primereact/inputtext";
import "./MoneyTable.css";
import { MoneyService } from "../../service/MoneyService";
import AdminNavBar from "../AdminNavBar/AdminNavBar";
import Navigation from "../../NavigationSlideBar/Navigation";
import { useAuth } from "../../../hooks/auth-context";

const MoneyTable = () => {
  const [Moneys, setMoneys] = useState(null);
  const [selectedMoneys, setSelectedMoneys] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  const moneyService = new MoneyService();
  const Auth = useAuth();

  useEffect(() => {
    Auth.hideNavigation();
    moneyService.getMoneys().then((data) => {
     const newData = data.map((obj)=>{
        const dt = new Date(obj.date);
        return{
            ...obj,
            date:dt.toLocaleDateString(),
        };
     }) 
     setMoneys(newData)  ;
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const leftToolbarTemplate = () => {
    return <React.Fragment></React.Fragment>;
  };

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="Export"
          icon="pi pi-upload"
          className="p-button-help"
          onClick={exportCSV}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1">Manage Moneys</h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );

  return (
    <div className="datatable-crud-demo">
      <Toast ref={toast} />
      <AdminNavBar />
      {Auth.showNav && <Navigation />}
      <div className="card">
        <Toolbar
          className="mb-4 exportBar"
          left={leftToolbarTemplate}
          right={rightToolbarTemplate}
        ></Toolbar>
        <DataTable
          ref={dt}
          value={Moneys}
          selection={selectedMoneys}
          onSelectionChange={(e) => setSelectedMoneys(e.value)}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Moneys"
          globalFilter={globalFilter}
          header={header}
          responsiveLayout="scroll"
        >
          <Column
            field="holder"
            header="User Name"
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="email"
            header="email"
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>
          <Column
            field="date"
            header="date"
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="amount"
            header="money amount"
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="unit"
            header="money unit"
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
};
export default MoneyTable;
