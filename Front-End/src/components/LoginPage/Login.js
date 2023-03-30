
import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/auth-context";
import jwt_decode from "jwt-decode";
import classes from "./Login.module.css";
import { useRef } from "react";
import { Toast } from "primereact/toast";
import 'primereact/resources/themes/saga-green/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const Login = () => {
  const Auth = useAuth(); // To use Auth react context values and methods
  const Navigate = useNavigate(); // To navigate to anothe route (another page)
  const toast = useRef(null);

  const google = window.google;

  useEffect(() => {
    /**
     * Called as a response when google send authenticaton token after the user login
     * @param {*} response contains google access token
     */

    const handelCallBackResponse = async (response) => {
      // Decode ggole access token
      let userObject = jwt_decode(response.credential);

      // Define user object to store it in the database
      // By default the role will be normal user which's represented by 1
      let loginData = {
        email: userObject.email,
        role: 1,
        // token: response.credential
      };
      localStorage.setItem("isLoggedIn", true);

      if (userObject.email_verified) {
        /**
         * send user data to backend to store them in database
         * if the user has data inside the database then get it from the database
         */
        const result = await fetch(
          `http://localhost:8080/api/userlogin/getUserLogin/${userObject.email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (result.ok) {

          const userResult = await result.json();
          console.log(userResult);
          // Check if the user login for the first time or not
          localStorage.setItem("newUser", false);
        }
        else{
          localStorage.setItem("newUser", true);

          const response = await fetch(
            `http://localhost:8080/api/userlogin/createUser`,
            {
              method: "POST",
              body: JSON.stringify(loginData),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
  
          console.log(JSON.stringify(loginData))
  
          if (!response.ok) {
            const message = "An error has occured";
            console.log(message);
          }
          
        }
        


        await Auth.login(userObject.email).then((res) => {
          console.log({typeof :localStorage.getItem("newUser")});
          if (res.RES) {
            if (localStorage.getItem("newUser") === 'true') {
              Navigate("/userInfo");
            } else {
              if (res.userRole === 0) {
                Navigate('/admin')
              } else if (res.userRole === 1) {
                Navigate("/");
              }
            }
          }
        });
      } else {
        // In this case we must refuse log in process.
        toast.current.show({ severity: 'error', summary: 'خطأ في العملية', detail: 'الرجاء إعادة التسجيل باستخدام حساب جوجل ', life: 3000 });
      }
    };
    const display = async function () {
      // If the user is not login then display login with google button
      if (!!Auth.isLoggedIn === false) {
        await google.accounts.id.initialize({
          client_id:
            "168675088198-h4di6ve5dekl2fadrdd0hnlbierre5em.apps.googleusercontent.com",
          callback: handelCallBackResponse,
        });

        await google.accounts.id.renderButton(
          document.getElementById("signInDiv"),
          {
            theme: "outline",
            size: "large",
          }
        );
      }
    };

    display();
  }, [Auth.isLoggedIn]);

  return (
    <div className={classes.container}>
      <Toast ref={toast} />
      {Auth.isLoggedIn ? (
        <Outlet />
      ) : (
        <div className={classes.loginContainer}>
          <div>
            {" "}
            يتم تسجيل الدخول باستخدام حساب جوجل الحالي او حساب آخر لتسجيل الدخول
            الرجاء الضغط على الزر التالي :<br />
            <br />
            <ul>
              <li>
                يمكنك تسجيل الدخول مباشرةً اذا كنت تستخدم حساب جوجل للمتصفح
              </li>
              <br />
              <li>
                يمكنك إستخدام حساب آخر يتم ذلك عن طريق إدخال الإيميل متبوعة
                بكلمة السر
              </li>
            </ul>
          </div>
          <div id="signInDiv" className={classes.signInDiv} />
        </div>
      )}
    </div>
  );
};

export default Login;