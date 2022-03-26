import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, Form } from "react-bootstrap";

import {
  Avatar,
  Button,
  TextField,
  Card,
  Container,
  Typography,
  Link,
  Grid,
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
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordSame, setIsPasswordSame] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);
  const [isFormValid, setIsFormVaild] = useState(false);

  //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
  //const isEmailValid = validateEmail(email);
  // 비밀번호가 4글자 이상인지 여부를 확인함.
  //const isPasswordValid = password.length >= 4;
  // 비밀번호와 확인용 비밀번호가 일치하는지 여부를 확인함.
  //const isPasswordSame = password === confirmPassword;
  // 이름이 2글자 이상인지 여부를 확인함.
  //const isNameValid = name.length >= 2;

  // 위 4개 조건이 모두 동시에 만족되는지 여부를 확인함.
  useEffect(() => {
    setIsFormVaild(
      isEmailValid && isPasswordValid && isPasswordSame && isNameValid
    );
  }, [isEmailValid, isPasswordValid, isPasswordSame, isNameValid]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      try {
        // "users/register" 엔드포인트로 post요청함.
        const res = await Api.post("users/register", {
          email,
          password,
          name,
        });
        console.log("회원가입요청 결과", res);

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
    setIsEmailValid(validateEmail(email));
    if (!isEmailValid) {
      //에러호출
      console.log("email not vaild");
      setErrorMessage("이메일 형식이 올바르지 않습니다.");
    } else {
      setErrorMessage();
    }
  };
  const passwordInputChecker = () => {
    setIsPasswordValid(password.length >= 4);
    if (!isPasswordValid) {
      //에러호출
      console.log("password not vaild");
      setErrorMessage("비밀번호는 4글자 이상으로 설정해 주세요.");
    }
  };
  const pwdconfirmInputChecker = () => {
    setIsPasswordSame(password === confirmPassword);
    if (!isPasswordSame) {
      //에러호출
      console.log("password confirm not vaild");
      setErrorMessage("비밀번호가 일치하지 않습니다.");
    }
  };
  const nameInputChecker = () => {
    setIsNameValid(name.length >= 2);
    if (!isNameValid) {
      //에러호출
      console.log("name not vaild");
      setErrorMessage("이름은 2글자 이상으로 설정해 주세요.");
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

        <Grid container>
          <Grid item xs>
            <Link>비밀번호 찾기</Link>
          </Grid>
          <Grid item>
            <Link onClick={() => navigate("/login")}>로그인하기</Link>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}

export default RegisterForm;
/*  



    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col lg={8}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="registerEmail">
              <Form.Label>이메일 주소</Form.Label>
              <Form.Control
                type="email"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {!isEmailValid && (
                <Form.Text className="text-success">
                  이메일 형식이 올바르지 않습니다.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="registerPassword" className="mt-3">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                type="password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {!isPasswordValid && (
                <Form.Text className="text-success">
                  비밀번호는 4글자 이상으로 설정해 주세요.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="registerConfirmPassword" className="mt-3">
              <Form.Label>비밀번호 재확인</Form.Label>
              <Form.Control
                type="password"
                autoComplete="off"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {!isPasswordSame && (
                <Form.Text className="text-success">
                  비밀번호가 일치하지 않습니다.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="registerName" className="mt-3">
              <Form.Label>이름</Form.Label>
              <Form.Control
                type="text"
                autoComplete="off"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {!isNameValid && (
                <Form.Text className="text-success">
                  이름은 2글자 이상으로 설정해 주세요.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group as={Row} className="mt-3 text-center">
              <Col sm={{ span: 20 }}>
                <Button variant="primary" type="submit" disabled={!isFormValid}>
                  회원가입
                </Button>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mt-3 text-center">
              <Col sm={{ span: 20 }}>
                <Button variant="light" onClick={() => navigate("/login")}>
                  로그인하기
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
*/
