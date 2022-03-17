import React, {useState} from "react";

const CertificateEditForm = (props) => {

    const [title, setTitle] = useState(props.title);
    const [description, setDescription] = useState(props.description);
    const [when_date, setWhen_Date] = useState(props.when_date);

    const handleClick = (e) => {
        //PUT 요청을위해 변경된 정보를 Certificate 모듈로 전달.
        e.preventDefault();
        console.log("Editform에서 버튼이 눌렸습니다.");
        if(e.target.name === "accept") {
            console.log("완료 버튼이 눌렸습니다.");
            props.checkEdited(true, {title, description, when_date});
        } else {
            console.log("취소 버튼이 눌렸습니다.");
            props.checkEdited(false, {});
        }
        
    };

    return (
        <div>
            <input name ="title" type="text" 
                value={title} 
                placeholder="자격증"
                onChange={(e)=>{setTitle(e.target.value)}}>
            </input>
            <input name ="description" type="text" 
                value={description} 
                placeholder="자격증설명"
                onChange={(e) => {setDescription(e.target.value)}}>
            </input>
            <input name ="date" type="text" 
                value={when_date} 
                placeholder="2000-00-00"
                onChange={(e) => {setWhen_Date(e.target.value)}}>
            </input>
            <button name="accept" onClick={handleClick}>완료</button>
            <button name="cancel" onClick={handleClick}>취소</button>
        
        </div>
    );
};

export default CertificateEditForm;