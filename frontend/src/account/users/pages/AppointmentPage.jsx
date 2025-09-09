import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Header from '../../../components/header/Header';
import Sidebar from '../UserSidebar';
import Footer from '../../../components/footer/SocialFooter';
import doctors from '../data/DoctorData';
import appointmentsData from '../data/AppointmentData';

// Utility for date string
const formatDate = (date) => date.toISOString().slice(0, 10);

const AppointmentPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const [doctorList] = useState(doctors);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const isSidebarOpen = !sidebarCollapsed || sidebarHovered;

  // Switch between booking and appointments
  const [activeView, setActiveView] = useState('booking');
  const [doctorSearch, setDoctorSearch] = useState("");
  const filteredDoctors = doctors.filter(
    (doc) =>
      doc.name.toLowerCase().includes(doctorSearch.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(doctorSearch.toLowerCase())
  );

  const [calendarDate, setCalendarDate] = useState(new Date());
  const [appointments, setAppointments] = useState(appointmentsData);
  const [bookingForm, setBookingForm] = useState({
    doctorId: '',
    date: '',
    time: '',
    reason: '',
    type: 'consultation',
    patientName: '',
    phone: '',
    email: '',
  });
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  const cancelAppointment = (id) => {
    setAppointments((prev) => prev.filter((apt) => apt.id !== id));
  };

  const handleBookingSubmit = () => {
    setFormError('');
    setFormSuccess('');
    if (!bookingForm.doctorId || !bookingForm.date || !bookingForm.time || !bookingForm.patientName) {
      setFormError('Please fill in all required fields.');
      return;
    }
    const doctor = doctorList.find((d) => d.id === parseInt(bookingForm.doctorId));
    if (!doctor) {
      setFormError('Selected doctor is invalid.');
      return;
    }
    const newAppointment = {
      id: Date.now(),
      doctorName: doctor.name,
      specialty: doctor.specialty,
      date: bookingForm.date,
      time: bookingForm.time,
      status: 'pending',
      type: bookingForm.type,
      reason: bookingForm.reason,
      fee: doctor.consultationFee,
    };
    setAppointments((prev) => [...prev, newAppointment]);
    setBookingForm({
      doctorId: '',
      date: '',
      time: '',
      reason: '',
      type: 'consultation',
      patientName: '',
      phone: '',
      email: '',
    });
    setCalendarDate(new Date());
    setFormSuccess('Appointment booked successfully!');
  };

  useEffect(() => {
    setBookingForm((prev) => ({ ...prev, time: '' }));
  }, [bookingForm.doctorId]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setSidebarCollapsed(true);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 bg-bodybg text-bodytext">
      <Header />

      <div className="flex flex-1 pt-[70px]">
        <div
          onMouseEnter={() => setSidebarHovered(true)}
          onMouseLeave={() => setSidebarHovered(false)}
          style={{ width: sidebarCollapsed ? 64 : 256, transition: 'width 0.3s ease' }}
          className="border-r border-gray-200 bg-sidebarbg text-sidebartext"
        >
          <Sidebar collapsed={!isSidebarOpen} />
        </div>

        {/* Main content */}
        <main className="flex-grow p-6">
          <div className="flex justify-center gap-4 mb-6">
            <button
              className={`px-4 py-2 rounded-lg font-semibold transition ${activeView === 'booking' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'
                }`}
              onClick={() => setActiveView('booking')}
            >
              Book Appointment
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-semibold transition ${activeView === 'appointments' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'
                }`}
              onClick={() => setActiveView('appointments')}
            >
              My Appointments
            </button>
          </div>

          {/* Book Appointment Section */}
          {activeView === 'booking' && (
            <div className="flex flex-col md:flex-row gap-8 mb-10">
              {/* Calendar */}
              <div className="flex-shrink-0 w-full md:w-[350px]">
                <Calendar
                  onChange={(date) => {
                    setCalendarDate(date);
                    setBookingForm((prev) => ({ ...prev, date: formatDate(date) }));
                  }}
                  value={calendarDate}
                  className={`rounded-lg p-2 shadow ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}
                  minDate={new Date()}
                />
              </div>

              {/* Booking form */}
              <div className="flex-1">
                <form
                  className="p-6 rounded-lg border shadow-md bg-formbg border-formborder"
                  onSubmit={(e) => { e.preventDefault(); handleBookingSubmit(); }}
                >
                  <h3 className="text-xl font-semibold mb-4">Book Appointment</h3>
                  {formError && <div className="mb-3 text-red-500 font-semibold border border-red-500 px-4 py-2 rounded">{formError}</div>}
                  {formSuccess && <div className="mb-3 text-green-600 font-semibold border border-green-600 px-4 py-2 rounded">{formSuccess}</div>}

                  <input
                    type="text"
                    placeholder="Patient Name *"
                    value={bookingForm.patientName}
                    onChange={(e) => setBookingForm({ ...bookingForm, patientName: e.target.value })}
                    className="w-full mb-3 px-3 py-2 border rounded-lg focus:outline-none bg-inputbg border-inputborder text-inputtext"
                  />

                  <select
                    value={bookingForm.doctorId}
                    onChange={(e) => setBookingForm({ ...bookingForm, doctorId: e.target.value })}
                    className="w-full mb-3 px-3 py-2 border rounded-lg focus:outline-none bg-inputbg border-inputborder text-inputtext"
                  >
                    <option value="">Select Doctor *</option>
                    {doctorList.map((doc) => (
                      <option key={doc.id} value={doc.id}>{doc.name} ({doc.specialty})</option>
                    ))}
                  </select>

                  <select
                    value={bookingForm.time}
                    onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                    className="w-full mb-3 px-3 py-2 border rounded-lg focus:outline-none bg-inputbg border-inputborder text-inputtext"
                    disabled={!bookingForm.doctorId}
                  >
                    <option value="">Select Time *</option>
                    {bookingForm.doctorId && doctorList.find((d) => d.id === parseInt(bookingForm.doctorId))?.availableSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>

                  <textarea
                    placeholder="Reason (optional)"
                    value={bookingForm.reason}
                    onChange={(e) => setBookingForm({ ...bookingForm, reason: e.target.value })}
                    rows={3}
                    className="w-full mb-3 px-3 py-2 border rounded-lg focus:outline-none resize-y bg-inputbg border-inputborder text-inputtext"
                  />

                  <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Book Appointment
                  </button>
                </form>

                <div className="p-6">
                  <div className="mb-4 max-w-lg">
                    <input
                      type="text"
                      placeholder="Search doctors or specialties..."
                      value={doctorSearch}
                      onChange={(e) => setDoctorSearch(e.target.value)}
                      className="w-full p-2 mb-2 border rounded"
                    />
                  </div>
                  <div className="max-w-3xl mx-auto">
                    {filteredDoctors.length === 0 ? (
                      <p className="text-center text-gray-500">No doctors found matching your search.</p>
                    ) : (
                      filteredDoctors.map((doctor) => (
                        <div
                          key={doctor.id}
                          className="p-4 rounded-lg border shadow-sm flex justify-between items-center bg-doctorbg border-doctorborder mb-4"
                        >
                          <div>
                            <h3 className="font-semibold text-lg">{doctor.name}</h3>
                            <p className="text-sm text-gray-400">
                              {doctor.specialty} • {doctor.experience}
                            </p>
                            <p className="text-sm text-yellow-400 flex items-center">
                              <Star className="w-4 h-4 mr-1" />
                              {doctor.rating.toFixed(1)}
                            </p>
                            <p className="text-sm text-gray-400">{doctor.location}</p>
                          </div>
                          <button
                            onClick={() =>
                              setBookingForm((prev) => ({
                                ...prev,
                                doctorId: doctor.id.toString(),
                              }))
                            }
                            className={`px-4 py-2 rounded-lg transition ${bookingForm.doctorId === doctor.id.toString()
                                ? "bg-blue-700 text-white"
                                : "bg-blue-600 text-white hover:bg-blue-700"
                              }`}
                          >
                            {bookingForm.doctorId === doctor.id.toString()
                              ? "Selected"
                              : "Select"}
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* My Appointments Section */}
          {activeView === 'appointments' && (
            <section className="max-w-3xl mx-auto">
              {appointments.length === 0 ? (
                <p className="text-center text-gray-500">No appointments booked.</p>
              ) : (
                appointments.map(({ id, doctorName, date, time, status, fee }) => (
                  <div
                    key={id}
                    className="p-6 mb-4 rounded-lg border shadow-sm flex justify-between items-center bg-appointmentbg border-appointmentborder"
                  >
                    <div>
                      <h3 className="font-semibold text-lg">{doctorName}</h3>
                      <p className="text-sm text-gray-400">{date} at {time}</p>
                      <p className="text-sm text-gray-400">Status: {status}</p>
                    </div>
                    <div className="text-right">
                      <button
                        onClick={() => cancelAppointment(id)}
                        className="text-red-600 hover:text-red-800 font-semibold"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ))
              )}
            </section>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default AppointmentPage;
