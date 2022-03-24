//기술스택 모듈 전체를 매니징
//서버와 통신은 Techs에서만 작업.

import React, { useState, useEffect } from "react";
import * as Api from "../../api";

import TechLists from "./TechLists";
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

// const dummyData = {
//   id: "유저 아이디",
//   confident: "React", //가장 자신있는 기술
//   favorite: "python", //가장 좋아하는 기술
//   language: ["python", "javascript", "Objective-C", "SQL"], //언어 항목
//   framework: ["express", "MongoDB", "React"], //프레임워크 항목
//   tool: ["VisualStudio Code", "git bash", "gitlab"], //툴 항목
// };

const Techs = ({ portfolioOwnerId, isEditable }) => {
  //const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("기술 스택");
  //const [isAdding, setIsAdding] = useState(false);
  const [techs, setTechs] = useState({});
  const [isAdd, setIsAdd] = useState(false);
  const [isBlank, setIsBlank] = useState();
  //정보 유효성 체크 > 없으면 플래그 생성.

  //accordion expand check
  const [expanded, setExpanded] = useState(false);
  //accordion expand change handle
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const dataValidCheck = () => {
    if (
      !techs?.languages?.list &&
      !techs?.frameworks?.list &&
      !techs?.tools?.list
    ) {
      setIsBlank(true);
      setTitle("기술스택을 작성해보세요.");
    } else {
      setIsBlank(false);
      setTitle("기술스택");
    }
  };

  async function fetchData() {
    await Api.get("techs", portfolioOwnerId).then((res) => {
      setTechs(res.data.tech);
    });
  }

  useEffect(() => {
    //    console.log("fetchData>>>>>>>>>>>>>>>>>>>>>>>>>");

    Api.get("techs", portfolioOwnerId).then((res) => {
      setTechs(res.data.tech);
      // console.log("resDATA", res.data);
      // console.log("techs", techs);
    });
  }, [portfolioOwnerId]);

  useEffect(() => {
    dataValidCheck();
  });

  const checkAddComplete = async (result) => {
    try {
      if (result) {
        if (isBlank) {
          console.log("기술스택 정보를 보냅니다.isBlank", result);
          await Api.put("techs", result).then((res) =>
            setTechs(res.data.tech[0])
          );
        } else {
          await Api.put("techs", result).then((res) =>
            setTechs(res.data.tech[0])
          );
        }
        //setTechs(result);
        console.log("기술스택 정보를 보냈습니다. checkAddComplete", techs);
        //Api.get("techs", portfolioOwnerId).then((res) => setTechs(res.data));
        fetchData();
        //console.log("기술스택 정보를 다시 받아왔습니다.", techs);

        dataValidCheck();
      }
      setIsAdd(!isAdd);
    } catch (error) {
      console.log(error.response.message);
    }
  };

  return (
    <Card sx={{ marginBottom: "20px" }}>
      <Accordion
        defaultExpanded={true}
        sx={{ boxShadow: 0 }}
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
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
            <Grid item xs={6}>
              <Typography sx={{ fontSize: "20px" }}>{title}</Typography>
            </Grid>
            <Grid
              container
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                p: 1,
                m: 1,
              }}
            >
              {!expanded && !isBlank && (
                <>
                  <TechTag
                    key={"favorite"}
                    tag={techs?.favorite}
                    isDeletable={false}
                  />
                  <TechTag
                    key={"confident"}
                    tag={techs?.confident}
                    isDeletable={false}
                  />
                </>
              )}
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container direction={"row"} spacing={1}>
            <Grid item xs={4}>
              <Grid container direction={"row"} spacing={1}>
                <Grid item xs={6}>
                  <TechPick techName={techs?.favorite} type="favorite" />
                </Grid>
                <Grid item xs={6}>
                  <TechPick techName={techs?.confident} type="confident" />
                </Grid>
              </Grid>
            </Grid>
            <Grid item sx={{ ml: 1 }} xs>
              <Grid container direction="column" justifyContent="center">
                <TechLists subtitle="Languages" tags={techs?.languages?.list} />
                <Divider />
                <TechLists
                  subtitle="Frameworks"
                  tags={techs?.frameworks?.list}
                />
                <Divider />
                <TechLists subtitle="DevTools" tags={techs?.tools?.list} />
                <Divider />
              </Grid>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      {isEditable && (
        <CardContent>
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
              <TechForm checkAddComplete={checkAddComplete} techs={techs} />
            </DialogContent>
          </Dialog>
        </CardContent>
      )}
    </Card>
  );
};

export default Techs;
