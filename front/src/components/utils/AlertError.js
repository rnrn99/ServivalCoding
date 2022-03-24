import React from "react";
import { Snackbar, Alert } from "@mui/material";

function AlertError({ alertOpen, setAlertOpen, message }) {
  const handleClose = () => {
    setAlertOpen((cur) => !cur);
  };
  return (
    <Snackbar
      open={alertOpen}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity="error" sx={{ bgcolor: "#ffbcbc" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default AlertError;
