import React from 'react';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

function TimeLine ({career}) {
    return (
            <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot color="success"/>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent style={{fontSize: '5px'}}>
                    [{career.date}~]<br /> {career.title}
                </TimelineContent>
            </TimelineItem>

    )
}

export default TimeLine;