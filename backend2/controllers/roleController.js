const {recordAdminActivity}=require("../services/adminActivity");
const {notifyAction}=require("../services/actionNotification");
const Role = require("../models/Role");

const allModules = [
  "dashboard",
  "booking",
  "shipment",
  "tracking",
  "documents",
  "earnings",
  "ads",
  "support",
  "settings", "users", "vendors", "plans", "masterData", "hsRules", "countryRules", "dgftSchemes", "aiAssistant", "roles", "subAdmins"
];

const fullAccess = {
  view: true,
  add: true,
  edit: true,
  delete: true
};
exports.createRole = async (req, res) => {
  try {
    let { name, permissions, description = "", status = "active" } = req.body;
    if (["admin", "user", "b2b"].includes(String(name).toLowerCase())) return res.status(400).json({status:0,message:"System roles cannot be created here"});
    const finalPermissions = {};

    allModules.forEach((module) => {
      finalPermissions[module] = permissions?.[module] || {
        view: false,
        add: false,
        edit: false,
        delete: false
      };
    });
    if (name === "admin") {
      allModules.forEach((module) => {
        finalPermissions[module] = fullAccess;
      });
    }

    const role = await Role.create({
      name, description, status, internalOnly: true,
      permissions: finalPermissions
    });

    await recordAdminActivity({title:"Role created",message:`Internal role ${role.name} created`,actorId:req.user?._id,relatedId:role._id});
    res.json({
      status: 1,
      message: "Role created successfully",
      data: role
    });

  } catch (err) {
    res.status(500).json({
      status: 0,
      message: err.message
    });
  }
};
const User = require("../models/user");

exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.find({ internalOnly: true });

    const rolesWithCount = await Promise.all(
      roles.map(async (role) => {
        const userCount = await User.countDocuments({
          roleId: role._id
        });

        return {
          ...role.toObject(),
          userCount
        };
      })
    );

    res.json({
      status: 1,
      data: rolesWithCount
    });

  } catch (err) {
    res.status(500).json({
      status: 0,
      message: err.message
    });
  }
};
exports.getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);

    if (!role) {
      return res.status(404).json({
        status: 0,
        message: "Role not found"
      });
    }

    res.json({
      status: 1,
      data: role
    });

  } catch (err) {
    res.status(500).json({
      status: 0,
      message: err.message
    });
  }
};
exports.updateRole = async (req, res) => {
  try {
    const { permissions, name, description, status } = req.body;
    const current = await Role.findById(req.params.id);
    if (!current) return res.status(404).json({status:0,message:"Role not found"});
    if (["admin","user","b2b"].includes(String(current.name).toLowerCase())) return res.status(403).json({status:0,message:"System role is protected"});

    const finalPermissions = {};

    allModules.forEach((module) => {
      finalPermissions[module] = permissions?.[module] || {
        view: false,
        add: false,
        edit: false,
        delete: false
      };
    });

    const updated = await Role.findByIdAndUpdate(
      req.params.id,
      {
        name, description, status,
        permissions: finalPermissions
      },
      { new: true }
    );

    res.json({
      status: 1,
      message: "Role updated successfully",
      data: updated
    });

  } catch (err) {
    res.status(500).json({
      status: 0,
      message: err.message
    });
  }
};
exports.deleteRole = async (req, res) => {
  try {
    const existing = await Role.findById(req.params.id);
    if (!existing || !existing.internalOnly) return res.status(403).json({status:0,message:"System role cannot be deleted"});
    if (await User.exists({roleId:req.params.id})) return res.status(409).json({status:0,message:"Reassign sub-admins before deleting role"});
    await Role.findByIdAndDelete(req.params.id);

    res.json({
      status: 1,
      message: "Role deleted successfully"
    });

  } catch (err) {
    res.status(500).json({
      status: 0,
      message: err.message
    });
  }
};