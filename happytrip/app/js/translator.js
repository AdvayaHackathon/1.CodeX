// Translator and Culture Guide JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Toggle sidebar
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (sidebarToggle && sidebar && mainContent) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('expanded');
        });
    }

    // Translator functionality
    const sourceLanguage = document.getElementById('sourceLanguage');
    const targetLanguage = document.getElementById('targetLanguage');
    const sourceText = document.getElementById('sourceText');
    const translatedText = document.getElementById('translatedText');
    const translateBtn = document.getElementById('translateBtn');
    const swapLanguagesBtn = document.getElementById('swapLanguagesBtn');
    const listenBtn = document.getElementById('listenBtn');
    const copyBtn = document.getElementById('copyBtn');

    // Simulate translation (in a real app, this would use an API)
    if (translateBtn) {
        translateBtn.addEventListener('click', function() {
            if (!sourceText.value.trim()) {
                alert('Please enter text to translate');
                return;
            }
            
            // Simulate API call with loading state
            translatedText.value = 'Translating...';
            setTimeout(() => {
                // Simple mock translation - in real app, this would be an API call
                const mockTranslations = {
                    'en-hi': {
                        'hello': 'नमस्ते',
                        'thank you': 'धन्यवाद',
                        'how are you': 'आप कैसे हैं',
                        'goodbye': 'अलविदा',
                        'yes': 'हां',
                        'no': 'नहीं',
                        'please': 'कृपया',
                        'sorry': 'माफ़ करें',
                        'food': 'खाना',
                        'water': 'पानी'
                    },
                    'en-fr': {
                        'hello': 'bonjour',
                        'thank you': 'merci',
                        'how are you': 'comment ça va',
                        'goodbye': 'au revoir',
                        'yes': 'oui',
                        'no': 'non',
                        'please': 's\'il vous plaît',
                        'sorry': 'désolé',
                        'food': 'nourriture',
                        'water': 'eau'
                    },
                    'en-es': {
                        'hello': 'hola',
                        'thank you': 'gracias',
                        'how are you': 'cómo estás',
                        'goodbye': 'adiós',
                        'yes': 'sí',
                        'no': 'no',
                        'please': 'por favor',
                        'sorry': 'lo siento',
                        'food': 'comida',
                        'water': 'agua'
                    }
                };
                
                const fromLang = sourceLanguage.value;
                const toLang = targetLanguage.value;
                const text = sourceText.value.toLowerCase().trim();
                
                // Check if we have a mock translation
                if (fromLang === 'en' && mockTranslations[`en-${toLang}`] && mockTranslations[`en-${toLang}`][text]) {
                    translatedText.value = mockTranslations[`en-${toLang}`][text];
                } else {
                    // For words/phrases we don't have in our mock data or other language combinations
                    translatedText.value = `[${fromLang} to ${toLang}] ` + sourceText.value + ' (simulated translation)';
                }
            }, 800);
        });
    }

    // Swap languages
    if (swapLanguagesBtn) {
        swapLanguagesBtn.addEventListener('click', function() {
            const tempLang = sourceLanguage.value;
            sourceLanguage.value = targetLanguage.value;
            targetLanguage.value = tempLang;
            
            // Also swap text if there's translated content
            if (translatedText.value && translatedText.value !== 'Translating...') {
                const tempText = sourceText.value;
                sourceText.value = translatedText.value;
                translatedText.value = tempText;
            }
        });
    }

    // Text-to-speech functionality
    if (listenBtn) {
        listenBtn.addEventListener('click', function() {
            if (!translatedText.value || translatedText.value === 'Translating...') {
                alert('Please translate text first');
                return;
            }
            
            // Using the Web Speech API for text-to-speech
            if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(translatedText.value);
                const lang = targetLanguage.value;
                
                // Map language codes to speech synthesis language codes
                const langMap = {
                    'en': 'en-US',
                    'hi': 'hi-IN',
                    'fr': 'fr-FR',
                    'es': 'es-ES',
                    'ja': 'ja-JP',
                    'de': 'de-DE',
                    'it': 'it-IT',
                    'th': 'th-TH'
                };
                
                utterance.lang = langMap[lang] || 'en-US';
                window.speechSynthesis.speak(utterance);
            } else {
                alert('Sorry, text-to-speech is not supported in your browser');
            }
        });
    }

    // Copy to clipboard
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            if (!translatedText.value || translatedText.value === 'Translating...') {
                alert('Please translate text first');
                return;
            }
            
            translatedText.select();
            document.execCommand('copy');
            
            // Visual feedback
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
            }, 2000);
        });
    }

    // Phrase Book functionality
    const phrasebookLanguage = document.getElementById('phrasebookLanguage');
    const phraseCategory = document.getElementById('phraseCategory');
    const phraseList = document.getElementById('phraseList');

    // Sample phrases data
    const phrasesData = {
        'greetings': {
            'hi': [
                { english: 'Hello', translation: 'नमस्ते (Namaste)' },
                { english: 'Good morning', translation: 'सुप्रभात (Suprabhat)' },
                { english: 'How are you?', translation: 'आप कैसे हैं? (Aap kaise hain?)' },
                { english: 'My name is...', translation: 'मेरा नाम है... (Mera naam hai...)' },
                { english: 'Nice to meet you', translation: 'आपसे मिलकर खुशी हुई (Aapse milkar khushi hui)' }
            ],
            'fr': [
                { english: 'Hello', translation: 'Bonjour' },
                { english: 'Good morning', translation: 'Bonjour (morning) / Bonsoir (evening)' },
                { english: 'How are you?', translation: 'Comment ça va?' },
                { english: 'My name is...', translation: 'Je m\'appelle...' },
                { english: 'Nice to meet you', translation: 'Enchanté(e)' }
            ],
            'es': [
                { english: 'Hello', translation: 'Hola' },
                { english: 'Good morning', translation: 'Buenos días' },
                { english: 'How are you?', translation: '¿Cómo estás?' },
                { english: 'My name is...', translation: 'Me llamo...' },
                { english: 'Nice to meet you', translation: 'Mucho gusto' }
            ]
        },
        'emergencies': {
            'hi': [
                { english: 'Help!', translation: 'मदद! (Madad!)' },
                { english: 'Call the police!', translation: 'पुलिस को बुलाओ! (Police ko bulao!)' },
                { english: 'I need a doctor', translation: 'मुझे डॉक्टर की जरूरत है (Mujhe doctor ki zarurat hai)' },
                { english: 'Where is the hospital?', translation: 'अस्पताल कहां है? (Aspatal kahan hai?)' },
                { english: 'I\'m lost', translation: 'मैं खो गया हूं (Main kho gaya hoon)' }
            ],
            'fr': [
                { english: 'Help!', translation: 'Au secours!' },
                { english: 'Call the police!', translation: 'Appelez la police!' },
                { english: 'I need a doctor', translation: 'J\'ai besoin d\'un médecin' },
                { english: 'Where is the hospital?', translation: 'Où est l\'hôpital?' },
                { english: 'I\'m lost', translation: 'Je suis perdu(e)' }
            ],
            'es': [
                { english: 'Help!', translation: '¡Ayuda!' },
                { english: 'Call the police!', translation: '¡Llame a la policía!' },
                { english: 'I need a doctor', translation: 'Necesito un médico' },
                { english: 'Where is the hospital?', translation: '¿Dónde está el hospital?' },
                { english: 'I\'m lost', translation: 'Estoy perdido/a' }
            ]
        },
        'dining': {
            'hi': [
                { english: 'Table for two, please', translation: 'दो लोगों के लिए मेज़, कृपया (Do logon ke liye mez, kripya)' },
                { english: 'Can I see the menu, please?', translation: 'क्या मैं मेन्यू देख सकता हूं? (Kya main menu dekh sakta hoon?)' },
                { english: 'I am vegetarian', translation: 'मैं शाकाहारी हूं (Main shakahari hoon)' },
                { english: 'The bill, please', translation: 'बिल, कृपया (Bill, kripya)' },
                { english: 'It was delicious', translation: 'यह स्वादिष्ट था (Yeh swaadisht tha)' }
            ],
            'fr': [
                { english: 'Table for two, please', translation: 'Une table pour deux, s\'il vous plaît' },
                { english: 'Can I see the menu, please?', translation: 'Puis-je voir le menu, s\'il vous plaît?' },
                { english: 'I am vegetarian', translation: 'Je suis végétarien(ne)' },
                { english: 'The bill, please', translation: 'L\'addition, s\'il vous plaît' },
                { english: 'It was delicious', translation: 'C\'était délicieux' }
            ],
            'es': [
                { english: 'Table for two, please', translation: 'Una mesa para dos, por favor' },
                { english: 'Can I see the menu, please?', translation: '¿Puedo ver el menú, por favor?' },
                { english: 'I am vegetarian', translation: 'Soy vegetariano/a' },
                { english: 'The bill, please', translation: 'La cuenta, por favor' },
                { english: 'It was delicious', translation: 'Estaba delicioso' }
            ]
        }
    };

    // Update phrase list when language or category changes
    function updatePhraseList() {
        if (!phraseList) return;
        
        const language = phrasebookLanguage.value;
        const category = phraseCategory.value;
        
        // Clear existing phrases
        phraseList.innerHTML = '';
        
        // Get phrases for selected language and category
        const phrases = phrasesData[category] && phrasesData[category][language];
        
        if (phrases && phrases.length > 0) {
            phrases.forEach(phrase => {
                const li = document.createElement('li');
                li.className = 'list-group-item phrase-item';
                li.innerHTML = `
                    <div class="phrase-english">${phrase.english}</div>
                    <div class="phrase-translation">${phrase.translation}</div>
                    <button class="btn btn-sm btn-outline-primary phrase-listen">
                        <i class="fas fa-volume-up"></i>
                    </button>
                `;
                phraseList.appendChild(li);
                
                // Add listen functionality to phrase
                const listenButton = li.querySelector('.phrase-listen');
                listenButton.addEventListener('click', function() {
                    if ('speechSynthesis' in window) {
                        const utterance = new SpeechSynthesisUtterance(phrase.translation);
                        const langMap = {
                            'hi': 'hi-IN',
                            'fr': 'fr-FR',
                            'es': 'es-ES',
                            'ja': 'ja-JP',
                            'de': 'de-DE',
                            'it': 'it-IT',
                            'th': 'th-TH'
                        };
                        utterance.lang = langMap[language] || 'en-US';
                        window.speechSynthesis.speak(utterance);
                    }
                });
            });
        } else {
            phraseList.innerHTML = '<li class="list-group-item">No phrases available for this selection</li>';
        }
    }

    // Initialize phrase list
    if (phrasebookLanguage && phraseCategory && phraseList) {
        updatePhraseList();
        
        // Event listeners for changing language or category
        phrasebookLanguage.addEventListener('change', updatePhraseList);
        phraseCategory.addEventListener('change', updatePhraseList);
    }

    // Cultural Guide functionality
    const cultureCountry = document.getElementById('cultureCountry');
    
    // Sample culture data for other countries (in a real app, this would be more comprehensive)
    const culturesData = {
        'japan': {
            title: 'Cultural Etiquette in Japan',
            sections: [
                { icon: 'handshake', title: 'Greetings', text: 'Bowing is the common greeting. The depth and duration indicate the level of respect. Avoid initiating handshakes, though many Japanese are familiar with this western custom.' },
                { icon: 'utensils', title: 'Dining', text: 'Never stick chopsticks vertically in rice. Say "itadakimasu" before eating and "gochisousama" after. Slurping noodles is acceptable and shows appreciation.' },
                { icon: 'shoe-prints', title: 'Homes', text: 'Always remove shoes before entering a Japanese home or traditional establishments. There\'s often a dedicated area in the entryway for this purpose.' },
                { icon: 'comments', title: 'Communication', text: 'Avoid direct "no" answers. Japanese often communicate indirectly. Silence is valued and not uncomfortable. Avoid excessive physical contact or talking loudly in public.' },
                { icon: 'user-tie', title: 'Business', text: 'Business cards (meishi) are exchanged with both hands and a slight bow. Examine cards carefully before placing them on the table, not in a pocket.' },
                { icon: 'users', title: 'Public Behavior', text: 'Maintain proper queue etiquette. Avoid eating while walking in public. Talking on phones in public transport is discouraged. Public displays of affection are uncommon.' }
            ]
        },
        'india': {
            title: 'Cultural Etiquette in India',
            sections: [
                { icon: 'hands-praying', title: 'Greetings', text: 'Namaste (palms pressed together) is the traditional greeting. Many Indians will shake hands with foreigners. Remove shoes before entering homes and temples.' },
                { icon: 'hand-paper', title: 'Hand Gestures', text: 'The left hand is considered unclean; use your right hand for eating or passing objects. Pointing with fingers is considered rude; use your chin or entire hand instead.' },
                { icon: 'utensils', title: 'Dining', text: 'Many Indians eat with their hands (right hand only). If invited to someone\'s home, bringing a small gift is appreciated. Refusing food or drink may be considered impolite.' },
                { icon: 'tshirt', title: 'Clothing', text: 'Dress modestly, especially at religious sites. Women should cover shoulders and knees. Men should wear long pants in formal or religious settings.' },
                { icon: 'om', title: 'Religion', text: 'India has many religions; respect religious customs. Ask before taking photos in religious places, and follow any specific rules regarding clothing or behavior.' },
                { icon: 'users', title: 'Social Customs', text: 'Head wobbling or bobbing can mean "yes" or "I understand." Public displays of affection are uncommon and may cause offense. Respect personal space in crowded areas.' }
            ]
        },
        'france': {
            title: 'Cultural Etiquette in France',
            sections: [
                { icon: 'handshake', title: 'Greetings', text: 'La bise (cheek-kissing) is common among friends. Shaking hands is standard in formal or business settings. Always say "Bonjour" when entering shops or speaking to someone.' },
                { icon: 'utensils', title: 'Dining', text: 'Keep hands visible on the table, not on your lap. Bread is placed directly on the tablecloth. Only begin eating after everyone is served and the host says "Bon appétit!"' },
                { icon: 'comments', title: 'Communication', text: 'French people value articulate conversation and debate. Small talk is less common; discussions about politics, philosophy, and art are appreciated.' },
                { icon: 'clock', title: 'Punctuality', text: 'Being 5-10 minutes late for social gatherings is common but arrive on time for business meetings. Shops and businesses often close for lunch (12-2 pm).' },
                { icon: 'wine-glass', title: 'Drinking', text: 'Wine is an important part of culture and dining. Never fill your own glass; pour for others and they will pour for you. Public intoxication is frowned upon.' },
                { icon: 'user-tie', title: 'Formality', text: 'Use formal titles (Monsieur, Madame) until invited to use first names. Dress elegantly for social occasions; casual attire is less common in cities.' }
            ]
        }
    };

    // Update culture guide when country changes
    function updateCultureGuide() {
        if (!cultureCountry) return;
        
        const country = cultureCountry.value;
        
        // Hide all culture sections
        document.querySelectorAll('.culture-section').forEach(section => {
            section.style.display = 'none';
        });
        
        // Show selected country's culture section
        const currentSection = document.getElementById(`${country}Culture`);
        
        if (currentSection) {
            currentSection.style.display = 'block';
        } else if (culturesData[country]) {
            // Create section if it doesn't exist
            const cultureData = culturesData[country];
            const cultureGuideContainer = document.querySelector('.culture-guide-container');
            
            if (cultureGuideContainer) {
                const newSection = document.createElement('div');
                newSection.id = `${country}Culture`;
                newSection.className = 'culture-section';
                
                let sectionHTML = `<h4>${cultureData.title}</h4><div class="row">`;
                
                cultureData.sections.forEach(section => {
                    sectionHTML += `
                        <div class="col-md-4 mb-3">
                            <div class="card culture-card">
                                <div class="card-body">
                                    <h5 class="card-title"><i class="fas fa-${section.icon}"></i> ${section.title}</h5>
                                    <p class="card-text">${section.text}</p>
                                </div>
                            </div>
                        </div>
                    `;
                });
                
                sectionHTML += '</div>';
                newSection.innerHTML = sectionHTML;
                cultureGuideContainer.appendChild(newSection);
            }
        }
    }

    // Initialize culture guide
    if (cultureCountry) {
        updateCultureGuide();
        
        // Event listener for changing country
        cultureCountry.addEventListener('change', updateCultureGuide);
    }
}); 