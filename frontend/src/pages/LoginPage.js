import React, { useEffect } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
  Checkbox,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Error from "../components/Error";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";

const LoginPage = () => {
  const paperStyle = {
    padding: 20,
    height: "80vh",
    width: 280,
    margin: "40px auto",
  };
  const btnstyle = { margin: "8px 0", backgroundColor: "#7e8083" };
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Please enter valid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate("/articles-list");
    }
  }, [navigate, userInfo]);

  const onSubmit = (values) => {
    dispatch(login(values));
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar className="bg-gray-700">
            <LockIcon />
          </Avatar>
          <h2>Login</h2>
        </Grid>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(props) => (
            <Form>
              {/* {console.log(props)} */}
              <Field
                as={TextField}
                id="standard-basic"
                variant="standard"
                label="Email"
                name="email"
                placeholder="Enter email"
                type="email"
                fullWidth
                required
                helperText={<ErrorMessage name="email" />}
              />
              <Field
                as={TextField}
                id="standard-basic"
                variant="standard"
                label="Password"
                name="password"
                placeholder="Enter password"
                type="password"
                fullWidth
                required
                helperText={<ErrorMessage name="password" />}
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                disabled={props.isSubmitting}
                style={btnstyle}
                fullWidth
              >
                {props.isSubmitting ? "Loading" : "Login"}
              </Button>
              {/* {console.log(props)} */}
            </Form>
          )}
        </Formik>
        <Typography>
          {" "}
          New User ? <Link href="/register">Register</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default LoginPage;
