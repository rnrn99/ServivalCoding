import React, {useState, useEffect} from 'react';
import {Card, Row, Col, Button} from "react-bootstrap";
import axios from "axios";

// 실제 수상이력리스트를 메인컴포넌트에서 받아 뿌려주는 기능을 하는 컴포넌트로, {awardList}를 prop로 넘겨받음 
//**float 기능을 쓰지 않고 버튼과 수상내역 영역을 나눠 쓰고 싶습니다. (flex 적용 불가..) */
function Award ({awardList}) {
    
    return (
       awardList.map((award) => 
        <div>
            <div style={{float: 'left'}}>
                <span >{award.title}</span>
                <br />
                <span class='text-muted'>{award.description}</span>
            </div><br />
            <div style={{float: 'right', marginRight: '15px'}}>
                <Button variant="outline-info">편집</Button>
            </div><br />
        </div>
       )
    )
}

export default Award;
