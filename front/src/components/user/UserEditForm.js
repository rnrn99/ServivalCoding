import React, { useState, useEffect, useRef } from "react";
import * as Api from "../../api";

import {
  Box,
  TextField,
  Stack,
  Button,
  Avatar,
  IconButton,
  Badge,
  Switch,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";

import { sendFile, defaultImage } from "../../utils";

// 스타일적용부분은 export 하단으로 옮겨 둠

function UserEditForm({ user, setIsEditing, setUser }) {
  const inputRef = useRef();

  const [form, setForm] = useState({
    name: "",
    email: "",
    description: "",
  }); // 편집하고자하는 name, email, description을 form이라는 하나의 state로 관리
  const [emailPermission, setEmailPermission] = useState(true); // email 노출 여부 state
  const [descPermission, setDescPermission] = useState(true); // description 노출 여부 state
  const [userImage, setUserImage] = useState(user.profile);

  useEffect(() => {
    Api.get("users/current").then((res) => {
      const result = res.data.user;
      setForm((cur) => {
        const newForm = {
          ...cur,
          email: result.email,
          description: result.description,
          name: result.name,
        };
        return newForm;
      });
      setEmailPermission(result.permission.email);
      setDescPermission(result.permission.description);
    });
  }, []); // 현재의 form 속의 data를 가져오며, email/description 여부도 불러온다

  const handleSubmit = async (e) => {
    e.preventDefault();

    // "users/유저id" 엔드포인트로 PUT 요청함.
    const res = await Api.put("users", {
      name: form.name,
      email: form.email,
      description: form.description,
      permission: { email: emailPermission, description: descPermission },
      profile: userImage,
    });
    // 유저 정보는 response의 data임.
    const updatedUser = res.data.user;

    // 해당 유저 정보로 user을 세팅함.
    setUser(updatedUser);

    // isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  // 이미지 정보를 유저가 선택한 이미지로 바꿉니다.
  const setImage = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    const res = await sendFile(formData);
    setUserImage(res.data.profiles.filename);
  };

  // 아바타의 src 속성을 기본 고양이 / 유저 선택 사진 으로 설정합니다.
  const avatar = (
    <Avatar
      component="span"
      alt="Remy Sharp"
      src={
        userImage === defaultImage
          ? user.profile
          : process.env.REACT_APP_IMAGE_URL_DEV + userImage
      }
      sx={{ ...shapeStyles, ...shapeCircleStyles }}
    />
  );

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ mt: 1, width: "400px" }}
    >
      <Stack spacing={2} align="center">
        <label htmlFor="icon-button-file">
          <Input
            accept="image/*"
            id="icon-button-file"
            type="file"
            ref={inputRef}
            onChange={setImage.bind(this)}
          />
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <Badge
              color="primary"
              overlap="circular"
              badgeContent="+"
              sx={{ bgColor: "#C7A27C" }}
            >
              {avatar}
            </Badge>
          </IconButton>
        </label>
        <Stack sx={{ display: "inline" }}>
          <TextField
            required
            label="이름"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            value={form.name}
            sx={{ width: "375px" }}
          />
        </Stack>
        <Stack style={{ display: "inline" }}>
          <TextField
            disabled
            type="email"
            label="이메일"
            value={form.email}
            sx={{ width: "320px" }}
          />
          <Switch
            {...label}
            checked={emailPermission}
            onChange={(e) => setEmailPermission(e.target.checked)}
          />
        </Stack>
        <Stack style={{ display: "inline" }}>
          <TextField
            required
            label="정보, 인사말"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            value={form.description}
            sx={{ width: "320px" }}
          />
          <Switch
            {...label}
            checked={descPermission}
            onChange={(e) => setDescPermission(e.target.checked)}
          />
        </Stack>
        <Stack style={{ display: "inline" }}>
          <TextField label="git URL" sx={{ width: "320px" }} />
          <GitHubIcon sx={iconStyles} />
        </Stack>
        <Stack style={{ display: "inline" }}>
          <TextField label="instar URL" sx={{ width: "320px" }} />
          <InstagramIcon sx={iconStyles} />
        </Stack>
        <Stack style={{ display: "inline" }}>
          <TextField label="blog URL" sx={{ width: "320px" }} />
          <WysiwygIcon sx={iconStyles} />
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

const Input = styled("input")({
  display: "none",
});
const iconStyles = {
  marginLeft: "25px",
  marginTop: "15px",
  marginRight: "10px",
};
const shapeStyles = { width: 150, height: 150 };
const shapeCircleStyles = { borderRadius: "50%" };

const label = { inputProps: { "aria-label": "Switch demo" } };
