import logo from './logo.svg';
import React, {useState, useEffect} from "react";
import './App.css';
import {Table, Container, Modal, Button, Form} from "react-bootstrap";
import {deleteClient, getClientInfo, createClient, fetClientList, searchClient, updateClient} from "./api"
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const newProfileInfo = {
    profileUrl: "",
    name: "",
    activity: "",
    CIN: "",
    registrationDate: "",
    category: "",
    subCategory: "",
    class: "",
    ROC: "",
    status: "",
    isCompanyListed: "",
    authorizedCapital: "",
    paidUpCapital: "",
    contactDetail: {
        state: "",
        zipCode: "",
        country: "",
        address: "",
        email: ""
    }
}

let disableEditFields = ["CIN", "_id"]

const App = () => {
    // set all clients information
    const [clients, setClients] = useState([])

    // show or hide the client profile info box
    const [show, setShow] = useState(false);

    // when isNewProfile == false  - user cannot edit CIN AND _ID
    const [isNewProfile, setIsNewProfile] = useState(false)

    // sets profile info for currently handing client
    const [profileInfo, setProfileInfo] = useState({})

    // holds search parameters
    const [searchParam, setSearchParams] = useState({CIN: "", name: "", email: ""})
    /**
     * updates profile information
     * @param {Object} event
     * @param {String} clientId
     */
    const saveProfileChanges = (event, clientId) => {
        updateClient(clientId, profileInfo).then(response => {
            if (response.status === 200) {
                if (response.data.status === "success") {
                    showToast(response.data.message, 'success')
                    setShow(false)
                    loadClientList()
                }
                if (response.data.status === "failed") {
                    showToast(response.data.error.errorDescription, 'error', 5000)
                }
            }
        }).catch(error => {
            showToast(error.message, 'error')
        })
    }

    /**
     * create new client profile
     */
    const createNewProfile = () => {
        createClient(profileInfo).then(response => {
            if (response.status === 201) {
                if (response.data.status === "success") {
                    showToast(response.data.message, 'success')
                    handleClose()
                    loadClientList()
                }
            }
            if (response.data.status === "failed") {
                showToast(response.data.error.errorDescription || response.data.error.errorTitle, 'error', 5000)
            }
        }).catch(error => {
            showToast(error.message, 'error')
        })
    };
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    /**
     * @param {String} message
     * @param {String} type
     * @param {Number} duration
     */
    const showToast = (message, type, duration = 2000) => {
        toast[type](`${message}`, {
            position: "top-right",
            autoClose: duration,
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
        // load client list on page load
        loadClientList()
    }, [])

    return (
        <Container>
            <div>
                <Form style={{marginTop: "20px", backgroundColor: "#E8EAF6", padding: "20px", borderRadius: "7px"}}>
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


                    {/* search client list based on user given criteria*/}
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
                <Button style={{margin: "12px 12px 12px 0px", float: "right"}} variant={"success"} type={"button"}
                        onClick={() => {
                            setProfileInfo(newProfileInfo)
                            setIsNewProfile(true)
                            disableEditFields = ["_id"]
                            handleShow()
                        }}> Add new company</Button>
                <Button style={{margin: "12px 12px 0px 0px", float: "right"}} variant={"outline-primary"}
                        type={"button"}
                        onClick={() => {
                            loadClientList()
                        }}> <img style={{maxHeight: "22px"}}
                                 src={`https://image.flaticon.com/icons/png/32/3208/3208747.png`}/>&nbsp;Reload</Button>
                <ToastContainer/>
                <Table striped bordered hover size="sm" style={{marginTop: '24px', backgroundColor: "#ECEFF1"}}>
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
                            return <tr key={row.CIN}>
                                <td>{index + 1}</td>
                                <td>{row.name}</td>
                                <td>{row.activity}</td>
                                <td>{row.CIN}</td>
                                <td><a href={"mailto:" + row.contactDetail.email}>{row.contactDetail.email}</a>
                                </td>
                                <td>
                                    <img style={{width: "48px", padding: "8px", height: "48px"}}
                                         onClick={() => {
                                             setIsNewProfile(false)
                                             getClientInfo(row.CIN).then(response => {
                                                 const statusCode = response.status
                                                 if (statusCode === 200) {
                                                     disableEditFields = ["CIN", "_id"]
                                                     showToast(response.data.message, 'success')
                                                     setProfileInfo(response.data.data)
                                                     handleShow()
                                                 }
                                             }).catch(error => {
                                                 showToast(error.message, 'error')
                                             })
                                         }}
                                         src={`https://image.flaticon.com/icons/png/128/1159/1159633.png`}/>
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
                                         src={`https://image.flaticon.com/icons/png/128/1799/1799391.png`}/>
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
                            {/* generates table row from client list response */}
                            {Object.keys(profileInfo).filter(column => column !== "__V").map(column => {
                                return <tr>
                                    <td>{column.toUpperCase()}</td>
                                    {/* when column is contactDetail create nested table to show email, country, zip code */}
                                    {column !== "contactDetail" ?
                                        <td><input
                                            onChange={(event) => {
                                                profileInfo[column] = event.target.value
                                                setProfileInfo({...profileInfo})
                                                console.log(profileInfo)
                                            }}
                                            disabled={disableEditFields.includes(column)}
                                            defaultValue={profileInfo[column]} style={{minWidth: "100%"}}/>

                                        </td> : Object.keys(profileInfo[column]).map(contactDetailColumn => {
                                            return <tr>
                                                <td>{contactDetailColumn.toUpperCase()}</td>
                                                <td style={{width: "100%"}}>
                                                    <input defaultValue={profileInfo[column][contactDetailColumn]}
                                                           onChange={(event) => {
                                                               profileInfo["contactDetail"][contactDetailColumn] = event.target.value
                                                               setProfileInfo({...profileInfo})
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
                        <Button variant="primary" onClick={(event) => {
                            /*
                            * if isNewProfile == true then createNewProfile else updateProfile
                            * */
                            if (isNewProfile) {
                                createNewProfile()
                            } else {
                                saveProfileChanges(event, profileInfo.CIN)
                            }
                        }}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </Container>
    );
}

export default App;
