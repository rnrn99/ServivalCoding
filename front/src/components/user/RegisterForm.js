import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  TextField,
  Card,
  Container,
  Typography,
} from "@mui/material";

import * as Api from "../../api";
import AlertError from "../utils/AlertError";

function RegisterForm() {
  const navigate = useNavigate();

  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState("");
  //useState로 password 상태를 생성함.
  const [password, setPassword] = useState("");
  //useState로 confirmPassword 상태를 생성함.
  const [confirmPassword, setConfirmPassword] = useState("");
  //useState로 name 상태를 생성함.
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(null); // 에러 메세지를 저장합니다.

  const [isEmailValid, setIsEmailValid] = useState(false); // 이메일이 유효한 값인지 boolean 값으로 저장합니다.
  const [isPasswordValid, setIsPasswordValid] = useState(false); // 비밀번호가 유효한 값인지 boolean 값으로 저장합니다.
  const [isPasswordSame, setIsPasswordSame] = useState(false); // 비밀번호 확인이 유효한 값인지 boolean 값으로 저장합니다.
  const [isNameValid, setIsNameValid] = useState(false); // 이름이 유효한 값인지 boolean 값으로 저장합니다.
  const [isFormValid, setIsFormVaild] = useState(false); // 폼이 유효한 값인지 boolean 값으로 저장합니다.

  //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
  const validateEmail = (email) => {
    const reg_email =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg_email.test(email.toLowerCase());
  };

  // 위 4개 조건이 모두 동시에 만족되는지 여부를 확인함.
  useEffect(() => {
    setIsFormVaild(
      isEmailValid && isPasswordValid && isPasswordSame && isNameValid,
    );
  }, [isEmailValid, isPasswordValid, isPasswordSame, isNameValid]);

  // 폼이 모두 유효한 값이면 에러메세지 없앰
  useEffect(() => {
    if (isFormValid) {
      setErrorMessage(null);
    }
  }, [isFormValid]);

  // 이메일 유효한지 확인
  useEffect(() => {
    setIsEmailValid(validateEmail(email));
  }, [email]);

  // 비밀번호 유효한지 확인
  useEffect(() => {
    setIsPasswordValid(password.length >= 4);
  }, [password]);

  // 비밀번호 확인 유효한지 확인
  useEffect(() => {
    setIsPasswordSame(password === confirmPassword);
  }, [confirmPassword]);

  // 이름 유효한지 확인
  useEffect(() => {
    setIsNameValid(name.length >= 2);
  }, [name]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      try {
        // "users/register" 엔드포인트로 post요청함.
        await Api.post("users/register", {
          email,
          password,
          name,
        });

        // 로그인 페이지로 이동함.
        navigate("/login");
      } catch (err) {
        setErrorMessage(err.response.data.error.message);
      }
    } else {
      emailInputChecker();
      passwordInputChecker();
      pwdconfirmInputChecker();
      nameInputChecker();
    }
  };

  const emailInputChecker = () => {
    if (!isEmailValid) {
      // 에러 메세지 출력
      setErrorMessage("이메일 형식이 올바르지 않습니다.");
    } else {
      setErrorMessage(null);
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

  const nameInputChecker = () => {
    if (!isNameValid) {
      // 에러 메세지 출력
      setErrorMessage("이름은 2글자 이상으로 설정해 주세요.");
    } else {
      setErrorMessage(null);
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
        <Typography sx={{ fontSize: "20px" }}>회원가입</Typography>

        <TextField
          margin="normal"
          name="email"
          label="이메일 주소"
          fullWidth
          autoComplete="email"
          required
          value={email}
          onBlur={emailInputChecker}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          margin="normal"
          name="password"
          label="비밀번호"
          type="password"
          fullWidth
          autoComplete="off"
          required
          value={password}
          onBlur={passwordInputChecker}
          onChange={(e) => setPassword(e.target.value)}
        />

        <TextField
          margin="normal"
          name="confirmpassword"
          label="비밀번호 확인"
          type="password"
          fullWidth
          autoComplete="off"
          required
          value={confirmPassword}
          onBlur={pwdconfirmInputChecker}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <TextField
          margin="normal"
          name="name"
          label="이름"
          type="text"
          fullWidth
          autoComplete="off"
          required
          value={name}
          onBlur={nameInputChecker}
          onChange={(e) => setName(e.target.value)}
        />

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
          회원가입
        </Button>

        <Button variant="text" onClick={() => navigate("/login")}>
          로그인하기
        </Button>
      </Card>
    </Container>
  );
}

export default RegisterForm;
