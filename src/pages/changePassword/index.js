import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import * as Yup from "yup";
import { useFormik } from "formik";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { changePasswordApi } from '../../services/auth';
import { setToken } from "../../utils/storage";
import { FAILED, showToast, SUCCESS } from "../../components/UI/toast";

const SOMETHING_WENT_WRONG="Something went wrong";
const PASSWORD_UPDATED="Password updated";

export default function ChangePassword(props) {
  const [data,setData]=useState({})
  const user = useSelector((state) => state.user.info);
  const navigate = useNavigate();
  const LoginSchema = Yup.object().shape({
    password: Yup.string().required("Password is required"),
    newPassword: Yup.string().required("New Password is required"),
    confirmNewPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
  });
  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async () => {
      const { error, success } = await changePasswordApi({
        email: user.email,
        newPassword: formik.values.newPassword,
        password: formik.values.password,
      });
      if (!success) {
        formik.setFieldError("all", error);
        showToast(
          FAILED,
          typeof error === "string" ? error : SOMETHING_WENT_WRONG
        );
      } else {
        setToken("");
        showToast(SUCCESS, PASSWORD_UPDATED);
        navigate("/login");
      }
      return true;
    },
  });
  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;
  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Update Your Password
          </Typography>
        </Stack>
        <form {...props}>
        <Card>
          {/* <CardHeader subheader="Update password" title="Password" /> */}
          <Divider />
          <CardContent>
            <TextField
            // onChange={(e)=>setData({...data,password:e.target.value})}
              required
              fullWidth
              label="Enter Your Current Password"
              margin="normal"
              name="password"
              type="password"
              variant="outlined"
              {...getFieldProps("password")}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
            />
            <TextField
            // onChange={(e)=>setData({...data,newPassword:e.target.value})}
              required
              fullWidth
              label="Enter Your New Password"
              margin="normal"
              name="confirm"
              type="password"
              variant="outlined"
              {...getFieldProps("newPassword")}
              error={Boolean(touched.newPassword && errors.newPassword)}
              helperText={touched.newPassword && errors.newPassword}
            />
            <TextField
            // onChange={(e)=>setData({...data,confirmNewPassword:e.target.value})}
              required
              fullWidth
              label="Confirm Password"
              margin="normal"
              name="confirmNewPassword"
              type="password"
              variant="outlined"
              {...getFieldProps("confirmNewPassword")}
              error={Boolean(
                touched.confirmNewPassword && errors.confirmNewPassword
              )}
              helperText={touched.confirmNewPassword && errors.confirmNewPassword}
            />
          </CardContent>
          <Divider />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              p: 2,
            }}
          >
            <Button
            disabled={isSubmitting}
            onClick={handleSubmit}
            color="primary" fullWidth variant="contained">
              Update
            </Button>
          </Box>
        </Card>
        </form>
      </Container>
    </>
  );
}
