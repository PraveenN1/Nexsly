import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    code: "",
  });
  const [showPasscode, setShowPasscode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [codeSent, setCodeSent] = useState(false); // NEW: track if code is sent
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/verify-code",
        formData,
        { withCredentials: true }
      );
      console.log(response);
      console.log("Signup successful", response.data);
      navigate("/");
    } catch (err) {
      console.error("Signup failed!", err);
      setError(err.response?.data?.message || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGetCode = async () => {
    setLoading(true);
    setError(null);

    try {
      // You can trigger your email-sending API here
      await axios.post(
        "http://localhost:3000/auth/send-code",
        { email: formData.email },
        { withCredentials: true }
      );
      setCodeSent(true);
    } catch (err) {
      console.error("Failed to send code", err);
      setError(err.response?.data?.message || "Failed to send code. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnonymous = async () => {
    try {
      const response = await axios.post("http://localhost:3000/auth/guest-login",{},{withCredentials:true});
      console.log("Guest login successful:", response.data.user);
      navigate("/"); // Navigate after successful login
    } catch (err) {
      console.error("Failed to Login", err);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white md:flex shadow-2xl rounded-xl overflow-hidden">
        {/* Left Panel */}
        <div className="bg-[#0F4C75] text-white flex flex-col justify-center items-center min-w-80 px-6 py-8">
          <h1 className="text-3xl font-bold mb-4">Nexsly</h1>
          <p className="text-sm text-center max-w-xs">
            A next-gen community platform where users post questions, share
            insights, and spark conversations in a fast, threaded, and
            tag-driven environment.
          </p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="bg-[#1B262C] p-10 w-full">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Sign Up
          </h2>

          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}
          
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <button
            type="button"
            onClick={handleGetCode}
            disabled={loading || !formData.email}
            className="bg-[#0F4C75] w-full p-2.5 rounded-md text-white mb-6"
          >
            {loading ? "Sending code..." : "Get code"}
          </button>

          {/* Render OTP Input only after Get Code */}
          {codeSent && (
            <div className="mt-5 mb-3">
              <OTP
                label="Passcode"
                value={formData.code}
                onChange={handleChange}
                showPasscode={showPasscode}
              />

              <button
                type="button"
                onClick={() => setShowPasscode((prev) => !prev)}
                className="text-xs text-blue-500 mt-3"
              >
                {showPasscode ? "Hide" : "Show"} code
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#0F4C75] text-white py-2 rounded-lg hover:bg-[#1B262C] transition duration-300 ${
              loading && "opacity-50 cursor-not-allowed"
            }`}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          <div className="flex items-center my-6">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-2 text-gray-400 text-sm">or</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          {/* Anonymous Start */}
          <button
            type="button"
            onClick={handleAnonymous}
            className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition duration-300"
          >
            Let's Go Anonymously 🚀
          </button>
        </form>
      </div>
    </div>
  );
};

// Input component
const Input = ({ label, name, type, value, onChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block mb-1 text-sm font-medium">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={`Enter ${label.toLowerCase()}`}
        className="w-full p-2.5 text-sm border rounded-lg focus:ring-blue-500 focus:border-blue-500"
        required
      />
    </div>
  );
};

// OTP Component
const OTP = ({ label, value, onChange, showPasscode }) => {
  const handleChange = (e, index) => {
    const val = e.target.value;
    if (!/^[0-9]?$/.test(val)) return; // Only allow single digit

    const otpArray = value.split("");
    otpArray[index] = val;
    onChange({ target: { name: "code", value: otpArray.join("") } });

    if (val && e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && e.target.previousSibling) {
      e.target.previousSibling.focus();
    }
  };

  return (
    <div>
      <label className="block mb-1 text-sm font-medium">{label}</label>
      <div className="flex justify-between gap-2">
        {[...Array(6)].map((_, index) => (
          <input
            key={index}
            type={showPasscode ? "text" : "password"}
            maxLength="1"
            value={value[index] || ""}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-12 h-12 text-center text-lg border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        ))}
      </div>
    </div>
  );
};
