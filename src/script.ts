// Wait for DOM to be loaded
document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                (entry.target as HTMLElement).style.opacity = '1';
                (entry.target as HTMLElement).style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        (section as HTMLElement).style.opacity = '0';
        (section as HTMLElement).style.transform = 'translateY(50px)';
        (section as HTMLElement).style.transition = 'all 1s ease-out';
        observer.observe(section);
    });

    // Seasons reveal animation
    let seasonsRevealed = false;
    const seasonsSection = document.querySelector('#seasonsReveal');
    
    const seasonsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !seasonsRevealed) {
                seasonsRevealed = true;
                // Reveal seasons after 2-3 seconds
                setTimeout(() => {
                    if (seasonsSection) {
                        seasonsSection.classList.remove('hidden');
                        seasonsSection.classList.add('fade-in');
                        
                        // Animate season cards one by one
                        const seasonCards = seasonsSection.querySelectorAll('.season-card');
                        seasonCards.forEach((card, index) => {
                            const cardElement = card as HTMLElement;
                            setTimeout(() => {
                                cardElement.style.opacity = '0';
                                cardElement.style.transform = 'translateY(30px)';
                                cardElement.style.transition = 'all 0.6s ease-out';
                                
                                setTimeout(() => {
                                    cardElement.style.opacity = '1';
                                    cardElement.style.transform = 'translateY(0)';
                                }, 100);
                            }, index * 200);
                        });
                    }
                }, 2000);
            }
        });
    }, { threshold: 0.3 });

    if (seasonsSection && seasonsSection.parentElement) {
        seasonsObserver.observe(seasonsSection.parentElement);
    }

    // Add floating hearts animation
    function createHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * window.innerWidth + 'px';
        heart.style.top = window.innerHeight + 'px';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        heart.style.opacity = (Math.random() * 0.5 + 0.3).toString();
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1';
        heart.style.transition = 'all 10s linear';
        heart.style.transform = `translateX(${Math.random() * 200 - 100}px)`;
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.style.top = '-100px';
            heart.style.transform = `translateX(${Math.random() * 400 - 200}px) rotate(${Math.random() * 360}deg)`;
        }, 100);
        
        setTimeout(() => {
            heart.remove();
        }, 10000);
    }

    // Create hearts periodically
    setInterval(createHeart, 3000);

    // Add parallax effect to emojis
    document.addEventListener('mousemove', (e) => {
        const emojis = document.querySelectorAll('.emoji-animate');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        emojis.forEach((emoji, index) => {
            const emojiElement = emoji as HTMLElement;
            const speed = (index + 1) * 0.5;
            const xOffset = (x - 0.5) * speed * 20;
            const yOffset = (y - 0.5) * speed * 20;
            
            emojiElement.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });

    // Add click interaction to season cards
    document.querySelectorAll('.season-card').forEach(card => {
        const cardElement = card as HTMLElement;
        cardElement.addEventListener('click', function(this: HTMLElement) {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });
    });

    // Smooth scroll enhancement
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        const anchorElement = anchor as HTMLElement;
        anchorElement.addEventListener('click', function(this: HTMLElement, e: Event) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href') || '');
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        });
    });
});

// Add typing effect for the main title
function typeWriter(element: Element, text: string, speed: number = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const mainTitle = document.querySelector('h1');
    if (mainTitle) {
        const originalText = mainTitle.textContent || '';
        typeWriter(mainTitle, originalText, 50);
    }
});
