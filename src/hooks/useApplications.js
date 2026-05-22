// src/hooks/useApplications.js
import { useState, useEffect } from "react";
import {
    collection,
    doc,
    setDoc,
    getDoc,
    deleteDoc,
    query,
    orderBy,
    serverTimestamp,
    onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { useUser } from "@clerk/clerk-react";

export function useApplications() {
    const { user } = useUser();
    const [applications, setApplications] = useState([]);
    const [appliedJobIds, setAppliedJobIds] = useState(new Set());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) return;
        setLoading(true);
        const q = query(
            collection(db, "applications", user.id, "jobs"),
            orderBy("appliedAt", "desc")
        );
        const unsub = onSnapshot(
            q,
            (snapshot) => {
                const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
                setApplications(data);
                setAppliedJobIds(new Set(data.map((a) => a.jobId)));
                setLoading(false);
            },
            (err) => {
                setError(err.message);
                setLoading(false);
            }
        );
        return () => unsub();
    }, [user]);

    const applyToJob = async (job, resumeName = "", applicantInfo = {}) => {
        if (!user) throw new Error("Not logged in");
        const docRef = doc(db, "applications", user.id, "jobs", job.id);
        const existing = await getDoc(docRef);
        if (existing.exists()) throw new Error("Already applied");

        const payload = {
            jobId: job.id,
            company: job.company,
            title: job.title,
            location: job.location ?? "",
            type: job.type ?? "",
            appliedAt: serverTimestamp(),
            status: "Applied",
            resumeName: resumeName || "",
            // applicant info from the form
            applicantName: applicantInfo.fullName || "",
            applicantEmail: applicantInfo.email || "",
            applicantPhone: applicantInfo.phone || "",
            applicantLinkedIn: applicantInfo.linkedin || "",
            applicantExperience: applicantInfo.experience || "",
        };
        await setDoc(docRef, payload);
    };

    // ── NEW: delete an application ───────────────────────────────────────────
    const deleteApplication = async (jobId) => {
        if (!user) throw new Error("Not logged in");
        const docRef = doc(db, "applications", user.id, "jobs", jobId);
        await deleteDoc(docRef);
        // onSnapshot fires automatically — no manual state update needed
    };

    const hasApplied = (jobId) => appliedJobIds.has(jobId);

    return {
        applications,
        appliedJobIds,
        loading,
        error,
        applyToJob,
        deleteApplication,
        hasApplied,
    };
}