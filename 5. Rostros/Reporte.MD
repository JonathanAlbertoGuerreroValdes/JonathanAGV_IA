# Detección de Rostros

## Descripción del Código

Este script en Python utiliza OpenCV para entrenar y aplicar un modelo de reconocimiento facial basado en el algoritmo LBPH (Local Binary Patterns Histograms). El código se divide en dos partes: entrenamiento del modelo y reconocimiento en tiempo real.

## Entrenamiento del Modelo

1. **Carga del Conjunto de Datos**:
    ```python
    dataSet = 'D:\\Escuela Betin\\9no Sem\\3. Inteligencia Artificial\\Rostros\\Persones'
    faces = os.listdir(dataSet)
    ```

2. **Preparación de Datos**:
    ```python
    labels = []
    facesData = []
    label = 0

    for face in faces:
        facePath = dataSet + '\\' + face
        for faceName in os.listdir(facePath):
            labels.append(label)
            facesData.append(cv.imread(facePath + '\\' + faceName, 0))
        label += 1
    ```

3. **Creación y Entrenamiento del Reconocedor Facial**:
    ```python
    faceRecognizer = cv.face.LBPHFaceRecognizer_create()
    faceRecognizer.train(facesData, np.array(labels))
    faceRecognizer.write('D:\\Escuela Betin\\9no Sem\\3. Inteligencia Artificial\\Rostros\\LBPHPersonesFix.xml')
    ```

## Reconocimiento en Tiempo Real

1. **Carga del Modelo Entrenado**:
    ```python
    faceRecognizer = cv.face.LBPHFaceRecognizer_create()
    faceRecognizer.read('D:\\Escuela Betin\\9no Sem\\3. Inteligencia Artificial\\Rostros\\LBPHPersonesFix.xml')
    ```

2. **Captura de Video y Detección de Rostros**:
    ```python
    cap = cv.VideoCapture(0)
    rostro = cv.CascadeClassifier('D:\\Escuela Betin\\9no Sem\\3. Inteligencia Artificial\\Material de clase\\haarcascade_frontalface_alt.xml')
    ```

3. **Procesamiento de Cada Fotograma**:
    ```python
    while True:
        ret, frame = cap.read()
        if ret == False:
            break
        gray = cv.cvtColor(frame, cv.COLOR_BGR2GRAY)
        rostros = rostro.detectMultiScale(gray, 1.3, 3)
        for (x, y, w, h) in rostros:
            frame2 = cv.resize(gray[y:y+h, x:x+w], (100, 100), interpolation=cv.INTER_CUBIC)
            result = faceRecognizer.predict(frame2)
            if result[1] < 100:
                cv.putText(frame, '{}'.format(faces[result[0]]), (x, y-25), 2, 1.1, (0, 255, 0), 1, cv.LINE_AA)
                cv.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)
            else:
                cv.putText(frame, 'Desconocido', (x, y-20), 2, 0.8, (0, 0, 255), 1, cv.LINE_AA)
                cv.rectangle(frame, (x, y), (x+w, y+h), (0, 0, 255), 2)
        cv.imshow('frame', frame)
        if cv.waitKey(1) == 27:
            break
    cap.release()
    cv.destroyAllWindows()
    ```

## Conclusión

Este código es similar al de Emociones, se hacen igual, con la unica diferencia que en este se esta estableciendo una persona, y solo deben de haber imagenes de esa persona, para no ocacionar conflictos, a comparación del de Emociones que puedes generalizar la emocion con varias personas, para que detecte a la persona que sea.
