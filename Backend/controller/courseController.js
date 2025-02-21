const courseModel = require("../models/courseModel")

// Add a new course
exports.addCourse = async (req, res) => {
  try {
    const { title, duration, batch, fee } = req.body
    const banner = req.file ? `/uploads/${req.file.filename}` : ''

    console.log('Adding new course with data:', {
      title,
      duration,
      batch,
      fee,
      banner,
    })

    const course = new courseModel({ title, duration, batch, fee, banner })
    await course.save()

    res.status(201).json(course)
  } catch (err) {
    res.status(500).json({ error: 'Error saving course data.' })
  }
}

// Get all courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await courseModel.find()

    // console.log('Fetched courses:', courses)

    res.status(200).json(courses)
  } catch (err) {
    res.status(500).json({ error: 'Error fetching courses.' })
  }
}

// Update a course by ID
exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params
    const { title, duration, batch, fee } = req.body
    const banner = req.file ? `/uploads/${req.file.filename}` : undefined

    const updatedData = { title, duration, batch, fee }
    if (banner) updatedData.banner = banner

    const updatedCourse = await courseModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    })
    res.status(200).json(updatedCourse)
  } catch (err) {
    res.status(500).json({ error: 'Error updating course.' })
  }
}
// Delete a course by ID
exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params

    const deletedCourse = await courseModel.findByIdAndDelete(id)

    if (!deletedCourse) {
      return res.status(404).json({ error: 'Course not found.' })
    }

    res.status(200).json({ message: 'Course deleted successfully.' })
  } catch (err) {
    res.status(500).json({ error: 'Error deleting course.' })
  }
}

// Get total count of courses
exports.getTotalCourses = async (req, res) => {
  try {
    const totalCount = await courseModel.countDocuments()

    console.log('Total number of courses:', totalCount)

    res.status(200).json({ total: totalCount })
  } catch (err) {
    res.status(500).json({ error: 'Error counting courses.' })
  }
}
