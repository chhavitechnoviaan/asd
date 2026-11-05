

const jwt = require("jsonwebtoken");
const User = require("../models/user");
const {allowedForStaff} = require("./staffPolicy");

exports.protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ msg: "No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).populate("roleId");

    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }

    if (user.status === "inactive" || user.accountStatus === "Inactive" || !user.roleId || (user.roleId.status === "inactive") || (Number(decoded.sv || 0) !== Number(user.sessionVersion || 0))) return res.status(403).json({msg:"Account unavailable"});
    req.user = user;
    req.user.roleName = String(user.roleId?.name || "").trim().toLowerCase();

    if (user.isInternalStaff) {
      const result = allowedForStaff(user, req.method, req.originalUrl);
      if (!result.ok) return res.status(403).json({status:0, msg:result.reason, code:'STAFF_PERMISSION_DENIED'});
      req.staffPermissionApproved = !result.personal;
    }
    next();

  } catch (err) {
    return res.status(401).json({
      msg: "Invalid token",
      error: err.message
    });
  }
};

exports.adminOnly = (req, res, next) => {
  if (req.user?.isInternalStaff && req.staffPermissionApproved) return next();
  if (String(req.user?.roleName || "").toLowerCase() !== "admin" || req.user?.isInternalStaff) {
    return res.status(403).json({ msg: "Admin only access" });
  }
  next();
};

exports.checkPermission = (module, action) => {
  return (req, res, next) => {
    if (String(req.user?.roleName || "").toLowerCase() === "admin" && !req.user?.isInternalStaff) {
      return next();
    }

    const permissions = req.user.roleId?.permissions;

    if (!permissions) {
      return res.status(403).json({ msg: "No permissions found" });
    }

    const modulePermission = permissions.get ? permissions.get(module) : permissions[module];

    if (!modulePermission || !modulePermission[action]) {
      return res.status(403).json({
        msg: `You are not allowed to ${action} in ${module}`
      });
    }

    next();
  };
};
exports.allowRoles = (...roles) => (req,res,next) => roles.includes(req.user?.roleName) ? next() : res.status(403).json({msg:"Forbidden"});

exports.adminOrStaff = (module, action = "view") => (req, res, next) => {
  if (req.user?.roleName === "admin" && !req.user?.isInternalStaff) return next();
  if (!req.user?.isInternalStaff) return res.status(403).json({ msg: "Administrative access required" });
  const permissions = req.user?.roleId?.permissions;
  const rule = permissions?.get ? permissions.get(module) : permissions?.[module];
  return rule?.[action] === true ? next() : res.status(403).json({ msg: `Permission denied: ${module}.${action}` });
};

exports.blockStaffSecurityFields = (req,res,next) => {
  if (!req.user?.isInternalStaff) return next();
  const forbidden=["role", "roleId", "password", "status", "accountStatus", "accountType", "plan", "planId", "planExpiry", "aiLimit", "aiUsed", "isVerified", "emailVerified", "isInternalStaff", "sessionVersion", "twoFactorEnabled", "kycStatus"];
  if (forbidden.some(k => Object.prototype.hasOwnProperty.call(req.body || {},k))) return res.status(403).json({msg:"You cannot update account security, roles or subscription fields"});
  const allowed = new Set(["name", "phone", "companyName", "businessType", "gstNumber", "importExportId", "address", "city", "country", "designation"]);
  if (Object.keys(req.body || {}).some(k => !allowed.has(k))) return res.status(403).json({msg:"Staff may update only approved profile fields"});
  return next();
};
