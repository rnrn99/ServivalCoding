import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Form, Button } from "react-bootstrap";

import * as Api from "../../api";
import { DispatchContext } from "../../App";
import {
  Avatar,
  Button,
  TextField,
  Card,
  Container,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Snackbar,
  Alert,
  Stack,
} from "@mui/material";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);

  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState("");
  //useState로 password 상태를 생성함.
  const [password, setPassword] = useState("");

  //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
  const isEmailValid = validateEmail(email);
  // 비밀번호가 4글자 이상인지 여부를 확인함.
  const isPasswordValid = password.length >= 4;
  //
  // 이메일과 비밀번호 조건이 동시에 만족되는지 확인함.
  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // "users/login" 엔드포인트로 post요청함.
      const res = await Api.post("users/login", {
        email,
        password,
      });
      // 유저 정보는 response의 data임.
      const user = res.data;
      // JWT 토큰은 유저 정보의 token임.
      const jwtToken = user.token;
      // sessionStorage에 "userToken"이라는 키로 JWT 토큰을 저장함.
      sessionStorage.setItem("userToken", jwtToken);
      // dispatch 함수를 이용해 로그인 성공 상태로 만듦.
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: user,
      });

      // 기본 페이지로 이동함.
      navigate("/", { replace: true });
    } catch (err) {
      console.log("로그인에 실패하였습니다.\n", err);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col lg={8}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="loginEmail">
              <Form.Label>이메일 주소</Form.Label>
              <Form.Control
                type="email"
                autoComplete="on"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {!isEmailValid && (
                <Form.Text className="text-success">
                  이메일 형식이 올바르지 않습니다.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="loginPassword" className="mt-3">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                type="password"
                autoComplete="on"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {!isPasswordValid && (
                <Form.Text className="text-success">
                  비밀번호는 4글자 이상입니다.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group as={Row} className="mt-3 text-center">
              <Col sm={{ span: 20 }}>
                <Button variant="primary" type="submit" disabled={!isFormValid}>
                  로그인
                </Button>
              </Col>
            </Form.Group>

        {errorMessage && <AlertError message={errorMessage} />}

        <Button
          type="submit"
          name="LOGIN"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 1 }}
          disabled={!isFormValid}
          onClick={handleSubmit}
        >
          로그인
        </Button>
        <Button
          type="submit"
          name="GUEST"
          fullWidth
          variant="contained"
          color="secondary"
          sx={{ mb: 2 }}
          onClick={guestLoginBtnClick}
        >
          게스트계정으로 살펴보기
        </Button>
        <Grid container>
          <Grid item xs>
            <Button variant="text" onClick={() => setIsOpenDialog(true)}>
              비밀번호 찾기
            </Button>
          </Grid>
          <Grid item>
            <Button variant="text" onClick={() => navigate("/register")}>
              회원가입
            </Button>
          </Grid>
        </Grid>
      </Card>

      {isOpenDialog && (
        <Dialog open={isOpenDialog} onClose={() => setIsOpenDialog(false)}>
          <DialogTitle>비밀번호 찾기</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              아이디를 입력하세요
            </DialogContentText>
            <TextField
              margin="normal"
              name="email"
              label="아이디"
              required
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errorMessage && (
              <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={!sendMailSucc}
                autoHideDuration={6000}
                onClose={() => {
                  setSendMailSucc(false);
                  setErrorMessage(null);
                }}
              >
                <Alert severity="error" sx={{ width: "100%" }}>
                  존재하지 않는 사용자입니다. 다시 한 번 확인해 주세요!
                </Alert>
              </Snackbar>
            )}
          </DialogContent>
          <DialogActions sx={{ mt: 2, justifyContent: "center" }}>
            <Stack direction="row" spacing={2}>
              <Button onClick={() => setIsOpenDialog(false)} color="error">
                취소
              </Button>
              <Button onClick={sendMailHandler}>보내기</Button>
            </Stack>
          </DialogActions>
        </Dialog>
      )}

      {sendMailSucc && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={sendMailSucc}
          autoHideDuration={6000}
          onClose={() => setSendMailSucc(false)}
        >
          <Alert severity="success" sx={{ width: "100%" }}>
            메일이 성공적으로 발송되었습니다! 메일함으로 가 새 비밀번호를
            확인하세요!
          </Alert>
        </Snackbar>
      )}
    </Container>
  );
}

export default LoginForm;
