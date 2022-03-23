import React, { useEffect, useState } from "react";
//import { Card, Row, Col, Button } from "react-bootstrap";

import * as Api from "../../api";
import Certificate from "./Certificate";
import CertificateAddForm from "./CertificateAddForm";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails, // Accordion 적용 시 필요한 부분
  Card,
  CardContent, // Card 적용 시 필요한 부분
  Typography, // Card 타이틀(ex. 수상이력, 자격증 정보)
  IconButton,
  Box, // Add 버튼 적용 시 필요한 부분
  Dialog,
  DialogTitle,
  DialogContent, // AddForm Modal 적용
} from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Certificates = ({ portfolioOwnerId, isEditable }) => {
  const [certs, setCerts] = useState([]);
  const [isAdd, setIsAdd] = useState(false);

  useEffect(() => {
    Api.get("certificate-lists", portfolioOwnerId).then((res) =>
      setCerts(res.data)
    );
  }, [portfolioOwnerId]);

  const setCertificateList = () => {
    return certs.map((cert) => {
      return (
        <Certificate
          key={cert.id}
          cert={cert}
          isEditable={isEditable}
          checkModified={checkModified}
          title={cert.title}
          description={cert.description}
          date={cert.date}
        />
      );
    });
  };

  const checkAddComplete = async (props) => {
    if (props !== null) {
      //데이터를 업데이트 합니다.
      const newData = { ...props }; //이제 그냥 프랍만 넘겨도 되려나
      await Api.post("certificates", newData);
      const res = await Api.get("certificate-lists", portfolioOwnerId);
      setCerts(res.data);
    }
    setIsAdd(false);
  };

  //checkModified 단위 항목에서 변경사항을 전달받아 서버로 보내는 역할
  const checkModified = async (id, type, props) => {
    if (type === "edit") {
      await Api.put(`certificates/${id}`, props);
    } else if (type === "delete") {
      await Api.delete(`certificates/${id}`);
    }

    const res = await Api.get("certificate-lists", portfolioOwnerId);
    setCerts(res.data);
    //type 이 delete인 경우 삭제 요청
  };

  return (
    <Card sx={{ marginBottom: "20px" }}>
      <Accordion defaultExpanded={true} sx={{ boxShadow: 0 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{ fontSize: "20px" }}>자격증</Typography>
        </AccordionSummary>
        <AccordionDetails>{setCertificateList()}</AccordionDetails>
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
            <DialogTitle>자격증 추가</DialogTitle>
            <DialogContent>
              <CertificateAddForm checkAddComplete={checkAddComplete} />
            </DialogContent>
          </Dialog>
        </CardContent>
      )}
    </Card>
  );
};

export default Certificates;
