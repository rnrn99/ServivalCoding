import React, { useState } from "react";
import { Grid, Dialog, DialogTitle, DialogContent } from "@mui/material";

import CertificateEditForm from "./CertificateEditForm";
import CertificateCard from "./CertificateCard";
import AlertDialog from "../utils/AlertDialog";

const Certicate = ({
  cert,
  checkModified, //수정 또는 삭제에 대한 데이터 처리를 해주는 함수
  isEditable,
  title,
  description,
  date,
}) => {
  //isEditing은 EditForm 활성화 여부를 체크
  const [isEditing, setIsEditing] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);

  const checkEditing = (editing) => {
    setIsEditing(editing);
  };

  //삭제버튼 클릭을 체크 > 삭제 확인 폼을 출력
  const checkDeleting = () => {
    setIsDeleting(true);
  };

  const checkDeleted = (isDelete) => {
    if (isDelete) {
      const type = "delete";
      checkModified(cert.id, type, {});
    }
    setIsDeleting(false);
  };

  //checkEdited 수정이 완료되어 버튼이 눌렸는지 확인
  const checkEdited = (isEdited, props) => {
    if (isEdited) {
      //데이터 수정에관련된 로직
      const type = "edit";
      checkModified(cert.id, type, props);
    }
    //EditForm을 비활성화 시킵니다.
    setIsEditing(false);
  };

  return (
    <Grid>
      <CertificateCard
        isEditable={isEditable}
        checkEditing={checkEditing}
        checkDeleting={checkDeleting}
        title={title}
        description={description}
        date={date}
      />

      {isEditing && (
        <Dialog open={isEditing} onClose={() => setIsEditing((cur) => !cur)}>
          <DialogTitle>자격증 항목 수정</DialogTitle>
          <DialogContent>
            <CertificateEditForm
              checkEdited={checkEdited}
              title={title}
              description={description}
              date={date}
            />
          </DialogContent>
        </Dialog>
      )}
      {isDeleting && <AlertDialog checkDeleteComplete={checkDeleted} />}
    </Grid>
  );
};

export default Certicate;
