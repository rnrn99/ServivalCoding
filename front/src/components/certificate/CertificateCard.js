import React, { useState } from "react";
import { Button, Grid, IconButton, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"; // 가로 점 세개
import EditIcon from "@mui/icons-material/Edit"; // 편집 버튼 아이콘
import DeleteIcon from "@mui/icons-material/Delete"; // 삭제 버튼 아이콘

const CertificateCard = ({
  isEditable,
  checkEditing,
  checkDeleting,
  title,
  description,
  date,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    //수정하기 버튼이 눌린 것이므로
    //isEditing <<부모 Certificate 한테 전달해줘야함. true값을 전달.

    if (event.target.name === "edit") {
      console.log("수정하기 버튼이 눌렸습니다.");
      checkEditing(true);
    } else if (event.target.name === "delete") {
      //삭제 버튼이 눌렸다면
      checkDeleting(true);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={10}>
        <p style={{ marginBottom: "5px" }}>
          {title} / {date}
        </p>
        <p className="text-muted">{description}</p>
      </Grid>
      <Grid item xs={2}>
        {isEditable && (
          <>
            <IconButton onClick={handleClick} sx={{ float: "right", mb: 2 }}>
              <MoreHorizIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem onClick={handleClose}>
                <Button
                  name="edit"
                  startIcon={<EditIcon />}
                  onClick={handleClick}
                >
                  편집
                </Button>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Button
                  name="delete"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={handleClick}
                >
                  삭제
                </Button>
              </MenuItem>
            </Menu>
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default CertificateCard;
