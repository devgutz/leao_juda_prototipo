// script.js - Funcionalidades principais

(function() {
    'use strict';
    
    // Aguarda o carregamento completo do DOM
    document.addEventListener('DOMContentLoaded', function() {
        
        // ===== MENU MOBILE =====
        const menuToggle = document.getElementById('menuToggle');
        const dropdownMenu = document.getElementById('dropdownMenu');
        
        if (menuToggle && dropdownMenu) {
            // Toggle do menu ao clicar no botão
            menuToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                const isOpen = dropdownMenu.classList.contains('open');
                
                if (isOpen) {
                    closeMenu();
                } else {
                    openMenu();
                }
            });
            
            // Fechar menu ao clicar em qualquer link
            const menuLinks = dropdownMenu.querySelectorAll('a');
            menuLinks.forEach(link => {
                link.addEventListener('click', function() {
                    closeMenu();
                });
            });
            
            // Fechar menu ao clicar fora
            document.addEventListener('click', function(e) {
                if (!menuToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
                    closeMenu();
                }
            });
            
            // Fechar menu ao pressionar ESC
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && dropdownMenu.classList.contains('open')) {
                    closeMenu();
                }
            });
            
            function openMenu() {
                dropdownMenu.classList.add('open');
                menuToggle.setAttribute('aria-expanded', 'true');
                menuToggle.setAttribute('aria-label', 'Fechar menu');
            }
            
            function closeMenu() {
                dropdownMenu.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.setAttribute('aria-label', 'Abrir menu');
            }
        }
        
        // ===== HEADER SCROLL EFFECT =====
        const header = document.querySelector('header');
        let lastScrollY = window.scrollY;
        
        if (header) {
            window.addEventListener('scroll', function() {
                // Efeito de esconder/mostrar header ao rolar (opcional)
                if (window.scrollY > lastScrollY && window.scrollY > 100) {
                    // Rolar para baixo - esconder header
                    header.style.transform = 'translateY(-100%)';
                } else {
                    // Rolar para cima - mostrar header
                    header.style.transform = 'translateY(0)';
                }
                
                // Adicionar fundo mais sólido quando rolar
                if (window.scrollY > 50) {
                    header.style.background = 'rgba(0, 18, 26, 0.98)';
                } else {
                    header.style.background = 'rgba(0, 18, 26, 0.95)';
                }
                
                lastScrollY = window.scrollY;
            });
        }
        
        // ===== EFEITO PARALLAX =====
        // Função para evitar duplicação de código
        function setupParallax(sectionId) {
            const parallaxSection = document.getElementById(sectionId);
            
            if (parallaxSection && window.innerWidth > 768) {
                window.addEventListener('scroll', function() {
                    const scrollPosition = window.scrollY;
                    const sectionTop = parallaxSection.offsetTop;
                    const sectionHeight = parallaxSection.offsetHeight;
                    const windowHeight = window.innerHeight;
                    
                    // Ativar efeito apenas quando a seção estiver visível
                    if (scrollPosition + windowHeight > sectionTop && 
                        scrollPosition < sectionTop + sectionHeight) {
                        
                        // Efeito de zoom suave (calculado com base no scroll)
                        const relativeScroll = scrollPosition - sectionTop;
                        const maxZoom = 1.05;
                        const minZoom = 1;
                        
                        // Aplica zoom apenas dentro de um range
                        if (relativeScroll > -windowHeight && relativeScroll < sectionHeight + windowHeight) {
                            const progress = Math.min(Math.max(relativeScroll / (sectionHeight + windowHeight), 0), 1);
                            const zoom = minZoom + (maxZoom - minZoom) * progress;
                            parallaxSection.style.transform = `scale(${zoom})`;
                        }
                    }
                });
            }
        }
        
        // Inicializar parallax para as seções
        setupParallax('parallax1');
        setupParallax('parallax2');
        
        // ===== DESTACAR LINK ATIVO NO MENU =====
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.navbar-links a, .dropdown_menu_navbar a');
        
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPage) {
                link.setAttribute('aria-current', 'page');
                
                // Opcional: adicionar classe para estilo visual
                if (!link.classList.contains('action_btn_navbar')) {
                    link.style.color = 'var(--color-400)';
                }
            }
        });
        
        // ===== SCROLL SUAVE PARA LINKS INTERNOS =====
        const internalLinks = document.querySelectorAll('a[href^="#"]');
        
        internalLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // ===== OTIMIZAÇÃO PARA DISPOSITIVOS MÓVEIS =====
        // Prevenir zoom em inputs em dispositivos iOS
        const viewportMeta = document.querySelector('meta[name="viewport"]');
        if (viewportMeta && /iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            viewportMeta.setAttribute('content', 
                'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes');
        }
        
        // ===== CARREGAMENTO DE IMAGENS COM FALLBACK =====
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('error', function() {
                // Fallback para imagem padrão caso alguma não carregue
                console.warn(`Imagem não carregou: ${this.src}`);
                // Opcional: definir uma imagem padrão
                // this.src = 'assets/img/placeholder.jpg';
            });
        });
        
        console.log('Leão de Judá - Site carregado com sucesso!');
    });

})(); // Fechamento correto da IIFE

document.addEventListener('DOMContentLoaded', function() {
            new Swiper('.ministerios-swiper', {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: true,
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                },
                // Efeito de rotação suave
                effect: 'slide',
                speed: 800,
            });
        });