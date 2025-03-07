import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FaUser, FaCalendarAlt, FaChalkboardTeacher, FaCogs } from 'react-icons/fa'

const Dashboard = () => {
  const [counts, setCounts] = useState({
    courseCount: 0,
    eventCount: 0,
    enrolledUsers: 0,
    subAdmins: 0,
  })

  const fetchCounts = async () => {
    try {
      const [courses, events, users] = await Promise.all([
        axios.get('http://localhost:8077/api/getTotalCourses'),
        axios.get('http://localhost:8077/api/events/count'),
        axios.get('http://localhost:8077/api/users/count'),
      ]);
  
      console.log("API Responses:");
      console.log("Courses:", courses.data); // Should log { total: 1 } or similar
      console.log("Events:", events.data);
      console.log("Users:", users.data);
  
      setCounts({
        courseCount: courses.data.total ?? 0,
        eventCount: events.data.total ?? 0,
        enrolledUsers: users.data.total ?? 0,
        subAdmins: 5, // Static example
      });
  
    } catch (error) {
      console.error("Error fetching counts:", error);
    }
  };
  
  

  useEffect(() => {
    fetchCounts()
  }, [])

  const stats = [
    {
      title: 'Enrolled Users',
      count: counts.enrolledUsers,
      color: 'bg-blue-500',
      icon: <FaUser size={30} />,
    },
    {
      title: 'Events',
      count: counts.eventCount,
      color: 'bg-green-500',
      icon: <FaCalendarAlt size={30} />,
    },
    {
      title: 'Sub-admins',
      count: counts.subAdmins,
      color: 'bg-yellow-500',
      icon: <FaCogs size={30} />,
    },
    {
      title: 'Offered Courses',
      count: counts.courseCount,
      color: 'bg-purple-500',
      icon: <FaChalkboardTeacher size={30} />,
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800">
      <main className="flex-1 p-6">
        <h1 className="text-4xl font-bold text-white mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`shadow-lg rounded-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl ${stat.color}`}
            >
              <div className="p-6 flex items-center space-x-4">
                <div>{stat.icon}</div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    {stat.title}
                  </h2>
                  <p className="text-4xl font-bold text-white mt-2">
                    {stat.count}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Dashboard
