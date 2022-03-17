import React, {useState} from "react";

const CertificateEditForm = (props) => {

    const [title, setTitle] = useState(props.title);
    const [description, setDescription] = useState(props.description);
    const [date, setDate] = useState(props.when_date);

    const handleClick = (e) => {
        //{title, description, date} 객체를 보내줘야함. 얼루? 
        //여기서도 수정완료 이후 isEditing을 다시 보내주어야하나?
        //그럴 필요 없음. 
        //PUT 요청이후 리스펀스를 받음.
        e.preventDefault();
        console.log("Editform에서 버튼이 눌렸습니다.");
        if(e.target.name === "accept") {
            console.log("완료 버튼이 눌렸습니다.");
            props.checkEdited(true);
        } else {
            console.log("취소 버튼이 눌렸습니다.");
            props.checkEdited(false);
        }
        
    };

    return (
        <div>
            <p>CertificateEditForm 불려왔습니다.</p>
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
                value={date} 
                placeholder="2000-00-00"
                onChange={(e) => {setDate(e.target.value)}}>
            </input>
            <button name="accept" onClick={handleClick}>완료</button>
            <button name="cancel" onClick={handleClick}>취소</button>
        
        </div>
    );
};

export default CertificateEditForm;

// 유저 수정 부분. 
// const res = await Api.put(`users/${user.id}`, {
//     name,
//     email,
//     description,
//   });
//   // 유저 정보는 response의 data임.
//   const updatedUser = res.data;
//   // 해당 유저 정보로 user을 세팅함.
//   setUser(updatedUser);

//   // isEditing을 false로 세팅함.
//   setIsEditing(false);
// };
