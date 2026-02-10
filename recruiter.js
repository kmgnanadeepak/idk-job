// Recruiter Authentication and Dashboard Logic

// Global state
let recruiterState = {
    isAuthenticated: false,
    isGuestMode: false,
    recruiterData: null,
    jobs: [],
    applications: []
};

// Demo data for guest mode
const demoData = {
    jobs: [
        {
            id: 1,
            title: 'Senior Software Engineer',
            department: 'Engineering',
            type: 'full-time',
            location: 'Bangalore, India',
            salary: '15-25 LPA',
            status: 'active',
            applications: 45,
            posted: '2024-01-15'
        },
        {
            id: 2,
            title: 'Frontend Developer',
            department: 'Engineering',
            type: 'full-time',
            location: 'Remote',
            salary: '10-18 LPA',
            status: 'active',
            applications: 32,
            posted: '2024-01-10'
        },
        {
            id: 3,
            title: 'Data Analyst',
            department: 'Analytics',
            type: 'full-time',
            location: 'Mumbai, India',
            salary: '8-15 LPA',
            status: 'draft',
            applications: 0,
            posted: '2024-01-20'
        }
    ],
    applications: [
        {
            id: 1,
            jobId: 1,
            candidateName: 'John Doe',
            candidateEmail: 'john@example.com',
            phone: '+91 9876543210',
            experience: '3 years',
            education: 'B.Tech CSE',
            status: 'shortlisted',
            applied: '2024-01-18',
            resume: 'resume_john_doe.pdf'
        },
        {
            id: 2,
            jobId: 1,
            candidateName: 'Jane Smith',
            candidateEmail: 'jane@example.com',
            phone: '+91 9876543211',
            experience: '2 years',
            education: 'M.Tech IT',
            status: 'pending',
            applied: '2024-01-19',
            resume: 'resume_jane_smith.pdf'
        },
        {
            id: 3,
            jobId: 2,
            candidateName: 'Mike Johnson',
            candidateEmail: 'mike@example.com',
            phone: '+91 9876543212',
            experience: '4 years',
            education: 'B.Sc. Computer Science',
            status: 'pending',
            applied: '2024-01-17',
            resume: 'resume_mike_johnson.pdf'
        }
    ],
    analytics: {
        activeJobs: 2,
        totalApplications: 77,
        shortlisted: 15,
        hired: 8
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === 'recruiter-auth.html') {
        initRecruiterAuth();
    } else if (currentPage === 'recruiter-dashboard.html') {
        initRecruiterDashboard();
    }
});

// Recruiter Authentication Functions
function initRecruiterAuth() {
    // Check if already authenticated
    const token = localStorage.getItem('recruiterToken');
    const guestMode = localStorage.getItem('recruiterGuestMode');
    
    if (token || guestMode) {
        window.location.href = 'recruiter-dashboard.html';
        return;
    }

    // Form elements
    const loginForm = document.getElementById('recruiterLoginFormElement');
    const registerForm = document.getElementById('recruiterRegisterFormElement');
    const forgotPasswordForm = document.getElementById('recruiterForgotPasswordFormElement');
    
    // Navigation links
    const showRegisterLink = document.getElementById('showRecruiterRegisterLink');
    const showLoginLink = document.getElementById('showRecruiterLoginLink');
    const forgotPasswordLink = document.getElementById('recruiterForgotPasswordLink');
    const backToLoginLink = document.getElementById('recruiterBackToLoginLink');
    
    // Guest login button
    const guestLoginBtn = document.getElementById('recruiterGuestLoginBtn');

    // Event listeners
    if (loginForm) {
        loginForm.addEventListener('submit', handleRecruiterLogin);
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', handleRecruiterRegister);
    }
    
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', handleRecruiterForgotPassword);
    }
    
    if (showRegisterLink) {
        showRegisterLink.addEventListener('click', (e) => {
            e.preventDefault();
            showRecruiterForm('register');
        });
    }
    
    if (showLoginLink) {
        showLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            showRecruiterForm('login');
        });
    }
    
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            showRecruiterForm('forgot');
        });
    }
    
    if (backToLoginLink) {
        backToLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            showRecruiterForm('login');
        });
    }
    
    if (guestLoginBtn) {
        guestLoginBtn.addEventListener('click', handleRecruiterGuestLogin);
    }

    // Password toggle functionality
    setupPasswordToggles();
    
    // Password strength indicator
    setupPasswordStrength();
}

function showRecruiterForm(formType) {
    const forms = ['recruiterLoginForm', 'recruiterRegisterForm', 'recruiterForgotPasswordForm'];
    
    forms.forEach(formId => {
        const form = document.getElementById(formId);
        if (form) {
            form.classList.add('hidden');
        }
    });
    
    const targetForm = document.getElementById(`${formType}Form`);
    if (targetForm) {
        targetForm.classList.remove('hidden');
    }
}

function handleRecruiterLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('recruiterLoginEmail').value;
    const password = document.getElementById('recruiterLoginPassword').value;
    const rememberMe = document.getElementById('recruiterRememberMe').checked;
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    btnText.textContent = 'Signing in...';
    btnLoader.classList.remove('hidden');
    submitBtn.disabled = true;
    
    // Simulate authentication (replace with actual API call)
    setTimeout(() => {
        // Mock successful login
        const recruiterData = {
            id: 1,
            name: 'Recruiter User',
            email: email,
            company: 'Tech Company',
            designation: 'HR Manager'
        };
        
        localStorage.setItem('recruiterToken', 'mock-recruiter-token');
        localStorage.setItem('recruiterData', JSON.stringify(recruiterData));
        
        if (rememberMe) {
            localStorage.setItem('recruiterRememberMe', 'true');
        }
        
        showToast('Successfully signed in!', 'success');
        window.location.href = 'recruiter-dashboard.html';
    }, 1500);
}

function handleRecruiterRegister(e) {
    e.preventDefault();
    
    const formData = {
        companyName: document.getElementById('recruiterCompanyName').value,
        email: document.getElementById('recruiterRegisterEmail').value,
        fullName: document.getElementById('recruiterFullName').value,
        designation: document.getElementById('recruiterDesignation').value,
        industry: document.getElementById('recruiterIndustry').value,
        password: document.getElementById('recruiterRegisterPassword').value,
        confirmPassword: document.getElementById('recruiterConfirmPassword').value,
        agreeTerms: document.getElementById('recruiterAgreeTerms').checked
    };
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
        showToast('Passwords do not match!', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    btnText.textContent = 'Creating account...';
    btnLoader.classList.remove('hidden');
    submitBtn.disabled = true;
    
    // Simulate registration (replace with actual API call)
    setTimeout(() => {
        const recruiterData = {
            id: Date.now(),
            name: formData.fullName,
            email: formData.email,
            company: formData.companyName,
            designation: formData.designation,
            industry: formData.industry
        };
        
        localStorage.setItem('recruiterToken', 'mock-recruiter-token');
        localStorage.setItem('recruiterData', JSON.stringify(recruiterData));
        
        showToast('Account created successfully!', 'success');
        window.location.href = 'recruiter-dashboard.html';
    }, 1500);
}

function handleRecruiterForgotPassword(e) {
    e.preventDefault();
    
    const email = document.getElementById('recruiterForgotEmail').value;
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    btnText.textContent = 'Sending...';
    btnLoader.classList.remove('hidden');
    submitBtn.disabled = true;
    
    // Simulate password reset (replace with actual API call)
    setTimeout(() => {
        showToast('Reset link sent to your email!', 'success');
        showRecruiterForm('login');
        
        // Reset button state
        btnText.textContent = 'Send Reset Link';
        btnLoader.classList.add('hidden');
        submitBtn.disabled = false;
    }, 1500);
}

function handleRecruiterGuestLogin() {
    const guestBtn = document.getElementById('recruiterGuestLoginBtn');
    const btnText = guestBtn.querySelector('.btn-text');
    const btnLoader = guestBtn.querySelector('.btn-loader');
    
    btnText.textContent = 'Entering guest mode...';
    btnLoader.classList.remove('hidden');
    guestBtn.disabled = true;
    
    setTimeout(() => {
        localStorage.setItem('recruiterGuestMode', 'true');
        localStorage.setItem('recruiterData', JSON.stringify({
            name: 'Guest User',
            company: 'Guest Mode',
            email: 'guest@example.com'
        }));
        
        showToast('Entered guest mode successfully!', 'success');
        window.location.href = 'recruiter-dashboard.html';
    }, 1000);
}

// Recruiter Dashboard Functions
function initRecruiterDashboard() {
    // Check authentication
    const token = localStorage.getItem('recruiterToken');
    const guestMode = localStorage.getItem('recruiterGuestMode');
    const recruiterData = localStorage.getItem('recruiterData');
    
    if (!token && !guestMode) {
        window.location.href = 'recruiter-auth.html';
        return;
    }
    
    // Set global state
    recruiterState.isAuthenticated = !!token;
    recruiterState.isGuestMode = !!guestMode;
    recruiterState.recruiterData = recruiterData ? JSON.parse(recruiterData) : null;
    
    // Setup guest mode
    if (guestMode) {
        setupGuestMode();
    }
    
    // Load data
    loadRecruiterData();
    
    // Setup navigation
    setupNavigation();
    
    // Setup modals
    setupModals();
    
    // Setup forms
    setupForms();
    
    // Update UI
    updateRecruiterInfo();
    updateAnalytics();
    renderJobs();
    renderApplications();
}

function setupGuestMode() {
    const dashboard = document.querySelector('.recruiter-dashboard');
    const guestBanner = document.getElementById('guestModeBanner');
    
    if (dashboard) {
        dashboard.classList.add('guest-mode');
    }
    
    if (guestBanner) {
        guestBanner.classList.remove('hidden');
    }
    
    // Disable certain features in guest mode
    const createJobBtn = document.getElementById('createJobBtn');
    if (createJobBtn) {
        createJobBtn.disabled = true;
        createJobBtn.title = 'Disabled in guest mode';
    }
    
    // Setup upgrade button
    const upgradeBtn = document.getElementById('upgradeToFullBtn');
    if (upgradeBtn) {
        upgradeBtn.addEventListener('click', () => {
            localStorage.removeItem('recruiterGuestMode');
            window.location.href = 'recruiter-auth.html';
        });
    }
}

function loadRecruiterData() {
    if (recruiterState.isGuestMode) {
        recruiterState.jobs = demoData.jobs;
        recruiterState.applications = demoData.applications;
    } else {
        // Load real data from API (mock for now)
        recruiterState.jobs = demoData.jobs;
        recruiterState.applications = demoData.applications;
    }
}

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetSection = link.dataset.section;
            
            // Update active states
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Show target section
            contentSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSection) {
                    section.classList.add('active');
                }
            });
        });
    });
}

function setupModals() {
    // Create job modal
    const createJobBtn = document.getElementById('createJobBtn');
    const createJobModal = document.getElementById('createJobModal');
    const closeCreateJobModal = document.getElementById('closeCreateJobModal');
    
    if (createJobBtn && !recruiterState.isGuestMode) {
        createJobBtn.addEventListener('click', () => {
            createJobModal.classList.remove('hidden');
        });
    }
    
    if (closeCreateJobModal) {
        closeCreateJobModal.addEventListener('click', () => {
            createJobModal.classList.add('hidden');
        });
    }
    
    // Close modal on backdrop click
    if (createJobModal) {
        createJobModal.addEventListener('click', (e) => {
            if (e.target === createJobModal || e.target.classList.contains('modal-backdrop')) {
                createJobModal.classList.add('hidden');
            }
        });
    }
}

function setupForms() {
    // Create job form
    const createJobForm = document.getElementById('createJobForm');
    if (createJobForm) {
        createJobForm.addEventListener('submit', handleCreateJob);
    }
    
    // Company profile form
    const companyProfileForm = document.getElementById('companyProfileForm');
    if (companyProfileForm) {
        companyProfileForm.addEventListener('submit', handleCompanyProfileUpdate);
    }
    
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
}

function updateRecruiterInfo() {
    const recruiterName = document.getElementById('recruiterName');
    const recruiterCompany = document.getElementById('recruiterCompany');
    
    if (recruiterState.recruiterData) {
        if (recruiterName) {
            recruiterName.textContent = recruiterState.recruiterData.name;
        }
        if (recruiterCompany) {
            recruiterCompany.textContent = recruiterState.recruiterData.company;
        }
    }
}

function updateAnalytics() {
    const analytics = recruiterState.isGuestMode ? demoData.analytics : {
        activeJobs: recruiterState.jobs.filter(job => job.status === 'active').length,
        totalApplications: recruiterState.applications.length,
        shortlisted: recruiterState.applications.filter(app => app.status === 'shortlisted').length,
        hired: recruiterState.applications.filter(app => app.status === 'hired').length
    };
    
    // Update analytics cards
    updateElement('activeJobsCount', analytics.activeJobs);
    updateElement('totalApplicationsCount', analytics.totalApplications);
    updateElement('shortlistedCount', analytics.shortlisted);
    updateElement('hiredCount', analytics.hired);
}

function renderJobs() {
    const jobsList = document.getElementById('jobsList');
    if (!jobsList) return;
    
    const jobs = recruiterState.jobs;
    
    if (jobs.length === 0) {
        jobsList.innerHTML = '<p class="placeholder-text">No jobs posted yet.</p>';
        return;
    }
    
    jobsList.innerHTML = jobs.map(job => `
        <div class="job-card">
            <div class="job-header">
                <h3 class="job-title">${job.title}</h3>
                <span class="job-status ${job.status}">${job.status}</span>
            </div>
            <div class="job-meta">
                <span><i class="fas fa-building"></i> ${job.department}</span>
                <span><i class="fas fa-map-marker-alt"></i> ${job.location}</span>
                <span><i class="fas fa-clock"></i> ${job.type}</span>
            </div>
            <p>${job.salary ? `Salary: ${job.salary}` : ''}</p>
            <div class="job-stats">
                <div class="job-stat">
                    <i class="fas fa-users"></i>
                    <span>${job.applications} applications</span>
                </div>
                <div class="job-stat">
                    <i class="fas fa-calendar"></i>
                    <span>Posted: ${formatDate(job.posted)}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function renderApplications() {
    const applicationsList = document.getElementById('applicationsList');
    if (!applicationsList) return;
    
    const applications = recruiterState.applications;
    
    if (applications.length === 0) {
        applicationsList.innerHTML = '<p class="placeholder-text">No applications received yet.</p>';
        return;
    }
    
    applicationsList.innerHTML = applications.map(app => {
        const job = recruiterState.jobs.find(j => j.id === app.jobId);
        return `
            <div class="application-card">
                <div class="application-header">
                    <div class="candidate-info">
                        <div class="candidate-avatar">${getInitials(app.candidateName)}</div>
                        <div class="candidate-details">
                            <h4>${app.candidateName}</h4>
                            <p>${app.email}</p>
                        </div>
                    </div>
                    <span class="application-status ${app.status}">${app.status}</span>
                </div>
                <div class="application-details">
                    <div class="application-detail">
                        <span>Phone</span>
                        <span>${app.phone}</span>
                    </div>
                    <div class="application-detail">
                        <span>Experience</span>
                        <span>${app.experience}</span>
                    </div>
                    <div class="application-detail">
                        <span>Education</span>
                        <span>${app.education}</span>
                    </div>
                    <div class="application-detail">
                        <span>Applied For</span>
                        <span>${job ? job.title : 'Unknown Position'}</span>
                    </div>
                </div>
                <div class="application-actions">
                    <button class="secondary-btn" onclick="viewResume('${app.resume}')">View Resume</button>
                    ${!recruiterState.isGuestMode ? `
                        <button class="primary-btn" onclick="updateApplicationStatus(${app.id}, 'shortlisted')">Shortlist</button>
                        <button class="danger-btn" onclick="updateApplicationStatus(${app.id}, 'rejected')">Reject</button>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');
}

function handleCreateJob(e) {
    e.preventDefault();
    
    if (recruiterState.isGuestMode) {
        showToast('Cannot create jobs in guest mode', 'error');
        return;
    }
    
    const jobData = {
        id: Date.now(),
        title: document.getElementById('jobTitle').value,
        department: document.getElementById('jobDepartment').value,
        type: document.getElementById('jobType').value,
        location: document.getElementById('jobLocation').value,
        salary: document.getElementById('jobSalary').value,
        description: document.getElementById('jobDescription').value,
        requirements: document.getElementById('jobRequirements').value,
        status: 'active',
        applications: 0,
        posted: new Date().toISOString().split('T')[0]
    };
    
    // Add to jobs list
    recruiterState.jobs.push(jobData);
    
    // Close modal and reset form
    document.getElementById('createJobModal').classList.add('hidden');
    e.target.reset();
    
    // Update UI
    renderJobs();
    updateAnalytics();
    
    showToast('Job posted successfully!', 'success');
}

function handleCompanyProfileUpdate(e) {
    e.preventDefault();
    
    if (recruiterState.isGuestMode) {
        showToast('Cannot update profile in guest mode', 'error');
        return;
    }
    
    showToast('Profile updated successfully!', 'success');
}

function handleLogout() {
    localStorage.removeItem('recruiterToken');
    localStorage.removeItem('recruiterGuestMode');
    localStorage.removeItem('recruiterData');
    localStorage.removeItem('recruiterRememberMe');
    
    window.location.href = 'recruiter-auth.html';
}

function updateApplicationStatus(applicationId, newStatus) {
    const application = recruiterState.applications.find(app => app.id === applicationId);
    if (application) {
        application.status = newStatus;
        renderApplications();
        updateAnalytics();
        showToast(`Application ${newStatus} successfully!`, 'success');
    }
}

function viewResume(resumeFile) {
    showToast(`Opening resume: ${resumeFile}`, 'info');
}

// Utility Functions
function updateElement(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value;
    }
}

function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function showToast(message, type = 'info') {
    const toast = document.getElementById('recruiterToast');
    if (!toast) return;
    
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.remove('hidden');
    
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

function setupPasswordToggles() {
    const toggleButtons = document.querySelectorAll('.password-toggle');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const input = button.previousElementSibling;
            const type = input.type === 'password' ? 'text' : 'password';
            input.type = type;
            button.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
        });
    });
}

function setupPasswordStrength() {
    const passwordInputs = document.querySelectorAll('input[type="password"][id*="Password"]');
    
    passwordInputs.forEach(input => {
        input.addEventListener('input', () => {
            const strength = calculatePasswordStrength(input.value);
            updatePasswordStrength(input, strength);
        });
    });
}

function calculatePasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    
    return strength;
}

function updatePasswordStrength(input, strength) {
    const strengthContainer = input.closest('.form-group').querySelector('.password-strength');
    if (!strengthContainer) return;
    
    const strengthBar = strengthContainer.querySelector('.strength-fill');
    const strengthText = strengthContainer.querySelector('.strength-text');
    
    const strengthLevels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
    const strengthColors = ['#ef4444', '#f59e0b', '#eab308', '#84cc16', '#22c55e', '#10b981'];
    const strengthWidths = ['16.66%', '33.33%', '50%', '66.66%', '83.33%', '100%'];
    
    if (strength > 0) {
        strengthBar.style.width = strengthWidths[strength - 1];
        strengthBar.style.backgroundColor = strengthColors[strength - 1];
        strengthText.textContent = strengthLevels[strength - 1];
        strengthText.style.color = strengthColors[strength - 1];
    } else {
        strengthBar.style.width = '0';
        strengthText.textContent = 'Password strength';
        strengthText.style.color = '';
    }
}
