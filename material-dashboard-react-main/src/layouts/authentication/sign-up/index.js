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

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Axios from "axios";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
// import MDButton from "components/MDButton";
import { Button } from "@mui/material";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import { useState } from "react";

function Cover() {
  const [inputData, setInpuData] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [value, setValue] = useState([]);
  const isEmailValid = /@gmail.com/.test(email);
  const history = useNavigate();

  const handleClick = (e) => {
    if (!inputData || !email || !password || !isEmailValid) {
      alert("Fill the data first");
      history("/authentication/sign-up");
    } else {
      // window.location.reload();
      Axios.post("http://localhost:8004/register", {
        Name: inputData,
        Email: email,
        Password: password,
      }).then((response) => {
        console.log(response);
        // history("/authentication/sign-in");
      });

      Axios.post("http://localhost:8004/sender", {
        // OTP: inputData,
      }).then((res, err) => {
        console.log(res);
        if (err) {
          history("/authentication/Otp");
          console.log(err);
          alert("Wrong OTP Enter correct OTP");
          // toast("Wrong Email or Password");
        } else {
          history("/authentication/sign-in");
        }
      });

      const values = JSON.parse(localStorage.getItem("values") || "[]");

      const kasim = {
        Name: inputData,
        Email: email,
        Password: password,
        // id: Math.random(),
      };
      values.push(kasim);
      localStorage.setItem("values", JSON.stringify(values));
      console.log(e.target.value[0]);
      setValue("");
      alert("submited");
      history("/authentication/Otp");
    }
    console.log(value);
  };
  // useEffect(() => {
  //   const values = localStorage.getItem("values");
  //   setValues(JSON.parse(values));
  // }, []);

  return (
    <CoverLayout image={bgImage}>
      <Card style={{ height: "470px", marginTop: "-55px" }}>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox>
              <MDInput
                onChange={(e) => setInpuData(e.target.value)}
                value={inputData}
                type="text"
                label="Name"
                variant="standard"
                fullWidth
              />
              {inputData && inputData.length <= 3 ? (
                <small style={{ color: "red", fontSize: "12px" }}>This field is mandatory</small>
              ) : (
                ""
              )}
            </MDBox>
            <MDBox>
              <MDInput
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                label="Email"
                variant="standard"
                fullWidth
              />
              {email && email.length <= 3 ? (
                <small style={{ color: "red", fontSize: "12px" }}>This field is mandatory</small>
              ) : (
                ""
              )}
            </MDBox>
            <MDBox mb={1}>
              <MDInput
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                label="Password"
                variant="standard"
                fullWidth
              />
              {password && password.length <= 4 ? (
                <small style={{ color: "red", fontSize: "12px" }}>This field is mandatory</small>
              ) : (
                ""
              )}
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </MDTypography>
            </MDBox>
            <MDBox mt={2} mb={1}>
              <Button
                type="submit"
                onClick={handleClick}
                // component={Link}
                // to="/dashboard"
                variant="contained"
                color="primary"
                style={{ color: "whitesmoke" }}
                fullWidth
              >
                sign up
                {/* <Routes>
        {getRoutes(routes)}
        <Route path="*" onClick={handleClick} element={<Navigate to="/dashboard" />} />
      </Routes> */}
              </Button>
            </MDBox>
            <MDBox mt={2} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
// export {handleClick};
