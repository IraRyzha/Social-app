"use client";
import React, { useState } from "react";
import Link from "next/link";
import LoginForm from "./login-form";
import RegistrationForm from "./registration-form";

export default function AuthForm() {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div className="w-[90%] md:w-full max-w-md mx-auto bg-white px-8 py-5 border border-gray-300 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        {isRegistering ? "Register" : "Login"}
      </h2>

      {isRegistering ? <RegistrationForm /> : <LoginForm />}

      <p className="mt-4 text-center text-gray-600">
        {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          type="button"
          onClick={() => setIsRegistering(!isRegistering)}
          className="text-main-blue-light hover:underline"
        >
          {isRegistering ? "Login here" : "Register here"}
        </button>
      </p>

      <div className="mt-6 text-center">
        <Link href="/" passHref>
          <button className="text-gray-500 hover:text-gray-700 underline">
            Return to Main
          </button>
        </Link>
      </div>
    </div>
  );
}
