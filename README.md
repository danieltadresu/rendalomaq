# RendaloMaq Engineering Teams

### Server
Por el lado del backend, hay una aplicación en [NodeJs](https://nodejs.org/) con [ExpressJs](https://expressjs.com/) y 
[Sequelize](https://sequelize.org/) para el uso de base de datos (PostgreSQL). Esta escrito en Javascript.

### Web
Por el lado del frontend, hay una aplicación en [React](https://reactjs.org/), utilizando [Ant Design](https://ant.design/) para los componentes de la UI.

### Como levantar el ambiente de pruebas
Para levantar el ambiente de pruebas se usa [Docker](https://www.docker.com/), se levanta una instancia de PostgreSQL, la 
Web  y el Server.

Se debe ingresar en una consola y pararse en la raíz de este repositorio, luego ejecutar (teniendo Docker instalado) el siguiente comando:

`docker-compose up`

Docker compose se encarga de levantar todo lo necesario. Luego en el navegador, ingresar la dirección `http://localhost:3000`.

### Como correr la suite de tests
Ir al directorio `server` y ejectuar `yarn` para instalar todas las dependencias necesarias del proyecto.
Una vez instalado todo, simplemente ejecutar:

`yarn test`

### Comentarios adicionales
El proyecto es sumamente simple, por lo tanto no se uso ninguna arquitecutura pensando en escalar suficiente.

* Hay tests para todo el código en server, obviamente no se testeas librerias, como sequelize.
* No hay tests en frontend
* Se había pensado en un servicio más completo, pero por cosas de tiempo este debería bastar. (Tiene más rutas de las requeridas).
* Si bien todo está escrito en Javascript, tengo una inclinación en usar Typescript, que es básicamente Javascript en esteroides, con tipado fuerte, uso de interface, entre otros.