document.addEventListener("DOMContentLoaded", function () {

    const destination = document.getElementById("destination");
    const telegramGroup = document.getElementById("telegramDestinationGroup");
    const message = document.getElementById("message");
    const characterCount = document.getElementById("characterCount");


    function updateTelegramVisibility() {

        const selectedDestination = destination.value;

        if (selectedDestination === "TELEGRAM" ||
            selectedDestination === "ALL") {

            telegramGroup.style.display = "block";

        } else {

            telegramGroup.style.display = "none";
        }
    }


    function updateCharacterCount() {

        characterCount.textContent = message.value.length;

    }


    destination.addEventListener("change", updateTelegramVisibility);

    message.addEventListener("input", updateCharacterCount);


    // Estado inicial
    updateTelegramVisibility();
    updateCharacterCount();

});