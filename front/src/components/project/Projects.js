import React, { useState, useEffect } from "react";
import { Card, Row, Button, Col } from "react-bootstrap";
import ProjectAddForm from "./ProjectAddForm";
import Project from "./Project";
import * as Api from "../../api";

function Projects({ portfolioOwnerId, isEditable }) {
  const [projects, setProjects] = useState([]); // 해당 유저의 프로젝트를 저장합니다.
  const [clickAddBtn, setClickAddBtn] = useState(false); // 프로젝트 추가 버튼 클릭 상태를 저장합니다.

  useEffect(() => {
    // "projectlist/유저id" 엔드포인트로 GET 요청을 하고, projects를 response의 data로 세팅함.
    Api.get("projectlist", portfolioOwnerId).then((res) =>
      setProjects(res.data),
    );
  }, [portfolioOwnerId]);

  return (
    <>
      <Card className="ml-3 mb-3">
        <Card.Body style={{ marginBottom: "15px" }}>
          <Row>
            <Card.Title>프로젝트</Card.Title>
          </Row>
          <Row>
            {projects.map((project) => (
              <Project
                key={project.id}
                project={project}
                setProjects={setProjects}
                isEditable={isEditable}
              />
            ))}
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
          <Row>
            {clickAddBtn && (
              <ProjectAddForm
                portfolioOwnerId={portfolioOwnerId}
                setClickAddBtn={setClickAddBtn}
                setProjects={setProjects}
              />
            )}
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}

export default Projects;
