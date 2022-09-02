import React, { useEffect, useState } from "react";
import { HttpService } from "../../services/HTTPService";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import Form from "../../components/Form";
import CustomeTable from "../../components/Table";
import { Card,AppBar,Toolbar,IconButton,Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/system';


const apiUrl = "https://cicd-mid-dev.mimikdev.com/mID/v1/users/me";
const updateUrl = "https://cicd-mpo-dev.mimikdev.com/mPO/v1/users/me";
const fetchUrl = "https://cicd-mpo-dev.mimikdev.com/mPO/v1/users/me";
const fields =[
    {
        name: "formatted",
        label: "formatted",
        required: false,
        error:"",
    },
    {
        name: "familyName",
        label: "familyName",
        required: true,
        error:"",
    },
    {
        name: "givenName",
        label: "givenName",
        required: true,
        error:"",
    },
    {
        name: "middleName", 
        label:  "middleName", 
        required: false,
        error:"",
    },
    {
        name: "honorificPrefix",
        label: "honorificPrefix",
        required: true,
        error:"",
    },
    {
        name:  "honorificSuffix",
        label: "honorificSuffix",
        required: false,
        error:"",
    }
]

const Wapper = styled('div')({
   display:'flex',
   justifyContent:'center',
   padding:'100px'

    });

const Home = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [userInputs, setUserInputs] = useState({});
  const [editEnable, setEditEnable] = useState(false);
  const [fieldsError, setFieldsError] = useState(false);
  const [fetching, setFetching] = useState(false);


  const fetchUserDetailsMID = async (api) => {
    const res = await HttpService.get(api);
    console.log("first api response (fetch api) : ", res?.data);
    setUserDetails(res?.data);
  };
  const fetchUserDetailsMPO= async (api) => {
    setFetching(true)
    const res = await HttpService.get(api);
    console.log("last api response (refetch api) : ", res?.data?.name);
    const name = res?.data?.name || {}
    setUserDetails((prevState)=>({...prevState,...name}));
    setUserInputs({...name})
    setFetching(false)
  };
  const pushUserDetails = async () => {
    let fErro ={};
    const compFields = fields.filter((field)=>field.required)
    compFields.map((field)=>{
        fErro[field.name]=!(userInputs[field.name])
    })
    const error = Object.values(fErro).filter((item)=>item).length>0;
    if(error){
        setFieldsError(fErro)
    }else{
        setFetching(true)
        const res = await HttpService.put(updateUrl, {"name": {...userInputs}});
        console.log("second api response  (update api) : ", res?.data);
        setEditEnable(false);
        fetchUserDetailsMPO(fetchUrl);
        setFieldsError({})
        setFetching(false)
    }
    
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
                    {userDetails ? <><Card spacing={5}>
                        <h1>User Details</h1>
                        <CustomeTable data={userDetails} style={{wordBreak: "break-all"}}/>
                    </Card>
                    <Stack spacing={2} direction="row">
                        <Button variant="contained" onClick={() => setEditEnable(!editEnable)}>
                            Edit
                        </Button>
                    </Stack>
                    </>
                    :<Wapper> <CircularProgress /></Wapper>
                    }
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
            fields={fields}
            userDetails={userInputs}
            onChange={fieldHandler}
            fieldsError={fieldsError}
          />
          <Stack spacing={2} direction="row" flexDirection="End">
            <Button variant="contained" onClick={pushUserDetails}>
              Save
            </Button>
            {fetching && <CircularProgress />}
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
