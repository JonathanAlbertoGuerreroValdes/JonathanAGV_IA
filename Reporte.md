# Informe sobre el funcionamiento del código

## Variables y elementos del juego

- `w` y `h` representan el ancho y alto del juego respectivamente (800x400 píxeles).
- `jugador`, `fondo`, `nave`, y `bala` son sprites del juego.
- `salto` es la tecla de espacio.
- `nnNetwork`, `nnEntrenamiento`, y `datosEntrenamiento` son variables relacionadas con la red neuronal del juego.
- `modoAuto` indica si el juego está en modo automático o no.
- `juego` es la instancia del juego Phaser.

## Funciones importantes

## Funciones importantes

- **preload()**: Esta función desencadena la carga de recursos necesarios para el juego, como imágenes y spritesheets. Por ejemplo, se cargan el fondo del juego, el sprite del jugador, la nave y las balas que se utilizarán durante la partida.

- **create()**: En esta función se lleva a cabo la inicialización del juego. Aquí se crean y configuran los elementos visuales y físicos del juego. Por ejemplo, se configura la física de los objetos, se establece la gravedad, se definen las animaciones y se añaden los elementos al escenario del juego.

- **enRedNeural()**: Esta función es crucial para el funcionamiento de la inteligencia artificial en el juego. Se encarga de entrenar la red neuronal con los datos de entrenamiento proporcionados. Estos datos pueden incluir la posición de la bala, la velocidad, la posición del jugador, etc. El objetivo es que la red neuronal aprenda a tomar decisiones automatizadas durante el juego, como determinar cuándo saltar para esquivar una bala enemiga.

- **datosDeEntrenamiento(param_entrada)**: Aquí se evalúa la salida de la red neuronal basándose en los datos de entrada proporcionados. Por ejemplo, la función puede recibir datos como la posición de la bala y la velocidad, y devuelve un resultado que indica si el jugador debe saltar o no en base a esa información.

- **pausa() y mPausa(event)**: Estas funciones son responsables de controlar el estado de pausa del juego. Cuando el jugador activa la pausa, se detiene la acción del juego y se muestra un menú de pausa que permite al jugador realizar acciones como reiniciar el juego, volver al menú principal, o continuar la partida.

- **resetVariables()**: Al llamar a esta función, se reinician todas las variables del juego a sus valores iniciales. Esto es útil para restablecer el estado del juego después de ciertas acciones, como la finalización de un nivel o la muerte del jugador.

- **saltar()**: Esta función se encarga de manejar el salto del jugador en el juego. Dependiendo de las condiciones del juego, como la detección de una colisión o una instrucción del jugador, la función hace que el jugador realice un salto para evitar obstáculos o realizar movimientos estratégicos.

- **update()**: Es la función principal que se ejecuta en cada fotograma del juego. Aquí se controla toda la lógica del juego, como la actualización de la posición de los elementos, la detección de colisiones, la interacción con el usuario, y la toma de decisiones basada en la lógica del juego y la inteligencia artificial.

- **disparo()**: Esta función maneja el disparo de la bala en el juego. Se encarga de generar la velocidad y dirección adecuadas para la bala, así como de detectar colisiones con otros elementos del juego, como el jugador o los enemigos.


## Funcionamiento general del juego

1. **Inicialización**: En esta fase se realizan las siguientes tareas:
   - Carga de recursos: Se cargan todas las imágenes, spritesheets, sonidos y otros recursos necesarios para el juego, como el fondo, el sprite del jugador, la nave y las balas.
   - Configuración inicial: Se establecen las configuraciones iniciales del juego, como la resolución de la pantalla, la física del mundo, la gravedad y otros parámetros fundamentales.

2. **Creación de elementos**: Durante esta etapa, se llevan a cabo las siguientes acciones:
   - Creación de sprites: Se crean los sprites que representan los diferentes elementos del juego, como el jugador, la nave enemiga, las balas, obstáculos, entre otros.
   - Configuración de físicas: Se establecen las propiedades físicas de los objetos, como la colisión, la gravedad, la fricción y la elasticidad, para simular un entorno interactivo y realista.
   - Asignación de animaciones: Se definen y asignan las animaciones a los sprites para crear efectos visuales, como el movimiento del jugador, la explosión de un enemigo, entre otros.

3. **Bucle principal (`update()`)**: Esta fase constituye el núcleo del juego y se desarrolla de la siguiente manera:
   - Actualización del fondo: Se actualiza la posición del fondo en cada fotograma para simular el desplazamiento del entorno y crear una sensación de movimiento.
   - Gestión de colisiones: Se detectan y gestionan las colisiones entre los diferentes elementos del juego, como el jugador con las balas enemigas, las balas con los obstáculos, etc.
   - Control de acciones del jugador y la bala: Se capturan las acciones del jugador, como movimientos, disparos, saltos, etc., y se ejecutan las acciones correspondientes en el juego.
   - Modo automático y usuario: Se controla el modo automático del juego, donde la inteligencia artificial toma decisiones basadas en la red neuronal entrenada, y se gestiona la interacción del usuario a través de eventos de entrada, como teclas presionadas, clics del ratón, etc.
   - Entrenamiento de la red neuronal: Durante el juego, se entrena la red neuronal utilizando los datos de entrenamiento proporcionados para mejorar su capacidad de tomar decisiones precisas y automáticas.
   - Toma de decisiones basadas en la red neuronal: La red neuronal activa se utiliza para tomar decisiones en tiempo real, como determinar cuándo saltar para esquivar una bala enemiga o realizar movimientos estratégicos para completar un nivel.

4. **Funciones adicionales**:
   - `colisionH()`: Esta función se ejecuta cuando ocurre una colisión entre la bala y el jugador. Puede activar efectos visuales, como una explosión, y desencadenar acciones, como la pausa del juego.
   - `velocidadRandom(min, max)`: Genera una velocidad aleatoria para la bala, lo que añade variabilidad y emoción al juego al introducir elementos impredecibles.



## Conclusiones

- El juego utiliza Phaser y una red neuronal para controlar el salto del jugador automáticamente o permitir la interacción del usuario.
- Se entrena la red neuronal con datos de desplazamiento de la bala y velocidad para determinar cuándo debe saltar el jugador.
- El código maneja la pausa, la interacción con el usuario y el reinicio del juego de manera eficiente.
