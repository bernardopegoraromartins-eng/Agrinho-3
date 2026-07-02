// Menu Mobile
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Back to Top Button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scroll para links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Tabs de Sustentabilidade
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        btn.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// Animação de números (Stats Counter)
const statsSection = document.querySelector('.stats-container');
const statNumbers = document.querySelectorAll('.stat-number');
let animated = false;

const animateStats = () => {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target + (target === 100 ? '%' : target === 972 ? '' : target === 12 ? 'M' : '+');
            }
        };
        
        updateCounter();
    });
};

const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
            animateStats();
            animated = true;
        }
    });
}, observerOptions);

if (statsSection) {
    observer.observe(statsSection);
}

// Testimonial Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-item');

function changeTestimonial(direction) {
    testimonials[currentTestimonial].classList.remove('active');
    currentTestimonial += direction;
    
    if (currentTestimonial >= testimonials.length) {
        currentTestimonial = 0;
    } else if (currentTestimonial < 0) {
        currentTestimonial = testimonials.length - 1;
    }
    
    testimonials[currentTestimonial].classList.add('active');
}

// Auto-play testimonials
setInterval(() => {
    changeTestimonial(1);
}, 5000);

// Calculadora de Pegada de Carbono
const calculatorForm = document.getElementById('carbonCalculator');
const calculatorResult = document.getElementById('calculatorResult');

calculatorForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const area = parseFloat(document.getElementById('area').value);
    const atividade = document.getElementById('atividade').value;
    const energia = document.getElementById('energia').value;
    
    let emissaoBase = 0;
    let fatorReducao = 0;
    
    // Cálculo baseado na atividade
    switch(atividade) {
        case 'lavoura':
            emissaoBase = area * 2.5;
            break;
        case 'pecuaria':
            emissaoBase = area * 5.0;
            break;
        case 'mista':
            emissaoBase = area * 3.5;
            break;
    }
    
    // Fator de redução baseado em energia renovável
    switch(energia) {
        case 'sim':
            fatorReducao = 40;
            break;
        case 'parcial':
            fatorReducao = 20;
            break;
        case 'nao':
            fatorReducao = 0;
            break;
    }
    
    const emissaoFinal = emissaoBase * (1 - fatorReducao/100);
    const potencialReducao = fatorReducao + 15; // Potencial adicional com mais práticas
    
    document.getElementById('emissaoValue').textContent = emissaoFinal.toFixed(1) + ' tCO₂e/ano';
    document.getElementById('reducaoValue').textContent = potencialReducao + '%';
    
    let recomendacao = '';
    if (energia === 'nao') {
        recomendacao = 'Recomendamos investir em energia renovável (solar, biomassa) para reduzir significativamente suas emissões. Implemente também práticas como plantio direto e rotação de culturas.';
    } else if (energia === 'parcial') {
        recomendacao = 'Ótimo começo! Amplie o uso de energia renovável e considere sistemas integrados (ILPF) para maximizar a sustentabilidade da sua propriedade.';
    } else {
        recomendacao = 'Parabéns! Sua propriedade já utiliza energia renovável. Continue investindo em tecnologias sustentáveis e compartilhe suas práticas com outros produtores.';
    }
    
    document.getElementById('recommendation').textContent = recomendacao;
    calculatorResult.style.display = 'block';
    
    // Scroll suave até o resultado
    calculatorResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

// Formulário de Contato
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simulação de envio
    const btn = this.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    
    btn.textContent = 'Enviando...';
    btn.disabled = true;
    
    setTimeout(() => {
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        this.reset();
        btn.textContent = originalText;
        btn.disabled = false;
    }, 1500);
});

// Animação de entrada dos elementos (Intersection Observer)
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.about-card, .tech-card, .practice-item, .benefit-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
};

// Inicializar animações
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
});

// Efeito de digitação no título
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const text = heroTitle.innerHTML;
    heroTitle.innerHTML = '';
    let i = 0;
    
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    // Iniciar após 500ms
    setTimeout(typeWriter, 500);
}

// Validação de formulários em tempo real
const inputs = document.querySelectorAll('input, textarea, select');
inputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.hasAttribute('required') && !this.value) {
            this.style.borderColor = '#e74c3c';
        } else {
            this.style.borderColor = '';
        }
    });
});

// Prevenir envio múltiplo de formulários
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', function() {
        const submitBtn = this.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = true;
            setTimeout(() => {
                submitBtn.disabled = false;
            }, 3000);
        }
    });
});

console.log('Site AgroForte carregado com sucesso! 🌱');
