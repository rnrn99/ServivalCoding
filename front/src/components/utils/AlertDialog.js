import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

//checkDeleteComplete 삭제를 확인하는 함수를 프랍으로 전달
export default function AlertDialog({ checkDeleteComplete }) {
  const [open, setOpen] = useState(true);

  //삭제버튼
  const handleClickDelete = () => {
    handleClose();
    checkDeleteComplete(true);
  };
  //취소버튼
  const handleClickCancel = () => {
    handleClose();
    checkDeleteComplete(false);
  };
  //기타 위치 클릭으로 취소
  const handleClose = () => {
    setOpen(false);
    checkDeleteComplete(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>삭제 확인</DialogTitle>
        <DialogContent>
          <DialogContentText>정말 삭제하시겠습니까?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickCancel}>취소</Button>
          <Button onClick={handleClickDelete} color="error" autoFocus>
            삭제
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
