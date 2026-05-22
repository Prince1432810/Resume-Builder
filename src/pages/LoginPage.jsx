import { SignInButton, SignUpButton } from "@clerk/clerk-react";

export default function LoginPage() {
    return (
        <div className="h-screen w-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-yellow-50">
            <div className="bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center gap-6 w-full max-w-md">

                {/* Logo / Title */}
                <div className="flex flex-col items-center gap-2">
                    <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                        R
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">ResumePortal</h1>
                    <p className="text-gray-500 text-sm text-center">
                        Build your resume & find your dream job
                    </p>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-gray-100" />

                {/* Buttons */}
                <div className="flex flex-col gap-3 w-full">
                    <SignInButton mode="modal">
                        <button className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors duration-200">
                            Sign In
                        </button>
                    </SignInButton>

                    <SignUpButton mode="modal">
                        <button className="w-full py-3 px-6 bg-white hover:bg-gray-50 text-blue-600 font-semibold rounded-xl border-2 border-blue-600 transition-colors duration-200">
                            Create Account
                        </button>
                    </SignUpButton>
                </div>

                <p className="text-xs text-gray-400 text-center">
                    By continuing, you agree to our Terms of Service
                </p>
            </div>
        </div>
    );
}