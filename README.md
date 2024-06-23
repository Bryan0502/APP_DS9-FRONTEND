Dashboard Administrativo - Prototipo
Este proyecto es un prototipo de aplicación Android desarrollado con React Native para crear un Dashboard administrativo. Utiliza JavaScript para la lógica de la aplicación y PHP para la conexión a la base de datos mediante PHPMyAdmin.

Cosas Necesarias
Antes de comenzar, asegúrate de tener instalado lo siguiente:

Node.js
JDK (versión 17 recomendada)
SDK de Android (dependiendo de la versión de Android del dispositivo objetivo)
Instrucciones para correr el proyecto
Para ejecutar la aplicación en un emulador Android o dispositivo físico, sigue estos pasos:

Iniciar el emulador Android:

Ejecuta tu emulador Android preferido (puede ser un dispositivo emulado en Android Studio o tu propio teléfono conectado).
Preparar el entorno de desarrollo:

Abre una terminal y navega hasta la carpeta raíz del proyecto.
Ejecutar el servidor de desarrollo:

bash
Copiar código
npm start
Esto iniciará el Metro Bundler, que es necesario para compilar y ejecutar la aplicación.

Compilar y ejecutar en Android:

Una vez que el Metro Bundler esté completamente cargado, verás varias opciones en la terminal.
Presiona a para compilar y ejecutar la aplicación en el emulador o dispositivo Android conectado.
Recargar la aplicación:

Durante el desarrollo, puedes presionar r en la terminal para recargar la aplicación en el emulador o dispositivo.
Estructura del Proyecto
El proyecto sigue una estructura típica de aplicaciones React Native:

/src: Contiene los archivos fuente del frontend desarrollado en JavaScript (React Native).
/src/components: Componentes reutilizables de la aplicación.
/src/assets: Archivos estáticos como imágenes y otros recursos.
/src/screens: Pantallas principales de la aplicación.
/src/styles: Estilos CSS para los componentes y pantallas.
Gestión de Dependencias
Todas las dependencias del proyecto están especificadas en el archivo package.json. Para instalarlas, puedes ejecutar:

bash
Copiar código
npm install
Esto instalará todas las dependencias necesarias para el proyecto.

Notas adicionales
Configuración de CSS: Se recomienda organizar los estilos en la carpeta styles dentro de src. Puedes utilizar un archivo index.css para estilos globales o vincular CSS específico a cada componente según sea necesario.

Gradle y Configuración del Proyecto: Es recomendable no modificar ni mover las configuraciones de Gradle u otras configuraciones del proyecto, a menos que sea absolutamente necesario y se comprenda completamente el impacto.

Contribución
Si deseas contribuir a este proyecto, sigue estos pasos:

Haz un fork del repositorio.
Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).
Realiza tus cambios y realiza commit de estos (git commit -am 'Agrega nueva funcionalidad').
Haz push de la rama (git push origin feature/nueva-funcionalidad).
Abre un Pull Request en GitHub.
Autor
Bryan (Agrega tu información de contacto si deseas)
Licencia
Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.
