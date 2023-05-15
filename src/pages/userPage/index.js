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
import users from '../../_mock/user';


const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'company', label: 'Company', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];

export default function UserPage() {
    const [open, setOpen] = useState(null);
    const handleCloseMenu = () => {
        setOpen(null);
      };
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
        <MainTable
        TABLE_HEAD={TABLE_HEAD}
        setOpen={setOpen}
        TABLE_DATA={users}
        placeholder='Search User..'
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
