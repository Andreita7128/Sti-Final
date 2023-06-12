class CardOptionProject extends HTMLElement {
    constructor() {
        super();
        this.itemActual = 0;
        this.questions2 = [{
                "question": "Desarrollo para IoT (Internet de las cosas):"
            },
            {
                "question": "Ciberseguridad"
            },
            {
                "question": "Machine learning"
            },
            {
                "question": "Desarrollo back end "
            },
            {
                "question": "Desarrollo front end"
            },
            {
                "question": "Edición de video y animación Diseño UI"
            },
            {
                "question": "Diseño UX"
            },
            {
                "question": "Edición fotográfica"
            },
            {
                "question": "Expresión oral / Pitch"
            },
            {
                "question": "Inglés"
            },
        ];
    }

    loadQuestion() {

        const question = this.questions2[this.itemActual];
        document.getElementById('quest').textContent = question.question;

        const containerBtn = document.getElementById('btnPrevious')
        const containerText = document.getElementById('previous')
        const containerTextNext = document.getElementById('next')

        if (this.itemActual === 0) {
            containerBtn.style.background = '#FFF9FB';
            containerText.style.color = '#FFF9FB';
        } else if (this.itemActual > 0 ){
            containerBtn.style.background = '#1F1F1F';
            containerText.style.color = '#2D2D2D';
        }

        if(this.itemActual === this.questions2.length - 1) {
            containerTextNext.textContent = 'Generar Recomendación'
        }
    }

    renderPrevious() {

        if (this.itemActual > 0) {
            this.itemActual--;
            this.loadQuestion();
        }
    }

    renderNext() {

        let number = this.questions2.length;
        if (this.itemActual < number - 1) {
            this.itemActual++;
            this.loadQuestion();
        }
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
    <link rel="stylesheet" href="../components/card/card.css">
    <article id="bg">
            <section style="background: #7494EA" class="card_static">
                <div class="card_title">
                    <i class="bi bi-clipboard-data"></i>
                    <h2>Encuentra tu Proyecto</h2>
                </div>
                <div class="card_body">
                    <p class="body_1">Ingresa un valor de 1 a 10 puntuando tus habilidades para encontrar un proyecto que se adapte a ellas.</p>
                    <div class="container_inputs">
                        <div class="label_input">
                            <label for="name">Nombre:</label>
                            <input type="text" id="name" placeholder="Ingresa tú nombre aquí">
                        </div>
                        <div class="label_input" id="variableInput">
                        <label for="link">Link:</label>
                        <select class="form-select btn_program" aria-label="Default select example">
                        <option selected>Escoge un programa </option>
                        <option value="DMI">Diseño de Medios Interactivos</option>
                        <option value="SIS">Ingeniería en Sistemas</option>
                        <option value="IT">Ingeniería Telemática</option>
                        <option value="MIP">Mercadeo Internacional y Publicidad</option>
                    </select>
                </div>
                <p class="caption">Si haces simultaneidad selecciona el principal</p>
                    </div>
                </div>
            </section>
            <section class="card_questions">
                <div class="number_K">
                    <h5>¿Cuántas recomendaciones deseas?</h5>
                    <select class="form-select btn_drop" aria-label="Default select example">
                        <option selected>0 </option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>

                <div class="card_sub">
                    <p class="subtitle">Puntúa de 1 a 10</p>
                    <h5>Habilidades duras</h5>
                </div>

                <div class="question">
                    <p class="body_1" id='quest'>Desarrollo para IoT (Internet de las cosas):</p>
                    <div class="container_slider">
                        <p id="slider-number">1</p>
                        <input type="range" min="1" max="10" value="1" class="slider" id="slider-score" step="1">                </div>
                    </div>
                </div>

                <div class="nav_questions">
                    <div class="each_option">
                        <button id="btnPrevious" class="button_icon">
                            <i class="bi bi-chevron-left"></i>
                        </button>
                        <p class="body_1" id="previous">Anterior</p>
                    </div>
                    <div class="each_option" id="next-btn">
                        <p class="body_1" id="next">Siguiente</p>
                        <button id="btnNext" class="button_icon">
                            <i class="bi bi-chevron-right"></i>
                        </button>
                    </div>

                </div>

            </section>

        </article>
    `

        

        const sliderInput = document.getElementById('slider-score');
        const sliderNumber = document.getElementById('slider-number');

        sliderInput.addEventListener('input', () => {
            sliderNumber.textContent = sliderInput.value;
        });

        // Event listener para el botón "Anterior"
        document.getElementById('btnPrevious').addEventListener('click', () => {
            this.renderPrevious()
        });

        // Event listener para el botón "Siguiente"
        document.getElementById('btnNext').addEventListener('click', () => {
            this.renderNext()
        });

        // Cargar la primera pregunta al cargar la página
        this.loadQuestion();

    }
}

customElements.define('card-option-project', CardOptionProject)
export default CardOptionProject