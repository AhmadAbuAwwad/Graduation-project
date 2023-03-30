
import { useRef, useState } from "react";
import Header from "../Header/Header";
import "./MoneyDonation.css";
import chipImg from "./image/chip.png";
import visaImg from "./image/visa.png";
import { useAuth } from "../../hooks/auth-context";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import 'primereact/resources/themes/saga-green/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Navigation from "../NavigationSlideBar/Navigation";
import { useEffect } from "react";
import FooterDemo from "../AccpetCard/FooterDemo";


const MoneyDonationPage = () => {

  const [cardNumber, setCardNumber] = useState("####-####-####-####");
  const [cardHolder, setCardHolder] = useState("Full Name");
  const [cardMonth, setCardMonth] = useState("MM");
  const [cardYear, setCardYear] = useState("YY");
  const [cardCvv, setCardCvv] = useState("");
  const [moneyInput, setMoneyInput] = useState();
  const [moneyUnit, setMoneyUnit] = useState("$");
  const [showFooter,setShowFooter]=useState(false);
  const [dataObj,setDataObj] = useState({});
  const [path,setPath]= useState("");
  const [method,setMethod]=useState("GET");
  const Auth = useAuth();
  const Navigate = useNavigate();
  const toast = useRef(null);
  
  useEffect(()=>{
    Auth.hideNavigation();
  },[])

  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  const cardNumberHandler = (event) => {
    setCardNumber(event.target.value);
    if (event.target.value == "") {
      setCardNumber("####-####-####-####");
    }
  };

  const cardHolderHandler = (event) => {
    setCardHolder(event.target.value);
    if (event.target.value == "") {
      setCardHolder("Full Name");
    }
  };

  const monthSelectorHandler = (event) => {
    setCardMonth(event.target.value);
    if (event.target.value == "") {
      setCardMonth("MM");
    }
  };

  const yearSelectorHandler = (event) => {
    setCardYear(event.target.value);
    if (event.target.value == "") {
      setCardYear("YY");
    }
  };

  const ccvHandler = (event) => {
    setCardCvv(event.target.value);
    if (event.target.value == "") {
      setCardCvv("");
    }
  };

  const formHandler = async (event) => {
    event.preventDefault();
  
    if (Auth.isLoggedIn) {
      // Find the current date
        let yourDate = new Date()
        const offset = yourDate.getTimezoneOffset()
        yourDate = new Date(yourDate.getTime() - (offset*60*1000))
        let currentDate = yourDate.toISOString().split('T')[0];
       
        
      // data object to post it using API
      let Data = {
        moneyAmount: moneyInput,
        moneyUnit: moneyUnit,
        dateOfDonating: currentDate,
        email: Auth.user,
        cardNumber: cardNumber,
        cardHolder: cardHolder,
      };

      console.log(Data);
      setDataObj(Data);
      setPath("http://localhost:8080/api/moneyDonating/donateMoney");
      setMethod("POST")
      setShowFooter(true);
      // Change the API here where the data will send in the body in json format
      // const response = await fetch("http://localhost:8080/api/moneyDonating/donateMoney", {
      //   method: "POST",
      //   body: JSON.stringify(Data),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });

      // if(!response.ok){
      //   console.log("fetching error status:",response.status);
      //   toast.current.show({ severity: 'error', summary: 'خطأ في إضافة المعلومات', detail: 'خطأ في إضافات المعلومات على قاعدة البيانات', life: 3000 });
      // }else{

        // toast.current.show({ severity: 'success', summary: 'تمت العملية بنجاح', detail: ' تمت عملية التبرع بنجاح', life: 3000 });
        // await delay(3000);
        // // Reset fields
        // setCardNumber("");
        // setCardCvv("");
        // setCardHolder("Full Name")
        // setCardMonth("MM");
        // setCardYear("YY");
        // setMoneyUnit("$");
        // setMoneyInput();
        // Navigate("/")
      //}
    } else {

      toast.current.show({ severity: 'error', summary: 'خطأ في العملية', detail: ' الرجاء تسجيل الدخول أولاً لإتمام هذا الإجراء', life: 3000 });
      await delay(3000);
      Navigate("/login");
    
    }
  };


  const acceptHandler = async (flag)=>{

    setShowFooter(false);
    if(flag){
     
      toast.current.show({ severity: 'success', summary: 'تمت العملية بنجاح', detail: ' تمت عملية التبرع بنجاح', life: 3000 });
      await delay(3000);
      // Reset fields
      setCardNumber("");
      setCardCvv("");
      setCardHolder("Full Name")
      setCardMonth("MM");
      setCardYear("YY");
      setMoneyUnit("$");
      setMoneyInput();
      window.location.reload(true);
    }
  }

  return (
    <div className="container">
      <Header />
      {Auth.showNav && <Navigation />}
      <Toast ref={toast} />
      <div className="card-container">
        <div className="front">
          <div className="image">
            <img src={chipImg} alt="Visa background" />
            <img src={visaImg} alt="Visa Name" />
          </div>
          <div className="card-number-box">{cardNumber}</div>
          <div className="flexbox">
            <div className="box">
              <span>card holder</span>
              <div className="card-holder-name">{cardHolder}</div>
            </div>
            <div className="box">
              <span>expires</span>
              <div className="expiration">
                <span className="exp-month">{cardMonth}-</span>
                <span className="exp-year">{cardYear}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="back">
          <div className="stripe"></div>
          <div className="box">
            <span>cvv</span>
            <div className="cvv-box">{cardCvv}</div>
            <img src={visaImg} alt="Visa image" />
          </div>
        </div>
      </div>

      <form onSubmit={formHandler}>
        <div className="inputBox">
          <span>card number</span>
          <input
            type="text"
            maxLength="16"
            className="card-number-input"
            onChange={cardNumberHandler}
            required
          />
        </div>

        <div className="inputBox">
          <span>card holder</span>
          <input
            type="text"
            className="card-holder-input"
            onChange={cardHolderHandler}
            required
          />
        </div>

        <div className="flexbox">
          <div className="inputBox">
            <span>Amount Of Money</span>
            <input
              type="number"
              className="money-input"
              required
              onChange={(event) => {
                setMoneyInput(event.target.value);
              }}
            />
          </div>

          <div className="inputBox">
            <span>Money Unit</span>
            <select
              name=""
              id=""
              className="month-input"
              onChange={(event) => {
                setMoneyUnit(event.target.value);
              }}
            >
              <option value="₪" selected disabled>
                $
              </option>
              <option value="$">$ -Dolar</option>
              <option value="₪">₪ -Shekel</option>
            </select>
          </div>
        </div>

        <div className="flexbox">
          <div className="inputBox">
            <span>expiration mm</span>
            <select
              name=""
              id=""
              className="month-input"
              onChange={monthSelectorHandler}
            >
              <option value="month" selected disabled>
                1
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
          </div>

          <div className="inputBox">
            <span>expiration yy</span>
            <select
              name=""
              id=""
              className="year-input"
              onChange={yearSelectorHandler}
            >
              <option value="year" defaultValue="2023" disabled>
                year
              </option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
              <option value="2030">2030</option>
            </select>
          </div>

          <div className="inputBox">
            <span>cvv</span>
            <input
              type="number"
              maxLength="4"
              className="cvv-input"
              onChange={ccvHandler}
              required
            />
          </div>
        </div>

        <input type="submit" value="submit" className="submit-btn" />
      </form>
      {showFooter &&  <FooterDemo acceptHandler={acceptHandler} dataObj={dataObj} method={method} path={path}/> }
    </div>
  );
};

export default MoneyDonationPage;
