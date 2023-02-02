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
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// @mui material components
import Card from "@mui/material/Card";
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

function Otp() {
  // const [value, setValue] = useState([]);
  const [inputData, setInpuData] = useState([]);
  // const isEmailValid = /@gmail.com/.test(email);
  const history = useNavigate();

  const handleClick = () => {
    Axios.post("http://localhost:8004/verification", {
      OTP: inputData,
    }).then((res) => {
      console.log(res);
      // if (!inputData) {
      //   toast.error("Enter OTP");
      //   console.log(inputData);
      // } else {
      if (res.data.success === false) {
        history("/authentication/Otp");
        toast.error("OTP doesn't match");
      } else {
        toast("Verified");
        history("/authentication/sign-in");
      }
      // }
    });
  };

  return (
    <CoverLayout image={bgImage}>
      <Card style={{ height: "270px" }}>
        <ToastContainer />
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
            Enter valid OTP!
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox>
              <MDInput
                onChange={(e) => setInpuData(e.target.value)}
                value={inputData}
                type="text"
                label="Enter OTP"
                variant="standard"
                fullWidth
              />
              {/* {inputData && inputData.length <= 3 ? (
                <small style={{ color: "red", fontSize: "12px" }}>This field is mandatory</small>
              ) : (
                ""
              )} */}
            </MDBox>

            <MDBox mt={2} mb={1}>
              <Button
                type="button"
                onClick={handleClick}
                // component={Link}
                // to="/dashboard"
                variant="contained"
                color="primary"
                style={{
                  color: "whitesmoke",
                  justifyContent: "center",
                  margin: "auto",
                  display: "flex",
                }}
                // fullWidth
              >
                Verify
                {/* <Routes>
        {getRoutes(routes)}
        <Route path="*" onClick={handleClick} element={<Navigate to="/dashboard" />} />
      </Routes> */}
              </Button>
            </MDBox>
            {/* <MDBox mt={2} mb={1} textAlign="center"></MDBox> */}
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Otp;
