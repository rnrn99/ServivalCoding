// 아이콘 생성
import React from "react";
import { Grid, Avatar } from "@mui/material";
import techNameToURL from "./techNameToURL";
const TechIcon = ({ width, height, techName, variant }) => {
  const imgURL = techNameToURL(techName);
  const imgWidth = width ?? 64;
  const imgHeight = height ?? 64;

  return (
    <Grid item>
      <Avatar
        sx={{ width: imgWidth, height: imgHeight }}
        alt={techName}
        src={imgURL}
        variant={variant}
      />
    </Grid>
  );
};

export default TechIcon;

TechIcon.defaultProps = {
  variant: "rounded",
};
