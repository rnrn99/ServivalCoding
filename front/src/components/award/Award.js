import React, { useState, useContext } from "react";
import AwardEditForm from "./AwardEditForm";

import { Button, Grid, IconButton, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"; // 가로 점 세개
import EditIcon from "@mui/icons-material/Edit"; // 편집 버튼 아이콘
import DeleteIcon from "@mui/icons-material/Delete"; // 삭제 버튼 아이콘
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import * as Api from "../../api";
import { UserStateContext } from "../../App";

// 뿌려지는 수상이력 개별이 갖는 구조 컨퍼넌트 입니다.
function Award({ award, isEditable, setAwardLists }) {
  // 편집 버튼 클릭 시, AwardEditForm이 활성화 되도록 하는 state 입니다.
  const [isEditing, setIsEditing] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const userState = useContext(UserStateContext);
  const userId = userState.user.id;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteHandler = async () => {
    await Api.delete("awards", award.id);

    const deleteData = await Api.get("award-lists", userId);
    setAwardLists(deleteData.data.data);
  };

  return (
    <>
      <Dialog open={isEditing} onClose={() => setIsEditing((cur) => !cur)}>
        <DialogTitle>수상경력 편집</DialogTitle>
        <DialogContent>
          <AwardEditForm
            award={award}
            isEditable={isEditable}
            setIsEditing={setIsEditing}
            setAwardLists={setAwardLists}
          />
        </DialogContent>
      </Dialog>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <p style={{ marginBottom: "5px" }}>{award.title}</p>
          <p className="text-muted">{award.description}</p>
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
                    onClick={() => setIsEditing(true)}
                    startIcon={<EditIcon />}
                  >
                    편집
                  </Button>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Button
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={deleteHandler}
                  >
                    삭제
                  </Button>
                </MenuItem>
              </Menu>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default Award;
