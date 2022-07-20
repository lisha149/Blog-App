import React, { useState } from "react";
import { Tabs, Tab, Paper, Box, Typography } from "@mui/material";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
const Container = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const paperStyle = { width: 340, margin: "20px auto" };
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  return (
    <Paper elevation={20} style={paperStyle}>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab label="LOGIN" />

        <Tab label="REGISTER" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <LoginPage handleChange={handleChange} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <RegisterPage />
      </TabPanel>
    </Paper>
  );
};

export default Container;
