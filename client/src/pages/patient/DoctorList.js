// client/src/pages/patient/DoctorList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PatientLayout from '../../components/layout/PatientLayout';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  
  // Mock data for MVP
  const specialties = [
    'All Specialties',
    'Cardiology',
    'Dermatology',
    'Neurology',
    'Orthopedics',
    'Pediatrics',
    'Psychiatry',
    'Radiology',
    'Surgery'
  ];
  
  // Mock data for MVP
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDoctors([
        {
          id: 1,
          name: 'Dr. Sarah Johnson',
          specialty: 'Cardiology',
          experience: 15,
          rating: 4.8,
          availableSlots: 5,
          image: 'https://randomuser.me/api/portraits/women/68.jpg'
        },
        {
          id: 2,
          name: 'Dr. Michael Chen',
          specialty: 'Dermatology',
          experience: 10,
          rating: 4.7,
          availableSlots: 3,
          image: 'https://randomuser.me/api/portraits/men/32.jpg'
        },
        {
          id: 3,
          name: 'Dr. Emily Wilson',
          specialty: 'Neurology',
          experience: 12,
          rating: 4.9,
          availableSlots: 2,
          image: 'https://randomuser.me/api/portraits/women/24.jpg'
        },
        {
          id: 4,
          name: 'Dr. James Brown',
          specialty: 'Orthopedics',
          experience: 20,
          rating: 4.6,
          availableSlots: 7,
          image: 'https://randomuser.me/api/portraits/men/45.jpg'
        },
        {
          id: 5,
          name: 'Dr. Lisa Rivera',
          specialty: 'Pediatrics',
          experience: 8,
          rating: 4.8,
          availableSlots: 4,
          image: 'https://randomuser.me/api/portraits/women/57.jpg'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);
  
  // Filter doctors based on search term and specialty
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === '' || selectedSpecialty === 'All Specialties' || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });
  
  return (
    <PatientLayout>
      <div className="px-4 py-5 sm:px-0">
        <h1 className="text-2xl font-semibold text-gray-900">Find Doctors</h1>
        <p className="mt-1 text-sm text-gray-600">Browse our network of qualified healthcare professionals</p>
        
        {/* Search and Filter */}
        <div className="mt-5 bg-white p-4 rounded-lg shadow">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700">Search</label>
              <div className="mt-1">
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="specialty" className="block text-sm font-medium text-gray-700">Specialty</label>
              <div className="mt-1">
                <select
                  id="specialty"
                  name="specialty"
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                >
                  {specialties.map((specialty) => (
                    <option key={specialty} value={specialty}>{specialty}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        
        {/* Doctor List */}
        <div className="mt-6">
          {loading ? (
            <div className="flex items-center justify-center h-40">
              <p>Loading doctors...</p>
            </div>
          ) : filteredDoctors.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredDoctors.map((doctor) => (
                <div key={doctor.id} className="bg-white shadow rounded-lg overflow-hidden">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <img className="h-12 w-12 rounded-full" src={doctor.image} alt={doctor.name} />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">{doctor.name}</h3>
                        <p className="text-sm text-gray-500">{doctor.specialty}</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="ml-1 text-sm text-gray-600">{doctor.rating} / 5</span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">{doctor.experience} years exp</span>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-sm text-gray-600">{doctor.availableSlots} slots available</span>
                        <Link 
                          to={`/patient/book-appointment/${doctor.id}`}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white shadow rounded-lg p-6 text-center">
              <p className="text-gray-500">No doctors found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </PatientLayout>
  );
};

export default DoctorList;
