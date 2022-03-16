import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";

function EducationAddForm({ user, setClickAddBtn, setClickSubmitBtn }) {
  const [school, setSchool] = useState(""); // 학교 이름을 저장할 상태입니다.
  const [major, setMajor] = useState(""); // 전공을 저장할 상태입니다.
  const [position, setPosition] = useState(""); // 재학/졸업 여부를 저장할 상태입니다.

  // radio button 클릭에 따라 position을 저장합니다.
  const RadioBtnClickHandler = (e) => {
    setPosition(e.target.value);
  };

  // submit event handler 입니다.
  const onSubmitHandler = (e) => {
    e.preventDefault();

    // 학력 추가를 위해 유저 아이디, 학교, 전공, 재학/졸업 여부를 객체로 저장합니다.
    const dataToSubmit = {
      user_id: user.id,
      school,
      major,
      position,
    };

    // education/create로 POST 요청을 보냅니다.
    Api.post("education/create", dataToSubmit);

    // 학력 추가 후 EducationAddForm을 닫고 SubmitBtn 클릭 이벤트 발생을 알립니다.
    setClickAddBtn(false);
    setClickSubmitBtn(true);
  };

  return (
    <Form className="mt-3" onSubmit={onSubmitHandler}>
      <Row>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="학교 이름"
            onChange={(e) => setSchool(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="전공"
            onChange={(e) => setMajor(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Check
            inline
            type="radio"
            label="재학중"
            value="재학중"
            name="group1"
            onClick={RadioBtnClickHandler}
          />
          <Form.Check
            inline
            type="radio"
            label="학사졸업"
            value="학사졸업"
            name="group1"
            onClick={RadioBtnClickHandler}
          />
          <Form.Check
            inline
            type="radio"
            label="석사졸업"
            value="석사졸업"
            name="group1"
            onClick={RadioBtnClickHandler}
          />
          <Form.Check
            inline
            type="radio"
            label="박사졸업"
            value="박사졸업"
            name="group1"
            onClick={RadioBtnClickHandler}
          />
        </Form.Group>
      </Row>
      <Row className="text-center mt-3">
        <Col>
          <Button
            variant="primary"
            type="submit"
            style={{ marginRight: "1rem" }}
          >
            확인
          </Button>{" "}
          <Button
            variant="secondary"
            type="reset"
            onClick={() => setClickAddBtn(false)}
          >
            취소
          </Button>{" "}
        </Col>
      </Row>
    </Form>
  );
}

export default EducationAddForm;
