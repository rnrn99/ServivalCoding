import React, { useState, useContext } from "react";
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
import { UserStateContext } from "../../App";

function EducationEditForm({ education, setEducations, setClickEditBtn }) {
  const userState = useContext(UserStateContext); // 현재 로그인된 유저의 정보를 가져옵니다.

  const [school, setSchool] = useState(education.school); // 학교 이름을 저장할 상태입니다.
  const [major, setMajor] = useState(education.major); // 전공을 저장할 상태입니다.
  const [position, setPosition] = useState(education.position); // 재학/졸업 여부를 저장할 상태입니다.

  const positionArr = ["재학중", "학사졸업", "석사졸업", "박사졸업"]; // postion을 저장하는 배열입니다.
  const user_id = userState.user.id; // 현재 로그인한 유저의 아이디를 저장합니다.

  // radio button 클릭에 따라 position을 저장합니다.
  const RadioBtnClickHandler = (e, value) => {
    setPosition(value);
  };

  // submit event handler 입니다.
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // 학력 변경을 위해 학교, 전공, 재학/졸업 여부를 객체로 저장합니다.
    const dataToSubmit = {
      user_id,
      school,
      major,
      position,
    };

    // educations로 PUT 요청을 보내 학력을 수정합니다.
    await Api.put(`educations/${education.id}`, dataToSubmit);

    // education-lists/유저id로 GET 요청을 보내 업데이트 사항이 반영된 학력을 새로 저장합니다.
    const res = await Api.get("education-lists", user_id);
    setEducations(res.data.data);

    setClickEditBtn(false);
  };

  return (
    <Box component="form" onSubmit={onSubmitHandler} sx={{ mt: 1 }}>
      <Stack spacing={2}>
        <TextField
          required
          label="학교 이름"
          onChange={(e) => setSchool(e.target.value)}
          sx={{ width: "60ch" }}
          defaultValue={school}
        />
        <TextField
          required
          label="전공"
          onChange={(e) => setMajor(e.target.value)}
          defaultValue={major}
        />
      </Stack>
      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <RadioGroup
          name="radio-buttons-group"
          row
          value={position}
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
          onClick={() => setClickEditBtn(false)}
          variant="outlined"
        >
          취소
        </Button>{" "}
      </Stack>
    </Box>
  );
}

export default EducationEditForm;
