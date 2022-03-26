import React, { useContext, useState } from "react";
import { UserStateContext } from "../../App";
import AlertDialog from "../utils/AlertDialog"; // 최종 삭제 여부 다이얼로그
import * as Api from "../../api";
// mui
import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

function CareerCard({ career, setClickEditBtn, isEditable, setCareerList }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false); // 삭제 여부를 저장합니다.

  const userState = useContext(UserStateContext);
  const userId = userState.user.id;

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteHandler = async (isDeleting) => {
    if (isDeleting) {
      try {
        await Api.delete("careers", career.id);

        const deleteData = await Api.get("career-lists", userId);
        setCareerList(deleteData.data.careers);
      } catch (err) {
        setCareerList([]);
      }
    }
  };

  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot style={{ backgroundColor: "#C7A27C" }} />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <p
          className="text-muted"
          style={{ fontSize: "11px", marginBottom: "2px" }}
        >
          [{career.fromDate}
          <br />~{career.toDate}]
        </p>
        <p style={{ fontSize: "15px" }}>{career.title}</p>

        {isEditable && (
          <>
            <IconButton
              onClick={handleClick}
              sx={{ float: "right", mb: 2 }}
              style={{ padding: "0" }}
            >
              <MoreHorizIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem onClick={handleClose}>
                <Button
                  startIcon={<EditIcon />}
                  onClick={() => setClickEditBtn((cur) => !cur)}
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
      </TimelineContent>
    </TimelineItem>
  );
}

export default CareerCard;
