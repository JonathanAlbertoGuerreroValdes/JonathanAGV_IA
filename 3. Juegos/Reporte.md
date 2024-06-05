# REPORTE DE LOS JUEGOS

En este caso, se usaron librerias de phaser para crear 2 juegos:

__1. Juego de 3 balas__

En este caso se usaron 3 nabes con 3 disparos de balas en diferentes direcciones, en el cual hay un jugador el cual debe de esquivar las balas, por medio de aprendizaje por medio de una red Neuronal

__2. Juego de la bala que rebota__

Este es algo similar al anterior, pero este tiene una bala que se mueve a todos lados y el mono tiene direcciones similares y aprende conforme al juego de usuario. 

Tomando esto en cuenta, el primer juego se encuentra en el archivo __juego3Nav.js__ y el segun en el archivo __juegoRebota.js__. Estos archivos se cambian en esta linea de codigo, en el archivo __index.html__:


```
<script src="juegoRebota.js" type="text/javascript"></script>
```

# JuegoRebota

## Descripción General

JuegoRebota es un juego desarrollado con la librería Phaser.js, que combina física arcade y una red neuronal para automatizar el movimiento del jugador. El objetivo es evitar colisiones con una bala que rebota en la pantalla.

## Estructura del Código

### Variables Globales

- **Dimensiones del juego:** `w`, `h`
- **Sprites:** `jugador`, `fondo`, `bala`
- **Controles y menú:** `cursors`, `menu`
- **Red neuronal:** `nnNetwork`, `nnEntrenamiento`, `nnOutput`
- **Datos de entrenamiento:** `datosEntrenamiento`
- **Modos del juego:** `autoMode`, `trainingComplete`, `autoModeButton`
- **Instancia del juego:** `juego`

### Funciones Principales

#### preload()

Carga los assets del juego como imágenes y sprites.

#### create()

Inicializa la física del juego, añade sprites y textos, habilita el control del teclado y configura la red neuronal.

#### setRandomBalaVelocity()

Establece una velocidad aleatoria para la bala.

#### update()

Actualiza la lógica del juego, incluyendo el movimiento del jugador y la recolección de datos para el entrenamiento de la red neuronal.

#### velocidadBala(bala)

Cambia la velocidad de la bala después de una colisión.

#### colisionH()

Entrena la red neuronal con los datos recolectados y pausa el juego después de una colisión.

#### resetGame()

Reinicia las posiciones del jugador y la bala.

#### pausa()

Pausa el juego y muestra un menú.

#### mPausa(event)

Controla la funcionalidad del menú en pausa.

#### enterAutoMode()

Activa el modo automático y reinicia el juego.

#### render()

Función vacía para renderizar gráficos adicionales si es necesario.

### Descripción de la Lógica del Juego

1. **Carga y Configuración:**
   - Se cargan los recursos del juego.
   - Se configura el sistema de física y se añaden los sprites a la pantalla.
   - Se inicializa la red neuronal para el control automático.

2. **Movimiento y Entrenamiento:**
   - En modo manual, el jugador se mueve con las teclas de dirección y se recopilan datos de entrenamiento.
   - En modo automático, la red neuronal controla el movimiento del jugador.
   - Los datos de entrenamiento se almacenan y se utilizan para entrenar la red neuronal después de una colisión.

3. **Interacción y Colisiones:**
   - La bala se mueve de manera aleatoria y rebota en los bordes de la pantalla.
   - Si la bala colisiona con el jugador, se entrena la red neuronal y el juego se pausa.

4. **Modos de Juego:**
   - El jugador puede cambiar entre el modo manual y el modo automático.
   - En el modo automático, la red neuronal utiliza los datos de entrenamiento para evitar colisiones con la bala.

Este juego demuestra el uso de redes neuronales para controlar personajes en un entorno de juego, proporcionando una experiencia interactiva sobre inteligencia artificial.

# Juego3Nav

## Descripción

Juego3Nav es un juego desarrollado con Phaser que utiliza una red neuronal para entrenar a un jugador a evitar una bala en movimiento. El jugador puede moverse en todas las direcciones, y la bala se mueve con velocidad y ángulo aleatorios. El juego tiene modos manual y automático.

## Componentes

### Variables

- **Dimensiones del juego**: `var w = 500, h = 450;`
- **Sprites**: `jugador`, `fondo`, `bala`
- **Controles**: `cursors`, `menu`
- **Red neuronal**: `nnNetwork`, `nnEntrenamiento`, `nnOutput`
- **Datos de entrenamiento**: `datosEntrenamiento = []`
- **Modo automático**: `autoMode = false, trainingComplete = false`
- **Botón de modo automático**: `autoModeButton`

### Funciones

#### `preload()`
Carga los recursos necesarios: fondo, sprites del jugador y bala, imagen del menú.

#### `create()`
Inicializa el sistema de física, sprites, animaciones, controles y red neuronal. Configura la velocidad y posición inicial de la bala.

#### `setRandomBalaVelocity()`
Establece una velocidad y dirección aleatoria para la bala.

#### `update()`
Actualiza el estado del juego en cada frame:
- Movimiento del fondo.
- Detección de colisiones.
- Captura de entradas del usuario.
- Entrenamiento de la red neuronal con datos de movimiento.
- Activación de la red neuronal en modo automático.

#### `velocidadBala(bala)`
Cambia la dirección de la bala tras una colisión.

#### `colisionH()`
Entrena la red neuronal cuando ocurre una colisión y pausa el juego.

#### `resetGame()`
Reinicia la posición del jugador y la bala.

#### `pausa()`
Pausa el juego y muestra el menú.

#### `mPausa(event)`
Detecta la interacción con el menú de pausa y maneja el cambio de modos.

#### `enterAutoMode()`
Activa el modo automático y reinicia el juego.

#### `render()`
Función de renderizado, actualmente vacía.

## Controles

- **Flechas del teclado**: Mueven al jugador en el modo manual.
- **Botón de pausa**: Pausa el juego y muestra el menú.
- **Click en el botón 'Enter Auto Mode'**: Activa el modo automático.

## Red Neuronal

La red neuronal es un perceptrón multicapa con 5 neuronas de entrada, 10 ocultas y 4 de salida. Durante el juego, la red neuronal se entrena con los datos de movimiento del jugador para aprender a evitar la bala.

## Flujo de Juego

1. **Inicialización**: Se cargan los recursos y se crean los elementos del juego.
2. **Movimiento Manual**: El jugador se mueve usando las flechas del teclado.
3. **Entrenamiento**: Se recogen datos de los movimientos manuales del jugador y se entrenan con la red neuronal.
4. **Modo Automático**: La red neuronal controla al jugador para evitar la bala.

## Resumen

Juego3Nav es una demostración de cómo integrar aprendizaje automático en un juego sencillo, permitiendo al jugador ser controlado tanto manualmente como automáticamente mediante una red neuronal entrenada.

