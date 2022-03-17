import React, {useState} from "react";

import CertificateEditForm from "./CertificateEditForm";
import CertificateCard from "./CertificateCard";

//Certicate 모듈입니다. CertificateCard 와 CertificateEditForm 을 호출합니다.

//<CertificateEditForm />
const Certicate = ({id, checkModified, isEditable, title, description, when_date}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isEdited, setIsEdited] = useState(false);
    //const tempEditable = true;
    //isEditing 필요.
    //isEditable 은 portfolio에서 받아온 데이터. 수정을 할수있느냐의 여부.
    //Card에게도 전달하여 수정하기 버튼을 활성화 시켜야함
    //isEditing은 수정하기 버튼이 눌렸을때 작동됨.

    //isEdited는 editForm이 수정을 무사히 완료하였는지를 체크하기 위해필요함
    //데이터 수정을 위한 전달값이 있을 것.<<서버연동시에는 필요없는 부분, 그저 true false면 될듯

    const checkEditing = (editing) => {

        setIsEditing(editing);
    };

    const checkEdited = (edited, props) => {
        //editForm에서 값이 리턴됨.
        console.log("checkEdited", edited);
        console.log(props);
        setIsEdited(edited);
        if(edited) {
            //데이터 수정에관련된 로직
            console.log("데이터 수정작업이 이루어집니다.");
            checkModified(id, props);
        }
        //EditForm을 비활성화 시킵니다.
        setIsEditing(false);
        setIsEdited(false);
    };

    return (
        <div>
            {isEditing ? (
                <CertificateEditForm 
                    checkEdited = {checkEdited}
                    title={title}
                    description={description}
                    when_date={when_date}
                />
            ) : (
                <CertificateCard 
                    isEditable={isEditable}
                    checkEditing = {checkEditing}
                    title={title}
                    description={description}
                    when_date={when_date}
                />
            )}    
        </div>
    );
};
//CertificateCard = ({title, description, when_date})
export default Certicate;