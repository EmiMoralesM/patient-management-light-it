import { useState, useEffect } from 'react';
import { Icons } from '../Icons';

export const PatientCard = ({ patient, onEdit, onExpand, isExpanded }) => {
  const [imageError, setImageError] = useState(false);

  // Reset image error when patient or avatar changes
  useEffect(() => {
    setImageError(false);
  }, [patient.id, patient.avatar]);

  const getInitials = (name) => {
    const parts = name.trim().split(/\s+/); 
    const initials = parts.map(word => word[0]?.toUpperCase()).filter(Boolean).slice(0, 2).join("");

    return initials;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const shouldShowInitials = !patient.avatar || imageError;

  return (
    <div className="patient-card">
      <div className="patient-card-content">
        <div className="patient-header">
          <div className="patient-avatar">
            {shouldShowInitials ? (
              <div className="avatar-initials">
                {getInitials(patient.name)}
              </div>
            ) : (
              <img 
                src={patient.avatar} 
                alt={patient.name}
                onError={handleImageError}
              />
            )}
          </div>
          <div className="patient-info">
            <div className="patient-title-row">
              <div className='patient-title-row-content'>
                <h3 className="patient-name">{patient.name}</h3>
                <p className="patient-id">ID: {patient.id}</p>
              </div>
              <div className="patient-actions">
                <button
                  onClick={() => onEdit(patient)}
                  className="btn-icon btn-edit"
                > 
                  <Icons.Edit />
                </button>
                <button
                  onClick={() => onExpand(patient.id)}
                  className="btn-icon btn-expand"
                >
                  {isExpanded ? <Icons.ChevronUp /> : <Icons.ChevronDown />}
                </button>
              </div>
            </div>

            <div className="patient-meta">
              <div className="meta-item">
                <span className="meta-icon">
                  <Icons.Calendar />
                </span>
                <span>{formatDate(patient.createdAt)}</span>
              </div>
              {patient.website && (
                <a
                  href={patient.website}
                  target="_blank"
                  className="meta-link"
                >
                  <Icons.Globe />
                  <span>Website</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {isExpanded && (
          <div className="patient-details">
            {patient.description && (
              <div className="detail-item">
                <span className="detail-icon">
                  <Icons.Info />
                </span> 
                <div>
                  <p className="detail-label">Description</p>
                  <p className="detail-text">{patient.description}</p>
                </div>
              </div>
            )}
            {patient.website && (
              <div className="detail-item">
                <span className="detail-icon">
                  <Icons.Globe />
                </span>
                <div>
                  <p className="detail-label">Website</p>
                  <a
                    href={patient.website}
                    target="_blank"
                    className="detail-link"
                  >
                    {patient.website}
                  </a>
                </div>
              </div>
            )}
            <div className="detail-item">
              <span className="detail-icon">
                <Icons.Calendar />
              </span>
              <div>
                <p className="detail-label">Created</p>
                <p className="detail-text">{formatDate(patient.createdAt)}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


