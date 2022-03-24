//기술스택 입력 수정 폼

import React, { useState } from "react";
import { Box, Stack, Button } from "@mui/material";
import PropTypes from "prop-types";

import TagsInput from "./TagsInput";

const TechForm = ({ techs, checkAddComplete }) => {
  //const [title, setTitle] = useState("Languages");
  //const [description, setDescription] = useState("");
  const [favorite, setFavorite] = useState(techs.favorite);
  const [confident, setConfident] = useState(techs.confident);
  const [languages, setLanguages] = useState(techs.languages.list);
  const [frameworks, setFrameworks] = useState(techs.frameworks.list);
  const [tools, setTools] = useState(techs.tools.list);

  //완료되었을때 데이터 techs로 전달
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (e.target.name === "cancel") {
      checkAddComplete(null);
    } else {
      checkAddComplete({
        favorite: favorite,
        confident: confident,
        languages: { list: [...languages] },
        frameworks: { list: [...frameworks] },
        tools: { list: [...tools] },
      });
    }
  };
  function handleSelecetedFavorite(items) {
    setFavorite(items[0]);
  }
  function handleSelecetedConfident(items) {
    setConfident(items[0]);
  }
  function handleSelecetedLanguages(items) {
    setLanguages(items);
  }
  function handleSelecetedFrameworks(items) {
    setFrameworks(items);
  }
  function handleSelecetedTools(items) {
    setTools(items);
  }
  return (
    <Box
      component="form"
      onSubmit={onSubmitHandler}
      sx={{ mt: 1, width: "60ch" }}
    >
      <Stack spacing={2}>
        <TagsInput
          selectedTags={handleSelecetedLanguages}
          fullWidth
          variant="outlined"
          id="languages"
          name="languages"
          placeholder="주로 사용하는 언어를 태깅해보세요."
          label="Languages"
          tags={languages}
        />

        <TagsInput
          selectedTags={handleSelecetedFrameworks}
          fullWidth
          variant="outlined"
          id="frameworks"
          name="frameworks"
          placeholder="주로 사용하는 프레임웍을 태깅해보세요."
          label="Frameworks"
          tags={frameworks}
        />

        <TagsInput
          selectedTags={handleSelecetedTools}
          fullWidth
          variant="outlined"
          id="tools"
          name="tools"
          placeholder="주로 사용하는 개발 도구를 태깅해보세요."
          label="tools"
          tags={tools}
        />
        <TagsInput
          selectedTags={handleSelecetedFavorite}
          fullWidth
          variant="outlined"
          id="favorite"
          name="favorite"
          placeholder="가장 좋아하는 스킬을 입력해주세요."
          label="my favorite"
          tags={[favorite]}
        />
        <TagsInput
          selectedTags={handleSelecetedConfident}
          fullWidth
          variant="outlined"
          id="confident"
          name="confident"
          placeholder="가장 자신있는 스킬을 입력해주세요."
          label="self-confident"
          tags={[confident]}
        />

        <Stack
          direction="row"
          spacing={2}
          sx={{ mt: 2, justifyContent: "center" }}
        >
          <Button name="accept" variant="contained" type="submit">
            완료
          </Button>
          <Button
            name="cancel"
            type="reset"
            onClick={onSubmitHandler}
            variant="outlined"
          >
            취소
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default TechForm;
TechForm.defaultProps = {
  techs: {
    languages: [],
    frameworks: [],
    tools: [],
  },
};
TechForm.propTypes = {
  checkAddComplete: PropTypes.func.isRequired,
  techs: PropTypes.object,
};
/*

{
        favorite: "javascript",
        confident: "python",
        language: { list: [...languages] },
        framework: { list: [...frameworks] },
        tool: { list: [...tools] },
}


{ techs, checkAddComplete }
   


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
