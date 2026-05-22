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
import MakeResume from "./components/Resumebuilder/MakeResume";
import LoginPage from "./pages/LoginPage";
import JobsPage from "./pages/JobsPage";
import ApplicationsPage from "./pages/ApplicationsPage";
import { useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase/config";

// Inside your routes:
import {
    SignedIn,
    SignedOut,
    SignInButton,
    SignUpButton,
    UserButton,
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
    
    return (
        //h-[calc(100vh-0px)] overflow-hidden
        <>
            <header>
                <SignedOut>
                    <LoginPage/>
                </SignedOut>

                <SignedIn>
                    <div
                        className={
                            location.pathname === "/resume-builder/create"
                                ? " flex  w-screen overflow-hidden bg-linear-to-br from-[#ebf8ff] to-yellow-50 backdrop-blur-lg"
                                : "h-screen flex overflow-x-scroll w-screen bg-[#F0F5F8]"
                        }
                    >
                        <Sidebar />
                        <div className="flex flex-1 flex-col flex-wrap lg:pl-17">
                            <Navbar />
                            <main className="flex flex-1 p-7 pb-0 mt-7 pt-15">
                                <Routes>
                                    <Route path="/" element={<DashBoard />} />
                                    <Route path="/market-place" element={<MarketPlace />} />
                                    <Route path="/offer-letter" element={<OfferLetter />} />
                                    <Route
                                        path="/resume-builder"
                                        element={<MakeResume />}
                                    />
                                    <Route
                                        path="/resume-builder/create"
                                        element={<MakeResume />}
                                    />
                                    <Route path="/documents" element={<Documents />} />
                                    <Route path="/chat" element={<Chat />} />
                                    <Route path="/jobs" element={<JobsPage />} />
                                    <Route path="*" element={<NotFound />} />
                                    <Route path="/applications" element={<ApplicationsPage />} />
                                </Routes>
                            </main>
                        </div>
                    </div>
                </SignedIn>
            </header>
        </>
    );
}
export default App;
