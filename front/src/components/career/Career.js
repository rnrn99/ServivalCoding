import React,{useState} from 'react';
import CareerCard from "./CareerCard";
import CareerEditForm from "./CareerEditForm";

function Career({ career, setCareerList, isEditable }) {
  const [clickEditBtn, setClickEditBtn] = useState(false); // 편집 버튼 클릭 상태를 저장합니다.

  return (
    <>
      {clickEditBtn ? (
        <CareerEditForm
          career={career}
          setCareerList={setCareerList}
          setClickEditBtn={setClickEditBtn}
        />
      ) : (
        <CareerCard
          career={career}
          setClickEditBtn={setClickEditBtn}
          isEditable={isEditable}
          setCareerList={setCareerList}
        />
      )}
    </>
  );
}

export default Career;