import React, {useState, useContext} from 'react';
import {Card, Row, Col, Button} from "react-bootstrap";
import AwardEditForm from './AwardEditForm';
import { UserStateContext } from "../../App";
import * as Api from "../../api";


// 뿌려지는 수상이력 개별이 갖는 구조 컨퍼넌트 입니다. 
function Award ({award, isEditable, setAwardLists}) {
    // 편집 버튼 클릭 시, AwardEditForm이 활성화 되도록 하는 state 입니다. 
    const [isEditing, setIsEditing] = useState(false);
    const userState = useContext(UserStateContext);
    const user_id = userState.user.id;

    const deleteHandler = async (e) => {
        await Api.delete("awards", award.id)

        const deleteData = await Api.get('awardlist', user_id)
        setAwardLists(deleteData.data)
    }



    return (
         <>  
         {isEditing
          ? (
            <AwardEditForm award={award} isEditable={isEditable} setIsEditing={setIsEditing} setAwardLists={setAwardLists}/>
            )
          :(   
            <Row className="align-items-center">
                <Col>
                    <p style={{ marginBottom: "5px" }}>{award.title}</p>
                    <p className='text-muted'>{award.description}</p>
                </Col> 
                {isEditable&&
                    <Col xs lg="1">
                        <Button variant="outline-info" size="sm" className="mr-3" onClick={()=>setIsEditing(true)}>편집</Button>
                        <Button variant="outline-danger" size="sm" className="mr-3" onClick={deleteHandler}>삭제</Button>  
                    </Col>
                }
            </Row>
            )}
        </>
    )
    
}

export default Award;
