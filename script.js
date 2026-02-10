// ------- Mock Job Data -------
const jobs = [
  {
    id: "job1",
    title: "Software Engineer - Backend",
    company: "NovaStack Labs",
    location: "Bengaluru",
    salary: "₹18 - 24 LPA",
    category: "it",
    tags: ["Node.js", "API", "MongoDB"],
  },
  {
    id: "job2",
    title: "Data Analyst - Internship",
    company: "InsightBridge",
    location: "Remote",
    salary: "₹25K / month",
    category: "internship",
    tags: ["SQL", "Power BI", "Python"],
  },
  {
    id: "job3",
    title: "VLSI Design Engineer",
    company: "SiliconCore Systems",
    location: "Hyderabad",
    salary: "₹12 - 18 LPA",
    category: "core",
    tags: ["Verilog", "VHDL", "ASIC"],
  },
  {
    id: "job4",
    title: "Frontend Developer",
    company: "Skyline Digital",
    location: "Pune",
    salary: "₹8 - 14 LPA",
    category: "it",
    tags: ["React", "TypeScript", "UI"],
  },
  {
    id: "job5",
    title: "Mechanical Design Engineer",
    company: "Torque Dynamics",
    location: "Chennai",
    salary: "₹6 - 10 LPA",
    category: "core",
    tags: ["SolidWorks", "AutoCAD", "Manufacturing"],
  },
  {
    id: "job6",
    title: "Cloud Engineer",
    company: "Nimbus Tech",
    location: "Remote",
    salary: "₹15 - 22 LPA",
    category: "remote",
    tags: ["AWS", "DevOps", "Kubernetes"],
  },
  {
    id: "job7",
    title: "Business Analyst - Internship",
    company: "StrategicEdge",
    location: "Gurugram",
    salary: "₹20K / month",
    category: "internship",
    tags: ["Excel", "Stakeholder", "Agile"],
  },
  {
    id: "job8",
    title: "Remote Full Stack Developer",
    company: "OrbitSoft",
    location: "Remote",
    salary: "₹14 - 20 LPA",
    category: "remote",
    tags: ["MERN", "REST", "Cloud"],
  },
  {
    id: "job9",
    title: "Embedded Systems Engineer",
    company: "MicroBotics",
    location: "Pune",
    salary: "₹7 - 11 LPA",
    category: "core",
    tags: ["C", "RTOS", "Microcontrollers"],
  },
];

// ------- Mock Training Data -------
const trainings = [
  {
    id: "training1",
    title: "Full Stack Web Development Bootcamp",
    provider: "Tech Academy",
    mode: "online",
    location: "Remote",
    duration: "medium",
    skills: ["React", "Node.js", "MongoDB", "Express", "JavaScript"],
    domain: "web",
    description: "Complete web development program with modern stack"
  },
  {
    id: "training2",
    title: "Data Science & Machine Learning",
    provider: "Data Institute",
    mode: "hybrid",
    location: "Bengaluru",
    duration: "long",
    skills: ["Python", "Machine Learning", "TensorFlow", "Data Analysis", "SQL"],
    domain: "data",
    description: "Comprehensive data science program with ML focus"
  },
  {
    id: "training3",
    title: "Cloud Computing with AWS",
    provider: "Cloud Masters",
    mode: "online",
    location: "Remote",
    duration: "short",
    skills: ["AWS", "Cloud Architecture", "DevOps", "Docker", "Kubernetes"],
    domain: "cloud",
    description: "AWS certification preparation course"
  },
  {
    id: "training4",
    title: "Mobile App Development",
    provider: "Mobile School",
    mode: "offline",
    location: "Hyderabad",
    duration: "medium",
    skills: ["React Native", "Flutter", "iOS", "Android", "Mobile UI"],
    domain: "mobile",
    description: "Cross-platform mobile development"
  },
  {
    id: "training5",
    title: "DevOps Engineering",
    provider: "DevOps Academy",
    mode: "online",
    location: "Remote",
    duration: "medium",
    skills: ["CI/CD", "Jenkins", "GitLab", "Ansible", "Terraform"],
    domain: "devops",
    description: "Complete DevOps engineering program"
  },
  {
    id: "training6",
    title: "AI & Deep Learning",
    provider: "AI Institute",
    mode: "hybrid",
    location: "Pune",
    duration: "long",
    skills: ["Deep Learning", "Neural Networks", "PyTorch", "Computer Vision", "NLP"],
    domain: "ai",
    description: "Advanced AI and deep learning program"
  }
];

// ------- Gemini API Configuration -------
// API key is now handled by backend server

// ------- DOM Elements -------
const jobListEl = document.getElementById("jobList");
const categoryTabs = document.querySelectorAll(".category-tab");
const jobSearchInput = document.getElementById("jobSearchInput");
const jobSearchBtn = document.getElementById("jobSearchBtn");
const applyModal = document.getElementById("applyModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const applyForm = document.getElementById("applyForm");
const modalJobTitleEl = document.getElementById("modalJobTitle");
const applyFormStatus = document.getElementById("applyFormStatus");
const appliedJobsListEl = document.getElementById("appliedJobsList");
const themeToggleBtn = document.getElementById("themeToggle");
const navMenuBtn = document.getElementById("navMenuBtn");
const navLinks = document.querySelector(".nav-links");

// Resume analyzer
const resumeFileInput = document.getElementById("resumeFile");
const resumeTextArea = document.getElementById("resumeText");
const analyzeResumeBtn = document.getElementById("analyzeResumeBtn");
const resumeStatusEl = document.getElementById("resumeStatus");
const resumeResultEl = document.getElementById("resumeResult");
const extractedSkillsEl = document.getElementById("extractedSkills");
const missingSkillsEl = document.getElementById("missingSkills");
const improvementSuggestionsEl = document.getElementById("improvementSuggestions");
const applicantResumeInput = document.getElementById("applicantResume");

// Domain recommendation
const recommendedDomainEl = document.getElementById("recommendedDomain");
const matchScoreEl = document.getElementById("matchScore");
const recommendedJobsEl = document.getElementById("recommendedJobs");

// Training section
const modeFilter = document.getElementById("modeFilter");
const domainFilter = document.getElementById("domainFilter");
const durationFilter = document.getElementById("durationFilter");
const locationFilter = document.getElementById("locationFilter");
const recommendedTrainingsEl = document.getElementById("recommendedTrainings");
const popularTrainingsEl = document.getElementById("popularTrainings");

// Placement counters
const counterEls = document.querySelectorAll(".counter-value");
const toastEl = document.getElementById("toast");

let activeCategory = "all";
let currentJobForApplication = null;
let resumeAnalysisData = null; // Store resume analysis for training recommendations

// ------- Utility -------
function createJobCard(job) {
  const card = document.createElement("article");
  card.className = "job-card glass-card";

  const logoInitials = job.company
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

  card.innerHTML = `
    <div class="job-card-header">
      <div class="company-logo">${logoInitials}</div>
      <div class="job-meta">
        <h3 class="job-title">${job.title}</h3>
        <p class="job-company">${job.company}</p>
      </div>
    </div>
    <div class="job-tags">
      ${job.tags.map((tag) => `<span class="job-tag-pill">${tag}</span>`).join("")}
    </div>
    <div class="job-footer">
      <div>
        <div class="job-location">📍 ${job.location}</div>
        <div class="job-salary">💰 ${job.salary}</div>
      </div>
      <button class="apply-btn" data-job-id="${job.id}">Apply Now</button>
    </div>
  `;

  return card;
}

function filterJobs() {
  const searchQuery = jobSearchInput.value.toLowerCase().trim();
  const filtered = jobs.filter((job) => {
    const categoryMatch = activeCategory === "all" || job.category === activeCategory;
    const searchTarget = `${job.title} ${job.company} ${job.location} ${job.tags.join(" ")}`.toLowerCase();
    const searchMatch = !searchQuery || searchTarget.includes(searchQuery);
    return categoryMatch && searchMatch;
  });

  jobListEl.innerHTML = "";
  if (!filtered.length) {
    const msg = document.createElement("div");
    msg.className = "no-jobs glass-card";
    msg.textContent = "No jobs match your filters at the moment.";
    jobListEl.appendChild(msg);
    return;
  }

  filtered.forEach((job) => jobListEl.appendChild(createJobCard(job)));
}

// ------- Category Tabs & Search -------
categoryTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    categoryTabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    activeCategory = tab.dataset.category || "all";
    filterJobs();
  });
});

jobSearchInput.addEventListener("input", filterJobs);
jobSearchBtn.addEventListener("click", filterJobs);

// ------- Apply Modal & LocalStorage -------
function getAppliedJobs() {
  try {
    const stored = localStorage.getItem("appliedJobs");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveAppliedJobs(appliedJobs) {
  localStorage.setItem("appliedJobs", JSON.stringify(appliedJobs));
}

function renderAppliedJobs() {
  const appliedJobs = getAppliedJobs();
  appliedJobsListEl.innerHTML = "";

  if (!appliedJobs.length) {
    const placeholder = document.createElement("p");
    placeholder.className = "placeholder-text";
    placeholder.textContent = "You have not applied for any jobs yet.";
    appliedJobsListEl.appendChild(placeholder);
    return;
  }

  appliedJobs.forEach((entry) => {
    const card = document.createElement("article");
    card.className = "applied-card";
    card.innerHTML = `
      <h3 class="applied-title">${entry.title}</h3>
      <p class="applied-company">${entry.company}</p>
      <p class="applied-date">Applied on: ${entry.appliedDate}</p>
    `;
    appliedJobsListEl.appendChild(card);
  });
}

function openApplyModal(jobId) {
  const job = jobs.find((j) => j.id === jobId);
  if (!job) return;
  currentJobForApplication = job;
  modalJobTitleEl.textContent = `${job.title} — ${job.company}`;
  applyForm.reset();
  applyFormStatus.textContent = "";
  applyModal.classList.remove("hidden");
}

function closeApplyModal() {
  applyModal.classList.add("hidden");
  currentJobForApplication = null;
}

jobListEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".apply-btn");
  if (!btn) return;
  const jobId = btn.dataset.jobId;
  openApplyModal(jobId);
});

closeModalBtn.addEventListener("click", closeApplyModal);
applyModal.addEventListener("click", (e) => {
  if (e.target === applyModal || e.target.classList.contains("modal-backdrop")) {
    closeApplyModal();
  }
});

applyForm.addEventListener("submit", (e) => {
  e.preventDefault();
  applyFormStatus.textContent = "";

  if (!currentJobForApplication) {
    applyFormStatus.textContent = "Something went wrong. Please close and try again.";
    return;
  }

  const name = document.getElementById("applicantName").value.trim();
  const email = document.getElementById("applicantEmail").value.trim();
  const resumeFile = applicantResumeInput?.files?.[0] || null;

  if (!name) {
    applyFormStatus.textContent = "Please enter your full name.";
    return;
  }
  if (!email) {
    applyFormStatus.textContent = "Please enter your email address.";
    return;
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    applyFormStatus.textContent = "Please enter a valid email address.";
    return;
  }
  if (!resumeFile) {
    applyFormStatus.textContent = "Resume upload is required to apply.";
    return;
  }
  const allowedExtensions = [".pdf", ".doc", ".docx"];
  const fileName = resumeFile.name.toLowerCase();
  const hasValidExtension = allowedExtensions.some((ext) => fileName.endsWith(ext));
  if (!hasValidExtension) {
    applyFormStatus.textContent = "Only PDF, DOC, and DOCX files are allowed.";
    return;
  }

  const appliedJobs = getAppliedJobs();
  const alreadyApplied = appliedJobs.some(
    (entry) => entry.jobId === currentJobForApplication.id && entry.email === email
  );
  if (alreadyApplied) {
    applyFormStatus.textContent = "You have already applied for this job with this email.";
    return;
  }

  const now = new Date();
  const formattedDate = now.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  appliedJobs.push({
    jobId: currentJobForApplication.id,
    title: currentJobForApplication.title,
    company: currentJobForApplication.company,
    appliedDate: formattedDate,
    name,
    email,
  });
  saveAppliedJobs(appliedJobs);
  renderAppliedJobs();

  applyFormStatus.textContent = "Application submitted successfully and saved in Applied Jobs.";
  showToast("Application submitted successfully.");
  setTimeout(closeApplyModal, 1100);
});

// ------- Resume File Handling -------
if (resumeFileInput) {
  resumeFileInput.addEventListener("change", async () => {
    const file = resumeFileInput.files?.[0];
    if (!file) return;

    resumeStatusEl.textContent = "Processing file...";
    
    try {
      if (file.type === "application/pdf") {
        // Handle PDF file with PDF.js
        await extractTextFromPDF(file);
      } else if (file.type === "text/plain") {
        // Handle text file
        await readTextFile(file);
      } else {
        throw new Error("Unsupported file type. Please upload a .txt or .pdf file.");
      }
      
      resumeStatusEl.textContent = "File processed successfully. Ready to analyze!";
    } catch (error) {
      console.error("File processing error:", error);
      resumeStatusEl.textContent = error.message || "Error processing file. Please try again.";
    }
  });
}

// ------- PDF Text Extraction -------
async function extractTextFromPDF(file) {
  try {
    // Set PDF.js worker
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    
    // Convert file to array buffer
    const arrayBuffer = await file.arrayBuffer();
    
    // Load PDF document
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    
    let fullText = "";
    
    // Extract text from all pages
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      
      // Extract text items and join them
      const pageText = textContent.items
        .map(item => item.str)
        .join(' ');
      
      fullText += pageText + '\n';
    }
    
    // Populate textarea with extracted text
    resumeTextArea.value = fullText.trim();
    
  } catch (error) {
    console.error("PDF extraction error:", error);
    throw new Error("Failed to extract text from PDF. The file might be corrupted or password-protected.");
  }
}

// ------- Text File Reading -------
async function readTextFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result;
      if (typeof text === "string") {
        resumeTextArea.value = text;
        resolve();
      } else {
        reject(new Error("Failed to read text file."));
      }
    };
    reader.onerror = () => reject(new Error("Error reading text file."));
    reader.readAsText(file);
  });
}

// ------- Gemini API Integration -------
async function analyzeResumeWithGemini() {
  const resumeText = resumeTextArea.value.trim();

  if (!resumeText) {
    resumeStatusEl.textContent = "Please paste your resume text or upload a resume file.";
    return;
  }

  const prompt = `
You are an AI Resume Analyzer for a Smart College Placement Portal.

Analyze the following resume and return the result strictly in JSON format.

Tasks:
1. Extract all technical and professional skills mentioned in the resume.
2. Identify the most suitable career domain based on skills.
3. Suggest additional relevant skills the candidate should learn.
4. Provide a resume match score (0–100).
5. Provide short improvement suggestions.

Return JSON:

{
  "extracted_skills": [],
  "recommended_domain": "",
  "recommended_missing_skills": [],
  "match_score": "",
  "improvement_suggestions": []
}

Resume:
${resumeText}
`;

  analyzeResumeBtn.disabled = true;
  resumeStatusEl.textContent = "Analyzing resume with Groq...";

  try {
    const response = await fetch("http://localhost:5000/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Server error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.response || "";

    let jsonText = text.trim();
    // In case model wraps JSON in code fences
    if (jsonText.startsWith("```")) {
      jsonText = jsonText.replace(/```json|```/g, "").trim();
    }

    let parsed;
    try {
      parsed = JSON.parse(jsonText);
    } catch (err) {
      console.error("Failed to parse JSON from Groq:", err, jsonText);
      throw new Error("Groq did not return valid JSON. Please try again.");
    }

    updateResumeAnalysisUI(parsed);
    updateDomainRecommendation(parsed);
    
    // Store resume analysis data for training recommendations
    resumeAnalysisData = parsed;
    
    // Automatically generate personalized training recommendations
    updateTrainingRecommendations();
    
    resumeStatusEl.textContent = "Resume analyzed successfully.";
  } catch (error) {
    console.error(error);
    resumeStatusEl.textContent =
      error instanceof Error ? error.message : "Something went wrong while calling Groq.";
  } finally {
    analyzeResumeBtn.disabled = false;
  }
}

function updateResumeAnalysisUI(result) {
  const {
    extracted_skills = [],
    recommended_missing_skills = [],
    improvement_suggestions = [],
  } = result || {};

  populateList(extractedSkillsEl, extracted_skills);
  populateList(missingSkillsEl, recommended_missing_skills);
  populateList(improvementSuggestionsEl, improvement_suggestions);

  resumeResultEl.classList.remove("hidden");
}

function populateList(listEl, items) {
  listEl.innerHTML = "";
  if (!items || !items.length) {
    const li = document.createElement("li");
    li.textContent = "No data available.";
    listEl.appendChild(li);
    return;
  }

  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = typeof item === "string" ? item : JSON.stringify(item);
    listEl.appendChild(li);
  });
}

function updateDomainRecommendation(result) {
  if (!result) return;
  const { recommended_domain, match_score } = result;

  recommendedDomainEl.textContent = recommended_domain || "Domain not detected";
  matchScoreEl.textContent = match_score != null ? `${match_score}` : "--";

  // Recommend jobs: simple mapping of domains to job categories / keywords
  const domain = (recommended_domain || "").toLowerCase();
  let relatedJobs;
  if (domain.includes("data") || domain.includes("analytics")) {
    relatedJobs = jobs.filter((j) =>
      /data|analyst|analytics/i.test(`${j.title} ${j.tags.join(" ")}`)
    );
  } else if (domain.includes("web") || domain.includes("frontend") || domain.includes("full stack")) {
    relatedJobs = jobs.filter((j) =>
      /frontend|full stack|react|mern|web/i.test(`${j.title} ${j.tags.join(" ")}`)
    );
  } else if (domain.includes("cloud") || domain.includes("devops")) {
    relatedJobs = jobs.filter((j) => /cloud|devops|aws|kubernetes/i.test(j.tags.join(" ")));
  } else if (domain.includes("embedded") || domain.includes("vlsi") || domain.includes("core")) {
    relatedJobs = jobs.filter((j) => j.category === "core");
  } else {
    // Default: recommend top few jobs by match category or random
    relatedJobs = jobs.slice(0, 4);
  }

  recommendedJobsEl.innerHTML = "";
  relatedJobs.forEach((job) => {
    const pill = document.createElement("div");
    pill.className = "recommended-job-pill";
    pill.innerHTML = `
<span>${job.title}</span>
<span>${job.company} • ${job.location}</span>
`;
    recommendedJobsEl.appendChild(pill);
  });

  // Show domain recommendation section with animation
  const domainSection = document.getElementById('domain-recommendation');
  if (domainSection) {
    domainSection.classList.remove('hidden');
    // Trigger animation by adding visible class after a small delay
    setTimeout(() => {
      domainSection.classList.add('visible');
      // Smooth scroll to make it visible
      domainSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  }
}

if (analyzeResumeBtn) {
  analyzeResumeBtn.addEventListener("click", analyzeResumeWithGemini);
}

// ------- Training Functions -------
function createTrainingCard(training) {
  const card = document.createElement("div");
  card.className = "training-card";
  
  const modeClass = `mode-${training.mode}`;
  const durationText = getDurationText(training.duration);
  
  card.innerHTML = `
    <div class="training-header">
      <h3 class="training-title">${training.title}</h3>
      <p class="training-provider">${training.provider}</p>
      <span class="training-mode ${modeClass}">${training.mode.toUpperCase()}</span>
    </div>
    
    <div class="training-details">
      <div class="training-detail">
        <span class="training-detail-icon">📍</span>
        <span>${training.location}</span>
      </div>
      <div class="training-detail">
        <span class="training-detail-icon">⏱️</span>
        <span>${durationText}</span>
      </div>
    </div>
    
    <div class="training-skills">
      <div class="training-skills-label">Skills Covered:</div>
      <div class="training-skills-list">
        ${training.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
      </div>
    </div>
    
    <div class="training-actions">
      <button class="training-btn btn-primary" onclick="applyForTraining('${training.id}')">
        Apply Now
      </button>
      <button class="training-btn btn-secondary" onclick="viewTrainingDetails('${training.id}')">
        View Details
      </button>
    </div>
  `;
  
  return card;
}

function getDurationText(duration) {
  const durationMap = {
    short: "1-4 weeks",
    medium: "1-3 months",
    long: "3+ months"
  };
  return durationMap[duration] || duration;
}

function filterTrainings(trainings, filters) {
  return trainings.filter(training => {
    if (filters.mode !== 'all' && training.mode !== filters.mode) return false;
    if (filters.domain !== 'all' && training.domain !== filters.domain) return false;
    if (filters.duration !== 'all' && training.duration !== filters.duration) return false;
    if (filters.location !== 'all') {
      if (filters.location === 'remote' && training.location !== 'Remote') return false;
      if (filters.location === 'nearby' && training.location === 'Remote') return false;
      if (filters.location === 'city' && training.location === 'Remote') return false;
    }
    return true;
  });
}

function updateTrainingRecommendations() {
  if (!resumeAnalysisData) {
    // Show placeholder if no resume analysis
    recommendedTrainingsEl.innerHTML = `
      <div class="training-placeholder">
        <p>Analyze your resume to see personalized training recommendations</p>
      </div>
    `;
    return;
  }
  
  // Get missing skills from resume analysis
  const missingSkills = resumeAnalysisData.recommended_missing_skills || [];
  const recommendedDomain = resumeAnalysisData.recommended_domain || '';
  const extractedSkills = resumeAnalysisData.extracted_skills || [];
  
  // Enhanced scoring algorithm for training recommendations
  const prioritizedTrainings = trainings.map(training => {
    let score = 0;
    let skillMatchCount = 0;
    
    // Primary score: Missing skills coverage (highest priority)
    const matchingMissingSkills = training.skills.filter(skill => 
      missingSkills.some(missing => 
        missing.toLowerCase().includes(skill.toLowerCase()) || 
        skill.toLowerCase().includes(missing.toLowerCase())
      )
    );
    skillMatchCount = matchingMissingSkills.length;
    score += skillMatchCount * 15; // Higher weight for missing skills
    
    // Secondary score: Extracted skills reinforcement
    const matchingExtractedSkills = training.skills.filter(skill => 
      extractedSkills.some(extracted => 
        extracted.toLowerCase().includes(skill.toLowerCase()) || 
        skill.toLowerCase().includes(extracted.toLowerCase())
      )
    );
    score += matchingExtractedSkills.length * 5;
    
    // Tertiary score: Domain match
    const domainLower = recommendedDomain.toLowerCase();
    const trainingDomainLower = training.domain.toLowerCase();
    if (domainLower.includes(trainingDomainLower) || 
        trainingDomainLower.includes(domainLower)) {
      score += 8;
    }
    
    // Bonus score: Mode preference (prioritize online/hybrid for flexibility)
    if (training.mode === 'online') score += 2;
    if (training.mode === 'hybrid') score += 1;
    
    // Bonus score: Duration balance (prefer medium duration)
    if (training.duration === 'medium') score += 3;
    if (training.duration === 'short') score += 1;
    
    return { 
      ...training, 
      priorityScore: score,
      skillMatchCount,
      domainMatch: domainLower.includes(trainingDomainLower) || trainingDomainLower.includes(domainLower)
    };
  });
  
  // Sort by priority score (descending)
  prioritizedTrainings.sort((a, b) => b.priorityScore - a.priorityScore);
  
  // Fallback: If no good skill matches found, prioritize by domain
  const hasGoodMatches = prioritizedTrainings.some(t => t.skillMatchCount > 0);
  if (!hasGoodMatches && recommendedDomain) {
    const domainLower = recommendedDomain.toLowerCase();
    prioritizedTrainings.forEach(training => {
      const trainingDomainLower = training.domain.toLowerCase();
      if (domainLower.includes(trainingDomainLower) || trainingDomainLower.includes(domainLower)) {
        training.priorityScore += 20; // Boost domain matches significantly
        training.domainMatch = true;
      }
    });
    // Re-sort after domain boost
    prioritizedTrainings.sort((a, b) => b.priorityScore - a.priorityScore);
  }
  
  // Get top 3-6 recommendations
  const topRecommendations = prioritizedTrainings.slice(0, 6);
  
  // Get current filters
  const filters = getCurrentTrainingFilters();
  
  // Filter and display recommended trainings with animation
  const recommendedFiltered = filterTrainings(topRecommendations, filters);
  displayTrainingsWithAnimation(recommendedFiltered, recommendedTrainingsEl);
}

function displayPopularTrainings() {
  const filters = getCurrentTrainingFilters();
  const popularFiltered = filterTrainings(trainings, filters);
  displayTrainings(popularFiltered, popularTrainingsEl);
}

function displayTrainings(trainings, container) {
  container.innerHTML = '';
  
  if (trainings.length === 0) {
    container.innerHTML = `
      <div class="training-placeholder">
        <p>No training programs found matching your filters.</p>
      </div>
    `;
    return;
  }
  
  trainings.forEach(training => {
    const card = createTrainingCard(training);
    container.appendChild(card);
  });
}

function displayTrainingsWithAnimation(trainings, container) {
  container.innerHTML = '';
  
  if (trainings.length === 0) {
    container.innerHTML = `
      <div class="training-placeholder">
        <p>No training programs found matching your profile.</p>
      </div>
    `;
    return;
  }
  
  // Create and append cards with staggered fade-in animation
  trainings.forEach((training, index) => {
    const card = createTrainingCard(training);
    
    // Add stagger class for animation delay
    if (index < 6) {
      card.classList.add(`stagger-${index + 1}`);
    }
    
    container.appendChild(card);
  });
}

function getCurrentTrainingFilters() {
  return {
    mode: modeFilter ? modeFilter.value : 'all',
    domain: domainFilter ? domainFilter.value : 'all',
    duration: durationFilter ? durationFilter.value : 'all',
    location: locationFilter ? locationFilter.value : 'all'
  };
}

function applyForTraining(trainingId) {
  const training = trainings.find(t => t.id === trainingId);
  if (training) {
    showToast(`Applied for ${training.title}`, 'success');
    // Here you would typically send the application to a backend
  }
}

function viewTrainingDetails(trainingId) {
  const training = trainings.find(t => t.id === trainingId);
  if (training) {
    showToast(`Viewing details for ${training.title}`, 'info');
    // Here you would typically open a modal or navigate to details page
  }
}

// Initialize training section
function initializeTraining() {
  // Load popular trainings on page load
  displayPopularTrainings();
  
  // Add filter event listeners
  if (modeFilter) modeFilter.addEventListener('change', () => {
    updateTrainingRecommendations();
    displayPopularTrainings();
  });
  
  if (domainFilter) domainFilter.addEventListener('change', () => {
    updateTrainingRecommendations();
    displayPopularTrainings();
  });
  
  if (durationFilter) durationFilter.addEventListener('change', () => {
    updateTrainingRecommendations();
    displayPopularTrainings();
  });
  
  if (locationFilter) locationFilter.addEventListener('change', () => {
    updateTrainingRecommendations();
    displayPopularTrainings();
  });
}

// ------- Toast Helper -------
function showToast(message) {
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.classList.remove("hidden");
  toastEl.classList.add("show");

  clearTimeout(showToast._timeoutId);
  showToast._timeoutId = setTimeout(() => {
    toastEl.classList.remove("show");
    // Keep element in DOM but hide visually
    setTimeout(() => {
      toastEl.classList.add("hidden");
    }, 250);
  }, 2200);
}

// ------- Placement Dashboard Counters -------
function animateCounters() {
  counterEls.forEach((el) => {
    const target = parseInt(el.dataset.target || "0", 10);
    let current = 0;
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      current = Math.floor(progress * target);
      el.textContent = current.toLocaleString();
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target.toLocaleString();
      }
    }

    requestAnimationFrame(tick);
  });
}

const countersObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.disconnect();
      }
    });
  },
  { threshold: 0.3 }
);

const countersContainer = document.querySelector(".counters");
if (countersContainer) {
  countersObserver.observe(countersContainer);
}

// ------- Theme Toggle -------
function loadThemePreference() {
  const stored = localStorage.getItem("portalTheme");
  if (stored === "light" || stored === "dark") {
    document.body.classList.toggle("light-theme", stored === "light");
  } else {
    // default dark, do nothing
  }
  updateThemeToggleIcon();
}

function updateThemeToggleIcon() {
  const isLight = document.body.classList.contains("light-theme");
  const iconSpan = themeToggleBtn.querySelector(".toggle-icon");
  if (iconSpan) {
    iconSpan.textContent = isLight ? "☀" : "☾";
  }
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    const isLight = !document.body.classList.contains("light-theme");
    document.body.classList.toggle("light-theme", isLight);
    localStorage.setItem("portalTheme", isLight ? "light" : "dark");
    updateThemeToggleIcon();
  });
}

// ------- Nav Menu (Mobile) -------
if (navMenuBtn && navLinks) {
  navMenuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });
}

// ------- Logout Functionality -------
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Clear authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('role');
    
    // Show toast notification
    showToast('Logged out successfully', 'success');
    
    // Redirect to auth.html after a short delay
    setTimeout(() => {
      window.location.href = 'auth.html';
    }, 1000);
  });
}

// ------- Init -------
function init() {
  loadThemePreference();
  filterJobs();
  renderAppliedJobs();
  initializeTraining();
}

document.addEventListener("DOMContentLoaded", init);

