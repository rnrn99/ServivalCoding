import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";


const CertificateAddForm = ({ checkAddComplete }) => {
    console.log("CertificateAddForm 불러왔습니다.")
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [when_date, setWhen_date] = useState("");

    const handleClick = (e) => {
        e.preventDefault();
        //서버에 post 요청을 하고 갱신. 
        const isAccepted = (e.target.name === "accept") ? true : false;

        if (isAccepted) {
            console.log("추가하기 완료 버튼이 눌렸습니다.");
            checkAddComplete({ title, description, when_date });
        } else {
            console.log("추가하기 취소 버튼이 눌렸습니다.");
            checkAddComplete(null);
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
                    onChange={(e) => { setWhen_date(e.target.value) }} />
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

export default CertificateAddForm;