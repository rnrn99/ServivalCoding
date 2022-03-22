import React, { useState } from "react";
import EducationCard from "./EducationCard";
import EducationEditForm from "./EducationEditForm";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";

function Education({ education, setEducations, isEditable }) {
  const [clickEditBtn, setClickEditBtn] = useState(false); // 편집 버튼 클릭 상태를 저장합니다.
  return (
    <>
      <EducationCard
        education={education}
        setClickEditBtn={setClickEditBtn}
        isEditable={isEditable}
        setEducations={setEducations}
      />
      {clickEditBtn && (
        <Dialog
          open={clickEditBtn}
          onClose={() => setClickEditBtn((cur) => !cur)}
        >
          <DialogTitle>학력 편집</DialogTitle>
          <DialogContent>
            <EducationEditForm
              education={education}
              setEducations={setEducations}
              setClickEditBtn={setClickEditBtn}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export default Education;
