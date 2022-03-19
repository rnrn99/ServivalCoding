import React, { useState, useContext } from "react";
import { Button, Grid, IconButton, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import * as Api from "../../api";
import { UserStateContext } from "../../App";

function EducationCard({
  education,
  setClickEditBtn,
  isEditable,
  setEducations,
}) {
  const userState = useContext(UserStateContext); // 현재 로그인된 유저의 정보를 가져옵니다.

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const user_id = userState.user.id; // 현재 로그인한 유저의 아이디를 저장합니다.

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const DelBtnClickHandler = async () => {
    // educations로 DELETE 요청을 보내 학력을 삭제합니다.
    await Api.delete("educations", education.id);

    // education-lists/유저id로 GET 요청을 보내 업데이트 사항이 반영된 학력을 새로 저장합니다.
    const res = await Api.get("education-lists", user_id);
    setEducations(res.data);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={10}>
        <p style={{ marginBottom: "5px" }}>{education.school}</p>
        <p className="text-muted">
          {education.major} ({education.position})
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

export default EducationCard;
