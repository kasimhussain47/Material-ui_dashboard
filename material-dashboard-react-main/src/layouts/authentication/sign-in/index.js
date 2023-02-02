/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";
import Axios from "axios";
// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
// import { TextField } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// toast.configure();

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  // const [inputData, setInpuData] = useState();
  const [email, setEmail] = useState();
  const [password1, setPassword] = useState();
  const [value, setValue] = useState([]);
  const isEmailValid = /@gmail.com/.test(email);
  const history = useNavigate();

  const handleClick = async (e) => {
    if (!email || !password1 || !isEmailValid) {
      // alert("Enter correct inputs");
      toast("Enter inputs first");
      // history("/");
    } else {
      Axios.post("http://localhost:8004/login", {
        Email: email,
        Password: password1,
      }).then((res) => {
        // console.log(res);
        if (res.data.success === false) {
          history("/authentication/sign-in");
          // alert("Wrong Email or Password");
          toast("Wrong Email or Password");
        } else {
          history("/dashboard");
          toast("Successfull", { position: "top-center" });
        }
      });
      // window.location.reload();
      const values = JSON.parse(localStorage.getItem("values") || "[]");

      const kasim = {
        Email: email,
        Password: password1,
      };
      values.push(kasim);
      localStorage.setItem("values", JSON.stringify(values));
      console.log(e.target.value[0]);
      setValue("");
      // alert("submited");
    }
    console.log(email, password1);
    console.log(value);

    // const { email, password } = user;
    // const item = { email, password };
    // let res = await fetch("http://localhost:8000/authentication/sign-in", {
    //   method: "POST",
    //   headers: {
    //     "content-Type": "application/json",
    //   },
    //   body: JSON.stringify(item),
    // });
    // res = await res.json();
    // localStorage.setItem("values", JSON.stringify(res));
    // history
  };

  return (
    // <>
    <BasicLayout image={bgImage}>
      <Card style={{ height: "480px", marginTop: "50px" }}>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
          // marginTop="40px"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <ToastContainer />
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                label="Email"
                fullWidth
              />
              {email && email.length <= 7 ? (
                <small style={{ color: "red", fontSize: "12px" }}>
                  Enter correct Email Address
                </small>
              ) : (
                ""
              )}
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                onChange={(e) => setPassword(e.target.value)}
                value={password1}
                type="password"
                label="Password"
                fullWidth
              />
              {password1 && password1.length <= 5 ? (
                <small style={{ color: "red", fontSize: "12px" }}>Enter valid Password</small>
              ) : (
                ""
              )}
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                onClick={handleSetRememberMe}
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                type="button"
                variant="gradient"
                // component={Link}
                // to="/dashboard"
                color="info"
                fullWidth
                onClick={handleClick}
                // disabled={!email || !password}
              >
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  // onClick={Logout}
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
    // </>
  );
}

export default Basic;
