import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { Paginator } from "primereact/paginator";
import "./MyTable.css";
import DonationCard from "../SearchForMedicinePage/DonationCard";


const MyTable = (props) => {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);
  const [totalRecords, setTotalRecords] = useState(props.data.length);
  const [searchText, setSearchText] = useState("");
  const [cardRow,setCardRow]=useState({});
  const [showCard,setShowCard]=useState(false);
  
  


  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };


  
  const columns = [
    { field: "generic_names", header: "Generic Name" },
    { field: "drug_name", header: "Medicine Name" },
    { field: "dose_type", header: "Dose Type" },
    { field: "expiration_date", header: "Exp Date" },
    {
      body: (rowData) => (
       
        <>
          <Button label="Details" icon="pi pi-pencil" className="detailsBtn" onClick={() => {
            setCardRow(rowData);
            setShowCard(true);
          }} />
          <Button label="request" icon="pi pi-check" onClick={() => console.log(rowData)} />
        </>
      ),
    },
  ];

  const hideCard = () => {
    
    setShowCard(false);
  };

  const paginationFooter = (
    <Paginator
      first={first}
      rows={rows}
      totalRecords={totalRecords}
      rowsPerPageOptions={[5, 10, 20]}
      onPageChange={onPageChange}
    />
  );

  const search = (value) => {
    if (value) {
      const filteredData = props.data.filter((row) =>
        row.drug.generic_names.toLowerCase().includes(value.toLowerCase())
      );
      setTotalRecords(filteredData.length);
      setFirst(0);
      setSearchText(value);
    } else {
      setTotalRecords(props.data.length);
      setSearchText("");
    }
  };

  return (
    <>
      <div className="p-mb-4">
        <i className="pi pi-search"></i>
        <InputText
          placeholder="Search by Generic Name"
          value={searchText}
          onChange={(e) => search(e.target.value)}
          className="searchBar"
        />
      </div>
      <DataTable
        value={props.data
          .filter((row) =>{
            row.drug.generic_names.toLowerCase().includes(searchText.toLowerCase())
          }
            
          )
          .slice(first, first + rows)}
        paginator
        rows={rows}
        totalRecords={totalRecords}
        footer={paginationFooter}
      >
        {columns.map((column) => {
          if (column.field) {
            return (
              <Column
                key={column.field}
                field={column.field}
                header={column.header}
                sortable
              />
            );
          } else if (column.body) {
            return <Column key="details" body={column.body} />;
          } else {
            return null;
          }
        })}
      </DataTable>
     {showCard &&  <DonationCard rowData={cardRow} showCard={showCard} onHideCard={hideCard} />}
    </>
  );
};

export default MyTable;
