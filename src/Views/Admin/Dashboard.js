import React from "react";
import { Svg } from "../../Assets/Svgs/Svg";
import Admin from "./AdminRV/Admin";
import SideBarProfileCard from "./AdminRV/ProfileCard/SidebarProfileCard";
import * as Icon from "react-bootstrap-icons";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import HeaderPage from "../Header";
import HomePage from "./HomePage/HomePage";
import CategoriesPage from "./Categories/CategoriesPage";
import SubcategoriesPage from "./Subcategories/SubcategoriesPage";
import CustomersPage from "./Customers/CustomersPage";
import ProvidersPage from "./Providers/ProvidersPage";
import TransactionsPage from "./Transactions/TransactionsPage";
import TasksPage from "./Tasks/TasksPage";
import FormModal from "../../Components/FormModal/FormModal";
import QuestionsPage from "./Questions/QuestionsPage";
import AlertModal02 from "../../Components/AlertModal02/AlertModal02";
import Notification from "react-notify-toast";
import LoadingModal from "../../Components/LoadingModal/LoadingModal";
import AdminContactInfoPage from "./ContactInfo/AdminContactInfoPage";
import AdminChangePasswordPage from "./ChangePassword/AdminChangePasswordPage";

export default function DashBoard() {
  let { path, url } = useRouteMatch();
  let profilecard = new SideBarProfileCard(
    "lorem ipsum",
    "example@gmail.com",
    "https://pixinvent.com/materialize-material-design-admin-template/app-assets/images/user/12.jpg"
  );
  let items = [
    { id: 1, icon: <Icon.House />, title: "Dashboard", to: "/admin" },
    {
      id: 2,
      icon: <Icon.ListStars />,
      title: "Categories",
      to: `${url}/categories`,
    },
    {
      id: 3,
      icon: <Icon.QuestionCircle />,
      title: "Questions",
      to: `${url}/questions`,
    },
    {
      id: 2,
      icon: <Icon.ListNested />,
      title: "SubCategories",
      to: `${url}/subcategories`,
    },
    {
      id: 3,
      icon: <Icon.Person />,
      title: "Customers",
      to: `${url}/customers`,
    },
    {
      id: 4,
      icon: <Icon.ShopWindow />,
      title: "Providers",
      to: `${url}/providers`,
    },
    {
      id: 5,
      icon: <Icon.CurrencyDollar />,
      title: "Transactions",
      to: `${url}/transactions`,
    },
    { id: 5, icon: <Icon.Handbag />, title: "Tasks", to: "/admin/tasks" },
    { id: 9, icon: <Icon.Nut />, title: "Settings", to: "#" },
    {
      id: 10,
      title: "Contact Info",
      to: `${url}/update-contactinfo`,
      isnested: true,
      itemsfor: 9,
    },
    {
      id: 11,
      title: "Change Password",
      to: `${url}/change-password`,
      isnested: true,
      itemsfor: 9,
    },
  ];
  return (
    <>
      <LoadingModal />
      <Notification />
      <AlertModal02 />
      <FormModal />
      <Admin logo={Svg.admin_logo} profileCard={profilecard} Items={items}>
        <Switch>
          <Route exact path={path}>
            <HomePage />
          </Route>
          <Route path={`${path}/categories`}>
            <CategoriesPage />
          </Route>
          <Route exact path={`${path}/subcategories`}>
            <SubcategoriesPage />
          </Route>
          <Route exact path={`${path}/customers`}>
            <CustomersPage />
          </Route>
          <Route exact path={`${path}/providers`}>
            <ProvidersPage />
          </Route>
          <Route exact path={`${path}/transactions`}>
            <TransactionsPage />
          </Route>
          <Route exact path={`${path}/tasks`}>
            <TasksPage />
          </Route>
          <Route exact path={`${path}/questions`}>
            <QuestionsPage />
          </Route>
          <Route exact path={`${path}/update-contactinfo`}>
            <AdminContactInfoPage />
          </Route>
          <Route exact path={`${path}/change-password`}>
            <AdminChangePasswordPage />
          </Route>
          <Route exact path={`${path}/*`}>
            <HeaderPage />
          </Route>
        </Switch>
      </Admin>
    </>
  );
}
