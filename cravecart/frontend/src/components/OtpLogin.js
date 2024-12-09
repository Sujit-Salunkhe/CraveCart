"use client";
import { auth } from "@/firebase.config";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
import { useState, useEffect, useTransition, startTransition } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { LoaderCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
const OtpLogin = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [resetCountDown, setResetCountDown] = useState(0);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);
  const [isPending, setIsPending] = useTransition();
  const [confirmationResult, setConfirmationResult] = useState("");
  useEffect(() => {
    let timer;
    if (resetCountDown > 0) {
      timer = setTimeout(() => setResetCountDown(resetCountDown - 1), 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [resetCountDown]);

  useEffect(() => {
    const recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
      }
    );
    setRecaptchaVerifier(recaptchaVerifier);
    return () => {
      recaptchaVerifier.clear();
    };
  }, [auth]);

  const requestOtp = async (e) => {
    e.preventDefault();
    setResetCountDown(60);
    startTransition(async () => {
      setError("");
      if (!recaptchaVerifier) {
        return setError("Recaptcha is not initialized.");
      }
      try {
        const confirmationResult = await signInWithPhoneNumber(
          auth,
          phoneNumber,
          recaptchaVerifier
        );
        setConfirmationResult(confirmationResult);
        setSuccess("OTP sent successfully");
      } catch (err) {
        setResetCountDown(0);
        console.log(err);
        if (err.code === "auth/invalid-phone-number") {
          setError("Invalid phone number. Please check the number");
        } else if (err.code === "auth/too-many-requests") {
          setError("Too Many requests.Please Try Again");
        } else {
          setError("Failed to Send OTP.Please Try Again.");
        }
      }
    });
  };
  return (
    <div>
      {!ConfirmationResult && (
        <form onSubmit={requestOtp}>
          <Input
            className="text-black"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <p className="text-xs text-gray-200 mt-2">
            Please Enter Your Number With Country Code(i.e. 91 for india)
          </p>
        </form>
      )}
      <Button
        disabled={!phoneNumber || isPending || resetCountDown > 0}
        className="mt-5"
        onClick={(e) => requestOtp(e)}
      >
        {resetCountDown > 0
          ? `Resend OTP in ${resetCountDown}`
          : isPending
          ? "Sending OTP"
          : "Send OTP"}
      </Button>
      <div className="p-10 text-center">
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
      </div>

      <div id="recaptcha-container" />
      {/* {isPending && LoaderCircle} */}
    </div>
  );
};

export default OtpLogin;
