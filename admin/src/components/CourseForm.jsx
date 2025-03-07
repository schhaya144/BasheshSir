
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SummaryApi from '../common/SummaryAPI'
import { FiEdit } from 'react-icons/fi'
import { MdDelete } from 'react-icons/md'

const CourseForm = () => {
  const [courses, setCourses] = useState([])
  const [formData, setFormData] = useState({
    title: '',
    duration: '',
    batch: '',
    fee: '',
  })
  const [banner, setBanner] = useState(null)
  const [editingCourseId, setEditingCourseId] = useState(null)
  const [editingCourse, setEditingCourse] = useState({})

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const response = await axios.get(SummaryApi.getCourses.url)
      setCourses(response.data)
    } catch (error) {
      console.error('Error fetching courses:', error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleBannerChange = (e) => {
    setBanner(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const courseData = new FormData()
    courseData.append('title', formData.title)
    courseData.append('duration', formData.duration)
    courseData.append('batch', formData.batch)
    courseData.append('fee', formData.fee)
    if (banner) {
      courseData.append('banner', banner)
    }

    try {
      const response = await axios(
        {
          url: SummaryApi.addCourse.url,
          method: SummaryApi.addCourse.method,
          data: courseData,
        },
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )
      setCourses([...courses, response.data])
      setFormData({ title: '', duration: '', batch: '', fee: '' })
      setBanner(null)
    } catch (error) {
      console.error('Error adding course:', error)
    }
  }

  const handleEditInputChange = (e, field) => {
    const { value } = e.target
    setEditingCourse((prevCourse) => ({ ...prevCourse, [field]: value }))
  }

  const handleEdit = (course) => {
    setEditingCourseId(course._id)
    setEditingCourse(course)
  }

  const handleCancelEdit = () => {
    setEditingCourseId(null)
    setEditingCourse({})
  }

  const handleSaveEdit = async () => {
    try {
      const updatedData = new FormData()
      updatedData.append('title', editingCourse.title)
      updatedData.append('duration', editingCourse.duration)
      updatedData.append('batch', editingCourse.batch)
      updatedData.append('fee', editingCourse.fee)
      if (banner) {
        updatedData.append('banner', banner)
      }

      const response = await axios.put(
        SummaryApi.updateCourse.url.replace(':id', editingCourseId),
        updatedData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )

      setCourses(
        courses.map((course) =>
          course._id === editingCourseId ? response.data : course
        )
      )
      handleCancelEdit() // Exit editing mode
    } catch (error) {
      console.error('Error updating course:', error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${SummaryApi.deleteCourse.url.replace(':id', id)}`)
      setCourses(courses.filter((course) => course._id !== id))
    } catch (error) {
      console.error('Error deleting course:', error)
    }
  }

  return (
    <div className="p-6 bg-gradient-to-br from-gray-800 via-gray-800 to-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-4 border-b border-gray-600 pb-2">
        Create New Course
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              label: 'Course Title',
              value: formData.title,
              setValue: handleChange,
              name: 'title',
            },
            {
              label: 'Duration',
              value: formData.duration,
              setValue: handleChange,
              name: 'duration',
            },
            {
              label: 'Batch',
              value: formData.batch,
              setValue: handleChange,
              name: 'batch',
            },
            {
              label: 'Fee',
              value: formData.fee,
              setValue: handleChange,
              name: 'fee',
            },
          ].map((field, idx) => (
            <div key={idx}>
              <label className="block text-sm font-medium mb-1">
                {field.label}
              </label>
              <input
                type="text"
                name={field.name}
                value={
                  editingCourseId ? editingCourse[field.name] : field.value
                }
                onChange={(e) => field.setValue(e)}
                className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:ring focus:ring-blue-400"
              />
            </div>
          ))}

          <div>
            <label htmlFor="banner" className="block text-sm font-medium mb-1">
              Banner
            </label>
            <input
              type="file"
              name="banner"
              onChange={handleBannerChange}
              className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:ring focus:ring-blue-400"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-teal-400 to-blue-500 hover:bg-gradient-to-r hover:from-teal-500 hover:to-blue-600 text-white py-2 rounded-lg font-bold"
        >
          {editingCourseId ? 'Save Course' : 'Create Course'}
        </button>
      </form>

      <h2 className="text-3xl font-bold mt-6 mb-4 border-b border-gray-600 pb-2">
        Courses
      </h2>

      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left text-sm border border-gray-600">
          <thead className="bg-gray-700">
            <tr>
              {[
                'S.No',
                'Course Title',
                'Duration',
                'Batch',
                'Fee',
                'Banner',
                'Actions',
              ].map((header) => (
                <th key={header} className="px-4 py-2 border-b border-gray-600">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {courses.map((course, idx) => (
              <tr key={course._id} className="hover:bg-gray-700">
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2">
                  {editingCourseId === course._id ? (
                    <input
                      type="text"
                      value={editingCourse.title}
                      onChange={(e) => handleEditInputChange(e, 'title')}
                      className="w-full bg-gray-700 p-1 rounded text-white border border-gray-600"
                    />
                  ) : (
                    course.title
                  )}
                </td>
                <td className="px-4 py-2">
                  {editingCourseId === course._id ? (
                    <input
                      type="text"
                      value={editingCourse.duration}
                      onChange={(e) => handleEditInputChange(e, 'duration')}
                      className="w-full bg-gray-700 p-1 rounded text-white border border-gray-600"
                    />
                  ) : (
                    course.duration
                  )}
                </td>
                <td className="px-4 py-2">
                  {editingCourseId === course._id ? (
                    <input
                      type="text"
                      value={editingCourse.batch}
                      onChange={(e) => handleEditInputChange(e, 'batch')}
                      className="w-full bg-gray-700 p-1 rounded text-white border border-gray-600"
                    />
                  ) : (
                    course.batch
                  )}
                </td>
                <td className="px-4 py-2">
                  {editingCourseId === course._id ? (
                    <input
                      type="text"
                      value={editingCourse.fee}
                      onChange={(e) => handleEditInputChange(e, 'fee')}
                      className="w-full bg-gray-700 p-1 rounded text-white border border-gray-600"
                    />
                  ) : (
                    course.fee
                  )}
                </td>
                <td className="px-4 py-2">
                  {course.banner && (
                    <img
                      src={`http://localhost:8077${course.banner}`}
                      alt={course.title}
                      className="w-16 h-16 object-cover"
                    />
                  )}
                </td>
                <td className="px-4 py-2 flex justify-center  gap-2">
                  {editingCourseId === course._id ? (
                    <>
                      <button
                        onClick={handleSaveEdit}
                        className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(course)}
                        className="text-yellow-500  "
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(course._id)}
                        className="text-red-500"
                      >
                        <MdDelete />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CourseForm
