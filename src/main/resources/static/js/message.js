document.addEventListener("DOMContentLoaded", function () {

    const destination =
        document.getElementById("destination");

    const telegramDestinationGroup =
        document.getElementById("telegramDestinationGroup");

    const telegramActionGroup =
        document.getElementById("telegramActionGroup");

    const telegramAction =
        document.getElementById("telegramAction");

    const telegramActionValue =
        document.getElementById("telegramActionValue");

    const normalMessageGroup =
        document.getElementById("normalMessageGroup");

    const pollGroup =
        document.getElementById("pollGroup");

    const message =
        document.getElementById("message");

    const characterCount =
        document.getElementById("characterCount");

    const pollQuestion =
        document.getElementById("pollQuestion");

    const pollQuestionCount =
        document.getElementById("pollQuestionCount");

    const pin =
        document.getElementById("pin");

    const pollOptions =
        document.getElementById("pollOptions");

    const addOption =
        document.getElementById("addOption");

    const optionCount =
        document.getElementById("optionCount");


    /*
     * ==========================================
     * DESTINO
     * ==========================================
     */

    function updateDestinationVisibility() {

        const isTelegram =
            destination.value === "TELEGRAM";


        /*
         * Los campos específicos de Telegram
         * solo aparecen cuando el destino es TELEGRAM.
         */

        telegramDestinationGroup.style.display =
            isTelegram ? "block" : "none";

        telegramActionGroup.style.display =
            isTelegram ? "block" : "none";


        /*
         * Cuando NO estamos en Telegram:
         *
         * - Tipo de mensaje = NORMAL
         * - Pin = false
         * - Se muestra el mensaje normal
         * - Se oculta la encuesta
         */

        if (!isTelegram) {

            telegramAction.value = "NORMAL";
            telegramActionValue.value = "NORMAL";

            pin.value = "false";

            normalMessageGroup.style.display =
                "block";

            pollGroup.style.display =
                "none";

            return;
        }


        /*
         * Si entramos en Telegram,
         * siempre comenzamos con MENSAJE NORMAL.
         */

        telegramAction.value = "NORMAL";
        telegramActionValue.value = "NORMAL";

        updateMessageType();
    }


    /*
     * ==========================================
     * TIPO DE MENSAJE TELEGRAM
     * ==========================================
     */

    function updateMessageType() {

        const action =
            telegramAction.value;


        /*
         * Guardamos el tipo seleccionado
         * para que llegue al MessageController.
         */

        telegramActionValue.value =
            action;


        /*
         * MENSAJE NORMAL
         */

        if (action === "NORMAL") {

            normalMessageGroup.style.display =
                "block";

            pollGroup.style.display =
                "none";

            pin.value = "false";
        }


        /*
         * MENSAJE ANCLADO
         */

        else if (action === "PIN") {

            normalMessageGroup.style.display =
                "block";

            pollGroup.style.display =
                "none";

            pin.value = "true";
        }


        /*
         * ENCUESTA
         */

        else if (action === "POLL") {

            normalMessageGroup.style.display =
                "none";

            pollGroup.style.display =
                "block";

            pin.value = "false";
        }
    }


    /*
     * ==========================================
     * CONTADOR DEL MENSAJE
     * ==========================================
     */

    function updateCharacterCount() {

        characterCount.textContent =
            message.value.length;
    }


    /*
     * ==========================================
     * CONTADOR DE LA PREGUNTA
     * ==========================================
     */

    function updatePollQuestionCount() {

        pollQuestionCount.textContent =
            pollQuestion.value.length;
    }


    /*
     * ==========================================
     * OPCIONES DE LA ENCUESTA
     * ==========================================
     */

    function updateOptionNames() {

        const options =
            pollOptions.querySelectorAll(".poll-option");


        options.forEach(function (option, index) {

            const input =
                option.querySelector("input");


            input.name =
                "telegramPollRequest.options[" +
                index +
                "]";


            input.placeholder =
                "Opción " + (index + 1);
        });


        /*
         * Actualizamos contador
         */

        optionCount.textContent =
            options.length + "/10";


        /*
         * Mostrar/ocultar botón eliminar
         *
         * Siempre deben quedar al menos
         * dos opciones.
         */

        options.forEach(function (option) {

            const removeButton =
                option.querySelector(".remove-option");


            if (!removeButton) {
                return;
            }


            removeButton.style.display =
                options.length > 2
                    ? "flex"
                    : "none";
        });
    }


    /*
     * ==========================================
     * AÑADIR OPCIÓN
     * ==========================================
     */

    addOption.addEventListener("click", function () {

        const options =
            pollOptions.querySelectorAll(".poll-option");


        /*
         * Máximo 10 opciones.
         */

        if (options.length >= 10) {
            return;
        }


        const newOption =
            document.createElement("div");


        newOption.className =
            "poll-option";


        newOption.innerHTML = `
            <input type="text"
                   maxlength="100"
                   placeholder="Opción">

            <button type="button"
                    class="remove-option"
                    title="Eliminar opción">

                −

            </button>
        `;


        pollOptions.appendChild(newOption);

        updateOptionNames();
    });


    /*
     * ==========================================
     * ELIMINAR OPCIÓN
     * ==========================================
     */

    pollOptions.addEventListener("click", function (event) {

        if (!event.target.classList.contains("remove-option")) {
            return;
        }


        const options =
            pollOptions.querySelectorAll(".poll-option");


        /*
         * Mínimo 2 opciones.
         */

        if (options.length <= 2) {
            return;
        }


        const option =
            event.target.closest(".poll-option");


        option.remove();

        updateOptionNames();
    });


    /*
     * ==========================================
     * EVENTOS
     * ==========================================
     */

    destination.addEventListener(
        "change",
        updateDestinationVisibility
    );


    telegramAction.addEventListener(
        "change",
        updateMessageType
    );


    message.addEventListener(
        "input",
        updateCharacterCount
    );


    pollQuestion.addEventListener(
        "input",
        updatePollQuestionCount
    );


    /*
     * ==========================================
     * ESTADO INICIAL
     * ==========================================
     */

    updateDestinationVisibility();

    updateCharacterCount();

    updatePollQuestionCount();

    updateOptionNames();

});
