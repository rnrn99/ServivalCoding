//기술스택 입력 수정 폼

import React, { useState } from "react";
import { Box, Stack, Button } from "@mui/material";
import PropTypes from "prop-types";

import TagsInput from "./TagsInput";

const TechForm = ({ techs, checkAddComplete }) => {
  //const [title, setTitle] = useState("Languages");
  //const [description, setDescription] = useState("");
  const [favorite, setFavorite] = useState(
    techs?.favorite && [techs?.favorite]
  ); //string >array
  const [confident, setConfident] = useState(
    techs?.confident && [techs?.confident]
  ); //string >array
  const [languages, setLanguages] = useState(techs?.languages?.list);
  const [frameworks, setFrameworks] = useState(techs?.frameworks?.list);
  const [tools, setTools] = useState(techs?.tools?.list);

  //완료되었을때 데이터 techs로 전달
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (e.target.name === "cancel") {
      checkAddComplete(null);
    } else {
      checkAddComplete({
        favorite: favorite[0] ?? "",
        confident: confident[0] ?? "",
        languages: { list: [...languages] },
        frameworks: { list: [...frameworks] },
        tools: { list: [...tools] },
      });
    }
  };

  function handleSelecetedFavorite(items) {
    setFavorite(items);
  }
  function handleSelecetedConfident(items) {
    setConfident(items);
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
          limit={3}
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
          limit={3}
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
          limit={3}
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
          limit={1}
          tags={favorite}
        />
        <TagsInput
          selectedTags={handleSelecetedConfident}
          fullWidth
          variant="outlined"
          id="confident"
          name="confident"
          placeholder="가장 자신있는 스킬을 입력해주세요."
          label="self-confident"
          limit={1}
          tags={confident}
        />

        <Stack
          direction="row"
          spacing={2}
          sx={{ mt: 2, justifyContent: "center" }}
        >
          <Button name="accept" variant="contained" type="submit" sx={ButtonStyle.confirm} disableElevation disableRipple>
            확인
          </Button>
          <Button
            name="cancel"
            type="reset"
            onClick={onSubmitHandler}
            variant="outlined"
            sx={ButtonStyle.cancel}
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
    // favorite: "",
    // confident: "",
    languages: {
      list: [],
    },
    frameworks: {
      list: [],
    },
    tools: {
      list: [],
    },
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