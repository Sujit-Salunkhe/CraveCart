"use client";
import { auth } from "@/firebase.config";
import {
  confirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useEffect, useState, useTransition } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";
import { button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import { CgSpinner } from "react-icons/cg";
import "react-phone-input-2/lib/style.css";
import { format } from "path";



const InputOtp = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [resendCountDown, setResendCountDown] = useState(0);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState();
  const [conformationResult, setConformationResult] = useState();
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    let timer
    if (resendCountDown > 0) {
       timer = setTimeout(() => setResendCountDown(resendCountDown - 1), 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [resendCountDown]);
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
  
  const verifyOtp = async() => {
    startTransition(async() => {
        setError('');
        if(!conformationResult){
            setError("please request OTP first")
        }

        try {
            await confirmationResult.confirm(otp);
            router.replace("/")
        } catch (error) {
         console.log(error)
         setError("Failed to verify OTP.Please check the OTP")   
        }
    })
  }
  useEffect(() => {
    const hasEnteredAllDigits = otp.length === 6;
    if (hasEnteredAllDigits) {
      verifyOtp();
    }
  }, [otp]);
  const requestOtp = async (e) => {
    e?.preventDefault();
    setResendCountDown(60);
    startTransition(async () => {
      setError("");
      if (!recaptchaVerifier) {
        return setError("RecaptchaVerifier is not initialized");
      }
    });
    const formatPath = '+' + phoneNumber;
    console.log(formatPath)
    try {
        
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        formatPath,
        recaptchaVerifier
      );
      setConformationResult(confirmationResult);
      setSuccess("OTP Sent successfully");
    } catch (error) {
      console.log(error);
      setResendCountDown(0);
      if (error.code === "auth/invalid-phone-number") {
        setError("Invalid Phone Number.Please check the number");
      } else if (error.code === "auth/too-many-requests") {
        setError("Too Many Requests.Please try again later");
      } else {
        setError("Failed to Send OTP.Please try again");
      }
    }
  };
 
  return (
    <div>
      {!conformationResult && (
        <form onSubmit={requestOtp}>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Phone Number
          </label>

          <PhoneInput
            country={"in"}
            value={phoneNumber}
            onChange={setPhoneNumber}
            className="text-customColor w-full"
          />
          <p
            id="helper-text-explanation"
            className="mt-2 mb-4 text-sm text-gray-500 dark:text-gray-400"
          >
            We will send you an SMS with a verification code.
          </p>
        </form>
      )}
      {conformationResult && (
        <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      )}
      <button
        className="bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        disabled={!phoneNumber || isPending || resendCountDown > 0}
        onClick={() => requestOtp()}
      >
        {resendCountDown > 0
          ? `Resend OTP in ${resendCountDown}`
          : isPending
          ? "Sending OTP"
          : "SendOTP"}
      </button>
      <div className="p-10 text-center">
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-red-500">{success}</p>}
      </div>

      <div id="recaptcha-container" />
      {isPending && <CgSpinner />}
    </div>
  );
};

export default InputOtp;
