import React, { useState, useEffect } from "react";
import { Card, Row, Button, Col } from "react-bootstrap";
import EducationAddForm from "./EducationAddForm";
import Educations from "./Educations";
import * as Api from "../../api";

function Education({ portfolioOwnerId }) {
  const [clickAddBtn, setClickAddBtn] = useState(false); // 학력 추가 버튼 클릭 상태를 저장합니다.
  const [educations, setEducations] = useState([]); // 해당 유저의 학력을 저장합니다.
  const [clickSubmitBtn, setClickSubmitBtn] = useState(false); // EducationAddForm의 확인 버튼 클릭 상태를 저장합니다.

  useEffect(() => {
    // "educationlist/유저id" 엔드포인트로 GET 요청을 하고, educations를 response의 data로 세팅함.
    Api.get("educationlist", portfolioOwnerId).then((res) =>
      setEducations(res.data),
    );
    setClickSubmitBtn(false);
  }, [portfolioOwnerId, clickSubmitBtn]);

  return (
    <>
      <Card className="ml-3">
        <Card.Body style={{ marginBottom: "15px" }}>
          <Row>
            <Card.Title>학력</Card.Title>
          </Row>
          <Row>
            <Educations educations={educations} />
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
              <EducationAddForm
                portfolioOwnerId={portfolioOwnerId}
                setClickAddBtn={setClickAddBtn}
                setClickSubmitBtn={setClickSubmitBtn}
              />
            </Row>
          )}
        </Card.Body>
      </Card>
    </>
  );
}

export default Education;
