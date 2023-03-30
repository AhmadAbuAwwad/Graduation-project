import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { InputText } from "primereact/inputtext";
import "./UserDrugTable.css";
import { UserDrugService } from "../../service/UserDrugService";
import AdminNavBar from "../AdminNavBar/AdminNavBar";
import { useAuth } from "../../../hooks/auth-context";
import Navigation from "../../NavigationSlideBar/Navigation";

const UserDrugTable = () => {
  const [UserDrugs, setUserDrugs] = useState(null);
  const [selectedUserDrugs, setSelectedUserDrugs] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  const userDrugService = new UserDrugService();
  const Auth = useAuth();

  useEffect(() => {
    Auth.hideNavigation();
    userDrugService.getUserDrugs().then((data) => setUserDrugs(data));
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
      <h5 className="mx-0 my-1">Manage UserDrugs</h5>
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
          value={UserDrugs}
          selection={selectedUserDrugs}
          onSelectionChange={(e) => setSelectedUserDrugs(e.value)}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} UserDrugs"
          globalFilter={globalFilter}
          header={header}
          responsiveLayout="scroll"
        >
          <Column
            field="drugDonor"
            header="donor email"
            sortable
            style={{ minWidth: "14rem" }}
          ></Column>
          <Column
            field="drugReceiver"
            header="receiver email"
            sortable
            style={{ minWidth: "14rem" }}
          ></Column>
          <Column
            field="drug"
            header="drug name"
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="id"
            header="drug id"
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
};
export default UserDrugTable;
