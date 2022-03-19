import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";

//커스텀 헤더 데이트 피커

import Datepicker from "../utils/Datepicker";

const CertificateEditForm = (props) => {
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [date, setDate] = useState(new Date(props.date));

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
    //PUT 요청을위해 변경된 정보를 Certificate 모듈로 전달.
    e.preventDefault();
    // Date type의 시작일, 마감일 상태를 YYYY-MM-DD의 문자열로 바꿉니다.
    const strDate = dateToString(date);

    console.log("Editform에서 버튼이 눌렸습니다.");
    if (e.target.name === "accept") {
      console.log("완료 버튼이 눌렸습니다.");
      props.checkEdited(true, { title, description, date: strDate });
    } else {
      console.log("취소 버튼이 눌렸습니다.");
      props.checkEdited(false, {});
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

export default CertificateEditForm;
