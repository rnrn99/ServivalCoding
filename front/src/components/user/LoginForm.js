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
  Typography,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AlertError from "../utils/AlertError";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);

  const [email, setEmail] = useState(""); //useState로 email 상태를 생성함.
  const [password, setPassword] = useState(""); //useState로 password 상태를 생성함.
  const [alertOpen, setAlertOpen] = useState(false); // alert 창 open 여부를 저장합니다.
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메세지를 저장합니다.

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

      // 로그인 실패 시 에러 반환
      if (!res.data.success) {
        setAlertOpen((cur) => !cur);
        setErrorMessage(res.data.error.message);
        throw new Error("로그인에 실패하였습니다.");
      }

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
      console.log(err);
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
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          로그인
        </Typography>

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

        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="로그인 기억하기"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleSubmit}
        >
          로그인
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
      {alertOpen && (
        <AlertError
          alertOpen={alertOpen}
          setAlertOpen={setAlertOpen}
          message={errorMessage}
        />
      )}
    </Container>
  );
};

export default LoginForm;

// {!isEmailValid && (
//     <Typography className="text-success" component="h5" variant="h5">
//       이메일 형식이 올바르지 않습니다.
//     </Typography>
//   )}

//   {!isPasswordValid && (
//     <Typography className="text-success" component="p" variant="p">
//       비밀번호는 4글자 이상입니다.
//     </Typography>
//   )}
