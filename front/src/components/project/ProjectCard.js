import React from "react";
import { Button, Row, Col } from "react-bootstrap";

function ProjectCard({ project, setClickEditBtn, isEditable }) {
  return (
    <Row>
      <Col>
        <p style={{ marginBottom: 0 }}>{project.title}</p>
        <p className="text-muted">
          {project.description} <br />
          {project.from_date} ~ {project.to_date}
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
