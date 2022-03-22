import React, { useState, useContext } from "react";
import { Box, TextField, Stack, Button } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import * as Api from "../../api";
import { UserStateContext } from "../../App";

function CareerEditForm({ career, setCareerList, setClickEditBtn }) {
  const [title, setTitle] = useState(career.title); // 경력 사항을 저장할 상태입니다.
  const [startDate, setStartDate] = useState(new Date(career.fromDate)); // 경력 시작일(Date type)을 저장할 상태입니다.
  const [dueDate, setDueDate] = useState(new Date(career.toDate)); // 경력 마감일(Date type)을 저장할 상태입니다.

  const userState = useContext(UserStateContext);
  const userId = userState.user.id;

  // Date를 YYYY-MM-DD의 문자열로 바꾸는 함수입니다.
  const dateToString = (date) => {
    return (
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      date.getDate().toString().padStart(2, "0")
    );
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Date type의 시작일, 마감일 상태를 YYYY-MM-DD의 문자열로 바꿉니다.
    const fromDate = dateToString(startDate);
    const toDate = dateToString(dueDate);

    // 프로젝트 추가를 위해 유저 id, 프로젝트 제목, 상세내역, 시작일, 마감일을 객체로 저장합니다.
    const edtCareerData = {
      userId,
      title,
      fromDate,
      toDate,
    };

    // career/create로 POST 요청을 보냅니다.
    await Api.put(`careers/${career.id}`, edtCareerData);

    // careerlist/유저id로 GET 요청을 보내 업데이트 사항이 반영된 프로젝트를 새로 저장합니다.
    const res = await Api.get("career-lists", userId);
    setCareerList(res.data.data);

    // 프로젝트 추가 후 ProjectAddForm을 닫습니다.
    setClickEditBtn(false);
  };

  return (
    <Box component="form" onSubmit={onSubmitHandler} sx={{ mt: 1 }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack direction="row" spacing={2}>
          <DesktopDatePicker
            label="시작일"
            inputFormat="MM/dd/yyyy"
            value={startDate}
            onChange={(date) => setStartDate(date)}
            renderInput={(params) => <TextField {...params} />}
          />
          <DesktopDatePicker
            label="종료일"
            inputFormat="MM/dd/yyyy"
            value={dueDate}
            onChange={(date) => setDueDate(date)}
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
      </LocalizationProvider>
      <Stack sx={{ mt: 2 }}>
        <TextField
          required
          label="경력 사항"
          sx={{ width: "60ch" }}
          defaultValue={title}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
          onClick={() => setClickEditBtn(false)}
          variant="outlined"
        >
          취소
        </Button>{" "}
      </Stack>
    </Box>
  );
}

export default CareerEditForm;
