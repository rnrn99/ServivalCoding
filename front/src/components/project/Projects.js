import React from "react";
import { Card, Row, Button, Col } from "react-bootstrap";
import ProjectAddForm from "./ProjectAddForm";
import Project from "./Project";

function Projects({ portfolioOwnerId, isEditable }) {
  return (
    <>
      <Card className="ml-3">
        <Card.Body style={{ marginBottom: "15px" }}>
          <Row>
            <Card.Title>프로젝트</Card.Title>
          </Row>
          <Row>
            <Project />
          </Row>
          <Row className="text-center">
            <Col>
              <Button variant="primary">+</Button>
            </Col>
          </Row>
          <Row>
            <ProjectAddForm />
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}

export default Projects;
