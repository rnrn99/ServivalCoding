import React, { useState } from "react";
import EducationCard from "./EducationCard";
import EducationEditForm from "./EducationEditForm";

function Education({ education, setEducations, isEditable }) {
  const [clickEditBtn, setClickEditBtn] = useState(false); // 편집 버튼 클릭 상태를 저장합니다.
  return (
    <>
      {clickEditBtn ? (
        <EducationEditForm
          education={education}
          setEducations={setEducations}
          setclickEditBtn={setClickEditBtn}
        />
      ) : (
        <EducationCard
          education={education}
          setclickEditBtn={setClickEditBtn}
          isEditable={isEditable}
        />
      )}
    </>
  );
}

export default Education;
