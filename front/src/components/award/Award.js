import React, { useState, useContext } from "react";
import AwardEditForm from "./AwardEditForm";
import { UserStateContext } from "../../App";
import AlertDialog from "../utils/AlertDialog"; // 최종 삭제 여부 다이얼로그
import * as Api from "../../api";

import { Button, Grid, IconButton, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"; // 가로 점 세개
import EditIcon from "@mui/icons-material/Edit"; // 편집 버튼 아이콘
import DeleteIcon from "@mui/icons-material/Delete"; // 삭제 버튼 아이콘
import { Dialog, DialogTitle, DialogContent } from "@mui/material";

// 뿌려지는 수상이력 개별이 갖는 구조 컨퍼넌트 입니다.
function Award({ award, isEditable, setAwardLists }) {
  const [isEditing, setIsEditing] = useState(false); // 편집 버튼 클릭 시, AwardEditForm이 활성화 되도록 하는 state 입니다.
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false); // 삭제 여부를 저장합니다.

  const userState = useContext(UserStateContext);
  const userId = userState.user.id;

  const open = Boolean(anchorEl); // * 수정 필요 (state로 관리하기)*
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteHandler = async (isDeleting) => {
    if (isDeleting) {
      await Api.delete("awards", award.id);

      const deleteData = await Api.get("award-lists", userId);
      setAwardLists(deleteData.data.awards);
    }
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
                    sx={{color: '#054A91'}}
                  >
                    편집
                  </Button>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Button
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => setIsDeleting(true)}
                  >
                    삭제
                  </Button>
                </MenuItem>
              </Menu>
            </>
          )}
          {isDeleting && <AlertDialog checkDeleteComplete={deleteHandler} />}
        </Grid>
      </Grid>
    </>
  );
}

export default Award;
