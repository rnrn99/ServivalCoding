import React, {useContext} from "react";
import { Button,Col } from "react-bootstrap";
import { UserStateContext } from "../../App";
import * as Api from "../../api";
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

function CareerCard ({ career, setClickEditBtn, isEditable, setCareerList }) {
    const userState = useContext(UserStateContext);
    const userId = userState.user.id;
    
    const deleteHandler = async (e) => {
        await Api.delete("careers", career.id)

        const deleteData = await Api.get('careerlist', userId)
        setCareerList(deleteData.data)
    }

    return (
      

    <TimelineItem>
        <TimelineSeparator>
            <TimelineDot color="info"/>
            <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
            <p className='text-muted' style={{fontSize: '5px'}}>[{career.date}~{career.date}]</p>
            <p style={{fontSize: '10px'}}>{career.title}</p>
            {isEditable && (
            <>
                <Button
                    variant="outline-info"
                    size="sm"
                    style={{ float: "left"}}
                    onClick={() => setClickEditBtn((cur) => !cur)}
                >
                        편집
                </Button>
                <Button
                    variant="outline-info"
                    size="sm"
                    style={{ float: "right"}}
                    onClick={deleteHandler}
                >
                    삭제
                </Button>
            </>
            )}
        </TimelineContent>
    </TimelineItem>

  );
}

export default CareerCard;