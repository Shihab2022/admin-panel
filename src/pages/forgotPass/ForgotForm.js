import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { Box, Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { forgotPasswordApi } from '../../services/auth';
import { FAILED, showToast, INFO } from '../../components/UI/toast';

const SOMETHING_WENT_WRONG = 'Something went wrong';
export default function ForgotForm() {
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async () => {
      const { error, success } = await forgotPasswordApi(formik.values);
      if (!success) {
        formik.setFieldError('all', error);
        showToast(FAILED, typeof error === 'string' ? error : SOMETHING_WENT_WRONG);
      } else {
        showToast(INFO, 'Mail has been sent to registered mail');
      }
      return true;
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack sx={{ my: 2 }} spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
        </Stack>

        <Box sx={{ color: 'red', textAlign: 'center' }}>{errors.all && errors.all}</Box>
        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Submit
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
