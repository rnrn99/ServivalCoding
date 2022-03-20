import React, {useContext, useState} from "react";
import { Button, Grid, IconButton, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    
    const deleteHandler = async (e) => {
        await Api.delete("careers", career.id)

        const deleteData = await Api.get('career-lists', userId)
        setCareerList(deleteData.data)
    }

    return (
 
        <TimelineItem>
            <TimelineSeparator>
                <TimelineDot style={{backgroundColor: '#808e95'}}/>
                <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
                <p className='text-muted' style={{fontSize: '5px', marginBottom: '2px'}}>[{career.fromDate}<br />~{career.toDate}]</p>
                <p style={{fontSize: '10px'}}>{career.title}</p>
              
            {isEditable && (
                <>
                <IconButton onClick={handleClick} sx={{ float: "right", mb: 2 }} style={{ padding: '0'}} >
                  <MoreHorizIcon />
                </IconButton>
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                 <MenuItem onClick={handleClose}>
                   <Button
                    startIcon={<EditIcon />}
                    onClick={() => setClickEditBtn((cur) => !cur)}
                   >
                    편집
                   </Button>
                 </MenuItem>  
                 <MenuItem onClick={handleClose}>
                   <Button
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={deleteHandler}
                   >
                    삭제
                   </Button>
                 </MenuItem>
                </Menu>  
                </>
          )}
      </TimelineContent>
    </TimelineItem>    
      
  );
}

export default CareerCard;