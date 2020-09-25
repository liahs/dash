
import React, { useEffect, useState } from "react";

import { Card, CardHeader, CardBody, Row, Col, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import axios from 'axios'
import Api from '../defaultApi'
import {socket} from '../socketCon'


export default function Requests() {
  const [rrequests, setRrequests] = useState([])
  const [steps, setSteps] = useState([])
  const [modal, setModal] = useState(false)
  const [dwork, setDwork] = useState(0)
  const [rid,setRid]=useState('')
  const [users,setUsers]=useState([])
  let [rarr,setRarr]=useState([])
  const [stepsdone,setStepdone]=useState(0)
  const token=localStorage.getItem('token')
  
  const fetchData = async () => {
    const { data } = await axios.get(Api + '/admin/getRescueRequest',{
      headers:{
        'authorization':token
      }
    })
    if (data.status) {
      setRrequests(data.data.reverse())
      console.log(data)
    }
    const x=await axios.get(Api+'/admin/users',{
      headers:{
        'authorization':token
      }
    })
    if(x.data.status){
      setUsers(x.data.users)
    }
  }

const _getData=async ()=>{
    let { data } = await axios.get(Api + '/admin/getrescueservices',{
      headers:{
        'authorization':token
      }
    })
    if (data.status) {
      setRarr(data.services)
    }
  }
  const callChanges = async () => {
    setDwork(dwork + 1)
    let { data } = await axios.post(Api + '/admin/changesinsteps', {
      steps: dwork,
      rid:rid
    },{
      headers:{
        'authorization':token
      }
    })
    if(data.status){
      console.log("working!!!!")
      setStepdone(stepsdone+1)
    }
  }

  const loadSteps = async (id,Rid,nstep) => {
    let { data } = await axios.get(Api + '/admin/getrescuesteps/' + id,{
      headers:{
        'authorization':token
      }
    })
    if (data.status) {
      setSteps(data.steps)
    }
    else {
      setSteps([])
      console.log('data')
    }
    setRid(Rid)
    setStepdone(nstep)
    setModal(!modal)
  }
  const toggle = () => setModal(!modal)
  useEffect(() => {
    _getData()
    socket.on('rescueRequest',(data)=>{
      _getData()
      fetchData()
    })
    fetchData()
    return () => { }
  }, [false])
  return (
    <div className="content">
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Steps Processing</ModalHeader>
        <ModalBody style={{height:"300px",overflow:'hidden',overflowY:"scroll"}}>
          {steps.map((x,i) => {
            let checked=false
            if(i<stepsdone+1){
              checked=true
            }
            return (
              <Row>
                <div className="py-3 px-2">
                  <input type="checkbox" checked={checked} onChange={(e) => {
                    callChanges()
                  }} disabled={stepsdone+1<i||i<stepsdone+1}></input>
                </div>
                <div className="bg-light rounded mt-1 m-2 pl-2 py-2" style={{ width: "70%" }}>
                  <h5 >{x.head}</h5>
                  <small>{x.subhead}</small>
                </div>
              </Row>
            )
          })}
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-outline-success btn-sm" onClick={toggle}>Done</button>
        </ModalFooter>
      </Modal>
      {rrequests.length > 0 ?
        <React.Fragment>
          <Row>
            <Col md="3"><button className="btn btn-success">Rescue</button></Col>
          </Row>
          <Row>
            <div className="table-responsive">
              <table className="table table-sm table-light">
                <thead>
                  <tr>
                    <th scope="col">Sno.</th>
                    <th scope="col">User</th>
                    <th scope="col">RescueType</th>
                    <th scope="col">Location</th>
                    <th scope="col">Time</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rrequests.map((x, index) => {
                    return (
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{{...users.find(z=>z._id==x.user)}.name}</td>
                        <td>{rarr.find(z=>z._id==x.rescuetype).rescueservicetype}</td>
                        <td>{x.longitude}</td>
                        <td>{new Date(x.timestamp).getHours()}:{new Date(x.timestamp).getMinutes()}:{new Date(x.timestamp).getSeconds()}</td>
                        <td><button className="btn btn-sm btn-outline-success rounded" onClick={loadSteps.bind(this, x.rescuetype,x._id,x.stepsdone)}>Steps</button></td>
                      </tr>
                    )
                  })
                  }
                </tbody>
              </table>
            </div>
          </Row>
        </React.Fragment> : <p>loading....</p>
      }
    </div>
  )
}
