/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */

import React from "react";
import ListItem from "../components/listItem/listItem";
import styles from "../assets/css/dashboard.css";
import Api from "../../src/defaultApi"
// import YearPicker from "react-year-picker";
// reactstrap components
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// core components
let carData = [
  {
    id:1,
    carName:"Lamborghini"
  },
  {
    id:2,
    carName:"Bugatti"
  },
  {
    id:3,
    carName:"Ferrari"
  }
]

class CarDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      carName: '',
      models: [],
      addCarModal: false,
      addModelModal: false,
      addEngineModal: false,
    }
    this.getModels = this.getModels.bind(this)
    this.handleCarSubmit = this.handleCarSubmit.bind(this)
    this.handleCarNameChange = this.handleCarNameChange.bind(this)
    this.toggleAddCarModal = this.toggleAddCarModal.bind(this)
    this.toggleAddModelModal = this.toggleAddModelModal.bind(this)
    this.toggleAddEngineModal = this.toggleAddEngineModal.bind(this)
    this.handleYearChange = this.handleYearChange.bind(this)
    this.getCars = this.getCars.bind(this)
  }

  componentDidMount() {
    this.getModels()
    this.getCars()
  }

  getCars(){
    fetch(Api + "/getAllCars", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000"
      },
      // body: JSON.stringify({ }),
    }).then(function(response) {
      return console.log(response)
    }, function(error) {
      return error
    })
  }

  getModels() {
    let date = new Date();
    let year = date.getFullYear()
    let years = []
    for (var i = 1950; i <= year; i++) {
      years.push(i)
    }
    years.reverse();
    this.setState({ models: years })
  }

  toggleAddCarModal = () => {
    this.setState({ addCarModal: !this.state.addCarModal })
  }

  toggleAddModelModal = () => {
    this.setState({ addModelModal: !this.state.addModelModal })
  }

  toggleAddEngineModal = () => {
    this.setState({ addEngineModal: !this.state.addEngineModal })
  }

  handleYearChange(date) {
    console.log(date);
  }

  handleCarSubmit() {

  }

  handleCarNameChange = (e) => {
    console.log(e)
    this.setState({ carName: e.target.value })
  }

  render() {
    return (
      <>
        <div className="content">
          <div className="row">
            <div className="col-sm-4 text-center addcar">
              <div onClick={() => this.toggleAddCarModal()} className="col-sm txt">Add Car{/*  <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-plus-circle" fill="green" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg> */}
              </div>
            </div>

            <div className="col-sm-4 text-center addcar">
              <div onClick={() => this.toggleAddModelModal()} className="col-sm txt">Add Model{/*  <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-plus-circle" fill="green" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg> */}
              </div>
            </div>

            <div className="col-sm-4 text-center addcar">
              <div onClick={() => this.toggleAddEngineModal()} className="col-sm txt">Add Engine {/* <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-plus-circle" fill="green" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg> */}
              </div>
            </div>
          </div>
          <div className="items text-center">
            <div className="listItem">
              <ListItem
                carName="Lamborghini"
                cars={carData}
              />
            </div>
          </div>
          <Modal isOpen={this.state.addCarModal} toggle={this.toggleAddCarModal} className="modal-dialog-centered">
            <ModalHeader toggle={this.toggleAddCarModal}>Add Car</ModalHeader>
            <ModalBody>
              <div className="col-sm text-center">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <div className="carInp">
                      <input type="text" placeholder="Car Make" className="form-control" />
                    </div>
                  </div>
                </form>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.toggleAddCarModal}>ADD</Button>{' '}
              <Button color="secondary" onClick={this.toggleAddCarModal}>Cancel</Button>
            </ModalFooter>
          </Modal>

          <Modal isOpen={this.state.addModelModal} toggle={this.toggleAddModelModal} className="modal-dialog-centered">
            <ModalHeader toggle={this.toggleAddModelModal}>Add Model</ModalHeader>
            <ModalBody>
              <div className="col-sm text-center">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <div className="carInp">
                      <select className="custom-select">
                        <option key="default" defaultValue>Select Model</option>
                        {this.state.models.map(function (x) {
                          return <option key={x} value={x}>{x}</option>
                        }
                        )}
                      </select>
                    </div>
                  </div>
                </form>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.toggleAddModelModal}>ADD</Button>{' '}
              <Button color="secondary" onClick={this.toggleAddModelModal}>Cancel</Button>
            </ModalFooter>
          </Modal>

          <Modal isOpen={this.state.addEngineModal} toggle={this.toggleAddEngineModal} className="modal-dialog-centered">
            <ModalHeader toggle={this.toggleAddEngineModal}>Add Engine</ModalHeader>
            <ModalBody>
              <div className="col-sm text-center">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <div className="carInp">
                      <select className="custom-select">
                        <option defaultValue>Select Car Make</option>
                        {/* {this.state.models.map(function (x) {
                          return <option value={x}>{x}</option>
                        }
                        )} */}
                        <option value="Lamborghini">Lamborghini</option>
                        <option value="Bugatti">Bugatti</option>
                        <option value="Ferrari">Ferrari</option>
                      </select>
                    </div>
                    <div className="carInp">
                      <input type="text" className="form-control" placeholder="Engine-Size(cc)" />
                    </div>
                  </div>
                  {/* <button type="submit" className="btn btn-primary">ADD</button> */}
                </form>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.toggleAddEngineModal}>ADD</Button>{' '}
              <Button color="secondary" onClick={this.toggleAddEngineModal}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      </>
    );
  }
}

export default CarDetail;
