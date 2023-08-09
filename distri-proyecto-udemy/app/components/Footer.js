export default function Footer() {
  return (
    <footer className="pb-5 bg-white dark:bg-black mt-44">
      <div className="container px-6 py-4 mx-auto">
        <div className="grid grid-cols-2 gap-6 mt-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          <div>
            <div className="flex flex-col items-start mt-4 space-y-2">
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Udemy Business
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Enseña en Udemy
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Consigue las aplicación
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                ¿Quíenes somos?
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Ponte en contacto con nosotros
              </a>
            </div>
          </div>

          <div>
            <div className="flex flex-col items-start mt-4 space-y-2">
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Empleo
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Blog
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Ayuda y asistencia
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Afiliado
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Inversores
              </a>
            </div>
          </div>

          <div>
            <div className="flex flex-col items-start mt-4 space-y-2">
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Condiciones
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Política de privacidad
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Configuración de cookiees
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Mapa del sitio
              </a>
              <a
                href="#"
                className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Declaración de accesibilidad
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between sm:flex-row mt-9">
          <a href="/">
            <img
              className="w-auto h-7"
              src="https://udemybucketeia.s3.sa-east-1.amazonaws.com/static/logo-udemy-inverted.svg"
              alt=""
            />
          </a>

          <p className="mt-4 text-sm text-gray-500 sm:mt-0 dark:text-gray-300">
            © 2023 Udemy, Inc.
          </p>
        </div>
      </div>
    </footer>
  );
}
