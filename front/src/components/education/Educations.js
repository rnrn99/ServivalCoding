import React from "react";
import { Button, Row, Col } from "react-bootstrap";

function Educations({ educations }) {
  return educations.map((edu) => (
    <Row>
      <Col>
        <p style={{ marginBottom: "5px" }}>{edu.school}</p>
        <p class="text-muted">
          {edu.major} ({edu.position})
        </p>
      </Col>
      <Col>
        <Button
          variant="outline-info"
          size="sm"
          style={{ float: "right", margin: "10px 15px 0 0" }}
        >
          편집
        </Button>
      </Col>
    </Row>
  ));
}

export default Educations;
