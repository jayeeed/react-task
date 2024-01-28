import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const Problem2 = () => {
  const [showModalA, setShowModalA] = useState(false);
  const [showModalB, setShowModalB] = useState(false);
  const [showModalC, setShowModalC] = useState(false);
  const [onlyEven, setOnlyEven] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  // Fetch all contacts
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async (usOnly) => {
    const url = usOnly
      ? "https://contact.mediusware.com/api/contacts/?country.name=US"
      : "https://contact.mediusware.com/api/contacts/";

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log("API Response:", data);
      setContacts(data.results);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const handleOpenModalA = () => {
    setShowModalA(true);
    setShowModalB(false);
    setShowModalC(false);
    fetchContacts(false);
  };

  const handleOpenModalB = () => {
    setShowModalA(false);
    setShowModalB(true);
    setShowModalC(false);
    fetchContacts(true);
  };

  const handleCloseModals = () => {
    setShowModalA(false);
    setShowModalB(false);
    setShowModalC(false);
  };

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setShowModalC(true);
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-outline-primary"
            onClick={handleOpenModalA}
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg btn-outline-warning"
            onClick={handleOpenModalB}
          >
            US Contacts
          </button>
        </div>

        {/* Modal A */}
        <Modal show={showModalA} onHide={handleCloseModals}>
          <Modal.Header closeButton>
            <Modal.Title>All Contacts</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Display All Contacts */}
            {contacts
              .filter(
                (contact) => !onlyEven || (onlyEven && contact.id % 2 === 0)
              )
              .map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => handleContactClick(contact)}
                >
                  {`ID: ${contact.id}, Phone: ${contact.phone}, Country: ${contact.country.name}`}
                </div>
              ))}
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
            <Button variant="secondary" onClick={handleOpenModalA}>
              All Contacts
            </Button>
            <Button variant="primary" onClick={handleOpenModalB}>
              US Contacts
            </Button>
            <Button variant="danger" onClick={handleCloseModals}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal B */}
        <Modal show={showModalB} onHide={handleCloseModals}>
          <Modal.Header closeButton>
            <Modal.Title>US Contacts</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Display US Contacts */}
            {contacts
              .filter((contact) => contact.country.name === "United States")
              .filter(
                (contact) => !onlyEven || (onlyEven && contact.id % 2 === 0)
              )
              .map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => handleContactClick(contact)}
                >
                  {`ID: ${contact.id}, Phone: ${contact.phone}, Country: ${contact.country.name}`}
                </div>
              ))}
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

        {/* Add Modal C */}
        <Modal show={showModalC} onHide={handleCloseModals}>
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
      </div>
    </div>
  );
};

export default Problem2;
