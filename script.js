// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-cyber-black/90', 'shadow-lg');
            navbar.classList.remove('bg-cyber-black/70');
        } else {
            navbar.classList.add('bg-cyber-black/70');
            navbar.classList.remove('bg-cyber-black/90', 'shadow-lg');
        }
    });

    // Initial Reveal Animations (Hero)
    gsap.from("#hero .gs-reveal", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.2
    });

    gsap.from("#hero .gs-reveal-right", {
        x: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.6
    });

    // Scroll Reveal Elements
    const revealElements = document.querySelectorAll('.gs-reveal:not(#hero .gs-reveal)');
    revealElements.forEach((el) => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%", // Trigger when element is 85% down the viewport
                toggleActions: "play none none reverse"
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });
    });

    const revealRightElements = document.querySelectorAll('.gs-reveal-right:not(#hero .gs-reveal-right)');
    revealRightElements.forEach((el) => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            x: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });
    });

    // How It Works Progress Line
    const progressLine = document.getElementById('progress-line');
    if(progressLine) {
        ScrollTrigger.create({
            trigger: "#how-it-works",
            start: "top center",
            end: "bottom center",
            onUpdate: (self) => {
                // Animate width from 0 to 90% based on scroll progress within section
                progressLine.style.width = Math.min(self.progress * 120, 90) + "%";
            }
        });
    }

    // Validation Logs Animation in Solution Section
    const logs = [
        "VALIDATING: READ REQUEST...",
        "STATUS: ALLOWED",
        "VALIDATING: MEM_COPY_BULK...",
        "STATUS: ANOMALY DETECTED. BLOCKED.",
        "ENFORCELOCK: TRUE",
        "WAITING FOR INPUT..."
    ];
    
    const logEl = document.getElementById('validation-logs');
    let logIndex = 0;
    
    if(logEl) {
        setInterval(() => {
            logEl.textContent = logs[logIndex];
            logEl.style.color = logs[logIndex].includes("BLOCKED") ? "var(--cyber-alert)" : "var(--cyber-neon)";
            logIndex = (logIndex + 1) % logs.length;
        }, 2000);
    }

    // Animated "Threat Blocked" Alerts Generator
    const threatContainer = document.getElementById('threat-alerts');
    const threats = ["Ransomware Signature Detected", "Unauthorized Bulk Copy Attempt", "Raw Memory Read Blocked", "Unsigned Driver Injection"];
    
    function spawnThreatAlert() {
        if(!threatContainer) return;
        
        // Only spawn occasionally
        if(Math.random() > 0.3) return;

        const alert = document.createElement('div');
        alert.className = "bg-cyber-dark border border-red-500/50 rounded p-3 shadow-lg flex items-center gap-3 transform transition-all duration-500 translate-x-full opacity-0";
        alert.innerHTML = `
            <div class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
            <div>
                <p class="text-xs text-red-400 font-bold uppercase tracking-wider">Threat Blocked</p>
                <p class="text-[10px] text-gray-400 font-mono">${threats[Math.floor(Math.random()*threats.length)]}</p>
            </div>
        `;
        
        threatContainer.appendChild(alert);
        
        // Animate in
        requestAnimationFrame(() => {
            alert.classList.remove('translate-x-full', 'opacity-0');
        });
        
        // Remove after 3s
        setTimeout(() => {
            alert.classList.add('opacity-0', 'translate-x-[120%]');
            setTimeout(() => {
                if(threatContainer.contains(alert)) threatContainer.removeChild(alert);
            }, 500);
        }, 4000);
    }

    // Start random alerts after 5 seconds
    setTimeout(() => {
        setInterval(spawnThreatAlert, 5000);
    }, 5000);
});
