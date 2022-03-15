import React from 'react';
import {Form, Button} from 'react-bootstrap';

function AwardAddForm ({addAward, setAddAward}) {

    return(
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="email" placeholder="수상내역" />
            </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control type="password" placeholder="상세내역" />
        </Form.Group>
        <Button variant="primary" type="submit">
            확인
        </Button>
        <Button variant="primary" type="submit" onClick={()=>setAddAward(false)}>
            취소
        </Button>
        </Form>

    )
}

export default AwardAddForm;