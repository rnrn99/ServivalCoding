import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as Api from "../../api";
import { DispatchContext } from "../../App";

import {
  Avatar,
  Button,
  TextField,
  Card,
  Container,
  // Typography,
  Link,
  Grid,
} from "@mui/material";

//import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AlertError from "../utils/AlertError";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);

  const [email, setEmail] = useState(""); //useState로 email 상태를 생성함.
  const [password, setPassword] = useState(""); //useState로 password 상태를 생성함.
  const [errorMessage, setErrorMessage] = useState(null); // 에러 메세지를 저장합니다.

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
      // if (e.target.name === "GUEST") {
      //   console.log("게스트버튼 설정");
      //   setEmail("guest@elice.com");
      //   setPassword("1234");
      // }

      // "users/login" 엔드포인트로 post요청함.
      const res = await Api.post("users/login", {
        email,
        password,
      });

      // 유저 정보는 response의 data임.
      const user = res.data.user;

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
      setErrorMessage(err.response.data.error.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Card
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "white",
          padding: 2,
          borderRadius: 2,
        }}
      >
        <Avatar
          src="/logo.png"
          variant="square"
          alt="logo"
          sx={{ width: 128, height: 128, mb: 0 }}
        />

        <TextField
          margin="normal"
          name="email"
          label="이메일 주소"
          required
          fullWidth
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          margin="normal"
          name="password"
          label="비밀번호"
          type="password"
          required
          fullWidth
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {errorMessage && <AlertError message={errorMessage} />}

        <Button
          type="submit"
          name="LOGIN"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 1 }}
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
          onClick={handleSubmit}
        >
          게스트계정으로 살펴보기
        </Button>
        <Grid container>
          <Grid item xs>
            <Link>비밀번호 찾기</Link>
          </Grid>
          <Grid item>
            <Link onClick={() => navigate("/register")}>회원가입</Link>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default LoginForm;
