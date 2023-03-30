import classes from "./HomePage.module.css";
import money from "./assets/money.jpg";
import donateMedicine from "./assets/medicine.PNG";
import donateMoney from "./assets/donate money.jpeg";
import medicineSearch from "./assets/medicine search.PNG";
import Header from "./Header/Header";
import Icons from "./Icons";
import { BsFacebook } from "react-icons/bs";
import { FaTwitter } from "react-icons/fa";
import { SiWhatsapp } from "react-icons/si";
import { useRef } from "react";
import { useAuth } from "../hooks/auth-context";
import Navigation from "./NavigationSlideBar/Navigation";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import CounterBoard from "./test/CounterBoard";
//import {Toast} from 'primereact/toast'

const HomePage = () => {

  const Auth = useAuth(); // To use Auth react context values and methods
  const Navigate = useNavigate(); // To navigate to anothe route (another page)
  /**
   * Refs used to scroll for a specified paragraph
   */

  const medicineDonationPar = useRef(null);
  const moneyDonationPar = useRef(null);
  const medicineSearchPar = useRef(null);
  

  useEffect(()=>{
    Auth.hideNavigation();
  },[])

  if (!!localStorage.getItem("isLoggedIn")) {
    //Toast.current.show({severity: 'success', summary: 'Success Message', detail: 'Order submitted'});
    /*
      toast(" ✅ تم تسجيل الدخول بنجاح ", {
        type: "success",
        position: "top-right",
        theme: "dark",
      });*/
  }

  /**
   * Go to donate medicine page
   */

  const goToDonateMedicine = () => {
    Navigate("/medicineDonation");
  };

  /**
   * Go to donate money page
   */

  const goToDonateMoney = () => {
    Navigate("/moneyDonation");
  };

  /**
   * Go to search for medicine page
   */

  const goToSearchForMedicine = () => {
    Navigate("/medicineSearch");
  };

  const redirectToLink=()=>{
    window.location.href = "https://www.facebook.com/profile.php?id=100090711249083";
  }

  return (
    <div className={classes.homePageContainer}>
      <Header />
      {Auth.showNav && <Navigation />}
      <img src={money} alt="cover image" className={classes.coverImage} />
      <div className={classes.counterContainer}>
      <CounterBoard/>
      </div>
     
      <div className={classes.iconsDiv}>
        <Icons
          imgSrc={donateMedicine}
          text="توفر هذه الميزة إمكانية التبرع بالدواء الزائد عن الحاجة ضمن شروط سلامة محددة ليستفيد منه مستخدم آخر بحاجة الدواء"
          refValue={medicineDonationPar}
          onClick={goToDonateMedicine}
        />
        <Icons
          imgSrc={donateMoney}
          text="توفر هذه الميزة إمكانية التبرع بالمال الذي سيتم إستخدامه في شراء الدواء لمستخدم آخر  "
          refValue={moneyDonationPar}
          onClick={goToDonateMoney}
        />
        <Icons
          imgSrc={medicineSearch}
          text="توفر هذه الميزة إمكانية البحث و أختيار الدواء اللازم للمستخدم من عدة أدوية معروضة من المستخديمن الآخرين"
          refValue={medicineSearchPar}
          onClick={goToSearchForMedicine}
        />
      </div>
    
      <div className={classes.paragraphDiv}>
        <ul ref={medicineDonationPar}>
          <h1>التبرع بالدواء</h1>
          <li>
            {" "}
            .تستطيع التبرع بالأدوية التي لم تعد بحاجة إليها لمساعدة من هم بحاجة
            لها
          </li>
          <li>
            .يشترط على الأدوية المبترع بها أن تكون صالحة للأستخدام ومخزنة بشكل
            جيد ومتبقي وقت طويل على إنتهاء صلاحيتها
          </li>
          <li>
            .يمكنك اختيار مكان تسليم الأدوية او الأتفاق مع من هم بحاجة لتلك
            الأدوية
          </li>
        </ul>
        <ul ref={moneyDonationPar}>
          <h1>التبرع بالمال</h1>
          <li>
            {" "}
            .تستطيع ايضا التبرع بمبلغ مالي لتوفير الدواء لمن لا يتسطيعون دفع ثمن
            تلك الأدوية
          </li>
          <li>
            {" "}
            .سيتم شراء الدواء لمن يحتاجه بعد تأكدنا من حاجته للدواء وعدم مقدرته
            على شرائه
          </li>
          <li>
            {" "}
            .جري عملية تحويل الأموال لحسابنا بشكل آمن تماما فلن يتم تخزين أي من
            معلوماتك المالية
          </li>
        </ul>
        <ul ref={medicineSearchPar}>
          <h1>البحث عن دواء</h1>
          <li>
            {" "}
            .يمكنك البحث عن الأدوية المتبرع بها من خلال محرك البحث فالموقع
          </li>
          <li>
            .إذا كان الدواء متوفر بلموقع يمكنك التواصل مع المتبرع والأتفاق على
            طريقة توصيله
          </li>
          <li>
            {" "}
            .اذا لم يكن الدواء المطلوب غير متوفر تستطيع تقديم طلب للموقع عن
            حاجتك لهذا الدواء مع كافة البيانات التي تثبت ذلك وسيتم التواصل معك
            لتوفير الدواء بعد التأكد من كافة البيانات المرفقة
          </li>
        </ul>
      </div>
      <div className={classes.footer}>
        <div>للتواصل معنا:</div>
        <div className={classes.accountsDiv}>
          <div className={classes.accounts}>
            <BsFacebook />
            <span className={classes.accountSpan} onClick={redirectToLink}>Medicine Donation</span>
          </div>
          <div className={classes.accounts}>
            <FaTwitter />
            <span className={classes.accountSpan}>Twitter account</span>
          </div>
          <div className={classes.accounts}>
            <SiWhatsapp />
            <span className={classes.accountSpan}>+970567901652</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
