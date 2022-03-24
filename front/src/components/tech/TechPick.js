//가장 좋아하는 기술
//가장 자신있는 기술을 보여주기 위한 콤포넌트
//"favorite", "confident" 두가지로 꾸며서 보여주기
import React from "react";
import TechIcon from "./TechIcon";
import { Card, CardContent, Grid, Typography } from "@mui/material";

const TechPick = ({ type, techName }) => {
  const setLabel = (type) => {
    if (type === "favorite") return "My Favorite";
    else return "Self-Confident";
  };
  return (
    //<Card style={{ border: "none", boxShadow: "none" }}>
    // <CardContent>
    <Grid
      container
      direction="column"
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item xs={7}>
        <TechIcon techName={techName} />
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
    //   </CardContent>
    // </Card>
  );
};

export default TechPick;
