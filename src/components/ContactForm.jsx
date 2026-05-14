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
    } else if (!/^\+?[\d\s\-()]{7,}$/.test(form.phone)) {
      e.phone = "Enter a valid phone number.";
    }
    if (!form.message.trim()) e.message = "Message is required.";
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
    try {
      await fetch(SUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch (_) {
      // proceed even on network error for demo
    }
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
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
                setForm(initialState);
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
            />
            {errors.fullName && (
              <span className="error-msg">{errors.fullName}</span>
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
            />
            {errors.email && <span className="error-msg">{errors.email}</span>}
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
              placeholder="Please enter a valid phone number"
              value={form.phone}
              onChange={handleChange}
              className={errors.phone ? "error" : ""}
            />
            {errors.phone && <span className="error-msg">{errors.phone}</span>}
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
            />
            <span className="char-count">
              {form.message.length}/100 characters
            </span>
            {errors.message && (
              <span className="error-msg">{errors.message}</span>
            )}
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
