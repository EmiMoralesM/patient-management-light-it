import { useState, useEffect } from 'react';
import { Input } from '../ui/Input';

export const PatientForm = ({ patient, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(patient || {
    name: '',
    avatar: '',
    description: '',
    website: ''
  });

  const [errors, setErrors] = useState({});

  // Update form when patient prop changes (important for edit mode)
  useEffect(() => {
    if (patient) {
      setFormData({
        name: patient.name || '',
        avatar: patient.avatar || '',
        description: patient.description || '',
        website: patient.website || ''
      });
    } else {
      setFormData({
        name: '',
        avatar: '',
        description: '',
        website: ''
      });
    }
  }, [patient]);

  const validate = () => {
    const newErrors = {};

    if (!formData.name?.trim()) newErrors.name = 'Name is required';
    if (formData.website && !/^https?:\/\/.+\..+/.test(formData.website)) {
      newErrors.website = 'Invalid website URL (must start with http:// or https://)';
    }
    if (formData.avatar && !/^https?:\/\/.+\..+/.test(formData.avatar)) {
      newErrors.avatar = 'Invalid avatar URL (must start with http:// or https://)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit({
        ...formData,
        createdAt: patient?.createdAt || new Date().toISOString()
      });
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="patient-form">
      <Input
        label="Full Name"
        value={formData.name}
        onChange={(e) => handleChange('name', e.target.value)}
        error={errors.name}
        required
        placeholder="Name..."
      />

      <Input
        label="Avatar URL"
        type="url"
        value={formData.avatar}
        error={errors.avatar}
        onChange={(e) => handleChange('avatar', e.target.value)}
        placeholder="https://example.com/avatar.jpg"
      />

      <Input
        label="Website"
        type="url"
        value={formData.website}
        error={errors.website}
        onChange={(e) => handleChange('website', e.target.value)}
        placeholder="https://example.com"
      />

      <div className="input-group">
        <label className="input-label">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={6}
          className="textarea-field"
          placeholder="Enter patient description or notes..."
        />
      </div>

      <div className="form-actions">
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-secondary"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="btn btn-primary"
        >
          {patient ? 'Update Patient' : 'Add Patient'}
        </button>
      </div>
    </div>
  );
};


