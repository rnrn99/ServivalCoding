//기술스택 입력 수정 폼

import React, { useState } from "react";
import { Box, TextField, Stack, Button } from "@mui/material";

const TechForm = ({ checkAddComplete }) => {
  const [title, setTitle] = useState("Languages");
  const [description, setDescription] = useState("");

  // Date를 YYYY-MM-DD의 문자열로 바꾸는 함수입니다. 지유님꺼 업어옴

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // Date type의 시작일, 마감일 상태를 YYYY-MM-DD의 문자열로 바꿉니다.
    //const strDate = dateToString(date);

    //서버에 post 요청을 하고 갱신.
    // const isAccepted = accept;

    if (e.target.name === "cancel") {
      checkAddComplete(null);
    } else {
      checkAddComplete({ title, description });
    }
  };

  return (
    <Box component="form" onSubmit={onSubmitHandler} sx={{ mt: 1 }}>
      <Stack spacing={2}>
        <TextField
          label="보유 기술 - 개발언어"
          required
          onChange={(e) => setTitle(e.target.value)}
          sx={{ width: "60ch" }}
        />
        <TextField
          label="항목"
          required
          onChange={(e) => setDescription(e.target.value)}
        />

        <Stack
          direction="row"
          spacing={2}
          sx={{ mt: 2, justifyContent: "center" }}
        >
          <Button name="accept" variant="contained" type="submit">
            확인
          </Button>{" "}
          <Button
            name="cancel"
            type="reset"
            onClick={onSubmitHandler}
            variant="outlined"
          >
            취소
          </Button>{" "}
        </Stack>
      </Stack>
    </Box>
  );
};

export default TechForm;
