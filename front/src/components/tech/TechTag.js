import React from "react";
import { Avatar, Chip } from "@mui/material";
import techNameToURL from "./techNameToURL";

const TechTag = ({ isDeletable, tag, tabIndex, deleteHandler }) => {
  const tagImgSrc = techNameToURL(tag);

  const handleDelete = () => {
    if (isDeletable) {
      deleteHandler(tag);
      console.log("기술태그 삭제버튼이 눌렸슴다", tag);
    }
  };

  if (isDeletable) {
    return (
      <Chip
        avatar={<Avatar alt={tag} src={tagImgSrc} />}
        tabIndex={tabIndex}
        label={tag}
        variant="outlined"
        onDelete={handleDelete}
        sx={{ mr: "4px" }}
      />
    );
  } else {
    return (
      <Chip
        avatar={<Avatar alt={tag} src={tagImgSrc} />}
        tabIndex={tabIndex}
        label={tag}
        variant="outlined"
        sx={{ mr: "4px" }}
      />
    );
  }
};

export default TechTag;
