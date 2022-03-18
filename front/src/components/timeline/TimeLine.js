import React from 'react';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

function TimeLine ({project}) {
    return (
            <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot color="warning"/>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent style={{fontSize: '5px'}}>
                    [{project.date}]<br /> {project.title}
                </TimelineContent>
            </TimelineItem>

    )
}

export default TimeLine;