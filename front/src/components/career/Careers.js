import React, { useState, useEffect } from "react";
import Career from "./Career";
import CareerAddForm from "./CareerAddForm";
import * as Api from "../../api";
//mui
import Timeline from "@mui/lab/Timeline";
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

function Careers({ portfolioOwnerId, isEditable }) {
  const [careerList, setCareerList] = useState([]); // 해당 유저의 경력 리스트를 저장합니다.
  const [clickAddBtn, setClickAddBtn] = useState(false); // 경력 추가 버튼 클릭 상태를 저장합니다.

  useEffect(() => {
    // "careerList/유저id" 엔드포인트로 GET 요청을 하고, educations를 response의 data로 세팅함.
    Api.get("career-lists", portfolioOwnerId)
      .then((res) => setCareerList(res.data.careers))
      .catch((err) => setCareerList([]));
  }, [portfolioOwnerId]);

  return (
    <Card sx={{ marginBottom: "20px" }}>
      <Accordion defaultExpanded={true} sx={{ boxShadow: 0 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{
                  fontFamily: "Elice Digital Baeum",
                  fontSize: "24px",
                  color: "#616161",
                  fontWeight: 500,
                }}>경력</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ padding: "2PX" }}>
          <Timeline position="alternate" style={{ padding: "1px" }}>
            <p className="text-center" style={{ color: "#b0bec5" }}>
              current
            </p>
            {careerList
              .slice(0)
              .reverse()
              .map((career) => (
                <Career
                  key={career.id}
                  career={career}
                  setCareerList={setCareerList}
                  isEditable={isEditable}
                />
              ))}
          </Timeline>
        </AccordionDetails>
      </Accordion>
      {isEditable && (
        <CardContent style={{ paddingTop: "0" }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <IconButton
              style={{ color: "#C7A27C" }}
              aria-label="add-career"
              onClick={() => setClickAddBtn((cur) => !cur)}
            >
              <AddCircleRoundedIcon sx={{ width: "38px", height: "38px" }} />
            </IconButton>
          </Box>
          <Dialog
            open={clickAddBtn}
            onClose={() => setClickAddBtn((cur) => !cur)}
          >
            <DialogTitle>경력 추가</DialogTitle>
            <DialogContent>
              <CareerAddForm
                portfolioOwnerId={portfolioOwnerId}
                setClickAddBtn={setClickAddBtn}
                setCareerList={setCareerList}
              />
            </DialogContent>
          </Dialog>
        </CardContent>
      )}
    </Card>
  );
}

export default Careers;
