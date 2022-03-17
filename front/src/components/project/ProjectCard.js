import React from "react";
import { Button, Row, Col } from "react-bootstrap";

function ProjectCard() {
  return (
    <Row>
      <Col>
        <p style={{ marginBottom: 0 }}>프로젝트이름</p>
        <p className="text-muted">
          상세내역 <br />
          기간
        </p>
      </Col>
      <Col>
        <Button
          variant="outline-info"
          size="sm"
          style={{ float: "right", margin: "20px 15px 0 0" }}
        >
          편집
        </Button>
      </Col>
    </Row>
  );
}

export default ProjectCard;
