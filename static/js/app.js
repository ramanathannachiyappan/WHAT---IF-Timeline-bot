/**
 * WORLD BEYOND REALITY
 * Premium Alternate History Simulator
 */

// DOM Elements
const elements = {
    stars: document.getElementById('stars'),
    particles: document.getElementById('particles'),
    mouseGlow: document.getElementById('mouseGlow'),
    landingSection: document.getElementById('landingSection'),
    loadingSection: document.getElementById('loadingSection'),
    resultsSection: document.getElementById('resultsSection'),
    questionInput: document.getElementById('questionInput'),
    simulateBtn: document.getElementById('simulateBtn'),
    backBtn: document.getElementById('backBtn'),
    newSimBtn: document.getElementById('newSimBtn'),
    progressFill: document.getElementById('progressFill'),
    displayQuestion: document.getElementById('displayQuestion'),
    timeline: document.getElementById('timeline'),
    worldChanges: document.getElementById('worldChanges'),
    dailyLife: document.getElementById('dailyLife'),
    indiaContent: document.getElementById('indiaContent'),
    butterflyFlow: document.getElementById('butterflyFlow'),
    gaugeFill: document.getElementById('gaugeFill'),
    scoreNumber: document.getElementById('scoreNumber'),
    scoreDetails: document.getElementById('scoreDetails'),
    futureCards: document.getElementById('futureCards'),
    answerContent: document.getElementById('answerContent')
};

// Initialize Lucide icons
lucide.createIcons();

// ============================================
// Star Field Generation
// ============================================

function createStars() {
    const starCount = 200;
    const container = elements.stars;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';

        const size = Math.random() * 3 + 1;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 5;

        star.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${x}%;
            top: ${y}%;
            --duration: ${duration}s;
            animation-delay: ${delay}s;
            opacity: ${Math.random() * 0.5 + 0.3};
        `;

        container.appendChild(star);
    }
}

// ============================================
// Floating Particles
// ============================================

function createParticles() {
    const particleCount = 30;
    const container = elements.particles;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const x = Math.random() * 100;
        const y = Math.random() * 100 + 100;
        const size = Math.random() * 4 + 2;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 10;

        particle.style.cssText = `
            left: ${x}%;
            top: ${y}%;
            width: ${size}px;
            height: ${size}px;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            box-shadow: 0 0 ${size * 2}px currentColor;
        `;

        container.appendChild(particle);
    }
}

// ============================================
// Mouse Glow Effect
// ============================================

function initMouseGlow() {
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        elements.mouseGlow.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        elements.mouseGlow.style.opacity = '0';
    });

    function animateGlow() {
        const dx = mouseX - currentX;
        const dy = mouseY - currentY;

        currentX += dx * 0.1;
        currentY += dy * 0.1;

        elements.mouseGlow.style.left = currentX + 'px';
        elements.mouseGlow.style.top = currentY + 'px';

        requestAnimationFrame(animateGlow);
    }

    animateGlow();
}

// ============================================
// Suggested Prompts
// ============================================

function initSuggestedPrompts() {
    const promptChips = document.querySelectorAll('.prompt-chip');

    promptChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const prompt = chip.dataset.prompt;
            elements.questionInput.value = prompt;
            elements.questionInput.focus();

            // Visual feedback
            chip.style.transform = 'scale(0.95)';
            setTimeout(() => {
                chip.style.transform = '';
            }, 150);
        });
    });
}

// ============================================
// API Simulation
// ============================================

let currentQuestion = '';
let currentAnswer = '';
displayResults
async function simulateHistory(question) {
    currentQuestion = question;
    console.log("simulateHistory started");

    // Show loading
    showSection('loading');

    // Animate progress
    await animateProgress();

    // Make API call
    try {
        const response = await fetch('/simulate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question: question })
        });

        if (!response.ok) {
            throw new Error('Simulation failed');
        }

        const data = await response.json();
        currentAnswer = data.answer;

        // Process and display results
        await displayResults(currentAnswer);

    } catch (error) {
        console.error('Error:', error);
        // Use demo data if API fails
        currentAnswer = generateDemoAnswer(question);
        await displayResults(currentAnswer);
    }
}

function generateDemoAnswer(question) {
    // Generate contextual demo content based on question
    const events = question.toLowerCase();

    if (events.includes('roman') || events.includes('empire')) {
        return generateRomanEmpireAnswer();
    } else if (events.includes('electricity') || events.includes('egypt')) {
        return generateEgyptAnswer();
    } else if (events.includes('india') || events.includes('coloni')) {
        return generateIndiaAnswer();
    } else {
        return generateGenericAnswer(question);
    }
}

function generateRomanEmpireAnswer() {
    return {
        timeline: [
            { year: "476 CE", title: "Rome Stands Strong", desc: "Odoacer chooses integration over conquest, swearing allegiance to the Eastern Empire, preserving Roman infrastructure and governance." },
            { year: "550 CE", title: "Pan-European Renaissance", desc: "The unified empire sparks an early technological revolution, with Roman engineering reaching unprecedented heights." },
            { year: "800 CE", title: "Age of Exploration Begins", desc: "Roman ships reach the Americas 700 years early, establishing trade routes and cultural exchange." },
            { year: "1000 CE", title: "Global Empire", desc: "The Roman-Chinese alliance creates the first truly global civilization, eliminating the Dark Ages entirely." }
        ],
        worldChanges: [
            { icon: "building", title: "Architecture", text: "Modern cities still use Roman grid layouts, but they're now 1000 years more advanced with sustainable materials." },
            { icon: "scale", title: "Legal Systems", text: "Civil law evolved directly from Roman roots, creating more consistent global legal frameworks." },
            { icon: "globe", title: "Language", text: "Latin evolved into a global lingua franca, preventing language barriers in scientific collaboration." },
            { icon: "landmark", title: "Democracy", text: "Republican ideals spread earlier, creating stable democracies across continents by 1200 CE." }
        ],
        dailyLife: [
            { icon: "train", title: "Transportation", text: "Public transit networks connect every major city, a tradition since Roman roads." },
            { icon: "heart-pulse", title: "Healthcare", text: "Universal healthcare born from Roman public health traditions." },
            { icon: "graduation-cap", title: "Education", text: "Free education established in 3rd century, 97% literacy globally." },
            { icon: "home", title: "Housing", text: "Insulae evolved into sustainable apartment living for all classes." }
        ],
        india: [
            "The Gupta-Roman alliance (400-500 CE) prevented the Hun invasions, preserving India's golden age.",
            "Direct Indo-Roman trade created unprecedented prosperity, with Indian mathematics spreading West centuries earlier.",
            "Buddhist and Roman philosophy merged, creating a new school of thought that shaped modern ethics.",
            "Space technology emerged jointly from Rome-New Delhi collaboration by 1800 CE.",
            "Today, India is the eastern capital of the United Earth Federation."
        ],
        butterflyEffect: [
            "Rome Survives",
            "No Dark Ages",
            "Early Science",
            "Unified Earth",
            "Star Age"
        ],
        score: {
            overall: 73,
            details: [
                { label: "Historical Divergence", value: "85%" },
                { label: "Timeline Stability", value: "Moderate" },
                { label: "Humanitarian Impact", value: "Positive" },
                { label: "Probability Index", value: "23%" }
            ]
        },
        future: [
            { year: "2050", title: "Mars Settlement", text: "The Roman-Indian space program establishes the first colony on Mars." },
            { year: "2100", title: "Post-Scarcity", text: "Fusion power and automation create infinite abundance." },
            { year: "2200", title: "Galactic Reach", text: "First contact with intelligent life, unified Earth response." }
        ],
        fullAnswer: "In this alternate timeline, the Western Roman Empire never fell. When Odoacer marched on Rome in 476 CE, he made a fateful decision: instead of ending Roman rule, he integrated the Germanic peoples into the existing governance structure. The Senate continued meeting, Roman law evolved rather than collapsed, and Europe skipped what we call the 'Dark Ages'.\n\nBy 800 CE, a Roman-Chinese alliance created the first global civilization. Roman engineering combined with Chinese invention—paper, printing, gunpowder—accelerated humanity's progress centuries ahead of our timeline. The Americas were reached by Roman ships around 800 CE, not through conquest but through the same trade-based expansion that had always characterized Roman foreign policy.\n\nThe impact on India was profound. The Gupta Empire's alliance with Rome (450-550 CE) stabilized both regions against nomadic invasions. Indo-Roman universities in Taxila and Alexandria preserved and expanded knowledge continuously. When Islamic scholars later made their contributions, they added to a flourishing tradition rather than preserving its remnants.\n\nToday in this timeline, Earth is governed by the Senatus Terranus—a federal republic with roots in Roman constitutionalism but shaped by millennia of Indian, African, Asian, and Indigenous input. The average lifespan is 150 years, disease has been largely eliminated, and humanity has colonies throughout the solar system. The divergence probability is estimated at 23%—meaning if we could simulate 100 Earths, about 23 might have taken this path."
    };
}

function generateEgyptAnswer() {
    return {
        timeline: [
            { year: "3000 BCE", title: "Electric Dreams", desc: "Baghdad Battery-like devices discovered in Thebes, sparking early electrochemistry experiments." },
            { year: "2500 BCE", title: "Pyramid Power", desc: "The Great Pyramid generates electricity using flowing Nile water and copper plates—a power plant." },
            { year: "1500 BCE", title: "Golden Age", desc: "Electric lighting illuminates Egyptian cities. Night becomes productive time for the first time in history." },
            { year: "500 BCE", title: "Egyptian Renaissance", desc: "Electroplating, early motors, and communication devices spread along trade routes." }
        ],
        worldChanges: [
            { icon: "zap", title: "Energy", text: "Electricity powered civilization 4000 years early, accelerating every human endeavor." },
            { icon: "wrench", title: "Industry", text: "Manufacturing evolved with electric tools, mass production began in 2000 BCE." },
            { icon: "phone", title: "Communication", text: "Electric telegraphs connected empires by 1000 BCE." },
            { icon: "lightbulb", title: "Cities", text: "Illuminated cities enabled 24-hour culture, accelerating progress." }
        ],
        dailyLife: [
            { icon: "sun", title: "Work Hours", text: "Electric light eliminated the tyranny of the sun's cycle." },
            { icon: "thermometer", title: "Climate Control", text: "Electric cooling made deserts livable and pleasant." },
            { icon: "utensils", title: "Food Storage", text: "Electric refrigeration transformed food culture and health." },
            { icon: "book", title: "Literacy", text: "Night schools created universal literacy by 1500 BCE." }
        ],
        india: [
            "Egyptian technology reached India via Arabian Sea trade around 2000 BCE.",
            "The Indus Valley civilization electrified, creating the world's first grid-connected cities.",
            "Harappan engineers improved Egyptian designs, creating advanced storage batteries.",
            "The Vedas include treatises on electrical engineering and natural philosophy.",
            "Today India-Egypt is the heart of global fusion research."
        ],
        butterflyEffect: [
            "Early Electricity",
            "Light Revolution",
            "Accelerated Industry",
            "Space Age - 2000 BCE",
            "Post-Human by Now"
        ],
        score: {
            overall: 67,
            details: [
                { label: "Historical Divergence", value: "92%" },
                { label: "Timeline Stability", value: "Low", color: "warning" },
                { label: "Humanitarian Impact", value: "Transformational" },
                { label: "Probability Index", value: "7%" }
            ]
        },
        future: [
            { year: "1000 BCE", title: "Computing Age", text: "Electric computational devices emerge from Egyptian temples." },
            { year: "500 BCE", title: "Flight", text: "Electric airships connect global civilizations." },
            { year: "1 CE", title: "Space Age", text: "First rockets launch from Alexandria's great observatory." }
        ],
        fullAnswer: "In this electrified alternate history, an Egyptian artisan in Thebes around 3000 BCE discovered that certain clay jars with copper cylinders and iron rods could produce strange sensations—a mild electric shock. What we call the 'Baghdad Battery' was invented 3000 years earlier.\n\nWithin centuries, Egyptian pyramid engineers realized the structures could serve another purpose: water flowing through limestone channels could create piezoelectric effects. The Great Pyramid became the world's first power plant. By 2500 BCE, the walls of Thebes glowed with electric lamps powered by the Nile's flow.\n\nThis discovery accelerated human progress beyond recognition. Egyptian ships carried not just gold and grain but batteries, wires, and the knowledge of electromagnetism. By 1000 BCE, the Silk Road crackled with energy—literally—as electric communication networks connected Beijing to Alexandria.\n\nFor India, the impact was transformative. Harappan engineers, already masters of urban planning, integrated electricity into their famous sanitation systems. The Indus Valley became the first civilization with truly 24-hour cities. Night schools, factories, and markets created prosperity unimaginable in our timeline.\n\nIn this world, humanity reached the Information Age by 500 BCE. Today—what we call 2026—is a world of interstellar exploration, post-scarcity economics, and life extension therapies. The divergence probability is low (7%) because such early electricity required so many chance discoveries, but the cascade effects would have been civilization-defining."
    };
}

function generateIndiaAnswer() {
    return {
        timeline: [
            { year: "1600", title: "The Tables Turn", desc: "The Vijayanagara Empire, not the British East India Company, establishes trading posts in England." },
            { year: "1700", title: "Indian Century", desc: "Advanced Indian shipbuilding and textiles dominate global markets. Europe buys rather than conquers." },
            { year: "1857", title: "Western Independence", desc: "European states gain independence from Indian protectorates after centuries of trade dominance." },
            { year: "1947", title: "Modern Federation", desc: "The Global Bharat Federation forms as a voluntary union of 50+ nations." }
        ],
        worldChanges: [
            { icon: "ship", title: "Naval Power", text: "Indian shipbuilding created vessels 300 years ahead of European designs." },
            { icon: "indian-rupee", title: "Economics", text: "The global economy centers on the Indian Ocean rather than the Atlantic." },
            { icon: "book-open", title: "Education", text: "Nalanda-based education system spreads worldwide, creating the first global universities." },
            { icon: "scale", title: "Law", text: "Artha-shastra principles shape global legal systems rather than Roman law." }
        ],
        dailyLife: [
            { icon: "wifi", title: "Technology", text: "Digital tech evolved from Sanskrit programming languages, using Devanagari-based code." },
            { icon: "users", title: "Demographics", text: "Global South is majority-wealthy; Europe industrialized later under trade partnerships." },
            { icon: "leaf", title: "Environment", text: "Vedic environmental principles prevented the worst of the climate crisis." },
            { icon: "heart", title: "Healthcare", text: "Ayurveda-Hippocratic synthesis created holistic medicine 1000 years early." }
        ],
        india: [
            "India became the world's first post-industrial power, transitioning from manufacturing to knowledge economy in 1700.",
            "The caste system evolved into a merit-based guild system, eliminating hereditary barriers.",
            "Vedic mathematics combined with modern computing to create quantum computers by 1950.",
            "Today New Delhi hosts the United Nations of Earth, founded on principles from the Arthashastra.",
            "India's GDP is 50% of global output, with the highest per capita income on Earth."
        ],
        butterflyEffect: [
            "Indian Dominance",
            "No Colonization",
            "Different Wars",
            "Decolonized World Order",
            "Alternate Modernity"
        ],
        score: {
            overall: 58,
            details: [
                { label: "Historical Divergence", value: "78%" },
                { label: "Timeline Stability", value: "Moderate" },
                { label: "Humanitarian Impact", value: "Mixed" },
                { label: "Probability Index", value: "12%" }
            ]
        },
        future: [
            { year: "2050", title: "Quantum India", text: "Mumbai becomes the world's first quantum computing city, solving climate change." },
            { year: "2100", title: "Global Language", text: "Sanskrit-derived languages are spoken by 5 billion people." },
            { year: "2200", title: "Stellar Civilization", text: "Indian space vessels carry humanity to nearby star systems." }
        ],
        fullAnswer: "In this alternate timeline, the year 1600 didn't see the British setting up shop in India—instead, the Vijayanagara Empire established trading posts in England, Scotland, and Ireland. The technological and economic balance had tilted the other way.\n\nHow? Imagine if the Delhi Sultanate had invested more heavily in naval technology in the 1400s, creating ships that could cross oceans with ease. Imagine if the Kerala School of Mathematics had been funded like European royal projects, leading to early calculus and navigation tools that put India 100 years ahead in seafaring.\n\nBy 1600, it was Indian merchants who arrived in European ports seeking spices, textiles, and manufactured goods. The Portuguese and Dutch became regional competitors while India dominated global trade. The Industrial Revolution happened in Bengal first; Manchester became a supplier of raw materials to Indian factories.\n\nFor Europe, this meant a very different history. Without colonial extraction, European development was slower but less traumatic for indigenous peoples across the Americas, Africa, and Asia. The transatlantic slave trade never reached its historical scale. Europe's Renaissance drew more from direct contact with Indian scholars.\n\nIn this world, modern India has a population of 1.8 billion and a GDP four times larger than any other nation. English is still a global language—a legacy of Bengal's early tech dominance—but it coexists with Hindi, Sanskrit, and hundreds of regional languages. The United Nations of Earth meets in New Delhi, and the first words spoken on the Moon were in Sanskrit.\n\nDivergence probability: 12%. This scenario required several specific Indian technological and political choices that didn't historically occur."
    };
}

function generateGenericAnswer(question) {
    return {
        timeline: [
            { year: "Point of Divergence", title: "The Change Begins", desc: "A single decision creates a cascade of alternate historical events." },
            { year: "+50 years", title: "Ripples Spread", desc: "The initial change creates second-order effects across societies and technologies." },
            { year: "+100 years", title: "New World Order", desc: "Political boundaries, cultures, and economies have permanently shifted." },
            { year: "+200 years", title: "Alternate Present", desc: "The world is almost unrecognizable compared to our timeline." }
        ],
        worldChanges: [
            { icon: "globe", title: "Geography", text: "Borders, nations, and political unions developed differently." },
            { icon: "languages", title: "Culture", text: "Art, language, and traditions evolved along new paths." },
            { icon: "flask-conical", title: "Science", text: "Different research priorities and discoveries shaped technology." },
            { icon: "heart", title: "Society", text: "Social structures, values, and institutions transformed." }
        ],
        dailyLife: [
            { icon: "home", title: "Living", text: "Housing, family structures, and daily routines adapted." },
            { icon: "briefcase", title: "Work", text: "Economic systems and career paths shifted." },
            { icon: "graduation-cap", title: "Education", text: "Learning priorities and methods evolved differently." },
            { icon: "heart-pulse", title: "Health", text: "Medical knowledge and practices developed new traditions." }
        ],
        india: [
            "India's position in global affairs shifted significantly in this timeline.",
            "Trade relationships and cultural exchanges followed different patterns.",
            "The subcontinent's influence on world events expanded in new directions.",
            "Modern India's development trajectory changed substantially.",
            "Today India plays a different role in the international community."
        ],
        butterflyEffect: [
            "Original Event",
            "First Changes",
            "Ripple Effects",
            "Structural Shifts",
            "Alternate Reality"
        ],
        score: {
            overall: 45,
            details: [
                { label: "Historical Divergence", value: "Unknown" },
                { label: "Timeline Stability", value: "Variable" },
                { label: "Humanitarian Impact", value: "Uncertain" },
                { label: "Probability Index", value: "TBD" }
            ]
        },
        future: [
            { year: "2050", title: "Near Future", text: "The alternate timeline continues to diverge from our own." },
            { year: "2100", title: "Century Ahead", text: "Long-term consequences reshape human possibilities." },
            { year: "2200", title: "Distant Future", text: "The alternate world reaches destinations we can only imagine." }
        ],
        fullAnswer: `Your question about "${question}" opens fascinating possibilities for alternate history.\n\nIn every historical moment, countless small decisions interact to create what we call "what happened." But change one variable—mobilize a different army, fund a different research project, save a different life—and the cascade effects can transform everything.\n\nThis simulation explores those possibilities. It traces the initial divergence point, follows the butterfly effects through decades and centuries, and arrives at an alternate present that might have been.\n\nThe divergence probability varies greatly depending on the scenario. Some alternate histories require only small changes—a different diplomatic message, a disease that didn't spread—while others need larger divergences in technology, politics, or culture.\n\nEvery alternate history teaches us about our own: what we were, what we chose, and how different—and yet how similar—things might have been.`
    };
}

// ============================================
// Progress Animation
// ============================================

async function animateProgress() {
    return new Promise((resolve) => {
        let progress = 0;
        const steps = ['step1', 'step2', 'step3'];
        let currentStep = 0;

        const interval = setInterval(() => {
            progress += Math.random() * 15 + 5;

            if (progress >= 33 && currentStep === 0) {
                document.getElementById(steps[currentStep]).classList.remove('active');
                document.getElementById(steps[currentStep]).classList.add('complete');
                currentStep++;
                if (currentStep < 3) {
                    document.getElementById(steps[currentStep]).classList.add('active');
                }
            }

            if (progress >= 66 && currentStep === 1) {
                document.getElementById(steps[currentStep]).classList.remove('active');
                document.getElementById(steps[currentStep]).classList.add('complete');
                currentStep++;
                if (currentStep < 3) {
                    document.getElementById(steps[currentStep]).classList.add('active');
                }
            }

            if (progress >= 100) {
                progress = 100;
                if (currentStep < 3) {
                    document.getElementById(steps[currentStep]).classList.remove('active');
                    document.getElementById(steps[currentStep]).classList.add('complete');
                }
                clearInterval(interval);
                setTimeout(resolve, 500);
            }

            elements.progressFill.style.width = `${progress}%`;
        }, 200);
    });
}

// ============================================
// Display Results
// ============================================
async function displayResults(data) {

    showSection('results');

    elements.displayQuestion.textContent = currentQuestion;

    // Get the Gemini answer from Flask
    let answer = "";

    if (typeof data === "string") {
        answer = data;
    } else if (data && data.answer) {
        answer = data.answer;
    }else if (data && data.fullAnswer) {
        answer = data.fullAnswer;
    } else {
        answer = "No response received from the server.";
    }

    // Display the full answer
    renderFullAnswer(answer);

    // Clear the sections that require structured JSON
    if (elements.timeline) elements.timeline.innerHTML = "";
    if (elements.worldChanges) elements.worldChanges.innerHTML = "";
    if (elements.dailyLife) elements.dailyLife.innerHTML = "";
    if (elements.indiaContent) elements.indiaContent.innerHTML = "";
    if (elements.butterflyChain) elements.butterflyChain.innerHTML = "";
    if (elements.futureCards) elements.futureCards.innerHTML = "";

    // Reality score placeholder
    if (elements.scoreNumber) {
        elements.scoreNumber.textContent = "--";
    }

    if (elements.scoreDetails) {
        elements.scoreDetails.innerHTML =
            "<p>Simulation completed successfully.</p>";
    }

    // Refresh icons if Lucide is used
    if (window.lucide) {
        lucide.createIcons();
    }

    // Scroll to the top of results
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
// ============================================
// Render Functions
// ============================================

function renderTimeline(items) {
    elements.timeline.innerHTML = items.map((item, i) => `
        <div class="timeline-item animate-fade-in-left" style="animation-delay: ${i * 100}ms">
            <span class="timeline-year">${item.year}</span>
            <h4 class="timeline-title">${item.title}</h4>
            <p class="timeline-desc">${item.desc}</p>
        </div>
    `).join('');
}

function renderWorldChanges(items) {
    elements.worldChanges.innerHTML = items.map((item, i) => `
        <div class="world-card glass-card animate-fade-in-up" style="animation-delay: ${i * 150}ms">
            <div class="world-card-icon">
                <i data-lucide="${item.icon}"></i>
            </div>
            <h4 class="world-card-title">${item.title}</h4>
            <p class="world-card-text">${item.text}</p>
        </div>
    `).join('');
}

function renderDailyLife(items) {
    elements.dailyLife.innerHTML = items.map((item, i) => `
        <div class="life-card animate-fade-in-up" style="animation-delay: ${i * 100}ms">
            <div class="life-card-icon">
                <i data-lucide="${item.icon}"></i>
            </div>
            <div class="life-card-content">
                <h4>${item.title}</h4>
                <p>${item.text}</p>
            </div>
        </div>
    `).join('');
}

function renderIndiaSection(items) {
    elements.indiaContent.innerHTML = `
        <div class="india-header">
            <i data-lucide="map-pin"></i>
            <h3>The Indian Subcontinent</h3>
        </div>
        <div class="india-points">
            ${items.map(item => `
                <div class="india-point">
                    <div class="india-point-marker"></div>
                    <p>${item}</p>
                </div>
            `).join('')}
        </div>
    `;
}

function renderButterflyEffect(items) {
    elements.butterflyFlow.innerHTML = items.map((item, i) => `
        <div class="butterfly-item animate-fade-in-up" style="animation-delay: ${i * 150}ms">
            <i data-lucide="arrow-right-circle"></i>
            <span>${item}</span>
        </div>
        ${i < items.length - 1 ? '<span class="butterfly-arrow animate-fade-in-up" style="animation-delay: ' + (i * 150 + 75) + 'ms">→</span>' : ''}
    `).join('');
}

function animateScore(score) {
    // Animate gauge
    setTimeout(() => {
        const circumference = 251;
        const offset = circumference - (score.overall / 100) * circumference;
        elements.gaugeFill.style.strokeDashoffset = offset;
    }, 500);

    // Animate number
    animateValue(elements.scoreNumber, 0, score.overall, 1500);

    // Render details
    elements.scoreDetails.innerHTML = `
        <div class="score-detail-item">
            <span class="score-detail-label">${score.details[0].label}</span>
            <span class="score-detail-value">${score.details[0].value}</span>
        </div>
        <div class="score-detail-item">
            <span class="score-detail-label">${score.details[1].label}</span>
            <span class="score-detail-value">${score.details[1].value}</span>
        </div>
        <div class="score-detail-item">
            <span class="score-detail-label">${score.details[2].label}</span>
            <span class="score-detail-value">${score.details[2].value}</span>
        </div>
        <div class="score-detail-item">
            <span class="score-detail-label">${score.details[3].label}</span>
            <span class="score-detail-value">${score.details[3].value}</span>
        </div>
    `;
}

function animateValue(element, start, end, duration) {
    let startTime = null;

    function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}

function renderFuture(items) {
    elements.futureCards.innerHTML = items.map((item, i) => `
        <div class="future-card animate-fade-in-up" style="animation-delay: ${i * 200}ms">
            <span class="future-year">${item.year}</span>
            <h4 class="future-title">${item.title}</h4>
            <p class="future-text">${item.text}</p>
        </div>
    `).join('');
}

function renderFullAnswer(text) {
    // Format text with paragraphs
    const paragraphs = text.split('\n\n');
    elements.answerContent.innerHTML = paragraphs.map(p => `<p>${p}</p>`).join('');
}

// ============================================
// Section Management
// ============================================

function showSection(section) {
    // Hide all sections
    elements.landingSection.classList.add('hidden');
    elements.loadingSection.classList.add('hidden');
    elements.resultsSection.classList.add('hidden');

    // Show target section
    switch (section) {
        case 'landing':
            elements.landingSection.classList.remove('hidden');
            break;
        case 'loading':
            elements.loadingSection.classList.remove('hidden');
            // Reset progress
            elements.progressFill.style.width = '0%';
            document.querySelectorAll('.loader-step').forEach((step, i) => {
                step.classList.remove('active', 'complete');
                if (i === 0) step.classList.add('active');
            });
            break;
        case 'results':
            elements.resultsSection.classList.remove('hidden');
            break;
    }

    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// Event Listeners
// ============================================

elements.simulateBtn.addEventListener('click', () => {
    console.log("Button clicked");

    const question = elements.questionInput.value.trim();
    console.log("Question:", question);

    if (question) {
        console.log("Calling simulateHistory()");
        simulateHistory(question);
    } else {
        console.log("Question is empty");
    }
});
// Enter key on input
elements.questionInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const question = elements.questionInput.value.trim();
        if (question) {
            simulateHistory(question);
        }
    }
});

// Back button
elements.backBtn.addEventListener('click', () => {
    elements.questionInput.value = '';
    showSection('landing');
});

// New simulation button
elements.newSimBtn.addEventListener('click', () => {
    elements.questionInput.value = '';
    showSection('landing');
});

// ============================================
// Intersection Observer for Animations
// ============================================

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// Input Focus Effects
// ============================================

function initInputEffects() {
    const inputWrapper = document.querySelector('.input-wrapper');

    elements.questionInput.addEventListener('focus', () => {
        inputWrapper.classList.add('focused');
    });

    elements.questionInput.addEventListener('blur', () => {
        inputWrapper.classList.remove('focused');
    });
}

// ============================================
// Initialize Everything
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    createStars();
    createParticles();
    initMouseGlow();
    initSuggestedPrompts();
    initScrollAnimations();
    initInputEffects();
});
