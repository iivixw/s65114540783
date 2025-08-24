/* eslint-disable no-unused-vars */
import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Home from "./components/users/Home";
import SignIn from "./components/member/SignIn";
import SignUp from "./components/users/SignUp";
import Header from "./screens/Header";
import Dashboard from "./screens/Dashboard";
import Sidebar from "./sidebar/Sidebar";
import AccountPage from "./components/member/AccountPage";
import AccountSettings from "./components/member/AccountSettings";
import RewardPoints from "./components/member/RewardPoints";
import PointsHistory from "./components/member/PointsHistory";
import PointsGuide from "./components/member/PointsGuide";
import EditProfile from "./components/member/EditProfile";
import AddressPage from "./components/member/AddressPage";
import ChangePasswordPage from "./components/member/ChangePasswordPage";
import CloseAccountPage from "./components/member/CloseAccountPage";
import ServiceHistoryPage from "./components/member/ServiceHistoryPage";
import ReportPage from "./components/member/ReportPage";
import LocationForm from "./components/admin/LocationForm";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminNews from "./components/admin/AdminNews";
import AdminMembers from "./components/admin/AdminMembers";
import AdminWasteCategories from "./components/admin/AdminWasteCategories";
import AdminProfile from "./components/admin/AdminProfile";
import GarbageCollectionForm from "./components/admin/GarbageCollectionForm";
import ReportForm from "./components/admin/ReportForm";
import ComplaintForm from "./components/admin/ComplaintForm";
import SearchMembers from "./components/employee/SearchMembers";
import SearchWaste from "./components/employee/SearchWaste";
import UpdateWastePrice from "./components/employee/UpdateWastePrice";
import UpdateWastePriceTime from "./components/employee/UpdateWastePriceTime";
import ReportWaste from "./components/employee/ReportWaste";
import SidebarEmployee from "./components/employee/SidebarEmployee";
import Employeeprofile from "./components/employee/Employeeprofile";

export default function App() {
  const location = useLocation();

  return (
    <div className="container">
      {location.pathname === "/home" && <Header />}

      <Routes>
        {/* default -> /home */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />

        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/member/signIn" element={<SignIn />} />
        <Route path="/users/signUp" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/member/account" element={<AccountPage />} />
        <Route path="/member/accountsettings" element={<AccountSettings />} />
        <Route path="/member/rewardpoints" element={<RewardPoints />} />
        <Route path="/member/pointshistory" element={<PointsHistory />} />
        <Route path="/member/pointsguide" element={<PointsGuide />} />
        <Route path="/member/editprofile" element={<EditProfile />} />
        <Route path="/member/addresspage" element={<AddressPage />} />
        <Route
          path="/member/changepasswordpage"
          element={<ChangePasswordPage />}
        />
        <Route path="/member/closeaccountpage" element={<CloseAccountPage />} />
        <Route
          path="/member/servicehistorypage"
          element={<ServiceHistoryPage />}
        />
        <Route path="/member/reportpage" element={<ReportPage />} />

        <Route path="/admin/admindashboard" element={<AdminDashboard />} />
        <Route path="/admin/adminnew" element={<AdminNews />} />
        <Route path="/admin/adminmembers" element={<AdminMembers />} />
        <Route path="/admin/adminwaste" element={<AdminWasteCategories />} />
        <Route path="/admin/adminprofile" element={<AdminProfile />} />
        <Route path="/admin/locationform" element={<LocationForm />} />
        <Route path="/admin/garbageform" element={<GarbageCollectionForm />} />
        <Route path="/admin/reportform" element={<ReportForm />} />
        <Route path="/admin/complaintform" element={<ComplaintForm />} />

        <Route path="/employee/searchmembers" element={<SearchMembers />} />
        <Route path="/employee/searchwaste" element={<SearchWaste />} />
        <Route
          path="/employee/udatewasteprice"
          element={<UpdateWastePrice />}
        />
        <Route
          path="/employee/udatewastepricetime"
          element={<UpdateWastePriceTime />}
        />
        <Route path="/employee/reportwaste" element={<ReportWaste />} />
        <Route path="/employee/SidebarEmployee" element={<SidebarEmployee />} />
        <Route path="/employee/Employeeprofile" element={<Employeeprofile />} />
      </Routes>
    </div>
  );
}
