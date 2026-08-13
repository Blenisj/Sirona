export const FILTERS = ["ALL", "PENDING", "IN_PROGRESS", "COMPLETED"];

export const labels = {
  PENDING: "Pending",
  IN_PROGRESS: "In progress",
  COMPLETED: "Completed",
};

export const modalities = {
  CT: "CT",
  MRI: "MRI",
  XR: "X-ray",
  US: "Ultrasound",
};

export function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}
