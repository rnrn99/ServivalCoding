import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";

function EducationAddForm({ portfolioOwnerId, setClickAddBtn, setEducations }) {
  const [school, setSchool] = useState(""); // 학교 이름을 저장할 상태입니다.
  const [major, setMajor] = useState(""); // 전공을 저장할 상태입니다.
  const [position, setPosition] = useState(""); // 재학/졸업 여부를 저장할 상태입니다.

  // postion을 저장하는 배열입니다.
  const positionArr = ["재학중", "학사졸업", "석사졸업", "박사졸업"];

  // radio button 클릭에 따라 position을 저장합니다.
  const RadioBtnClickHandler = (e) => {
    setPosition(e.target.value);
  };

  // submit event handler 입니다.
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // 학력 추가를 위해 유저 아이디, 학교, 전공, 재학/졸업 여부를 객체로 저장합니다.
    const dataToSubmit = {
      userId: portfolioOwnerId,
      school,
      major,
      position,
    };

    // educations로 POST 요청을 보냅니다.
    await Api.post("educations", dataToSubmit);

    // education-lists/유저id로 GET 요청을 보내 업데이트 사항이 반영된 학력을 새로 저장합니다.
    const res = await Api.get("education-lists", portfolioOwnerId);
    setEducations(res.data);

    // 학력 추가 후 EducationAddForm을 닫습니다.
    setClickAddBtn(false);
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
          {positionArr.map((item, i) => (
            <Form.Check
              key={"position" + i}
              inline
              type="radio"
              label={item}
              value={item}
              name="group1"
              onClick={RadioBtnClickHandler}
            />
          ))}
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
