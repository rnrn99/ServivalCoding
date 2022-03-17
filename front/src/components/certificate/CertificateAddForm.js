import React, {useState} from "react";

const CertificateAddForm = ({checkAddComplete}) => {
    console.log("CertificateAddForm 불러왔습니다.")
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [when_date, setWhen_date] = useState("");

    const handleClick = (e) => {
        e.preventDefault();
        //서버에 post 요청을 하고 갱신. 
        const isAccepted = (e.target.name === "accept")? true : false;

        if(isAccepted) {
            console.log("추가하기 완료 버튼이 눌렸습니다.");
            checkAddComplete({title, description, when_date});    
        } else {
            console.log("추가하기 취소 버튼이 눌렸습니다.");
            checkAddComplete(null);
        }
    };

    return (
        <div>        
            <input name ="title" type="text" 
                value={title} 
                onChange={(e)=>{setTitle(e.target.value)}}>
            </input>
            <input name ="description" type="text" 
                value={description} 
                onChange={(e) => {setDescription(e.target.value)}}>
            </input>
            <input name ="date" type="text" 
                value={when_date} 
                onChange={(e) => {setWhen_date(e.target.value)}}>
            </input>
            <button name="accept" onClick={handleClick}>완료</button>
            <button name="cancel" onClick={handleClick}>취소</button>
        </div>
    );
};

export default CertificateAddForm;