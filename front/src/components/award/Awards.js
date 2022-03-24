import React, { useState, useEffect } from "react";
import AwardCard from "./AwardCard";
import Award from "./Award";
import * as Api from "../../api";
//mui
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  Typography,
} from "@mui/material";

// 세부 내용은 AwardCard에 다 담았습니다.
function Awards({ portfolioOwnerId, isEditable }) {
  const [awardLists, setAwardLists] = useState([]);

  // 포트폴리오의 주인 ID가 달라지면, 수상이력을 해당 유저의 것으로 새로 불러옵니다.
  useEffect(
    () =>
      Api.get("award-lists", portfolioOwnerId).then((res) => {
        setAwardLists(res.data.awards);
      }),
    [portfolioOwnerId],
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
      <AwardCard setAwardLists={setAwardLists} isEditable={isEditable} />
    </Card>
  );
}

export default Awards;
