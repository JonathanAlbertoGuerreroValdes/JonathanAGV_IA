# REPORTE DE LAS EMOCIONES

En este proyecto generamos un dataset en la cual se tomAron en cuenta los siguientes desastres:

__1. Tristeza__

__2. Enojo__

__3. Sorpresa__


En los cuales se crearon carpetas con ciertas cantidades de imagenes, para que el modelo aprendiera de la mejor manera, considerando el codigo que tenemos en el archivo _Rostros-Emociones.ipynb_. En pocas palabras, este informe detalla la implementación y funcionamiento del dataset generado, con los archivos de __haarcascade_frontalface_alt.xml__ para crear nuestro .xml del aprendizaje y asi detectar con el nuevo .xml que se genero y el ya mencionado, cada uno de las emociones que se menciono.

## Importación de Librerías

Se importan librerías esenciales para el procesamiento de datos, manipulación de imágenes y construcción de la CNN.

## Carga del Conjunto de Imágenes

Las imágenes se cargan desde un directorio especificado. Solo se consideran archivos con extensiones comunes de imágenes. Asi tomandolas en cuenta para crear el cml, de emociones. Una vez teniendo esto en cuenta. Cargamos y porbamos el dataset, junto con los xml, para que asi, cargue el aprendizaje y arroje adecuadamente la emocion de la persona.

# Conclusion.
Aun que esto no es muy preciso, se toma en cuenta todo, ya que, al momento de estar capturando un rostro, puede ser neutro y si la persona hace ciertas muecas o caras, el xml, las cuenta y arroja la emocion que detecte esas facciones. Por lo que es necesario alimentarlo bien y hacer las expresiones adecuadas al momento de probarlo.