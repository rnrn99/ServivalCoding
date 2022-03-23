import React, {useState, useEffect} from "react";
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
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import WysiwygIcon from '@mui/icons-material/Wysiwyg'; // 정녕 블로그 아이콘이 없답니까../
// import Link from '@material-ui/core/Link'; // 추가 설치 드 가야합니다.. > 아이콘에 링크 두려면(깃헙, 블로그, 인스타 등)

function UserCard({ user, setUser, setIsEditing, isEditable, portfolioOwnerId }) {
  const [clickHeart, setClickHeart] = useState(false);
  const [heartCount, setHeartCount] = useState(0);

  useEffect(()=>{
    Api.get("users", portfolioOwnerId).then((res)=> {
      setUser(res.data.data)
      setHeartCount(res.data.data.like.count)
      setClickHeart(res.data.data.isLikedByThisUser)
    })
  }, [portfolioOwnerId]);

  const onHeartHandler = async () => {

      await Api.post(`users/${user.id}/likes`);

      const res = await Api.get("users", portfolioOwnerId);
        setUser(res.data.data)
        setHeartCount(res.data.data.like.count)
        setClickHeart(res.data.data.isLikedByThisUser)
  }


  return (
  <>
  <Card sx={{ marginBottom: "20px"}}>
    <CardContent align="center">
    <Container style={{ marginBottom: "25px" }}>
        <Avatar
          alt="Remy Sharp"
          src='http://placekitten.com/200/200'
          sx={{ width: 180, height: 180, marginTop: '15px', marginBottom: '15px', border: '3px double #9999A1' }}
        /> 
        <Typography style={{ fontWeight: "bold", fontSize: "22px" }} >{user?.name}</Typography>
        <Typography className="text-muted" style={{fontSize: "13px", marginBottom: "12px"}}>({user?.email})</Typography>
        <Typography >"{user?.description}"</Typography>
    </Container> 
    <Container className="text-muted" style={{fontSize: "12px"}} >
        <Button
            startIcon={clickHeart? <Favorite /> : <FavoriteBorder />}
            onClick={onHeartHandler}
            style={clickHeart? {color: "red", minWidth: "0", paddingRight: '0'} : {color: "grey", minWidth: "0", paddingRight: '0'} }
        /> 
        <Typography style={{display: 'inline', fontSize: "13px", margin: "0" }}>{heartCount}명이 좋아합니다</Typography>
    </Container>
    <Container sx={{ marginBottom: "10px"}}>
            <GitHubIcon sx={{ marginRight: "4px"}}/>
            <InstagramIcon sx={{ marginRight: "3px"}}/>
            <WysiwygIcon/>
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
