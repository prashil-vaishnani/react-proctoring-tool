export const setEvents = (event: string) => {
  const existingReportsJSON = localStorage.getItem("report");
  const existingReports = existingReportsJSON
    ? JSON.parse(existingReportsJSON)
    : [];
  console.log("fff", existingReports);
  const newEvent = {
    timestamp: new Date().toISOString(),
    event: event,
  };
  const report = [...existingReports, newEvent];
  console.log(report, "sssssss");
  localStorage.setItem("report", JSON.stringify(report));
};

export const getEvents = () => {
  const reports = localStorage.getItem("report");
  return reports;
};
