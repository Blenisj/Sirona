import React from "react";
import { createRoot } from "react-dom/client";
import { CirclePlus, RefreshCw } from "lucide-react";
import patientData from "./data/patientData.json";
import "./styles.css";
import DetailDrawer from "./components/DetailDrawer";
import WorklistTable from "./components/WorklistTable";

const FILTERS = ["ALL", "PENDING", "IN_PROGRESS", "COMPLETED"];
const labels = {PENDING: "Pending", IN_PROGRESS: "In progress",COMPLETED: "Completed"};
const modalities = { CT: "CT", MRI: "MRI", XR: "X-ray", US: "Ultrasound" };

const formatDate = (date) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));

function App() {
  const [cases, setCases] = React.useState(patientData);
  const [filter, setFilter] = React.useState("ALL");
  const [selectedId, setSelectedId] = React.useState(null);
  const visible =
    filter === "ALL" ? cases : cases.filter((item) => item.status === filter);
  const selected = cases.find((item) => item.id === selectedId);
  const count = (status) =>
    status === "ALL"
      ? cases.length
      : cases.filter((item) => item.status === status).length;
  const submit = (id, report) => {
    setCases((current) =>
      current.map((item) =>
        item.id === id ? { ...item, report, status: "COMPLETED" } : item,
      ),
    );
  };
  return (
    <div className="app">
      <main>
        <section className="heading">
          <div className="summary-metric">
            <h1>Worklist</h1>
          </div>
        </section>
        <section className="summary">
          <div className="summary-metric">
            <small>Total studies</small>
            <strong>{cases.length}</strong>
          </div>
          <div className="summary-metric">
            <small>Needs attention</small>
            <strong className="amber">
              {count("PENDING") + count("IN_PROGRESS")}
            </strong>
          </div>
          <div className="summary-metric">
            <small>Completed</small>
            <strong>{count("COMPLETED")}</strong>
          </div>
          <div className="summary-actions">
            <button className="secondary">
              <RefreshCw size={14} />
              Refresh
            </button>
            <button className="primary">
              <CirclePlus size={15} />
              New assignment
            </button>
          </div>
        </section>
        <section className="worklist">
          <nav className="filters" role="tablist">
            {FILTERS.map((value) => (
              <button
                key={value}
                className={filter === value ? "active" : ""}
                onClick={() => {
                  setFilter(value);
                  setSelectedId(null);
                }}
                role="tab"
                aria-selected={filter === value}
              >
                {value === "ALL" ? "All cases" : labels[value]}{" "}
                <span>{count(value)}</span>
              </button>
            ))}
          </nav>
          <WorklistTable
            visible={visible}
            labels={labels}
            modalities={modalities}
            formatDate={formatDate}
            onSelect={setSelectedId}
          />
        </section>
      </main>
      {selected && (
        <DetailDrawer
          item={selected}
          close={() => setSelectedId(null)}
          submit={submit}
          labels={labels}
          modalities={modalities}
          formatDate={formatDate}
        />
      )}
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
