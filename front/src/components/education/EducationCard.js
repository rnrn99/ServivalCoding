import React from "react";
import { Button, Row, Col } from "react-bootstrap";

function EducationCard({ education, setClickEditBtn, isEditable }) {
  return (
    <Row>
      <Col>
        <p style={{ marginBottom: "5px" }}>{education.school}</p>
        <p className="text-muted">
          {education.major} ({education.position})
        </p>
      </Col>
      <Col>
        {isEditable && (
          <Button
            variant="outline-info"
            size="sm"
            style={{ float: "right", margin: "10px 15px 0 0" }}
            onClick={() => setClickEditBtn((cur) => !cur)}
          >
            편집
          </Button>
        )}
      </Col>
    </Row>
  );
}

export default EducationCard;
