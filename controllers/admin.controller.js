const Form = require("../models/form");

exports.getForms = async (req, res, next) => {
  const courses = await Form.find({});
  res.render("admin/courses", { courses });
};

exports.getAcourse = async (req, res, next) => {
  const course = await Form.findById(req.params.id);
  console.log(course.units);
  res.render("admin/show", { course });
};

exports.newForm = async (req, res, next) => {
  res.render("admin/new");
};

exports.PostnewForm = async (req, res, next) => {
  const course = new Form(req.body.course);
  console.log(course);

  await course.save();
  res.redirect(`/admin/courses/${course._id}`);
};

exports.editCourse = async (req, res, next) => {
  const course = await Form.findById(req.params.id);
  res.render("admin/edit", { course });
};

exports.patchCourse = async (req, res, next) => {
  const { id } = req.params;
  const course = await Form.findByIdAndUpdate(id, { ...req.body.course });

  res.redirect(`/admin/courses/${course._id}`);
};

exports.deleteCourse = async (req, res, next) => {
  const { id } = req.params;
  await Course.findByIdAndDelete(id);
  res.redirect("/admin/courses");
};

//units

exports.getUnits = async (req, res, next) => {
  const units = await Unit.find({});
  const { id } = req.params;
  console.log(id);
  res.render("admin/units", { units, id });
};

exports.newUnit = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  res.render("admin/newUnit", { id });
};

exports.PostnewUnit = async (req, res, next) => {
  const { id } = req.params;

  let course = await Course.findById(id);

  let { title, description, isPaid, tag } = req.body;

  let unit = new Unit([{ title, description, isPaid, tag }]);

  course.units = unit._id;
  unit.course = course.id;

  console.log(unit);
  await course.save();
  await unit.save();

  res.redirect(`/admin/courses/${id}/units/new`);
};

exports.getAunit = async (req, res, next) => {
  const unit = await Unit.findById(req.params.id);
  const { id } = req.params;
  console.log(id);
  res.render("admin/unitShow", { unit });
};

exports.editUnit = async (req, res, next) => {
  const unit = await Unit.findById(req.params.id);
  res.render("admin/unitEdit", { unit });
};

exports.patchUnit = async (req, res, next) => {
  const { id } = req.params;
  const unit = await Unit.findByIdAndUpdate(id, { ...req.body.unit });
  res.redirect(`/admin/courses/units/${unit._id}`);
};

exports.deleteUnit = async (req, res, next) => {
  const { id } = req.params;
  await Unit.findByIdAndDelete(id);
  res.redirect("/admin/courses/units");
};
