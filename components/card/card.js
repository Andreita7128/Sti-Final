import {
    getTeam,
    BALANCED,
    HARD_SKILLS,
    SOFT_SKILLS,
} from "../service/serviceAPI.js";

import {
    renderTable
} from "../../table.js";
class CardOption extends HTMLElement {
    constructor() {
        super();
        this.hardSkills = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.softSkills = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.actual = 0;

        this.questions = [{
                question: "Desarrollo para IoT (Internet de las cosas):",
            },
            {
                question: "Testing y aseguramiento de la calidad",
            },
            {
                question: "Ciberseguridad",
            },
            {
                question: "Machine learning",
            },
            {
                question: "Desarrollo back end ",
            },
            {
                question: "Desarrollo front end",
            },
            {
                question: "Edición de video y animación",
            },
            {
                question: "Diseño UI",
            },
            {
                question: "Diseño UX",
            },
            {
                question: "Edición fotográfica",
            },
            {
                question: "Expresión oral / Pitch",
            },
            {
                question: "Inglés",
            },
            {
                question: "A menudo pospongo tareas o responsabilidades importantes hasta el último momento",
            },
            {
                question: "Suelo generar ideas originales y fuera de lo común en situaciones que requieren creatividad",
            },
            {
                question: "Cuando no logro completar adecuadamente, ni a tiempo, mi actividad a cargo, suelo delegar esa responsabilidad a otros",
            },
            {
                question: "En situaciones de colaboración o trabajo en equipo, logro inspirar y guiar a otros hacia el logro de objetivos comunes",
            },
            {
                question: "Soy una persona que tiende a tomar decisiones de manera independiente y firme, mostrando confianza en mis propias habilidades y convicciones, y no me dejo influir fácilmente por las opiniones de los demás",
            },
            {
                question: "Tiendo a asumir un papel activo y destacado en situaciones grupales, demostrando liderazgo y habilidades para influir en las decisiones y acciones del grupo, sin imponerme de manera autoritaria y respetando siempre la opinión y el trabajo de mis compañeros",
            },
            {
                question: "Soy una persona que muestra disposición para enfrentar nuevos desafíos y explorar situaciones fuera de mi zona de confort, demostrando valentía y disposición para probar cosas nuevas",
            },
            {
                question: "Soy hábil para mantener la calma y tomar decisiones efectivas en situaciones desafiantes o de presión, demostrando resiliencia y adaptabilidad ante las adversidades",
            },
            {
                question: "Muestro empatía y comprensión hacia las emociones y necesidades de los demás, demostrando una capacidad para conectarme emocionalmente y responder adecuadamente a las situaciones",
            },
            {
                question: "Tiende a tomar decisiones rápidas y actuar sin pensarlo demasiado, mostrando una inclinación por la espontaneidad y la acción inmediata en lugar de la planificación detallada",
            },
        ];
    }

    cargarPregunta() {
        const question = this.questions[this.actual];
        document.getElementById("question").textContent = question.question;

        const containerBtn = document.getElementById("previousBtn");
        const containerText = document.getElementById("anterior");
        const containerTextNext = document.getElementById("siguiente");

        if (this.actual === 0) {
            containerBtn.style.background = "#FFF9FB";
            containerText.style.color = "#FFF9FB";
        } else if (this.actual > 0) {
            containerBtn.style.background = "#1F1F1F";
            containerText.style.color = "#2D2D2D";
        }

        if (this.actual === this.questions.length - 1) {
            containerTextNext.textContent = "Generar Recomendación";
        }

        if (this.actual < this.hardSkills.length) {
            document.querySelector("#skills-type").innerHTML = "Habilidades duras de tu Proyecto";
        } else {
            document.querySelector("#skills-type").innerHTML = "Habilidades blandas tuyas";
            document.querySelector("#sub-point").innerHTML = "Califica según tu auto-percepción";
            document.querySelector("#min").innerHTML = "Muy en Desacuerdo";
            document.querySelector("#max").innerHTML = "Muy De acuerdo";
        }
    }

    mostrarAnterior() {
        if (this.actual > 0) {
            this.actual--;
            this.cargarPregunta();
        }
    }

    async mostrarSiguiente() {
        if (this.actual === this.questions.length - 1) {
            const type = document.querySelector(".btn_agregation").value;
            if (type != "none") {
                const projectaName = this.querySelector("#name").value;
                const description = "Description";
                const link = document.querySelector("#link").value;

                const data = {
                    project: [projectaName, description, link].concat(this.hardSkills),
                    softSkills: this.softSkills,
                };

                if (type == "hard-skills") {

                    const response = await getTeam(data, HARD_SKILLS);
                    renderTable(response);
                }

                if (type == "soft-skills") {
                    const response = await getTeam(data, SOFT_SKILLS);


                    response.forEach(element => {
                        console.log(element);
                    });
                    renderTable(response);
                }

                if (type == "both") {
                    const response = await getTeam(data, BALANCED)
                    renderTable(response);
                }
            } else {
                alert("Escoge un método de agregación");
            }
        }

        if (this.actual < this.questions.length - 1) {
            const slider = document.querySelector(".slider");
            this.saveAnswer(slider.value);
            this.actual++;
            this.cargarPregunta();
        }
    }

    saveAnswer(score) {
        if (this.actual < this.hardSkills.length) {
            // Save hardSkill
            this.hardSkills[this.actual] = parseInt(score);
        } else {
            // Save softSkill
            this.softSkills[this.actual - this.hardSkills.length] = parseInt(score);
        }
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
    <link rel="stylesheet" href="../components/card/card.css">
    <article id="bg">
            <section class="card_static">
                <div class="card_title">
                    <i class="bi bi-search"></i>
                    <h2>Encuentra tu Compa</h2>
                </div>
                <div class="card_body">
                    <p class="body_1">Ingresa un valor de 1 a 10 puntuando las habilidades que requiere tu proyecto para encontrar un compañero que se adapte a ello.</p>
                    <div class="container_inputs">
                        <div class="label_input">
                            <label for="name">Nombre:</label>
                            <input type="text" id="name" placeholder="Ingresa el nombre de tú proyecto">
                        </div>
                        <div class="label_input" id="variableInput">
                        <label for="link">Enlace:  </label>
                <input type="text" id="link" placeholder="Ingresa un link para ver tu proyecto">
                        </div>
                    </div>
                </div>
            </section>
            <section class="card_questions">
                <div class="agregation">
                    <h5>¿Qué quieres priorizar?</h5>
                    <select class="form-select btn_agregation" aria-label="Default select example">
                        <option selected value='none'>Escoge una opción</option>
                        <option value="hard-skills">Habilidades Duras</option>
                        <option value="soft-skills">Personalidad</option>
                        <option value="both">Equilibrado</option>
                    </select>
                </div>

                <div class="card_sub">
                    <p class="subtitle" id="sub-point">Puntúa de 1 a 10 los requerimientos del proyecto</p>
                    <h5 id="skills-type">Habilidades duras</h5>
                </div>

                <div class="question">
                    <div class="container_question">
                        <p class="body_1" id='question'>Desarrollo para IoT (Internet de las cosas)</p>
                    </div>
                    <div class="container_slider">
                        <p id="inputNumber">1</p>
                        <div class="slider_params">
                            <label id="min">No lo requiere</label>
                            <input type="range" min="1" max="10" value="1" class="slider" id="score" step="1">                
                            <label id="max">Es muy necesario</label>
                        </div>
                        </div>
                    </div>
                </div>

                <div class="nav_questions">
                    <div class="each_option">
                        <button id="previousBtn" class="button_icon">
                            <i class="bi bi-chevron-left"></i>
                        </button>
                        <p class="body_1" id="anterior">Anterior</p>
                    </div>
                    <div class="each_option">
                        <p class="body_1" id="siguiente">Siguiente</p>
                        <button id="nextBtn" class="button_icon">
                            <i class="bi bi-chevron-right"></i>
                        </button id="nextBtn">
                    </div>

                </div>

            </section>

        </article>
    `;

        const slider = document.getElementById("score");
        const number = document.getElementById("inputNumber");

        slider.addEventListener("input", () => {
            number.textContent = slider.value;
        });

        // Event listener para el botón "Anterior"
        document.getElementById("previousBtn").addEventListener("click", () => {
            this.mostrarAnterior();
        });

        // Event listener para el botón "Siguiente"
        document.getElementById("nextBtn").addEventListener("click", () => {
            this.mostrarSiguiente();
        });

        // Cargar la primera pregunta al cargar la página
        this.cargarPregunta();
    }
}

customElements.define("card-option-compa", CardOption);
export default CardOption;