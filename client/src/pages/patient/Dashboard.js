// client/src/pages/patient/Dashboard.js
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import PatientLayout from '../../components/layout/PatientLayout';
import axios from 'axios';

const PatientDashboard = () => {
  const { currentUser, token } = useContext(AuthContext);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // For demo purposes only (in a real app, this would come from API)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Mock data for MVP demo
        setUpcomingAppointments([
          { 
            id: 1, 
            doctor: 'Dr. Sarah Johnson', 
            specialty: 'Cardiologist',
            date: '2025-05-08', 
            time: '10:00 AM',
            status: 'scheduled' 
          },
          { 
            id: 2, 
            doctor: 'Dr. Michael Chen', 
            specialty: 'Dermatologist',
            date: '2025-05-12', 
            time: '2:30 PM',
            status: 'scheduled' 
          }
        ]);
        
        setMedications([
          { 
            id: 1, 
            name: 'Metformin', 
            dosage: '500mg', 
            frequency: 'Twice daily',
            nextDose: '2025-05-07 8:00 PM' 
          },
          { 
            id: 2, 
            name: 'Lisinopril', 
            dosage: '10mg', 
            frequency: 'Once daily',
            nextDose: '2025-05-08 9:00 AM' 
          }
        ]);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load dashboard data');
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  // Function to format date to display
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <PatientLayout>
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-2xl font-semibold text-gray-900">Welcome, {currentUser?.name || 'Patient'}</h1>
        <p className="mt-1 text-sm text-gray-600">Here's your health summary for today</p>
        
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <p>Loading your dashboard...</p>
          </div>
        ) : error ? (
          <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        ) : (
          <div className="mt-6">
            {/* Quick Actions */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-3">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <Link
                  to="/patient/doctors"
                  className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="mt-2 text-sm font-medium text-gray-900">Find Doctor</span>
                </Link>
                <Link
                  to="/patient/appointments"
                  className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="mt-2 text-sm font-medium text-gray-900">Book Appointment</span>
                </Link>
                <Link
                  to="/patient/medications"
                  className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m-6-8h6M5 5h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
                  </svg>
                  <span className="mt-2 text-sm font-medium text-gray-900">Medications</span>
                </Link>
                <Link
                  to="/patient/special-offers"
                  className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                  <span className="mt-2 text-sm font-medium text-gray-900">Special Offers</span>
                </Link>
              </div>
            </div>

            {/* Upcoming Appointments */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-medium text-gray-900">Upcoming Appointments</h2>
                <Link to="/patient/appointments" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                  View All
                </Link>
              </div>
              {upcomingAppointments.length > 0 ? (
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                  <ul className="divide-y divide-gray-200">
                    {upcomingAppointments.map((appointment) => (
                      <li key={appointment.id}>
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                              </div>
                              <div className="ml-4">
                                <p className="text-sm font-medium text-gray-900">{appointment.doctor}</p>
                                <p className="text-sm text-gray-500">{appointment.specialty}</p>
                              </div>
                            </div>
                            <div className="flex flex-col items-end">
                              <p className="text-sm text-gray-900">{formatDate(appointment.date)}</p>
                              <p className="text-sm text-gray-500">{appointment.time}</p>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="bg-white shadow overflow-hidden sm:rounded-md p-4 text-center text-gray-500">
                  No upcoming appointments
                </div>
              )}
            </div>

            {/* Medication Reminders */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-medium text-gray-900">Medication Reminders</h2>
                <Link to="/patient/medications" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                  View All
                </Link>
              </div>
              {medications.length > 0 ? (
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                  <ul className="divide-y divide-gray-200">
                    {medications.map((medication) => (
                      <li key={medication.id}>
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{medication.name}</p>
                              <p className="text-sm text-gray-500">{medication.dosage} - {medication.frequency}</p>
                            </div>
                            <div className="flex items-center">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Next: {new Date(medication.nextDose).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="bg-white shadow overflow-hidden sm:rounded-md p-4 text-center text-gray-500">
                  No medication reminders
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </PatientLayout>
  );
};

export default PatientDashboard;
