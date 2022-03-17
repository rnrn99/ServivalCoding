import React, {useEffect, useState} from "react";
//import { Button } from "react-bootstrap";
import * as Api from "../../api";
import Certificate from "./Certificate";
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

//Certificates는 Portfolio 모듈에서 호출되는 시점 prop으로
// portfolioOwnerId={portfolioOwner.id}
// isEditable={portfolioOwner.id === userState.user?.id}
// 를 전달받는다. 
//
//portfolioOwnerId 는 현재 그려지고 있는 사용자(작성자)의 id 
//isEditable 는 boolean 값으로 포트폴리오를 요청한 사용자일 경우에만 수정 가능하도록한다.




//<h1>Certificates 모듈입니다.</h1>
//Portfolio에서 전달 받은 portfolioOwnerId 로 서버에 데이터를 요청함.
//사용자가 오너일 경우 isEditable은 true 값을 갖게됨.
//<button>추가하기</button> << 활성화
////<CertificateAddForm /> <<버튼이 눌리면 활성화.
const Certificates = ({ portfolioOwnerId, isEditable }) => {

    //서버에서 받아온 자격증 데이터
    const [certs, setCerts] = useState([]);
    //isAdd는 자격증 항목을 추가하기 버튼을 눌렀을 때 활성화
    //추가하기인 상황에서는 추가하기 버튼이 보여선 안됨 
    //때문에 isEditable && !isAdd 로 숨김
    const [isAdd, setIsAdd] = useState(false);

    useEffect(() => {
        Api.get("certificatelist", portfolioOwnerId)
            .then((res) => setCerts(res.data));
    }, [portfolioOwnerId]);



    const setCertificateList = () => {  
        return certs.map((cert) => {
            return <Certificate 
                key = {cert.id}
                cert = {cert}
                isEditable = {isEditable}
                checkModified = {checkModified}
                title={cert.title}
                description={cert.description}
                when_date={cert.when_date}
            />;
        });      
    };

    //추가하기가 완료되었는지 체크를 위해 
    //isAddComplete 스테이트를 건들수 있는 함수를 AddForm에 전달함
    //AddForm에서는 완료 버튼이 눌렸을 때 결과 값들을 보내줌
    //props에는 서버로 post할 자격증 정보가 담겨있음
    const checkAddComplete = async (props) => {
  
        console.log("Check Add Complete");
        if(props) {
            //데이터를 업데이트 합니다. 
            const newData = {
                ...props,
                user_id: portfolioOwnerId,
            }
            console.log(newData);
            await Api.post("certificate/create", newData);
            const res = await Api.get("certificatelist", portfolioOwnerId);
            setCerts(res.data);
        }

        //추가하기가 완료되어 AddForm은 닫아줍니다.
        setIsAdd(false);
    };

    const checkModified = async (id, props) => {
        //certificate 에서 수정이 이뤄진경우 데이터 처리. 
        //id는 param으로 전달된 상태이기때문에 프랍만.
        await Api.put(`certificates/${id}`, props);
        const res = await Api.get("certificatelist", portfolioOwnerId);
        setCerts(res.data);
    }

    const handleClick = (e) => {
        e.preventDefault();
        console.log("handleClick 추가하기 버튼이 눌렸습니다.")
        setIsAdd(true);
    };

    return (
        <>
            <p>자격증 목록</p>
            {setCertificateList()}
            {(isEditable && !isAdd) && (<button onClick={handleClick}>자격증 추가하기</button>)}
            {isAdd && <CertificateAddForm checkAddComplete = {checkAddComplete}/>}
        </>
    );
};

export default Certificates;