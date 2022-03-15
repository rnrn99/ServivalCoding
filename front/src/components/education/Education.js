import React, { useState } from "react";
import { Card, Row, Button, Col } from "react-bootstrap";
import EducationAddForm from "./EducationAddForm";

function Education() {
  // 학력 추가 버튼 클릭 상태를 저장합니다.
  const [clickAddBtn, setClickAddBtn] = useState(false);

  return (
    <>
      <Card className="ml-3">
        <Card.Body>
          <Row>
            <Card.Title>학력</Card.Title>
          </Row>
          <Row className="text-center">
            <Col>
              <Button
                variant="primary"
                onClick={() => setClickAddBtn((cur) => !cur)}
              >
                +
              </Button>
            </Col>
          </Row>
          {clickAddBtn && (
            <Row>
              <EducationAddForm />
            </Row>
          )}
        </Card.Body>
      </Card>
    </>
  );
}

export default Education;
