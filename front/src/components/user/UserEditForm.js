import React, { useState } from "react";
import * as Api from "../../api";
import Avatar from '@mui/material/Avatar';
import {
  Box,
  TextField,
  Stack,
  Button,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Switch from '@mui/material/Switch';
// 스타일적용부분은 export 하단으로 옮겨 둠


function UserEditForm({ user, setIsEditing, setUser }) {
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    description: user.description
  })
  //useState로 name 상태를 생성함.
  // const [name, setName] = useState(user.name);
  //useState로 email 상태를 생성함.
  // const [email, setEmail] = useState(user.email);
  //useState로 description 상태를 생성함.
  // const [description, setDescription] = useState(user.description);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // "users/유저id" 엔드포인트로 PUT 요청함.
    const res = await Api.put("users", {
      name: form.name,
      email: form.email,
      description: form.description
    });
    // 유저 정보는 response의 data임.
    const updatedUser = res.data.data;
    // 해당 유저 정보로 user을 세팅함.
    setUser(updatedUser);

    // isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '400px' }}>
      <Stack spacing={2} align="center" >
        <label htmlFor="icon-button-file">
        <Input accept="image/*" id="icon-button-file" type="file" />
          <IconButton color="primary" aria-label="upload picture" component="span" >
            <Badge  overlap="circular" badgeContent="+" style={{ bgColor: '#C7A27C'}}>
              {avatar}
            </Badge>
        </IconButton>
        </label>
        <Stack style={{display: "inline"}} >
          <TextField
            required
            label="이름"
            onChange={(e) => setForm({...form, name: e.target.value})}
            value={form.name}
            sx={{ width: '320px'}}
          />
          <Switch {...label} defaultChecked onChange={(e)=>console.log(e.target.checked)}/>
        </Stack>
        <Stack style={{display: "inline"}}>
          <TextField
            readOnly
            type="email"
            label="이메일"
            value={form.email}
            sx={{ width: '320px'}}
          />
          <Switch {...label} defaultChecked onChange={(e)=>console.log(e.target.checked)}/>
        </Stack>
        <Stack style={{display: "inline"}}>
          <TextField
            required
            label="정보, 인사말"
            onChange={(e) => setForm({...form, description: e.target.value})}
            value={form.description}
            sx={{ width: '320px'}}
          />
          <Switch {...label} defaultChecked onChange={(e)=>console.log(e.target.checked)}/>
        </Stack>
      </Stack>  
      <Stack
        direction="row"
        spacing={2}
        sx={{ mt: 2, justifyContent: "center" }}
      >
        <Button variant="contained" type="submit">
          확인
        </Button>{" "}
        <Button
          type="reset"
          onClick={() => setIsEditing(false)}
          variant="outlined"
        >
          취소
        </Button>
      </Stack>
  </Box> 
  );
}

export default UserEditForm;

const Input = styled('input')({
  display: 'none',
});

const shapeStyles = { width: 150, height: 150 };
const shapeCircleStyles = { borderRadius: '50%' };
const avatar = (
  <Avatar
    component="span"
    alt="Remy Sharp"
    src='http://placekitten.com/200/200'
    sx={{ ...shapeStyles, ...shapeCircleStyles }}
  />
);

const label = { inputProps: { 'aria-label': 'Switch demo' } };
