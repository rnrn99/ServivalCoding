import React, {useState} from 'react';
import {Card, Row, Col, Button} from "react-bootstrap";
import AwardAddForm from "./AwardAddForm";
import Awards from './Awards';

function AwardCard ({portfolioOwnerId}) {
    const [addAward, setAddAward] = useState(false);
    
    return(
    <>
      <Card className="ml-3">
        <Card.Body>
          <Row>
            <Card.Title>수상이력</Card.Title>
          </Row>
          <Row>
              <Awards portfolioOwnerId={portfolioOwnerId}/>
          </Row>
          <Row className="text-center">
            <Col>
              <Button
                variant="primary"
                onClick={()=>setAddAward(true)}>
                +
              </Button><br />  <br />  
            </Col> 
          </Row>
           {addAward&&(
            <Row>
                <AwardAddForm formController={{addAward, setAddAward}}/>
            </Row>
           )}
        </Card.Body>
      </Card>
    </>

    
    )
}

export default AwardCard;