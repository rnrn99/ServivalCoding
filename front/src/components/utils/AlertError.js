import React from "react";
import { Alert } from "@mui/material";

function AlertError({ message, onClose }) {
  return (
    <Alert severity="error" sx={{ bgcolor: "#ffbcbc" }} onClose={onClose}>
      {message}
    </Alert>
  );
}

export default AlertError;
