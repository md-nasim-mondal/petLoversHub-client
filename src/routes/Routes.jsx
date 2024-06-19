import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PetListing from "../pages/PetListing/PetListing";
import DonationCampaigns from "../pages/DonationCampaigns/DonationCampaigns";
import Contact from "../pages/Contact/Contact";
import DashboardLayout from "../layouts/DashboardLayout";
import AddAPet from "../pages/Dashboard/User/AddAPet/AddAPet";
import MyAddedPets from "../pages/Dashboard/User/MyAddedPets/MyAddedPets";
import Dashboard from "../pages/Dashboard/Dashboard";
import AdoptionRequest from "../pages/Dashboard/User/AdoptionRequest/AdoptionRequest";
import CreateDonationCampaign from "../pages/Dashboard/User/CreateDonationCampaign/CreateDonationCampaign";
import MyDonationCampaigns from "../pages/Dashboard/User/MyDonationCampaigns/MyDonationCampaigns";
import MyDonations from "../pages/Dashboard/User/MyDonations/MyDonations";
import Users from "../pages/Dashboard/Admin/Users/Users";
import AllDonations from "../pages/Dashboard/Admin/AllDonations/AllDonations";
import AllPets from "../pages/Dashboard/Admin/AllPets/AllPets";
import Profile from "../pages/Dashboard/ForAllUser/Profile/Profile";
import UpdatePet from "../pages/Dashboard/User/UpdatePet/UpdatePet";
import UpdateCampaign from "../pages/Dashboard/User/UpdateCampaign";
import PetDetails from "../pages/PetDetails/PetDetails";

export const router = createBrowserRouter([
  //? Main LayOut 
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
    //? navItems Link routes 
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/pet-listing",
        element: <PetListing />,
      },
      {
        path: "/pet-details/:id",
        element: <PetDetails />,
      },
      {
        path: "/donation-campaigns",
        element: <DonationCampaigns />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
  //? Dashboard Layout
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      //? for All Users
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      //? user dashboard routes
      {
        path: "add-pet",
        element: <AddAPet />,
      },
      {
        path: "my-added-pets",
        element: <MyAddedPets />,
      },
      {
        path: "update-pet/:id",
        element: <UpdatePet />,
      },
      {
        path: "adoption-request",
        element: <AdoptionRequest />,
      },
      {
        path: "create-donation-campaign",
        element: <CreateDonationCampaign />,
      },
      {
        path: "update-campaign/:id",
        element: <UpdateCampaign />,
      },
      {
        path: "my-donation-campaigns",
        element: <MyDonationCampaigns />,
      },
      {
        path: "my-donations",
        element: <MyDonations />,
      },
      //? Admin Dashboard Routes
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "all-pets",
        element: <AllPets />,
      },
      {
        path: "all-donations",
        element: <AllDonations />,
      },
    ],
  },
]);
