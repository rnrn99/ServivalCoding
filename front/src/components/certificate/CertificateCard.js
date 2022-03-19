import React from "react";
import { Button, Row, Col } from "react-bootstrap";

const CertificateCard = ({
  isEditable,
  checkEditing,
  checkDeleting,
  title,
  description,
  date,
}) => {
  //isEditing <<부모 Certificate 한테 전달해줘야함.
  const handleClick = (e) => {
    //수정하기 버튼이 눌린 것이므로
    //isEditing <<부모 Certificate 한테 전달해줘야함. true값을 전달.
    e.preventDefault();
    if (e.target.name === "edit") {
      console.log("수정하기 버튼이 눌렸습니다.");
      checkEditing(true);
    } else {
      //삭제 버튼이 눌렸다면
      checkDeleting(true);
    }
  };
  return (
    <Row>
      <Col>자격사항: {title}</Col>
      <Col>{description}</Col>
      <Col>취득일자 : {date}</Col>
      <Col>
        {isEditable && (
          <Button name="edit" onClick={handleClick}>
            수정하기
          </Button>
        )}
      </Col>
      <Col>
        {isEditable && (
          <Button name="delete" onClick={handleClick}>
            삭제하기
          </Button>
        )}
      </Col>
    </Row>
  );
};

export default CertificateCard;
