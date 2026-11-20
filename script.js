// ===== EFECTOS Y ANIMACIONES BARBER CUTS 79 =====

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initSectionReveal();
  initParallax();
  setFooterYear();
  createWhatsAppFloat();
  initLightbox();
  initSmoothScroll();
  initAgendarForm();
});

/* ============================================================
   0. MENÚ HAMBURGUESA (MÓVIL)
   ============================================================ */
function initMobileMenu() {
  const toggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('active');
    toggle.classList.toggle('active');
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
  });

  // Cierra el menú al hacer clic en un enlace
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Cierra el menú al hacer clic fuera
  document.addEventListener('click', (e) => {
    if (!navLinks.classList.contains('active')) return;
    if (navLinks.contains(e.target) || toggle.contains(e.target)) return;
    navLinks.classList.remove('active');
    toggle.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
  });
}

/* ============================================================
   1. REVELADO DE SECCIONES AL HACER SCROLL
   ============================================================ */
function initSectionReveal() {
  const sections = document.querySelectorAll('.section');

  if (!('IntersectionObserver' in window)) {
    sections.forEach((s) => {
      s.style.opacity = '1';
      s.style.transform = 'none';
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    },
    { threshold: 0.12 }
  );

  sections.forEach((section) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
  });
}

/* ============================================================
   2. PARALLAX SUAVE DEL FONDO
   ============================================================ */
function initParallax() {
  const bgSkulls = document.querySelector('.bg-skulls');
  if (!bgSkulls) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        bgSkulls.style.transform = `translateY(${window.scrollY * 0.15}px)`;
        ticking = false;
      });
      ticking = true;
    }
  });
}

/* ============================================================
   3. AÑO DINÁMICO EN EL FOOTER
   ============================================================ */
function setFooterYear() {
  const footerNote = document.querySelector('.footer-note');
  if (footerNote) {
    const year = new Date().getFullYear();
    footerNote.innerHTML = `© ${year} Barber Cuts 79. Todos los derechos reservados.`;
  }
}

/* ============================================================
   4. BOTÓN FLOTANTE DE WHATSAPP (con icono SVG)
   ============================================================ */
function createWhatsAppFloat() {
  if (document.querySelector('.whatsapp-float')) return;

  const waBtn = document.createElement('a');
  waBtn.href =
    'https://wa.me/527443754197?text=Hola%2C%20quiero%20agendar%20una%20cita%20en%20Barber%20Cuts%2079';
  waBtn.target = '_blank';
  waBtn.rel = 'noopener';
  waBtn.className = 'whatsapp-float';
  waBtn.setAttribute('aria-label', 'Agendar cita por WhatsApp');
  waBtn.setAttribute('title', 'Agendar cita por WhatsApp');

  waBtn.innerHTML = `
    <svg viewBox="0 0 24 24" width="32" height="32" aria-hidden="true">
      <path fill="currentColor" d="M12.04 2a9.9 9.9 0 0 0-8.4 15.16L2 22l4.98-1.6A9.9 9.9 0 1 0 12.04 2m0 18.1a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3 .96.96-2.9-.2-.31A8.2 8.2 0 1 1 12.04 20.1m4.5-6.14c-.25-.13-1.46-.72-1.69-.8s-.39-.13-.56.12-.65.8-.8.97-.29.19-.54.06a6.7 6.7 0 0 1-3.3-2.88c-.25-.43.25-.4.72-1.33a.45.45 0 0 0 0-.44l-.8-1.92c-.21-.5-.42-.43-.58-.44h-.49a.94.94 0 0 0-.68.32 2.87 2.87 0 0 0-.9 2.14 5 5 0 0 0 1.05 2.64 11.4 11.4 0 0 0 4.36 3.85c1.62.7 2.26.76 3.07.64a2.62 2.62 0 0 0 1.72-1.22 2.13 2.13 0 0 0 .15-1.22c-.07-.12-.25-.19-.5-.32"/>
    </svg>`;

  Object.assign(waBtn.style, {
    position: 'fixed',
    bottom: '25px',
    right: '25px',
    width: '62px',
    height: '62px',
    borderRadius: '50%',
    background: '#39ff14',
    color: '#050505',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    boxShadow: '0 0 20px #39ff14, 0 0 40px rgba(57,255,20,0.5)',
    zIndex: '999',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
    animation: 'waPulse 2.5s ease-in-out infinite',
  });

  if (!document.getElementById('wa-pulse-style')) {
    const style = document.createElement('style');
    style.id = 'wa-pulse-style';
    style.textContent = `
      @keyframes waPulse {
        0%, 100% { box-shadow: 0 0 20px #39ff14, 0 0 40px rgba(57,255,20,0.5); }
        50%      { box-shadow: 0 0 30px #39ff14, 0 0 60px rgba(57,255,20,0.8); }
      }
    `;
    document.head.appendChild(style);
  }

  waBtn.addEventListener('mouseenter', () => {
    waBtn.style.transform = 'scale(1.12)';
    waBtn.style.animation = 'none';
    waBtn.style.boxShadow = '0 0 30px #39ff14, 0 0 60px rgba(57,255,20,0.7)';
  });
  waBtn.addEventListener('mouseleave', () => {
    waBtn.style.transform = 'scale(1)';
    waBtn.style.animation = 'waPulse 2.5s ease-in-out infinite';
    waBtn.style.boxShadow = '0 0 20px #39ff14, 0 0 40px rgba(57,255,20,0.5)';
  });

  document.body.appendChild(waBtn);
}

/* ============================================================
   5. LIGHTBOX PARA GALERÍA (cortes + tatuajes)
   ============================================================ */
function initLightbox() {
  const galeriaImages = document.querySelectorAll('.corte-card img');
  if (!galeriaImages.length) return;

  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.setAttribute('aria-hidden', 'true');
  lightbox.innerHTML = `
    <span class="lightbox-close" aria-label="Cerrar">&times;</span>
    <span class="lightbox-prev" aria-label="Anterior">&#10094;</span>
    <img class="lightbox-img" src="" alt="Imagen ampliada" />
    <span class="lightbox-next" aria-label="Siguiente">&#10095;</span>
  `;
  document.body.appendChild(lightbox);

  if (!document.getElementById('lightbox-style')) {
    const style = document.createElement('style');
    style.id = 'lightbox-style';
    style.textContent = `
      .lightbox {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.92);
        backdrop-filter: blur(6px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
      }
      .lightbox.active {
        opacity: 1;
        pointer-events: auto;
      }
      .lightbox-img {
        max-width: 90vw;
        max-height: 85vh;
        border-radius: 10px;
        border: 2px solid #39ff14;
        box-shadow: 0 0 30px #39ff14, 0 0 60px rgba(57,255,20,0.5);
        transform: scale(0.9);
        transition: transform 0.3s ease;
      }
      .lightbox.active .lightbox-img {
        transform: scale(1);
      }
      .lightbox-close,
      .lightbox-prev,
      .lightbox-next {
        position: absolute;
        color: #39ff14;
        font-size: 2.5rem;
        cursor: pointer;
        user-select: none;
        text-shadow: 0 0 10px #39ff14;
        transition: transform 0.2s ease, color 0.2s ease;
        padding: 10px;
        line-height: 1;
      }
      .lightbox-close { top: 20px; right: 30px; font-size: 3rem; }
      .lightbox-prev  { left: 25px; top: 50%; transform: translateY(-50%); }
      .lightbox-next  { right: 25px; top: 50%; transform: translateY(-50%); }
      .lightbox-close:hover,
      .lightbox-prev:hover,
      .lightbox-next:hover {
        color: #ffffff;
        transform: scale(1.15) translateY(var(--ty, 0));
      }
      .lightbox-prev:hover,
      .lightbox-next:hover { --ty: -50%; }
    `;
    document.head.appendChild(style);
  }

  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const btnClose = lightbox.querySelector('.lightbox-close');
  const btnPrev = lightbox.querySelector('.lightbox-prev');
  const btnNext = lightbox.querySelector('.lightbox-next');

  let currentIndex = 0;
  const images = Array.from(galeriaImages);

  function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = images[currentIndex].src;
    lightboxImg.alt = images[currentIndex].alt || 'Imagen ampliada';
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.src = images[currentIndex].src;
    lightboxImg.alt = images[currentIndex].alt || 'Imagen ampliada';
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentIndex].src;
    lightboxImg.alt = images[currentIndex].alt || 'Imagen ampliada';
  }

  images.forEach((img, i) => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => openLightbox(i));
  });

  btnClose.addEventListener('click', closeLightbox);
  btnNext.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });
  btnPrev.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
}

/* ============================================================
   6. SMOOTH SCROLL CON OFFSET POR NAVBAR FIJA
   ============================================================ */
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('a[href^="#"]');
  const navbar = document.querySelector('.navbar');

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#' || targetId.length < 2) return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const navHeight = navbar ? navbar.offsetHeight : 0;
      const targetPosition =
        target.getBoundingClientRect().top + window.pageYOffset - navHeight - 10;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    });
  });
}

/* ============================================================
   7. FORMULARIO DE AGENDADO → WHATSAPP
   ============================================================ */
function initAgendarForm() {
  const form = document.getElementById('agendar-form');
  if (!form) return;

  const inputFecha = document.getElementById('fecha');
  const inputHora = document.getElementById('hora');
  const inputCliente = document.getElementById('cliente');
  const inputServicio = document.getElementById('servicio');
  const msg = document.getElementById('form-msg');
  const WHATSAPP = '527443754197';

  // Fecha mínima = hoy
  const hoy = new Date();
  const yyyy = hoy.getFullYear();
  const mm = String(hoy.getMonth() + 1).padStart(2, '0');
  const dd = String(hoy.getDate()).padStart(2, '0');
  inputFecha.min = `${yyyy}-${mm}-${dd}`;

  // Horas válidas: solo en punto, de 9:00 a 19:00 (9 AM a 7 PM)
  const HORAS_VALIDAS = [
    '09:00','10:00','11:00','12:00','13:00',
    '14:00','15:00','16:00','17:00','18:00','19:00'
  ];

  function horaValida(hora) {
    return HORAS_VALIDAS.includes(hora);
  }

  function diaValido(fechaStr) {
    if (!fechaStr) return false;
    const f = new Date(fechaStr + 'T12:00:00');
    if (isNaN(f.getTime())) return false;
    return f.getDay() >= 0 && f.getDay() <= 6;
  }

  function setMsg(texto, esError = false) {
    msg.textContent = texto;
    msg.classList.toggle('error', esError);
  }

  inputHora.addEventListener('change', () => {
    if (!horaValida(inputHora.value)) {
      setMsg('Selecciona una hora válida (9:00 AM a 7:00 PM, en punto).', true);
      inputHora.value = '';
    } else {
      setMsg('');
    }
  });

  inputFecha.addEventListener('change', () => {
    if (!diaValido(inputFecha.value)) {
      setMsg('Selecciona una fecha válida.', true);
      inputFecha.value = '';
    } else {
      setMsg('');
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const cliente = inputCliente.value.trim();
    const fecha = inputFecha.value;
    const hora = inputHora.value;
    const servicio = inputServicio.value;

    if (!cliente) {
      setMsg('Por favor escribe tu nombre.', true);
      inputCliente.focus();
      return;
    }
    if (!fecha || !diaValido(fecha)) {
      setMsg('Selecciona una fecha válida (Lunes a Domingo).', true);
      inputFecha.focus();
      return;
    }
    if (!hora || !horaValida(hora)) {
      setMsg('Selecciona una hora válida (9:00 AM a 7:00 PM, en punto).', true);
      inputHora.focus();
      return;
    }
    if (!servicio) {
      setMsg('Selecciona un servicio.', true);
      inputServicio.focus();
      return;
    }

    const f = new Date(fecha + 'T12:00:00');
    const fechaLegible = f.toLocaleDateString('es-MX', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const [h, m] = hora.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 === 0 ? 12 : h % 12;
    const horaLegible = `${h12}:${String(m).padStart(2, '0')} ${ampm}`;

    const mensaje =
      `Hola, quiero agendar una cita en Barber Cuts 79.%0A%0A` +
      `👤 *Nombre:* ${encodeURIComponent(cliente)}%0A` +
      `📅 *Fecha:* ${encodeURIComponent(fechaLegible)}%0A` +
      `🕘 *Hora:* ${encodeURIComponent(horaLegible)}%0A` +
      `✂️ *Servicio:* ${encodeURIComponent(servicio)}%0A%0A` +
      `Quedo atento a la confirmación.`;

    window.open(`https://wa.me/${WHATSAPP}?text=${mensaje}`, '_blank', 'noopener');

    setMsg('✅ Abriendo WhatsApp para enviar tu cita...');
    form.reset();
    inputFecha.min = `${yyyy}-${mm}-${dd}`;
  });
}