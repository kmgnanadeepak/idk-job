# Smart College Placement & Job Portal (with AI Resume Analyzer)

Fully responsive, glassmorphic web app built with **HTML, CSS, JavaScript** and integrated with the **Gemini API** for AI-driven resume analysis.

## Features

- **Glassmorphism UI** with gradients, frosted-glass cards and smooth hover animations
- **Navigation bar** with sections: Home, Jobs, Companies, Resume Analyzer, Applied Jobs, Contact
- **Dark / Light glass theme toggle** (persisted in `localStorage`)
- **Hero search** with real-time job filtering
- **Job categories** (IT, Core, Internships, Remote) with dynamic JS filtering
- **Job listings** with glass cards and "Apply Now" modal
- **Applied Jobs module**:
  - Saves applications in `localStorage`
  - Shows job title, company and applied date
- **Placement dashboard** with animated counters:
  - Companies Visited
  - Students Placed
  - Highest Package (LPA)
- **AI Resume Analyzer** (Gemini):
  - Upload or paste resume text
  - Sends structured prompt to Gemini
  - Expects **strict JSON** response:

    ```json
    {
      "extracted_skills": [],
      "recommended_domain": "",
      "recommended_missing_skills": [],
      "match_score": "",
      "improvement_suggestions": []
    }
    ```

  - Displays extracted skills, missing skills, improvement suggestions
  - Uses `recommended_domain` and `match_score` to:
    - Show best suited domain
    - Recommend relevant jobs from the job list

## How to Run

1. Place all files in a folder (already done in this project).
2. Open `index.html` directly in your browser **or** use a local HTTP server (recommended, especially for some browsers' file security rules).
3. The app will load with default mock job data and empty `Applied Jobs`.

## Gemini API Setup

1. Go to the Gemini developer console and create an API key.
2. In the **Resume Analyzer** section:
   - Paste your resume text (or upload a `.txt` file).
   - Enter your **Gemini API key** in the input field.
   - Click **"Analyze Resume with Gemini"**.
3. The API key is **never stored on a server**; it stays only in this browser session.

> If Gemini sometimes wraps JSON in Markdown code fences, the script automatically strips them and parses the JSON.

## Notes

- Jobs and applications are intentionally stored in `localStorage` only; there is no backend.
- You can extend the job list in `script.js` and the design tokens in `style.css` to adapt the portal to your college branding.

