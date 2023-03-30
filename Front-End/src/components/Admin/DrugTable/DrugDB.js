import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { InputText } from "primereact/inputtext";
import "./DrugDB.css";
import { DrugService } from "../../service/DrugService";
import AdminNavBar from "../AdminNavBar/AdminNavBar";
import { useAuth } from "../../../hooks/auth-context";
import Navigation from "../../NavigationSlideBar/Navigation";

const DrugDB = () => {
  const [Drugs, setDrugs] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const Auth = useAuth();
  const toast = useRef(null);
  const dt = useRef(null);
  const drugService = new DrugService();

  useEffect(() => {
    Auth.hideNavigation();
    drugService.getDrugs().then((data) => setDrugs(data));
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
      <h5 className="mx-0 my-1">Manage Drugs</h5>
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
          value={Drugs}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Drugs"
          globalFilter={globalFilter}
          header={header}
          responsiveLayout="scroll"
          className="table"
        >
          <Column
            field="drug_name"
            header="drug name"
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="generic_names"
            header="generic names"
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>
          <Column
            field="dose_type"
            header="Dose Type"
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="company"
            header="Company"
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default DrugDB;
