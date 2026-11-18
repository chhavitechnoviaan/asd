// // // const {recordAdminActivity}=require("../services/adminActivity");
// // // const {notifyAction}=require("../services/actionNotification");
// // // const Role = require("../models/Role");

// // // const allModules = [
// // //   "dashboard",
// // //   "booking",
// // //   "shipment",
// // //   "tracking",
// // //   "documents",
// // //   "earnings",
// // //   "ads",
// // //   "support",
// // //   "settings", "users", "vendors", "plans", "masterData", "hsRules", "countryRules", "dgftSchemes", "aiAssistant", "roles", "subAdmins"
// // // ];

// // // const fullAccess = {
// // //   view: true,
// // //   add: true,
// // //   edit: true,
// // //   delete: true
// // // };
// // // exports.createRole = async (req, res) => {
// // //   try {
// // //     let { name, permissions, description = "", status = "active" } = req.body;
// // //     if (["admin", "user", "b2b"].includes(String(name).toLowerCase())) return res.status(400).json({status:0,message:"System roles cannot be created here"});
// // //     const finalPermissions = {};

// // //     allModules.forEach((module) => {
// // //       finalPermissions[module] = permissions?.[module] || {
// // //         view: false,
// // //         add: false,
// // //         edit: false,
// // //         delete: false
// // //       };
// // //     });
// // //     if (name === "admin") {
// // //       allModules.forEach((module) => {
// // //         finalPermissions[module] = fullAccess;
// // //       });
// // //     }

// // //     const role = await Role.create({
// // //       name, description, status, internalOnly: true,
// // //       permissions: finalPermissions
// // //     });

// // //     await recordAdminActivity({title:"Role created",message:`Internal role ${role.name} created`,actorId:req.user?._id,relatedId:role._id});
// // //     res.json({
// // //       status: 1,
// // //       message: "Role created successfully",
// // //       data: role
// // //     });

// // //   } catch (err) {
// // //     res.status(500).json({
// // //       status: 0,
// // //       message: err.message
// // //     });
// // //   }
// // // };
// // // const User = require("../models/user");

// // // exports.getRoles = async (req, res) => {
// // //   try {
// // //     const roles = await Role.find({ internalOnly: true });

// // //     const rolesWithCount = await Promise.all(
// // //       roles.map(async (role) => {
// // //         const userCount = await User.countDocuments({
// // //           roleId: role._id
// // //         });

// // //         return {
// // //           ...role.toObject(),
// // //           userCount
// // //         };
// // //       })
// // //     );

// // //     res.json({
// // //       status: 1,
// // //       data: rolesWithCount
// // //     });

// // //   } catch (err) {
// // //     res.status(500).json({
// // //       status: 0,
// // //       message: err.message
// // //     });
// // //   }
// // // };
// // // exports.getRoleById = async (req, res) => {
// // //   try {
// // //     const role = await Role.findById(req.params.id);

// // //     if (!role) {
// // //       return res.status(404).json({
// // //         status: 0,
// // //         message: "Role not found"
// // //       });
// // //     }

// // //     res.json({
// // //       status: 1,
// // //       data: role
// // //     });

// // //   } catch (err) {
// // //     res.status(500).json({
// // //       status: 0,
// // //       message: err.message
// // //     });
// // //   }
// // // };
// // // exports.updateRole = async (req, res) => {
// // //   try {
// // //     const { permissions, name, description, status } = req.body;
// // //     const current = await Role.findById(req.params.id);
// // //     if (!current) return res.status(404).json({status:0,message:"Role not found"});
// // //     if (["admin","user","b2b"].includes(String(current.name).toLowerCase())) return res.status(403).json({status:0,message:"System role is protected"});

// // //     const finalPermissions = {};

// // //     allModules.forEach((module) => {
// // //       finalPermissions[module] = permissions?.[module] || {
// // //         view: false,
// // //         add: false,
// // //         edit: false,
// // //         delete: false
// // //       };
// // //     });

// // //     const updated = await Role.findByIdAndUpdate(
// // //       req.params.id,
// // //       {
// // //         name, description, status,
// // //         permissions: finalPermissions
// // //       },
// // //       { new: true }
// // //     );

// // //     res.json({
// // //       status: 1,
// // //       message: "Role updated successfully",
// // //       data: updated
// // //     });

// // //   } catch (err) {
// // //     res.status(500).json({
// // //       status: 0,
// // //       message: err.message
// // //     });
// // //   }
// // // };
// // // exports.deleteRole = async (req, res) => {
// // //   try {
// // //     const existing = await Role.findById(req.params.id);
// // //     if (!existing || !existing.internalOnly) return res.status(403).json({status:0,message:"System role cannot be deleted"});
// // //     if (await User.exists({roleId:req.params.id})) return res.status(409).json({status:0,message:"Reassign sub-admins before deleting role"});
// // //     await Role.findByIdAndDelete(req.params.id);

// // //     res.json({
// // //       status: 1,
// // //       message: "Role deleted successfully"
// // //     });

// // //   } catch (err) {
// // //     res.status(500).json({
// // //       status: 0,
// // //       message: err.message
// // //     });
// // //   }
// // // };



// // const {recordAdminActivity}=require("../services/adminActivity");
// // const {notifyAction}=require("../services/actionNotification");
// // const Role = require("../models/Role");

// // const allModules = [
// //   "dashboard",
// //   "booking",
// //   "shipment",
// //   "tracking",
// //   "documents",
// //   "earnings",
// //   "ads",
// //   "support",
// //   "settings", "users", "vendors", "plans", "masterData", "hsRules", "countryRules", "dgftSchemes", "aiAssistant", "roles", "subAdmins", "notices", "notifications"
// // ];

// // const fullAccess = {
// //   view: true,
// //   add: true,
// //   edit: true,
// //   delete: true
// // };
// // exports.createRole = async (req, res) => {
// //   try {
// //     let { name, permissions, description = "", status = "active" } = req.body;
// //     if (["admin", "user", "b2b"].includes(String(name).toLowerCase())) return res.status(400).json({status:0,message:"System roles cannot be created here"});
// //     const finalPermissions = {};

// //     allModules.forEach((module) => {
// //       finalPermissions[module] = permissions?.[module] || {
// //         view: false,
// //         add: false,
// //         edit: false,
// //         delete: false
// //       };
// //     });
// //     if (name === "admin") {
// //       allModules.forEach((module) => {
// //         finalPermissions[module] = fullAccess;
// //       });
// //     }

// //     const role = await Role.create({
// //       name, description, status, internalOnly: true,
// //       permissions: finalPermissions
// //     });

// //     await recordAdminActivity({title:"Role created",message:`Internal role ${role.name} created`,actorId:req.user?._id,relatedId:role._id});
// //     res.json({
// //       status: 1,
// //       message: "Role created successfully",
// //       data: role
// //     });

// //   } catch (err) {
// //     res.status(500).json({
// //       status: 0,
// //       message: err.message
// //     });
// //   }
// // };
// // const User = require("../models/user");

// // exports.getRoles = async (req, res) => {
// //   try {
// //     const roles = await Role.find({ internalOnly: true });

// //     const rolesWithCount = await Promise.all(
// //       roles.map(async (role) => {
// //         const userCount = await User.countDocuments({
// //           roleId: role._id
// //         });

// //         return {
// //           ...role.toObject(),
// //           userCount
// //         };
// //       })
// //     );

// //     res.json({
// //       status: 1,
// //       data: rolesWithCount
// //     });

// //   } catch (err) {
// //     res.status(500).json({
// //       status: 0,
// //       message: err.message
// //     });
// //   }
// // };
// // exports.getRoleById = async (req, res) => {
// //   try {
// //     const role = await Role.findById(req.params.id);

// //     if (!role) {
// //       return res.status(404).json({
// //         status: 0,
// //         message: "Role not found"
// //       });
// //     }

// //     res.json({
// //       status: 1,
// //       data: role
// //     });

// //   } catch (err) {
// //     res.status(500).json({
// //       status: 0,
// //       message: err.message
// //     });
// //   }
// // };
// // exports.updateRole = async (req, res) => {
// //   try {
// //     const { permissions, name, description, status } = req.body;
// //     const current = await Role.findById(req.params.id);
// //     if (!current) return res.status(404).json({status:0,message:"Role not found"});
// //     if (["admin","user","b2b"].includes(String(current.name).toLowerCase())) return res.status(403).json({status:0,message:"System role is protected"});

// //     // PATCH semantics: omitted modules/actions retain their saved values.
// //     // Never turn an omitted permission into false during a partial update.
// //     const finalPermissions = {};
// //     const actions = ['view', 'add', 'edit', 'delete'];
// //     if (permissions !== undefined) {
// //       if (!permissions || typeof permissions !== 'object' || Array.isArray(permissions)) {
// //         return res.status(400).json({ status: 0, message: 'Invalid permissions object' });
// //       }
// //       for (const [module, changes] of Object.entries(permissions)) {
// //         if (!allModules.includes(module) || !changes || typeof changes !== 'object' || Array.isArray(changes)) {
// //           return res.status(400).json({ status: 0, message: `Invalid permission module: ${module}` });
// //         }
// //         const existing = current.permissions?.[module];
// //         const merged = { ...(existing?.toObject?.() || existing || {}) };
// //         for (const action of actions) merged[action] = existing?.[action] === true;
// //         for (const [action, value] of Object.entries(changes)) {
// //           if (!(actions.includes(action) || (module === 'users' && action === 'changePlan') || (module === 'vendors' && ['kycApprove', 'changePlan'].includes(action)) || (module === 'shipment' && ['approve', 'reject'].includes(action))) || typeof value !== 'boolean') {
// //             return res.status(400).json({ status: 0, message: `Invalid permission: ${module}.${action}` });
// //           }
// //           merged[action] = value;
// //         }
// //         finalPermissions[module] = merged;
// //       }
// //     }
// //     const updates = {};
// //     if (name !== undefined) updates.name = name;
// //     if (description !== undefined) updates.description = description;
// //     if (status !== undefined) updates.status = status;
// //     for (const [module, value] of Object.entries(finalPermissions)) {
// //       updates[`permissions.${module}`] = value;
// //     }
// //     const updated = await Role.findByIdAndUpdate(req.params.id, { $set: updates }, { new: true, runValidators: true });

// //     res.json({
// //       status: 1,
// //       message: "Role updated successfully",
// //       data: updated
// //     });

// //   } catch (err) {
// //     res.status(500).json({
// //       status: 0,
// //       message: err.message
// //     });
// //   }
// // };
// // exports.deleteRole = async (req, res) => {
// //   try {
// //     const existing = await Role.findById(req.params.id);
// //     if (!existing || !existing.internalOnly) return res.status(403).json({status:0,message:"System role cannot be deleted"});
// //     if (await User.exists({roleId:req.params.id})) return res.status(409).json({status:0,message:"Reassign sub-admins before deleting role"});
// //     await Role.findByIdAndDelete(req.params.id);

// //     res.json({
// //       status: 1,
// //       message: "Role deleted successfully"
// //     });

// //   } catch (err) {
// //     res.status(500).json({
// //       status: 0,
// //       message: err.message
// //     });
// //   }
// // };






// const {recordAdminActivity}=require("../services/adminActivity");
// const {notifyAction}=require("../services/actionNotification");
// const Role = require("../models/Role");

// const allModules = [
//   "dashboard",
//   "booking",
//   "shipment",
//   "tracking",
//   "documents",
//   "earnings",
//   "ads",
//   "support",
//   "settings", "users", "vendors", "plans", "masterData", "hsRules", "countryRules", "dgftSchemes", "aiAssistant", "roles", "subAdmins", "notices", "notifications"
// ];

// const fullAccess = {
//   view: true,
//   add: true,
//   edit: true,
//   delete: true
// };
// exports.createRole = async (req, res) => {
//   try {
//     let { name, permissions, description = "", status = "active" } = req.body;
//     if (["admin", "user", "b2b"].includes(String(name).toLowerCase())) return res.status(400).json({status:0,message:"System roles cannot be created here"});
//     const finalPermissions = {};
//     const adminOnly = new Set(["documents", "tracking", "booking", "settings"]);

//     allModules.forEach((module) => {
//       finalPermissions[module] = adminOnly.has(module) ? {view:false,add:false,edit:false,delete:false} : (permissions?.[module] || {
//         view: false,
//         add: false,
//         edit: false,
//         delete: false
//       });
//     });
//     if (name === "admin") {
//       allModules.forEach((module) => {
//         finalPermissions[module] = fullAccess;
//       });
//     }

//     const role = await Role.create({
//       name, description, status, internalOnly: true,
//       permissions: finalPermissions
//     });

//     await recordAdminActivity({title:"Role created",message:`Internal role ${role.name} created`,actorId:req.user?._id,relatedId:role._id});
//     res.json({
//       status: 1,
//       message: "Role created successfully",
//       data: role
//     });

//   } catch (err) {
//     res.status(500).json({
//       status: 0,
//       message: err.message
//     });
//   }
// };
// const User = require("../models/user");

// exports.getRoles = async (req, res) => {
//   try {
//     const roles = await Role.find({ internalOnly: true });

//     const rolesWithCount = await Promise.all(
//       roles.map(async (role) => {
//         const userCount = await User.countDocuments({
//           roleId: role._id
//         });

//         return {
//           ...role.toObject(),
//           userCount
//         };
//       })
//     );

//     res.json({
//       status: 1,
//       data: rolesWithCount
//     });

//   } catch (err) {
//     res.status(500).json({
//       status: 0,
//       message: err.message
//     });
//   }
// };
// exports.getRoleById = async (req, res) => {
//   try {
//     const role = await Role.findById(req.params.id);

//     if (!role) {
//       return res.status(404).json({
//         status: 0,
//         message: "Role not found"
//       });
//     }

//     res.json({
//       status: 1,
//       data: role
//     });

//   } catch (err) {
//     res.status(500).json({
//       status: 0,
//       message: err.message
//     });
//   }
// };
// exports.updateRole = async (req, res) => {
//   try {
//     const { permissions, name, description, status } = req.body;
//     const current = await Role.findById(req.params.id);
//     if (!current) return res.status(404).json({status:0,message:"Role not found"});
//     if (["admin","user","b2b"].includes(String(current.name).toLowerCase())) return res.status(403).json({status:0,message:"System role is protected"});

//     // PATCH semantics: omitted modules/actions retain their saved values.
//     // Never turn an omitted permission into false during a partial update.
//     const finalPermissions = {};
//     const actions = ['view', 'add', 'edit', 'delete'];
//     const adminOnly = new Set(['documents', 'tracking', 'booking', 'settings']);
//     if (permissions !== undefined) {
//       if (!permissions || typeof permissions !== 'object' || Array.isArray(permissions)) {
//         return res.status(400).json({ status: 0, message: 'Invalid permissions object' });
//       }
//       for (const [module, changes] of Object.entries(permissions)) {
//         if (!allModules.includes(module) || !changes || typeof changes !== 'object' || Array.isArray(changes)) {
//           return res.status(400).json({ status: 0, message: `Invalid permission module: ${module}` });
//         }
//         if (adminOnly.has(module)) {
//           return res.status(403).json({status:0,message:`${module} is Main Admin only`});
//         }
//         const existing = current.permissions?.[module];
//         const merged = { ...(existing?.toObject?.() || existing || {}) };
//         for (const action of actions) merged[action] = existing?.[action] === true;
//         for (const [action, value] of Object.entries(changes)) {
//           if (!(actions.includes(action) || (module === 'users' && action === 'changePlan') || (module === 'vendors' && ['kycApprove', 'changePlan'].includes(action)) || (module === 'shipment' && ['approve', 'reject'].includes(action))) || typeof value !== 'boolean') {
//             return res.status(400).json({ status: 0, message: `Invalid permission: ${module}.${action}` });
//           }
//           merged[action] = value;
//         }
//         finalPermissions[module] = merged;
//       }
//     }
//     const updates = {};
//     if (name !== undefined) updates.name = name;
//     if (description !== undefined) updates.description = description;
//     if (status !== undefined) updates.status = status;
//     for (const [module, value] of Object.entries(finalPermissions)) {
//       updates[`permissions.${module}`] = value;
//     }
//     const updated = await Role.findByIdAndUpdate(req.params.id, { $set: updates }, { new: true, runValidators: true });

//     res.json({
//       status: 1,
//       message: "Role updated successfully",
//       data: updated
//     });

//   } catch (err) {
//     res.status(500).json({
//       status: 0,
//       message: err.message
//     });
//   }
// };
// exports.deleteRole = async (req, res) => {
//   try {
//     const existing = await Role.findById(req.params.id);
//     if (!existing || !existing.internalOnly) return res.status(403).json({status:0,message:"System role cannot be deleted"});
//     if (await User.exists({roleId:req.params.id})) return res.status(409).json({status:0,message:"Reassign sub-admins before deleting role"});
//     await Role.findByIdAndDelete(req.params.id);

//     res.json({
//       status: 1,
//       message: "Role deleted successfully"
//     });

//   } catch (err) {
//     res.status(500).json({
//       status: 0,
//       message: err.message
//     });
//   }
// };




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
  "settings", "users", "vendors", "plans", "masterData", "hsRules", "countryRules", "dgftSchemes", "aiAssistant", "roles", "subAdmins", "notices", "notifications"
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
    const adminOnly = new Set(["documents", "tracking", "booking", "settings"]);

    allModules.forEach((module) => {
      finalPermissions[module] = adminOnly.has(module) ? {view:false,add:false,edit:false,delete:false} : (permissions?.[module] || {
        view: false,
        add: false,
        edit: false,
        delete: false
      });
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

    // PATCH semantics: omitted modules/actions retain their saved values.
    // Never turn an omitted permission into false during a partial update.
    const finalPermissions = {};
    const actions = ['view', 'add', 'edit', 'delete'];
    const adminOnly = new Set(['documents', 'tracking', 'booking', 'settings']);
    if (permissions !== undefined) {
      if (!permissions || typeof permissions !== 'object' || Array.isArray(permissions)) {
        return res.status(400).json({ status: 0, message: 'Invalid permissions object' });
      }
      for (const [module, changes] of Object.entries(permissions)) {
        if (!allModules.includes(module) || !changes || typeof changes !== 'object' || Array.isArray(changes)) {
          return res.status(400).json({ status: 0, message: `Invalid permission module: ${module}` });
        }
        // Legacy clients may still send hidden admin-only modules. Ignore those
        // values and revoke any previously stored sub-admin grants below.
        if (adminOnly.has(module)) continue;
        const existing = current.permissions?.[module];
        const merged = { ...(existing?.toObject?.() || existing || {}) };
        for (const action of actions) merged[action] = existing?.[action] === true;
        for (const [action, value] of Object.entries(changes)) {
          if (!(actions.includes(action) || (module === 'users' && action === 'changePlan') || (module === 'vendors' && ['kycApprove', 'changePlan'].includes(action)) || (module === 'shipment' && ['approve', 'reject'].includes(action))) || typeof value !== 'boolean') {
            return res.status(400).json({ status: 0, message: `Invalid permission: ${module}.${action}` });
          }
          merged[action] = value;
        }
        finalPermissions[module] = merged;
      }
    }
    const updates = {};
    if (name !== undefined) updates.name = name;
    if (description !== undefined) updates.description = description;
    if (status !== undefined) updates.status = status;
    for (const [module, value] of Object.entries(finalPermissions)) {
      updates[`permissions.${module}`] = value;
    }
    // Revoke legacy role grants to modules that are now main-admin-only.
    for (const module of adminOnly) {
      updates[`permissions.${module}`] = { view: false, add: false, edit: false, delete: false };
    }
    const updated = await Role.findByIdAndUpdate(req.params.id, { $set: updates }, { new: true, runValidators: true });

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