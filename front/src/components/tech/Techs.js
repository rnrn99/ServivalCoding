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
import QuestionPopover from "../utils/QuestionPopover";

const Techs = ({ portfolioOwnerId, isEditable }) => {
  const [techs, setTechs] = useState({});
  const [isAdd, setIsAdd] = useState(false);
  const [isBlank, setIsBlank] = useState();

  //accordion expand check
  const [expanded, setExpanded] = useState(false);

  //기술스택입력창 팝업 메시지
  const techPopMessage =
    "태그는 문자 입력 후 엔터를 치면 자동생성됩니다. 자신있는 기술과 좋아하는 기술은 필수입력 항목입니다.";

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
    } else {
      setIsBlank(false);
    }
  };

  useEffect(() => {
    Api.get("techs", portfolioOwnerId)
      .then((res) => {
        setTechs(res.data.tech);
      })
      .catch((err) => setTechs({}));
  }, [portfolioOwnerId]);

  useEffect(() => {
    dataValidCheck();
  });

  const checkAddComplete = async (result) => {
    try {
      if (result) {
        if (isBlank) {
          await Api.post("techs", result).then((res) =>
            setTechs(res.data.tech)
          );
        } else {
          console.log("테크 수정>>>>", result);
          console.log("테크 수정>>>>favor>>>", result.favorite);
          console.log("테크 수정>>>>conf>>>", result.confident);
          await Api.put("techs", result).then((res) => setTechs(res.data.tech));
        }

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
              <Typography
                sx={{
                  fontFamily: "Elice Digital Baeum",
                  fontSize: "24px",
                  color: "#616161",
                  fontWeight: 500,
                }}
              >
                기술 스택
              </Typography>
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
            <Grid item xs={12} md={4}>
              <Grid container direction={"row"} spacing={1}>
                <Grid item xs={6}>
                  <TechPick techName={techs?.favorite} type="favorite" />
                </Grid>
                <Grid item xs={6}>
                  <TechPick techName={techs?.confident} type="confident" />
                </Grid>
              </Grid>
            </Grid>
            <Grid item sx={{ ml: 1 }} xs md>
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
              style={{ color: "#C7A27C" }}
              aria-label="add-education"
              onClick={() => setIsAdd((cur) => !cur)}
            >
              <AddCircleRoundedIcon sx={{ width: "38px", height: "38px" }} />
            </IconButton>
          </Box>

          <Dialog open={isAdd} onClose={() => setIsAdd((cur) => !cur)}>
            <DialogTitle>
              <Grid
                container
                spacing={1}
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <Grid item xs>
                  <Typography
                    sx={{
                      fontFamily: "Elice Digital Baeum",
                      fontSize: "22px",
                      color: "#616161",
                      fontWeight: 400,
                    }}
                  >
                    기술스택 입력
                  </Typography>
                </Grid>
                <Grid item justifyContent="flex-start">
                  <QuestionPopover message={techPopMessage} />
                </Grid>
              </Grid>
            </DialogTitle>
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
