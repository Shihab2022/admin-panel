import { useState } from 'react';
import {
  Stack,
  Button,
  Popover,
  MenuItem,
  Container,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
} from '@mui/material';
import Iconify from '../../components/iconify';
import MainTable from '../../components/table/index';
import KeysData from '../../_mock/keysData';


const TABLE_HEAD = [
  { id: 'keyName', label: 'Key Name', alignRight: false },
  { id: 'orgName', label: 'Org Name', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];

export default function ApiKeys() {
    const [open, setOpen] = useState(null);
    const [modal,setModal]=useState(false)
    const handleCloseMenu = () => {
        setOpen(null);
      };
      const handleClose = () => {
        setModal(false);
      };
  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
          Api Keys
          </Typography>
          <Button onClick={()=>setModal(!modal)} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Add Keys
          </Button>
        </Stack>
        <MainTable
        TABLE_HEAD={TABLE_HEAD}
        setOpen={setOpen}
        TABLE_DATA={KeysData}
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

      <Dialog open={modal} onClose={handleClose}>
        <DialogTitle>Add Your Api Keys</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Add Keys</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
