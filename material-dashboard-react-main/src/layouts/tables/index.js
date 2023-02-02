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

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// import { useNavigate } from "react-router-dom";
import { React, useState, useEffect } from "react";
import axios from "axios";
// import DataTable from "examples/Tables/DataTable";
import { Table } from "react-bootstrap";
// import { Link } from "@mui/icons-material";
// Data
// import authorsTableData from "layouts/tables/data/authorsTableData";
// import projectsTableData from "layouts/tables/data/projectsTableData";

function Tables() {
  // const { columns, rows } = authorsTableData();
  // const { columns: pColumns, rows: pRows } = projectsTableData();
  const [data, setData] = useState();

  // const history = useNavigate();

  const loadData = async () => {
    const res = await axios.get("http://localhost:8004/get");
    // console.log("hewllllll", res.data.result);
    setData(res.data.result);
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="warning"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Authors Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <Table striped bordered hover style={{ textAlign: "center" }}>
                  <thead>
                    <tr>
                      {/* <th>No.</th> */}
                      <th>Author</th>
                      <th>Function</th>
                      <th>Employed</th>
                      {/* <th>Action</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data.map((item) => (
                        <tr>
                          {/* <th scope="row">{index + 1}</th> */}
                          <td>{item.Author}</td>
                          <td>{item.Function}</td>
                          <td>{item.Employed}</td>
                          {/* <td>
                            <Link to={`/usermanagement/Editform/${item.id}`}>
                              <Button type="button" style={{ backgroundColor: "black" }}>
                                Edit
                              </Button>
                            </Link>
                            &nbsp;
                            <Button
                              // onClick={() => handleDelete(item.id)}
                              style={{ backgroundColor: "black" }}
                            >
                              Delete
                            </Button>
                          </td> */}
                        </tr>
                      ))}

                    {/* <tr>
                      <td>2</td>
                      <td>Jacob</td>
                      <td>Thornton@gmail.com</td>
                      <td>1254436</td>
                      <td>
                        <Button style={{ backgroundColor: "black" }}>Edit</Button>
                        &nbsp;
                        <Button style={{ backgroundColor: "black" }}>Delete</Button>
                      </td>
                    </tr> */}
                  </tbody>
                </Table>
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Projects Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {/* <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                /> */}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
