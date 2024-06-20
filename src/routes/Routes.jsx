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
import CampaignDetails from "../pages/CampaignDetails/CampaignDetails";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

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
        element: (
          <PrivateRoute>
            <PetDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/donation-campaigns",
        element: <DonationCampaigns />,
      },
      {
        path: "/campaign-details/:id",
        element: (
          <PrivateRoute>
            <CampaignDetails />
          </PrivateRoute>
        ),
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
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      //? for All Users
      {
        index: true,
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: <Profile />,
      },
      //? user dashboard routes
      {
        path: "add-pet",
        element: (
          <PrivateRoute>
            <AddAPet />
          </PrivateRoute>
        ),
      },
      {
        path: "my-added-pets",
        element: (
          <PrivateRoute>
            <MyAddedPets />
          </PrivateRoute>
        ),
      },
      {
        path: "update-pet/:id",
        element: (
          <PrivateRoute>
            <UpdatePet />
          </PrivateRoute>
        ),
      },
      {
        path: "adoption-request",
        element: (
          <PrivateRoute>
            <AdoptionRequest />
          </PrivateRoute>
        ),
      },
      {
        path: "create-donation-campaign",
        element: (
          <PrivateRoute>
            <CreateDonationCampaign />
          </PrivateRoute>
        ),
      },
      {
        path: "update-campaign/:id",
        element: (
          <PrivateRoute>
            <UpdateCampaign />
          </PrivateRoute>
        ),
      },
      {
        path: "my-donation-campaigns",
        element: (
          <PrivateRoute>
            <MyDonationCampaigns />
          </PrivateRoute>
        ),
      },
      {
        path: "my-donations",
        element: (
          <PrivateRoute>
            <MyDonations />
          </PrivateRoute>
        ),
      },
      //? Admin Dashboard Routes
      {
        path: "users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <Users />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "all-pets",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllPets />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "all-donations",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllDonations />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
