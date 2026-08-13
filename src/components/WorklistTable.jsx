import React from "react";
import { ChevronDown, ChevronRight, ChevronUp, ChevronsUpDown } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { formatDate, labels, modalities } from "../utils/worklist";

function getSortValue(item, key) {
  if (key === "modality") return modalities[item[key]];
  if (key === "status") return labels[item[key]];
  return item[key];
}

function SortableHeader({ label, column, sort, onSort }) {
  const isActive = sort.key === column;
  const Icon = !isActive ? ChevronsUpDown : sort.direction === "asc" ? ChevronUp : ChevronDown;

  return (
    <th aria-sort={isActive ? (sort.direction === "asc" ? "ascending" : "descending") : "none"}>
      <button className="sort-button" type="button" onClick={() => onSort(column)}>
        {label}
        <Icon size={14} />
      </button>
    </th>
  );
}

function WorklistTable({ visible, onSelect }) {
  const [sort, setSort] = React.useState({ key: "studyDate", direction: "asc" });

  const sortedCases = [...visible].sort((first, second) => {
    const multiplier = sort.direction === "asc" ? 1 : -1;

    if (sort.key === "studyDate") {
      return (new Date(first.studyDate) - new Date(second.studyDate)) * multiplier;
    }

    const firstValue = getSortValue(first, sort.key);
    const secondValue = getSortValue(second, sort.key);
    const comparison = firstValue.localeCompare(secondValue, undefined, {
      numeric: true,
      sensitivity: "base",
    });

    return comparison * multiplier;
  });

  const handleSort = (key) => {
    setSort((current) => ({
      key,
      direction: current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <SortableHeader label="Patient" column="patientName" sort={sort} onSort={handleSort} />
            <SortableHeader label="Modality" column="modality" sort={sort} onSort={handleSort} />
            <SortableHeader label="Study date" column="studyDate" sort={sort} onSort={handleSort} />
            <SortableHeader label="Status" column="status" sort={sort} onSort={handleSort} />
            <th />
          </tr>
        </thead>
        <tbody>
          {sortedCases.map((item) => (
            <tr key={item.id} onClick={() => onSelect(item.id)}>
              <td>
                <div className="patient">
                  <span>
                    <strong>{item.patientName}</strong>
                    <small>Case {item.id}</small>
                  </span>
                </div>
              </td>
              <td>{modalities[item.modality]}</td>
              <td>{formatDate(item.studyDate)}</td>
              <td>
                <StatusBadge status={item.status} labels={labels} />
              </td>
              <td>
                <ChevronRight size={17} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WorklistTable;