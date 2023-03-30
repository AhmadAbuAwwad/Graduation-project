import Classes from "./MedcineDonation.module.css";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import uploadImage from "./uploadImage.png";
import { useRef, useState } from "react";
import { useAuth } from "../../hooks/auth-context";
import { Toast } from "primereact/toast";
import moment from "moment";
import "primereact/resources/themes/saga-green/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Navigation from "../NavigationSlideBar/Navigation";
import { useEffect } from "react";
import FooterDemo from "../AccpetCard/FooterDemo";

const MedcineDonation = () => {
  /**
   * fisrtly true to disable the lowest part of the form
   * then false based on the returned value from BE
   */
  const [disableState, setDisableState] = useState(true);
  const [file, setFile] = useState(null);
  const [showFooter,setShowFooter]=useState(false);
  const [dataObj,setDataObj] = useState({});
  const [path,setPath]= useState("");
  const [method,setMethod]=useState("GET");
 const [searchFlag,setSearchFlag]= useState(true);
  const Navigate = useNavigate();
  const toast = useRef(null);
  const Auth = useAuth();
  const emptyMessage = "الرجاء تعبئة الحقل";

  useEffect(()=>{
    Auth.hideNavigation();
  },[])





  const [searchResult, setSearchResult] = useState({
    company: "الشركة المصنعة",
    dose_type: "جرعة الدواء",
    drug_name: "الاسم العلمي",
    generic_names: " ",
    id: 0,
  });

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


  const searchForMedicine = async (value)=>{
    console.log("value",value);
    console.log(searchResult);
        const response = await fetch(
          `http://localhost:8080/api/drugs/getDrugByName/${value}`,
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
          console.log("result", results);
          setSearchResult(results);
        } else if (response.status == 404) {
          setSearchResult({
            ...searchResult,
            generic_names: value,
          });
          toast.current.show({
            severity: "info",
            summary: "الدواء غير موجود في قاعدة البيانات",
            detail: " الرجاء إضافة معلومات الدواء ",
            life: 3000,
          });
        }

      // Enable the other fields after search operation
      setDisableState(false);
  }

  const handleSubmit = async (values) => {
    values.preventDefault();
    // check if the user is logged In

    if (Auth.isLoggedIn) {
      /**
       * disableState true => بحث btn => it's search for drug by its general name case
       * disableState false => حفظ btn => save the drug data into the database
       */

      if (disableState && searchFlag) {
        /**
         * Get drug data using its general name
         */

        searchForMedicine(values.target.elements.genericName.value);
        
   
      } else {

       
        
        // add to the database case
     
          const Data = {
            email: Auth.user,
            drug: {
              drug_name: values.target.elements.drugName.value,
              generic_names: values.target.elements.genericName.value,
              dose_type: values.target.elements.doseType.value,
              company: values.target.elements.companyName.value,
            },
            expiration_date: moment(
              values.target.elements.expirationDate.value
            ).format("YYYY-MM-DD"),
            production_date: moment(
              values.target.elements.releaseDate.value
            ).format("YYYY-MM-DD"),
          };
          
          setDataObj(Data);
          setPath( `http://localhost:8080/api/userDrug/addDrugToUserList`);
          setMethod("POST");
          setShowFooter(true);
          setDisableState(true);
          console.log("Data Object ", Data);
          // const responseAddDrug = await fetch(
          //   `http://localhost:8080/api/userDrug/addDrugToUserList`,
          //   {
          //     method: "POST",
          //     headers: {
          //       "Content-Type": "application/json",
          //     },
          //     body: JSON.stringify(Data),
          //   }
          // );
  
          
          // toast.current.show({
          //   severity: "success",
          //   summary: "تمت العملية بنجاح",
          //   detail:
          //     " تم إضافة معلومات الدواء بنجاح و سيتم مراجعتها من قبل المختصين",
          //   life: 4000,
          // });
          // await delay(4000);
         // window.location.reload(true);
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

  const acceptHandler = async (flag)=>{
    setShowFooter(false);
    if(flag){
      toast.current.show({
        severity: "success",
        summary: "تمت العملية بنجاح",
        detail:
          " تم إضافة معلومات الدواء بنجاح و سيتم مراجعتها من قبل المختصين",
        life: 4000,
      });
      await delay(4000);
      
    }
  }

   const getBase64 =async (file, cb)=>{
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(){
      cb(reader.result);
    console.log(file)
    }
    reader.onerror = function(error){
      console.log("error", error);
    }
  }
  

  /**
   * This function used to load image
   */


  const chooseImageHandler = async (e) => {

    setSearchFlag(false);
    try {
      const appKey = await fetch("http://localhost:8080/api/drugs/getMathPixKey", {
       method: "GET",
       headers: {
         "Content-Type": "application/json",
       },
       });

      if(appKey.ok){
        
        await getBase64(e.target.files[0], (base64string) => {
          const text =  fetch(`http://api.mathpix.com/v3/text`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "app_key": "afb6432f22e4e3e63b2feb2feb97d034e0b7898ec9150d5171f8e7629892a01c"
            },
            body: JSON.stringify({
              src: base64string,
              formats: ["text", "data", "html"],
              data_options: {
                include_asciimath: true,
                include_latex: true
              }
            })
          })
          .then((res) => res.json())
          .then((resp) =>{
            console.log("resp",resp.text.substring(0, resp.text.indexOf(' ')))
            searchForMedicine(resp.text.substring(0, resp.text.indexOf(' ')));
          } 
          )
          })
      }

     console.log(appKey);
    } catch (error) {
      console.log(error.message);
    }

  };

  return (
    <div className={Classes.medicineDonationContainer}>
      <Header />
      {Auth.showNav && <Navigation />}
      <Toast ref={toast} />
      <div className={Classes.pageBody}>
        <div className={Classes.chooseImage}>
          {file == null && (
            <img src={uploadImage} className={Classes.imageIcon} />
          )}
          {file != null && <img src={file} className={Classes.imageIcon} />}
          <input
            type="file"
            onChange={chooseImageHandler}
            className={Classes.chooseInput}
          />
        </div>

        <div className={Classes.formAction}>
          <form onSubmit={handleSubmit}>
            <div className="p-fluid">
              {disableState && (
                <div className={`${"p-field"} ${Classes.formField}`}>
                  <label htmlFor="genericName" className={Classes.label}>
                    الاسم التجاري
                  </label>
                  <InputText
                    id="genericName"
                    name="genericName"
                    required
                    className={Classes.inputField}
                  />
                </div>
              )}

              {!disableState && (
                <div className={`${"p-field"} ${Classes.formField}`}>
                  <label htmlFor="genericName" className={Classes.label}>
                    الاسم التجاري
                  </label>
                  <InputText
                    id="genericName"
                    name="genericName"
                    className={Classes.inputField}
                    value={searchResult.generic_names}
                    onChange={(e) =>
                      setSearchResult({
                        ...searchResult,
                        generic_names: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              )}

              {disableState && (
                <div className={`${"p-field"} ${Classes.formField}`}>
                  <Button
                    label="بحث"
                    type="submit"
                    className={Classes.inputField}
                  />
                </div>
              )}

              {!disableState && (
                <div className={`${"p-field"} ${Classes.formField}`}>
                  <label htmlFor="drugName" className={Classes.label}>
                    الاسم العلمي
                  </label>
                  <InputText
                    id="drugName"
                    name="drugName"
                    className={Classes.inputField}
                    required
                    value={searchResult.drug_name}
                    onChange={(e) =>
                      setSearchResult({
                        ...searchResult,
                        drug_name: e.target.value,
                      })
                    }
                  />
                </div>
              )}

              {!disableState && (
                <div className={`${"p-field"} ${Classes.formField}`}>
                  <label htmlFor="doseType" className={Classes.label}>
                    الجرعة
                  </label>
                  <InputText
                    id="doseType"
                    name="doseType"
                    className={Classes.inputField}
                    required
                    value={searchResult.dose_type}
                    onChange={(e) =>
                      setSearchResult({
                        ...searchResult,
                        dose_type: e.target.value,
                      })
                    }
                  />
                </div>
              )}

              {!disableState && (
                <div className={`${"p-field"} ${Classes.formField}`}>
                  <label htmlFor="companyName" className={Classes.label}>
                    الشركة المصنعة
                  </label>
                  <InputText
                    id="companyName"
                    name="companyName"
                    className={Classes.inputField}
                    required
                    value={searchResult.company}
                    onChange={(e) =>
                      setSearchResult({
                        ...searchResult,
                        company: e.target.value,
                      })
                    }
                  />
                </div>
              )}

              {!disableState && (
                <div className={`${"p-field"} ${Classes.formField}`}>
                  <label htmlFor="releaseDate" className={Classes.label}>
                    تاريخ الانتاج
                  </label>
                  <Calendar
                    id="releaseDate"
                    name="releaseDate"
                    className={Classes.inputField}
                    required
                  />
                </div>
              )}

              {!disableState && (
                <div className={`${"p-field"} ${Classes.formField}`}>
                  <label htmlFor="expirationDate" className={Classes.label}>
                    تاريخ الانتهاء
                  </label>
                  <Calendar
                    id="expirationDate"
                    name="expirationDate"
                    required
                    className={Classes.inputField}
                  />
                </div>
              )}
              {!disableState && (
                <div className={`${"p-field"} ${Classes.formField}`}>
                  <Button
                    label="حفظ"
                    type="submit"
                    className={Classes.inputField}
                  />
                </div>
              )}
            </div>
          </form>
        </div>
       {showFooter &&  <FooterDemo acceptHandler={acceptHandler} dataObj={dataObj} method={method} path={path}/> }
      </div>
    
    </div>
  );
};

export default MedcineDonation;
