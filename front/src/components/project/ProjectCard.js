import React, { useState } from "react";
import { Button, Grid, IconButton, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import * as Api from "../../api";

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
    // projects로 DELETE 요청을 보내 프로젝트를 삭제합니다.
    await Api.delete("projects", project.id);

    // project-lists/유저id로 GET 요청을 보내 업데이트 사항이 반영된 프로젝트를 새로 저장합니다.
    const res = await Api.get("project-lists", project.user.id);
    setProjects(res.data);
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
