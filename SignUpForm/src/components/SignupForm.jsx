import React, { useState } from "react";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // clear error when typing
  };

  // Validate the form
  const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required.";
    if (!formData.email.includes("@")) tempErrors.email = "Invalid email.";
    if (!formData.password) tempErrors.password = "Password is required.";
    else if (formData.password.length < 6)
      tempErrors.password = "Password must be at least 6 characters.";
    return tempErrors;
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccessMessage("");
    } else {
      setSubmitting(true);
      setSuccessMessage("");
      setTimeout(() => {
        setSubmitting(false);
        setSuccessMessage("Signup successful!");
        setFormData({ name: "", email: "", password: "" }); // clear inputs
      }, 2000);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Signup Form</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.field}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.name && <p style={styles.error}>{errors.name}</p>}
        </div>

        <div style={styles.field}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.email && <p style={styles.error}>{errors.email}</p>}
        </div>

        <div style={styles.field}>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.password && <p style={styles.error}>{errors.password}</p>}
        </div>

        <button type="submit" disabled={submitting} style={styles.button}>
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </form>

      {successMessage && <p style={styles.success}>{successMessage}</p>}
    </div>
  );
};

// 💅 Simple inline styling
const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "25px",
    borderRadius: "10px",
    backgroundColor: "#fff",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    fontFamily: "Poppins, sans-serif",
  },
  heading: {
    textAlign: "center",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "14px",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },
  error: {
    color: "red",
    fontSize: "13px",
    marginTop: "5px",
  },
  success: {
    textAlign: "center",
    color: "green",
    fontWeight: "bold",
    marginTop: "15px",
  },
};

export default SignupForm;
