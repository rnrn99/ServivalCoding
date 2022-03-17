import React from "react";
import { Button, Row, Col } from "react-bootstrap";

const CertificateCard = ({isEditable, checkEditing, title, description, when_date}) => {
    //isEditing <<부모 Certificate 한테 전달해줘야함.
    const handleClick = (e) => {
        //수정하기 버튼이 눌린 것이므로 
        //isEditing <<부모 Certificate 한테 전달해줘야함. true값을 전달.
        e.preventDefault();
        console.log("수정하기 버튼이 눌렸습니다.");
        checkEditing(true);
    }
    return (
        <Row>
            <Col>자격사항: {title}</Col>
            <Col>{description}</Col>
            <Col>취득일자 : {when_date}</Col>
            <Col>
                {isEditable && (<Button onClick={handleClick}>수정하기</Button>)}
            </Col>
            
        </Row>
    );
};

export default CertificateCard;