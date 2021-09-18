import IRoute from "../InterFaces/Route";
import LoginPage from "../Components/Login";
import HomePage from "../Components/Home";
import NotifyPage from "../Components/NotifyDevices";

const routes: IRoute[] = [
  {
    path: "/",
    name: "Login",
    component: LoginPage,
    exact: true,
  },
  {
    path: "/home",
    name: "Home Page",
    component: HomePage,
    exact: true,
  },
  {
    path: "/notify",
    name: "Notify Page",
    component: NotifyPage,
    exact: true,
  },
];

export default routes;
