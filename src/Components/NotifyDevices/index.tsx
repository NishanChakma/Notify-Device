import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../State";
import { RootrootReducer } from "../../State/Reducers/RootReducer";
import { useHistory } from "react-router-dom";
import { State } from "../../State/Reducers/MyReducers";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMediaQuery } from "react-responsive";

const NotifyDevices: React.FC<{}> = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { notifyDevices, getDevices } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const store: State = useSelector((state: RootrootReducer) => state.home);

  //form validation
  const formik = useFormik({
    initialValues: {
      name: "",
      repoUrl: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      repoUrl: Yup.string().required(),
      message: Yup.string().required(),
    }),
    onSubmit: (formData, { resetForm }) => {
      let data = {
        name: formData.name,
        email: store.email,
        repoUrl: formData.repoUrl,
        message: formData.message,
        token: store.token,
      };
      notifyDevices(data);
      getDevices();
      resetForm();
      //if success go to home after submission
      setTimeout(function () {
        if (store.success) {
          history.push("/home");
        }
      }, 3000);
    },
  });

  useEffect(() => {
    //if user not login block home page
    if (!store.loginStaus) {
      history.push("/"); //router is another option for this.
    }
  }, [history, store]);

  const cancelButton = useCallback(() => {
    history.push("/home");
    getDevices();
    formik.resetForm();
  }, [history, getDevices, formik]);

  const isMobile = useMediaQuery({ query: "(max-width: 1224px)" }); //for mobile screen

  return (
    <>
      <div className="login-container" style={{ backgroundColor: "#FF7043" }}>
        <form
          className={isMobile ? "login-form-mobile" : "login-form"}
          onSubmit={formik.handleSubmit}
        >
          <div className="login-form-input">
            <input
              type="name"
              placeholder="Enter your name"
              name="name"
              autoComplete="name"
              className="login-input"
              onChange={formik.handleChange}
              value={formik.values.name}
              required
              style={{
                backgroundColor: "#eceff1",
                border: "1px solid #E1E2E3",
                padding: "5px",
              }}
            />
          </div>
          <div className="login-form-input">
            <input
              type="name"
              placeholder="Enter repoUrl"
              name="repoUrl"
              autoComplete="repoUrl"
              className="login-input"
              onChange={formik.handleChange}
              value={formik.values.repoUrl}
              required
              style={{
                backgroundColor: "#eceff1",
                border: "1px solid #E1E2E3",
                padding: "5px",
              }}
            />
          </div>
          <div className="login-form-input">
            <textarea
              placeholder="Write your message"
              name="message"
              autoComplete="message"
              className="login-input-textarea"
              onChange={formik.handleChange}
              value={formik.values.message}
              required
            />
          </div>
          {store.error && <h6 className="login-error">{store.error}</h6>}
          {store.successMessage && (
            <h6 className="login-error">{store.successMessage}</h6>
          )}
          <div
            style={{ display: "flex", flexDirection: "row", marginLeft: "5px" }}
          >
            <div className="login-button">
              <button type="submit" className="login-form-button">
                submit
              </button>
            </div>
            <div className="login-button" style={{ marginLeft: "5px" }}>
              <button
                onClick={cancelButton}
                className="login-form-button"
                type="button" //type must be button, otherwise form will not reset
              >
                cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default NotifyDevices;
