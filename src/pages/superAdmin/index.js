

import { useState } from 'react';
import {
  Stack,
  Button,
  Popover,
  MenuItem,
  Container,
  Typography,
} from '@mui/material';
import Iconify from '../../components/iconify';
import MainTable from '../../components/table/index';
// import KeysData from '../../_mock/keysData';
import SuperAdminData from '../../_mock/superAdminData';


const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'email', label: 'Eamil', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'changeRole', label: 'Change Role', alignRight: false },
  { id: '' },
];

export default function SuperAdmin() {
    const [open, setOpen] = useState(null);
    const handleCloseMenu = () => {
        setOpen(null);
      };
  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
          Hi, Welcome back  Admin Page
          </Typography>
          <Button  variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Add Admin
          </Button>
        </Stack>
        <MainTable
        TABLE_HEAD={TABLE_HEAD}
        setOpen={setOpen}
        TABLE_DATA={SuperAdminData}
        switchStatus
        placeholder='Search Keys...'
        />
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
        <MenuItem>
          Resend Mail
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
