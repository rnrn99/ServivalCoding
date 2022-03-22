import React,{useState} from 'react';
import CareerCard from "./CareerCard";
import CareerEditForm from "./CareerEditForm";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";

function Career({ career, setCareerList, isEditable }) {
  const [clickEditBtn, setClickEditBtn] = useState(false); // 편집 버튼 클릭 상태를 저장합니다.

  return (
    <>
      <Dialog
        open={clickEditBtn}
        onClose={() => setClickEditBtn((cur) => !cur)}
      >
        <DialogTitle>경력 편집</DialogTitle>
        <DialogContent>
          <CareerEditForm
            career={career}
            setCareerList={setCareerList}
            setClickEditBtn={setClickEditBtn}
          />
        </DialogContent>
      </Dialog>

      <CareerCard
          career={career}
          setClickEditBtn={setClickEditBtn}
          isEditable={isEditable}
          setCareerList={setCareerList}
      />
    </>
  );
}

export default Career;