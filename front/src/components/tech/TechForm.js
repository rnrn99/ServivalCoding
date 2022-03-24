//기술스택 입력 수정 폼

import React, { useState } from "react";
import { Box, TextField, Stack, Button } from "@mui/material";
import TagsInput from "./TagsInput";

const TechForm = ({ checkAddComplete }) => {
  const [title, setTitle] = useState("Languages");
  const [description, setDescription] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (e.target.name === "cancel") {
      checkAddComplete(null);
    } else {
      checkAddComplete({ title, description });
    }
  };

  function handleSelecetedTags(items) {
    console.log(items);
  }

  return (
    <Box component="form" onSubmit={onSubmitHandler} sx={{ mt: 1 }}>
      <Stack spacing={2}>
        <Stack
          direction="row"
          spacing={2}
          sx={{ mt: 2, justifyContent: "center" }}
        >
          <Button name="accept" variant="contained" type="submit">
            완료
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

/*

      <TagsInput
          selectedTags={handleSelecetedTags}
          fullWidth
          variant="outlined"
          id="languages"
          name="languages"
          placeholder="주로 사용하는 언어를 태깅해보세요."
          label="Languages"
        />

        <TagsInput
          selectedTags={handleSelecetedTags}
          fullWidth
          variant="outlined"
          id="frameworks"
          name="frameworks"
          placeholder="주로 사용하는 프레임웍을 태깅해보세요."
          label="Frameworks"
        />

        <TagsInput
          selectedTags={handleSelecetedTags}
          fullWidth
          variant="outlined"
          id="tools"
          name="tools"
          placeholder="주로 사용하는 개발 도구를 태깅해보세요."
          label="tools"
        />



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

        
*/
