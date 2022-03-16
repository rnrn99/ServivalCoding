import React from "react";

import CertificateEditForm from "./CertificateEditForm";
import CertificateCard from "./CertificateCard";

//Certicate 모듈입니다. CertificateCard 와 CertificateEditForm 을 호출합니다.

//<CertificateEditForm />
const Certicate = ({title, description, when_date}) => {
    return (
        <div>
            <CertificateCard 
                title={title}
                description={description}
                when_date={when_date}
            />
        </div>
    );
};
//CertificateCard = ({title, description, when_date})
export default Certicate;