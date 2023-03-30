
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import './App.css';
import AdminNavBar from "./components/Admin/AdminNavBar/AdminNavBar";
import HomePage from './components/HomePage';
import Login from './components/LoginPage/Login';
import MedcineDonation from "./components/MedicineDonationPage/MedcineDonation";
import MoneyDonationPage from "./components/MoneyDonationPage/MoneyDonationPage";
import SearchForMedicinePage from "./components/SearchForMedicinePage/SearchForMedicinePage";
import UserInformation from "./components/UserInformation/UserInformation";
import { AuthProvider } from './hooks/auth-context';
import AdminDashboard from "./components/Admin/AdminDashboard/AdminDashboard";
import DrugDB from "./components/Admin/DrugTable/DrugDB";
import MoneyTable from "./components/Admin/MoneyTable/MoneyTable";
import UserDrugTable from "./components/Admin/userDrugTable/UserDrugTable";
import AddAdmin from "./components/Admin/AddAdmin/AddAdmin";
import RequireAuth from "./hooks/RequiredAuth";




function App() {
  return (
    <AuthProvider>

    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path='/medicineDonation' element={<MedcineDonation/>}></Route>
        <Route path='/moneyDonation' element={<MoneyDonationPage/>}></Route>
        <Route path='/medicineSearch' element={<SearchForMedicinePage/>}></Route>
        <Route path='/userInfo' element={<UserInformation/>}></Route>
        
        
        <Route element={<RequireAuth />}>
            <Route path='/addAdmin' element={<AddAdmin/>}></Route> 
            <Route path="/admin" element={<AdminNavBar/>}></Route> 
            <Route path='/adminDashboard' element={<AdminDashboard/>}></Route> 
            <Route path='/drugsDatabase' element={<DrugDB/>}></Route> 
            <Route path='/moneyDonationHistory' element={<MoneyTable/>}></Route> 
            <Route path='/medicineReservations' element={<UserDrugTable/>}></Route> 

            </Route>
    
        
        

      </Routes>
      </BrowserRouter>
      
    </div>

    </AuthProvider>
  );
}


export default App;