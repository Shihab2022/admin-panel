import { useState } from 'react';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import {Stack, IconButton, InputAdornment, TextField, Checkbox, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDispatch } from 'react-redux';
import Iconify from '../../../components/iconify';
import { SET_USER } from '../../../store/user/user';
import { setToken } from '../../../utils/storage';
import { loginUserApi } from '../../../services/auth';


export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: async () => {
      const { data, error, success } = await loginUserApi(formik.values);
      if (!success) {
        formik.setFieldError('all', error);
      } else {
        dispatch({ type: SET_USER, user: data?.data?.user });
        // showToast(SUCCESS, AUTH_LOGIN_SUCCESS);
        setToken(data?.data?.token);
        navigate('/dashboard');
      }
      return true;
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              autoComplete="username"
              type="email"
              label="Email address"
              {...getFieldProps('email')}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />

            <TextField
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              {...getFieldProps('password')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} edge="end">
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
            <FormControlLabel
              control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
              label="Remember me"
            />
            <Link to='/forgot-password'  underline="hover">
              Forgot password?
            </Link>
          </Stack>

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Login
          </LoadingButton>
        </Form>
      </FormikProvider>
    </>
  );
}
