import React, { useState } from "react";
import EducationCard from "./EducationCard";
import EducationEditForm from "./EducationEditForm";

function Education({ education, setEducations, isEditable }) {
  const [clickEditBtn, setclickEditBtn] = useState(false); // 편집 버튼 클릭 상태를 저장합니다.
  return (
    <>
      {clickEditBtn ? (
        <EducationEditForm
          education={education}
          setEducations={setEducations}
          setclickEditBtn={setclickEditBtn}
        />
      ) : (
        <EducationCard
          education={education}
          setclickEditBtn={setclickEditBtn}
          isEditable={isEditable}
        />
      )}
    </>
  );
}

export default Education;
