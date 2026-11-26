"use strict";
// Handle Mongoose documents, nested schemas, Maps and lean objects without granting missing permissions.
function readField(object, key) {
  if (!object) return undefined;
  if (object instanceof Map) return object.get(key);
  if (typeof object.get === "function") {
    const value = object.get(key);
    if (value !== undefined) return value;
  }
  return object[key];
}
function permissionEntry(user, module) {
  const role = readField(user, "roleId");
  return readField(readField(role, "permissions"), module);
}
function hasPermission(user, module, action) {
  return readField(permissionEntry(user, module), action) === true;
}
module.exports = { readField, permissionEntry, hasPermission };
