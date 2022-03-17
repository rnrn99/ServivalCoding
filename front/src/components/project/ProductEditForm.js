import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ProductEditForm() {
  const [startDate, setStartDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  return (
    <Form className="mt-3" onSubmit>
      <Row>
        <Form.Group className="mb-3">
          <Form.Control type="text" placeholder="프로젝트 제목" onChange />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control type="text" placeholder="상세내역" onChange />
        </Form.Group>
        <Row xs="auto">
          <Col>
            <DatePicker selected={startDate} />
          </Col>
          <Col>
            <DatePicker selected={dueDate} />
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
          <Button variant="secondary" type="reset" onClick>
            취소
          </Button>{" "}
        </Col>
      </Row>
    </Form>
  );
}

export default ProductEditForm;
