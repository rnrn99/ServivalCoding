import React, {useState} from 'react';
import {Form, Button, Row, Col} from 'react-bootstrap';
import axios from 'axios';

// 수상이력 추가 컴포넌트로 {폼 활성화 여부 state}, {user.id}, {리스트 업데이트 함수}를 props로 받아옵니다. 
function AwardAddForm ({formController, portfolioOwnerId, setAwardList}) {
    // 수상내역, 상세내역 state 
    const [award, setAward] = useState('');
    const [awardDt, setAwardDt] = useState('');
    // **확인 버튼 시, 보내질 form data 형식&내용 ** 확인버튼 구현 예정 (submit)
    const uptAwardData = {
        userId: portfolioOwnerId,
        title: award,
        description: awardDt,
    }
    // ** 데이터를 보내고, ** 수정 ** 보낸 데이터를 기존 리스트에 추가 후, setAwardList에 업데이트 해야함 
    axios.post('award/create', uptAwardData).then((res)=>setAwardList(res.data))

    // { 폼 활성화 여부 state에서 함수만 쓸 예정 }
    const {setAddAward} = formController;

    return(
        <Form onSubmit={(e)=> e.preventDefault()}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="email" placeholder="수상내역" value={award} onChange={(e)=>setAward(e.target.value)}/>
            </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control type="password" placeholder="상세내역" value={awardDt} onChange={(e)=>setAwardDt(e.target.value)}/>
        </Form.Group>
        <Row className="text-center">
            <Col>
                <Button variant="primary" type="submit" style={{marginRight: '10px'}}>
                    확인
                </Button>{' '}     
                <Button variant="secondary" type="button" onClick={()=>setAddAward(false)} >
                    취소
                </Button>
            </Col>
        </Row>
        </Form>

    )
}

export default AwardAddForm;