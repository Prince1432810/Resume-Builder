import { useState, useEffect } from "react";
import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    query,
    orderBy,
    serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { useUser } from "@clerk/clerk-react";

export function useResumes() {
    const { user } = useUser();
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchResumes = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const q = query(
                collection(db, "users", user.id, "resumes"),
                orderBy("createdAt", "desc")
            );
            const snapshot = await getDocs(q);
            const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
            setResumes(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResumes();
    }, [user]);

    const saveResume = async (name, templateId) => {
        if (!user) throw new Error("Not logged in");
        const docRef = await addDoc(collection(db, "users", user.id, "resumes"), {
            name,
            templateId,
            createdAt: serverTimestamp(),
        });
        await fetchResumes();
        return docRef.id;
    };

    const deleteResume = async (resumeId) => {
        if (!user) throw new Error("Not logged in");
        await deleteDoc(doc(db, "users", user.id, "resumes", resumeId));
        setResumes((prev) => prev.filter((r) => r.id !== resumeId));
    };

    return { resumes, loading, error, saveResume, deleteResume, refetch: fetchResumes };
}