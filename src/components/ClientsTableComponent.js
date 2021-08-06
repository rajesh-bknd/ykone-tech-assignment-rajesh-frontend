import {Col, Row, Table} from "react-bootstrap";
import {useSelector, useDispatch} from "react-redux";
import {deleteClientApi, fetClientList, getClientInfo} from "../api";
import React, {forwardRef, useEffect, useImperativeHandle} from "react";
import {showClients, deleteClient, editClient} from "../redux"

const ClientsTableComponent = forwardRef(({
                                              setProfileInfo,
                                              setIsNewProfile,
                                              handleShow,
                                              showToast,
                                              setEditableFields
                                          }, ref) => {
    const dispatch = useDispatch()
    const clients = useSelector(state => state.client.clients)


    useImperativeHandle(ref, () => ({
        loadClients() {
            loadClientList()
        }
    }));
    // load client list from api
    const loadClientList = () => {
        fetClientList().then(response => {
            const statusCode = response.status
            if (statusCode === 200) {
                showToast(response.data.message, 'success')
                dispatch(showClients(response.data.data))
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
        <div>
            {/*show total number of clients*/}
            <Row><Col lg={4}><h4 style={{
                borderRadius: "2px",
                textAlign: "center",
                backgroundColor: "#4CAF50",
                padding: "12px",
                color: "#E8F5E9"
            }}>Total Clients - {clients.length}</h4></Col></Row>


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
                                                 setEditableFields(["CIN", "_id"])
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
                                         //setProfileInfo(row)
                                         deleteClientApi(row.CIN).then(response => {
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
        </div>
    )
})

export default ClientsTableComponent