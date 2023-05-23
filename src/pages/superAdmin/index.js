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
import { getSuperUsersApi, inviteSuperUserApi } from '../../services/auth';
import { FAILED, SUCCESS, showToast } from '../../components/UI/toast';
import ServerSidePaginationTable from '../../components/table/serverTable';
import FormDialog from './dialogForm';

const SOMETHING_WENT_WRONG="Something went wrong"
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
        label={`${rowData?.inviteaccepted ? 'accepted' : 'Pending'}`}
        sx={{
          backgroundColor: `${rowData?.inviteaccepted ? '#54d62c29' : '#ff484229'}`,
          color: `${rowData?.inviteaccepted ? '#229A16' : '#B72136'}`,
        }}
      />
    ),
  },
];

export default function SuperAdmin() {
  const [open, setOpen] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [superAdmins, setSuperAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  const inviteUser = async (email) => {
    try {
      setLoading(true);
      setShowModal(false);
      const { success, data } = await inviteSuperUserApi({ email });
      if (success) {
        setSuperAdmins([{ email }, ...superAdmins]);
        showToast(SUCCESS, "Mail sent");
      } else {
        showToast(FAILED, data.error ||SOMETHING_WENT_WRONG );
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      showToast(FAILED, SOMETHING_WENT_WRONG);
    }
  };
  const getUsers = async () => {
    const { data } = await getSuperUsersApi({});
    if (data) {
      setSuperAdmins(data?.data || []);
    } else {
      showToast(FAILED, SOMETHING_WENT_WRONG);
    }
    setLoading(false);
  };
  useEffect(() => {
    getUsers();
  }, []);
  const handleCloseMenu = () => {
    setOpen(null);
  };
  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Hi, Welcome back Admin Page
          </Typography>
          <Button onClick={()=>setShowModal(true)} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Add Admin
          </Button>
        </Stack>
        {superAdmins.length > 0 && <ServerSidePaginationTable TABLE_DATA={superAdmins} columns={columns} />}
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
      {showModal && (
        <FormDialog
          open={showModal}
          submit={({ email }) => inviteUser(email)}
          setOpen={setShowModal}
        />
      )}
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
