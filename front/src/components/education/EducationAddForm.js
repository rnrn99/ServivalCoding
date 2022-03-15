import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

function EducationAddForm() {
  return (
    <Form className="mt-3">
      <Row>
        <Form.Group className="mb-3">
          <Form.Control type="text" placeholder="학교 이름" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control type="text" placeholder="전공" />
        </Form.Group>
        <Form.Group>
          <Form.Check inline type="radio" label="재학중" name="group1" />
          <Form.Check inline type="radio" label="학사졸업" name="group1" />
          <Form.Check inline type="radio" label="석사졸업" name="group1" />
          <Form.Check inline type="radio" label="박사졸업" name="group1" />
        </Form.Group>
      </Row>
      <Row className="text-center mt-3">
        <Col>
          <Button variant="primary">확인</Button>{" "}
          <Button variant="secondary">취소</Button>{" "}
        </Col>
      </Row>
    </Form>
  );
}

export default EducationAddForm;
