import React, { useState } from 'react';
import { Modal, TextInput, Select, Button, ActionIcon, useMantineTheme } from '@mantine/core';
import { IconX } from '@tabler/icons-react';

const ScrollModal = ({ opened, onClose }) => {
  const theme = useMantineTheme();
  const [formData, setFormData] = useState({
    hospitalName: '',
    city: '',
    contactNo: '',
    personName: '',
    jobRole: '',
  });

  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    onClose();
  };

  const inputStyles = {
    input: {
      backgroundColor: theme.colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'white',
      backdropFilter: 'blur(10px)',
      border: theme.colorScheme === 'dark' ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid #ced4da',
      borderRadius: 12,
      color: theme.colorScheme === 'dark' ? '#e0e0e0' : '#333',
      fontSize: 16,
      padding: '12px 14px',
      height: 48,
      transition: 'all 0.3s ease',
      '&:focus': {
        borderColor: theme.colors[theme.primaryColor][5],
        boxShadow: `0 0 20px ${theme.colors[theme.primaryColor][3]}`,
        backgroundColor: theme.colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'white',
      },
    },
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      centered
      size="45%"
      overlayProps={{
        color: theme.colorScheme === 'dark' ? '#08090C' : '#000000',
        opacity: 0.3,
        blur: 10,
      }}
      styles={{
        content: {
          background:
            theme.colorScheme === 'dark'
              ? 'rgba(8, 9, 12, 0.85)'
              : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          border: theme.colorScheme === 'dark' ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid #ccc',
          borderRadius: 20,
          boxShadow: theme.shadows.xl,
          maxHeight: '95vh',
          overflowY: 'auto',
          transform: 'perspective(1000px) rotateX(5deg)',
          animation: 'modalSlideIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        },
        body: {
          padding: '2rem',
          color: theme.colorScheme === 'dark' ? '#e0e0e0' : '#000',
        },
      }}
    >
      <style>{`
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: perspective(1000px) rotateX(-30deg) translateY(-50px);
          }
          to {
            opacity: 1;
            transform: perspective(1000px) rotateX(5deg) translateY(0);
          }
        }
        .form-container {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .field-wrapper {
          position: relative;
          transition:
            box-shadow 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
            transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
            filter 0.3s ease,
            opacity 0.3s ease;
          will-change: box-shadow, transform, filter, opacity;
          z-index: 1;
          border-radius: 12px;
          padding: 4px;
        }
        .field-wrapper.pump {
          box-shadow:
            0 15px 50px rgba(59, 130, 246, 0.35),
            0 0 0 3px rgba(59, 130, 246, 0.4),
            0 5px 20px rgba(0, 0, 0, 0.15);
          transform: perspective(1000px) scale(1.06) translateY(-6px) rotateX(2deg);
          filter: brightness(1.2) drop-shadow(0px 6px 16px rgba(59, 130, 246, 0.5));
          opacity: 1;
          z-index: 10;
          background: rgba(255, 255, 255, 0.08);
        }
        .form-container.dimmed .field-wrapper:not(.pump) {
          opacity: 0.5;
          filter: grayscale(30%) brightness(0.85);
          transform: scale(0.97);
          z-index: 0;
        }
        .field-wrapper.pump label {
          color: #1E40AF !important;
          font-weight: 700 !important;
          text-shadow: 0 1px 3px rgba(59, 130, 246, 0.3);
        }
        .field-wrapper.pump .mantine-TextInput-input,
        .field-wrapper.pump .mantine-Select-input {
          background: rgba(255, 255, 255, 0.25) !important;
          border-color: rgba(59, 130, 246, 0.7) !important;
          box-shadow: 0 0 25px rgba(59, 130, 246, 0.3) !important;
        }
      `}</style>

      {/* Close icons */}
      <ActionIcon
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 16,
          left: 16,
          zIndex: 1000,
          background: 'rgba(239, 68, 68, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
        }}
        className="bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
        size="lg"
      >
        <IconX size={18} />
      </ActionIcon>

      <ActionIcon
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 16,
          right: 16,
          zIndex: 1000,
          background: 'rgba(239, 68, 68, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
        }}
        className="bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
        size="lg"
      >
        <IconX size={18} />
      </ActionIcon>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent">
          Request a Demo
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-teal-400 to-emerald-400 mx-auto mt-2 rounded-full"></div>
      </div>

      <form onSubmit={handleSubmit} className={`form-container${focusedField ? ' dimmed' : ''}`}>
        {['hospitalName', 'city', 'contactNo', 'personName'].map((field) => (
          <div
            key={field}
            className={`field-wrapper${focusedField === field ? ' pump' : ''}`}
            onMouseEnter={() => setFocusedField(field)}
            onMouseLeave={() => setFocusedField(null)}
          >
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 transition-all duration-300">
              {field === 'hospitalName' && 'Hospital Name:'}
              {field === 'city' && 'City:'}
              {field === 'contactNo' && 'Contact No:'}
              {field === 'personName' && 'Person Name:'}
            </label>
            <TextInput
              placeholder={`Enter ${
                field === 'contactNo'
                  ? 'Contact Number'
                  : field === 'personName'
                  ? 'Your Name'
                  : field.charAt(0).toUpperCase() + field.slice(1)
              }`}
              value={formData[field]}
              onFocus={() => setFocusedField(field)}
              onBlur={() => setFocusedField(null)}
              onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
              styles={inputStyles}
            />
          </div>
        ))}

        <div
          className={`field-wrapper${focusedField === 'jobRole' ? ' pump' : ''}`}
          onMouseEnter={() => setFocusedField('jobRole')}
          onMouseLeave={() => setFocusedField(null)}
        >
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 transition-all duration-300">
            Job Role:
          </label>
          <Select
            placeholder="Select Job Role"
            data={[
              { value: 'doctor', label: 'Doctor' },
              { value: 'nurse', label: 'Nurse' },
              { value: 'admin', label: 'Administrator' },
              { value: 'manager', label: 'Hospital Manager' },
              { value: 'technician', label: 'Technician' },
              { value: 'student', label: 'Student' },
              { value: 'govt', label: 'Govt. emp.' },
              { value: 'other', label: 'Other' },
            ]}
            value={formData.jobRole}
            onFocus={() => setFocusedField('jobRole')}
            onBlur={() => setFocusedField(null)}
            onChange={(value) => setFormData({ ...formData, jobRole: value })}
            styles={inputStyles}
          />
        </div>

        <Button
          type="submit"
          fullWidth
          size="lg"
          mt="xl"
          styles={{
            root: {
              background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)',
              border: 'none',
              borderRadius: 12,
              height: 55,
              fontSize: 18,
              fontWeight: 600,
              boxShadow: '0 10px 25px rgba(20, 184, 166, 0.3)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 15px 35px rgba(20, 184, 166, 0.4)',
              },
            },
          }}
        >
          Submit Request
        </Button>
      </form>
    </Modal>
  );
};

export default ScrollModal;
