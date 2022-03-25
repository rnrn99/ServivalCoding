import React, { useState, useEffect } from "react";
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
import ProjectAddForm from "./ProjectAddForm";
import Project from "./Project";
import * as Api from "../../api";

function Projects({ portfolioOwnerId, isEditable }) {
  const [projects, setProjects] = useState([]); // 해당 유저의 프로젝트를 저장합니다.
  const [clickAddBtn, setClickAddBtn] = useState(false); // 프로젝트 추가 버튼 클릭 상태를 저장합니다.

  useEffect(() => {
    // "project-lists/유저id" 엔드포인트로 GET 요청을 하고, projects를 response의 data로 세팅함.
    Api.get("project-lists", portfolioOwnerId).then((res) => {
      setProjects(res.data.projects);
    });
  }, [portfolioOwnerId]);

  return (
    <Card sx={{ marginBottom: "20px" }}>
      <Accordion defaultExpanded={true} sx={{ boxShadow: 0 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{ fontSize: "20px" }}>프로젝트</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {projects.map((project) => (
            <Project
              key={project.id}
              project={project}
              setProjects={setProjects}
              isEditable={isEditable}
            />
          ))}
        </AccordionDetails>
      </Accordion>
      {isEditable && (
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <IconButton
              style={{ color: '#C7A27C'}}
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
              <DialogTitle>프로젝트 추가</DialogTitle>
              <DialogContent>
                <ProjectAddForm
                  portfolioOwnerId={portfolioOwnerId}
                  setClickAddBtn={setClickAddBtn}
                  setProjects={setProjects}
                />
              </DialogContent>
            </Dialog>
          )}
        </CardContent>
      )}
    </Card>
  );
}

export default Projects;
