import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

import Datepicker from "../utils/Datepicker";

//import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";
//import { ko } from "date-fns/esm/locale";
import * as Api from "../../api";

function ProductEditForm({ project, setProjects, setClickEditBtn }) {
  const [title, setTitle] = useState(project.title); // 프로젝트 제목을 저장할 상태입니다.
  const [description, setDescription] = useState(project.description); // 프로젝트 상세내역을 저장할 상태입니다.
  const [startDate, setStartDate] = useState(new Date(project.from_date)); // 프로젝트 시작일(Date type)을 저장할 상태입니다.
  const [dueDate, setDueDate] = useState(new Date(project.to_date)); // 프로젝트 마감일(Date type)을 저장할 상태입니다.

  // Date를 YYYY-MM-DD의 문자열로 바꾸는 함수입니다.
  const dateToString = (date) => {
    return (
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      date.getDate().toString().padStart(2, "0")
    );
  };

  // submit event handler 입니다.
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Date type의 시작일, 마감일 상태를 YYYY-MM-DD의 문자열로 바꿉니다.
    const from = dateToString(startDate);
    const to = dateToString(dueDate);

    // 프로젝트 수정을 위해 프로젝트 제목, 상세내역, 시작일, 마감일을 객체로 저장합니다.
    const dataToSubmit = {
      title,
      description,
      from,
      to,
    };

    // projects/프로젝트id 로 PUT 요청을 보내 해당 프로젝트의 내용을 수정합니다.
    await Api.put(`projects/${project.id}`, dataToSubmit);

    // project-lists/유저id로 GET 요청을 보내 업데이트 사항이 반영된 프로젝트를 새로 저장합니다.
    const res = await Api.get("project-lists", project.user.id);
    setProjects(res.data);

    // 프로젝트 편집 후 EditForm을 닫아줍니다.
    setClickEditBtn(false);
  };

  return (
    <Form className="mt-3" onSubmit={onSubmitHandler}>
      <Row>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="프로젝트 제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="상세내역"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Row xs="auto">
          <Col>
            <Datepicker selected={startDate} onChange={setStartDate} />
          </Col>
          <Col>
            <Datepicker selected={dueDate} onChange={setDueDate} />
          </Col>
        </Row>
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

export default ProductEditForm;
