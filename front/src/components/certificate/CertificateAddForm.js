import React, {useState} from "react";

const CertificateAddForm = ({checkAddComplete}) => {
    console.log("CertificateAddForm 불러왔습니다.")
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");

    const handleClick = (e) => {
        e.preventDefault();
        //서버에 post 요청을 하고 갱신. 
        console.log("추가하기 완료 버튼이 눌렸습니다.");
        checkAddComplete(true, {title, description, when_date: date});
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
                value={date} 
                onChange={(e) => {setDate(e.target.value)}}>
            </input>
            <button onClick={handleClick}>OK</button>
        </div>
    );
};

export default CertificateAddForm;