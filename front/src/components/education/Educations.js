import React, { useState, useEffect } from "react";
import EducationAddForm from "./EducationAddForm";
import Education from "./Education";
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
import * as Api from "../../api";

function Educations({ portfolioOwnerId, isEditable }) {
  const [educations, setEducations] = useState([]); // 해당 유저의 학력을 저장합니다.
  const [clickAddBtn, setClickAddBtn] = useState(false); // 학력 추가 버튼 클릭 상태를 저장합니다.

  useEffect(() => {
    // "education-lists/유저id" 엔드포인트로 GET 요청을 하고, educations를 response의 data로 세팅함.
    Api.get("education-lists", portfolioOwnerId).then((res) =>
      setEducations(res.data.data),
    );
  }, [portfolioOwnerId]);

  return (
    <Card sx={{ marginBottom: "20px" }}>
      <Accordion defaultExpanded={true} sx={{ boxShadow: 0 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{ fontSize: "20px" }}>학력</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {educations.map((edu) => (
            <Education
              key={edu.id}
              education={edu}
              setEducations={setEducations}
              isEditable={isEditable}
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
              onClick={() => setClickAddBtn((cur) => !cur)}
            >
              <AddCircleRoundedIcon sx={{ width: "38px", height: "38px" }} />
            </IconButton>
          </Box>
          {clickAddBtn && (
            <Dialog
              open={clickAddBtn}
              onClose={() => setClickAddBtn((cur) => !cur)}
            >
              <DialogTitle>학력 추가</DialogTitle>
              <DialogContent>
                <EducationAddForm
                  portfolioOwnerId={portfolioOwnerId}
                  setClickAddBtn={setClickAddBtn}
                  setEducations={setEducations}
                />
              </DialogContent>
            </Dialog>
          )}
        </CardContent>
      )}
    </Card>
  );
}

export default Educations;
