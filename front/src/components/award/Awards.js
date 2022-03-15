import React, {useState, useEffect} from 'react';
import {Card, Row, Col, Button} from "react-bootstrap";
import axios from "axios";

function Awards ({portfolioOwnerId}) {
    const fake = [
        {title: '행복상', description: '행복해서 받았습니다.'},
        {title: '궁금상', description: '매 사 잘 할 수 있을까 궁금합니다.'},
        {title: '개발상', description: '미래 개발자로 거듭나겠습니다.'}
    ]
    const [awardList, setAwardList] = useState(fake)
    // useEffect(() =>
    //     axios.get('awards', portfolioOwnerId).then((res) => setAwardList(res.data))
    // )
    return (
       awardList.map((award) => 
        <div>
            <div style={{float: 'left'}}>
                <span >{award.title}</span>
                <br />
                <span class='text-muted' style={{flex: 1}}>{award.description}</span>
            </div><br />
            <div style={{float: 'right', marginRight: '15px'}}>
                <Button variant="outline-info">편집</Button>
            </div><br />
        </div>
       )
    )
}

export default Awards;