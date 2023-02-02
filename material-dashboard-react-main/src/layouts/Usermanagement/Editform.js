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
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// @mui material components
import Card from "@mui/material/Card";
import axios from "axios";
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
// import { useState } from "react";
// import { useEffect } from "react";
const initialState = {
  Name: "",
  Email: "",
  Password: "",
};

function Editform() {
  //   const [inputData, setInpuData] = useState();
  //   const [email, setEmail] = useState();
  //   const [password, setPassword] = useState();
  //   const [value, setValue] = useState([]);
  const history = useNavigate();
  const [state, setState] = useState(initialState);

  const { Name, Email, Password } = state;
  const isEmailValid = /@gmail.com/.test(Email);

  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8004/getting/${id}`).then((res) => {
      if (res.data.success === false) {
        setState(res.data.message);
      } else {
        setState({ ...res.data.result[0] });
      }
    });
    console.log(setState);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handleClick = () => {
    // e.preventDefault();
    if (!state || !isEmailValid) {
      //   alert("Fill the data first");
      toast.error("Fill the data first", { position: "top-center" });
      history("/Usermanagement/Editform/:id");
    } else {
      // if (!id) {
      //   axios
      //     .post("http://localhost:8004/Adding", {
      //       Name,
      //       Email,
      //       Password,
      //     })
      //     .then(() => {
      //       setState({ Name: "", Email: "", Password: "" });
      //       // console.log(response);
      //     })
      //     .catch((err) => toast.error(err.response.data));
      //   // toast.success("Updated successfully");
      // } else {
      axios
        .put(`http://localhost:8004/putting/${id}`, {
          Name,
          Email,
          Password,
        })
        .then(() => {
          setState({ Name: "", Email: "", Password: "" });
          // console.log(response);
          toast.success("Updated successfully", { position: "top-center" });
        })
        .catch((err) => toast.error(err.response.data));
      // }

      history("/Usermanagement");
    }
  };

  return (
    <CoverLayout image={bgImage}>
      <Card style={{ height: "370px", marginTop: "0px" }}>
        <ToastContainer />
        <MDBox
          variant="gradient"
          bgColor="secondary"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Update register..!
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox>
              <MDInput
                // onChange={(e) => setInpuData(e.target.value)}
                onChange={handleChange}
                value={Name || ""}
                type="text"
                name="Name"
                label="Name"
                variant="standard"
                fullWidth
              />
              {Name && Name.length <= 3 ? (
                <small style={{ color: "red", fontSize: "12px" }}>This field is mandatory</small>
              ) : (
                ""
              )}
            </MDBox>
            <MDBox>
              <MDInput
                // onChange={(e) => setEmail(e.target.value)}
                onChange={handleChange}
                value={Email || ""}
                type="email"
                name="Email"
                label="Email"
                variant="standard"
                fullWidth
              />
              {Email && Email.length <= 3 ? (
                <small style={{ color: "red", fontSize: "12px" }}>This field is mandatory</small>
              ) : (
                ""
              )}
            </MDBox>
            <MDBox mb={1}>
              <MDInput
                // onChange={(e) => setPassword(e.target.value)}
                onChange={handleChange}
                value={Password || ""}
                type="password"
                name="Password"
                label="Password"
                variant="standard"
                fullWidth
              />
              {Password && Password.length <= 4 ? (
                <small style={{ color: "red", fontSize: "12px" }}>This field is mandatory</small>
              ) : (
                ""
              )}
            </MDBox>
            <MDBox mt={4} mb={1}>
              {/* <Link to="/Usermanagement"> */}
              <Button
                type="button"
                onClick={handleClick}
                // component={Link}
                // to="/dashboard"
                variant="contained"
                color="primary"
                style={{ color: "whitesmoke" }}
                fullWidth
                // value={}
              >
                Update
              </Button>
              {/* </Link> */}
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Editform;
