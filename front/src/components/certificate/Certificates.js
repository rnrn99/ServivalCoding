import React from "react";

import Certificate from "./Certificate"
import CertificateAddForm from "./CertificateAddForm";

//Certificates 모듈의 컨테이너
//components/Portfolio에 전달된다.
//호출된 Certificates는 유저정보를 기반으로 DB에서 자격증정보를 받음
//개별 자격증 데이터는 Certificate 단위 로 관리됨
//Certificates 모듈은 자격증의 Certificate의 리스트를 출력함 
//개별 Certificate는 CertificateCard의 형태로 표현됨
//자격증정보가 없을 경우, 추가할 경우 CertificateAddForm을 불러옴
//개별 자격증 Certificate의 수정이 일어날 때는 CertificateEditForm을 불러옴
//
//***Certificates 모듈의 구조 ***//
//
//Certicates
// ㄴCertificateAddForm
// ㄴCertificate
//    ㄴCertificateCard
//    ㄴCertificateEditForm
//
//논리적인 구조일 뿐이며, 
// ./contents/certificate 폴더에 해당 모듈파일들 전부 담는다.

const Certificates = () => {
    return (
        <>
            <h1>Certificates 모듈입니다. 작성중입니다.</h1>
            <p>목록 불러오기 </p>
            <Certificate />
            <CertificateAddForm />
            
            <button>추가하기</button>
            
        </>
    );
};

export default Certificates;