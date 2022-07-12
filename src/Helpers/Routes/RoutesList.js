import DashBoard from "../../Views/Admin/Dashboard";
import CancellationPolicy from "../../Views/Comman/CancellationPolicy/CancellationPolicy";
import Faq from "../../Views/Comman/Faq/Faq";
import Logout from "../../Views/Comman/Logout";
import PrivacyPolicy from "../../Views/Comman/PrivacyPolicy/PrivacyPolicy";
import Reset from "../../Views/Comman/ResetPassword/Reset";
import TermAndCondition from "../../Views/Comman/TermAndCondition/TermAndCondition";
import Unauthorized from "../../Views/Comman/UnauthorizedPage";
import CustomerAccountProfile from "../../Views/Customer/CustomerAccountProfile/CustomerAccountProfile";
import CustomerBillingDetails from "../../Views/Customer/CustomerBillingDetails/CustomerBillingDetails";
import CustomerChangePassword from "../../Views/Customer/CustomerChangePassword/CustomerChangePassword";
import CustomerDashboard from "../../Views/Customer/CustomerDashboard/CustomerDashboard";
import CustomerFavouriteProviders from "../../Views/Customer/CustomerFavouriteProviders/CustomerFavouriteProviders";
import CustomerNotifications from "../../Views/Customer/CustomerNotifications/CustomerNotifications";
import CustomerReferralBonus from "../../Views/Customer/CustomerReferralBonus/CustomerReferralBonus";
import CustomerSupport from "../../Views/Customer/CustomerSupport/CustomerSupport";
import Login from "../../Views/Customer/Login/Login";
import Otp from "../../Views/Customer/Login/Otp";
import SingleTaskDetails from "../../Views/Customer/SingleTaskDetails/SingleTaskDetails";
import TaskerListing from "../../Views/Customer/TaskerListing/TaskerListing";
import Budget from "../../Views/Customer/Tasks/Budget/Budget";
import ImageUpload from "../../Views/Customer/Tasks/ImageUpload/ImageUpload";
import RequestSuccess from "../../Views/Customer/Tasks/RequestSuccess/RequestSuccess";
import TaskDateTime from "../../Views/Customer/Tasks/TaskDateTime/TaskDateTime";
import TaskDescription from "../../Views/Customer/Tasks/TaskDescription/TaskDescription";
import TaskDetails from "../../Views/Customer/Tasks/TaskDetails/TaskDetails";
import TaskLocation from "../../Views/Customer/Tasks/TaskLocation/TaskLocation";
import BusinessLocation from "../../Views/Provider/BusinessLocation/BusinessLocation";
import BusinessMedia from "../../Views/Provider/BusinessMedia/BusinessMedia";
import BusinessReviews from "../../Views/Provider/BusinessReviews/BusinessReviews";
import NewBusinessProfile from "../../Views/Provider/NewBusinessProfile/NewBusinessProfile";
import ReviewsAndRatings from "../../Views/Provider/ReviewsAndRatings/ReviewsAndRatings";
import ProviderBusinessProfile from "../../Views/Provider/ProviderProfile/BusinessProfileDashboard/BusinessProfileDashboard";
import ProviderAccountProfile from "../../Views/Provider/ProviderProfile/ProviderAccountProfile/ProviderAccountProfile";
import ProviderBillingDetails from "../../Views/Provider/ProviderProfile/ProviderBillingDetails/ProviderBillingDetails";
import ProviderChangePassword from "../../Views/Provider/ProviderProfile/ProviderChangePassword/ProviderChangePassword";
import ProviderSupport from "../../Views/Provider/ProviderProfile/ProviderSupport/ProviderSupport";
import ServicesAndDocuments from "../../Views/Provider/ServicesAndDocuments/ServicesAndDocuments";
import ProviderSignup from "../../Views/Provider/Signup/ProviderSignup";
import TransactionHistory from "../../Views/Provider/TransactionHistory/TransactionHistory";
import TestPage from "../../Views/TestPage";
import Auth from "../Auth/Auth";
import CustomerRequest from "../../Views/Provider/CustomerRequest/CustomerRequest";
import MegaMenu from "../../Views/Comman/MegaMenu/MegaMenu";
import ProviderReferralBonus from "../../Views/Provider/ProviderReferralBonus/ProviderReferralBonus";
import CreateQuote from "../../Views/Provider/CreateQuoteSetup/CreateQuote";
import ServiceProviderSingle from "../../Views/Provider/ServiceProviderSingle/ServiceProviderSingle";
import AuthHelper from "../Auth/AuthHelper";
import BecomeaProvider from "../../Views/Provider/BecomeaProvider/BecomeaProvider";
import Services from "../../Views/Comman/Services/Services";
import EmailVerifiSuccess from "../../Views/Comman/EmailVerifiSuccess/EmailVerifySuccess";
import ProviderProfileView from "../../Views/Customer/ProviderProfileView/ProviderProfileView";
import EditBusinessProfile from "../../Views/Provider/EditBusinessProfile/EditBusinessProfile";

import About from "../../Views/Comman/About/About";
import Work from "../../Views/Comman/Work/Work";
import CreateProject from "../../Views/Comman/CreateProject/CreateProject";
import CookiePolicy from "../../Views/Milestone-4/CookiePolicy/CookiePolicy";
import ContactUs from "../../Views/Comman/ContactUs/ContactUs";
import TaskList from "../../Views/Provider/TaskList/TaskList";
import HomeDecide from "../../Views/Comman/Home/HomeDecide";
import CreateInvoice from "../../Views/Provider/CreateInvoice/CreateInvoice";
import BuyCredits from "../../Views/Provider/BuyCredits/BuyCredits";
import QuoteReview from "../../Views/Provider/CreateQuoteSetup/QuoteReview";
import SendQuote from "../../Views/Provider/CreateQuoteSetup/NewQuoteMsg";
import CreateInvoiceSetup from "../../Views/Provider/CreateInvoiceSetup/CreateInvoiceSetup";
import Booked from "../../Views/Customer/Booked/Booked";
import ProviderNotifications from "../../Views/Provider/ProviderNotifications/ProviderNotifications";
import SingleTaskDetailsNew from "../../Views/Customer/SingleTaskDetails/SingleTaskDetailsNew";
import CustomerRequestDetails from "../../Views/Customer/CustomerRequestDetails/CustomerRequestDetails";
import { Redirect, useHistory } from "react-router-dom";


var isUserLoggedIn = false;
if (Auth.getToken() !== null) {
  isUserLoggedIn = true;
}
const GetRoute = ({ isprivate: isPrivate, page: Page, ...rest }) => {
  console.log("rest.path",rest);
  let userloggedin = false;
  if (Auth.getToken() !== null) {
    userloggedin = true;
  }
  if (isPrivate) {
    // Check auth for loggedin user
    // Check is valid role for route
    //console.log("User Role", AuthHelper.getUserRoleFromAuth());
    if (userloggedin) {
      // if user role setted & user is not logged in then redirect to login
     
      if (AuthHelper.getUserRoleFromAuth() === "") {
        return <Login />;
      } else if (AuthHelper.getUserRoleFromAuth() === rest.role) {
        return <Page {...rest} />;
      } else {
        return <Unauthorized />;
      }
    } else {
      // Go to unauthorized page
      return <Redirect to="login"/>
      return <Login />;
    }
  } else {
    return <Page {...rest} />;
  }
};

let RoutesList = [
  // ==================================
  // ================== Default Routes
  // ==================================

  {
    element: <GetRoute isprivate={false} role="Default" page={HomeDecide} />,
    path: "/",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: <GetRoute isprivate={false} role="Default" page={TestPage} />,
    path: "/testpage",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: <GetRoute isprivate={false} role="Default" page={Logout} />,
    path: "/logout",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: <GetRoute isprivate={false} role="Default" page={About} />,
    path: "/about",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: <GetRoute isprivate={false} role="Default" page={Work} />,
    path: "/how-it-work",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: <GetRoute isprivate={false} role="Default" page={CreateProject} />,
    path: "/create-project",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: <GetRoute isprivate={false} role="Default" page={ContactUs} />,
    path: "/contact-us",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: <GetRoute isprivate={false} role="Default" page={Login} />,
    path: "/login",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: (
      <GetRoute isprivate={false} role="Default" page={ProviderSignup} />
    ),
    path: "/provider/signup",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: <GetRoute isprivate={false} role="Default" page={Otp} />,
    path: "/otp",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: <GetRoute isprivate={false} role="Default" page={Reset} />,
    path: "/reset/:ticket",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: <GetRoute isprivate={false} role="Default" page={TaskDetails} />,
    path: "/tasks/task-details",
    isAdmin: false,
    showHeaderFooder: false,
  },
  {
    element: (
      <GetRoute isprivate={false} role="Default" page={TaskDescription} />
    ),
    path: "/tasks/task-description",
    isAdmin: false,
    showHeaderFooder: false,
  },
  {
    element: <GetRoute isprivate={false} role="Default" page={TaskLocation} />,
    path: "/tasks/task-location",
    isAdmin: false,
    showHeaderFooder: false,
  },
  {
    element: <GetRoute isprivate={false} role="Default" page={Budget} />,
    path: "/tasks/budget",
    isAdmin: false,
    showHeaderFooder: false,
  },
  {
    element: <GetRoute isprivate={false} role="Default" page={TaskDateTime} />,
    path: "/tasks/task-date-time",
    isAdmin: false,
    showHeaderFooder: false,
  },
  {
    element: <GetRoute isprivate={false} role="Default" page={ImageUpload} />,
    path: "/tasks/image-upload",
    isAdmin: false,
    showHeaderFooder: false,
  },

  {
    element: (
      <GetRoute isprivate={false} role="Default" page={TermAndCondition} />
    ),
    path: "/termandcondition",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: <GetRoute isprivate={false} role="Default" page={PrivacyPolicy} />,
    path: "/privacypolicy",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: (
      <GetRoute isprivate={false} role="Default" page={CancellationPolicy} />
    ),
    path: "/cancellationpolicy",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: <GetRoute isprivate={false} role="Default" page={CookiePolicy} />,
    path: "/cookiepolicy",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: <GetRoute isprivate={false} role="Default" page={Faq} />,
    path: "/faq",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: <GetRoute isprivate={false} role="Default" page={MegaMenu} />,
    path: "/megamenu",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: (
      <GetRoute isprivate={false} role="Default" page={RequestSuccess} />
    ),
    path: "/request-success",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: <GetRoute isprivate={false} role="Default" page={TaskerListing} />,
    path: "/tasker-listing",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: <GetRoute isprivate={false} role="Default" page={TaskList} />,
    path: "/task-lists/:catID",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: <GetRoute isprivate={false} role="Default" page={TaskerListing} />,
    path: "/providers/sc/:refid",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: <GetRoute isprivate={false} role="Default" page={TaskerListing} />,
    path: "/providers/cc/:refid",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: (
      <GetRoute isprivate={false} role="Default" page={EmailVerifiSuccess} />
    ),
    path: "/registration/verify/email/:token",
    isAdmin: true,
    showHeaderFooder: true
  },

  // ==================================
  // ================== Admin Routes
  // ==================================

  {
    element: <GetRoute isprivate={true} role="Admin" page={DashBoard} />,
    path: "/admin",
    isAdmin: true,
    showHeaderFooder: false,
  },
  {
    element: <GetRoute isprivate={true} role="Admin" page={DashBoard} />,
    path: "/admin/*",
    isAdmin: true,
    showHeaderFooder: false,
  },

  // ==================================
  // ================== Customer Routes
  // ==================================
  {
    element: (
      <GetRoute isprivate={true} role="Customer" page={CustomerDashboard} />
    ),
    path: "/customer/dashboard",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: (
      <GetRoute isprivate={true} role="Customer" page={CustomerRequestDetails} />
    ),
    path: "/customer/customer-details",
    isAdmin: false,
    showHeaderFooder: true,
  },
  
  {
    element: (
     <GetRoute isprivate={true} role="Customer" page={SingleTaskDetailsNew} />

    ),
    path: "/customer/task/:taskid",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: (
      <GetRoute isprivate={true} role="Provider" page={SingleTaskDetails} />
    ),
    path: "/provider/task/:taskid",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: (
      <GetRoute
        isprivate={true}
        role="Customer"
        page={CustomerAccountProfile}
      />
    ),
    path: "/customer/update-account-profile",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: (
      <GetRoute
        isprivate={true}
        role="Customer"
        page={CustomerAccountProfile}
      />
    ),
    path: "/customer/update-account-profile",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: (
      <GetRoute
        isprivate={false}
        role="Customer"
        page={CustomerBillingDetails}
      />
    ),
    path: "/customer/update-billing-details",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: (
      <GetRoute
        isprivate={true}
        role="Customer"
        page={CustomerChangePassword}
      />
    ),
    path: "/customer/change-password",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: (
      <GetRoute
        isprivate={true}
        role="Customer"
        page={CustomerFavouriteProviders}
      />
    ),
    path: "/customer/favourite-providers",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: (
      <GetRoute isprivate={true} role="Customer" page={CustomerNotifications} />
    ),
    path: "/customer/notifications",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: (
      <GetRoute isprivate={true} role="Customer" page={CustomerReferralBonus} />
    ),
    path: "/customer/referral-bonus",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: (
      <GetRoute isprivate={true} role="Customer" page={CustomerSupport} />
    ),
    path: "/customer/support",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: <GetRoute isprivate={true} role="Customer" page={Booked} />,
    path: "/customer/booked/task/:refid",
    isAdmin: false,
    showHeaderFooder: true,
  },

  {
    element: (
      <GetRoute isprivate={true} role="Customer" page={ProviderProfileView} />
    ),
    path: "/provider/profile/:refid",

    isAdmin: false,
    showHeaderFooder: true,
  },

  // ==================================
  // ================== Provider Routes
  // ==================================
  {
    element: (
      <GetRoute isprivate={true} role="Provider" page={CustomerRequest} />
    ),
    path: "/provider/dashboard",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: <GetRoute isprivate={false} page={CreateQuote} />,
    path: "/provider/create-quote",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: <GetRoute isprivate={false} page={CreateInvoiceSetup} />,
    path: "/provider/create-invoice",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: <GetRoute isprivate={false} page={QuoteReview} />,
    path: "/provider/create-quote-invoice",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: <GetRoute isprivate={false} page={SendQuote} />,
    path: "/provider/send-quote",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: <GetRoute isprivate={false} page={CreateInvoice} />,
    path: "/provider/create-invoice",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: <GetRoute isprivate={false} page={BecomeaProvider} />,
    path: "/provider/become-provider",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: (
      <GetRoute isprivate={true} role="Provider" page={TransactionHistory} />
    ),
    path: "/provider/transaction-history",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: (
      <GetRoute isprivate={true} role="Provider" page={ReviewsAndRatings} />
    ),
    path: "/provider/reviews-ratings",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: (
      <GetRoute isprivate={true} role="Provider" page={CustomerRequest} />
    ),
    path: "/provider/customer-request",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: (
      <GetRoute
        isprivate={true}
        role="Provider"
        page={ProviderBusinessProfile}
      />
    ),
    path: "/provider/business-profile",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: (
      <GetRoute isprivate={true} role="Provider" page={EditBusinessProfile} />
    ),
    path: "/business/edit-profile/:refid",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: (
      <GetRoute
        isprivate={true}
        role="Provider"
        page={ProviderAccountProfile}
      />
    ),
    path: "/provider/account-profile",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: (
      <GetRoute
        isprivate={true}
        role="Provider"
        page={ProviderBillingDetails}
      />
    ),
    path: "/provider/billing-details",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: (
      <GetRoute
        isprivate={true}
        role="Provider"
        page={ProviderChangePassword}
      />
    ),
    path: "/provider/change-password",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: (
      <GetRoute isprivate={true} role="Provider" page={ProviderReferralBonus} />
    ),
    path: "/provider/referal-bonus",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: (
      <GetRoute isprivate={true} role="Provider" page={ReviewsAndRatings} />
    ),
    path: "/provider/reviews-ratings",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: (
      <GetRoute isprivate={true} role="Provider" page={ProviderSupport} />
    ),
    path: "/provider/support",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: (
      <GetRoute isprivate={true} role="Provider" page={NewBusinessProfile} />
    ),
    path: "/business/business-info/:refid",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: (
      <GetRoute isprivate={true} role="Provider" page={NewBusinessProfile} />
    ),
    path: "/business/business-info",
    isAdmin: false,
    showHeaderFooder: true,
  },

  {
    element: (
      <GetRoute isprivate={true} role="Provider" page={ServicesAndDocuments} />
    ),
    path: "/business/services-and-documents",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: (
      <GetRoute isprivate={true} role="Provider" page={NewBusinessProfile} />
    ),
    path: "/business/new-business-profile",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: <GetRoute isprivate={false} role="Provider" page={BusinessMedia} />,
    path: "/business/business-media",
    isAdmin: false,
    showHeaderFooder: true,
  },

  {
    element: (
      <GetRoute isprivate={false} role="Provider" page={BusinessLocation} />
    ),
    path: "/business/business-location",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: (
      <GetRoute isprivate={true} role="Provider" page={BusinessReviews} />
    ),
    path: "/business/business-reviews",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: <GetRoute isprivate={false} page={ServiceProviderSingle} />,
    path: "/provider/singleview",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: <GetRoute isprivate={true} role="Provider" page={BuyCredits} />,
    path: "/business/buy-credit",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: (
      <GetRoute isprivate={true} role="Provider" page={ProviderNotifications} />
    ),
    path: "/provider/notifications",
    isAdmin: false,
    showHeaderFooder: true,
  },

  {
    element: <GetRoute isprivate={false} page={Services} />,
    path: "/services",
    isAdmin: false,
  },
  {
    element: (
      <GetRoute isprivate={true} role="Provider" page={ServiceProviderSingle} />
    ),
    path: "/provider/:refid",
    isAdmin: false,
    showHeaderFooder: true,
  },
  {
    element: <GetRoute isprivate={false} role="Default" page={Unauthorized} />,
    path: "*",
    isAdmin: false,
    showHeaderFooder: true,
  },
  
];

export default RoutesList;
