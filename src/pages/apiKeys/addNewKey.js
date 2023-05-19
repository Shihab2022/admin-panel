import {
  Alert,
  AlertTitle,
  Backdrop,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import CustomizedTables from "components/UI/table";
import { FAILED, showToast, SUCCESS } from "components/UI/toast";
import { useEffect, useState } from "react";
import { inviteUserApi } from "services/auth";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addApiKeyApi, apiKeysApi } from "services/apiKeys";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { CSVLink } from "react-csv";

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

const StatusDisplayComp = (values = {}) => {
  return values["inviteaccepted"] ? "Accepted" : "Pending";
};

const CSVHeaders = ["id", "name", "api_key", "created_at"];

const Headers = [
  {
    name: "Id",
    colId: "id",
  },
  {
    colId: "email",
    name: "Email",
  },
  {
    name: "Name",
    colId: "name",
  },
  {
    name: "Created At",
    colId: "created_at",
    render: (v) => {
      try {
        let d = new Date(v?.created_at);
        return d?.toLocaleDateString();
      } catch (error) {
        return "N/A";
      }
    },
  },
  {
    name: "Status",
    colId: "is_active",
    render: (v) => (v?.is_active ? "Enabled" : "Disabled"),
  },
];

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
          name: name,
          info: data?.data?.info,
        });
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

  const getApiKeys = async (p) => {
    const { data } = await apiKeysApi(p);
    if (data) {
      setUsers(data?.data || []);
    } else {
      showToast(FAILED, "Something went wrong");
    }
    setLoading(false);
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
      <Typography sx={{ mb: 3 }} variant="h4">
        API Keys
      </Typography>
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
      <Grid sx={{ padding: "10px", float: "right" }}>
        <Button
          onClick={() => setShowModal(true)}
          variant="contained"
          color="primary"
        >
          Add Key
        </Button>
      </Grid>
      <Grid>
        <CustomizedTables headers={Headers} rows={users} disableCsvExport />
      </Grid>
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
