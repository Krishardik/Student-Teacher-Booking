const appointmentModel = require("../models/appointmentModel");
const teacherModel = require("../models/teacherModel");
const userModel = require("../models/userModels");
const getTeacherInfoController = async (req, res) => {
  try {
    const teacher = await teacherModel.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "teacher data fetch success",
      data: teacher,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Fetching Teacher Details",
    });
  }
};

// update teacher profile
const updateProfileController = async (req, res) => {
  try {
    const teacher = await teacherModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(201).send({
      success: true,
      message: "Teacher Profile Updated",
      data: teacher,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Teacher Profile Update issue",
      error,
    });
  }
};

//get single teacher
const getTeacherByIdController = async (req, res) => {
  try {
    const teacher = await teacherModel.findOne({ _id: req.body.teacherId });
    res.status(200).send({
      success: true,
      message: "Single teacher Info Fetched",
      data: teacher,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Single Teacher info",
    });
  }
};

const teacherAppointmentsController = async (req, res) => {
  try {
    const teacher = await teacherModel.findOne({ userId: req.body.userId });
    const appointments = await appointmentModel.find({
      teacherId: teacher._id,
    });
    res.status(200).send({
      success: true,
      message: "Teacher Appointments fetch Successfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Teacher Appointments",
    });
  }
};

const updateStatusController = async (req, res) => {
  try {
    const { appointmentsId, status } = req.body;
    const appointments = await appointmentModel.findByIdAndUpdate(
      appointmentsId,
      { status }
    );
    const user = await userModel.findOne({ _id: appointments.userId });
    const notification = user.notification;
    notification.push({
      type: "status-updated",
      message: `Your appointment has been ${status}`,
      onCLickPath: "/teacher-appointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment Status Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Update Status",
    });
  }
};

module.exports = {
  getTeacherInfoController,
  updateProfileController,
  getTeacherByIdController,
  teacherAppointmentsController,
  updateStatusController,
};
