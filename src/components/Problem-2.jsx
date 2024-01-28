import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const Problem2 = () => {
  const [showModalA, setShowModalA] = useState(false);
  const [showModalB, setShowModalB] = useState(false);
  const [showModalC, setShowModalC] = useState(false);
  const [onlyEven, setOnlyEven] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);

  // Fetch all contacts
  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    const modal = modalRef.current;
    if (modal) {
      modal.addEventListener("scroll", handleScroll);
      return () => modal.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const handleScroll = () => {
    const modal = modalRef.current;
    if (
      modal.scrollHeight - modal.scrollTop === modal.clientHeight &&
      !loading
    ) {
      loadNextPage();
    }
  };

  const fetchContacts = async (usOnly, page = 1) => {
    const url = usOnly
      ? `https://contact.mediusware.com/api/contacts/?country.name=US&page=${page}`
      : `https://contact.mediusware.com/api/contacts/?page=${page}&search=${searchTerm}`;

    try {
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      console.log("API Response:", data);

      if (page === 1) {
        setContacts(data.results);
      } else {
        setContacts((prevContacts) => [...prevContacts, ...data.results]);
      }

      setCurrentPage(page + 1);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadNextPage = () => {
    fetchContacts(false, currentPage);
  };

  const handleOpenModalA = () => {
    setShowModalA(true);
    setShowModalB(false);
    setShowModalC(false);
    setCurrentPage(1);
    fetchContacts(false);
  };

  const handleOpenModalB = () => {
    setShowModalA(false);
    setShowModalB(true);
    setShowModalC(false);
    setCurrentPage(1);
    fetchContacts(true);
  };

  const handleCloseModals = () => {
    setShowModalA(false);
    setShowModalB(false);
    setShowModalC(false);
    setSearchTerm("");
    setCurrentPage(1);
  };

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setShowModalC(true);
  };

  const handleSearchChange = (event) => {
    const inputValue = event.target.value;
    setSearchTerm(inputValue);

    // Check if the entered value is a valid positive integer (ID)
    const isValidId = /^\d+$/.test(inputValue) && parseInt(inputValue, 10) > 0;

    if (isValidId) {
      // Fetch contacts with the specified ID
      fetchContactsById(inputValue);
    } else {
      // Add a delay before fetching to avoid making requests on every keystroke
      setTimeout(() => fetchContacts(false, 1), 300);
    }
  };

  const fetchContactsById = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://contact.mediusware.com/api/contacts/${id}/`
      );
      const data = await response.json();
      console.log("API Response for ID search:", data);

      setContacts([data]); // Display the single contact with the specified ID
    } catch (error) {
      console.error("Error fetching contact by ID:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchKeyDown = (event) => {
    // If Enter key is pressed, immediately fetch contacts
    if (event.key === "Enter") {
      fetchContacts(false, 1);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-outline-primary"
            onClick={handleOpenModalA}
            style={{ backgroundColor: "#46139f", color: "white" }}
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg btn-outline-warning"
            onClick={handleOpenModalB}
            style={{ backgroundColor: "#ff7f50", color: "white" }}
          >
            US Contacts
          </button>
        </div>

        {/* Modal A */}
        <Modal show={showModalA} onHide={handleCloseModals}>
          <Modal.Header closeButton>
            <Modal.Title>All Contacts</Modal.Title>
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
