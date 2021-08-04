import logo from './logo.svg';
import React, {useState, useEffect} from "react";
import './App.css';
import {Table, Col, Container, Row, Modal, Button, Form} from "react-bootstrap";
import {deleteClient, getClientInfo, fetClientList, searchClient} from "./api"
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
    const [clients, setClients] = useState([])
    const [show, setShow] = useState(false);
    const [profileInfo, setProfileInfo] = useState({})
    const [searchParam, setSearchParams] = useState({CIN: "", name: "", email: ""})
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const showToast = (message, type) => {
        toast[type](`${message}`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    const loadClientList = () => {
        fetClientList().then(response => {
            const statusCode = response.status
            if (statusCode === 200) {
                showToast(response.data.message, 'success')
                setClients(response.data.data)
            }
        }).catch(error => {
            showToast(error.message, 'error')
        })
    }
    useEffect(() => {
        loadClientList()
    }, [])

    return (
        <Container>
            <div>
                <Form onSubmit={() => {
                    console.log(searchParam)
                }}>
                    <Form.Label as="legend" style={{color: 'green'}} size="lg"> Search</Form.Label>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Company Name</Form.Label>
                        <Form.Control type="text" defaultValue={searchParam.name} placeholder="Enter Name"
                                      onChange={(event => {
                                          setSearchParams(prevState => {
                                              return {
                                                  ...prevState,
                                                  name: event.target.value
                                              }
                                          })
                                      })}/>
                        <Form.Text className="text-muted">
                            Company name search supports `*keyword*`/i operator
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Company CIN</Form.Label>
                        <Form.Control defaultValue={searchParam.CIN} size={21} type={"text"} placeholder="Enter CIN"
                                      onChange={(event => {
                                          setSearchParams(prevState => {
                                              return {
                                                  ...prevState,
                                                  CIN: event.target.value
                                              }
                                          })
                                      })}/>
                        <Form.Text className="text-muted">
                            You should enter full CIN which is 21 characters in length
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Company email</Form.Label>
                        <Form.Control defaultValue={searchParam.email} type="text" placeholder="Enter email"
                                      onChange={(event => {
                                          setSearchParams(prevState => {
                                              return {
                                                  ...prevState,
                                                  email: event.target.value
                                              }
                                          })
                                      })}/>
                        <Form.Text className="text-muted">
                            Email search supports `*keyword*`/i operator
                        </Form.Text>
                    </Form.Group>


                    <Button variant="primary" type="button" onClick={(event) => {
                        searchClient(searchParam).then(response => {
                            const statusCode = response.status
                            if (statusCode === 200) {
                                showToast(response.data.message, 'success')
                                setClients(response.data.data)
                            }
                        }).catch(error => {
                            showToast(error.message, 'error')
                        })
                    }}>
                        Search
                    </Button>
                </Form>
                <ToastContainer/>
                <Table striped bordered hover size="sm" style={{marginTop: '24px'}}>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Company Name</th>
                        <th>Activity</th>
                        <th>CIN</th>
                        <th>Email</th>
                        <th>View/Edit</th>
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
                                <td><a href={"mailto:" + row.contactDetail.email}>{row.contactDetail.email}</a>
                                </td>
                                <td>
                                    <img style={{width: "48px", padding: "8px", height: "48px"}}
                                         onClick={() => {
                                             getClientInfo(row.CIN).then(response => {
                                                 const statusCode = response.status
                                                 if (statusCode === 200) {
                                                     showToast(response.data.message, 'success')
                                                     handleShow()
                                                     setProfileInfo(response.data.data)
                                                 }                                }).catch(error => {
                                                 showToast(error.message, 'error')
                                             })
                                         }}
                                         src={`https://freeiconshop.com/wp-content/uploads/edd/edit-flat.png`}/>
                                </td>

                                <td>
                                    <img style={{width: "48px", padding: "8px", height: "48px"}}
                                         onClick={() => {
                                             setProfileInfo(row)
                                             deleteClient(row.CIN).then(response => {
                                                 showToast(response.data.message, 'error')
                                                 loadClientList()
                                             }).catch(error => {
                                                 showToast(`Something went wrong while deleting client`, 'error')
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
