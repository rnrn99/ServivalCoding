import React, {useState, useEffect} from 'react';
import {Card, Row, Col, Button} from "react-bootstrap";
import axios from "axios";

function Awards ({portfolioOwnerId}) {
    const [awardList, setAwardList] = useState([])
    useEffect(() =>
        axios.get('awards', portfolioOwnerId).then((res) => setAwardList(res.data))
    )
    return (
       <>hello</>
    )
}

export default Awards;