import React from "react";
import { Card, Row, Button, Col } from "react-bootstrap";

function Education() {
  return (
    <>
      <Card className="ml-3">
        <Card.Body>
          <Row>
            <Card.Title>학력</Card.Title>
          </Row>
          <Row className="text-center">
            <Col>
              <Button variant="primary">+</Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}

export default Education;
