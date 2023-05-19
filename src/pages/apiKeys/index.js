import { useEffect, useState } from 'react';
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
  Backdrop,
  CircularProgress,
  Chip,
} from '@mui/material';
import * as moment from 'moment';
import Iconify from '../../components/iconify';
import { apiKeysApi } from '../../services/auth';
import ServerSidePaginationTable from '../../components/table/serverTable';
import { FAILED, showToast } from '../../components/UI/toast';

const columns = [
  { title: 'Name', field: 'name' },
  { title: 'Email', field: 'email' },
  {
    title: 'Create Time',
    field: 'created_at',
    render: (rowData) => <p>{moment(rowData.created_at
      ).format('DD/MM/YYYY')}</p>,
  },
  {
    title: 'Status',
    field: 'is_active',
    render: (rowData) => (
      <Chip
        label={`${rowData?.is_active ? 'Active' : 'Inactive'}`}
        sx={{
          backgroundColor: `${rowData?.is_active ? '#54d62c29' : '#ff484229'}`,
          color: `${rowData?.is_active ? '#229A16' : '#B72136'}`,
        }}
      />
    ),
  },
];

export default function ApiKeys() {
    const [open, setOpen] = useState(null);
    const [modal,setModal]=useState(false)
    const [kpiData, setKpiData] = useState([]);
    const [loading, setLoading] = useState(true);
    const getApiKeys = async (p) => {
      const { data } = await apiKeysApi(p);
      if (data) {
        setKpiData(data?.data || []);
      } else {
        showToast(FAILED, "Something went wrong");
      }
      setLoading(false);
    };
    useEffect(() => {
      getApiKeys({ offset: 0, limit: 100 });
    }, []);
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
         {kpiData.length > 0 && <ServerSidePaginationTable TABLE_DATA={kpiData} columns={columns} />}
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
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
