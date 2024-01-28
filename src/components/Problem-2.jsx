import React, { useState, useEffect, useRef } from "react";
import { ModalA, ModalB, ModalC } from "./Modals";

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
    setSearchTerm(event.target.value);
    setTimeout(() => fetchContacts(false, 1), 300);
  };

  const handleSearchKeyDown = (event) => {
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
        <ModalA
          showModal={showModalA}
          handleCloseModals={handleCloseModals}
          onlyEven={onlyEven}
          setOnlyEven={setOnlyEven}
          contacts={contacts}
          handleContactClick={handleContactClick}
          handleOpenModalA={handleOpenModalA}
          handleOpenModalB={handleOpenModalB}
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
          handleSearchKeyDown={handleSearchKeyDown}
          loading={loading}
          modalRef={modalRef}
        />

        {/* Modal B */}
        <ModalB
          showModal={showModalB}
          handleCloseModals={handleCloseModals}
          onlyEven={onlyEven}
          setOnlyEven={setOnlyEven}
          contacts={contacts}
          handleContactClick={handleContactClick}
          handleOpenModalA={handleOpenModalA}
          handleOpenModalB={handleOpenModalB}
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
          handleSearchKeyDown={handleSearchKeyDown}
          loading={loading}
          modalRef={modalRef}
        />

        {/* Modal C */}
        <ModalC
          showModal={showModalC}
          handleCloseModals={handleCloseModals}
          selectedContact={selectedContact}
        />
      </div>
    </div>
  );
};

export default Problem2;
