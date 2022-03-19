import React,{useState, useEffect} from 'react';
import { Card, Row, Col, Button} from "react-bootstrap";
import * as Api from "../../api";

import Timeline from '@mui/lab/Timeline';

import Career from "./Career";
import CareerAddForm from "./CareerAddForm";

const timeList = [
    { id: 1, title: '네이버 프론트 개발', date: '03/2019'},
    { id: 2, title: '카카오 백엔드 서브 개발', date: '07/2021'},
    { id: 3, title: '넷마블 게임 기획 및 개발', date: '01/2025'},
    { id: 4, title: '쿠팡 백엔드 개발', date: '06/2028'}
]

function Careers ({ portfolioOwnerId, isEditable }) {
    const [careerList, setCareerList] = useState(timeList); // 해당 유저의 경력 리스트를 저장합니다.
    const [clickAddBtn, setClickAddBtn] = useState(false); // 경력 추가 버튼 클릭 상태를 저장합니다.

    useEffect(() => {
        // "careerList/유저id" 엔드포인트로 GET 요청을 하고, educations를 response의 data로 세팅함.
        Api.get("careerList", portfolioOwnerId).then((res) =>
            setCareerList(res.data),
        );
      }, [portfolioOwnerId]);


    return (
        <Card className="mb-2 ms-3 mr-5">
            <Card.Body>
                <Row>
                    <Card.Title>경력</Card.Title>
                </Row>
                <Row>
                <Timeline position="alternate">
                    <p className="text-center" style={{color: '#b0bec5'}}>current</p>
                    {careerList.slice(0).reverse().map((career)=>
                        <Career key={career.id} career={career} setCareerList={setCareerList} isEditable={isEditable} />
                    )}
                </Timeline>
                </Row>
                <Row className="text-center">
                    <Col>
                    {isEditable && (
                        <Button
                        variant="primary"
                        onClick={() => setClickAddBtn((cur) => !cur)}
                        >
                        +
                        </Button>
                    )}
                    </Col>
                </Row>
                <Row>
                    {clickAddBtn && (
                    <CareerAddForm
                        portfolioOwnerId={portfolioOwnerId}
                        setClickAddBtn={setClickAddBtn}
                        setCareerList={setCareerList}
                    />
                    )}
                </Row>
            </Card.Body>
        </Card>
    )
}

export default Careers;