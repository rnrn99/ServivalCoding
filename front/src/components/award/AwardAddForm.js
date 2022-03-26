import React, { useState, useContext } from "react";
import * as Api from "../../api";
import { UserStateContext } from "../../App";
import {
  Box,
  TextField,
  Stack,
  Button,
} from "@mui/material";

// 수상이력 추가 컴포넌트로 {폼 활성화 여부 state}, {수상이력리스트 업데이트 함수}를 props로 받아옵니다.
function AwardAddForm({ setAddAward, setAwardLists }) {
  // 추가는 본인만 가능하므로, 현재 접속중인 userid를 사용합니다.
  const userState = useContext(UserStateContext);
  const userId = userState.user.id;

  // 수상내역, 상세내역을 state로 관리합니다.
  const [awardTitle, setAwardTitle] = useState("");
  const [awardDetail, setAwardDetail] = useState("");

  // 입력받은 값으로 수상이력에 추가하고, 목록을 다시 업데이트 합니다.
  const addSubmitHandler = async (e) => {
    e.preventDefault();

    const uptAwardData = {
      userId,
      title: awardTitle,
      description: awardDetail,
    };

    await Api.post("awards", uptAwardData);

    const updateList = await Api.get("award-lists", userId);
    setAwardLists(updateList.data);

    setAddAward(false);
  };

  return (
    <Box component="form" onSubmit={addSubmitHandler} sx={{ mt: 1 }}>
      <Stack spacing={2}>
        <TextField
          required
          label="수상내역"
          sx={{ width: "60ch" }}
          defaultValue={awardTitle}
          onChange={(e) => setAwardTitle(e.target.value)}
        />

        <TextField
          required
          label="상세내역"
          sx={{ width: "60ch" }}
          defaultValue={awardDetail}
          onChange={(e) => setAwardDetail(e.target.value)}
        />
      </Stack>  

      <Stack
        direction="row"
        spacing={2}
        sx={{ mt: 2, justifyContent: "center" }}
      >
          <Button
            variant="contained" type="submit"
          >
            확인
          </Button>{" "}
          <Button
            variant="outlined"
            type="reset"
            onClick={() => setAddAward(false)}
          >
            취소
          </Button>
      </Stack>
    </Box>
  );
}

export default AwardAddForm;
