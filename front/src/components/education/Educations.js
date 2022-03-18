import React, { useState, useEffect } from "react";
import { Card, Row, Button, Col, Accordion } from "react-bootstrap";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import EducationAddForm from "./EducationAddForm";
import Education from "./Education";
import * as Api from "../../api";

function Educations({ portfolioOwnerId, isEditable }) {
  const [educations, setEducations] = useState([]); // 해당 유저의 학력을 저장합니다.
  const [clickAddBtn, setClickAddBtn] = useState(false); // 학력 추가 버튼 클릭 상태를 저장합니다.

  useEffect(() => {
    // "educationlist/유저id" 엔드포인트로 GET 요청을 하고, educations를 response의 data로 세팅함.
    Api.get("educationlist", portfolioOwnerId).then((res) =>
      setEducations(res.data),
    );
  }, [portfolioOwnerId]);

  const AddFormToggle = ({ children, eventKey }) => {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      setClickAddBtn((cur) => !cur),
    );

    return (
      <Button
        variant={clickAddBtn ? "secondary" : "primary"}
        onClick={decoratedOnClick}
      >
        {children}
      </Button>
    );
  };

  return (
    <>
      <Accordion defaultActiveKey={["0"]} alwaysOpen>
        <Card className="ml-3 mb-3">
          <Accordion.Item eventKey="0" style={{ border: "none" }}>
            <Accordion.Header>
              <Card.Title>학력</Card.Title>
            </Accordion.Header>
            <Accordion.Body>
              {educations.map((edu) => (
                <Education
                  key={edu.id}
                  education={edu}
                  setEducations={setEducations}
                  isEditable={isEditable}
                />
              ))}
            </Accordion.Body>
          </Accordion.Item>

          <Card.Body style={{ marginBottom: "15px" }}>
            <Row className="text-center">
              <Col>
                {isEditable && (
                  <AddFormToggle eventKey="1">
                    {clickAddBtn ? " - " : " + "}
                  </AddFormToggle>
                )}
              </Col>
            </Row>
            <Accordion.Collapse eventKey="1">
              <EducationAddForm
                portfolioOwnerId={portfolioOwnerId}
                setClickAddBtn={setClickAddBtn}
                setEducations={setEducations}
              />
            </Accordion.Collapse>
          </Card.Body>
        </Card>
      </Accordion>
    </>
  );
}

export default Educations;
