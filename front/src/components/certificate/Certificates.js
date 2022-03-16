import React from "react";

import Certificate from "./Certificate"
import CertificateAddForm from "./CertificateAddForm";

// Certificates 모듈의 컨테이너
// components/Portfolio에 전달된다.
// 호출된 Certificates는 유저정보를 기반으로 DB에서 자격증정보를 받음
// 개별 자격증 데이터는 Certificate 단위 로 관리됨
// Certificates 모듈은 자격증의 Certificate의 리스트를 출력함 
// 개별 Certificate는 CertificateCard의 형태로 표현됨
// 자격증정보가 없을 경우, 추가할 경우 CertificateAddForm을 불러옴
// 개별 자격증 Certificate의 수정이 일어날 때는 CertificateEditForm을 불러옴

// ***Certificates 모듈의 구조 ***//

// Certicates
// ㄴCertificateAddForm
// ㄴCertificate
//    ㄴCertificateCard
//    ㄴCertificateEditForm

// 논리적인 구조일 뿐이며, 
// ./contents/certificate 폴더에 해당 모듈파일들 전부 담는다.


//지금 포트폴리오를 보고 있는 유저가 작성자 인지 확인. 
//작성자가 Certificates에 접근한 경우, 
//리스트를 뿌릴때 Certificate에 인자를 전달하여 CertificateEditFrom을 활성화 할수 있도록 한다. < 삭제도 포함된다.
//작성자가 보고 있지 않은 경우에는 수정 폼을 비활성화 한다. 

const testData = [
    {"user_id":"af4ff0af-2a5f-4eea-99f2-d18b42aba419",
    "title":"운전면허증",
    "description":"2종 보통입니다.",
    "when_date":"2021-03-20"},
    {"user_id":"af4ff0af-2a5f-4eea-99f2-d18b42aba419",
    "title":"꽃꽂이 전문가",
    "description":"1급입니다.",
    "when_date":"2021-08-23"},
    {"user_id":"af4ff0af-2a5f-4eea-99f2-d18b42aba419",
    "title":"백수생활 준전문가",
    "description":"준전문가입니다.",
    "when_date":"2022-01-11"},
];


const setCertificates = () => {
    const certList = testData;

    return certList.map((cert) => {
        return <Certificate 
            title={cert.title}
            description={cert.description}
            when_date={cert.when_date}
        />;
    });
    
};

//<h1>Certificates 모듈입니다.</h1>
//사용자가 오너일 경우
//<button>추가하기</button> << 활성화
////<CertificateAddForm /> <<버튼이 눌리면 활성화.
const Certificates = () => {
    return (
        <>
            <p>자격증 목록</p>
            {setCertificates()}
            
        </>
    );
};

export default Certificates;