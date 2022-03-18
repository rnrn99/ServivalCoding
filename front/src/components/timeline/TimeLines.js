import React from 'react';
import { Card, Row } from "react-bootstrap";

import Timeline from '@mui/lab/Timeline';

import TimeLine from "./TimeLine";

const timeList = [
    { id: 1, title: 'TodoList 제작', date: '2019년'},
    { id: 2, title: '미니 게임 프로젝트', date: '07/2019'},
    { id: 3, title: '개인 웹 포트폴리오 제작', date: '01/2020'},
    { id: 4, title: 'MBTI 알아보기', date: '06/2020'}
]

function TimeLines () {

    return (
        <Card className="mb-2 ms-3 mr-5">
            <Card.Body>
                <Row>
                    <Card.Title>경력</Card.Title>
                </Row>
                <Timeline position="alternate">
                    {timeList.map((project) => 
                        <TimeLine key={project.id} project={project} />
                    )}
                </Timeline>
            </Card.Body>
        </Card>
    )
}

export default TimeLines;