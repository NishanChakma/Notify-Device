import React, { useEffect } from "react";
import IPage from "../../InterFaces/Page";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../State";
import email from "../../Assests/images/email.jpg";
import password from "../../Assests/images/password.png";
import { RootrootReducer } from "../../State/Reducers/RootReducer";
import { State } from "../../State/Reducers/MyReducers";

const Login: React.FC<IPage> = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 1224px)" }); //for mobile screen
  const dispatch = useDispatch(); //dispatch action
  const { logIn, getDevices } = bindActionCreators(actionCreators, dispatch); //login and get devices action
  const history = useHistory(); //for routing
  const store: State = useSelector((state: RootrootReducer) => state.home);

  useEffect(() => {
    //if user login go to home page
    if (store.loginStaus) {
      getDevices();
      history.push("/home"); //router is another option for this.
    }
  }, [history, store, getDevices]);

  //form validation
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    }),
    onSubmit: (formData) => {
      logIn(formData.email, formData.password);
    },
  });

  return (
    <div className="login-container">
      <form
        className={isMobile ? "login-form-mobile" : "login-form"}
        onSubmit={formik.handleSubmit}
      >
        <h1 className="login-h1">Login</h1>
        <div className="login-form-input">
          <img src={email} alt="Logo" className="login-img" />
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            autoComplete="email"
            className="login-input"
            onChange={formik.handleChange}
            value={formik.values.email}
            required
          />
        </div>
        <div className="login-form-input">
          <img src={password} alt="Logo" className="login-img" />
          <input
            type="password"
            placeholder="Password"
            name="password"
            autoComplete="Password"
            className="login-input"
            onChange={formik.handleChange}
            value={formik.values.password}
            required
          />
        </div>
        {store.error && <h6 className="login-error">{store.error}</h6>}
        <div className="login-button">
          <button type="submit" className="login-form-button">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
