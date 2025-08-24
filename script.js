document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;

    
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    let mouse = { x: -100, y: -100 };
    let lastMousePos = { x: 0, y: 0 };
    let lastMoveTime = Date.now();

    window.addEventListener('mousemove', e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        lastMoveTime = Date.now();
    });

    const updateCursor = () => {
        
        cursorDot.style.left = `${mouse.x}px`;
        cursorDot.style.top = `${mouse.y}px`;

    
        const outlineX = parseFloat(cursorOutline.style.left || mouse.x);
        const outlineY = parseFloat(cursorOutline.style.top || mouse.y);
        cursorOutline.style.left = `${outlineX + (mouse.x - outlineX) * 0.1}px`;
        cursorOutline.style.top = `${outlineY + (mouse.y - outlineY) * 0.1}px`;

        
        const velocity = Math.hypot(mouse.x - lastMousePos.x, mouse.y - lastMousePos.y);
        lastMousePos = { x: mouse.x, y: mouse.y };

        
        const particlesToCreate = Math.min(Math.floor(velocity / 4), 5);
        for (let i = 0; i < particlesToCreate; i++) {
            createParticle(mouse.x, mouse.y);
        }

        
        if (Date.now() - lastMoveTime > 150) {
             createParticle(mouse.x, mouse.y, true);
        }

        requestAnimationFrame(updateCursor);
    };

    const createParticle = (x, y, isIdle = false) => {
        const particle = document.createElement('div');
        particle.classList.add('trail-particle');

        const size = Math.random() * 5 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        const offsetX = (Math.random() - 0.5) * (isIdle ? 10 : 20);
        const offsetY = (Math.random() - 0.5) * (isIdle ? 10 : 20);
        particle.style.left = `${x + offsetX}px`;
        particle.style.top = `${y + offsetY}px`;

        body.appendChild(particle);

        particle.addEventListener('animationend', () => {
            particle.remove();
        });
    };

    updateCursor();


    
    const interactiveElements = document.querySelectorAll('.interactive');
    interactiveElements.forEach(elem => {
        elem.addEventListener('mousemove', e => {
            const rect = elem.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateX = (y / rect.height - 0.5) * -20;
            const rotateY = (x / rect.width - 0.5) * 20;
            elem.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        elem.addEventListener('mouseleave', () => {
            elem.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    
    const themeToggle = document.getElementById('theme-toggle');
    if (localStorage.getItem('theme') === 'light') body.classList.add('light-mode');
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        localStorage.setItem('theme', body.classList.contains('light-mode') ? 'light' : 'dark');
        setupParticles();
    });

    new Typed('#typing-effect', { strings: ['Front-end Developer', 'Problem Solver', 'Quick Learner'], typeSpeed: 50, backSpeed: 25, backDelay: 1500, loop: true });
    AOS.init({ duration: 800, once: true, offset: 50 });

    function setupParticles() {
        const isLight = body.classList.contains('light-mode');
        particlesJS('particles-js', { particles: { number: { value: 40 }, color: { value: isLight ? '#888888' : '#ffffff' }, opacity: { value: 0.2 }, size: { value: 3 }, line_linked: { enable: true, color: isLight ? '#aaaaaa' : '#ffffff', opacity: 0.2 }, move: { speed: 2 } }, interactivity: { events: { onhover: { enable: false } } } });
    }
    setupParticles();

  const projects = [

        {
            name: "Krishna-Ji Chatbot",
            bio: "A ChatGPT inspired chat bot with the knowledge of Geeta, built in Html, css, js etc.",
            img: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=500&q=8",
            previewLink: "https://krishnaji-by-om-shukla.vercel.app/",
            codeLink: "https://github.com/omShukla0711/krishna"
        },
        {
            name: "Unique Portfolio Website",
            bio: "A creative  portfolio system designed from scratch without templates.",
            img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=500&q=80",
            previewLink: "#",
            codeLink: "#"
        },
     
      
    ];

    const projectContainer = document.getElementById('project-container');

    projects.forEach(project => {
        const projectCard = `
            <div class="project-card" data-aos="fade-up">
                <img src="${project.img}" alt="${project.name}">
                <div class="project-info">
                    <h3>${project.name}</h3>
                    <p>${project.bio}</p>
                    <div class="project-links">
                        <a href="${project.previewLink}" target="_blank">Preview <i class="fas fa-external-link-alt"></i></a>
                        <a href="${project.codeLink}" target="_blank">Code <i class="fab fa-github"></i></a>
                    </div>
                </div>
            </div>
        `;
        projectContainer.innerHTML += projectCard;
    });

});