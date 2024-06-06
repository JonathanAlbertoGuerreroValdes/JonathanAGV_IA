# REPORTE DE Wally

En este proyecto generamos un dataset en la cual se tomaron en cuenta imagenes __negativas__ y __positivas__, esto para considerar si es Wally o no.

Para poder hacer un xml, se uso __Cascade Trainer GUI__, el cual nos ayuda a tomar en cuenta las imagenes negativas y positivas, tomando en cuenta un porcentaje para tomar como buenas, toma en consideracion el tamaño de las imagenes si una esta diferente, truena el entrenamiento. Una vez agregado los parametros en cada una de las secciones, se crea el xml y algunos otros archivos. 

Tomamos en cuenta el __classifier.xml__, el cual nos ayuda al entrenamiento que ya se establecido, y tomamos en cuenta un archivo __.pyhib__ para ver si acepta que es wally o no.


## Código para la Detección de Wally

A continuación se presenta el código utilizado para la detección de Wally en una imagen, con una explicación detallada de cada sección:

# Detectando a Wally

## Descripción del Código

Este script en Python utiliza OpenCV para detectar a Wally en una imagen. La detección se realiza mediante un clasificador en cascada previamente entrenado.

## Funcionalidad

1. **Carga de la Imagen**:
    ```python
    image = cv.imread(r'D:\Escuela Betin\9no Sem\3. Inteligencia Artificial\Wally\Pruebas\WallyP.png')
    ```
    Carga la imagen donde se buscará a Wally.

2. **Conversión a Escala de Grises**:
    ```python
    gray = cv.cvtColor(image, cv.COLOR_BGR2GRAY)
    ```
    Convierte la imagen a escala de grises para facilitar el procesamiento.

3. **Carga del Clasificador**:
    ```python
    wally = cv.CascadeClassifier(r'D:\Escuela Betin\9no Sem\3. Inteligencia Artificial\Wally\classifier\cascade.xml')
    ```
    Carga el archivo XML que contiene el clasificador en cascada entrenado para detectar a Wally.

4. **Detección de Wally**:
    ```python
    wally_detections = wally.detectMultiScale(gray, scaleFactor=1.11, minNeighbors=8, minSize=(50,50))
    ```
    Aplica el clasificador en cascada para detectar a Wally en la imagen. Los parámetros `scaleFactor`, `minNeighbors`, y `minSize` ajustan la precisión de la detección.

5. **Dibujar Rectángulos y Etiquetas**:
    ```python
    for (x, y, w, h) in wally_detections:
        cv.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 2)
        cv.putText(image, 'Wally', (x, y - 10), cv.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)
    ```
    Dibuja rectángulos alrededor de las detecciones de Wally y añade una etiqueta de texto.

6. **Mostrar la Imagen**:
    ```python
    cv.imshow('Wally?', image)
    cv.waitKey(0)
    cv.destroyAllWindows()
    ```
    Muestra la imagen con las detecciones y espera a que se cierre la ventana.

## Conlcusión

Como logramos ver, hay una seccion donde hay parametros, los cuales son:
__FactorScale, minSize, minNeighbors__, nos ayudan para encontrar a wally, cuando se da una imagen al cargar este codigo, estos nos ayudan a la presision para encontrar a Wally. En pocas palabras, para encontrar a Wally a veces hay que jugar un poco con estos factores y asi poder encontrarlo, hay que mencionar que pueden salir mas de 2 recuadros, el chiste es jugar con las variables mencionadas para que estos reduscan.