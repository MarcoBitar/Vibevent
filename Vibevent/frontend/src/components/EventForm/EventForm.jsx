import React, { useState } from 'react';
import InputField from '../UI/InputField/InputField.jsx';
import Button from '../UI/Button/Button.jsx';
import './EventForm.css';
import { useEvents } from '../../hooks/useEvents.js';
import { useImageConverter } from '../../hooks/useImageConverter.js';
import SwipeToast from '../SwipeToast/SwipeToast.jsx';

// EventForm handles both creation and editing of events
export default function EventForm({ initialData = {}, onCreated, onCancel, mode = 'create' }) {
  const [toastMessage, setToastMessage] = useState('');

  // Hooks for event creation/update and image conversion
  const { createEvent, updateEvent } = useEvents();
  const { base64, error: imageError, handleFileChange: convertFile } = useImageConverter();

  // Format incoming date to YYYY-MM-DD
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toISOString().split('T')[0];
  };

  // Convert 12-hour time to 24-hour format
  const formatTimeTo24h = (time12h) => {
    if (!time12h) return '';
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    if (modifier === 'PM' && hours !== '12') hours = parseInt(hours) + 12;
    if (modifier === 'AM' && hours === '12') hours = '00';
    return `${hours.toString().padStart(2, '0')}:${minutes}`;
  };

  // Form state initialization
  const [form, setForm] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    date: formatDate(initialData.date) || '',
    time: formatTimeTo24h(initialData.time) || '',
    location: initialData.location || '',
    imageFile: null,
    imagePreview: initialData.imagePreview || '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fileChosen, setFileChosen] = useState(false);

  // Handle input field changes
  const handleChange = (name, value) => {
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  // Handle image file selection and conversion
  const handleFile = async (e) => {
    convertFile(e);
    if (e.target.files && e.target.files[0]) setFileChosen(true);
  };

  // Validate required fields and image conversion errors
  const validateForm = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Title is required';
    if (!form.date.trim()) newErrors.date = 'Date is required';
    if (!form.time.trim()) newErrors.time = 'Time is required';
    if (!form.location.trim()) newErrors.location = 'Location is required';
    if (imageError) newErrors.image = imageError;
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    // Prepare payload for backend
    const formData = {
      clubid: localStorage.getItem('clubid'),
      eventtitle: form.title,
      eventdesc: form.description,
      eventdate: form.date,
      eventtime: form.time,
      eventlocation: form.location,
      eventpic: base64 || form.imagePreview,
    };

    try {
      if (mode === 'edit') {
        await updateEvent(initialData.eventid, formData);
        setToastMessage('Event updated successfully!');
      } else {
        await createEvent(formData);
        setToastMessage('Event created successfully!');
      }

      onCreated?.();

      // Delay cancel to allow toast to show
      setTimeout(() => {
        onCancel?.();
      }, 500);
    } catch (err) {
      console.error('[EventForm] Error creating/updating event:', err);

      // Handle known backend error messages
      if (err.response?.data?.message?.includes('already exists')) {
        setToastMessage(err.response.data.message);
      } else if (err.response?.data?.message) {
        setToastMessage(err.response.data.message);
      } else {
        setToastMessage('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Render image upload input and preview
  const renderFileInput = () => (
    <div className="file-input-wrapper">
      <label className="file-label">
        {fileChosen ? 'Pic Chosen' : 'Choose Pic'}
        <input
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="hidden-file-input"
        />
      </label>
      {base64 && <img src={base64} alt="Preview" className="image-preview" />}
      {errors.image && <p className="error">{errors.image}</p>}
    </div>
  );

  return (
    <div className="event-form-overlay">
      <form className="event-form" onSubmit={handleSubmit} noValidate>
        <h2>{mode === 'edit' ? 'Edit Event' : 'Create New Event'}</h2>

        {/* Input fields */}
        <InputField
          label="Title *"
          name="title"
          value={form.title}
          onChange={e => handleChange('title', e.target.value)}
          error={errors.title}
        />

        <InputField
          label="Description"
          name="description"
          value={form.description}
          onChange={e => handleChange('description', e.target.value)}
        />

        <InputField
          label="Date *"
          name="date"
          type="date"
          value={form.date}
          onChange={e => handleChange('date', e.target.value)}
          error={errors.date}
        />

        <InputField
          label="Time *"
          name="time"
          type="time"
          value={form.time}
          onChange={e => handleChange('time', e.target.value)}
          error={errors.time}
        />

        <InputField
          label="Location *"
          name="location"
          value={form.location}
          onChange={e => handleChange('location', e.target.value)}
          error={errors.location}
        />

        {/* Image upload */}
        {renderFileInput()}

        {/* Submit error */}
        {errors.submit && <p className="error">{errors.submit}</p>}

        {/* Action buttons */}
        <div className="form-actions">
          <Button type="submit" variant="primary" disabled={loading}>
            {loading
              ? mode === 'edit'
                ? 'Saving…'
                : 'Creating…'
              : mode === 'edit'
                ? 'Save Changes'
                : 'Create Event'}
          </Button>

          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </div>

        {/* Toast feedback */}
        {toastMessage && (
          <SwipeToast
            message={toastMessage}
            onDismiss={() => setToastMessage('')}
            duration={4000}
          />
        )}
      </form>
    </div>
  );
}