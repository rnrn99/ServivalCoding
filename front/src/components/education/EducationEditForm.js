import React, { useState, useContext } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
import { UserStateContext } from "../../App";

function EducationEditForm({ education, setEducations, setClickEditBtn }) {
  const userState = useContext(UserStateContext); // 현재 로그인된 유저의 정보를 가져옵니다.

  const [school, setSchool] = useState(education.school); // 학교 이름을 저장할 상태입니다.
  const [major, setMajor] = useState(education.major); // 전공을 저장할 상태입니다.
  const [position, setPosition] = useState(education.position); // 재학/졸업 여부를 저장할 상태입니다.

  const positionArr = ["재학중", "학사졸업", "석사졸업", "박사졸업"]; // postion을 저장하는 배열입니다.
  const user_id = userState.user.id; // 현재 로그인한 유저의 아이디를 저장합니다.

  // radio button 클릭에 따라 position을 저장합니다.
  const RadioBtnClickHandler = (e) => {
    setPosition(e.target.value);
  };

  // submit event handler 입니다.
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // 학력 변경을 위해 학교, 전공, 재학/졸업 여부를 객체로 저장합니다.
    const dataToSubmit = {
      user_id,
      school,
      major,
      position,
    };

    await Api.put(`educations/${education.id}`, dataToSubmit);

    // educationlist/유저id로 GET 요청을 보내 업데이트 사항이 반영된 학력을 새로 저장합니다.
    const res = await Api.get("educationlist", user_id);
    setEducations(res.data);

    setClickEditBtn(false);
  };

  return (
    <Form className="mt-3" onSubmit={onSubmitHandler}>
      <Row>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="학교 이름"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="전공"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          {positionArr.map((item, i) => (
            <Form.Check
              key={"position" + i}
              inline
              defaultChecked={position === item}
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
            onClick={() => setClickEditBtn(false)}
          >
            취소
          </Button>{" "}
        </Col>
      </Row>
    </Form>
  );
}

export default EducationEditForm;
