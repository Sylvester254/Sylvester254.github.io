/**
 * Site content lives here, separate from rendering logic in main.js.
 * Edit this file to update skills, projects, or experience. No HTML editing required.
 *
 * SKILLS is a two-level tree: top-level categories drive the default radar
 * chart; each category's `children` are the sub-skills shown when a visitor
 * zooms into that category. `short` is the compact axis label used on the
 * chart itself; `label` is the full name used in the table.
 */

const SKILLS = [
  {
    label: "AI / LLM Systems", short: "AI / LLM", value: 5,
    blurb: "RAG, evaluation, and agent tooling across cloud and local models.",
    children: [
      { label: "RAG Pipelines", short: "RAG", value: 5 },
      { label: "LLM Evaluation & RLHF", short: "Eval / RLHF", value: 5 },
      { label: "Prompt & Agent Tooling", short: "Agents", value: 5 },
      { label: "OpenAI / Anthropic APIs", short: "Cloud APIs", value: 5 },
      { label: "Local Models (Ollama, VLMs)", short: "Local Models", value: 4 },
      { label: "Embeddings & Vector Search", short: "Vector Search", value: 4 },
    ],
  },
  {
    label: "Data Infrastructure", short: "Data Infra", value: 5,
    blurb: "The layer that decides whether a dataset is usable at scale.",
    children: [
      { label: "Batch Pipelines (Celery)", short: "Batch Jobs", value: 5 },
      { label: "Schema & Data Modeling", short: "Schemas", value: 5 },
      { label: "Dataset Export (Parquet, JSONL)", short: "Export", value: 5 },
      { label: "Queues & Caching (Redis)", short: "Redis", value: 4 },
      { label: "Provenance & Governance", short: "Governance", value: 4 },
    ],
  },
  {
    label: "Backend & APIs", short: "Backend", value: 5,
    blurb: "Four years of production Python services and REST APIs.",
    children: [
      { label: "FastAPI", short: "FastAPI", value: 5 },
      { label: "Flask", short: "Flask", value: 5 },
      { label: "REST Design & Documentation", short: "REST", value: 5 },
      { label: "SQL (MySQL, PostgreSQL, ORM)", short: "SQL / ORM", value: 5 },
      { label: "Async Python", short: "Async", value: 5 },
      { label: "Auth (JWT, sessions)", short: "Auth", value: 5 },
    ],
  },
  {
    label: "Computer Vision", short: "Computer Vision", value: 4,
    blurb: "Landmark detection and measurement at clinical precision.",
    children: [
      { label: "Landmark Detection (MediaPipe)", short: "Landmarks", value: 5 },
      { label: "Biometric Measurement", short: "Biometrics", value: 4 },
      { label: "OpenCV / Image Processing", short: "OpenCV", value: 4 },
      { label: "VLM Captioning Pipelines", short: "VLM Captioning", value: 4 },
      { label: "Face Recognition (DeepFace)", short: "DeepFace", value: 3 },
    ],
  },
  {
    label: "DevOps & Linux Ops", short: "DevOps", value: 4,
    blurb: "Self-managed servers, services, and a home-lab VM cluster.",
    children: [
      { label: "Linux Servers & systemd", short: "Linux", value: 5 },
      { label: "Nginx / uWSGI", short: "Nginx", value: 4 },
      { label: "Docker", short: "Docker", value: 4 },
      { label: "KVM Virtualization", short: "KVM", value: 4 },
      { label: "Monitoring & Logging", short: "Monitoring", value: 4 },
      { label: "CI / CD", short: "CI/CD", value: 4 },
    ],
  },
  {
    label: "Automation & Scraping", short: "Automation", value: 4,
    blurb: "Resilient acquisition pipelines and packaged desktop tooling.",
    children: [
      { label: "HTTP Scraping (aiohttp)", short: "HTTP Clients", value: 5 },
      { label: "Browser Automation (Selenium)", short: "Selenium", value: 4 },
      { label: "Rate-Limit & IP Rotation", short: "IP Rotation", value: 4 },
      { label: "Desktop Apps (PyQt5)", short: "PyQt5", value: 4 },
      { label: "Packaging (PyInstaller)", short: "Packaging", value: 4 },
    ],
  },
];

// Concise summary shown by default; `detail` is revealed on expand.
// `viz` selects the animated glyph rendered on the card (see VIZ in main.js).
const PROJECTS = [
  {
    index: "01",
    name: "Dataset Factory for VLM Pretraining",
    scale: "3M images",
    viz: "pipeline",
    summary: "A FastAPI, Celery, MySQL, and Redis pipeline that turns a multi-million-image corpus into structured datasets for vision-language pretraining, fine-tuning, and RAG.",
    tags: ["FastAPI", "Celery", "Redis", "MySQL", "Wikidata", "Getty TGN"],
    detail: [
      "Architected distributed batch-processing workflows to convert millions of images into captioned, annotated, metadata-rich training records.",
      "Built LLM-driven metadata generation for high-variance captions, style descriptions, and geographic/period context.",
      "Designed normalized schemas covering VLM pretraining, fine-tuning, RAG retrieval, VQA pairs, and embedding-ready text chunks.",
      "Integrated Getty TGN, GeoNames, and Wikidata for authority resolution, attaching proof-based identifiers to places, artists, and styles.",
      "Shipped export pipelines producing Parquet, JSONL, and WebDataset-ready releases with deterministic train/validation/test splits.",
      "Built governance tooling for provenance tracking, rights metadata, and public-domain verification.",
    ],
  },
  {
    index: "02",
    name: "AI Facial Analysis & Aesthetic Assessment Platform",
    scale: "100+ measurements",
    viz: "face",
    summary: "A computer-vision microservice combining biometric measurement with a RAG-powered analysis layer: landmark detection, symmetry and proportion scoring, and structured clinical-style output.",
    tags: ["FastAPI", "OpenCV", "MediaPipe", "FAISS", "PostgreSQL", "Docker"],
    detail: [
      "Built landmark-based feature analysis across 12+ facial regions using 500+ detected points.",
      "Implemented quantitative assessments: symmetry, proportion, dimorphism, and averageness via Procrustes analysis.",
      "Combined a FAISS vector index with reranking for a hybrid-search knowledge layer feeding structured, JSON-formatted assessments.",
      "Async FastAPI backend with SQLAlchemy/PostgreSQL, Docker deployment, and result caching for near-real-time responses.",
      "Redesigned 2D/3D landmark workflows elsewhere in the same domain, cutting end-to-end inference from 8s to 2s per face.",
    ],
  },
  {
    index: "03",
    name: "Cultural Heritage Data Acquisition Toolkit",
    scale: "800K+ images",
    viz: "crawler",
    summary: "Seven site-specific scraping pipelines collecting public-domain artwork and metadata from national libraries and museums across six countries.",
    tags: ["Python", "Selenium", "aiohttp", "ThreadPoolExecutor", "PyInstaller"],
    detail: [
      "Targeted institutions including the German Digital Library, National Library of Norway, Finna (Finland), the Smithsonian, Paris Museums, and the Qatar Digital Library.",
      "Staged ETL architecture per institution: URL generation, dynamic-page extraction, download automation, and retry/recovery.",
      "Rebuilt the highest-volume scraper as a pure-HTTP client instead of Selenium, a roughly 50x throughput improvement.",
      "Pooled and reused headless-Chrome WebDriver instances across long-running jobs to cut startup overhead and improve stability.",
      "Added resume-from-failure workflows, filename normalization, and PyInstaller packaging for unattended Windows deployment.",
    ],
  },
  {
    index: "04",
    name: "Librifly: Literature Publishing Platform",
    scale: "74M records",
    viz: "library",
    summary: "A Flask/MySQL platform managing a 74-million-record library of books, poems, and articles, with PDF/EPUB generation and full-text search.",
    tags: ["Flask", "MySQL", "Celery", "Redis", "Sphinx Search", "ReportLab"],
    detail: [
      "Optimized MySQL indexing and integrated SphinxSearch, cutting query time by 30% across large-scale search workflows.",
      "Built REST endpoints (Swagger-documented) for external site integrations, plus PDF/EPUB generation via ReportLab and EbookLib.",
      "Ran Celery/Redis background workers for heavy generation tasks: anthology exports, batch posters, and bulk PDF/EPUB jobs.",
      "Managed the Ubuntu server this ran on: Nginx, systemd services, self-hosted Nextcloud, automated backups, and health monitoring.",
    ],
  },
  {
    index: "05",
    name: "Desktop Tooling Suite for Dataset Captioning",
    scale: "5 tools",
    viz: "desktop",
    summary: "A family of PyQt5 desktop applications for local and cloud LLM/VLM-powered dataset processing: structured captioning, batch APIs, and metadata operations.",
    tags: ["PyQt5", "Ollama", "OpenAI Batch API", "Moondream", "ExifTool"],
    detail: [
      "TextOllama & Textgen: local (Ollama) and cloud (OpenAI Batch API) text-processing pipelines with schema-validated JSON outputs and checkpoint/resume.",
      "ImagesGPT: large-scale image captioning over the OpenAI Batch API, including a zero-memory streaming mode that holds constant ~100MB usage regardless of collection size.",
      "Moondream pipeline: local/cloud VLM processing supporting captioning, visual QA, object detection, and point localization.",
      "caption_fusion: CSV-merge and ExifTool-based metadata-writing utility for operationalizing caption datasets into image files.",
      "Shared patterns across all five: multi-threaded batch execution, adaptive retry/backoff, and PyInstaller packaging for non-technical users.",
    ],
  },
  {
    index: "06",
    name: "Automated Astronomical Sky Map Generator",
    scale: "Personal project",
    viz: "sky",
    summary: "A batch system that drives Stellarium via its REST API to generate metadata-rich sky maps for locations worldwide, architected to grow into a tiered web service.",
    tags: ["Python", "Stellarium API", "GeoNames", "ExifTool", "Celery"],
    detail: [
      "Smart state management reads current Stellarium settings before changing them, avoiding redundant toggles across long batch runs.",
      "Dynamic location system pulls from GeoNames with population filters, alongside static CSV presets for world regions.",
      "Embeds rich IPTC metadata via ExifTool: location, time, and seasonal astronomical context.",
      "Designed (not yet built) a thumbnail-first web service: fast 400px previews with on-demand full-resolution generation through a Celery/Redis queue.",
    ],
  },
  {
    index: "07",
    name: "LLM & Agent Evaluation Work",
    scale: "150+ tools",
    viz: "evalviz",
    summary: "Benchmark design and SFT/RLHF trajectory work for LLM and agent-evaluation projects, including a privacy-first agent platform.",
    tags: ["Docker", "pytest", "RLHF", "Agent Evaluation"],
    detail: [
      "Produced SFT and RLHF training trajectories covering 150+ tools across trust tiers and data-sensitivity levels.",
      "Evaluated agent outputs on correctness, privacy compliance, completeness, and efficiency against standardized rubrics.",
      "Documented recurring failure modes (over-disclosure, missing elicitation, jailbreak compliance) that fed preference-pair construction.",
      "Separately, designed and validated benchmark tasks for evaluating LLMs in simulated Linux terminal environments, with Dockerized scoring harnesses.",
    ],
  },
  {
    index: "08",
    name: "Home-Lab Compute Cluster",
    scale: "3 hosts / 30+ VMs",
    viz: "homelab",
    summary: "A self-managed KVM virtualization cluster across three physical machines: the distributed compute, shared storage, and rotating network egress behind the scraping and AI batch workloads.",
    tags: ["KVM", "libvirt", "NFS", "systemd", "OpenVPN", "Ubuntu Server"],
    detail: [
      "Provisioned 30+ Ubuntu 22.04 VMs across three hosts (an i7/RTX 4060 box, a 64GB Ryzen 7, and a 64GB i5), each deliberately thin (3GB RAM, one vCPU, minimal install) to pack 10+ parallel workers per machine.",
      "Built shared storage with NFS exports and VirtioFS mounts so VMs work a common corpus without duplicating terabytes of data.",
      "Automated VPN egress with systemd services rotating across TunnelBear, Windscribe, and Surfshark endpoints, giving each VM its own exit IP to respect per-IP rate limits.",
      "Handled drive migrations (NTFS to ext4), qcow2 sparse allocation and resizing, fstab automation, and permission schemes for jobs that run unattended for days.",
      "Self-hosted Nextcloud behind Nginx with Let's Encrypt certificates, plus automated MySQL backup routines.",
      "The cluster's output: 50M+ pieces of generated text content (articles, stories, haikus, keywords, metadata) through Groq and Vertex AI.",
    ],
  },
];

const MORE_BUILDS = [
  { name: "distroLab", desc: "A probability-distribution helper library published to PyPI, with unit tests." },
  { name: "OpenClaw Job Discovery Agent", desc: "An autonomous workflow that scores remote roles against custom fit criteria and syncs a Google Sheets dashboard." },
  { name: "RAG Ecommerce Chatbot", desc: "LangChain + OpenAI retrieval chatbot that resolved 70% of inbound customer queries autonomously." },
  { name: "Invoicer App", desc: "A Dash + ReportLab + SQLite tool for generating and tracking auto-filled PDF invoices." },
  { name: "Freelancer Income Tracker", desc: "A PySide6 + SQLite desktop app for recording freelance income and payment trends." },
  { name: "PrintAI", desc: "An AI art-generation storefront: Stability API for images, Printful for print-on-demand fulfillment, Stripe for payments, Google/Facebook OAuth." },
  { name: "AI Writer Chrome Extension", desc: "A GPT-powered writing assistant extension with Google OAuth sign-in and Stripe-billed subscriptions." },
  { name: "Missing-Children Image Search", desc: "A Django + DeepFace face-recognition service matching submitted photos against a database of missing children." },
  { name: "Price Reader OCR", desc: "A PaddleOCR + Flask tool that catalogs products and prices from photos of price tags into Airtable." },
  { name: "Personal Weather Station", desc: "A Raspberry Pi Pico W + MicroPython sensor rig reporting live local weather." },
];

const TIMELINE = [
  { role: "AI Dataset Infrastructure Engineer", org: "Penta Springs · DataCivi Project", period: "Jan 2026 – May 2026", note: "3M-image dataset factory for VLM pretraining and RAG workflows." },
  { role: "OpenClaw CUA Trajectory Specialist", org: "Turing", period: "Apr 2026 – Jun 2026", note: "SFT/RLHF trajectories across 150+ agent tools." },
  { role: "LLM Trainer / Benchmark Developer", org: "Turing", period: "Aug 2025 – Oct 2025", note: "Multimodal evaluation and containerized benchmark design." },
  { role: "Python Developer", org: "QOVES", period: "Feb 2024 – Jun 2025", note: "FastAPI computer-vision microservice; cut inference from 8s to 2s per face." },
  { role: "Software Engineer", org: "Penta Springs · Librifly Platform", period: "Jun 2023 – Aug 2025", note: "Flask/MySQL platform, 74M-record library, server ops." },
  { role: "LLM Trainer · Instruction Following", org: "Freelance", period: "Oct 2024 – Dec 2024", note: "Multi-turn benchmark tasks and rubric-based evaluation materials." },
  { role: "Freelance Software Engineer", org: "Independent", period: "Oct 2022 – May 2023", note: "RAG chatbot, third-party API integrations, cultural-heritage scraping toolkit." },
  { role: "Technical Intern", org: "Ministry of Interior, Kenya", period: "Jul 2022 – Sep 2022", note: "Hardware/software support for 50+ staff." },
];
