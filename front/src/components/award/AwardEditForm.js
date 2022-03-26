import React, { useState, useContext } from "react";
import * as Api from "../../api";
import { UserStateContext } from "../../App";
import {
  Box,
  TextField,
  Stack,
  Button,
} from "@mui/material";

// 수상이력 수정 컴포넌트로, {해당 수상내역}, {수정 컴포넌트 활성화 state}, {수상이력리스트 업데이트 함수} 를 props로 받아옵니다.
function AwardEditForm({ award, setIsEditing, setAwardLists }) {
  // 수정은 본인만 가능하므로, 현재 접속중인 userid를 사용합니다.
  const userState = useContext(UserStateContext);
  const userId = userState.user.id;

  // 수상내역, 상세내역을 state로 관리합니다.
  const [awardTitle, setAwardTitle] = useState(award.title);
  const [awardDetail, setAwardDetail] = useState(award.description);

  // 입력받은 값으로 수상이력을 수정하고, 목록을 다시 업데이트 합니다.
  const editSubmitHandler = async (e) => {
    e.preventDefault();

    const edtAwardData = {
      title: awardTitle,
      description: awardDetail,
    };

    await Api.put(`awards/${award.id}`, edtAwardData);

    const editData = await Api.get("award-lists", userId);
    setAwardLists(editData.data);
    setIsEditing(false);
  };

  return (

    <Box component="form" onSubmit={editSubmitHandler} sx={{ mt: 1 }}>
      <Stack spacing={2}>
          <TextField
            required
            label="수상 내역"
            onChange={(e) => setAwardTitle(e.target.value)}
            sx={{ width: "60ch" }}
            defaultValue={awardTitle}
          />
          <TextField
            required
            label="상세 내역"
            onChange={(e) => setAwardDetail(e.target.value)}
            sx={{ width: "60ch" }}
            defaultValue={awardDetail}
          />
      </Stack>  
      <Stack
          direction="row"
          spacing={2}
          sx={{ mt: 2, justifyContent: "center" }}
        >
          <Button
            variant="contained"
            type="submit"
          >
            확인
          </Button>{" "}
          <Button
            variant="outlined"
            type="reset"
            onClick={() => setIsEditing(false)}
          >
            취소
          </Button>{" "}
        </Stack>
  </Box>      
  );
}

export default AwardEditForm;
