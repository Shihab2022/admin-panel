import { styled } from '@mui/material/styles';
import { Box, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo-light.png';
import useResponsive from '../../hooks/useResponsive';
import ForgotForm from './ForgotForm';

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');

  return (
    <>
      <StyledRoot>
        <Link to="/">
          <img
            width="100px"
            style={{
              position: 'fixed',
              top: 40,
              left: 40,
            }}
            src={logo}
            alt=""
          />
        </Link>
        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <img src="/assets/illustrations/illustration_login.png" alt="login" />
          </StyledSection>
        )}
        <Container maxWidth="sm">
          <StyledContent>
            <Box sx={{ marginBottom: '20px' }}>
              <Typography variant="h6">Forgot Password</Typography>
              <Typography variant="p" sx={{ fontSize: '14px' }}>
                Enter your details below.
              </Typography>
            </Box>
            <ForgotForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
