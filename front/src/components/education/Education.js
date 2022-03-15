import React, { useState, useEffect } from "react";
import { Card, Row, Button, Col } from "react-bootstrap";
import EducationAddForm from "./EducationAddForm";
import * as Api from "../../api";

function Education({ portfolioOwnerId }) {
  // 학력 추가 버튼 클릭 상태를 저장합니다.
  const [clickAddBtn, setClickAddBtn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // "users/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
    Api.get("users", portfolioOwnerId).then((res) => setUser(res.data));
  }, [portfolioOwnerId]);

  return (
    <>
      <Card className="ml-3">
        <Card.Body>
          <Row>
            <Card.Title>학력</Card.Title>
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
              <EducationAddForm user={user} setClickAddBtn={setClickAddBtn} />
            </Row>
          )}
        </Card.Body>
      </Card>
    </>
  );
}

export default Education;
