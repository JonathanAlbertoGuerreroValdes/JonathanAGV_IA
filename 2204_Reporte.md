# Informe de funcionamiento 2

## Data set

1. Agregar nuevas variables para las balas:
- Crearemos dos nuevas variables para representar las balas adicionales. Una variable para la bala que se moverá en el eje y (balaY) y otra para la bala que se moverá en diagonal (balaDiagonal).
2. Cargar imágenes para las nuevas balas:
- Necesitamos cargar las imágenes de las nuevas balas en la función preload() para que estén disponibles para su uso en el juego.
3. Crear funciones para disparar las nuevas balas:
- Implementaremos funciones separadas para disparar cada una de las nuevas balas. Estas funciones se encargarán de establecer la velocidad inicial de las balas y activar su movimiento.
4. Modificar la lógica de movimiento del jugador:
- Permitiremos que el jugador se mueva hacia adelante y hacia atrás utilizando los controles de teclado. Cuando el jugador presione la tecla de dirección izquierda, el personaje se moverá hacia la izquierda; cuando presione la tecla de dirección derecha, el personaje se moverá hacia la derecha.
5. Actualizar la función update:
- En la función update(), agregaremos la lógica para detectar la entrada del jugador y activar el disparo de las nuevas balas según sea necesario. También actualizaremos la lógica existente para el movimiento del jugador y la interacción con el suelo.
6. Consideraciones adicionales:
- Aseguraremos que las nuevas balas se creen y activen correctamente en el juego, y que su movimiento y colisiones se gestionen adecuadamente.

Una opción para nuestra nueva red neuronal seria la siguiente:
- nnNetwork =  new synaptic.Architect.
- Capa de entrada (2 neuronas):
Esta es la primera capa de la red neuronal y corresponde a las características de entrada que se proporcionan a la red. En este caso, hay 2 neuronas en esta capa, lo que sugiere que se están alimentando dos características como entrada a la red. En el contexto del juego, estas características podrían ser el desplazamiento de la bala y la velocidad de la bala, que se utilizan para tomar decisiones sobre el movimiento del jugador.
- Capas ocultas (dos capas, cada una con 6 neuronas):
Las capas ocultas son capas intermedias entre la capa de entrada y la capa de salida de la red neuronal. En este caso, hay dos capas ocultas, cada una con 6 neuronas. Las capas ocultas son responsables de aprender y extraer características complejas de los datos de entrada. Cuantas más neuronas tenga una capa oculta, más capacidad tendrá la red para aprender patrones complejos en los datos de entrada. El número de neuronas en estas capas se elige generalmente a través de experimentación y ajuste para encontrar un equilibrio entre el rendimiento y la complejidad del modelo.
- Capa de salida (2 neuronas):
Esta es la capa final de la red neuronal y produce las salidas de la red. En este caso, hay 2 neuronas en esta capa de salida, lo que indica que la red está produciendo dos salidas. En el contexto del juego, estas salidas podrían representar las acciones que la red toma, como saltar o no saltar en función de la situación del juego.