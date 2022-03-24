//기술스택 모듈 전체를 매니징
//서버와 통신은 Techs에서만 작업.

import React, { useState, useEffect } from "react";
import * as Api from "../../api";

import TechLists from "./TechLists";
//import TechFrameworks from "./TechFrameworks";
//import TechTools from "./TechTools";
import TechForm from "./TechForm";
import TechPick from "./TechPick";
import TechTag from "./TechTag";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  Typography,
  IconButton,
  Grid,
  Divider,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Techs = ({ portfolioOwnerId, isEditable }) => {
  //const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [techs, setTechs] = useState({});
  const [isAdd, setIsAdd] = useState(false);

  useEffect(() => {
    // Api.get("certificate-lists", portfolioOwnerId).then((res) =>
    //   setCerts(res.data)
    // );
    const dummyData = {
      id: "유저 아이디",
      confident: "React", //가장 자신있는 기술
      favorite: "python", //가장 좋아하는 기술
      language: ["python", "javascript", "Objective-C", "SQL"], //언어 항목
      framework: ["express", "MongoDB", "React"], //프레임워크 항목
      tool: ["VisualStudio Code", "git bash", "gitlab"], //툴 항목
    };
    setTechs(dummyData);
  }, [portfolioOwnerId]);

  const checkAddComplete = () => {};
  // 사전 정의 항목 스타일 디파인...? 아니면 그냥 하나로 통일.. 일단은 간단하게 구현.
  // const techWordBag = {
  //   language: ["python", "javascript", "Objective-C", "SQL"],
  //   framework: ["express", "MongoDB", "React"],
  //   tool: ["VisualStudio Code", "git bash", "gitlab"],
  // };

  return (
    <Card sx={{ marginBottom: "20px" }}>
      <Accordion defaultExpanded={true} sx={{ boxShadow: 0 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Grid
            container
            direction={"row"}
            sx={{
              p: 0,
              m: 0,
              borderRadius: 1,
            }}
          >
            <Grid item xs={3}>
              <Typography sx={{ fontSize: "20px" }}>기술 스택</Typography>
            </Grid>
            <Grid
              item
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                p: 1,
                m: 1,
              }}
              xs={9}
            >
              <TechTag key={"favorite"} tag={techs.favorite} />
              <TechTag key={"confident"} tag={techs.confident} />
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container direction={"row"} spacing={1}>
            <Grid item xs={4}>
              <Grid container direction={"row"} spacing={1}>
                <Grid item xs={6}>
                  <TechPick techName={techs.favorite} type="favorite" />
                </Grid>
                <Grid item xs={6}>
                  <TechPick techName={techs.confident} type="confident" />
                </Grid>
              </Grid>
            </Grid>
            <Grid item sx={{ ml: 1 }} xs>
              <Grid container direction="column" justifyContent="center">
                <TechLists subtitle="Languages" tags={techs.language} />
                <Divider />
                <TechLists subtitle="Frameworks" tags={techs.framework} />
                <Divider />
                <TechLists subtitle="DevTools" tags={techs.tool} />
                <Divider />
              </Grid>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      {isEditable && <CardContent></CardContent>}
    </Card>
  );
};

export default Techs;
/*
    <Box sx={{ display: "flex", justifyContent: "center" }}>
            <IconButton
              color="primary"
              aria-label="add-education"
              onClick={() => setIsAdd((cur) => !cur)}
            >
              <AddCircleRoundedIcon sx={{ width: "38px", height: "38px" }} />
            </IconButton>
          </Box>

          <Dialog open={isAdd} onClose={() => setIsAdd((cur) => !cur)}>
            <DialogTitle>기술스택 입력</DialogTitle>
            <DialogContent>
              <TechForm checkAddComplete={checkAddComplete} />
            </DialogContent>
          </Dialog>
*/
