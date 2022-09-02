import React, { useEffect, useState } from "react";
import { HttpService } from "../../services/HTTPService";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import Form from "../../components/Form";
import CustomeTable from "../../components/Table";
import { Card,AppBar,Toolbar,IconButton,Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';


const apiUrl = "https://cicd-mid-dev.mimikdev.com/mID/v1/users/me";
const updateUrl = "https://cicd-mpo-dev.mimikdev.com/mPO/v1/users/me";
const fetchUrl = "https://cicd-mpo-dev.mimikdev.com/mPO/v1/users/me";

const Home = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [userInputs, setUserInputs] = useState({});
  const [editEnable, setEditEnable] = useState(false);

  const fetchUserDetailsMID = async (api) => {
    const res = await HttpService.get(api);
    console.log("first api response (fetch api) : ", res?.data);
    setUserDetails(res?.data);
  };
  const fetchUserDetailsMPO= async (api) => {
    const res = await HttpService.get(api);
    console.log("last api response (refetch api) : ", res?.data?.name);
    const name = res?.data?.name || {}
    setUserDetails((prevState)=>({...prevState,...name}));
    setUserInputs({...name})
  };
  const pushUserDetails = async () => {
    const res = await HttpService.put(updateUrl, {"name": {...userInputs}});
    console.log("second api response  (update api) : ", res?.data);
    setEditEnable(false);
    fetchUserDetailsMPO(fetchUrl);
  };
  useEffect(() => {
    fetchUserDetailsMID(apiUrl);
  }, []);
  const fieldHandler = (event) => {
    const value = event.target.value;
    const field = event.target.name;

    setUserInputs((prevState) => {
      const state = { ...prevState };
      state[field] = value;
      return { ...state };
    });
  };
  return (
    <>
    {/* <CircularProgress /> */}
        <AppBar position="static">
            <Toolbar variant="dense">
                <Typography variant="h6" color="inherit" component="div">
                Mimik
                </Typography>
            </Toolbar>
        </AppBar>
        <Grid container >
            <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                    <Card spacing={5}>
                        <h1>User Details</h1>
                        <CustomeTable data={userDetails} />
                    </Card>
                    <Stack spacing={2} direction="row">
                        <Button variant="contained" onClick={() => setEditEnable(!editEnable)}>
                            Edit
                        </Button>
                    </Stack>
                </Grid>
            <Grid item xs={1}></Grid>
        </Grid>
      
      

      {editEnable && (
        <>
        <Grid container >
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <h1>Edit Form</h1>
          <Card>
          <Form
            fields={["formatted", "familyName", "givenName", "middleName", "honorificPrefix", "honorificSuffix"]}
            userDetails={userInputs}
            onChange={fieldHandler}
          />
          <Stack spacing={2} direction="row" flexDirection="End">
            <Button variant="contained" onClick={pushUserDetails}>
              Save
            </Button>
          </Stack>
          </Card>
          
          
          </Grid>
          <Grid item xs={1}></Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default Home;
