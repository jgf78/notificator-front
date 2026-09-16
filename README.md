# ⚡ Notificator Front - Gestor Web de Mensajería

=====================================================

Notificator Front es una aplicación web desarrollada con Spring Boot + Java
que actúa como interfaz gráfica para el sistema Notificator.

Permite enviar mensajes y archivos desde una interfaz web hacia los diferentes
sistemas de comunicación gestionados por Notificator.

La aplicación proporciona una interfaz sencilla para gestionar:

📨 Mensajes

📎 Archivos adjuntos

💬 Discord

📱 Telegram

📧 Mail

🔊 Alexa

📱 WhatsApp

📡 MQTT

📌 Mensajes anclados en Telegram

📊 Encuestas de Telegram

👥 Diferentes destinos de Telegram

📱 Interfaz responsive

🎨 Interfaz web con diseño oscuro

🐳 Ejecución mediante Docker


🚀 Características principales

==============================

⚡ Backend desarrollado con Spring Boot

🎨 Frontend desarrollado con Thymeleaf + HTML + CSS

⚙️ Interacción dinámica mediante JavaScript

📨 Envío de mensajes mediante REST API

📎 Envío de archivos mediante multipart/form-data

💬 Integración con Discord

📱 Integración con Telegram

📧 Integración con Mail

🔊 Integración con Alexa

📱 Integración con WhatsApp

📡 Integración con MQTT

📌 Envío de mensajes anclados en Telegram

📊 Creación de encuestas de Telegram

👤 Envío a bot de Telegram

👥 Envío a grupos de Telegram

📢 Envío a canales de Telegram

🌐 Envío a todos los destinos de Telegram

📱 Diseño responsive

🌙 Interfaz con diseño oscuro

🐳 Preparado para Docker


📡 Servicios disponibles

=======================

Notificator permite enviar mensajes a diferentes servicios de
comunicación.

Los destinos generales disponibles son:

💬 DISCORD

📱 TELEGRAM

📧 MAIL

🔊 ALEXA

📱 WHATSAPP

📡 MQTT

🌐 ALL


La opción `ALL` permite utilizar el sistema de distribución general
de Notificator para enviar el mensaje a todos los destinos compatibles
configurados en el backend.


La disponibilidad de determinadas funcionalidades, como los archivos
adjuntos o las opciones específicas de Telegram, depende del servicio
seleccionado.


💬 Discord

==========

Permite enviar mensajes a través del sistema Discord gestionado por
Notificator.

Funcionalidades disponibles desde la interfaz:

📝 Mensajes

📎 Archivos adjuntos


📱 Telegram

===========

Telegram dispone de funcionalidades específicas que permiten seleccionar
tanto el tipo de mensaje como el destino.

Destinos disponibles:

🤖 BOT

👥 GROUPS

📢 CHANNELS

🌐 ALL


El destino seleccionado determina dónde se enviará el mensaje.

Ejemplo:

Telegram + BOT

        │
        ▼
   Bot de Telegram


Telegram + GROUPS

        │
        ▼
   Grupos de Telegram


Telegram + CHANNELS

        │
        ▼
   Canales de Telegram


Telegram + ALL

        │
        ├──► Bot
        ├──► Grupos
        └──► Canales


📧 Mail

=======

Permite enviar mensajes mediante el sistema de correo electrónico
gestionado por Notificator.

Funcionalidades disponibles desde la interfaz:

📝 Mensajes

📎 Archivos adjuntos


🔊 Alexa

========

Notificator también dispone de integración con Alexa.

El frontend puede seleccionar Alexa como destino general y delegar
el procesamiento del mensaje a Notificator.


📱 WhatsApp

===========

Notificator dispone de integración con WhatsApp.

WhatsApp puede seleccionarse como destino general y el mensaje es
procesado posteriormente por Notificator.


📡 MQTT

=======

Notificator también permite utilizar MQTT como sistema de distribución
de mensajes.

El frontend puede seleccionar MQTT como destino y delegar el envío
al backend.


📌 Tipos de mensaje de Telegram

===============================

Cuando se selecciona Telegram aparecen tres tipos de mensaje:

💬 MENSAJE NORMAL

📌 MENSAJE ANCLADO

📊 ENCUESTA


Cada tipo dispone de funcionalidades específicas.


💬 Mensaje normal

=================

El mensaje normal permite enviar texto y, opcionalmente, un archivo adjunto.

Opciones disponibles:

📝 Texto

📎 Archivo

🎯 Destino Telegram


Los archivos adjuntos están disponibles únicamente para mensajes normales.


📌 Mensaje anclado

==================

Permite enviar un mensaje que será anclado en Telegram.

Este tipo de mensaje no permite adjuntos.

El flujo es:

Usuario

   │

   ▼

Notificator Front

   │ REST

   ▼

Notificator

   │

   ▼

Telegram

   │

   ▼

Mensaje anclado


📊 Encuestas

============

La interfaz permite crear encuestas de Telegram.

Una encuesta contiene:

❓ Pregunta

🔘 Opciones de respuesta

➕ Posibilidad de añadir opciones

➖ Posibilidad de eliminar opciones


Las encuestas no permiten archivos adjuntos.


📎 Archivos adjuntos

====================

Los archivos adjuntos pueden utilizarse en:

💬 Mensajes normales de Telegram

💬 Mensajes de Discord

📧 Mensajes de Mail


No se muestran para:

📌 Mensajes anclados de Telegram

📊 Encuestas de Telegram


El selector de archivos se muestra dinámicamente según el tipo de
mensaje seleccionado.


Flujo de envío de un archivo:

Usuario selecciona archivo

        │

        ▼

Notificator Front

        │

        │ multipart/form-data
        ▼

Notificator

        │

        ▼

Kafka

        │

        ▼

Servicio correspondiente

        │

        ├──► Discord
        ├──► Telegram
        └──► Mail


📱 Destinos de Telegram

=======================

El sistema permite seleccionar específicamente dónde enviar un mensaje
de Telegram.

BOT

----

Envía el mensaje únicamente al bot configurado.

GROUPS

------

Envía el mensaje a todos los grupos configurados.

CHANNELS

--------

Envía el mensaje a todos los canales configurados.

ALL

---

Envía el mensaje a:

🤖 Bot

👥 Todos los grupos

📢 Todos los canales


Esta selección también se mantiene cuando se envían archivos adjuntos.


🔄 Comunicación con Notificator

================================

Notificator Front no realiza directamente el envío hacia Telegram,
Discord, Mail, Alexa, WhatsApp o MQTT.

La aplicación actúa como interfaz web y utiliza la API REST de
Notificator.

Arquitectura:

                        Notificator Front
                              │
                              │ REST
                              ▼
                         Notificator
                              │
                              ▼
                            Kafka
                              │
          ┌───────────┬───────┼───────┬───────────┬───────────┐
          ▼           ▼       ▼       ▼           ▼           ▼
       Discord     Telegram   Mail   Alexa     WhatsApp      MQTT


Notificator se encarga de procesar y distribuir los mensajes.


📡 API REST

===========

Para mensajes normales se utiliza la API de mensajes.

Para mensajes anclados se utiliza el endpoint específico de Telegram.

Para encuestas se utiliza el endpoint de encuestas.

Para archivos se utiliza un endpoint multipart:

POST /messages/sendFile


Los datos enviados incluyen:

message

destination

destinationTelegram

file

filename


En el caso de Telegram, `destinationTelegram` permite conservar el destino
seleccionado por el usuario:

BOT

GROUPS

CHANNELS

ALL


📨 Flujo de un mensaje normal

==============================

Usuario

   │

   ▼

Formulario web

   │

   ▼

MessageController

   │

   ▼

MessageService

   │

   │ JSON
   ▼

Notificator REST API

   │

   ▼

Kafka

   │

   ▼

Servicio de destino


📎 Flujo de un archivo

======================

Usuario

   │

   ▼

Selecciona archivo

   │

   ▼

MessageController

   │

   ▼

MessageService

   │

   │ multipart/form-data
   ▼

Notificator /messages/sendFile

   │

   ▼

KafkaProducerService

   │

   │ Base64
   ▼

Kafka

   │

   ▼

Servicio de destino


En el caso de Telegram, el destino seleccionado se mantiene durante
todo el flujo:

CHANNELS

   │
   ▼
MessageRequest
   │
   ▼
Kafka
   │
   ▼
Telegram Consumer
   │
   ▼
sendFileToAllChannels()


🎨 Interfaz

===========

La aplicación utiliza una interfaz oscura orientada a facilitar el uso
continuado del sistema.

Características visuales:

🌙 Fondo oscuro

🃏 Secciones diferenciadas

🏷️ Selectores de destino

💬 Área de mensaje

📎 Selector de archivos

📊 Contador de caracteres

🔘 Botones de acción

📱 Diseño responsive


📝 Contador de caracteres

==========================

El campo de mensaje dispone de contador de caracteres para facilitar
el control de la longitud del contenido.

Ejemplo:

Mensaje

┌────────────────────────────────────┐
│ Hola, este es un mensaje...       │
│                                    │
└────────────────────────────────────┘

                         125 / 4096


El contador se actualiza dinámicamente mediante JavaScript.


📱 Diseño responsive

====================

La interfaz está diseñada para adaptarse automáticamente a:

🖥️ Escritorio

💻 Portátiles

📱 Smartphones

📲 Tablets


En escritorio:

- Formulario amplio
- Distribución horizontal
- Elementos organizados por secciones
- Mayor espacio para el contenido


En dispositivos móviles:

- Elementos adaptados al ancho disponible
- Controles reorganizados verticalmente
- Botones adaptados al tamaño táctil
- Campos de formulario optimizados


🧩 Tecnologías

===============

Java 17           -> Lenguaje principal

Spring Boot       -> Framework backend

Spring Web        -> Controladores y REST

RestClient        -> Comunicación con Notificator

Thymeleaf         -> Motor de plantillas

HTML5             -> Estructura web

CSS3              -> Diseño y responsive

JavaScript        -> Interacción dinámica

Maven             -> Build tool

Docker            -> Deploy


🏗️ Arquitectura del proyecto

=============================

notificator-front/

├── src/

│   ├── main/

│   │   ├── java/

│   │   │   └── com/julian/notificator_front/

│   │   │

│   │   │   ├── controller/

│   │   │   │   └── MessageController

│   │   │   │

│   │   │   ├── service/

│   │   │   │   ├── MessageService

│   │   │   │   └── impl/

│   │   │   │       └── MessageServiceImpl

│   │   │   │

│   │   │   └── model/

│   │   │       ├── MessageRequest

│   │   │       ├── DestinationType

│   │   │       └── telegram/

│   │   │           ├── DestinationTelegramType

│   │   │           ├── MessagePayload

│   │   │           └── TelegramPollRequest

│   │   │

│   │   └── resources/

│   │       │

│   │       ├── templates/

│   │       │   └── index.html

│   │       │

│   │       ├── static/

│   │       │   ├── css/

│   │       │   │   └── style.css

│   │       │   │

│   │       │   └── js/

│   │       │       └── message.js

│   │       │

│   │       └── application.yml

│   │

│   └── test/

│

├── Dockerfile

├── pom.xml

└── README.md


🔧 Componentes principales

==========================

MessageController

-----------------

Gestiona las peticiones de la interfaz web.

Responsabilidades:

- Mostrar la página principal
- Recibir el formulario
- Detectar el destino seleccionado
- Gestionar el tipo de mensaje de Telegram
- Gestionar archivos adjuntos
- Enviar el contenido al servicio correspondiente


MessageService

--------------

Define las operaciones disponibles para enviar:

- Mensajes normales
- Mensajes anclados
- Encuestas
- Archivos


MessageServiceImpl

------------------

Implementa la comunicación REST con Notificator.

Utiliza `RestClient` para realizar las peticiones HTTP.

Gestiona:

- JSON para mensajes
- JSON para mensajes anclados
- JSON para encuestas
- multipart/form-data para archivos


MessageRequest

--------------

Modelo principal utilizado para transportar la información del mensaje.

Incluye:

- message
- destination
- destinationTelegram
- telegramPollRequest
- messagePayload


DestinationType

--------------

Define los destinos principales:

- DISCORD
- TELEGRAM
- MAIL
- ALEXA
- WHATSAPP
- MQTT
- ALL


DestinationTelegramType

-----------------------

Define los destinos específicos de Telegram:

- BOT
- GROUPS
- CHANNELS
- ALL


index.html

----------

Interfaz principal de la aplicación.

Incluye:

- Selector de destino
- Selector de destino Telegram
- Selector de tipo de mensaje
- Campo de mensaje
- Selector de archivo
- Opciones de encuesta
- Botón de envío


message.js

----------

Gestiona el comportamiento dinámico de la interfaz.

Responsabilidades:

- Mostrar u ocultar opciones de Telegram
- Mostrar u ocultar archivos
- Gestionar mensajes normales
- Gestionar mensajes anclados
- Gestionar encuestas
- Gestionar opciones de encuesta
- Actualizar contadores
- Limpiar el selector de archivo cuando deja de estar permitido


style.css

---------

Gestiona el aspecto visual de la aplicación.

Incluye:

- Tema oscuro
- Layout
- Formularios
- Botones
- Mensajes de estado
- Responsive
- Adaptación para dispositivos móviles


⚙️ Configuración local

======================

Clonar el proyecto:

git clone https://github.com/jgf78/notificator-front.git

cd notificator-front


Compilar:

mvn clean install -DskipTests


Arrancar la aplicación:

mvn spring-boot:run


La aplicación estará disponible en:

👉 http://localhost:8084


🔌 Configuración de Notificator

================================

Notificator Front necesita conocer la URL de la API REST de Notificator.

Ejemplo de configuración local:

notificator:

  api:

    url: http://localhost:8081/api

    messages-path: /messages

    send-pin-path: /messages/sendPin

    send-poll-path: /messages/sendPoll

    send-file-path: /messages/sendFile


La comunicación entre ambas aplicaciones se realiza mediante HTTP/REST.


🐳 Docker

=========

La aplicación está preparada para ejecutarse mediante Docker.

Arquitectura:

                    Internet / Red local
                           │
                           ▼
                  ┌──────────────────┐
                  │ Notificator Front│
                  │      :8084       │
                  └────────┬─────────┘
                           │
                           │ REST
                           ▼
                  ┌──────────────────┐
                  │   Notificator    │
                  │      :8081       │
                  └────────┬─────────┘
                           │
                           ▼
                         Kafka
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
           Discord      Telegram       Mail
              │            │            │
              └──────┬─────┴─────┬──────┘
                     ▼           ▼
                   Alexa      WhatsApp
                     │
                     ▼
                    MQTT


Esto permite mantener separada la interfaz web de la lógica de
procesamiento y distribución de mensajes.


🚀 Ejecución con Docker

=======================

Construir la imagen:

docker build -t jgf78/notificator-front:latest .


Ejecutar:

docker run -d \
  --name notificator-front \
  -p 8084:8084 \
  jgf78/notificator-front:latest


La aplicación quedará disponible en:

👉 http://localhost:8084


🔐 Seguridad

===========

Notificator Front actúa como interfaz de usuario y no almacena
directamente las credenciales de los servicios de mensajería.

La aplicación delega el procesamiento y envío de los mensajes a
Notificator.

Los archivos enviados se transmiten mediante la API REST y son
procesados por el backend.


📋 Reglas de funcionamiento

============================

Telegram:

- MENSAJE NORMAL permite archivo adjunto.
- MENSAJE ANCLADO no permite archivo.
- ENCUESTA no permite archivo.
- BOT envía únicamente al bot.
- GROUPS envía a todos los grupos.
- CHANNELS envía a todos los canales.
- ALL envía a bot, grupos y canales.


Discord:

- Permite mensajes normales.
- Permite archivos adjuntos.


Mail:

- Permite mensajes normales.
- Permite archivos adjuntos.


Alexa:

- Permite utilizar Alexa como destino general.
- El procesamiento es realizado por Notificator.


WhatsApp:

- Permite utilizar WhatsApp como destino general.
- El procesamiento es realizado por Notificator.


MQTT:

- Permite utilizar MQTT como destino general.
- El procesamiento es realizado por Notificator.


🧪 Flujo general de la aplicación

==================================

                    Usuario
                       │
                       ▼
              Notificator Front
                       │
                       │ REST
                       ▼
                  Notificator
                       │
                       ▼
                     Kafka
                       │
          ┌────────────┼────────────┬────────────┐
          ▼            ▼            ▼            ▼
       Discord      Telegram       Mail         Alexa
                                               
                       ┌────────────┐
                       ▼            ▼
                    WhatsApp       MQTT


La aplicación frontend se encarga principalmente de la interacción
con el usuario y Notificator se encarga del procesamiento y distribución.


📄 Licencia

===========

MIT License — uso libre y modificación.


👤 Autor

========

Julián Gómez Fernández

💻 Java Developer

⚙️ Spring Boot · Java · Docker · REST

📨 Sistemas de mensajería

📱 Integración con Telegram

💬 Integración con Discord

📧 Integración con Mail

🔊 Integración con Alexa

📱 Integración con WhatsApp

📡 Integración con MQTT


🧠 Frase final

==============

"Un solo mensaje. Un solo lugar. Todos tus canales."