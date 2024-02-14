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

**Secuencia de Percepción y Medida de rendimiento**

Cada caja tiene el numero de esos 100 prisioneros, cada prisionero tiene 50 oportunidades para sacar su numero, en caso de que uno no encuentre su numero **lo fusilan a el y a todos**, y si todos los encontraron todos **sobreviven**

1. Cada prisionero debe abrir primero la caja con su propio número.
2. Si encuentra su número, bien. Si no, entonces procede al paso 
3. Una vez que un prisionero no encuentra su número en su caja designada, debe elegir una caja al azar de entre las cajas restantes.
4. El prisionero debe repetir este proceso hasta que encuentre su número o hasta que haya abierto todas las cajas.

**La estrategia**

Si planteamos lo siguiente:

| Caja 1 | Caja 2 | Caja 3 | Caja 4 | Caja 5 | Caja 6 | Caja 7 | Caja 8 | Caja 9 | Caja 10 |
|-------|--------|--------|--------|--------|--------|--------|-------|--------|---------|
| 7   | 2  | 8  | 5 | 1 | 6 |10 | 9| 3|  4|

Si el prisionero uno abre la primera caja se encuentra con el numero 7, el cual no es su número, por lo que se pasa a la casilla/caja 7 y encuentra el 10, asi sigue con la caja del numero de la camiseta, hasta encontrar su número y asi cada uno de los prisioneros hasta encontrar su número.

Teniendo esto en cuenta, planteamos lo siguiente:
1. Hay 100 cajas para 100 prisioneros y cada uno de ellos tiene 50 oportunidades.
Por lo que tomaremos N=50 seria **2N**
2. Si cada preso empieza con su numero de caja, no habria problema.

Ya que hay una **permutación** por lo que, si no se cumple la regla 2, puede fallar. Y tomando este ejemplo puede funionar.
 Teniendo esto en cuenta la probabilidad de que salga esto es de la siguiente forma:
 
**Pn ≈ 1 - (ln(2N) -ln(N)) = 1- ln(2) = 0.30685**
