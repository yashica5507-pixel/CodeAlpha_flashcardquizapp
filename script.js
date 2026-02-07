document.addEventListener('DOMContentLoaded', () => {
    const defaultCards = [
        { question: "What is the capital of France?", answer: "Paris" },
        { question: "What is 5 + 7?", answer: "12" },
        { question: "Who wrote 'Romeo and Juliet'?", answer: "William Shakespeare" },
        { question: "What is the chemical symbol for Water?", answer: "H2O" },
        { question: "Which planet is known as the Red Planet?", answer: "Mars" },
        { question: "What is the largest mammal?", answer: "Blue Whale" },
        { question: "How many continents are there?", answer: "7" },
        { question: "What is the square root of 64?", answer: "8" },
        { question: "Which gas do plants absorb?", answer: "Carbon Dioxide" },
        { question: "What is the fastest land animal?", answer: "Cheetah" }
    ];

    let cards = [];
    let currentIndex = 0;

    // Elements
    const qEl = document.getElementById('question-text');
    const aEl = document.getElementById('answer-text');
    const countEl = document.getElementById('card-counter');
    const adminPanel = document.getElementById('admin-panel');
    const toggleBtn = document.getElementById('toggle-manage-btn');

    function initApp() {
        const stored = JSON.parse(localStorage.getItem('flashcards'));
        cards = (stored && stored.length > 0) ? stored : [...defaultCards];
        localStorage.setItem('flashcards', JSON.stringify(cards));
        displayCard();
    }

    function displayCard() {
        if (cards.length > 0) {
            qEl.innerText = cards[currentIndex].question;
            aEl.innerText = cards[currentIndex].answer;
            countEl.innerText = `${currentIndex + 1} of ${cards.length}`;
        }
        document.getElementById('flashcard').classList.remove('flipped');
    }

    // Toggle Admin Panel Visibility
    toggleBtn.onclick = () => {
        adminPanel.classList.toggle('hidden');
        toggleBtn.innerText = adminPanel.classList.contains('hidden') ? "⚙️ Manage Cards" : "✖ Close Manager";
    };

    // Nav Logic
    document.getElementById('next-btn').onclick = () => { if (currentIndex < cards.length - 1) { currentIndex++; displayCard(); } };
    document.getElementById('prev-btn').onclick = () => { if (currentIndex > 0) { currentIndex--; displayCard(); } };
    document.getElementById('flip-btn').onclick = () => document.getElementById('flashcard').classList.toggle('flipped');

    // Add / Edit / Delete
    document.getElementById('add-btn').onclick = () => {
        const nQ = document.getElementById('new-question');
        const nA = document.getElementById('new-answer');
        if (nQ.value && nA.value) {
            cards.push({ question: nQ.value, answer: nA.value });
            saveAndRefresh();
            nQ.value = ""; nA.value = "";
        }
    };

    document.getElementById('edit-load-btn').onclick = () => {
        document.getElementById('new-question').value = cards[currentIndex].question;
        document.getElementById('new-answer').value = cards[currentIndex].answer;
        document.getElementById('save-edit-btn').style.display = "block";
        document.getElementById('add-btn').style.display = "none";
    };

    document.getElementById('save-edit-btn').onclick = () => {
        cards[currentIndex] = { 
            question: document.getElementById('new-question').value, 
            answer: document.getElementById('new-answer').value 
        };
        saveAndRefresh();
        document.getElementById('save-edit-btn').style.display = "none";
        document.getElementById('add-btn').style.display = "block";
        document.getElementById('new-question').value = "";
        document.getElementById('new-answer').value = "";
    };

    document.getElementById('delete-btn').onclick = () => {
        if(confirm("Delete this card?")) {
            cards.splice(currentIndex, 1);
            if (currentIndex >= cards.length) currentIndex = Math.max(0, cards.length - 1);
            saveAndRefresh();
        }
    };

    document.getElementById('reset-btn').onclick = () => {
        if(confirm("Restore the 10 original cards?")) {
            localStorage.removeItem('flashcards');
            currentIndex = 0;
            initApp();
        }
    };

    function saveAndRefresh() {
        localStorage.setItem('flashcards', JSON.stringify(cards));
        displayCard();
    }

    initApp();
});