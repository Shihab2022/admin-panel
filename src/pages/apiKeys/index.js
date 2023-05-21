import {
  Alert,
  AlertTitle,
  Backdrop,
  Button,
  Chip,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { CSVLink } from "react-csv";
import moment from "moment";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addApiKeyApi, apiKeysApi} from '../../services/auth';
import { FAILED, showToast, SUCCESS } from '../../components/UI/toast'; 
import Iconify from '../../components/iconify';
import ServerSidePaginationTable from '../../components/table/serverTable';

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
const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

function FormDialog(props) {
  const { open, setOpen, submit } = props;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add API Key</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To invite user to this website, please enter email address here. We
            will send them a link to join.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Organisation"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            disabled={!validateEmail(email) || !name?.length}
            onClick={() => submit({ email, name })}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const CSVHeaders = ["id", "name", "api_key", "created_at"];
const ManageApiKeys = () => {
  const user = useSelector((state) => state.user.info);
  const navigate = useNavigate();
  if (user && !["admin", "superadmin"].includes(user?.role)) {
    navigate("/");
  }
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [addedKey, setAddedKey] = useState({ name: "", key: "" });



  const getApiKeys = async (p) => {
    setUsers([])
    const { data } = await apiKeysApi(p);
    if (data) {
      setUsers(data?.data || []);
    } else {
      showToast(FAILED, "Something went wrong");
    }
    setLoading(false);
  };
  const addKey = async (email, name) => {
    try {
      setLoading(true);
      setShowModal(false);
      const { success, data } = await addApiKeyApi({ email, name });
      if (success) {
        const temp = [...users];
        temp.unshift(data?.data?.info);
        setUsers(temp);
        setAddedKey({
          key: data?.data?.key,
          name,
          info: data?.data?.info,
        });
        getApiKeys({ offset: 0, limit: 100 });
        showToast(SUCCESS, "Mail sent");
      } else {
        showToast(FAILED, data.error || "Something went wrong");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      showToast(FAILED, "Something went wrong");
    }
  };
  useEffect(() => {
    getApiKeys({ offset: 0, limit: 100 });
  }, []);

  const copyToClipboard = (val) => {
    navigator.clipboard.writeText(val);
    showToast(SUCCESS, "Copied");
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Keys
          </Typography>
          <Button onClick={() => setShowModal(true)} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Add Keys
          </Button>
        </Stack>
      {addedKey?.key && (
        <Alert
          onClose={() => {
            setAddedKey({ name: "", key: "" });
          }}
          severity="success"
        >
          <AlertTitle>
            {" "}
            Key added successfully for {addedKey?.name} with key {addedKey?.key}
            <ContentCopyIcon
              onClick={() => copyToClipboard(addedKey?.key)}
              sx={{ marginLeft: 2, textAlign: "center", cursor: "pointer" }}
            />{" "}
            <CSVLink
              headers={CSVHeaders.map((p) => p)}
              data={[
                [
                  addedKey?.info?.id,
                  addedKey?.info?.name,
                  addedKey?.key,
                  addedKey?.info?.created_at,
                ],
              ]}
              filename={addedKey?.name + "_" + addedKey?.key + ".csv"}
              style={{}}
            >
              <Button color="primary" variant="text">
                Download
              </Button>
            </CSVLink>
          </AlertTitle>
        </Alert>
      )}
        {users.length > 0 && <ServerSidePaginationTable TABLE_DATA={users} columns={columns} />}
      {showModal && (
        <FormDialog
          open={showModal}
          submit={({ email, name }) => addKey(email, name)}
          setOpen={setShowModal}
        />
      )}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
};

export default ManageApiKeys;
