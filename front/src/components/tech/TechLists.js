//개발 언어 항목
import React from "react";
import TechTag from "./TechTag";
import { Grid, Typography } from "@mui/material";

const TechLists = ({ subtitle, tags }) => {
  const setTagList = () => {
    console.log(tags);
    return tags.map((tag, idx) => {
      return <TechTag key={idx} tag={tag} />;
    });
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={1}
      sx={{ mb: "4px", mt: "4px" }}
    >
      <Grid item xs={2}>
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      </Grid>
      <Grid item xs>
        <Grid container>{setTagList()}</Grid>
      </Grid>
    </Grid>
  );
};

TechLists.defaultProps = {
  subtitle: "subtitle",
  tags: ["tag1", "tag2"],
};

export default TechLists;
