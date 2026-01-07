import Link from "next/link";

export type Article = {
  title: string;
  slug: string;
  description: string;
  children: React.ReactNode;
};

export type Section = {
  title: string;
  slug: string;
  articles: Article[];
};

export const manualData = [
  {
    title: "Introducción", // Nombre visible de la sección
    slug: "getting-started", // Slug para la URL → params.section
    articles: [
      {
        title: "Cómo utilizar el manual", // Título del artículo
        slug: "how-to-use-manual", // Slug para la URL → params.article
        description: "Información general sobre cómo utilizar este manual",
        children: (
          <>
            <p>
              Este manual está organizado para facilitar la navegación y la
              comprensión de sus contenidos.
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>
                <span className="font-bold">Secciones:</span> agrupan una serie
                de artículos relacionados que explican funcionalidades con un
                objetivo común.
              </li>
              <li>
                <span className="font-bold">Artículos:</span> contienen
                información detallada y específica sobre cada funcionalidad.
              </li>
            </ul>

            <p>
              Puedes utilizar la <span className="font-bold">leyenda</span> para
              navegar por el manual y acceder rápidamente a los contenidos.
            </p>
          </>
        ),
      },
    ],
  },
  {
    title: "Cuentas",
    slug: "account",
    articles: [
      {
        title: "Crear una cuenta",
        slug: "create-account",
        description: "Información sobre registro de usuario",
        children: (
          <>
            <p>
              Para crear una <span className="font-bold">cuenta</span>, primero
              debes acceder al formulario de registro. Puedes hacerlo de dos
              maneras:
            </p>

            <ul className="list-disc pl-6 space-y-3">
              <li>
                Desde el formulario de inicio de sesión, accesible desde la
                cabecera de la página. Una vez allí, haz clic en el botón{" "}
                <span className="font-bold">Registrarse</span>.
              </li>
              <li>
                Accediendo directamente al formulario de registro{" "}
                <Link className="link" href="/auth/signup">
                  aquí
                </Link>
                .
              </li>
            </ul>

            <p>
              Durante el proceso de registro, ten en cuenta los siguientes
              puntos:
            </p>

            <ul className="list-disc pl-6 space-y-3">
              <li>
                El <span className="font-bold">nombre de usuario</span> debe ser
                único. Si el que deseas ya está en uso, prueba con otro
                diferente.
              </li>
              <li>
                El <span className="font-bold">correo electrónico</span> también
                debe ser único y no puede utilizarse para crear más de una
                cuenta.
              </li>
              <li>
                Es obligatorio leer y aceptar los{" "}
                <Link href="/tac" className="link">
                  términos y condiciones
                </Link>{" "}
                del servicio.
              </li>
            </ul>

            <p>
              Una vez completado el registro, recibirás un correo electrónico de
              confirmación. Tras confirmar tu cuenta, podrás iniciar sesión
              usando tu correo electrónico y contraseña.
            </p>
          </>
        ),
      },
      {
        title: "Recuperar contraseña",
        slug: "recover-password",
        description: "Información sobre recuperación de contraseña",
        children: (
          <>
            <p>
              Para recuperar tu <span className="font-bold">contraseña</span>,
              primero debes acceder al formulario de recuperación. Puedes
              hacerlo de dos maneras:
            </p>

            <ul className="list-disc pl-6 space-y-3">
              <li>
                Desde el formulario de inicio de sesión, accesible desde la
                cabecera de la página. Una vez allí, haz clic en el enlace{" "}
                <span className="font-bold">Olvidé mi contraseña</span>.
              </li>
              <li>
                Accediendo directamente al formulario de recuperación de
                contraseña{" "}
                <Link className="link" href="/auth/update-password">
                  aquí
                </Link>
                .
              </li>
            </ul>

            <p>
              Durante el proceso de recuperación deberás introducir tu{" "}
              <span className="font-bold">correo electrónico</span>. Si el
              correo está asociado a una cuenta, recibirás un mensaje con un
              enlace al formulario de cambio de contraseña, donde podrás
              establecer una nueva.
            </p>

            <p>Se iniciará sesión automaticamente tras el cambio.</p>
          </>
        ),
      },
      {
        title: "Modificar cuenta",
        slug: "modify-account",
        description: "Información sobre la modificación de datos de cuenta",
        children: (
          <>
            <p>
              Para <span className="font-bold">modificar tu cuenta</span>, es
              necesario haber iniciado sesión.
            </p>

            <p>
              En la cabecera de la página encontrarás el botón de acceso al
              perfil de usuario. Al seleccionarlo, se mostrará tu perfil
              público, donde junto a tu nombre aparece el botón de{" "}
              <span className="font-bold">Ajustes</span>.
            </p>

            <p>
              Dentro de los ajustes encontrarás las opciones relacionadas con tu
              cuenta, desde donde podrás realizar las modificaciones necesarias.
            </p>
          </>
        ),
      },
      {
        title: "Modificar Correo",
        slug: "modify-email",
        description: "Información sobre la modificación de correo",
        children: (
          <>
            <p>
              Desde los ajustes de tu cuenta, puedes modificar el{" "}
              <span className="font-bold">correo electrónico</span> asociado a
              tu perfil.
            </p>

            <p>
              Para realizar el cambio, deberás introducir el nuevo correo
              electrónico y confirmar la operación siguiendo las indicaciones
              del formulario.
            </p>

            <p>
              Tras solicitar el cambio, recibirás un mensaje de confirmación
              tanto en el
              <span className="font-bold"> correo electrónico actual</span> como
              en el <span className="font-bold">nuevo</span>. El cambio no se
              efectuará hasta que ambos correos hayan sido validados
              correctamente.
            </p>
          </>
        ),
      },
      {
        title: "Modificar Contraseña",
        slug: "modify-password",
        description: "Información sobre la modificación de contraseña",
        children: (
          <>
            <p>
              Desde los ajustes de tu cuenta, puedes modificar tu{" "}
              <span className="font-bold">contraseña</span> en cualquier
              momento.
            </p>

            <p>
              Para realizar el cambio, deberás introducir la nueva contraseña y
              confirmar la operación siguiendo las indicaciones del formulario.
            </p>

            <p>
              Una vez confirmado el cambio, la sesión se cerrará automáticamente
              y deberás iniciar sesión de nuevo utilizando la nueva contraseña.
            </p>
          </>
        ),
      },
      {
        title: "Eliminar cuenta",
        slug: "delete-account",
        description: "Información sobre la eliminación de cuenta",
        children: (
          <>
            <p>
              Desde los ajustes de tu cuenta, puedes{" "}
              <span className="font-bold">eliminar la cuenta</span>.
            </p>

            <p>
              Para ello deberás presionar el botón de{" "}
              <span className="font-bold">Eliminar Cuenta.</span>
            </p>

            <p>La cuenta y todos sus contenidos serán eliminados.</p>
          </>
        ),
      },
      {
        title: "Cerrar sesión",
        slug: "signout",
        description: "Información sobre cierre de sesión",
        children: (
          <>
            <p>
              Desde los ajustes de tu cuenta, puedes{" "}
              <span className="font-bold">cerrar la sesión</span>.
            </p>

            <p>
              Para ello deberás presionar el botón de{" "}
              <span className="font-bold">Cerrar sesión.</span>
            </p>

            <p>La sesión se cerrará inmediatamente.</p>
          </>
        ),
      },
    ],
  },
  {
    title: "Perfil", // Nombre visible de la sección
    slug: "profile", // Slug para la URL → params.section
    articles: [
      {
        title: "Modificar Perfil", // Título del artículo
        slug: "modify-profile", // Slug para la URL → params.article
        description: "Información general sobre cómo utilizar este manual",
        children: (
          <>
            <p>
              Para <span className="font-bold">modificar tu perfil</span>, es
              necesario haber iniciado sesión.
            </p>

            <p>
              En la cabecera de la página encontrarás el botón de acceso al
              perfil de usuario. Al seleccionarlo, se mostrará tu perfil
              público, donde junto a tu nombre aparece el botón de{" "}
              <span className="font-bold">Ajustes</span>.
            </p>

            <p>
              Dentro de los ajustes encontrarás las opciones relacionadas con tu
              perfil, desde donde podrás realizar las modificaciones necesarias.
            </p>
          </>
        ),
      },
      {
        title: "Modificar Nombre", // Título del artículo
        slug: "modify-username", // Slug para la URL → params.article
        description: "Pasos para cambiar el nombre de usuario",
        children: (
          <>
            <p>
              Desde los ajustes de tu cuenta, puedes modificar el{" "}
              <span className="font-bold">nombre de usuario</span> asociado a tu
              perfil.
            </p>

            <p>
              Para realizar el cambio, deberás introducir el nuevo nombre de
              usuario y confirmar la operación siguiendo las indicaciones del
              formulario.
            </p>

            <p>
              Tras solicitar el cambio, el nombre de usuario será actualizado.
            </p>
          </>
        ),
      },
      {
        title: "Modificar Descripción", // Título del artículo
        slug: "modify-description", // Slug para la URL → params.article
        description: "Pasos para cambiar la descripción de usuario",
        children: (
          <>
            <p>
              Desde los ajustes de tu cuenta, puedes modificar la{" "}
              <span className="font-bold">la descripción de usuario</span>{" "}
              asociada a tu perfil.
            </p>

            <p>
              Para realizar el cambio, deberás introducir la nueva descripción
              de usuario y confirmar la operación siguiendo las indicaciones del
              formulario.
            </p>

            <p>
              Tras solicitar el cambio, el nombre de usuario será actualizado.
            </p>
          </>
        ),
      },
    ],
  },
];
