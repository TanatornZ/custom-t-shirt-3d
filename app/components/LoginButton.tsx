import React from "react";
import { auth, provider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";
type Props = {};

function LoginButton({}: Props) {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      // send data to backend
      const user = result.user;
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <div
      className="py-2 px-6 w-fit bg-blue-500 cursor-pointer hover:bg-blue-600 rounded-lg"
      onClick={() => signInWithGoogle()}
    >
      Login
    </div>
  );
}

export default LoginButton;
