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
  Switch,
} from '@mui/material';
import * as moment from 'moment';
import Iconify from '../../components/iconify';
import ServerSidePaginationTable from '../../components/table/serverTable';
import { confirmOrgApi, getOrgsApi } from '../../services/auth';
import { FAILED, SUCCESS, showToast } from '../../components/UI/toast'; 

const SOMETHING_WENT_WRONG="Something went wrong";

export default function Organizations() {
  const [open, setOpen] = useState(null);
  const [orgsData, setOrgsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getOrgs = async () => {
    setLoading(true)
    setOrgsData([]);
    const { data } = await getOrgsApi({});
    if (data) {
      setOrgsData(data?.data || []);
    } else {
      showToast(FAILED, 'Something went wrong');
    }
    setLoading(false);
  };

  useEffect(() => {
    getOrgs()
  }, []);
  const handleCloseMenu = () => {
    setOpen(null);
  };
  const updateOrg = async (name, status) => {
    try {
      const res = await confirmOrgApi({ name, status });
      if (res.success) {
        showToast(SUCCESS, "Organisation status updated");
        getOrgs();
      } else {
        showToast(FAILED, res.error || SOMETHING_WENT_WRONG);
      }
    } catch (error) {
      showToast(FAILED, SOMETHING_WENT_WRONG);
    }
  };
  const columns = [
    { title: 'Name', field: 'name' },
    { title: 'Email', field: 'email' },
    {
      title: 'Create Time',
      field: 'createdat',
      render: (rowData) => <p>{moment(rowData.createdat).format('DD/MM/YYYY')}</p>,
    },
    {
      title: 'Status',
      field: 'accountverified',
      render: (rowData) => (
        <Chip
          label={`${rowData?.accountverified ? 'Verified' : 'Pending'}`}
          sx={{
            backgroundColor: `${rowData?.accountverified ? '#54d62c29' : '#ff484229'}`,
            color: `${rowData?.accountverified ? '#229A16' : '#B72136'}`,
          }}
        />
      ),
    },
    {
      title: 'Status',
      field: 'accountverified',
      render: (rowData) => (
        <Switch
        checked={rowData?.accountverified}
        onClick={(e) => updateOrg(rowData?.name, e.target.checked)}
      />
      ),
    },
  ];
  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Organizations
          </Typography>
        </Stack>
        {orgsData.length > 0 && <ServerSidePaginationTable TABLE_DATA={orgsData} columns={columns} />}
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
