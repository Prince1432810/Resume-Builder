import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Resumebuilder from "./components/pages/Resumebuilder";
import Documents from "./components/pages/Documents";
import Chat from "./components/pages/Chat";
import OfferLetter from "./components/pages/Offer_Letter";
import NotFound from "./components/pages/NotFound";
import MarketPlace from "./components/MarketPlace";
import DashBoard from "./components/DashBoard";
import MakeResume from "./components/ResumeBuilder/MakeResume";
import LoginPage from "./pages/LoginPage";
import JobsPage from "./pages/JobsPage";
import ApplicationsPage from "./pages/ApplicationsPage";
import { useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase/config";
import Support from "./components/Support";
import SupportHistory from "./components/SupportHistory";
import {
    SignedIn,
    SignedOut,
    useUser,
} from "@clerk/clerk-react";

function App() {
    const location = useLocation();
    const { user, isLoaded } = useUser();

    useEffect(() => {
        if (!isLoaded || !user) return;
        const userRef = doc(db, "users", user.id);
        getDoc(userRef).then((snap) => {
            if (!snap.exists()) {
                setDoc(userRef, {
                    name: user.fullName,
                    email: user.primaryEmailAddress?.emailAddress,
                    createdAt: new Date(),
                });
            }
        });
    }, [isLoaded, user]);

    const isResumeCreate = location.pathname === "/resume-builder/create";

    return (
        <>
            <header>
                <SignedOut>
                    <LoginPage />
                </SignedOut>

                <SignedIn>
                    <div
                        className={
                            isResumeCreate
                                ? "flex w-screen min-h-screen bg-gradient-to-br from-[#ebf8ff] to-yellow-50"
                                : "flex h-screen w-screen overflow-hidden bg-[#F0F5F8]"
                        }
                    >
                        <Sidebar />

                        {/* Content column — no flex-wrap, proper left padding to clear sidebar */}
                        <div className="flex flex-1 flex-col min-w-0 lg:pl-17">
                            <Navbar />

                            {/* Scrollable page body */}
                            <main className={`flex-1 overflow-y-auto ${isResumeCreate ? "" : "mt-7"}`}>
                                <div className="p-4 sm:p-6 lg:p-7 pt-14 lg:pt-7 pb-0">
                                    <Routes>
                                        <Route path="/" element={<DashBoard />} />
                                        <Route path="/market-place" element={<MarketPlace />} />
                                        <Route path="/offer-letter" element={<OfferLetter />} />
                                        <Route path="/resume-builder" element={<MakeResume />} />
                                        <Route path="/resume-builder/create" element={<MakeResume />} />
                                        <Route path="/documents" element={<Documents />} />
                                        <Route path="/chat" element={<Chat />} />
                                        <Route path="/jobs" element={<JobsPage />} />
                                        <Route path="/support" element={<Support />} />
                                        <Route path="/support/history" element={<SupportHistory />} />
                                        <Route path="/applications" element={<ApplicationsPage />} />
                                        <Route path="*" element={<NotFound />} />
                                    </Routes>
                                </div>
                            </main>
                        </div>
                    </div>
                </SignedIn>
            </header>
        </>
    );
}

export default App;