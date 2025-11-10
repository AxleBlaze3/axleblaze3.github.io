// ===========================
// Dark/Light Mode Toggle
// ===========================
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// Toggle theme on button click
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Add rotation animation to icon
        themeIcon.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeIcon.style.transform = 'rotate(0deg)';
        }, 300);
    });
}

// ===========================
// Tab-based Navigation System
// ===========================
const navLinks = document.querySelectorAll('.nav-link');
const contentSections = document.querySelectorAll('.content-section');

// Function to show a specific section
function showSection(sectionId) {
    // Hide all sections
    contentSections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all nav links
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Show the selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Add active class to clicked nav link
    const activeLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Scroll to top of content smoothly
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add click event to all navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('data-section');
        showSection(sectionId);
        
        // Close mobile menu if open
        const navMenu = document.getElementById('navMenu');
        const navToggle = document.getElementById('navToggle');
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});

// Handle browser back/forward buttons
window.addEventListener('popstate', (e) => {
    const hash = window.location.hash.substring(1) || 'about';
    showSection(hash);
});

// Show correct section on page load based on URL hash
window.addEventListener('load', () => {
    const hash = window.location.hash.substring(1) || 'about';
    showSection(hash);
});

// ===========================
// Navigation Scroll Effect
// ===========================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// ===========================
// Mobile Navigation Toggle
// ===========================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// ===========================
// Dynamic Year in Footer
// ===========================
const footer = document.querySelector('.footer-copyright');
if (footer) {
    const currentYear = new Date().getFullYear();
    footer.textContent = `© ${currentYear} Rohan Joseph`;
}

// ===========================
// External Link Handling
// ===========================
document.querySelectorAll('a[href^="http"]').forEach(link => {
    if (!link.getAttribute('target')) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    }
});

// ===========================
// Keyboard Navigation
// ===========================
document.addEventListener('keydown', (e) => {
    // Press '1' for About, '2' for Publications, etc.
    const keyMap = {
        '1': 'about',
        '2': 'publications',
        '3': 'highlights'
    };
    
    if (keyMap[e.key] && document.activeElement.tagName !== 'INPUT' && 
        document.activeElement.tagName !== 'TEXTAREA') {
        showSection(keyMap[e.key]);
    }
});

// ===========================
// Internal Section Deep Links
// ===========================
document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[data-section-target]');
    if (!anchor) return;
    e.preventDefault();

    const sectionId = anchor.getAttribute('data-section-target');
    const scrollId = anchor.getAttribute('data-scroll-id');

    showSection(sectionId);

    // After section is visible, scroll to target with offset for fixed navbar
    requestAnimationFrame(() => {
        const navbarEl = document.getElementById('navbar');
        const navHeight = navbarEl ? navbarEl.offsetHeight : 0;
        const offset = navHeight + 12; // small padding

        if (scrollId) {
            const el = document.getElementById(scrollId);
            if (el) {
                const y = el.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: y, behavior: 'smooth' });
                return;
            }
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// ===========================
// Page Load Animation
// ===========================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '1';
    }, 50);
});

// ===========================
// BibTeX Modal Functionality
// ===========================
const bibtexData = {
    gupta2025: `@misc{gupta2025multilingualllmsmultilingualthinkers,
      title={Multilingual LLMs Are Not Multilingual Thinkers: Evidence from Hindi Analogy Evaluation}, 
      author={Ashray Gupta and Rohan Joseph and Sunny Rai},
      year={2025},
      eprint={2507.13238},
      archivePrefix={arXiv},
      primaryClass={cs.CL},
      url={https://arxiv.org/abs/2507.13238}, 
}`,
    joseph2023: `@inproceedings{joseph-etal-2023-newsmet,
    title = "{N}ews{M}et : A 'do it all' Dataset of Contemporary Metaphors in News Headlines",
    author = "Joseph, Rohan  and
      Liu, Timothy  and
      Ng, Aik Beng  and
      See, Simon  and
      Rai, Sunny",
    editor = "Rogers, Anna  and
      Boyd-Graber, Jordan  and
      Okazaki, Naoaki",
    booktitle = "Findings of the Association for Computational Linguistics: ACL 2023",
    month = jul,
    year = "2023",
    address = "Toronto, Canada",
    publisher = "Association for Computational Linguistics",
    url = "https://aclanthology.org/2023.findings-acl.641/",
    doi = "10.18653/v1/2023.findings-acl.641",
    pages = "10090--10104",
    abstract = "Metaphors are highly creative constructs of human language that grow old and eventually die. Popular datasets used for metaphor processing tasks were constructed from dated source texts. In this paper, we propose NewsMet, a large high-quality contemporary dataset of news headlines hand-annotated with metaphorical verbs. The dataset comprises headlines from various sources including political, satirical, reliable and fake. Our dataset serves the purpose of evaluation for the tasks of metaphor interpretation and generation. The experiments reveal several insights and limitations of using LLMs to automate metaphor processing tasks as frequently seen in the recent literature. The dataset is publicly available for research purposes \\url{https://github.com/AxleBlaze3/NewsMet_Metaphor_Dataset}."
}`,
    rai2022: `@inproceedings{rai-etal-2022-identifying,
    title = "Identifying Human Needs through Social Media: A Study on Indian Cities during {COVID}-19",
    author = "Rai, Sunny  and
      Joseph, Rohan  and
      Thakur, Prakruti Singh  and
      Khaliq, Mohammed Abdul",
    booktitle = "Proceedings of the Tenth International Workshop on Natural Language Processing for Social Media",
    month = jul,
    year = "2022",
    address = "Seattle, Washington",
    publisher = "Association for Computational Linguistics",
    url = "https://aclanthology.org/2022.socialnlp-1.6",
    doi = "10.18653/v1/2022.socialnlp-1.6",
    pages = "65--74"
}`,
    khaliq2021: `@inproceedings{khaliq-etal-2021-covid,
    title = "{\\#}covid is war and {\\#}vaccine is weapon? {COVID}-19 metaphors in {I}ndia",
    author = "Khaliq, Mohammed  and
      Joseph, Rohan  and
      Rai, Sunny",
    editor = "Bandyopadhyay, Sivaji  and
      Devi, Sobha Lalitha  and
      Bhattacharyya, Pushpak",
    booktitle = "Proceedings of the 18th International Conference on Natural Language Processing (ICON)",
    month = dec,
    year = "2021",
    address = "National Institute of Technology Silchar, Silchar, India",
    publisher = "NLP Association of India (NLPAI)",
    url = "https://aclanthology.org/2021.icon-main.52/",
    pages = "431--438",
    abstract = "Metaphors are creative cognitive constructs that are employed in everyday conversation to describe abstract concepts and feelings. Prevalent conceptual metaphors such as WAR, MONSTER, and DARKNESS in COVID-19 online discourse sparked a multi-faceted debate over their efficacy in communication, resultant psychological impact on listeners, and their appropriateness in social discourse. In this work, we investigate metaphors used in discussions around COVID-19 on Indian Twitter. We observe subtle transitions in metaphorical mappings as the pandemic progressed. Our experiments, however, didn{'}t indicate any affective impact of WAR metaphors on the COVID-19 discourse."
}`
};

const modal = document.getElementById('bibtexModal');
const bibtexCode = document.getElementById('bibtexCode');
const closeBtn = document.querySelector('.modal-close');
const copyBtn = document.getElementById('copyBibtex');

// Open modal when BibTeX link is clicked
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('bibtex-link')) {
        e.preventDefault();
        const bibtexKey = e.target.getAttribute('data-bibtex');
        if (bibtexData[bibtexKey]) {
            bibtexCode.textContent = bibtexData[bibtexKey];
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    }
});

// Close modal when X is clicked
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });
}

// Close modal when clicking outside the modal content
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Copy BibTeX to clipboard
if (copyBtn) {
    copyBtn.addEventListener('click', () => {
        const text = bibtexCode.textContent;
        navigator.clipboard.writeText(text).then(() => {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copied!';
            copyBtn.classList.add('copied');
            
            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.classList.remove('copied');
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            alert('Failed to copy to clipboard');
        });
    });
}

// ===========================
// Video Modal Functionality
// ===========================
const videoModal = document.getElementById('videoModal');
const videoPlayer = document.getElementById('videoPlayer');
const videoCloseBtn = document.querySelector('.video-modal-close');

// Open video modal when video link is clicked
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('video-link')) {
        e.preventDefault();
        const videoId = e.target.getAttribute('data-video');
        if (videoId) {
            // Use YouTube embed URL with autoplay
            videoPlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            videoModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    }
});

// Close video modal when X is clicked
if (videoCloseBtn) {
    videoCloseBtn.addEventListener('click', () => {
        videoModal.style.display = 'none';
        videoPlayer.src = ''; // Stop video playback
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });
}

// Close video modal when clicking outside the modal content
window.addEventListener('click', (e) => {
    if (e.target === videoModal) {
        videoModal.style.display = 'none';
        videoPlayer.src = ''; // Stop video playback
        document.body.style.overflow = 'auto';
    }
});

// Close video modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.style.display === 'block') {
        videoModal.style.display = 'none';
        videoPlayer.src = ''; // Stop video playback
        document.body.style.overflow = 'auto';
    }
});

// ===========================
// Console Message
// ===========================
console.log('%cRohan\'s Portfolio', 'font-size: 16px; font-weight: bold; color: #0066cc;');
console.log('%cTab-based navigation - Click tabs to switch sections', 'font-size: 12px; color: #666;');
