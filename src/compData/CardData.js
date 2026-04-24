const jobs = [
  {
    id: "1",
    title: "Senior DevOps Engineer",
    company: "Google",
    companyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/250px-Google_%22G%22_logo.svg.png",
    location: { type: "Remote", country: "India" },
    experience: { min: 10, max: 15 },
    noticePeriod: { minDays: 0, maxDays: 15 },
    skills: {
      skill1: "Active Directory",
      skill2: "ELK Stack",
      skill3: "Kubernetes",
    },
    broadcasted: "11 months ago",
  },

  {
    id: "2",
    title: "Frontend Developer",
    company: "Microsoft",
    companyLogo: "https://mailmeteor.com/logos/assets/PNG/Microsoft_Logo_512px.png",
    location: { type: "Hybrid", country: "India" },
    experience: { min: 2, max: 5 },
    noticePeriod: { minDays: 15, maxDays: 30 },
    skills: {
      skill1: "React",
      skill2: "TypeScript",
      skill3: "Tailwind CSS",
    },
    broadcasted: "2 weeks ago",
  },

  // {
  //   id: "3",
  //   title: "Backend Java Developer",
  //   company: "Amazon",
  //   companyLogo: "https://static.vecteezy.com/system/resources/previews/014/018/561/non_2x/amazon-logo-on-transparent-background-free-vector.jpg",
  //   location: { type: "Onsite", country: "India" },
  //   experience: { min: 4, max: 8 },
  //   noticePeriod: { minDays: 30, maxDays: 60 },
  //   skills: {
  //     skill1: "Java",
  //     skill2: "Spring Boot",
  //     skill3: "MySQL",
  //     skill4: "Microservices",
  //   },
  //   broadcasted: "3 days ago",
  // },

  // {
  //   id: "4",
  //   title: "Full Stack Developer",
  //   company: "Meta",
  //   companyLogo: "https://pngimg.com/d/meta_PNG5.png",
  //   location: { type: "Remote", country: "India" },
  //   experience: { min: 3, max: 6 },
  //   noticePeriod: { minDays: 15, maxDays: 45 },
  //   skills: {
  //     skill1: "React",
  //     skill2: "Node.js",
  //     skill3: "MongoDB",
  //   },
  //   broadcasted: "1 week ago",
  // },

  // {
  //   id: "5",
  //   title: "UI/UX Designer",
  //   company: "Apple",
  //   companyLogo: "https://www.freepnglogos.com/uploads/apple-logo-png/apple-logo-png-transparent-svg-vector-bie-supply-29.png",
  //   location: { type: "Hybrid", country: "India" },
  //   experience: { min: 2, max: 4 },
  //   noticePeriod: { minDays: 30, maxDays: 60 },
  //   skills: {
  //     skill1: "Figma",
  //     skill2: "Adobe XD",
  //   },
  //   broadcasted: "5 days ago",
  // },

  // {
  //   id: "6",
  //   title: "Data Analyst",
  //   company: "IBM",
  //   companyLogo: "https://pngimg.com/d/ibm_PNG19658.png",
  //   location: { type: "Onsite", country: "India" },
  //   experience: { min: 1, max: 3 },
  //   noticePeriod: { minDays: 0, maxDays: 30 },
  //   skills: {
  //     skill1: "SQL",
  //     skill2: "Power BI",
  //     skill3: "Excel",
  //   },
  //   broadcasted: "2 days ago",
  // },

  // {
  //   id: "7",
  //   title: "Machine Learning Engineer",
  //   company: "NVIDIA",
  //   companyLogo: "https://1000logos.net/wp-content/uploads/2017/05/Color-NVIDIA-Logo.jpg",
  //   location: { type: "Remote", country: "India" },
  //   experience: { min: 3, max: 7 },
  //   noticePeriod: { minDays: 30, maxDays: 60 },
  //   skills: {
  //     skill1: "Python",
  //     skill2: "TensorFlow",
  //     skill3: "PyTorch",
  //     skill4: "Pandas",
  //   },
  //   broadcasted: "1 month ago",
  // },

  // {
  //   id: "8",
  //   title: "Cyber Security Specialist",
  //   company: "Cisco",
  //   companyLogo: "https://translatorswithoutborders.org/wp-content/uploads/2021/12/Cisco-logo.png",
  //   location: { type: "Onsite", country: "India" },
  //   experience: { min: 5, max: 10 },
  //   noticePeriod: { minDays: 15, maxDays: 30 },
  //   skills: {
  //     skill1: "Penetration Testing",
  //     skill2: "Network Security",
  //     skill3: "SIEM",
  //   },
  //   broadcasted: "4 days ago",
  // },

  // {
  //   id: "9",
  //   title: "Cloud Engineer",
  //   company: "Oracle",
  //   companyLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4OXa58AqOOglVnI_pMPuw-TTkB0TSp1j28Q&s",
  //   location: { type: "Hybrid", country: "India" },
  //   experience: { min: 4, max: 9 },
  //   noticePeriod: { minDays: 30, maxDays: 90 },
  //   skills: {
  //     skill1: "AWS",
  //     skill2: "Docker",
  //     skill3: "Kubernetes",
  //   },
  //   broadcasted: "6 days ago",
  // },

  // {
  //   id: "10",
  //   title: "QA Automation Engineer",
  //   company: "Intel",
  //   companyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Intel_logo_%282006-2020%29.svg/250px-Intel_logo_%282006-2020%29.svg.png",
  //   jobImage: "qa.png",
  //   location: { type: "Remote", country: "India" },
  //   experience: { min: 2, max: 5 },
  //   noticePeriod: { minDays: 15, maxDays: 45 },
  //   skills: {
  //     skill1: "Selenium",
  //     skill2: "Cypress",
  //     skill3: "Jest",
  //   },
  //   broadcasted: "3 weeks ago",
  // }
];

export default jobs;
