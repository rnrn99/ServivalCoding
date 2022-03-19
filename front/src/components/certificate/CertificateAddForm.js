import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";

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

  const handleClick = (e) => {
    e.preventDefault();

    // Date type의 시작일, 마감일 상태를 YYYY-MM-DD의 문자열로 바꿉니다.
    const strDate = dateToString(date);

    //서버에 post 요청을 하고 갱신.
    const isAccepted = e.target.name === "accept" ? true : false;

    if (isAccepted) {
      console.log("추가하기 완료 버튼이 눌렸습니다.");
      checkAddComplete({ title, description, date: strDate });
    } else {
      console.log("추가하기 취소 버튼이 눌렸습니다.");
      checkAddComplete(null);
    }
  };

  return (
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
  );
};

export default CertificateAddForm;
