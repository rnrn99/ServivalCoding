import React, { useState } from "react";
//import { Button, Form, Row, Col } from "react-bootstrap";
import {
  Box,
  TextField,
  Stack,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
} from "@mui/material";

//날짜 선택용 커스텀 모듈 가운데 p 자가 소문자다!
import Datepicker from "../utils/Datepicker";

const CertificateAddForm = ({ checkAddComplete }) => {
  console.log("CertificateAddForm 불러왔습니다.");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());

  // Date를 YYYY-MM-DD의 문자열로 바꾸는 함수입니다. 지유님꺼 업어옴
  const dateToString = (date) => {
    return (
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      date.getDate().toString().padStart(2, "0")
    );
  };

  const handleClick = (accept) => {
    // Date type의 시작일, 마감일 상태를 YYYY-MM-DD의 문자열로 바꿉니다.
    const strDate = dateToString(date);

    //서버에 post 요청을 하고 갱신.
    const isAccepted = accept;

    if (isAccepted) {
      console.log("추가하기 완료 버튼이 눌렸습니다.");
      checkAddComplete({ title, description, date: strDate });
    } else {
      console.log("추가하기 취소 버튼이 눌렸습니다.");
      checkAddComplete(null);
    }
  };

  return (
    <Box component="form" onSubmit={handleClick} sx={{ mt: 1 }}>
      <Stack spacing={2}>
        <TextField
          label="자격증명"
          onChange={(e) => setTitle(e.target.value)}
          sx={{ width: "60ch" }}
        />
        <TextField
          label="발급처"
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          label="발급일"
          onChange={(e) => setDescription(e.target.value)}
        />
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        sx={{ mt: 2, justifyContent: "center" }}
      >
        <Button name="accept" variant="contained" type="submit">
          확인
        </Button>{" "}
        <Button
          name="cancel"
          type="reset"
          onClick={() => handleClick(false)}
          variant="outlined"
        >
          취소
        </Button>{" "}
      </Stack>
    </Box>
  );
};

export default CertificateAddForm;

/*
   
    <Form>
      <Form.Group as={Row} className="mb-3">
        <Form.Control
          type="text"
          value={title}
          placeholder="자격증을 입력하세요."
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Form.Control
          type="text"
          value={description}
          placeholder="자격증 설명, 발급기관을 입력해주세요."
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </Form.Group>
      <Datepicker selected={date} onChange={setDate} />
      <Row>
        <Col />
        <Col>
          <Button name="accept" onClick={handleClick}>
            완료
          </Button>
        </Col>
        <Col>
          <Button name="cancel" onClick={handleClick}>
            취소
          </Button>
        </Col>
        <Col />
      </Row>
    </Form>


*/
