import logo from './logo.svg';
import React, {useState, useEffect} from "react";
import './App.css';
import {Table, Col, Container, Row, Modal, Button, Toast, ToastContainer} from "react-bootstrap";
import {deleteClient, fetClientList} from "./api"

const data = [
    {
        "name": "AUMM CONSORTIUM PRIVATE LIMITED",
        "activity": "CONSTRUCTION",
        "CIN": "U45203MH2021PTC365079",
        "category": "COMPANY LIMITED BY SHARES",
        "subCategory": "NON-GOVT COMPANY",
        "class": "PRIVATE",
        "ROC": "MUMBAI",
        "status": "ACTIVE",
        "isCompanyListed": "UnListed",
        "authorizedCapital": 100000,
        "paidUpCapital": 100000,
        "contactDetail": {
            "state": " MAHARASHTRA",
            "zipCode": "400081",
            "country": "INDIA",
            "address": "7 FLOOR, SUNPLAZA BUILDING, HARI OM NAGAR, MULUND (E) MUMBAI THANE MH 400081 IN ",
            "email": "anshmalik207@gmail.com"
        },
        "__v": 0
    },
    {
        "name": "AUSBRICAN IMMIGRATION SERVICES PRIVATE LIMITED",
        "activity": "OTHER BUSINESS ACTIVITIES",
        "CIN": "U74999UP2021PTC149936",
        "category": "COMPANY LIMITED BY SHARES",
        "subCategory": "NON-GOVT COMPANY",
        "class": "PRIVATE",
        "ROC": "KANPUR",
        "status": "ACTIVE",
        "isCompanyListed": "UnListed",
        "authorizedCapital": 1000000,
        "paidUpCapital": 100000,
        "contactDetail": {
            "state": " UTTAR PRADESH",
            "zipCode": "226002",
            "country": "INDIA",
            "address": "592 KA/101 OLD NO. 67 SUBHANI KHERA TEHSEEL SAROJINI NAGAR LUCKNOW LUCKNOW UP 226002 IN ",
            "email": "msufiyan81@gmail.com"
        },
        "__v": 0
    },
    {
        "name": "AVROZEN TECHNOLOGIES PRIVATE LIMITED",
        "activity": "COMPUTER AND RELATED ACTIVITIES",
        "CIN": "U72900PN2021PTC203104",
        "category": "COMPANY LIMITED BY SHARES",
        "subCategory": "NON-GOVT COMPANY",
        "class": "PRIVATE",
        "ROC": "PUNE",
        "status": "ACTIVE",
        "isCompanyListed": "UnListed",
        "authorizedCapital": 100000,
        "paidUpCapital": 100000,
        "contactDetail": {
            "state": " MAHARASHTRA",
            "zipCode": "411040",
            "country": "INDIA",
            "address": "FLAT 3103, CLOVER HEIGHTS, BL 3, S N 60/4-6, WANOWARIE PUNE PUNE MH 411040 IN ",
            "email": "director@avrozen.com"
        },
        "__v": 0
    },
    {
        "name": "AWARTAN SHEEL NATURE FARMING PRODUCER COMPANY LIMITED",
        "activity": "ACTIVITIES AGRICULTURE, HUNTING AND RELATED SERVICE ACTIVITIES",
        "CIN": "U01100UP2021PTC149962",
        "category": "COMPANY LIMITED BY SHARES",
        "subCategory": "NON-GOVT COMPANY",
        "class": "PRIVATE",
        "ROC": "KANPUR",
        "status": "ACTIVE",
        "isCompanyListed": "UnListed",
        "authorizedCapital": 1500000,
        "paidUpCapital": 500000,
        "contactDetail": {
            "state": " UTTAR PRADESH",
            "zipCode": "209801",
            "country": "INDIA",
            "address": "C/O JAGVEER SINGH MAUHARI PATARI UNNAO UNNAO UP 209801 IN ",
            "email": "unnaofpo1director1@gmail.com"
        },
        "__v": 0
    },
    {
        "name": "AWSS RENEWABLE ENERGY PRIVATE LIMITED",
        "activity": "MANUFACTURE OF MACHINERY AND EQUIPMENT N.E.C.",
        "CIN": "U29199TN2021PTC145195",
        "category": "COMPANY LIMITED BY SHARES",
        "subCategory": "NON-GOVT COMPANY",
        "class": "PRIVATE",
        "ROC": "CHENNAI",
        "status": "ACTIVE",
        "isCompanyListed": "UnListed",
        "authorizedCapital": 1500000,
        "paidUpCapital": 100000,
        "contactDetail": {
            "state": " TAMIL NADU",
            "zipCode": "600117",
            "country": "INDIA",
            "address": "PLOT NO.56, DOOR NO. 12/621, TAMILGUDIMAGAN NAGAR, 5TH STREET, KOVILAMBAKKAM KANCHEEPURAM TN 600117 IN ",
            "email": "asianwss@gmail.com"
        },
        "__v": 0
    }
]


const App = () => {
    const [clients, setClients] = useState([])
    const [show, setShow] = useState(false);
    const [toastShow, setToastShow] = useState(false);
    const [toastMessage,setToastMessage] = useState('')
    const [profileInfo, setProfileInfo] = useState({})

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const loadClientList = () => {
        fetClientList().then(response => {
            const statusCode = response.status
            if (statusCode === 200) {
                setToastMessage(response.data.message)
                setToastShow(true)
                setClients(response.data.data)
                setTimeout(() => setToastShow(false),3000)
            }
        }).catch(error => {

        })
    }
    useEffect(() => {
       loadClientList()
    }, [])

    return (
        <Container>
            <div>

                <ToastContainer position="top-end">
                    <Toast show={toastShow}  bg={"success"} autohide={true}>
                        <Toast.Header>
                            <small>Update!</small>
                        </Toast.Header>
                        <Toast.Body >{toastMessage}</Toast.Body>
                    </Toast>
                </ToastContainer>
                <Table striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Company Name</th>
                        <th>Activity</th>
                        <th>CIN</th>
                        <th>ProfileLink</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        clients.map((row, index) => {
                            return <tr key={row.name}>
                                <td>{index + 1}</td>
                                <td>{row.name}</td>
                                <td>{row.activity}</td>
                                <td>{row.CIN}</td>
                                <td>{row.contactDetail.email}</td>
                                <td>
                                    <img style={{width: "48px", padding: "8px", height: "48px"}}
                                         onClick={() => {
                                             handleShow()
                                             setProfileInfo(row)
                                         }}
                                         src={`https://freeiconshop.com/wp-content/uploads/edd/edit-flat.png`}/>
                                </td>

                                <td>
                                    <img style={{width: "48px", padding: "8px", height: "48px"}}
                                         onClick={() => {
                                             deleteClient(row.CIN).then(response => {
                                                 setToastMessage(response.data.message)
                                                 setToastShow(true)
                                                 loadClientList()
                                             }).catch(error => {
                                                 setToastMessage(`Something went wrong while deleting client`)
                                                 setToastShow(true)
                                             })
                                         }}
                                         src={`https://lh3.googleusercontent.com/G2jzG8a6-GAA4yhxx3XMJfPXsm6_pluyeEWKr9I5swUGF62d2xo_Qg3Kdnu00HAmDQ`}/>

                                </td>
                            </tr>
                        })
                    }

                    </tbody>
                </Table>
                <Modal show={show} onHide={handleClose} size={"lg"}>
                    <Modal.Header closeButton>
                        <Modal.Title>{profileInfo.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table striped bordered hover size="sm">
                            <tbody>
                            {console.log(profileInfo)}
                            {/* eslint-disable-next-line eqeqeq */}
                            {Object.keys(profileInfo).filter(column => column !== "__V").map(column => {
                                return <tr>
                                    <td>{column.toUpperCase()}</td>
                                    {column !== "contactDetail" ?
                                        <td><input defaultValue={profileInfo[column]} style={{minWidth: "100%"}}/>
                                        </td> : Object.keys(profileInfo[column]).map(contactDetailColumn => {
                                            return <tr>
                                                <td>{contactDetailColumn.toUpperCase()}</td>
                                                <td style={{width: "100%"}}>
                                                    <input defaultValue={profileInfo[column][contactDetailColumn]}
                                                           onChange={() => {
                                                           }} style={{minWidth: "100%"}}/>
                                                </td>
                                            </tr>
                                        })
                                    }
                                </tr>
                            })}
                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </Container>
    );
}

export default App;
