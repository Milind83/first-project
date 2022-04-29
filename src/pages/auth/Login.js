import React, { useEffect, useState } from "react";
import {
  Block,
  BlockContent,
  BlockDes,
  BlockHead,
  BlockTitle,
  Button,
  Icon,
  PreviewCard,
} from "../../components/Component";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";
import { Form, FormGroup, Spinner, Alert } from "reactstrap";
import PageContainer from "../../layout/page-container/PageContainer";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import ReactLoginMS from "react-ms-login";
import MicrosoftLogin from "react-microsoft-login";
import { validateDomainName } from "../../utils/Utils";
import { connect } from "react-redux";
import { loginUsers } from "../../redux/user/action";

const Login = ({ loginUsers, LogedInUserData, loading, error }) => {
  const [passState, setPassState] = useState(false);
  // const [errorVal, setError] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  //const [msalInstance, onMsalInstanceChange] = useState();

  const onFormSubmit = (formData) => {
    //setLoading(true);
    loginUsers(formData.name, formData.passcode);

    // const loginName = "info@softnio.com";
    // const pass = "123456";
    // if (formData.name === loginName && formData.passcode === pass) {
    //   localStorage.setItem("accessToken", "token");
    //   setTimeout(() => {
    //     window.history.pushState(
    //       `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/"}`,
    //       "auth-login",
    //       `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/"}`
    //     );
    //     window.location.reload();
    //   }, 2000);
    // } else {
    //   setTimeout(() => {
    //     setError("Cannot login with credentials");
    //     setLoading(false);
    //   }, 2000);
    // }
  };

  const authHandler = (err, data, msal) => {
    console.log(data);
    if (!err && data) {
      dispatch(uiAction.onMsalInstanceChange({ msalInstance: msal }));
      console.log(data.account.userName);
      const email = data?.account?.userName;
      let isValid = validateDomainName(email);
      if (isValid) {
        localStorage.setItem("accessToken", "token");
        setTimeout(() => {
          window.history.pushState(
            `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/"}`,
            "auth-login",
            `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/"}`
          );
          window.location.reload();
        }, 2000);
      }
    } else {
      setTimeout(() => {
        setError("Cannot login with credentials");
        setLoading(false);
      }, 2000);
    }
  };

  // const logoutHandler = () => {
  //   msalInstance.logout();
  // };

  const { errors, register, handleSubmit } = useForm();

  return (
    <React.Fragment>
      <Head title="Login" />
      <PageContainer>
        <Block className="nk-block-middle nk-auth-body  wide-xs">
          {loading && <p>Loading.....</p>}
          <div className="brand-logo pb-4 text-center">
            <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
              <img
                className="logo-light logo-img logo-img-lg"
                src="https://dev1.bridge.azaonline.in/images/settings/aza-logo-0342609001437557743.png"
                alt="logo"
              />
              <img
                className="logo-dark logo-img logo-img-lg"
                src="https://dev1.bridge.azaonline.in/images/settings/aza-logo-0342609001437557743.png"
                alt="logo-dark"
              />
            </Link>
          </div>

          <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
            <BlockHead>
              <BlockContent>
                <BlockTitle tag="h4">Sign-In</BlockTitle>
                <BlockDes>
                  <p>Access Aza using your email and passcode.</p>
                </BlockDes>
              </BlockContent>
            </BlockHead>
            {error && (
              <div className="mb-3">
                <Alert color="danger" className="alert-icon">
                  {" "}
                  <Icon name="alert-circle" /> {error}{" "}
                </Alert>
              </div>
            )}
            <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="default-01">
                    Email or Username
                  </label>
                </div>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    id="default-01"
                    name="name"
                    ref={register({ required: "This field is required" })}
                    defaultValue="info@softnio.com"
                    placeholder="Enter your email address or username"
                    className="form-control-lg form-control"
                  />
                  {errors.name && <span className="invalid">{errors.name.message}</span>}
                </div>
              </FormGroup>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="password">
                    Passcode
                  </label>
                  <Link className="link link-primary link-sm" to={`${process.env.PUBLIC_URL}/auth-reset`}>
                    Forgot Code?
                  </Link>
                </div>
                <div className="form-control-wrap">
                  <a
                    href="#password"
                    onClick={(ev) => {
                      ev.preventDefault();
                      setPassState(!passState);
                    }}
                    className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}
                  >
                    <Icon name="eye" className="passcode-icon icon-show"></Icon>

                    <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                  </a>
                  <input
                    type={passState ? "text" : "password"}
                    id="password"
                    name="passcode"
                    defaultValue="123456"
                    ref={register({ required: "This field is required" })}
                    placeholder="Enter your passcode"
                    className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                  />
                  {errors.passcode && <span className="invalid">{errors.passcode.message}</span>}
                </div>
              </FormGroup>
              <FormGroup>
                <Button size="lg" className="btn-block" type="submit" color="primary">
                  {loading ? <Spinner size="sm" color="light" /> : "Sign in"}
                </Button>
              </FormGroup>
            </Form>

            <div className="text-center pt-4 pb-3">
              <h6 className="overline-title overline-title-sap">
                <span>OR</span>
              </h6>
            </div>
            <ul className="nav justify-center gx-4">
              <MicrosoftLogin clientId="8064069b-8b58-434b-9f3a-b54f7812181b" authCallback={authHandler} />
            </ul>
          </PreviewCard>
        </Block>
        <AuthFooter />
      </PageContainer>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    LogedInUserData: state.user.data,
    loading: state.user.loading,
    error: state.user.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUsers: (email, password) => dispatch(loginUsers(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
