import { useState } from "react";
import "../styles/ContactForm.css";

const SUBMIT_URL = "https://whitebricks.com/tsacademy.php";

const initialState = {
  fullName: "",
  email: "",
  city: "",
  phone: "",
  message: "",
  contact: "phone",
  source: [],
};

export default function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [status, setStatus] = useState({ type: "", message: "" });

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required.";
    if (!form.email.trim()) {
      e.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      e.email = "Enter a valid email address.";
    }
    if (!form.phone.trim()) {
      e.phone = "Phone number is required.";
    } else if (!/^\+?\d{7,15}$/.test(form.phone.replace(/[\s\-()]/g, ""))) {
      e.phone = "Enter a valid phone number.";
    }
    if (!form.message.trim()) {
      e.message = "Message is required.";
    } else if (form.message.length > 100) {
      e.message = "Message must be under 100 characters.";
    }
    return e;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        source: checked
          ? [...prev.source, value]
          : prev.source.filter((s) => s !== value),
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }

    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch(SUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error(`Form submission failed: ${response.status}`);
      }

      setForm(initialState);
      setSubmitSuccess(true);
      setStatus({
        type: "success",
        message: "Your message has been submitted successfully.",
      });

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        message:
          "Something went wrong. Please check your details and try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted && submitSuccess) {
    return (
      <section className="form-section">
        <div className="container">
          <div className="success-card">
            <div className="success-icon">✓</div>
            <h3>Message Sent!</h3>
            <p>Thanks for reaching out. We'll get back to you soon.</p>
            <button
              className="btn-primary"
              onClick={() => {
                setSubmitted(false);
                setSubmitSuccess(false);
                setForm(initialState);
                setStatus({ type: "", message: "" });
              }}
            >
              Send Another
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="form-section">
      <div className="container">
        <div className="form-header">
          <h2 className="section-title" style={{ textAlign: "left" }}>
            Have Questions About Planetary Science?
          </h2>
          <p
            className="section-subtitle"
            style={{ textAlign: "left", margin: "8px 0 36px" }}
          >
            Interested in learning more about space, astronomy, or how planetary
            data is collected and analyzed? Reach out and we'll get back to you.
          </p>
        </div>

        {status.message && (
          <div
            className={`status-banner status-${status.type}`}
            role="alert"
            aria-live="polite"
          >
            {status.message}
          </div>
        )}

        <div className="form-grid">
          {/* Row 1 */}
          <div className="form-group">
            <label htmlFor="fullName">
              Full Name <span className="required">*</span>
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Full name"
              value={form.fullName}
              onChange={handleChange}
              className={errors.fullName ? "error" : ""}
              aria-describedby="err-fullName"
            />
            {errors.fullName && (
              <span id="err-fullName" className="error-msg" role="alert">
                {errors.fullName}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">
              Email <span className="required">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="example@example.com"
              value={form.email}
              onChange={handleChange}
              className={errors.email ? "error" : ""}
              aria-describedby="err-email"
            />
            {errors.email && (
              <span id="err-email" className="error-msg" role="alert">
                {errors.email}
              </span>
            )}
          </div>

          {/* Row 2 */}
          <div className="form-group">
            <label htmlFor="city">City</label>
            <select
              id="city"
              name="city"
              value={form.city}
              onChange={handleChange}
            >
              <option value="">Choose city</option>
              <option>Lagos</option>
              <option>Abuja</option>
              <option>Port Harcourt</option>
              <option>Kano</option>
              <option>Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="phone">
              Phone Number <span className="required">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+234 800 000 0000"
              value={form.phone}
              onChange={handleChange}
              className={errors.phone ? "error" : ""}
              aria-describedby="err-phone"
            />
            {errors.phone && (
              <span id="err-phone" className="error-msg" role="alert">
                {errors.phone}
              </span>
            )}
          </div>

          {/* Row 3 */}
          <div className="form-group full-width">
            <label htmlFor="message">
              Message <span className="required">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Enter your message"
              rows={5}
              maxLength={100}
              value={form.message}
              onChange={handleChange}
              className={errors.message ? "error" : ""}
              aria-describedby="err-message"
            />
            <div className="char-row">
              {errors.message && (
                <span id="err-message" className="error-msg" role="alert">
                  {errors.message}
                </span>
              )}
              <span className="char-count">
                {form.message.length}/100 characters
              </span>
            </div>
          </div>

          {/* Row 4: Contact preference + Source */}
          <div className="form-group">
            <label>How should we contact you?</label>
            <div className="radio-group">
              {["phone", "email", "both"].map((opt) => (
                <label key={opt} className="radio-label">
                  <input
                    type="radio"
                    name="contact"
                    value={opt}
                    checked={form.contact === opt}
                    onChange={handleChange}
                  />
                  {opt.charAt(0).toUpperCase() + opt.slice(1)}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>How did you hear about us?</label>
            <div className="checkbox-group">
              {["A friend", "TS Academy", "Others"].map((src) => (
                <label key={src} className="check-label">
                  <input
                    type="checkbox"
                    name="source"
                    value={src}
                    checked={form.source.includes(src)}
                    onChange={handleChange}
                  />
                  {src}
                </label>
              ))}
            </div>
          </div>
        </div>

        <button
          className="btn-primary submit-btn"
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? "Sending..." : "Submit →"}
        </button>
      </div>
    </section>
  );
}
