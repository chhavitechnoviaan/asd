const options = { timeZone: "Asia/Kolkata" };
function format(value, fields) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : new Intl.DateTimeFormat("en-IN", {...options, ...fields}).format(date);
}
export const createdDate = value => format(value, {day:"2-digit",month:"short",year:"numeric"});
export const createdTime = value => { const time = format(value,{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:true}); return time === "—" ? time : `${time} IST`; };
