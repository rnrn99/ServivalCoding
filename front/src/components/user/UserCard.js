import React, {useState} from "react";
import { Button, Container } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import * as Api from "../../api";
import {
  Card,
  CardContent,
  Typography, 
  Box,
} from "@mui/material";
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';

function UserCard({ user, setUser, setIsEditing, isEditable, portfolioOwnerId }) {
  const [clickHeart, setClickHeart] = useState(false)
  const [heartCount, setHeartCount] = useState(0);


 const plusHeartHandler = async () => {
    setClickHeart((cur)=> !cur)
    const res = await Api.post(`users/${portfolioOwnerId}/likes`);
    console.log(res.data.data)

    const res1 = await Api.get("users", portfolioOwnerId);
    console.log(res1.data.data)
    setUser(res1.data.data)
  }

  return (
  <>
  <Card sx={{ marginBottom: "20px"}}>
    <CardContent align="center">
    <Container style={{ marginBottom: "25px" }}>
        <Avatar
          alt="Remy Sharp"
          src="http://placekitten.com/200/200"
          sx={{ width: 180, height: 180, marginTop: '15px', marginBottom: '15px'}}
        /> 
        <Typography style={{ fontWeight: "bold", fontSize: "20px" }} >{user?.name}</Typography>
        <Typography className="text-muted" style={{fontSize: "9px", marginBottom: "7px"}}>({user?.email})</Typography>
        <Typography >"{user?.description}"</Typography>
        {clickHeart 
        ? <Button
            startIcon={<Favorite />}
            onClick={plusHeartHandler}
            style={{color: "red"}}
          />
        : <Button
          startIcon={<FavoriteBorder />}
          onClick={plusHeartHandler}
          style={{color: "grey"}}
        />
        }{heartCount}
    </Container>  
      <Container sx={{paddingBottom: "0"}}>
        {isEditable && (
            <Button
              onClick={() => setIsEditing(true)}
              startIcon={<EditIcon />}
            > 편집
            </Button>
        )}
      </Container> 
    </CardContent> 
  </Card>  
  </> 
  );
}

export default UserCard;
