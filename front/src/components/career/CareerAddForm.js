import React, {useContext, useState} from 'react';
import { Form, Button, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { UserStateContext } from "../../App";
import * as Api from "../../api";

function CareerAddForm ({portfolioOwnerId, setCareerList, setClickAddBtn}) {
    const [title, setTitle] = useState(""); // 경력 사항을 저장할 상태입니다.
    const [startDate, setStartDate] = useState(new Date()); // 경력 시작일(Date type)을 저장할 상태입니다.
    const [dueDate, setDueDate] = useState(new Date()); // 경력 마감일(Date type)을 저장할 상태입니다.

    const userState = useContext(UserStateContext);
    const userId = userState.user.id;

      // Date를 YYYY-MM-DD의 문자열로 바꾸는 함수입니다.
    const dateToString = (date) => {
        return (
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1).toString().padStart(2, "0") +
        "-" +
        date.getDate().toString().padStart(2, "0")
        );
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
    
        // Date type의 시작일, 마감일 상태를 YYYY-MM-DD의 문자열로 바꿉니다.
        const fromDate = dateToString(startDate);
        const toDate = dateToString(dueDate);
    
        // 프로젝트 추가를 위해 유저 id, 프로젝트 제목, 상세내역, 시작일, 마감일을 객체로 저장합니다.
        const uptCareerData = {
          userId,
          title,
          fromDate,
          toDate,
        };
    
        // career/create로 POST 요청을 보냅니다.
        await Api.post("career/create", uptCareerData);
    
        // careerlist/유저id로 GET 요청을 보내 업데이트 사항이 반영된 프로젝트를 새로 저장합니다.
        const res = await Api.get("careerlist", portfolioOwnerId);
            setCareerList(res.data);
    
        // 프로젝트 추가 후 ProjectAddForm을 닫습니다.
        setClickAddBtn(false);
      };
    

    return (
        <Form className="mt-3" onSubmit={onSubmitHandler}>
            <Row>
                <Row xs="auto">
                    <p>시작 :</p>
                    <DatePicker
                    locale={ko}
                    dateFormat="MM/dd/yyyy"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    />
                    <br />
                    <p>종료 :</p> 
                    <DatePicker
                    locale={ko}
                    dateFormat="MM/dd/yyyy"
                    selected={dueDate}
                    onChange={(date) => setDueDate(date)}
                    className="mt-1"
                    />
                </Row>
                <Form.Group className="mt-3">
                <Form.Control
                    type="text"
                    placeholder="경력 사항"
                    onChange={(e) => setTitle(e.target.value)}
                />
                </Form.Group>
            </Row>
            <Row className="text-center mt-3">
                <Col>
                <Button
                    variant="primary"
                    type="submit"
                    style={{ marginRight: "1rem" }}
                >
                    확인
                </Button>{" "}
                <Button
                    variant="secondary"
                    type="reset"
                    onClick={() => setClickAddBtn(false)}
                >
                    취소
                </Button>{" "}
                </Col>
            </Row>
        </Form>
    )
}

export default CareerAddForm;