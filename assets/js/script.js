// Menu mobile toggle
const toggleBtn = document.getElementById("menuToggle");
const dropdownMenu = document.getElementById("dropdownMenu");

if (toggleBtn && dropdownMenu) {
  toggleBtn.addEventListener("click", () => {
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

  (function () {
    // Efeito parallax no hero
    const heroBackground = document.querySelector(".hero-background");
    const heroContent = document.querySelector(".hero-content");

    if (heroBackground && heroContent) {
      window.addEventListener(
        "scroll",
        function () {
          const scrollPosition = window.scrollY;
          const windowHeight = window.innerHeight;

          // Só aplica o efeito enquanto o hero estiver visível
          if (scrollPosition <= windowHeight) {
            // Parallax mais suave - move o background mais devagar que o scroll
            const parallaxSpeed = 0.5;
            const translateY = scrollPosition * parallaxSpeed;

            // Aplica a transformação
            heroBackground.style.transform = `translate3d(0, ${translateY}px, 0) scale(1.1)`;

            // Efeito de fade no conteúdo
            const opacity = 1 - (scrollPosition / windowHeight) * 0.3;
            heroContent.style.opacity = Math.max(opacity, 0.7);

            // Efeito de escala sutil no conteúdo
            const scale = 1 - (scrollPosition / windowHeight) * 0.02;
            heroContent.style.transform = `scale(${Math.max(scale, 0.98)})`;
          }
        },
        { passive: true },
      ); // passive: true para melhor performance
    }

    // Efeito de reveal suave para o conteúdo ao carregar
    window.addEventListener("load", function () {
      document.body.classList.add("loaded");
    });
  })();

  //Efeito Parallax 01
  // Efeito de zoom out no scroll
  window.addEventListener("scroll", function () {
    const parallaxSection = document.getElementById("parallax1");
    const scrollPosition = window.scrollY;
    const sectionTop = parallaxSection.offsetTop;
    const sectionHeight = parallaxSection.offsetHeight;
    const windowHeight = window.innerHeight;

    // Calcula a distância do scroll em relação à seção
    const distanceFromTop = scrollPosition + windowHeight;
    const sectionMiddle = sectionTop + sectionHeight / 2;

    // Quando a seção está visível, aplica o efeito de escala
    if (
      distanceFromTop > sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      // Calcula o progresso do scroll dentro da seção (0 a 1)
      const progress = Math.min(
        1,
        Math.max(
          0,
          (scrollPosition + windowHeight - sectionTop) /
            (sectionHeight + windowHeight),
        ),
      );

      // Escala varia de 1.2 a 1 (zoom out progressivo)
      const scale = 1.2 - progress * 0.2;
      parallaxSection.style.transform = `scale(${scale})`;
    } else if (scrollPosition < sectionTop) {
      // Antes de entrar na seção
      parallaxSection.style.transform = "scale(1.2)";
    } else {
      // Depois de sair da seção
      parallaxSection.style.transform = "scale(1)";
    }
  });

  // Trigger inicial para definir escala antes do scroll
  window.dispatchEvent(new Event("scroll"));
}
