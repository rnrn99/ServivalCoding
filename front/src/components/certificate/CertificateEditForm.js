import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";

const CertificateEditForm = (props) => {

    const [title, setTitle] = useState(props.title);
    const [description, setDescription] = useState(props.description);
    const [when_date, setWhen_Date] = useState(props.when_date);

    const handleClick = (e) => {
        //PUT 요청을위해 변경된 정보를 Certificate 모듈로 전달.
        e.preventDefault();
        console.log("Editform에서 버튼이 눌렸습니다.");
        if (e.target.name === "accept") {
            console.log("완료 버튼이 눌렸습니다.");
            props.checkEdited(true, { title, description, when_date });
        } else {
            console.log("취소 버튼이 눌렸습니다.");
            props.checkEdited(false, {});
        }

    };

    return (
        <Form>
            <Form.Group as={Row} className="mb-3">
                <Form.Control
                    type="text"
                    value={title}
                    placeholder="자격증을 입력하세요."
                    onChange={(e) => { setTitle(e.target.value) }} />
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Control
                    type="text"
                    value={description}
                    placeholder="자격증 설명, 발급기관을 입력해주세요."
                    onChange={(e) => { setDescription(e.target.value) }} />
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Control
                    type="text"
                    value={when_date}
                    placeholder="취득일자를 2099-01-22 과 같은 형식으로 입력하세요."
                    onChange={(e) => { setWhen_Date(e.target.value) }} />
            </Form.Group>
            <Row>
                <Col />
                <Col><Button name="accept" onClick={handleClick}>완료</Button></Col>
                <Col><Button name="cancel" onClick={handleClick}>취소</Button></Col>
                <Col />
            </Row>
        </Form>
    );
};

export default CertificateEditForm;