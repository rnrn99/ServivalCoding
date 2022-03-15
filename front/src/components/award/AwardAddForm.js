import React from 'react';
import {Form, Button, Row, Col} from 'react-bootstrap';

function AwardAddForm ({formController}) {
    const {setAddAward} = formController;

    return(
        <Form onSubmit={(e)=> e.preventDefault()}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="email" placeholder="수상내역" />
            </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control type="password" placeholder="상세내역" />
        </Form.Group>
        <Row className="text-center">
            <Col>
                <Button variant="primary" type="submit" style={{marginRight: '10px'}}>
                    확인
                </Button>{' '}     
                <Button variant="secondary" type="button" onClick={()=>setAddAward(false)} >
                    취소
                </Button>
            </Col>
        </Row>
        </Form>

    )
}

export default AwardAddForm;