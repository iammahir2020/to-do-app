import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";

const SocialLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const handleGoogleSignin = () => {
    signInWithGoogle();
  };
  let errorMessage;
  let from = location.state?.from?.pathname || "/";
  // if (loading) {
  //   return <button className="btn loading">loading</button>;
  // }
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  if (error) {
    errorMessage = <p className="text-red-500">{error?.message}</p>;
  }
  return (
    <div>
      {loading ? (
        <button className="btn btn-outline btn-primary w-full max-w-md mb-3 loading">
          loading
        </button>
      ) : (
        <button
          onClick={handleGoogleSignin}
          className="btn btn-outline btn-primary w-full max-w-md mb-3"
        >
          Continue With Google
        </button>
      )}

      {errorMessage}
    </div>
  );
};

export default SocialLogin;
