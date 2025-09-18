document.addEventListener('DOMContentLoaded', () => {
            
    /*
    |--------------------------------------------------------------------------
    | SCRIPT STATUS CONFIGURATION
    |--------------------------------------------------------------------------
    |
    | This is the easiest place to update the status of your script.
    | Just change the text inside the quotes below to one of the
    | three available options.
    |
    | Available Options:
    |   - "Online"  (Displays a green glowing dot)
    |   - "Testing" (Displays an orange glowing dot)
    |   - "Offline" (Displays a red glowing dot)
    |
    */
    const currentStatus = "Online";


    const statusIndicator = document.getElementById('script-status-indicator');
    const statusText = document.getElementById('script-status-text');

    if (statusIndicator && statusText) {
        statusIndicator.className = 'w-2.5 h-2.5 rounded-full mr-2';
        statusText.className = '';
        
        const statusLower = currentStatus.toLowerCase();
        statusIndicator.classList.add(`status-indicator-${statusLower}`);
        statusText.classList.add(`status-text-${statusLower}`);
        statusText.textContent = currentStatus;
    }

    document.querySelectorAll('a.nav-link[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    const openModal = (modal) => {
        modal.classList.remove('hidden');
        setTimeout(() => {
            modal.classList.remove('opacity-0', 'scale-95');
        }, 10);
    };

    const closeModal = (modal) => {
        modal.classList.add('opacity-0', 'scale-95');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    };

    const featuresData = {
        ff2: {
            title: 'FF2 Script Features',
            features: {
                'General': [
                    'Advanced Aimbot with prediction',
                    'Customizable Style Throws',
                    'Automated Route Assists',
                    'Anti-Tag Visuals',
                    'Fully Customizable HUD'
                ]
            }
        },
        rivals: {
            title: 'Rivals - Full Feature List',
            features: {
                'Combat Features': ['Mouse Aimbot', 'Mouse Aimbot Target Part', 'Mouse Aimbot Smoothness', 'Silent Aim', 'Head Hit Chance', 'Max Distance', 'FOV Visible', 'FOV Size', 'Anti Katana', 'Triggerbot', 'No Recoil', 'Rapid Fire', 'No Spread', 'Instant Aim', 'Teleport Above Player', 'Teleport Height', 'Teleport Key-bind'],
                'Visuals Features': ['Highlight ESP', 'Team Highlight Color / Enemy Highlight Color', 'Max Highlight Distance', 'Box ESP, Tracers, Name ESP, Weapon ESP', 'Health Bar and Health Value', 'Hide Dead, Hide Team', 'Show Skeleton for R15', 'Team Color / Enemy Color', 'Max Distance for ESP features'],
                'Utilities / Movement': ['UI Toggle Key', 'Use WalkSpeed / WalkSpeed value', 'Use JumpPower / Jump Power value', 'Fly with Toggle key and Fly Speed', 'Noclip with Toggle Key', 'SpinBot with speed', 'Bhop, Auto Ping, Infinite Jump', 'Anti Flash, No Smoke, Explode Trignines', 'No Killbricks, No Out Of Bounds, Walk on Water', 'Device Spoofer (Mouse/Keyboard, Touch, Gamepad, VR)', 'AutoSelectGun + AutoSelectPrimary/Secondary/Melee/Utility'],
                'Anti-Cheat & Misc': ['Anti-Cheat Bypass', 'Notification system with custom icons', 'Settings auto-save and load', 'Handles R6 and R15 rigs for ESP/Skeleton', 'Streamer mode support for all UI text', 'Weapon ownership detection for auto-select']
            }
        }
    };
    
    const featuresModal = document.getElementById('features-modal');
    const closeFeaturesModalButton = document.getElementById('close-features-modal-button');
    const featuresModalTitle = document.getElementById('features-modal-title');
    const featuresModalList = document.getElementById('features-modal-list');

    function showFeatures(featureKey) {
        const data = featuresData[featureKey];
        if (data) {
            featuresModalTitle.textContent = data.title;
            let content = '';
            for (const category in data.features) {
                content += `<h4 class="text-xl font-semibold text-white mt-6 first:mt-0 mb-3">${category}</h4>`;
                content += '<ul class="list-disc list-inside text-gray-400 space-y-1.5">';
                content += data.features[category].map(item => `<li>${item}</li>`).join('');
                content += '</ul>';
            }
            featuresModalList.innerHTML = content;
            openModal(featuresModal);
        }
    }

    document.querySelectorAll('.see-features-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            showFeatures(button.dataset.features);
        });
    });

    closeFeaturesModalButton.addEventListener('click', () => closeModal(featuresModal));
    featuresModal.addEventListener('click', (e) => {
         if (e.target.id === 'features-modal') closeModal(featuresModal);
    });

    const featuresSelectionModal = document.getElementById('features-selection-modal');
    const openFeaturesSelectionModalButton = document.getElementById('features-nav-button');
    const openFeaturesSelectionModalButton2 = document.getElementById('features-nav-button-secondary');

    function openFeaturesSelectionModal(e) {
         e.preventDefault();
         openModal(featuresSelectionModal);
    }
    
    openFeaturesSelectionModalButton.addEventListener('click', openFeaturesSelectionModal);
    openFeaturesSelectionModalButton2.addEventListener('click', openFeaturesSelectionModal);

    const closeFeaturesSelectionModalButton = document.getElementById('close-features-selection-modal-button');
    
    document.querySelectorAll('.select-feature-card').forEach(card => {
        card.addEventListener('click', () => {
            const featureKey = card.dataset.features;
            closeModal(featuresSelectionModal);
            setTimeout(() => showFeatures(featureKey), 300);
        });
    });
    
    closeFeaturesSelectionModalButton.addEventListener('click', () => closeModal(featuresSelectionModal));
    featuresSelectionModal.addEventListener('click', (e) => {
         if (e.target.id === 'features-selection-modal') closeModal(featuresSelectionModal);
    });
    
    const purchaseModal = document.getElementById('purchase-modal');
    const openPurchaseModalButtons = document.querySelectorAll('.get-key-button');
    const closePurchaseModalButton = document.getElementById('close-purchase-modal-button');

    openPurchaseModalButtons.forEach(button => button.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(purchaseModal);
    }));

    closePurchaseModalButton.addEventListener('click', () => closeModal(purchaseModal));
    purchaseModal.addEventListener('click', (e) => {
        if (e.target.id === 'purchase-modal') closeModal(purchaseModal);
    });

    const pricingModal = document.getElementById('pricing-modal');
    const openPricingModalButtons = document.querySelectorAll('.setup-guide-button, .pricing-button');
    const closePricingModalButton = document.getElementById('close-pricing-modal-button');

    openPricingModalButtons.forEach(button => button.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(pricingModal);
    }));

    closePricingModalButton.addEventListener('click', () => closeModal(pricingModal));
    pricingModal.addEventListener('click', (e) => {
        if (e.target.id === 'pricing-modal') closeModal(pricingModal);
    });
    
    const cards = document.querySelectorAll('.card-glow-border');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const { width, height } = rect;
            const rotateX = (y / height - 0.5) * -20;
            const rotateY = (x / width - 0.5) * 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
    
    const slider = document.querySelector('.slider');
    const track = document.querySelector('.slider-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');
    const dotsNav = document.querySelector('.slider-dots');
    
    if (slides.length > 0) {
        const slideWidth = slides[0].getBoundingClientRect().width;

        const setSlidePosition = (slide, index) => {
            slide.style.left = slideWidth * index + 'px';
        };
        slides.forEach(setSlidePosition);

        const updateDots = (currentDot, targetDot) => {
            currentDot.classList.remove('active');
            targetDot.classList.add('active');
        }
        
        slides.forEach((slide, index) => {
            const button = document.createElement('button');
            button.classList.add('dot');
            if (index === 0) button.classList.add('active');
            dotsNav.appendChild(button);
        });
        const dots = Array.from(dotsNav.children);

        prevButton.addEventListener('click', e => {
            const currentSlide = track.querySelector('.current-slide') || slides[0];
            const prevSlide = currentSlide.previousElementSibling || slides[slides.length - 1];
            const currentDot = dotsNav.querySelector('.active');
            const prevDot = currentDot.previousElementSibling || dots[dots.length - 1];

            track.style.transform = `translateX(-${(slides.indexOf(prevSlide)) * 100}%)`;
            currentSlide.classList.remove('current-slide');
            prevSlide.classList.add('current-slide');
            updateDots(currentDot, prevDot);
        });

        nextButton.addEventListener('click', e => {
            const currentSlide = track.querySelector('.current-slide') || slides[0];
            const nextSlide = currentSlide.nextElementSibling || slides[0];
            const currentDot = dotsNav.querySelector('.active');
            const nextDot = currentDot.nextElementSibling || dots[0];
            
            track.style.transform = `translateX(-${(slides.indexOf(nextSlide)) * 100}%)`;
            currentSlide.classList.remove('current-slide');
            nextSlide.classList.add('current-slide');
            updateDots(currentDot, nextDot);
        });
        
        dotsNav.addEventListener('click', e => {
            const targetDot = e.target.closest('button.dot');
            if (!targetDot) return;
            
            const currentSlide = track.querySelector('.current-slide') || slides[0];
            const currentDot = dotsNav.querySelector('.active');
            const targetIndex = dots.findIndex(dot => dot === targetDot);
            const targetSlide = slides[targetIndex];
            
            track.style.transform = `translateX(-${targetIndex * 100}%)`;
            currentSlide.classList.remove('current-slide');
            targetSlide.classList.add('current-slide');
            
            updateDots(currentDot, targetDot);
        });
    }

    // --- AI Chatbot Logic ---
    const chatWidget = document.getElementById('ai-chat-widget');
    const chatWindow = document.getElementById('ai-chat-window');
    const closeChatButton = document.getElementById('close-chat-button');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const chatSubmitButton = document.getElementById('chat-submit-button');

    const appendMessage = (text, sender) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', `${sender}-message`);
        messageElement.textContent = text;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };
    
    const showTypingIndicator = () => {
        const indicator = document.createElement('div');
        indicator.id = 'typing-indicator';
        indicator.classList.add('chat-message', 'ai-message', 'typing-indicator');
        indicator.innerHTML = `<span></span><span></span><span></span>`;
        chatMessages.appendChild(indicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const removeTypingIndicator = () => {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    };
    
    appendMessage("Hi! I'm the Exerium Assistant. How can I help you today?", 'ai');

    chatWidget.addEventListener('click', () => {
        chatWindow.classList.toggle('hidden');
        setTimeout(() => {
             chatWindow.classList.toggle('opacity-0');
             chatWindow.classList.toggle('scale-95');
        }, 10);
    });

    closeChatButton.addEventListener('click', () => {
        closeModal(chatWindow);
    });

    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const userMessage = chatInput.value.trim();
        if (!userMessage) return;

        appendMessage(userMessage, 'user');
        chatInput.value = '';
        chatSubmitButton.disabled = true;
        showTypingIndicator();

        try {
            const response = await fetch('/api/gemini', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: userMessage }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            removeTypingIndicator();
            appendMessage(data.reply, 'ai');
        } catch (error) {
            removeTypingIndicator();
            appendMessage("Sorry, I couldn't connect to the AI. Please try again later.", 'ai');
        } finally {
            chatSubmitButton.disabled = false;
        }
    });
});

