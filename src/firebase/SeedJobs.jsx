// src/firebase/seedJobs.js
// Run this ONCE to seed jobs. Import and call seedJobs() from any component temporarily.
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "./config";

const jobs = [
    { title: "Frontend Developer", company: "TechCorp", location: "Remote", type: "Full-time", salary: "5–8 LPA", description: "Build modern React UIs for our SaaS platform. Work with a cross-functional team on customer-facing products.", skills: ["React", "JavaScript", "Tailwind CSS"] },
    { title: "React Native Developer", company: "AppWave", location: "Bangalore", type: "Full-time", salary: "6–10 LPA", description: "Develop and maintain cross-platform mobile apps using React Native. Experience with Expo is a plus.", skills: ["React Native", "JavaScript", "Expo"] },
    { title: "UI/UX Designer", company: "PixelMinds", location: "Remote", type: "Contract", salary: "3–5 LPA", description: "Design intuitive user interfaces and conduct usability testing for our product suite.", skills: ["Figma", "Prototyping", "User Research"] },
    { title: "Backend Developer", company: "CloudStack", location: "Hyderabad", type: "Full-time", salary: "8–12 LPA", description: "Design and build scalable REST APIs using Node.js and Express. Manage PostgreSQL databases.", skills: ["Node.js", "Express", "PostgreSQL"] },
    { title: "Full Stack Developer", company: "DevForge", location: "Pune", type: "Full-time", salary: "7–11 LPA", description: "Work across the stack building features end-to-end. React on frontend, Node.js on backend.", skills: ["React", "Node.js", "MongoDB"] },
    { title: "DevOps Engineer", company: "InfraBase", location: "Remote", type: "Full-time", salary: "10–15 LPA", description: "Manage CI/CD pipelines, Docker containers, and cloud infrastructure on AWS.", skills: ["AWS", "Docker", "Kubernetes", "CI/CD"] },
    { title: "Data Analyst", company: "Insightful", location: "Chennai", type: "Full-time", salary: "4–7 LPA", description: "Analyze business data, build dashboards, and generate actionable insights using Python and Power BI.", skills: ["Python", "SQL", "Power BI"] },
    { title: "Machine Learning Engineer", company: "NeuralWave", location: "Bangalore", type: "Full-time", salary: "12–18 LPA", description: "Build and deploy ML models for computer vision and NLP use cases at scale.", skills: ["Python", "TensorFlow", "PyTorch"] },
    { title: "Java Developer", company: "EnterpriseSoft", location: "Noida", type: "Full-time", salary: "6–9 LPA", description: "Develop enterprise-grade applications using Java Spring Boot and microservices architecture.", skills: ["Java", "Spring Boot", "Microservices"] },
    { title: "QA Engineer", company: "BugFree Labs", location: "Remote", type: "Full-time", salary: "4–6 LPA", description: "Write automated tests, perform manual testing, and maintain quality across our web platform.", skills: ["Selenium", "Cypress", "JIRA"] },
    { title: "Product Manager", company: "GrowthOS", location: "Mumbai", type: "Full-time", salary: "12–18 LPA", description: "Drive product strategy and roadmap for our B2B SaaS platform. Work with engineering, design, and sales.", skills: ["Agile", "Roadmapping", "Stakeholder Management"] },
    { title: "Cloud Architect", company: "SkyBridge", location: "Remote", type: "Contract", salary: "20–28 LPA", description: "Design cloud-native solutions on Azure and AWS for enterprise clients across fintech and healthcare.", skills: ["Azure", "AWS", "Terraform"] },
    { title: "Cybersecurity Analyst", company: "SecureNet", location: "Delhi", type: "Full-time", salary: "8–12 LPA", description: "Monitor systems for threats, conduct vulnerability assessments, and implement security protocols.", skills: ["Networking", "SIEM", "Penetration Testing"] },
    { title: "Technical Content Writer", company: "WriteCode", location: "Remote", type: "Part-time", salary: "2–4 LPA", description: "Write technical blogs, documentation, and tutorials for developer audiences on modern web tech.", skills: ["Technical Writing", "React", "Markdown"] },
    { title: "Blockchain Developer", company: "ChainWorks", location: "Bangalore", type: "Full-time", salary: "14–20 LPA", description: "Build smart contracts and decentralized applications on Ethereum. Experience with Solidity required.", skills: ["Solidity", "Ethereum", "Web3.js"] },
];

export async function seedJobs() {
    const colRef = collection(db, "jobs");
    for (const job of jobs) {
        await addDoc(colRef, { ...job, postedAt: Timestamp.now() });
    }
    console.log("✅ 15 jobs seeded!");
}