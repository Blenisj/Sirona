import { ChevronRight } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { formatDate, labels, modalities } from "../utils/worklist";

function WorklistTable({ visible, onSelect }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Patient</th>
            <th>Modality</th>
            <th>Study date</th>
            <th>Status</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {visible.map((item) => (
            <tr key={item.id} onClick={() => onSelect(item.id)}>
              <td>
                <div className="patient">
                  <b className="icon-circle">
                    {item.patientName
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </b>
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