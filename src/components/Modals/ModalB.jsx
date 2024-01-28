import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ModalB = ({
  showModal,
  handleCloseModals,
  onlyEven,
  setOnlyEven,
  contacts,
  handleContactClick,
  handleOpenModalA,
  handleOpenModalB,
  searchTerm,
  handleSearchChange,
  handleSearchKeyDown,
  loading,
  modalRef,
}) => {
  return (
    <Modal show={showModal} onHide={handleCloseModals}>
      <Modal.Header closeButton>
        <Modal.Title>US Contacts</Modal.Title>
      </Modal.Header>
      <Modal.Body ref={modalRef}>
        {/* Search Input */}
        <Form.Control
          type="text"
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={handleSearchKeyDown}
        />
        {/* Display US Contacts */}
        {contacts
          .filter((contact) => contact.country.name === "United States")
          .filter((contact) => !onlyEven || (onlyEven && contact.id % 2 === 0))
          .map((contact) => (
            <div key={contact.id} onClick={() => handleContactClick(contact)}>
              {`ID: ${contact.id}, Phone: ${contact.phone}, Country: ${contact.country.name}`}
            </div>
          ))}
        {loading && <p>Loading...</p>}
      </Modal.Body>
      <Modal.Footer>
        {/* Checkbox */}
        <Form.Check
          type="checkbox"
          label="Only even"
          checked={onlyEven}
          onChange={() => setOnlyEven(!onlyEven)}
        />
        {/* Modal Buttons */}
        <Button variant="primary" onClick={handleOpenModalA}>
          All Contacts
        </Button>
        <Button variant="warning" onClick={handleOpenModalB}>
          US Contacts
        </Button>
        <Button variant="danger" onClick={handleCloseModals}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalB;
