
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth-context'
import classes from './Navigation.module.css'

const Navigation = ()=>{

    const Auth = useAuth();
    const Navigate = useNavigate(); // To navigate to anothe route (another page)
    /**
     * hide navigation bar when the user click on the rest of the page
     */


    const hideNavBar=()=>{
        Auth.hideNavigation();
    }

    /**
     * Go to donate medicine page
     */

    const goToDonateMedicine = ()=>{
        Navigate('/medicineDonation')
    }

    /**
     * Go to donate money page
     */

    const goToDonateMoney = ()=>{
        Navigate('/moneyDonation')
    }

    /**
     * Go to search for medicine page
     */

    const goToSearchForMedicine = ()=>{
        Navigate('/medicineSearch')
    }

    const goToHome = ()=>{
        Navigate('/')
    }

    const goToAdmin = ()=>{
        Navigate('/adminDashboard')
    }
    console.log(localStorage.getItem('role'))
    console.log(localStorage.getItem('role') === '1')
    return(
        <div className={classes.navContainer}>
            <div className={classes.navBar}>
                <div onClick={goToHome} className={classes.home}>الصفحة الرئيسية</div>
                <div onClick={goToDonateMedicine} className={classes.donateMecidne}>التبرع بالدواء</div>
                <div onClick={goToDonateMoney} className={classes.donateMoney}>التبرع بالمال</div>
                <div onClick={goToSearchForMedicine} className={classes.searchForMedicine}>البحث عن الدواء</div>
                {localStorage.getItem('role') === '0' && <div onClick={goToAdmin} className={classes.searchForMedicine}>الادمن</div> }
            </div>
            <div onClick={hideNavBar} className={classes.rightPage}>
            </div>
        </div>
    )

}

export default Navigation;