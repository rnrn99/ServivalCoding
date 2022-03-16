import React from "react";

const CertificateCard = ({isEditable, title, description, when_date}) => {
    //isEditing <<부모 Certificate 한테 전달해줘야함.
    const handleClick = () => {
        //수정하기 버튼이 눌린 것이므로 
        //isEditing <<부모 Certificate 한테 전달해줘야함. true값을 전달.
        alert("수정하겠습니다");
    }
    return (
        <div>
            <p>자격증:{title} 설명:{description} 취득일:{when_date} 
            {isEditable && (<button onClick={handleClick}>수정하기</button>)}
            </p>
            
        </div>
    );
};

export default CertificateCard;