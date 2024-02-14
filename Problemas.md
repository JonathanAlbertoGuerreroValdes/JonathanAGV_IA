# Intrucciones

Dar la secuencia de percepción y la medida de rendimiento de los ejercicios de:

* Problema de Flavio Josefo
* 100 prisioneros, cada caja tiene el numero de esos 100 prisioneros, cada prisionero tiene 50 oportunidades para sacar su numero, en caso de que uno no encuentre su numero, lo fusilan y si todos los encontraron 


## Problema Flavio Josefo

**Secuencia de Percepción y Medida de rendimiento**

En eset caso hay que averiguar en que posición deberia quedar Flavio Josefo, para que sea "Victorioso", en este caso depende mucho de la cantidad de personas que vayan a entrar al juego, en este caso, si estamos hablando de un circulo de 5 personas.

Si colocamos a Josefo en la posicion **3**, el numero **1** mata al **2**, el **3** al 4 y ahora el **5** al **1**, quedando asi el número **3** y **5**, es decir, de la sigueinte forma:

**BASE PRINCIPAL**

1 2 3 4 5

_Primera Vuelta_

1 **2** 3 **4** 5 => 1 3 5

_Segunda Vuelta_

**1** 3 5 => 3 5 

_Ultima Vuelta_

3 **5** => 3 queda vivo


Nuestra formula para resolver este ejercicio es la siguiente: **n = 2m + k** consiste en tratar de reducirlo al caso anterior. Para ello eliminaremos los elementos k elementos que ocupan los lugares pares: 2, 4,…, 2k y nos quedarán 2m  elementos. Es decir, cuando hayamos eliminado k elementos estaremos ante el primer individuo de un nuevo círculo de 2m elementos. Ese individuo ocuparía la posición 2k +1 en el círculo inicial. Y ese será el puesto que debe ocupar un individuo para _**salvarse**_.



## Problema 100 prisioneros

