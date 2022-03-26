import React from "react";
import TechIcon from "./TechIcon";
import { Grid, Typography } from "@mui/material";

const TechPick = ({ type, techName }) => {
  const setLabel = (type) => {
    if (type === "favorite") return "My Favorite";
    else return "Self-Confident";
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item xs={7}>
        <TechIcon techName={techName} variant="square" />
      </Grid>
      <Grid item xs sx={{ mb: "4px", mt: "10px" }}>
        <Typography variant="body2" color="text.secondary">
          {setLabel(type)}
        </Typography>
      </Grid>
      <Grid item xs justifyContent="flex-end">
        <Typography gutterBottom variant="h5" component="div">
          {techName}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default TechPick;
