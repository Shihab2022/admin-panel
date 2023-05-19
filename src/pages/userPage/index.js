import { useEffect, useState } from 'react';
import {
  Stack,
  Button,
  Popover,
  MenuItem,
  Container,
  Typography,
  Backdrop,
  CircularProgress,
  Chip,
} from '@mui/material';
import Iconify from '../../components/iconify';
import { getUsersApiHandler } from '../../services/auth';
import { FAILED, showToast } from '../../components/UI/toast';
import ServerSidePaginationTable from '../../components/table/serverTable';

export default function UserPage() {
  const [open, setOpen] = useState(null);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleCloseMenu = () => {
    setOpen(null);
  };
  const handleClick = () => {
    console.log('hello');
  };
  const columns = [
    { title: 'First Name', field: 'firstname' },
    { title: 'Last Name', field: 'lastname' },
    { title: 'Email', field: 'email' },
    { title: 'Role', field: 'role' },
    {
      title: 'Status',
      field: 'inviteaccepted',
      render: (rowData) => (
        <Chip
          label={`${rowData?.inviteaccepted ? 'Accepted' : 'Pending'}`}
          sx={{
            backgroundColor: `${rowData?.inviteaccepted ? '#54d62c29' : '#ff484229'}`,
            color: `${rowData?.inviteaccepted ? '#229A16' : '#B72136'}`,
          }}
          onClick={handleClick}
        />
      ),
    },
  ];
  const getUsers = async () => {
    const { data } = await getUsersApiHandler({});
    if (data) {
      setUserData(data.data);
    } else {
      showToast(FAILED, 'Something went wrong');
    }
    setLoading(false);
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Add User
          </Button>
        </Stack>
        {userData.length > 0 && <ServerSidePaginationTable TABLE_DATA={userData} columns={columns} />}
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>Resend Mail</MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>Delete</MenuItem>
      </Popover>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
