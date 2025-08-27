import React, { useState } from 'react';
import { Modal, TextInput, Select, Button, ActionIcon } from '@mantine/core';
import { IconX } from '@tabler/icons-react';

const ScrollModal = ({ opened, onClose }) => {
  const [formData, setFormData] = useState({
    hospitalName: '',
    city: '',
    contactNo: '',
    personName: '',
    jobRole: ''
  });

  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      centered
      size="45%"
      styles={{
        overlay: {
          background: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(10px)',
        },
        content: {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '20px',
          boxShadow: '0 25px 45px rgba(0, 0, 0, 0.1)',
          transform: 'perspective(1000px) rotateX(5deg)',
          animation: 'modalSlideIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          maxHeight: '95vh',
          overflowY: 'auto'
        },
        body: {
          padding: '2rem',
        }
      }}
    >
      <style jsx>{`
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
          transform: perspective(1000px) scale(1.06) translateY(-6px) rotateX(2deg) !important;
          filter: brightness(1.2) drop-shadow(0px 6px 16px rgba(59, 130, 246, 0.5));
          opacity: 1 !important;
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
      
      <div className="relative">
        {/* Left upper corner button to close the scroll model form*/}
        {/* Left upper corner button */}
        <ActionIcon
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
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

        {/* Right upper corner button */}
        <ActionIcon
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
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
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Request a Demo
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-2 rounded-full"></div>
        </div>

        <form 
          onSubmit={handleSubmit} 
          className={`form-container${focusedField ? ' dimmed' : ''}`}
        >

          <div 
            className={`field-wrapper${focusedField === 'hospitalName' ? ' pump' : ''}`}
            onMouseEnter={() => setFocusedField('hospitalName')}
            onMouseLeave={() => setFocusedField(null)}
          >
            <label className="block text-sm font-medium text-gray-600 mb-2 transition-all duration-300">
              Hospital Name:
            </label>
            <TextInput
              placeholder="Enter Hospital Name"
              value={formData.hospitalName}
              onFocus={() => setFocusedField('hospitalName')}
              onBlur={() => setFocusedField(null)}
              onChange={(e) => setFormData({...formData, hospitalName: e.target.value})}
              styles={{
                input: {
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  color: '#333',
                  fontSize: '16px',
                  padding: '12px 14px',
                  height: '48px',
                  transition: 'all 0.3s ease',
                  '&:focus': {
                    borderColor: 'rgba(59, 130, 246, 0.5)',
                    boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)',
                    background: 'rgba(255, 255, 255, 0.15)',
                  }
                }
              }}
            />
          </div>

          <div 
            className={`field-wrapper${focusedField === 'city' ? ' pump' : ''}`}
            onMouseEnter={() => setFocusedField('city')}
            onMouseLeave={() => setFocusedField(null)}
          >
            <label className="block text-sm font-medium text-gray-600 mb-2 transition-all duration-300">
              City:
            </label>
            <TextInput
              placeholder="Enter City"
              value={formData.city}
              onFocus={() => setFocusedField('city')}
              onBlur={() => setFocusedField(null)}
              onChange={(e) => setFormData({...formData, city: e.target.value})}
              styles={{
                input: {
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  color: '#333',
                  fontSize: '16px',
                  padding: '12px 14px',
                  height: '48px',
                  transition: 'all 0.3s ease',
                  '&:focus': {
                    borderColor: 'rgba(59, 130, 246, 0.5)',
                    boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)',
                    background: 'rgba(255, 255, 255, 0.15)',
                  }
                }
              }}
            />
          </div>

          <div 
            className={`field-wrapper${focusedField === 'contactNo' ? ' pump' : ''}`}
            onMouseEnter={() => setFocusedField('contactNo')}
            onMouseLeave={() => setFocusedField(null)}
          >
            <label className="block text-sm font-medium text-gray-600 mb-2 transition-all duration-300">
              Contact No:
            </label>
            <TextInput
              placeholder="Enter Contact Number"
              value={formData.contactNo}
              onFocus={() => setFocusedField('contactNo')}
              onBlur={() => setFocusedField(null)}
              onChange={(e) => setFormData({...formData, contactNo: e.target.value})}
              styles={{
                input: {
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  color: '#333',
                  fontSize: '16px',
                  padding: '12px 14px',
                  height: '48px',
                  transition: 'all 0.3s ease',
                  '&:focus': {
                    borderColor: 'rgba(59, 130, 246, 0.5)',
                    boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)',
                    background: 'rgba(255, 255, 255, 0.15)',
                  }
                }
              }}
            />
          </div>

          <div 
            className={`field-wrapper${focusedField === 'personName' ? ' pump' : ''}`}
            onMouseEnter={() => setFocusedField('personName')}
            onMouseLeave={() => setFocusedField(null)}
          >
            <label className="block text-sm font-medium text-gray-600 mb-2 transition-all duration-300">
              Person Name:
            </label>
            <TextInput
              placeholder="Enter Your Name"
              value={formData.personName}
              onFocus={() => setFocusedField('personName')}
              onBlur={() => setFocusedField(null)}
              onChange={(e) => setFormData({...formData, personName: e.target.value})}
              styles={{
                input: {
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  color: '#333',
                  fontSize: '16px',
                  padding: '12px 14px',
                  height: '48px',
                  transition: 'all 0.3s ease',
                  '&:focus': {
                    borderColor: 'rgba(59, 130, 246, 0.5)',
                    boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)',
                    background: 'rgba(255, 255, 255, 0.15)',
                  }
                }
              }}
            />
          </div>

          <div 
            className={`field-wrapper${focusedField === 'jobRole' ? ' pump' : ''}`}
            onMouseEnter={() => setFocusedField('jobRole')}
            onMouseLeave={() => setFocusedField(null)}
          >
            <label className="block text-sm font-medium text-gray-600 mb-2 transition-all duration-300">
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
                {value: 'student', label: 'student'},
                {value: 'Govt. emp.', label: 'Govt. emp.'},
                { value: 'other', label: 'Other' },
              ]}
              value={formData.jobRole}
              onFocus={() => setFocusedField('jobRole')}
              onBlur={() => setFocusedField(null)}
              onChange={(value) => setFormData({...formData, jobRole: value})}
              styles={{
                input: {
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  color: '#333',
                  fontSize: '16px',
                  padding: '12px 14px',
                  height: '48px',
                  transition: 'all 0.3s ease',
                  '&:focus': {
                    borderColor: 'rgba(59, 130, 246, 0.5)',
                    boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)',
                    background: 'rgba(255, 255, 255, 0.15)',
                  }
                }
              }}
            />
          </div>

          <Button
            type="submit"
            fullWidth
            size="lg"
            className="mt-10 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            styles={{
              root: {
                background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
                border: 'none',
                borderRadius: '12px',
                height: '55px',
                fontSize: '18px',
                fontWeight: 600,
                boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 15px 35px rgba(59, 130, 246, 0.4)',
                }
              }
            }}
          >
            Submit Request
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default ScrollModal;
