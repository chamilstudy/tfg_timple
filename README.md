# Trabajo de Fin de Grado

## Objetivos

El **objetivo principal** de este proyecto es el desarrollo de una aplicación web específicamente diseñada para el aprendizaje, práctica y difusión de canciones para timple.

La complejidad que entraña la elaboración de un espacio digital de este tipo requiere de la definición de una serie de **objetivos específicos**:

- **Disponibilidad de recursos didácticos**, en forma de páginas informativas con contenidos diseñados para iniciarse en el instrumento.
- **Publicación de canciones**, donde se mostrará información esencial, letra, acordes y ciertas utilidades para su práctica.
- **Existencia de una biblioteca de canciones**, permitiendo la búsqueda y acceso de las canciones publicadas.
- **Creación de herramientas**, destinadas como complemento de la práctica del instrumento o a la creación de nuevos recursos.
- **Espacio digital**, a través de las publicaciones de usuarios, caja de comentarios, sistema de "me gusta", perfiles…

## Estado

| **Incremento** | **Descripción**                                                                 | **Estado**    | **Duración** |
| -------------- | ------------------------------------------------------------------------------- | ------------- | ------------ |
| 1              | Implementación de la estructura base de la aplicación web.                      | En desarrollo | 0 horas      |
| 2              | Desarrollo de los perfiles de usuario, publicaciones y biblioteca de canciones. | Pendiente     | 0 horas      |
| 3              | Integración del algoritmo de generación o análisis de acordes.                  | Pendiente     | 0 horas      |
| 4              | Implementación de utilidades interactivas dentro de las publicaciones.          | Pendiente     | 0 horas      |
| 5              | Creación de las primeras publicaciones de prueba para validación del sistema.   | Pendiente     | 0 horas      |
| 6              | Implementación de utilidades independientes y funciones adicionales.            | Pendiente     | 0 horas      |
| 7              | Desarrollo de las páginas informativas y refinamiento final del sistema.        | Pendiente     | 0 horas      |

## Desarrollo

### Requisitos

| ID   | Requisito Funcional                                                                                    | Funcionalidad                  | Prioridad |
| ---- | ------------------------------------------------------------------------------------------------------ | ------------------------------ | --------- |
| RF1  | El usuario debe poder iniciar y cerrar sesión.                                                         | Usuario                        | Alta      |
| RF2  | El usuario debe poder registrarse utilizando su correo electrónico, contraseña y un nombre de usuario. | Usuario                        | Alta      |
| RF3  | El usuario debe poder modificar su perfil.                                                             | Usuario                        | Alta      |
| RF4  | Las publicaciones deben contener como mínimo, título, letra y acordes.                                 | Crear y editar publicaciones   | Alta      |
| RF5  | Las publicaciones deben permitir las referencias de autores, libros u otras fuentes.                   | Crear y editar publicaciones   | Alta      |
| RF6  | El usuario debe poder crear, editar y eliminar publicaciones como respuesta a una solicitud.           | Crear y editar publicaciones   | Alta      |
| RF7  | El usuario debe poder crear, editar y eliminar publicaciones.                                          | Crear y editar publicaciones   | Alta      |
| RF8  | El usuario debe poder visualizar una lista de acordes en las publicaciones.                            | Utilidades en publicaciones    | Alta      |
| RF9  | El usuario debe poder activar y desactivar el autoscroll en una publicación.                           | Utilidades en publicaciones    | Alta      |
| RF10 | El usuario debe poder seleccionar una notación preferida.                                              | Utilidades en publicaciones    | Alta      |
| RF11 | El usuario debe poder usar utilidades en publicaciones (como acordes, transporte, etc.)                | Utilidades en publicaciones    | Alta      |
| RF12 | El usuario debe poder transportar los acordes de una publicación.                                      | Utilidades en publicaciones    | Media     |
| RF13 | El usuario debe poder ver guías de rasgueos.                                                           | Utilidades en publicaciones    | Media     |
| RF14 | El usuario debe poder compartir publicaciones vía enlace o redes sociales.                             | Utilidades en publicaciones    | Media     |
| RF15 | El usuario debe poder imprimir o descargar una publicación.                                            | Utilidades en publicaciones    | Baja      |
| RF16 | El usuario debe poder visualizar una biblioteca de canciones.                                          | Biblioteca de canciones        | Alta      |
| RF17 | El usuario debe poder acceder a una calculadora de escalas y notas.                                    | Calculadora de escalas y notas | Alta      |
| RF18 | El usuario debe poder acceder a un diccionario de acordes.                                             | Diccionario de acordes         | Alta      |
| RF19 | El afinador interactivo debe mostrar las cuerdas, afinación objetivo y afinación actual.               | Afinador                       | Alta      |
| RF20 | El usuario debe poder acceder a un afinador interactivo.                                               | Afinador                       | Media     |
| RF21 | El usuario debe poder comentar en publicaciones.                                                       | Comentar publicaciones         | Media     |
| RF22 | El usuario debe poder puntuar una publicación.                                                         | Puntuar publicaciones          | Media     |
| RF23 | El usuario debe poder acceder a páginas informativas sobre el instrumento.                             | Cursos y guías                 | Media     |
| RF24 | El usuario debe poder guardar canciones en su carpeta personal.                                        | Guardar canciones              | Baja      |
| RF25 | El usuario debe poder solicitar canciones.                                                             | Solicitar nuevas canciones     | Baja      |
| RF26 | El sistema debe mostrar fecha y hora de creación o última modificación.                                | Solicitar nuevas canciones     | Alta      |

| ID   | Requisito No Funcional                                                                                                                              | Prioridad |
| ---- | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| RNF1 | El sistema debe ser responsivo, adaptándose a diferentes tamaños de pantalla y dispositivos.                                                        | Alta      |
| RNF2 | El sistema debe incluir una descripción textual (`alt`) en todas las imaganes.                                                                      | Alta      |
| RNF3 | El sistema debe incluir un `aria-label` o `aria-labelledby` en todos los elementos interactivos, describiendo su función para lectores de pantalla. | Alta      |
| RNF4 | El sistema debe proporcionar navegación mediante un encabezado (header) y un pie de página (footer) consistentes en todas las vistas.               | Alta      |

### Incremento 1

En este incremento se realizaran las tareas mínimas imprescindibles que darán resultado a la estructura base de la aplicación web.

flowchart LR
%% STYLE ---
style actor3 stroke-width:0px
style actor2 stroke-width:0px
style actor1 stroke-width:0px

    %% DIAGRAM ---
    %% Actors
    actor1["👤 Usuario"]
    actor2(("🔒 Supabase Auth"))
    actor3["🗄️ Supabase DB"]

    %% Cases
    ini([Iniciar Sesión])
    reg([Registrarse])
    ed([Editar Perfil])

    %% Relationships
    actor1 --> ini
    actor1 --> reg
    actor1 --> ed

    ini -. "«include»" .-> actor2
    reg -. "«include»" .-> actor2
    reg -. "«include»" .-> actor3
    ed -. "«include»" .-> actor3

#### Tareas

| **Tarea**                                                                                                                                           | **Estado** | **Duración** |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------------ |
| **Análisis**                                                                                                                                        | Pendiente  | 0 horas      |
| **Diseño de formulario de inicio de sesión y registro.**                                                                                            | Pendiente  | 0 horas      |
| **Configuración de entorno de desarrollo**, creación de proyecto Next.js utilizando template de Supabase con autenticación y limpieza del proyecto. | Finalizado | 30 minutos   |
| **Implementación**                                                                                                                                  | Pendiente  | 0 horas      |
