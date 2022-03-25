import React, { useState } from "react";
import AwardAddForm from "./AwardAddForm";
//mui
import {
  CardContent,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

// 메인 컴포넌트라고 할 수 있습니다.
// portfolioOwnerId는 해당하는 포트폴리오의 userID를 가리킵니다. (!== 현재 접속중인 userID)
function AwardCard({ setAwardLists, isEditable }) {
  const [addAward, setAddAward] = useState(false);

  return (
    <>
      {isEditable && (
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <IconButton
              style={{ color: '#C7A27C'}}
              aria-label="add-education"
              onClick={() => setAddAward((cur) => !cur)}
            >
              <AddCircleRoundedIcon sx={{ width: "38px", height: "38px" }} />
            </IconButton>
          </Box>

          <Dialog open={addAward} onClose={() => setAddAward((cur) => !cur)}>
            <DialogTitle>수상이력 추가</DialogTitle>
            <DialogContent>
              <AwardAddForm
                setAddAward={setAddAward}
                setAwardLists={setAwardLists}
              />
            </DialogContent>
          </Dialog>
        </CardContent>
      )}
    </>  
  );
}

export default AwardCard;

