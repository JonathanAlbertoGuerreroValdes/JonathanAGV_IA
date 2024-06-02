# REPORTE DEL CNN

En este proyecto generamos un dataset en la cual se toameron en cuenta los siguientes desastres:

__1. Asatos__

__2. Incendios__

__3. Robo casa habitación__

__4. Tornados__

__5. Inundaciones__

En los cuales se crearon carpetas con ciertas cantidades de imagenes, para que el modelo aprendiera de la mejor manera, considerando el codigo que tenemos en el archivo _CNN.ipynb_. En pocas palabras, este informe detalla la implementación y funcionamiento de una Red Neuronal Convolucional (CNN) utilizada para la clasificación de imágenes. La red procesa imágenes, las clasifica en diferentes categorías y evalúa su rendimiento.

## Importación de Librerías

Se importan librerías esenciales para el procesamiento de datos, manipulación de imágenes y construcción de la CNN.

## Carga del Conjunto de Imágenes

Las imágenes se cargan desde un directorio especificado. Solo se consideran archivos con extensiones comunes de imágenes. Las imágenes se almacenan en una lista y se registran los directorios y el conteo de imágenes.

```python
dirname = os.path.join(os.getcwd(), 'ruta_a_imagenes')
# Código para leer imágenes y almacenarlas en una lista
```

## Creacion de Etiquetas
 Aqui se crean crean las etiquetas las etiqyetas necesarias para la carpeta de imagenes, en el directorio que se dio de origen, esto, asigna un numero de etiqueta unico para cada categoria.

 ## Análisis de Clases
 Aqui se determinan las clases únicas presentes en el conjunto de datos y se implementa y se impirmen el número totales de salidas y clases

 ## División de Datos
 Los datos se dividen en conjunto de entrenamiento y pruebas, utilizando una proporcion para estas mismas.

 ## Procesamiento de las Imagenes
 Las imagenes se normalizan. Además, se realiza el One-Hot Encoding de las etiquetas. Para asi crear el Modelo del CNN.

 Donde se define y se compila el modelo del CNN, ajsutando los aáramentros como el learning rate y la función de decaimiento exponencial para el optimizador. Por otro lado el modelo se entrena tilizando datos de entrenamiento y validacion, logrando asi el guardado del modelo de entreanamiento. Y llegamos a la parte final.

## Evaluación y Visualizacion de los resultados.
El modelo se evalúa utilizando datos de prueba, y se imprimen la pérdida y la precisión del modelo. Teniendo esto en cuenta, pasamos a la parte de resultados, donde se muestra la Curva de entrenamiento y validación de precisión y pérdida para entender el rendimiento del modelo durante el entrenamiento. LLegando asi al analisis de errores y predicciones.


## Predicciones y Analisis de Errores.

Aqui se toamen en cuenta las clases y las etiquetas que se guardaron anterioirmente, se toma una imgen en consideracion la cual se evalua y da la prediccion correcta del incidente.


# Conclusion.
Aun que esto no es muy preciso, se toma en cuenta todo, ya que, al momento de la evaliuacion y el dataset. Toma en cueta no solo el panorama, tambien toma en cuenta los colores, los cuales pueden alterar y predecir de una forma no tan correcta la cual peude fallar. Pero se toma en consideración.