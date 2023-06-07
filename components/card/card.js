class CardOption extends HTMLElement {
    constructor() {
        super();
        this.title;
        this.description;
        this.firstplaceholder;
        this.secondinput;
        this.secondplaceholder;

        this.actual = 0;
        this.questions = [{
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

    static get observedAttributes() {
        return [
            "title", "description", "firstplaceholder", "secondinput", "secondplaceholder",
        ]
    }

    attributeChangedCallback(nameAtr, oldValue, newValue) {

        switch (nameAtr) {
            case "title":

                this.title = newValue

                break;

            case "description":

                this.description = newValue

                break;

            case "firstplaceholder":

                this.firstplaceholder = newValue

                break;

            case "secondinput":

                this.secondinput = newValue

                break;

            case "secondplaceholder":

                this.secondplaceholder = newValue

                break;
        }

    }

    cargarPregunta() {
        console.log(this.questions.length)
        const question = this.questions[this.actual];
        document.getElementById('question').textContent = question.question;
    }

    mostrarAnterior() {
        if (this.actual > 0) {
            this.actual--;
            this.cargarPregunta();
        }
    }

    mostrarSiguiente() {
        let number = this.questions.length;
        if (this.actual < number - 1) {
            this.actual++;
            this.cargarPregunta();
        }
    }


    connectedCallback() {
        this.render()
    }

    render() {
        this.innerHTML = `
    <link rel="stylesheet" href="../components/card/card.css">
    <article id="bg">
            <section class="card_static">
                <div class="card_title">
                    <i class="bi bi-search"></i>
                    <h2>${this.title}</h2>
                </div>
                <div class="card_body">
                    <p class="body_1">${this.description}</p>
                    <div class="container_inputs">
                        <div class="label_input">
                            <label for="name">Nombre:</label>
                            <input type="text" id="name" placeholder="${this.firstplaceholder}">
                        </div>
                        <div class="label_input">
                            <label for="link">${this.secondinput}:</label>
                            <input type="text" id="link" placeholder="${this.secondplaceholder}">
                        </div>
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
                    <p class="body_1" id='question'>Desarrollo para IoT (Internet de las cosas):</p>
                    <div class="container_slider">
                        <label for="score" id="sliderValue">
                            <h5>1</h5>
                        </label>
                        <input type="range" min="1" max="10" value="5" class="slider" id="score" step="1">
                        <label for="score">
                            <h5>10</h5>
                        </label>
                    </div>
                </div>

                <div class="nav_questions">
                    <div class="each_option">
                        <button id="previousBtn" class="button_icon">
                            <i class="bi bi-chevron-left"></i>
                        </button>
                        <p class="body_1">Anterior</p>
                    </div>
                    <div class="each_option">
                        <p class="body_1">Siguiente</p>
                        <button id="nextBtn" class="button_icon">
                            <i class="bi bi-chevron-right"></i>
                        </button id="nextBtn">
                    </div>

                </div>

            </section>

        </article>
    `

      // Event listener para el botón "Anterior"
      document.getElementById('previousBtn').addEventListener('click', this.mostrarAnterior);

      // Event listener para el botón "Siguiente"
      document.getElementById('nextBtn').addEventListener('click', this.mostrarSiguiente);
  
      // Cargar la primera pregunta al cargar la página
      this.cargarPregunta();
    }
}

customElements.define('card-option', CardOption)
export default CardOption