import React from "react";
import { FileText, X } from "lucide-react";
import StatusBadge from "./StatusBadge";

function DetailDrawer({ item, close, submit, labels, modalities, formatDate }) {
  const [report, setReport] = React.useState(item.report || "");
  const [submitted, setSubmitted] = React.useState(false);
  const editable = item.status !== "COMPLETED";

  const handleSubmit = (event) => {
    event.preventDefault();
    if (report.trim()) {
    submit(item.id, report.trim());
      setSubmitted(true);
    }
  };


  if (submitted) {
    return (
      <>
        <div className="modal-backdrop" />
        <div
          className="modal-surface confirmation-modal"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="submission-success-title"
        >
          <div className="icon-circle confirmation-icon">✓</div>
          <p className="eyebrow">Report submitted</p>
          <h2 id="submission-success-title">Submission successful</h2>
          <p className="confirmation-message muted">
            The report for {item.patientName} has been saved and the case is now
            marked completed.
          </p>
          <button className="primary" type="button" onClick={close}>
            Done
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <button
        className="modal-backdrop"
        onClick={close}
        aria-label="Close details"
      />
      <div
        className="modal-surface modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-detail-title"
      >
        <header>
          <div>
            <p className="eyebrow">Case {item.id}</p>
            <h2 id="case-detail-title">{item.patientName}</h2>
          </div>
          <button className="icon-circle close" onClick={close} aria-label="Close details">
            <X size={18} />
          </button>
        </header>
        <div className="drawer-body">
          <StatusBadge status={item.status} labels={labels} />
          <div className="detail-grid">
            <div>
              <span>Patient name</span>
              <strong>{item.patientName}</strong>
            </div>
            <div>
              <span>Patient ID</span>
              <strong>{item.id}</strong>
            </div>
            <div>
              <span>Modality</span>
              <strong>{modalities[item.modality]}</strong>
            </div>
            <div>
              <span>Study date</span>
              <strong>{formatDate(item.studyDate)}</strong>
            </div>
            <div>
              <span>Status</span>
              <strong>{labels[item.status]}</strong>
            </div>
            <div>
              <span>Case reference</span>
              <strong>SRN-{item.id.padStart(5, "0")}</strong>
            </div>
          </div>
          <hr />
          {editable ? (
            <form onSubmit={handleSubmit}>
              <label htmlFor="report">
                Radiology report <small className="muted">Required</small>
              </label>
              <textarea
                id="report"
                value={report}
                onChange={(event) => setReport(event.target.value)}
                placeholder="Report findings here..."
              />
              <div className="form-footer">
                <button
                  className="primary"
                  type="submit"
                  disabled={!report.trim()}
                >
                  <FileText size={15} />
                  Submit report
                </button>
              </div>
            </form>
          ) : (
            <section className="final-report">
              <h3>Final report</h3>
              <p>{item.report}</p>
            </section>
          )}
        </div>
      </div>
    </>
  );
}

export default DetailDrawer;