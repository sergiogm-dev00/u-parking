'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import MapView from './MapView';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showForgotPopup, setShowForgotPopup] = useState(false);
  const [university, setUniversity] = useState("University of South Florida");
  const universityOptions = [
    "University of South Florida",
    "University of Miami",
    "University of Central Florida",
    "Florida State University",
    "Florida International University",
    "Florida Atlantic University",
    "University of Florida"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "sergio" && password === "password") {
      setLoggedIn(true);
    } else {
      setShowError(true);
    }
  };

  const universityCoords: Record<string, [number, number]> = {
    "University of South Florida": [28.0629, -82.4120],
    "University of Miami": [25.7174, -80.2781],
    "University of Central Florida": [28.6016, -81.2005],
    "Florida State University": [30.4419, -84.2986],
    "Florida International University": [25.7541, -80.3739],
    "Florida Atlantic University": [26.3700, -80.1026],
    "University of Florida": [29.6475, -82.3450],
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [loggedIn]);

  if (loggedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center font-sans" style={{ background: 'linear-gradient(135deg, #0f766e 0%, #2563eb 100%)' }}>
        {/* Header */}
        <div className="w-full max-w-md flex items-center justify-between bg-white py-4 px-4 rounded-b-2xl shadow-md sticky top-0 z-10">
          <div className="w-16" />
          <h2 className="text-black text-xl font-semibold text-center flex-1">Map</h2>
          <button
            onClick={() => setLoggedIn(false)}
            className="text-blue-600 font-semibold hover:underline w-16 text-right"
          >
            Logout
          </button>
        </div>
        {/* University Dropdown */}
        <div className="w-full max-w-md flex justify-center mt-4 px-6 sm:px-12 relative">
          <select
            value={university}
            onChange={e => setUniversity(e.target.value)}
            className="w-full px-3 py-3 rounded-lg bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/40 text-base appearance-none"
          >
            {universityOptions.map(option => (
              <option key={option} value={option} className="text-black">{option}</option>
            ))}
          </select>
        </div>
        {/* Map Frame */}
        <div className="flex-1 w-full max-w-md flex justify-center items-center px-2 pt-0 pb-3">
          <div className="w-full h-[62vh] rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <MapView center={universityCoords[university]} university={university} showAllPins={true} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between items-center font-sans px-2 sm:px-0 relative" style={{ background: 'linear-gradient(135deg, #0f766e 0%, #2563eb 100%)' }}>
      {showError && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center max-w-xs w-full">
            <span className="text-red-600 text-lg font-semibold mb-4 text-center">Oops! Incorrect username or password.</span>
            <button
              onClick={() => { setShowError(false); setUsername(""); setPassword(""); }}
              className="mt-2 bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {showForgotPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center max-w-xs w-full">
            <span className="text-red-600 text-lg font-semibold mb-4 text-center">Oops... You can't get in then!</span>
            <button
              onClick={() => setShowForgotPopup(false)}
              className="mt-2 bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center w-full pt-12 sm:pt-16">
        <div className="flex flex-col items-center mb-6 sm:mb-8">
          <Image src="/logo.png" alt="uParking logo" width={200} height={65} className="mb-6" priority />
          <h1 className="text-white text-xl sm:text-2xl font-semibold mb-2">Find parking at your school!</h1>
        </div>
        <form onSubmit={handleSubmit} className="bg-white/10 rounded-2xl px-4 py-6 sm:px-8 sm:py-8 flex flex-col gap-4 w-full max-w-md shadow-lg">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full px-3 py-3 rounded-lg bg-white/20 text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-white/40 text-base"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-3 py-3 rounded-lg bg-white/20 text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-white/40 text-base"
          />
          <div className="relative flex flex-col">
            <span className="text-white text-sm mb-1 ml-1">Select your school</span>
            <select
              value={university}
              onChange={e => setUniversity(e.target.value)}
              className="w-full px-3 py-3 rounded-lg bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/40 text-base appearance-none"
            >
              {universityOptions.map(option => (
                <option key={option} value={option} className="text-black">{option}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition-colors text-lg mt-2"
          >
            Log in
          </button>
          <a href="#" onClick={e => { e.preventDefault(); setShowForgotPopup(true); }} className="text-white/80 text-center text-sm mt-2 hover:underline">
            Forgot your passcode?
          </a>
        </form>
      </div>
    </div>
  );
}
