/* eslint-disable no-unused-vars */
/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
const ModalExample = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);
  const [modalDelete, setDeleteModal] = useState(false)

  const toggle = () => setModal(!modal);
  const toggleDelete = () => setDeleteModal(!modalDelete)

  const closeBtn = <button className="close" onClick={toggle}>&times;</button>;
  const closeBtn2 = <button className="close" onClick={toggleDelete}>&times;</button>;

  function handleSubmit() {

  }

  return (
    <div>
      <div className="container item">
        <table className="table table-striped">
          <tbody>
            {props.cars.map(function (x) {
              return <tr key={x.id}>
                <th scope="row">{x.id}</th>
                <td>{x.carName}</td>
                <td><Button className="btn btn-success" onClick={toggle}>Edit</Button></td>
                <td><Button className="btn btn-secondary" onClick={toggleDelete}>Delete</Button></td>
              </tr>
            }
            )}
          </tbody>
        </table>
      </div>
      <Modal isOpen={modal} toggle={toggle} className="modal-dialog-centered">
        <ModalHeader toggle={toggle} close={closeBtn}>Edit Car</ModalHeader>
        <ModalBody>
          <div className="col-sm text-center">
            <form onSubmit={handleSubmit()}>
              <div className="form-group">
                <div className="carInp">
                  <input type="text" placeholder="Car Make" className="form-control" />
                </div>
              </div>
            </form>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Save</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalDelete} toggle={toggleDelete} className="modal-dialog-centered">
        <ModalHeader toggle={toggleDelete} close={closeBtn2}>Delete Car</ModalHeader>
        <ModalBody>
          Are You Sure ?
      </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleDelete}>Delete</Button>{' '}
          <Button color="secondary" onClick={toggleDelete}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalExample;