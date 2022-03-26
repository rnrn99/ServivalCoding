import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Stack,
} from "@mui/material";
import AlertError from "../utils/AlertError";
import * as Api from "../../api";

function ModifyPassword({ setIsModifyPassword }) {
  const [open, setOpen] = useState(true); // Dialog창 open 여부를 저장합니다.
  const [password, setPassword] = useState(""); // 새 비밀번호를 저장합니다.
  const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인을 저장합니다.
  const [errorMessage, setErrorMessage] = useState(null); // 에러 메세지를 저장합니다.
  const [isPasswordValid, setIsPasswordValid] = useState(false); // 비밀번호가 유효한 값인지 boolean 값으로 저장합니다.
  const [isPasswordSame, setIsPasswordSame] = useState(false); // 비밀번호 확인이 유효한 값인지 boolean 값으로 저장합니다.
  const [isFormValid, setIsFormVaild] = useState(false); // 폼이 유효한 값인지 boolean 값으로 저장합니다.

  // 입력된 값이 모두 유효한지 판별함.
  useEffect(() => {
    setIsFormVaild(isPasswordValid && isPasswordSame);
  }, [isPasswordValid, isPasswordSame]);

  // 폼이 모두 유효한 값이면 에러메세지 없앰
  useEffect(() => {
    if (isFormValid) {
      setErrorMessage(null);
    } else {
      if (password !== "" && confirmPassword !== "") {
        passwordInputChecker();
        pwdconfirmInputChecker();
      }
    }
  }, [isFormValid]);

  // 비밀번호와 비밀번호 확인 유효한지 확인
  useEffect(() => {
    setIsPasswordValid(password.length >= 4);
    setIsPasswordSame(password.length >= 4 && password === confirmPassword);
  }, [password, confirmPassword]);

  // Dialog 창 닫기
  const handleClose = () => {
    setOpen(false);
    setIsModifyPassword(false);
  };

  // 비밀번호 변경 요청 보내기
  const modifyPasswordBtnClick = async () => {
    try {
      await Api.put("users", {
        password,
      });
      handleClose();
    } catch (err) {
      setErrorMessage(err.response.data.error.message);
    }
  };

  const passwordInputChecker = () => {
    if (!isPasswordValid) {
      // 에러 메세지 출력
      setErrorMessage("비밀번호는 4글자 이상으로 설정해 주세요.");
    } else {
      setErrorMessage(null);
    }
  };
  const pwdconfirmInputChecker = () => {
    if (!isPasswordSame) {
      // 에러 메세지 출력
      setErrorMessage("비밀번호가 일치하지 않습니다.");
    } else {
      setErrorMessage(null);
    }
  };
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>비밀번호 변경</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 2, mb: 2 }}>
          <TextField
            required
            type="password"
            label="새 비밀번호"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={passwordInputChecker}
          />

          <TextField
            required
            type="password"
            label="새 비밀번호 확인"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={pwdconfirmInputChecker}
          />
        </Stack>
        {errorMessage && <AlertError message={errorMessage} />}
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", mb: 2 }}>
        <Stack direction="row" spacing={2}>
          <Button
            onClick={modifyPasswordBtnClick}
            autoFocus
            variant="contained"
            size="small"
            disabled={!isFormValid}
          >
            변경
          </Button>
          <Button onClick={handleClose} variant="outlined" size="small">
            취소
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}

export default ModifyPassword;
