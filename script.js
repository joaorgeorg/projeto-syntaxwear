// ========== MOBILE MENU TOGGLE ==========
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});


const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ========== ACTIVE NAV LINK ON SCROLL ==========
const sections = document.querySelectorAll('section[id]');

function activateNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
}

window.addEventListener('scroll', activateNavLink);

// ========== SMOOTH SCROLL NAVIGATION ==========
const scrollLinks = document.querySelectorAll('a[href^="#"]');

scrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');

        // Ignorar links vazios ou que não são âncoras de seção
        if (href === '#' || href === '#privacidade' || href === '#termos') {
            return;
        }

        e.preventDefault();

        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========== FAQ ACCORDION ==========
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        // Fechar outros itens
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });

        // Toggle item atual
        item.classList.toggle('active');
    });
});

// ========== SCROLL TO TOP BUTTON ==========
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========== COUNTER ANIMATION FOR STATS ==========
const statNumbers = document.querySelectorAll('.stat-number[data-target]');
let countersActivated = false;

function animateCounters() {
    if (countersActivated) return;

    const firstStat = statNumbers[0];
    const statPosition = firstStat.getBoundingClientRect().top;
    const screenPosition = window.innerHeight;

    if (statPosition < screenPosition) {
        countersActivated = true;

        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000; // 2 segundos
            const increment = target / (duration / 16); // 60 FPS
            let current = 0;

            const updateCounter = () => {
                current += increment;

                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target;
                }
            };

            updateCounter();
        });
    }
}

window.addEventListener('scroll', animateCounters);
window.addEventListener('load', animateCounters);

// ========== INTERSECTION OBSERVER FOR ANIMATIONS ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Elementos para animar
const animatedElements = document.querySelectorAll(`
    .servico-card,
    .destaque-card,
    .beneficio-card,
    .depoimento-card,
    .galeria-item,
    .sobre-content > *,
    .info-item
`);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========== PARALLAX EFFECT ON HERO ==========
const heroBackground = document.querySelector('.hero-background');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;

    if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
});

// ========== LAZY LOADING IMAGES ==========
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;

                // Se a imagem tiver data-src, carregá-la
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }

                imageObserver.unobserve(img);
            }
        });
    });

    // Observar todas as imagens
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ========== ADD ANIMATION TO ELEMENTS ON LOAD ==========
window.addEventListener('load', () => {
    // Remover preloader se existir
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }

    // Ativar animações iniciais
    document.body.classList.add('loaded');
});

// ========== PREVENT SCROLL RESTORATION ON PAGE RELOAD ==========
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// ========== ADICIONAR EFEITO DE HOVER NOS CARDS ==========
const cards = document.querySelectorAll('.servico-card, .destaque-card, .beneficio-card, .depoimento-card');

cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// ========== ANALYTICS E TRACKING (PLACEHOLDER) ==========
// Aqui você pode adicionar código para Google Analytics, Facebook Pixel, etc.
// Exemplo:
// gtag('config', 'GA_MEASUREMENT_ID');

// ========== CONSOLE INFO ==========
console.log('%c🌍 Global Languages - Escola de Idiomas', 'color: #1e3a5f; font-size: 20px; font-weight: bold;');
console.log('%cDesenvolvido com dedicação para transformar vidas através dos idiomas', 'color: #f59e0b; font-size: 14px;');
console.log('%cVisite-nos: Av. Paulista, 1234 - São Paulo/SP', 'color: #64748b; font-size: 12px;');

// ========== SERVICE WORKER (OPCIONAL - PWA) ==========
// Descomente para adicionar suporte PWA
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registrado:', registration);
            })
            .catch(error => {
                console.log('Erro ao registrar Service Worker:', error);
            });
    });
}
*/

// ========== DARK MODE TOGGLE (ATIVAÇÃO) ==========
const darkModeToggle = document.getElementById('darkModeToggle');
const iconMoon = document.querySelector('.icon-moon');
const iconSun = document.querySelector('.icon-sun');

if (darkModeToggle) {
    // Verificar preferência salva
    const darkMode = localStorage.getItem('darkMode');

    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
        if (iconMoon && iconSun) {
            iconMoon.style.display = 'none';
            iconSun.style.display = 'inline-block';
        }
    }

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            if (iconMoon && iconSun) {
                iconMoon.style.display = 'none';
                iconSun.style.display = 'inline-block';
            }
        } else {
            localStorage.setItem('darkMode', null);
            if (iconMoon && iconSun) {
                iconMoon.style.display = 'inline-block';
                iconSun.style.display = 'none';
            }
        }
    });
}

// ========== EASTER EGG ==========
// Pequeno easter egg para desenvolvedores curiosos
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

window.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiPattern.join(',')) {
        console.log('%c🎉 Você encontrou o Easter Egg!', 'color: #f59e0b; font-size: 24px; font-weight: bold;');
        console.log('%c🌍 Continue explorando e aprendendo idiomas!', 'color: #1e3a5f; font-size: 16px;');

        // Adicionar confetti ou algum efeito visual
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 3000);
    }
});

// ========== CUSTOM EFFECTS ==========
// 1. Scroll Progress Bar
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
    if (scrollProgress) {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        scrollProgress.style.width = scrollPercentage + '%';
    }
});

// 2. Typewriter Effect
const textArray = ["Sua Porta para o Mundo", "O Futuro em Suas Mãos", "Aprenda Sem Limites", "Sua Jornada Começa Aqui"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;
const typedTextSpan = document.getElementById("typewriterText");

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

if(typedTextSpan) {
    document.addEventListener("DOMContentLoaded", function() {
        setTimeout(type, newTextDelay + 250);
    });
}

// 3. Ripple Effect for Buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => {
    btn.addEventListener('click', function(e) {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripples = document.createElement('span');
        ripples.style.left = x + 'px';
        ripples.style.top = y + 'px';
        ripples.classList.add('ripple');
        this.appendChild(ripples);
        
        setTimeout(() => {
            ripples.remove();
        }, 600);
    });
});

// 4. Vanilla Tilt Effect for Cards
const tiltCards = document.querySelectorAll('.servico-card, .destaque-card, .beneficio-card, .depoimento-card');
tiltCards.forEach(card => {
    card.classList.add('tilt-card');
    
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.transition = 'none';
        card.style.zIndex = '10';
        card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
        card.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
        card.style.zIndex = '1';
        card.style.boxShadow = '';
    });
});

// 5. Floating Particles in Hero
const heroBg = document.querySelector('.hero-background');
if (heroBg) {
    for (let i = 0; i < 25; i++) {
        let particle = document.createElement('div');
        particle.classList.add('particle');
        
        let size = Math.random() * 15 + 5;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        
        let duration = Math.random() * 20 + 10;
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        heroBg.appendChild(particle);
    }
}
