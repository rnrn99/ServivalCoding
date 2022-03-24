//Chip을 생성
import React from "react";
import { Avatar, Chip } from "@mui/material";
import techNameToURL from "./techNameToURL";
//image load state 통해서 예외처리.
const TechTag = ({ tag, tabIndex, handleDelete }) => {
  const tagImgSrc = techNameToURL(tag);
  return (
    <Chip
      avatar={<Avatar alt={tag} src={tagImgSrc} />}
      tabIndex={tabIndex}
      label={tag}
      variant="outlined"
      sx={{ mr: "4px" }}
    />
  );
};

export default TechTag;
