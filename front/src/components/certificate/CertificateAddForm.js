import React, {useState} from "react";

const CertificateAddForm = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");

    const handleChange = () => {

    };

    return (
        <div>
            CertificateAddForm 불려왔습니다.
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
            <button>OK</button>
        </div>
    );
};

export default CertificateAddForm;