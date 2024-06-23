#Cosas Necesarias

Instalar Nodejs
Instalar un JDK (Preferible el 17)
Instalar un SDK (Esto depende de la version android del dispositivo donde vayan a correr el app)
#Instrucciones para correr el proyecto

Ejecutan su emulador Android de preferencia (Puede ser un dispositivo emulado en Android Studio o su propio teléfono conectado)
Se ubican en la carpeta raiz del proyecto y ejecutan el comando "npm start" en la terminal, esto les abrirá el Metro.
Una vez se termine de cargar el Metro, les saldran diferentes opciones, Eligen la opcion "A" para ejecutar en android. Empezará a cargar el app en el dispositivo.
Mientras el proyecto esté en ejecución, pueden presionar la letra R en la terminal para volver a cargar la aplicación.
#Estructura Básica

La estructura es muy parecida a proyectos React + Vite, los componentes, imagenes y paginas están en la carpeta "SRC", sugiero que ahí se cree la carpeta CSS para vincular el mismo en las páginas. Si prefieren hacer un solo archivo CSS global, pueden crear un index.css y vincularlo al APP.TSX .
Todas las dependecencias se encuentras en el package.json, si necesitan eliminar node_modules pueden hacerlo y luego ejecutar en la terminal el comando "npm install"
Recomiendo no mover ni el gradle, ni ninguna configuración del proyecto.
