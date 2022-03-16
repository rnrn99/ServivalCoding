import React, { useState } from 'react';
import {Form, Row, Col, Button} from "react-bootstrap";

function AwardEditForm ({award}){
    const [ingEdit, setIngEdit] = useState(false);

    const editFormHandler = () => {
        setIngEdit(true);
    }

    return(
        <>
        {ingEdit
         ? (
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
                        <Button variant="secondary" type="button" onClick={()=>setIngEdit(false)} >
                            취소
                        </Button>
                     </Col>
                </Row>
            </Form>
        )
        : (
            <div>
                <div style={{float: 'left'}}>
                    <span >{award.title}</span>
                    <br />
                    <span class='text-muted'>{award.description}</span>
                </div><br />
                <div style={{float: 'right', marginRight: '15px'}}>
                    <Button variant="outline-info" onClick={editFormHandler}>편집</Button>
                </div><br />
            </div>
            ) 
        }
        </>  
            
    )
}

export default AwardEditForm;