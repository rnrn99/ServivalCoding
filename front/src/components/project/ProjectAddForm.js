import React, { useState } from "react";
import { Box, TextField, Stack, Button } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import * as Api from "../../api";

function ProjectAddForm({ portfolioOwnerId, setClickAddBtn, setProjects }) {
  const [title, setTitle] = useState(""); // 프로젝트 제목을 저장할 상태입니다.
  const [description, setDescription] = useState(""); // 프로젝트 상세내역을 저장할 상태입니다.
  const [startDate, setStartDate] = useState(new Date()); // 프로젝트 시작일(Date type)을 저장할 상태입니다.
  const [dueDate, setDueDate] = useState(new Date()); // 프로젝트 마감일(Date type)을 저장할 상태입니다.

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
    const from = dateToString(startDate);
    const to = dateToString(dueDate);

    // 프로젝트 추가를 위해 유저 id, 프로젝트 제목, 상세내역, 시작일, 마감일을 객체로 저장합니다.
    const dataToSubmit = {
      userId: portfolioOwnerId,
      title,
      description,
      from,
      to,
    };

    // projects로 POST 요청을 보냅니다.
    await Api.post("projects", dataToSubmit);

    // project-lists/유저id로 GET 요청을 보내 업데이트 사항이 반영된 프로젝트를 새로 저장합니다.
    const res = await Api.get("project-lists", portfolioOwnerId);
    setProjects(res.data);

    // 프로젝트 추가 후 ProjectAddForm을 닫습니다.
    setClickAddBtn(false);
  };

  return (
    <Box component="form" onSubmit={onSubmitHandler} sx={{ mt: 1 }}>
      <Stack spacing={2}>
        <TextField
          required
          label="프로젝트 제목"
          onChange={(e) => setTitle(e.target.value)}
          sx={{ width: "60ch" }}
        />
        <TextField
          required
          label="상세내역"
          onChange={(e) => setDescription(e.target.value)}
          sx={{ width: "60ch" }}
        />
      </Stack>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <DesktopDatePicker
            label="from"
            inputFormat="MM/dd/yyyy"
            value={startDate}
            onChange={(date) => setStartDate(date)}
            renderInput={(params) => <TextField {...params} />}
          />
          <DesktopDatePicker
            label="to"
            inputFormat="MM/dd/yyyy"
            value={dueDate}
            onChange={(date) => setDueDate(date)}
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
      </LocalizationProvider>
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

export default ProjectAddForm;
