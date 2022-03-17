import React, { useState, useEffect } from "react";
import { Card, Row, Button, Col } from "react-bootstrap";
import ProjectAddForm from "./ProjectAddForm";
import Project from "./Project";
import * as Api from "../../api";

function Projects({ portfolioOwnerId, isEditable }) {
  const [projects, setProjects] = useState([]); // 해당 유저의 프로젝트를 저장합니다.
  const [clickAddBtn, setClickAddBtn] = useState(false); // 프로젝트 추가 버튼 클릭 상태를 저장합니다.

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
              {isEditable && (
                <Button
                  variant="primary"
                  onClick={() => setClickAddBtn((cur) => !cur)}
                >
                  +
                </Button>
              )}
            </Col>
          </Row>
          <Row>{clickAddBtn && <ProjectAddForm />}</Row>
        </Card.Body>
      </Card>
    </>
  );
}

export default Projects;
