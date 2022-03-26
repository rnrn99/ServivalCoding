import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
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
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

import { DispatchContext } from "../../App";
import { sendFile, defaultImage, getImageBaseUrl } from "../../utils";
import AlertDialog from "../utils/AlertDialog";

// 스타일적용부분은 export 하단으로 옮겨 둠

function UserEditForm({ user, setIsEditing, setUser }) {
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);
  const inputRef = useRef();

  const [form, setForm] = useState({
    name: "",
    email: "",
    description: "",
  }); // 편집하고자하는 name, email, description을 form이라는 하나의 state로 관리
  const [emailPermission, setEmailPermission] = useState(true); // email 노출 여부 state
  const [descPermission, setDescPermission] = useState(true); // description 노출 여부 state
  const [userImage, setUserImage] = useState(user.profile); // 유저의 프로필 사진을 저장합니다.
  const [isDeleteAccount, setIsDeleteAccount] = useState(false); // 회원 탈퇴 버튼 클릭 여부를 저장합니다.

  const [snsURL, setSnsURL] = useState({
    github: "",
    instagram: "",
    blog: "",
  });

  const imageBaseUrl = getImageBaseUrl(); // 이미지의 baseUrl을 저장합니다.

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
      setSnsURL((cur) => {
        const newSNS = {
          ...cur,
          github: result.sns.github,
          instagram: result.sns.instagram,
          blog: result.sns.blog,
        };
        return newSNS;
      });
    });
  }, []); // 현재의 form 속의 data를 가져오며, email/description 여부도 불러온다

  const handleSubmit = async (e) => {
    e.preventDefault();

    // "users/유저id" 엔드포인트로 PUT 요청함.
    const res = await Api.put("users", {
      name: form.name,
      email: form.email,
      description: form.description,
      sns: {
        github: snsURL.github,
        instagram: snsURL.instagram,
        blog: snsURL.blog,
      },
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

  const deleteAccountBtnClick = async (isDeleting) => {
    if (isDeleting) {
      // 회원 정보를 삭제합니다.
      await Api.delete("users");
      // sessionStorage 에 저장했던 JWT 토큰을 삭제합니다.
      sessionStorage.removeItem("userToken");
      // dispatch 함수를 이용해 로그아웃함.
      dispatch({ type: "LOGOUT" });
      // 로그인 화면으로 돌아갑니다.
      navigate("/login");
    } else {
      setIsDeleteAccount(false);
    }
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
      alt="유저 사진"
      src={userImage === defaultImage ? user.profile : imageBaseUrl + userImage}
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
          <TextField
            label="git URL"
            sx={{ width: "320px" }}
            value={snsURL.github}
            onChange={(e) => setSnsURL({ ...snsURL, github: e.target.value })}
          />
          <GitHubIcon sx={iconStyles} />
        </Stack>
        <Stack style={{ display: "inline" }}>
          <TextField
            label="instar URL"
            sx={{ width: "320px" }}
            value={snsURL.instagram}
            onChange={(e) =>
              setSnsURL({ ...snsURL, instagram: e.target.value })
            }
          />
          <InstagramIcon sx={iconStyles} />
        </Stack>
        <Stack style={{ display: "inline" }}>
          <TextField
            label="blog URL"
            sx={{ width: "320px" }}
            value={snsURL.blog}
            onChange={(e) => setSnsURL({ ...snsURL, blog: e.target.value })}
          />
          <WysiwygIcon sx={iconStyles} />
        </Stack>
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        sx={{ mt: 2, justifyContent: "center" }}
      >
        <Button variant="contained" type="submit" sx={ButtonStyle.confirm} disableElevation disableRipple>
          확인
        </Button>{" "}
        <Button
          type="reset"
          onClick={() => setIsEditing(false)}
          variant="outlined"
          sx={ButtonStyle.cancel}
        >
          취소
        </Button>
      </Stack>
      <Button
        variant="text"
        startIcon={<PersonRemoveIcon />}
        sx={{ float: "right", color: "#7e7e7e" }}
        onClick={() => setIsDeleteAccount(true)}
      >
        회원 탈퇴
      </Button>
      {isDeleteAccount && (
        <AlertDialog checkDeleteComplete={deleteAccountBtnClick} />
      )}
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

const ButtonStyle = {
  confirm : { bgcolor: '#D0CE7C', color: '#31311C',
':hover': {
  bgcolor: '#b1b068',
  color: 'white',
}
},
  cancel: { border: 'solid 1px #db3f2b', color: '#db3f2b', 
':hover': {
  bgcolor: '#bd3421',
  color: 'white',
  border: '0px'
}
},
}
