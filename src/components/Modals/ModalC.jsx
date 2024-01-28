import React from "react";
import { Modal, Button } from "react-bootstrap";

const ModalC = ({ showModal, handleCloseModals, selectedContact }) => {
  return (
    <Modal show={showModal} onHide={handleCloseModals}>
      <Modal.Header closeButton>
        <Modal.Title>Contact Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedContact && (
          <div>
            <p>{`ID: ${selectedContact.id}`}</p>
            <p>{`Phone: ${selectedContact.phone}`}</p>
            <p>{`Country: ${selectedContact.country.name}`}</p>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        {/* Modal Buttons */}
        <Button variant="primary" onClick={handleCloseModals}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalC;
