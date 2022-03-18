import React from 'react';
import { Card, Row } from "react-bootstrap";

import Timeline from '@mui/lab/Timeline';

import TimeLine from "./TimeLine";

const timeList = [
    { id: 1, title: '네이버 프론트 개발', date: '03/2019'},
    { id: 2, title: '카카오 백엔드 서브 개발', date: '07/2021'},
    { id: 3, title: '넷마블 게임 기획 및 개발', date: '01/2025'},
    { id: 4, title: '쿠팡 백엔드 개발', date: '06/2028'}
]

function TimeLines () {

    return (
        <Card className="mb-2 ms-3 mr-5">
            <Card.Body>
                <Row>
                    <Card.Title>경력</Card.Title>
                </Row>
                <Timeline position="alternate">
                    <p className="text-center" style={{color: '#26547C'}}>current</p>
                    {timeList.slice(0).reverse().map((career)=>
                        <TimeLine key={career.id} career={career}/>
                    )}
                </Timeline>
            </Card.Body>
        </Card>
    )
}

export default TimeLines;