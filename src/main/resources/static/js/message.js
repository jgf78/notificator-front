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

const fileGroup =
    document.getElementById("fileGroup");

const file =
    document.getElementById("file");

const selectedFile =
    document.getElementById("selectedFile");

const form =
    document.querySelector("form");


/*
 * ==========================================
 * ADJUNTOS
 * ==========================================
 */

function updateFileVisibility() {

    const isTelegram =
        destination.value === "TELEGRAM";

    const isNormal =
        telegramAction.value === "NORMAL";

    const destinationAllowsFile =
        destination.value === "DISCORD" ||
        destination.value === "MAIL";

    /*
     * Discord y Mail:
     * siempre permiten adjunto porque
     * solo tienen mensaje normal.
     *
     * Telegram:
     * solo permite adjunto en NORMAL.
     */

    const showFile =
        destinationAllowsFile ||
        (isTelegram && isNormal);

    fileGroup.style.display =
        showFile ? "block" : "none";

    /*
     * Si el adjunto deja de estar permitido,
     * eliminamos el archivo seleccionado.
     */

    if (!showFile) {
        file.value = "";
        selectedFile.textContent = "";
    }
}


/*
 * Mostrar nombre del archivo seleccionado
 */

file.addEventListener("change", function () {

    if (!file.files || file.files.length === 0) {
        selectedFile.textContent = "";
        return;
    }

    const selected =
        file.files[0];

    selectedFile.textContent =
        "📎 " + selected.name;
});


/*
 * ==========================================
 * DESTINO
 * ==========================================
 */

function updateDestinationVisibility() {

    const isTelegram =
        destination.value === "TELEGRAM";

    /*
     * Validación inicial de los campos.
     */

    message.required = true;
    pollQuestion.required = false;

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

        updatePollOptionValidation();
        updateFileVisibility();

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
     * Validación de campos obligatorios.
     *
     * POLL:
     * la pregunta y todas las opciones
     * son obligatorias.
     *
     * NORMAL y PIN:
     * el mensaje es obligatorio.
     */

    if (action === "POLL") {

        message.required = false;
        pollQuestion.required = true;

        message.setCustomValidity("");
        pollQuestion.setCustomValidity("");

    } else {

        message.required = true;
        pollQuestion.required = false;

        message.setCustomValidity("");
        pollQuestion.setCustomValidity("");
    }

    updatePollOptionValidation();


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


    /*
     * Actualizamos la visibilidad del adjunto
     * después de cambiar el tipo de mensaje.
     */

    updateFileVisibility();
}


/*
 * ==========================================
 * VALIDACIÓN DE OPCIONES DE ENCUESTA
 * ==========================================
 */

function updatePollOptionValidation() {

    const isPoll =
        destination.value === "TELEGRAM" &&
        telegramAction.value === "POLL";

    const options =
        pollOptions.querySelectorAll(
            ".poll-option input"
        );

    options.forEach(function (option) {

        option.required = isPoll;

        option.setCustomValidity("");
    });
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

    /*
     * Actualizamos la validación de las opciones
     * después de añadirlas o eliminarlas.
     */

    updatePollOptionValidation();
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


    // Usamos strings concatenados para compatibilidad con parsers JS más estrictos.
    newOption.innerHTML =
        "<input type=\"text\" " +
        "maxlength=\"100\" " +
        "placeholder=\"Opción\">" +
        "<button type=\"button\" " +
        "class=\"remove-option\" " +
        "title=\"Eliminar opción\">" +
        "−" +
        "</button>";


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
 * VALIDACIÓN DEL FORMULARIO
 * ==========================================
 */

form.addEventListener("submit", function (event) {

    const isPoll =
        destination.value === "TELEGRAM" &&
        telegramAction.value === "POLL";

    /*
     * Validación de mensaje o pregunta.
     */

    const requiredField =
        isPoll ? pollQuestion : message;

    if (!requiredField.value.trim()) {

        event.preventDefault();

        requiredField.setCustomValidity(
            isPoll
                ? "La pregunta de la encuesta es obligatoria."
                : "El mensaje es obligatorio."
        );

        requiredField.reportValidity();
        requiredField.focus();

        return;
    }


    /*
     * Validación de todas las opciones
     * de la encuesta.
     */

    if (isPoll) {

        const options =
            pollOptions.querySelectorAll(
                ".poll-option input"
            );

        for (const option of options) {

            if (!option.value.trim()) {

                event.preventDefault();

                option.setCustomValidity(
                    "Todas las opciones de la encuesta son obligatorias."
                );

                option.reportValidity();
                option.focus();

                return;
            }
        }
    }
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
    function () {

        message.setCustomValidity("");

        updateCharacterCount();
    }
);


pollQuestion.addEventListener(
    "input",
    function () {

        pollQuestion.setCustomValidity("");

        updatePollQuestionCount();
    }
);


/*
 * Limpiamos el error de cada opción
 * cuando el usuario empieza a escribir.
 */

pollOptions.addEventListener(
    "input",
    function (event) {

        if (event.target.matches("input")) {
            event.target.setCustomValidity("");
        }
    }
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