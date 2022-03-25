import React from "react";
import { Alert } from "@mui/material";

function AlertError({ message }) {
  return (
    <Alert severity="error" sx={{ bgcolor: "#ffbcbc" }}>
      {message}
    </Alert>
  );
}

export default AlertError;
