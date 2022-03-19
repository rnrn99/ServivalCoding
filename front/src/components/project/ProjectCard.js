import React, { useState } from "react";
import { Button, Grid, IconButton, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function ProjectCard({ project, setClickEditBtn, isEditable, setProjects }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const DelBtnClickHandler = async () => {
    // 삭제 버튼 구현 예정
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={10}>
        <p style={{ marginBottom: 0 }}>{project.title}</p>
        <p className="text-muted">
          {project.description} <br />
          {project.from} ~ {project.to}
        </p>
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
                  onClick={() => setClickEditBtn((cur) => !cur)}
                  startIcon={<EditIcon />}
                >
                  편집
                </Button>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Button
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={DelBtnClickHandler}
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
}

export default ProjectCard;
