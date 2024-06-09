import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PetListings from "../pages/PetListings/PetListings";
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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <PetListings />,
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
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      // for All
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      // user dashboard routes
      {
        path: "add-pet",
        element: <AddAPet />,
      },
      {
        path: "my-added-pets",
        element: <MyAddedPets />,
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
        path: "my-donation-campaigns",
        element: <MyDonationCampaigns />,
      },
      {
        path: "my-donations",
        element: <MyDonations />,
      },
      // Admin Routes
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
