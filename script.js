// ======================== CONTADOR REGRESIVO ========================
const targetDate = new Date(2026, 3, 25, 21, 30, 0);

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance < 0) {
        document.getElementById('days').innerHTML = "00";
        document.getElementById('hours').innerHTML = "00";
        document.getElementById('minutes').innerHTML = "00";
        document.getElementById('seconds').innerHTML = "00";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').innerHTML = days < 10 ? '0' + days : days;
    document.getElementById('hours').innerHTML = hours < 10 ? '0' + hours : hours;
    document.getElementById('minutes').innerHTML = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById('seconds').innerHTML = seconds < 10 ? '0' + seconds : seconds;
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ======================== REPRODUCTOR DE MÚSICA ========================
const audio = document.getElementById('backgroundMusic');
const playPauseBtn = document.getElementById('playPauseBtn');
const volumeSlider = document.getElementById('volumeSlider');
let isPlaying = false;
let musicStarted = false;

const musicUrl = 'Enredados - Veo en ti la luz (letra).mp3'; // Pon aquí la URL de tu canción

if (musicUrl) {
    audio.src = musicUrl;
}

function startMusicOnFirstInteraction() {
    if (!musicStarted && musicUrl) {
        audio.play().then(() => {
            if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            isPlaying = true;
            musicStarted = true;
        }).catch(error => {
            console.log('Esperando interacción del usuario');
        });
    }
}

function togglePlayPause() {
    if (isPlaying) {
        audio.pause();
        if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        isPlaying = false;
    } else {
        audio.play().then(() => {
            if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            isPlaying = true;
            musicStarted = true;
        }).catch(error => {
            console.log('Error al reproducir');
        });
    }
}

function setVolume() {
    audio.volume = volumeSlider.value / 100;
}

if (playPauseBtn) {
    playPauseBtn.addEventListener('click', togglePlayPause);
}

if (volumeSlider) {
    volumeSlider.addEventListener('input', setVolume);
}

if (musicUrl) {
    audio.load();
    audio.loop = true;
}

document.body.addEventListener('click', function firstClick() {
    startMusicOnFirstInteraction();
    document.body.removeEventListener('click', firstClick);
}, { once: true });

// ======================== MARIPOSAS Y FLORES - APARECEN Y DESAPARECEN SUAVEMENTE ========================
let activeElements = 0;
const MAX_ELEMENTS = 12; // Máximo de elementos visibles al mismo tiempo

// Íconos solo mariposas y flores
const icons = ['🦋', '🌸', '🦋', '🌼', '🦋', '🌷', '🦋', '🌺', '🌸'];

// Colores para mariposas (morados y dorados)
const purpleShades = ['#9b59b6', '#8e44ad', '#af7ac5', '#c39bd3', '#b57edc', '#a569bd', '#c48bdb', '#aa6dc9', '#b980ea'];

// Colores para flores (dorados y champagne)
const flowerColors = ['#d4af37', '#c9a86b', '#b88d5a', '#e8cf97', '#dbb45c', '#e2bf7e', '#f3e0b0'];

// Función para crear una mariposa o flor
function createFloatingElement() {
    if (activeElements >= MAX_ELEMENTS) return;
    
    const element = document.createElement('div');
    element.className = 'floating-element-dynamic';
    
    // Elegir ícono aleatorio
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];
    element.textContent = randomIcon;
    
    // Tamaño aleatorio
    const size = Math.random() * 28 + 20;
    element.style.fontSize = `${size}px`;
    element.style.display = 'flex';
    element.style.alignItems = 'center';
    element.style.justifyContent = 'center';
    
    // Color según tipo
    if (randomIcon === '🦋') {
        element.style.color = purpleShades[Math.floor(Math.random() * purpleShades.length)];
    } else {
        element.style.color = flowerColors[Math.floor(Math.random() * flowerColors.length)];
    }
    
    // Posición inicial aleatoria (en toda la pantalla)
    element.style.position = 'fixed';
    element.style.left = `${Math.random() * (window.innerWidth - 60) + 30}px`;
    element.style.top = `${Math.random() * (window.innerHeight - 100) + 30}px`;
    
    // Estado inicial invisible
    element.style.opacity = '0';
    element.style.transform = 'scale(0.3) rotate(0deg)';
    element.style.transition = 'all 0.4s ease-out';
    element.style.pointerEvents = 'none';
    element.style.zIndex = '9999';
    element.style.willChange = 'transform, opacity';
    
    document.body.appendChild(element);
    activeElements++;
    
    // Animar entrada (aparece suavemente)
    setTimeout(() => {
        if (element) {
            element.style.opacity = '0.2';
            element.style.transform = 'scale(1) rotate(5deg)';
        }
    }, 50);
    
    // Después de 3-5 segundos, empezar a desvanecer
    const lifeTime = Math.random() * 4000 + 3500; // 3.5 a 7.5 segundos
    
    setTimeout(() => {
        if (element) {
            // Iniciar desvanecimiento
            element.style.opacity = '0';
            element.style.transform = `scale(0.5) rotate(${Math.random() * 40 - 20}deg)`;
        }
    }, lifeTime);
    
    // Eliminar después de desaparecer
    setTimeout(() => {
        if (element && element.remove) {
            element.remove();
            activeElements--;
        }
    }, lifeTime + 600);
    
    // Movimiento suave mientras flota (pequeño desplazamiento)
    setTimeout(() => {
        if (element) {
            const moveX = (Math.random() - 0.5) * 80;
            const moveY = (Math.random() - 0.5) * 60;
            element.style.transition = `all 3s ease-out`;
            element.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${Math.random() * 30 - 15}deg)`;
        }
    }, 300);
}

// Crear elementos periódicamente cada 2-4 segundos
function startPeriodicAppearance() {
    const intervalTime = Math.random() * 2500 + 2000; // 2 a 4.5 segundos
    
    if (activeElements < MAX_ELEMENTS) {
        createFloatingElement();
    }
    
    setTimeout(startPeriodicAppearance, Math.random() * 2500 + 2000);
}

// También crear algunos elementos al cargar la página
setTimeout(() => {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => createFloatingElement(), i * 400);
    }
    startPeriodicAppearance();
}, 500);

// También crear elementos desde los costados cada cierto tiempo
function createFromSide() {
    if (activeElements >= MAX_ELEMENTS) return;
    
    const element = document.createElement('div');
    element.className = 'floating-element-dynamic';
    
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];
    element.textContent = randomIcon;
    
    const size = Math.random() * 28 + 20;
    element.style.fontSize = `${size}px`;
    element.style.display = 'flex';
    element.style.alignItems = 'center';
    element.style.justifyContent = 'center';
    
    if (randomIcon === '🦋') {
        element.style.color = purpleShades[Math.floor(Math.random() * purpleShades.length)];
    } else {
        element.style.color = flowerColors[Math.floor(Math.random() * flowerColors.length)];
    }
    
    element.style.position = 'fixed';
    
    // Decidir si viene de izquierda o derecha
    const fromLeft = Math.random() > 0.5;
    const startY = Math.random() * (window.innerHeight - 100) + 50;
    
    if (fromLeft) {
        element.style.left = '-40px';
        element.style.top = `${startY}px`;
    } else {
        element.style.left = `${window.innerWidth + 40}px`;
        element.style.top = `${startY}px`;
    }
    
    element.style.opacity = '0';
    element.style.transform = 'scale(0.5) rotate(0deg)';
    element.style.transition = 'all 0.8s cubic-bezier(0.34, 1.2, 0.64, 1)';
    element.style.pointerEvents = 'none';
    element.style.zIndex = '9999';
    
    document.body.appendChild(element);
    activeElements++;
    
    // Animar entrada (vuela hacia adentro)
    setTimeout(() => {
        if (element) {
            element.style.opacity = '0.9';
            if (fromLeft) {
                element.style.left = `${Math.random() * (window.innerWidth - 100) + 50}px`;
            } else {
                element.style.left = `${Math.random() * (window.innerWidth - 100) + 50}px`;
            }
            element.style.transform = 'scale(1) rotate(8deg)';
        }
    }, 50);
    
    // Vida útil
    const lifeTime = Math.random() * 5000 + 4000;
    
    setTimeout(() => {
        if (element) {
            element.style.opacity = '0';
            element.style.transform = `scale(0.4) rotate(${Math.random() * 60 - 30}deg)`;
            if (fromLeft) {
                element.style.left = `${window.innerWidth + 50}px`;
            } else {
                element.style.left = `-50px`;
            }
        }
    }, lifeTime);
    
    setTimeout(() => {
        if (element && element.remove) {
            element.remove();
            activeElements--;
        }
    }, lifeTime + 800);
}

// Crear elementos desde costados periódicamente
setInterval(() => {
    if (activeElements < MAX_ELEMENTS - 2) {
        createFromSide();
    }
}, 6000);

// También crear desde costados al cargar
setTimeout(() => {
    for (let i = 0; i < 3; i++) {
        setTimeout(() => createFromSide(), i * 800);
    }
}, 1000);

// Función para crear elemento desde costado
function createFromSide(side) {
    if (activeElements >= MAX_ELEMENTS) return;
    
    const scrollY = window.scrollY;
    const y = scrollY + Math.random() * window.innerHeight;
    createFloatingElement(0, y, true, side);
}

// Detectar scroll y crear elementos desde diferentes posiciones
let lastScrollY_pos = window.scrollY;
let scrollTimeout_pos;

function handleScroll() {
    const currentScrollY = window.scrollY;
    const scrollDelta = Math.abs(currentScrollY - lastScrollY_pos);
    
    if (scrollDelta > 20) {
        // Determinar cuántos elementos crear (1-3)
        const elementsToCreate = Math.min(Math.floor(scrollDelta / 40) + 1, 3);
        
        for (let i = 0; i < elementsToCreate; i++) {
            if (activeElements < MAX_ELEMENTS) {
                // Decidir de dónde aparece (aleatorio: centro, izquierda o derecha)
                const spawnType = Math.random();
                
                if (spawnType < 0.4) {
                    // Aparece desde el centro (cerca del scroll)
                    const x = Math.random() * window.innerWidth;
                    const y = currentScrollY + (Math.random() * window.innerHeight * 0.6);
                    createFloatingElement(x, y, false);
                } else if (spawnType < 0.7) {
                    // Aparece desde la izquierda
                    createFromSide('left');
                } else {
                    // Aparece desde la derecha
                    createFromSide('right');
                }
            }
        }
    }
    
    lastScrollY_pos = currentScrollY;
    
    clearTimeout(scrollTimeout_pos);
    scrollTimeout_pos = setTimeout(() => {}, 100);
}

// Evento de scroll con throttling
let ticking_pos = false;
window.addEventListener('scroll', () => {
    if (!ticking_pos) {
        requestAnimationFrame(() => {
            handleScroll();
            ticking_pos = false;
        });
        ticking_pos = true;
    }
});

// Crear algunos elementos al cargar la página
setTimeout(() => {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            if (activeElements < MAX_ELEMENTS) {
                const spawnType = Math.random();
                if (spawnType < 0.4) {
                    const x = Math.random() * window.innerWidth;
                    const y = window.scrollY + Math.random() * window.innerHeight;
                    createFloatingElement(x, y, false);
                } else if (spawnType < 0.7) {
                    createFromSide('left');
                } else {
                    createFromSide('right');
                }
            }
        }, i * 400);
    }
}, 500);

// También crear elementos periódicamente mientras se está quieto (cada 8-10 segundos)
setInterval(() => {
    if (activeElements < MAX_ELEMENTS - 2) {
        const spawnType = Math.random();
        if (spawnType < 0.4) {
            const x = Math.random() * window.innerWidth;
            const y = window.scrollY + Math.random() * window.innerHeight;
            createFloatingElement(x, y, false);
        } else if (spawnType < 0.7) {
            createFromSide('left');
        } else {
            createFromSide('right');
        }
    }
}, 9000);

// ======================== ANIMACIONES AL SCROLL PARA SECCIONES ========================
const sections = document.querySelectorAll('.scroll-section');

function triggerScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Al entrar una sección, crear elementos desde los costados
                if (activeElements < MAX_ELEMENTS) {
                    setTimeout(() => {
                        createFromSide('left');
                        setTimeout(() => createFromSide('right'), 150);
                    }, 100);
                }
            }
        });
    }, { threshold: 0.3 });
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    setTimeout(() => {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight - 80) {
                section.classList.add('visible');
            }
        });
    }, 200);
}

// ======================== FUNCIÓN PARA CAMBIAR IMAGEN DE HERO ========================
function setHeroImage(imageUrl) {
    const heroImg = document.getElementById('customHeroImg');
    if (heroImg && imageUrl) {
        heroImg.src = imageUrl;
    }
}

// ======================== CONFIGURACIÓN DE IMÁGENES REALES ========================
const imgMerlina1 = document.getElementById('imgMerlina1');
const imgMerlina2 = document.getElementById('imgMerlina2');
const imgMerlina3 = document.getElementById('imgMerlina3');

// DESCOMENTA Y REEMPLAZA CON LAS RUTAS DE TUS FOTOS REALES:
/*
imgMerlina1.src = 'assets/merlina_foto1.jpg';
imgMerlina2.src = 'assets/merlina_foto2.jpg';
imgMerlina3.src = 'assets/merlina_foto3.jpg';
setHeroImage('assets/merlina_portada.jpg');
*/

window.addEventListener('load', () => {
    const allImgs = document.querySelectorAll('img');
    allImgs.forEach(img => {
        if (!img.hasAttribute('alt')) img.setAttribute('alt', 'Merlina XV años');
        img.setAttribute('loading', 'lazy');
    });
    
    triggerScrollAnimations();
    console.log('🎉 Invitación de Merlina - Mariposas y flores desde los costados');
});

// ======================== BOTÓN CONFIRMAR ========================
const confirmBtn = document.getElementById('confirmBtn');
const toastMsg = document.getElementById('toastMsg');

if (confirmBtn) {
    confirmBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const nombre = prompt("Por favor, ingresa tu nombre para confirmar asistencia:");

        if (!nombre) return;

        const mensaje = `Hola, soy ${nombre} y confirmo mi asistencia a los 15 años 🎉`;

        const numero = "5493865347377"; // CAMBIAR

        const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

        window.open(url, '_blank');

        toastMsg.style.opacity = '1';
        toastMsg.innerHTML = '✨ Redirigiendo a WhatsApp... ✨';

        setTimeout(() => {
            toastMsg.style.opacity = '0';
        }, 2000);
    });
}

// ======================== SCROLL SUAVE ========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== "#" && href !== "#!" && href !== "#fakeMapLink") {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});