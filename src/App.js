import logo from './logo.svg';
import React, {useState, useEffect, useRef} from "react";
import './App.css';
import {Table, Container, Modal, Button, Form} from "react-bootstrap";
import {deleteClientApi, getClientInfo, createClient, fetClientList, searchClient, updateClient} from "./api"
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import {Provider} from "react-redux";
import store from "./redux/store"
import SearchComponent from "./components/SearchComponent";
import ClientsTableComponent from "./components/ClientsTableComponent";

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



const App = () => {
    const clientsTableRef = useRef();

    // show or hide the client profile info box
    const [show, setShow] = useState(false);

    // editableFields
    const [disableInputFields,setEditableFields] = useState(["CIN", "_id"])

    // when isNewProfile == false  - user cannot edit CIN AND _ID
    const [isNewProfile, setIsNewProfile] = useState(false)

    // sets profile info for currently handing client
    const [profileInfo, setProfileInfo] = useState({})

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
                    // loadClientList()
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
                    clientsTableRef.current.loadClients()
                    handleClose()
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


    return (
        <Provider store={store}>
            <Container>
                <SearchComponent showToast={showToast}/>
                <div>
                    <Button style={{margin: "12px 12px 12px 0px", float: "right"}} variant={"success"} type={"button"}
                            onClick={() => {
                                setProfileInfo(newProfileInfo)
                                setIsNewProfile(true)
                                setEditableFields(["_id"])
                                handleShow()
                            }}> Add new company</Button>
                    <Button style={{margin: "12px 12px 0px 0px", float: "right"}} variant={"outline-primary"}
                            type={"button"}
                            onClick={() => {
                                // client table component -  fetch clients api
                                clientsTableRef.current.loadClients()
                            }}> <img style={{maxHeight: "22px"}}
                                     src={`https://image.flaticon.com/icons/png/32/3208/3208747.png`}/>&nbsp;Reload</Button>

                    <ToastContainer/>

                    <ClientsTableComponent ref={clientsTableRef} setIsNewProfile={setIsNewProfile}
                                           handleShow={handleShow} showToast={showToast} setProfileInfo={setProfileInfo} setEditableFields={setEditableFields}/>

                    <Modal show={show} onHide={handleClose} size={"lg"}>
                        <Modal.Header closeButton>
                            <Modal.Title>{profileInfo.name}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Table striped bordered hover size="sm">
                                <tbody>
                                {/* generates clientTable row from client list response */}
                                {Object.keys(profileInfo).filter(column => column !== "__V").map(column => {
                                    return <tr>
                                        <td>{column.toUpperCase()}</td>
                                        {/* when column is contactDetail create nested clientTable to show email, country, zip code */}
                                        {column !== "contactDetail" ?
                                            <td><input
                                                onChange={(event) => {
                                                    profileInfo[column] = event.target.value
                                                    setProfileInfo({...profileInfo})
                                                    console.log(profileInfo)
                                                }}
                                                disabled={disableInputFields.includes(column)}
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
        </Provider>
    );
}

export default App;
