import React, { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ROUTES } from "../../../config";
import { useGetTokenByEmailMutation } from "../../../store/features/auth/authApi";
import { loginSuccess } from "../../../store/slices/authSlice";

const RegistrationSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [tokenResponse, setTokenResponse] = useState(null);
  const [tokenError, setTokenError] = useState("");
  const [getTokenByEmail, { isLoading }] = useGetTokenByEmailMutation();

  const email = searchParams.get("email") || "";
  const userName = searchParams.get("userName") || "";
  const planName = searchParams.get("planName") || "";
  const planPrice = searchParams.get("planPrice") || "";

  const referenceId =
    searchParams.get("transactionId") ||
    searchParams.get("trxId") ||
    searchParams.get("ref") ||
    searchParams.get("reference") ||
    "N/A";

  useEffect(() => {
    if (!email) {
      setTokenError("Email query is missing. Unable to fetch token.");
      return;
    }

    let isCancelled = false;

    const fetchToken = async () => {
      try {
        const response = await getTokenByEmail({ email }).unwrap();
        if (isCancelled) return;

        setTokenResponse(response);

        const payload = response?.data || {};
        const responseUser = payload?.user || null;
        const tokens = payload?.tokens || payload || {};
        const accessToken = tokens?.accessToken || tokens?.token || null;
        const refreshToken = tokens?.refreshToken || null;
        const tokenType = tokens?.tokenType || "Bearer";
        const expiresIn = tokens?.expiresIn || null;

        if (responseUser && accessToken) {
          dispatch(
            loginSuccess({
              user: responseUser,
              token: accessToken,
              accessToken,
              refreshToken,
              tokenType,
              expiresIn,
            }),
          );

          navigate(ROUTES.VENDOR_DASHBOARD, { replace: true });
          return;
        }

        setTokenError("Token পাওয়া যায়নি, তাই auto dashboard redirect করা যায়নি।");
      } catch (error) {
        if (isCancelled) return;
        setTokenError(
          error?.data?.message ||
            error?.message ||
            "Failed to fetch token by email.",
        );
      }
    };

    fetchToken();

    return () => {
      isCancelled = true;
    };
  }, [dispatch, email, getTokenByEmail, navigate]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f3ec] px-4 py-10 font-raleway text-[#0c0c0c] sm:px-6 lg:px-8">
      <section
        data-gsap-reveal
        className="w-full max-w-2xl rounded-2xl border border-[#e3d9cb] bg-white p-8 text-center shadow-sm sm:p-10"
      >
        <div className="mx-auto flex h-18 w-18 items-center justify-center rounded-full bg-[#e6efe3] text-[#50614e]">
          <CheckCircle2 size={44} />
        </div>

        <h1 className="mt-6 font-playfair text-3xl text-[#171411] sm:text-4xl">
          Registration Successful
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#5e564b] sm:text-base">
          Your vendor registration and subscription setup were completed
          successfully.
        </p>

        <div className="mx-auto mt-6 grid max-w-lg gap-3 rounded-lg bg-[#f5f1ea] px-4 py-3 text-left text-sm text-[#332d26]">
          <p>
            <span className="font-semibold">Email:</span> {email || "N/A"}
          </p>
          <p>
            <span className="font-semibold">User:</span> {userName || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Plan:</span> {planName || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Plan Price:</span>{" "}
            {planPrice || "N/A"}
          </p>
        </div>

        <div className="mx-auto mt-6 max-w-lg rounded-lg bg-[#f5f1ea] px-4 py-3 text-left">
          <p className="text-xs uppercase tracking-wider text-[#7d7468]">
            Reference
          </p>
          <p className="mt-1 break-all text-sm font-medium text-[#332d26]">
            {referenceId}
          </p>
        </div>

        {/* <div className='mx-auto mt-6 max-w-lg rounded-lg bg-[#f5f1ea] px-4 py-3 text-left'>
          <p className='text-xs uppercase tracking-wider text-[#7d7468]'>Token Request Status</p>
          <p className='mt-1 text-sm font-medium text-[#332d26]'>
            {isLoading ? 'Fetching token...' : tokenError ? tokenError : 'Token fetched successfully.'}
          </p>
        </div> */}

        {/* {tokenResponse ? (
          <div className='mx-auto mt-6 max-w-lg rounded-lg bg-[#f5f1ea] px-4 py-3 text-left'>
            <p className='text-xs uppercase tracking-wider text-[#7d7468]'>/auth/get-token Response</p>
            <pre className='mt-2 max-h-64 overflow-auto whitespace-pre-wrap break-all text-xs text-[#332d26]'>
              {JSON.stringify(tokenResponse, null, 2)}
            </pre>
          </div>
        ) : null} */}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => navigate(ROUTES.VENDOR_DASHBOARD, { replace: true })}
            className="inline-flex items-center justify-center rounded-lg bg-[#50614e] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#445341]"
          >
            Go to Dashboard
          </button>

          <button
            type="button"
            onClick={() => navigate(ROUTES.VENDOR_PRICING)}
            className="inline-flex items-center justify-center rounded-lg border border-[#d8ccba] bg-white px-6 py-3 text-sm font-medium text-[#3f3a33] transition hover:bg-[#f8f3ea]"
          >
            Back to Pricing
          </button>
        </div>
      </section>
    </main>
  );
};

export default RegistrationSuccess;
