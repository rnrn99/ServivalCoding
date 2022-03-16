import React from "react";

const CertificateCard = ({title, description, when_date}) => {
    return (
        <div>
            <p>자격증:{title} 설명:{description} 취득일:{when_date}</p>
        </div>
    );
};

export default CertificateCard;