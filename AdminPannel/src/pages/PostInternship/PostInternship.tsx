import React, { useState, useEffect } from "react";
import "./PostInternship.css";
import Swal from "sweetalert2";

/* =========================
   TYPE DEFINITIONS
========================= */
interface InternshipForm {
  advertisementId: string;
  internshipTitle: string;
  internshipDescription: string;
  department: string;
  modules: string;
  project: string;
  tools: string;
  internshipMode: string;
  credits: string;
  location: string;
  duration: string;
  qualification: string;
  skills: string;

  internshipType: string;
  facilities: string;
  careerOpportunity: string;
  startDate: string;
  fee: string;
  lastDate: string;
  mentor: string;
  contact: string;
  organizer: string;
}

const PostInternship: React.FC = () => {
  const [step, setStep] = useState<number>(1);

  const [formData, setFormData] = useState<InternshipForm>({
    advertisementId: "",
    internshipTitle: "",
    internshipDescription: "",
    department: "",
    modules: "",
    project: "",
    tools: "",
    internshipMode: "",
    credits: "",
    location: "",
    duration: "",
    qualification: "",
    skills: "",

    internshipType: "",
    facilities: "",
    careerOpportunity: "",
    startDate: "",
    fee: "",
    lastDate: "",
    mentor: "",
    contact: "",
    organizer: "",
  });

  /* =========================
     AUTO GENERATE ID
  ========================= */
  useEffect(() => {
    const id = "ADV-" + Math.floor(100000 + Math.random() * 900000);
    setFormData((prev) => ({ ...prev, advertisementId: id }));
  }, []);

  /* =========================
     HANDLE INPUT CHANGE
  ========================= */
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const nextStep = () => setStep(2);
  const prevStep = () => setStep(1);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  console.log(formData);

  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Internship Posted Successfully!",
    showConfirmButton: false,
    timer: 1500,
    toast: true,
  });
};

  return (
    <div className="pi-container">
      {/* ================= LEFT SIDE FORM ================= */}
      <div className="pi-form-section">
        <div className="pi-form-header">
          <h2>Post Internship</h2>
          <div className="pi-step-indicator">
            <span className={step === 1 ? "pi-active-step" : ""}>1</span>
            <span className={step === 2 ? "pi-active-step" : ""}>2</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="pi-form-scroll">
          {step === 1 && (
            <>
              <div className="pi-form-group">
                <label>Advertisement ID *</label>
                <input
                  type="text"
                  name="advertisementId"
                  value={formData.advertisementId}
                  readOnly
                />
              </div>

              <div className="pi-two-column">
                <div>
                  <label>Internship Title *</label>
                  <input
                    name="internshipTitle"
                    value={formData.internshipTitle}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Department</label>
                  <input
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="pi-form-group">
                <label>Internship Description *</label>
                <textarea
                  name="internshipDescription"
                  value={formData.internshipDescription}
                  onChange={handleChange}
                />
              </div>

              <div className="pi-two-column">
                <input
                  placeholder="Modules"
                  name="modules"
                  value={formData.modules}
                  onChange={handleChange}
                />
                <input
                  placeholder="Project"
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                />
              </div>

              <div className="pi-two-column">
                <input
                  placeholder="Tools"
                  name="tools"
                  value={formData.tools}
                  onChange={handleChange}
                />
                <input
                  placeholder="Credits"
                  name="credits"
                  value={formData.credits}
                  onChange={handleChange}
                />
              </div>

              <div className="pi-form-group">
                <label>Internship Mode *</label>
                <select
                  name="internshipMode"
                  value={formData.internshipMode}
                  onChange={handleChange}
                >
                  <option value="">Select ▼</option>
                  <option>Full Time</option>
                  <option>Part Time</option>
                  <option>Virtual</option>
                </select>
              </div>

              <div className="pi-two-column">
                <input
                  placeholder="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
                <input
                  placeholder="Duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                />
              </div>

              <div className="pi-two-column">
                <input
                  placeholder="Qualification"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                />
                <input
                  placeholder="Skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                />
              </div>

              <button type="button" className="pi-next-btn" onClick={nextStep}>
                Next →
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div className="pi-form-group">
                <label>Internship Type *</label>
                <select
                  name="internshipType"
                  value={formData.internshipType}
                  onChange={handleChange}
                >
                  <option value="">Select ▼</option>
                  <option>By Paying Fees</option>
                  <option>Free of Cost</option>
                  <option>Stipend</option>
                </select>
              </div>

              <div className="pi-two-column">
                <div className="pi-form-group">
                  <label>Facilities Provided</label>
                  <textarea
                    name="facilities"
                    value={formData.facilities}
                    onChange={handleChange}
                  />
                </div>

                <div className="pi-form-group">
                  <label>Career Opportunity</label>
                  <input
                    name="careerOpportunity"
                    value={formData.careerOpportunity}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="pi-two-column">
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                />
                <input
                  placeholder="Fee"
                  name="fee"
                  value={formData.fee}
                  onChange={handleChange}
                />
              </div>

              <div className="pi-two-column">
                <input
                  type="date"
                  name="lastDate"
                  value={formData.lastDate}
                  onChange={handleChange}
                />
                <input
                  placeholder="Mentor"
                  name="mentor"
                  value={formData.mentor}
                  onChange={handleChange}
                />
              </div>

              <div className="pi-two-column">
                <input
                  placeholder="Contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                />
                <input
                  placeholder="Organizer"
                  name="organizer"
                  value={formData.organizer}
                  onChange={handleChange}
                />
              </div>

              <div className="pi-button-row">
                <button
                  type="button"
                  className="pi-back-btn"
                  onClick={prevStep}
                >
                  ← Back
                </button>
                <button type="submit" className="pi-submit-btn">
                  Apply
                </button>
              </div>
            </>
          )}
        </form>
      </div>

      {/* ================= RIGHT SIDE PREVIEW ================= */}
      <div className="pi-preview-section">
        <div className="pi-preview-card">
          <h3>{formData.internshipTitle || "Internship Title"}</h3>
          <p className="pi-preview-id">{formData.advertisementId}</p>

          <p className="pi-preview-description">
            {formData.internshipDescription ||
              "Internship description preview will appear here."}
          </p>

          <div className="pi-preview-grid">
            {Object.entries(formData).map(([key, value]) =>
              key !== "advertisementId" &&
              key !== "internshipTitle" &&
              key !== "internshipDescription" ? (
                <div key={key}>
                  <strong>{key}:</strong> {value || "-"}
                </div>
              ) : null,
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostInternship;
