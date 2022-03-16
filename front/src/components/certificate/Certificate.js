import React from "react";

import CertificateEditForm from "./CertificateEditForm";
import CertificateCard from "./CertificateCard";

const Certicate = () => {
    return (
        <div>
            <p>Certicate 모듈입니다. CertificateCard 와 CertificateEditForm 을 호출합니다.</p>
            <CertificateCard />
            <CertificateEditForm />
        </div>
    );
};

export default Certicate;