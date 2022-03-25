import React, { useState, useContext, useRef } from "react";
import _ from "lodash";
import {
  Box,
  TextField,
  Stack,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
  Chip,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import * as Api from "../../api";
import { UserStateContext } from "../../App";
import { getEducationApi } from "../../utils";

function EducationEditForm({ education, setEducations, setClickEditBtn }) {
  const userState = useContext(UserStateContext); // 현재 로그인된 유저의 정보를 가져옵니다.

  const [school, setSchool] = useState(education.school); // 학교 이름을 저장할 상태입니다.
  const [major, setMajor] = useState(education.major); // 전공을 저장할 상태입니다.
  const [educationStatus, setEducationStatus] = useState(education.position); // 재학/졸업 여부를 저장할 상태입니다.
  const [schoolOpt, setSchoolOpt] = useState(null); // 학교 이름 검색에 따른 옵션들을 저장합니다.

  const statusArr = ["재학중", "학사졸업", "석사졸업", "박사졸업"]; // postion을 저장하는 배열입니다.
  const userId = userState.user.id; // 현재 로그인한 유저의 아이디를 저장합니다.

  // radio button 클릭에 따라 position을 저장합니다.
  const RadioBtnClickHandler = (e, value) => {
    setEducationStatus(value);
  };

  // submit event handler 입니다.
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // 학력 변경을 위해 학교, 전공, 재학/졸업 여부를 객체로 저장합니다.
    const dataToSubmit = {
      school,
      major,
      position: educationStatus,
    };

    // educations로 PUT 요청을 보내 학력을 수정합니다.
    await Api.put(`educations/${education.id}`, dataToSubmit);

    // education-lists/유저id로 GET 요청을 보내 업데이트 사항이 반영된 학력을 새로 저장합니다.
    const { data } = await Api.get("education-lists", userId);
    setEducations(data.educations);

    setClickEditBtn(false);
  };

  const sendQuery = async (word) => {
    // 학교 선택지를 가져오기 위해 api를 생성합니다.
    const api = getEducationApi(word);

    //  open api 주소로 GET 요청을 보냅니다.
    const res = await api.get();

    // 반환된 결과를 3개까지만 저장하고 학교 이름만 가져와 schoolOpt 상태에 저장합니다.
    const data = res.data.dataSearch.content;

    const opt = data.map((v) => v.schoolName);
    setSchoolOpt(opt);
  };

  // 200ms마다 입력된 내용을 검색어로 지정합니다.
  const delayedSearchWord = useRef(
    _.debounce((q) => sendQuery(q), 200),
  ).current;

  const schoolChangeHandler = (e) => {
    setSchool(e.target.value);
    delayedSearchWord(e.target.value);
  };

  return (
    <Box component="form" onSubmit={onSubmitHandler} sx={{ mt: 1 }}>
      <Stack spacing={2}>
        <TextField
          required
          label="학교 이름"
          onChange={(e) => schoolChangeHandler(e)}
          value={school}
        />
        {schoolOpt && (
          <Stack direction="row" spacing={1}>
            {schoolOpt.map((name, i) => (
              <Chip
                key={"schoolOpt" + i}
                icon={<SchoolIcon />}
                label={name}
                color="primary"
                variant="outlined"
                size="small"
                onClick={(e) => setSchool(e.target.innerText)}
              />
            ))}
          </Stack>
        )}
        <TextField
          required
          label="전공"
          onChange={(e) => setMajor(e.target.value)}
          value={major}
        />
      </Stack>
      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <RadioGroup
          name="radio-buttons-group"
          row
          value={educationStatus}
          onChange={RadioBtnClickHandler}
        >
          {statusArr.map((item, i) => (
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
