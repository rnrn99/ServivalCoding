import React, { useState } from "react";
import {
  Box,
  TextField,
  Stack,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
} from "@mui/material";
import * as Api from "../../api";

function EducationAddForm({ portfolioOwnerId, setClickAddBtn, setEducations }) {
  const [school, setSchool] = useState(""); // 학교 이름을 저장할 상태입니다.
  const [major, setMajor] = useState(""); // 전공을 저장할 상태입니다.
  const [position, setPosition] = useState("재학중"); // 재학/졸업 여부를 저장할 상태입니다.

  // postion을 저장하는 배열입니다.
  const positionArr = ["재학중", "학사졸업", "석사졸업", "박사졸업"];

  // radio button 클릭에 따라 position을 저장합니다.
  const RadioBtnClickHandler = (e, value) => {
    setPosition(value);
  };

  // submit event handler 입니다.
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // 학력 추가를 위해 유저 아이디, 학교, 전공, 재학/졸업 여부를 객체로 저장합니다.
    const dataToSubmit = {
      userId: portfolioOwnerId,
      school,
      major,
      position,
    };

    // educations로 POST 요청을 보냅니다.
    await Api.post("educations", dataToSubmit);

    // education-lists/유저id로 GET 요청을 보내 업데이트 사항이 반영된 학력을 새로 저장합니다.
    const res = await Api.get("education-lists", portfolioOwnerId);
    setEducations(res.data);

    // 학력 추가 후 EducationAddForm을 닫습니다.
    setClickAddBtn(false);
  };

  return (
    <Box component="form" onSubmit={onSubmitHandler} sx={{ mt: 1 }}>
      <Stack spacing={2}>
        <TextField
          required
          label="학교 이름"
          onChange={(e) => setSchool(e.target.value)}
        />
        <TextField
          required
          label="전공"
          onChange={(e) => setMajor(e.target.value)}
        />
      </Stack>
      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <RadioGroup
          defaultValue="재학중"
          name="radio-buttons-group"
          row
          onChange={RadioBtnClickHandler}
        >
          {positionArr.map((item, i) => (
            <FormControlLabel
              key={"position" + i}
              control={<Radio />}
              label={item}
              value={item}
            />
          ))}
        </RadioGroup>
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
          onClick={() => setClickAddBtn(false)}
          variant="outlined"
        >
          취소
        </Button>{" "}
      </Stack>
    </Box>
  );
}

export default EducationAddForm;
