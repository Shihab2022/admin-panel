import { Backdrop, CircularProgress, Typography } from "@mui/material";

const Loader = ({ loading, title }) => {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={loading}
    >
      <Typography>{title}</Typography>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loader;
