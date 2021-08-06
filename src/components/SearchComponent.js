import React from "react";
import {Button, Form} from "react-bootstrap";
import {useSelector, useDispatch} from "react-redux";
import {searchClient} from "../api";
import {searchNameAction, searchEmailAction, showClients, searchCINACTION} from "../redux"

const SearchComponent = ({showToast}) => {
    const dispatch = useDispatch()
    const name = useSelector(state => state.search.name)
    const email = useSelector(state => state.search.email)
    const cin = useSelector(state => state.search.CIN)
    return (
        <Form style={{marginTop: "20px", backgroundColor: "#E8EAF6", padding: "20px", borderRadius: "7px"}}>
            <Form.Label as="legend" style={{color: '#0062ff'}} size="lg"> Search</Form.Label>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Company Name</Form.Label>
                <Form.Control type="text" defaultValue={name} placeholder="Enter Name"
                              onChange={(event => {
                                  dispatch(searchNameAction(event.target.value))
                              })}/>
                <Form.Text className="text-muted">
                    Company name search supports `*keyword*`/i operator
                </Form.Text>
            </Form.Group>


            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Company CIN</Form.Label>
                <Form.Control defaultValue={cin} size={21} type={"text"} placeholder="Enter CIN"
                              onChange={(event => {
                                  dispatch(searchCINACTION(event.target.value))
                              })}/>
                <Form.Text className="text-muted">
                    You should enter full CIN which is 21 characters in length
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Company email</Form.Label>
                <Form.Control defaultValue={email} type="text" placeholder="Enter email"
                              onChange={(event => {
                                  dispatch(searchEmailAction(event.target.value))
                              })}/>
                <Form.Text className="text-muted">
                    Email search supports `*keyword*`/i operator
                </Form.Text>
            </Form.Group>


            {/* search client list based on user given criteria*/}
            <Button variant="primary" type="button" onClick={(event) => {
                searchClient({name, email, CIN: cin}).then(response => {
                    const statusCode = response.status
                    if (statusCode === 200) {
                        showToast(response.data.message, 'success')
                        dispatch(showClients(response.data.data))
                    }
                }).catch(error => {
                    showToast(error.message, 'error')
                })
            }}>
                Search
            </Button>
        </Form>)
}

export default SearchComponent