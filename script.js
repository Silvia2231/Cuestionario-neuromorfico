// BANCO DE PREGUNTAS SOBRE HARDWARE NEUROINSPIRADO
const questionBank = [
    {
        question: "¿Qué es la computación neuromórfica?",
        options: [
            "Un modelo que imita el cerebro humano",
            "Un tipo de memoria RAM",
            "Un procesador tradicional",
            "Una red de computadoras"
        ],
        answer: 0
    },
    {
        question: "¿Qué componente clave usa el hardware neuromórfico?",
        options: [
            "Memristores",
            "Transistores clásicos",
            "Cables de cobre",
            "Tarjetas gráficas"
        ],
        answer: 0
    },
    {
        question: "¿Qué ventaja tiene la computación neuromórfica?",
        options: [
            "Mayor consumo energético",
            "Opera más lento que un CPU",
            "Ahorra energía y procesa como el cerebro",
            "Solo sirve para videojuegos"
        ],
        answer: 2
    },
    {
        question: "¿Qué simulan las neuronas artificiales?",
        options: [
            "El internet",
            "Las neuronas biológicas",
            "La pantalla del computador",
            "Las memorias USB"
        ],
        answer: 1
    },
    {
        question: "¿Para qué sirve un memristor?",
        options: [
            "Para guardar estados como una sinapsis",
            "Para iluminar una pantalla",
            "Para enfriar el sistema",
            "Para procesar gráficos"
        ],
        answer: 0
    }
];

// VARIABLES
let current = 0;
let score = 0;
let selectedQuestions = [];

// INICIO
function startQuiz() {
    const name = document.getElementById("studentName").value;
    if (name.trim() === "") {
        alert("Escribe tu nombre");
        return;
    }

    document.getElementById("login").style.display = "none";
    document.getElementById("quiz").style.display = "block";

    document.getElementById("welcome").innerHTML = "Bienvenido " + name;

    selectedQuestions = [...questionBank]
        .sort(() => Math.random() - 0.5)
        .slice(0, 5);

    showQuestion();
}

// MOSTRAR PREGUNTA
function showQuestion() {
    const q = selectedQuestions[current];

    let html = `<h3>${q.question}</h3>`;
    q.options.forEach((opt, i) => {
        html += `
            <label>
                <input type="radio" name="answer" value="${i}">
                ${opt}
            </label><br>`;
    });

    document.getElementById("questionContainer").innerHTML = html;
}

// SIGUIENTE
function nextQuestion() {
    const answer = document.querySelector('input[name="answer"]:checked');

    if (!answer) {
        alert("Selecciona una respuesta");
        return;
    }

    if (parseInt(answer.value) === selectedQuestions[current].answer) {
        score++;
    }

    current++;

    if (current >= selectedQuestions.length) {
        finishQuiz();
    } else {
        showQuestion();
    }
}

// FINAL
function finishQuiz() {
    document.getElementById("quiz").style.display = "none";
    document.getElementById("result").style.display = "block";

    document.getElementById("score").innerHTML =
        "Preguntas correctas: " + score + " de " + selectedQuestions.length;
}

// CHATBOT
const respuestas = {
    "que es computacion neuromorfica": "Es un tipo de hardware inspirado en el cerebro humano, eficiente y rápido.",
    "que es un memristor": "Es un componente que guarda estados, como una sinapsis.",
    "ventaja": "La principal ventaja es el bajo consumo energético.",
    "neuronas": "Son unidades que procesan información imitando el cerebro.",
    "hola": "¡Hola! ¿Qué deseas saber sobre hardware neuromórfico?"
};

function toggleChat() {
    const chat = document.getElementById("chatWindow");
    chat.style.display = chat.style.display === "flex" ? "none" : "flex";
}

function sendWithEnter(event) {
    if (event.key === "Enter") sendMessage();
}

function sendMessage() {
    const input = document.getElementById("chatInput");
    const text = input.value.trim().toLowerCase();
    if (text === "") return;

    addMessage(text, "user");

    let respuesta = "No entiendo, pero puedo aprender 😊";

    for (let key in respuestas) {
        if (text.includes(key)) {
            respuesta = respuestas[key];
        }
    }

    setTimeout(() => addMessage(respuesta, "bot"), 500);

    input.value = "";
}

function addMessage(msg, type) {
    const body = document.getElementById("chatBody");
    const div = document.createElement("div");
    div.className = "chat-message " + (type === "bot" ? "bot" : "");
    div.textContent = msg;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
}
