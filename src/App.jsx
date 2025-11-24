import { useState, useEffect } from 'react';
import './App.css';
import { Icons } from './components/Icons';
import { Notification } from './components/ui/Notification';
import { Modal } from './components/ui/Modal';
import { Pagination } from './components/ui/Pagination';
import { PatientCard } from './components/Patient/PatientCard';
import { PatientForm } from './components/Patient/PatientForm';

function App() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [notification, setNotification] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('id');
  const patientsPerPage = 12;

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await fetch('https://63bedcf7f5cfc0949b634fc8.mockapi.io/users');
      const data = await response.json();

      setPatients(data);
      setLoading(false);
    } catch (error) {
      showNotification('Failed to fetch patient data', 'error');
      setLoading(false);
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
  };

  const handleAddPatient = () => {
    setEditingPatient(null);
    setModalOpen(true);
  };

  const handleEditPatient = (patient) => {
    setEditingPatient(patient);
    setModalOpen(true);
  };

  const handleSubmit = (formData) => {
    if (editingPatient) {
      setPatients(prev =>
        prev.map(pat => pat.id === editingPatient.id ? { ...formData, id: pat.id } : pat)
      );
      // Here you would also make an API call to update the patient on the server
      showNotification('Patient updated successfully!', 'success');
    } else {
      const newPatient = {
        ...formData,
        id: String(Math.max(...patients.map(p => parseInt(p.id) || 0), 0) + 1)
      };
      setPatients(prev => [newPatient, ...prev]);
      // Here you would also make an API call to add the patient to the server
      showNotification('Patient added successfully!', 'success');
    }
    setModalOpen(false);
    setEditingPatient(null);
  };

  const handleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort patients
  const sortedPatients = filteredPatients.sort((a, b) => {
    switch (sortBy) {
      case 'id':
        const aId = parseInt(a.id) || 0;
        const bId = parseInt(b.id) || 0;
        return aId - bId;
      
      case 'name-asc':
        return a.name.localeCompare(b.name);
      
      case 'name-desc':
        return b.name.localeCompare(a.name);
      
      case 'date-asc':
        return new Date(a.createdAt) - new Date(b.createdAt);
      
      case 'date-desc':
        return new Date(b.createdAt) - new Date(a.createdAt);
      
      default:
        return 0;
    }
  });

  // Reset to page 1 when search term or sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy]);

  // Calculate pagination
  const totalPages = Math.ceil(sortedPatients.length / patientsPerPage);
  const startIndex = (currentPage - 1) * patientsPerPage;
  const endIndex = startIndex + patientsPerPage;
  const paginatedPatients = sortedPatients.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="spinner" />
          <p>Loading patient data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="container">
          <div className="header-content">
            <div className="header-text">
              <h1>Patient Management System</h1>
              <p>Manage and organize patient records efficiently</p>
            </div>
            <button onClick={handleAddPatient} className="btn btn-primary btn-add">
              <Icons.Plus />
              Add Patient
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="container">
          <div className="search-bar">
            <div className="search-icon">
              <Icons.Search />
            </div>
            <input
              type="text"
              placeholder="Search patients by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="controls-bar">
            <div className="patient-count">
              <p>
                Showing <strong>{paginatedPatients.length > 0 ? startIndex + 1 : 0}</strong>-
                <strong>{Math.min(endIndex, sortedPatients.length)}</strong> of{' '}
                <strong>{sortedPatients.length}</strong> patients
                {sortedPatients.length !== patients.length && (
                  <span> (filtered from {patients.length} total)</span>
                )}
              </p>
            </div>
            
            <div className="sort-control">
              <label htmlFor="sort-select" className="sort-label">
                Sort by:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="id">ID</option>
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="date-asc">Date Created (Old-New)</option>
                <option value="date-desc">Date Created (New-Old)</option>
              </select>
            </div>
          </div>

          <div className="patient-grid">
            {paginatedPatients.map((patient) => (
              <PatientCard
                key={patient.id}
                patient={patient}
                onEdit={handleEditPatient}
                onExpand={handleExpand}
                isExpanded={expandedId === patient.id}
              />
            ))}
          </div>

          {sortedPatients.length > patientsPerPage && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}

          {sortedPatients.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">
                <Icons.User />
              </div>
              <h3>No patients found</h3>
              <p>Try adjusting your search or add a new patient</p>
            </div>
          )}
        </div>
      </main>

      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingPatient(null);
        }}
        title={editingPatient ? 'Edit Patient' : 'Add New Patient'}
      >
        <PatientForm
          patient={editingPatient}
          onSubmit={handleSubmit}
          onCancel={() => {
            setModalOpen(false);
            setEditingPatient(null);
          }}
        />
      </Modal>

      {notification && (
        <div className="notification-container">
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        </div>
      )}
    </div>
  );
}

export default App;