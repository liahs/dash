
import React,{useState,useEffect} from "react";
import '../assets/css/icons.css'
import { Card, CardHeader, CardBody, CardTitle,CardSubtitle, Row, Col } from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import axios from 'axios'
import Api from '../defaultApi'
const transport =axios.create({
  withCredentials:true
})

export default function RescueTab(props){
  const [head,setHead]=useState('')
  const [subhead,setSubhead]=useState('')
  const [modal, setModal] = useState(false)
  const [isloaded,setloader]=useState(true)
  const [data,setData]=useState([])
  const [steps,setSteps]=useState([])
  const [type,setType]=useState('Jump start')
  const [typeId,setTypeid]=useState(null)

  
  async function _getData(){
        let {data} =await transport(Api+'/admin/getrescueservices')
        if(data.status){
          setloader(false)
          setData(data.services)
        }else{
          setloader(true)
        }
  }

  useEffect(()=>{
    _getData()
  },[false])

const loadTypes = async (id,type) => 
{
  let {data}=await transport(Api+'/admin/getrescuesteps/'+id)
  if(data.status){
    console.log(data)
    setSteps(data.steps)
  }
  else{
    setSteps([])
  }
  setTypeid(id)
  setType(type)
  setModal(!modal)
}

const TableSteps=(type)=>{
      return(
<></>
      )
}
const addSteps=async ()=>{
  let {data}=await transport.post(Api+'/admin/addrescueSteps',{
    type:typeId,
    stephead:head,
    stepsubhead:subhead
  })
  if(data.status){
    setSteps(data.steps.steps)
  }
  setHead('')
  setSubhead('')
}
const toggle=()=>setModal(!modal)
const handleChangeText=(e)=>{
  switch(e.target.name){
    case "head":
      setHead(e.target.value)
      break
    case "subhead":
      setSubhead(e.target.value)
  }
}

return(
  <>
{isloaded?<div className="content">Loading.....</div>: 
<div className="content">
<Modal isOpen={modal} toggle={toggle}>
<ModalHeader toggle={toggle}>{type} Steps</ModalHeader>
        <ModalBody style={{height:300,overflow:'hidden',overflowY:'scroll'}}>
          {steps.map(x=>{
            return(
              <div className="bg-light rounded mt-1 m-2 pl-2 py-2">
                <h5 >{x.head}</h5>
                <small>{x.subhead}</small>
              </div>
            )
          })}
         </ModalBody>
        <ModalFooter>
          <div className="form-group">
          <input className="form-control" type="text" name="head" value={head} placeholder="Head" onChange={handleChangeText}></input>
          </div>
          <div className="form-group">
          <input className="form-control" type="text" name="subhead" value={subhead} placeholder="SubHead" onChange={handleChangeText} ></input>
         </div>
          <button className="btn btn-success" onClick={addSteps}>Add</button>
        </ModalFooter>
      </Modal>
<Row className="align-center">
{data.map(x=>{
  return(
  <Card className="col-sm-12 col-md-3 col-lg-3 sm-mx-auto" style={{width:200}} >
  <CardBody>
   <CardTitle style={{fontSize:13 ,fontFamily:'inherit'}}>Rescue: {x.rescueservicetype}</CardTitle>
   <CardSubtitle style={{fontSize:11}} >Price : {x.price}</CardSubtitle>
   <hr/>
   </CardBody>
    <CardBody className="d-flex justify-content-center">
    <img  src={Api+`${x.icon}`}  width={50} height={50} alt="Card image cap" />
    </CardBody>
    <Row className="d-flex justify-content-center">
    <button className=" btn btn-outline-success btn-sm  rounded " style={{fontSize:10}} >Edit</button>
    <button className=" btn btn-outline-danger btn-sm mx-3 rounded " style={{fontSize:10}}>Delete</button>
    <button className=" btn btn-outline-dark btn-sm  rounded" onClick={()=>{loadTypes(x._id,x.rescueservicetype)}} style={{fontSize:10}}>Steps</button>
    </Row>
    </Card>
  )
})}
<Card className="col-sm-12 col-md-3 col-lg-3 sm-mx-auto" style={{width:200}}>
    <CardBody className="d-flex justify-content-center">
      <button className="btn btn-light" style={{width:"100%"}}>+</button>
    </CardBody>
</Card>
</Row>
<Row>
</Row>
</div>
}
</>)
}
