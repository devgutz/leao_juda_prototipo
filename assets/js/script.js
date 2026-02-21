// Menu mobile toggle
const toggleBtn = document.getElementById("menuToggle");
const dropdownMenu = document.getElementById("dropdownMenu");

if (toggleBtn && dropdownMenu) {
  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle("open");
  });

  // Fechar menu ao clicar em um link
  const dropdownLinks = dropdownMenu.querySelectorAll("a");
  dropdownLinks.forEach((link) => {
    link.addEventListener("click", () => {
      dropdownMenu.classList.remove("open");
    });
  });

  // Fechar menu ao clicar fora
  document.addEventListener("click", (event) => {
    if (
      !toggleBtn.contains(event.target) &&
      !dropdownMenu.contains(event.target)
    ) {
      dropdownMenu.classList.remove("open");
    }
  });
}

// Detectar se é dispositivo móvel
function isMobileDevice() {
  return window.innerWidth <= 768 || window.matchMedia("(max-width: 768px)").matches;
}

// Efeito parallax no hero (desabilitado em mobile)
(function() {
  const heroBackground = document.querySelector(".hero-background");
  const heroContent = document.querySelector(".hero-content");

  if (heroBackground && heroContent && !isMobileDevice()) {
    window.addEventListener(
      "scroll",
      function() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;

        if (scrollPosition <= windowHeight) {
          const parallaxSpeed = 0.5;
          const translateY = scrollPosition * parallaxSpeed;

          heroBackground.style.transform = `translate3d(0, ${translateY}px, 0) scale(1.1)`;

          const opacity = 1 - (scrollPosition / windowHeight) * 0.3;
          heroContent.style.opacity = Math.max(opacity, 0.7);

          const scale = 1 - (scrollPosition / windowHeight) * 0.02;
          heroContent.style.transform = `scale(${Math.max(scale, 0.98)})`;
        }
      },
      { passive: true },
    );
  }
})();

// Efeito de reveal suave ao carregar
window.addEventListener("load", function() {
  document.body.classList.add("loaded");
});

// Efeito Parallax na seção (desabilitado em mobile)
(function() {
  const parallaxSection = document.getElementById("parallax1");
  
  if (parallaxSection && !isMobileDevice()) {
    window.addEventListener("scroll", function() {
      const scrollPosition = window.scrollY;
      const sectionTop = parallaxSection.offsetTop;
      const sectionHeight = parallaxSection.offsetHeight;
      const windowHeight = window.innerHeight;

      if (
        scrollPosition + windowHeight > sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        const progress = Math.min(
          1,
          Math.max(
            0,
            (scrollPosition + windowHeight - sectionTop) /
              (sectionHeight + windowHeight),
          ),
        );

        // Reduzido o scale máximo para evitar overflow
        const scale = 1.15 - progress * 0.15; // Antes era 1.2 - progress * 0.2
        parallaxSection.style.transform = `scale(${scale})`;
        parallaxSection.style.transformOrigin = 'center center'; // Garantir que o scale seja centralizado
      } else if (scrollPosition < sectionTop) {
        parallaxSection.style.transform = "scale(1.15)"; // Reduzido de 1.2 para 1.15
        parallaxSection.style.transformOrigin = 'center center';
      } else {
        parallaxSection.style.transform = "scale(1)";
        parallaxSection.style.transformOrigin = 'center center';
      }
    });

    // Trigger inicial
    window.dispatchEvent(new Event("scroll"));
  }
})();

// Listener para redimensionamento da tela (caso o usuário gire o celular)
window.addEventListener('resize', function() {
  if (isMobileDevice()) {
    // Remove todos os efeitos parallax em mobile
    const parallaxSection = document.getElementById("parallax1");
    const heroBackground = document.querySelector(".hero-background");
    const heroContent = document.querySelector(".hero-content");
    
    if (parallaxSection) {
      parallaxSection.style.transform = 'none';
    }
    
    if (heroBackground) {
      heroBackground.style.transform = 'none';
    }
    
    if (heroContent) {
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'none';
    }
  }
});