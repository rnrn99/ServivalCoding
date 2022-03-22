import React, { useState, useEffect } from "react";
import AwardAddForm from "./AwardAddForm";
import Award from "./Award";
import * as Api from "../../api";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// 메인 컴포넌트라고 할 수 있습니다.
// portfolioOwnerId는 해당하는 포트폴리오의 userID를 가리킵니다. (!== 현재 접속중인 userID)
function AwardCard({ portfolioOwnerId, isEditable }) {
  const [addAward, setAddAward] = useState(false);
  const [awardLists, setAwardLists] = useState([]);

  // 포트폴리오의 주인 ID가 달라지면, 수상이력을 해당 유저의 것으로 새로 불러옵니다.
  useEffect(
    () =>
      Api.get("award-lists", portfolioOwnerId).then((res) =>
        setAwardLists(res.data.data)
      ),
    [portfolioOwnerId]
  );

  return (
    <Card sx={{ marginBottom: "20px" }}>
      <Accordion defaultExpanded={true} sx={{ boxShadow: 0 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{ fontSize: "20px" }}>수상이력</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {awardLists.map((award) => (
            <Award
              key={award.id}
              award={award}
              isEditable={isEditable}
              setAwardLists={setAwardLists}
            />
          ))}
        </AccordionDetails>
      </Accordion>
      {isEditable && (
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <IconButton
              color="primary"
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
    </Card>
  );
}

export default AwardCard;
