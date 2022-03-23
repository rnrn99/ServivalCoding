import React, { useState } from "react";
import * as Api from "../../api";
import {
  Box,
  TextField,
  Stack,
  Button,
} from "@mui/material";

function UserEditForm({ user, setIsEditing, setUser }) {
  //useState로 name 상태를 생성함.
  const [name, setName] = useState(user.name);
  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState(user.email);
  //useState로 description 상태를 생성함.
  const [description, setDescription] = useState(user.description);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // "users/유저id" 엔드포인트로 PUT 요청함.
    const res = await Api.put("users", {
      name,
      email,
      description,
    });
    // 유저 정보는 response의 data임.
    const updatedUser = res.data.data;
    // 해당 유저 정보로 user을 세팅함.
    setUser(updatedUser);

    // isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Stack spacing={2}>
        <TextField
          required
          label="이름"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <TextField
          required
          type="email"
          label="이메일"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <TextField
          required
          label="정보, 인사말"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
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
