import Button from "../../UI/Button/Button";
import classes from "./Header.module.css";
import { FaBars } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth-context";
import { useState } from "react";
import { useEffect } from "react";

const Header = (props) => {

  const Navigate = useNavigate();
  const [firstName,setFirstName]=useState("");
  const Auth = useAuth();

  const signInHandler = () => {
    Navigate('/login')
  };
  
  const logoutHandler = ()=>{
    Auth.logout();
  }

  /**
   * to show the navigation bar when its button clicked
   */

  const navBarHandler=()=>{
    if(!Auth.showNav){
      Auth.showNavigation();
    }else{
      Auth.hideNavigation();
    }
   
  }
  let userName="";

  if(localStorage.getItem('isLoggedIn')){
    userName = Auth.user.split("@");
  }

   
  const fetchData = async () => {
    const response = await fetch(
      `http://localhost:8080/api/userInfo/getUserInformation/${localStorage.getItem('user')}`,
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
      console.log(results)
      console.log(results.first_name)
      setFirstName(results.first_name +" "+ results.last_name);
    }
  };

  useEffect(()=>{
    fetchData();
  },[])

  //   <a className={classes.help}><FiHelpCircle style={{width:'35px', height:'35px'}}/></a>
  return (
    <div className={classes.headerContainer}>
      <div className={classes.navButton}>
          <FaBars style={{width:'35px', height:'35px'}} onClick={navBarHandler}/>
      </div>
      <div className={classes.title}>
        Medication Donation 
      </div>
      <div className={classes.helpSignIn}>
          {!localStorage.getItem('isLoggedIn') && <Button onClick={signInHandler} className={classes.signIn}>تسجيل الدخول</Button>}
          {localStorage.getItem('isLoggedIn') && <div className={classes.userName}>{firstName}</div>}
          {localStorage.getItem('isLoggedIn') && <button className={classes.logoutButton} onClick={logoutHandler}>
                تسجيل الخروج
              </button>}
      </div>
    </div>
  );
};

export default Header;
