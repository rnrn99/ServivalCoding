import React, { useState } from 'react';
import {Form, Row, Col, Button} from "react-bootstrap";

function AwardEditForm ({award, isEditable, setIsEditing}){


    return(

            <Form onSubmit={(e)=> e.preventDefault()}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="text" placeholder={award.title} value={award.title} onChange={(e)=>""}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="text" class='text-muted' placeholder={award.description} value={award.description} onChange={(e)=>""}/>
                </Form.Group>
                <Row className="text-center" style={{marginBottom: '20px'}}>
                    <Col>
                        <Button variant="primary" type="submit" style={{marginRight: '10px'}}>
                            확인
                        </Button>{' '}     
                        <Button variant="secondary" type="button" onClick={()=>setIsEditing(false)} >
                            취소
                        </Button>
                     </Col>
                </Row>
            </Form> 
            
    )
}

export default AwardEditForm;