var w = 500, h = 450
var jugador, fondo, bala

var verticalVol = false, verticalHor = false

var cursors, menu

var statusIzq, statusDer, statusTOP, statusBOT, statusMove
var nnNetwork,  nnEntrenamiento, nnSalida, datosEntrenamiento = []

var modoAuto = false, eCompleto = false

var jugadorenX = 200, jugadorenY = 200

var autoMode = false
var juego = new Phaser.Game(w, h, Phaser.CANVAS, '', {preload: preload, create: create, update: update, render: render})

function preload() {
  juego.load.image('fondo', 'assets/game/fondo.jpg')
  juego.load.spritesheet('mono', 'assets/sprites/altair.png', 32, 48)
  juego.load.image('menu', 'assets/game/menu.png')
  juego.load.image('bala', 'assets/sprites/purple_ball.png')
}

function create() {
  juego.physics.startSystem(Phaser.Physics.ARCADE)
  juego.physics.arcade.gravity.y = 0
  juego.time.desiredFps = 30

  fondo = juego.add.tileSprite(0, 0, w, h, 'fondo')
  jugador = juego.add.sprite(w / 2, h / 2, 'mono')

  juego.physics.enable(jugador)
  jugador.body.collideWorldBounds = true // Evitar que el jugador salga de los limites del mundo NO MOVER JONATAHN!!!
  var corre = jugador.animations.add('corre', [8, 9, 10, 11])
  jugador.animations.play('corre', 10, true)

  // Añadir la bala en la esquina superior derecha
  bala = juego.add.sprite(0, 0, 'bala')
  juego.physics.enable(bala)
  bala.body.collideWorldBounds = true
  bala.body.bounce.set(1) // Hacer que la bala rebote
  setRandomBalaVelocity() // Establecer una velocidad inicial aleatoria para la bala

  pausaL = juego.add.text(w - 100, 20, 'Pausa', {
    font: '20px Arial',
    fill: '#fff',
  })
  pausaL.inputEnabled = true
  pausaL.events.onInputUp.add(pausa, self)
  juego.input.onDown.add(mPausa, self)

  // Creación de teclas de dirección
  cursors = juego.input.keyboard.createCursorKeys()

  nnNetwork = new synaptic.Architect.Perceptron(5, 6, 6, 6, 5)
  nnEntrenamiento = new synaptic.Trainer(nnNetwork)
}

function redNeuronal() {
  nnEntrenamiento.train(datosEntrenamiento, {
    rate: 0.0003,
    iterations: 10000,
    shuffle: true,
  })
}

function vertical(param_entrada) {
  console.log('---------------DATOS-------------------')
  console.log( 'Datos de Entrada en Vertical:' +
      '\n Izquierdo:' + param_entrada[0] +
      '\n Derecha:' + param_entrada[1] +
      '\n Arriba:' + param_entrada[2] +
      '\n Abajo:' + param_entrada[3] )

  nnSalida = nnNetwork.activate(param_entrada)

  var Izquierda = Math.round(nnSalida[0] * 100),
    Derecha = Math.round(nnSalida[1] * 100)
  var Topv = Math.round(nnSalida[2] * 100),
    Bottom = Math.round(nnSalida[3] * 100)
  var distX = Math.round(nnSalida[4] * 100)

  if (param_entrada[2] < 80) {
    if (Topv > 35 && Topv < 65) {
      return false
    }
  }

  return nnSalida[2] >= nnSalida[3]
}

function horizontal(param_entrada) {
  console.log('---------------DATOS-------------------')
  console.log('Datos del metodo Horizontal:' +
        '\n Izquierdo:' + param_entrada[0] +
        '\n Derecha:' + param_entrada[1] +
        '\n Arriba:' + param_entrada[2] +
        '\n Abajo:' + param_entrada[3] )

  nnSalida = nnNetwork.activate(param_entrada)

  var Izquierda = Math.round(nnSalida[0] * 100), Derecha = Math.round(nnSalida[1] * 100)
  var Topv = Math.round(nnSalida[2] * 100), Bottom = Math.round(nnSalida[3] * 100)
  var distX = Math.round(nnSalida[4] * 100)

  if (param_entrada[2] < 80) {
    if (Derecha > 40 && Derecha < 55) {
      return false
    }
  }

  return nnSalida[0] >= nnSalida[1]
}

function movimiento(param_entrada) {
  console.log('---------------DATOS-------------------')
  console.log( 'Datos de Movimientos:' +
      '\n Izquierdo:' + param_entrada[0] +
      '\n Derecha:' + param_entrada[1] +
      '\n Arriba:' + param_entrada[2] +
      '\n Abajo:' + param_entrada[3] )

  nnSalida = nnNetwork.activate(param_entrada)

  var Izquierda = Math.round(nnSalida[0] * 100), Derecha = Math.round(nnSalida[1] * 100)
  var Topv = Math.round(nnSalida[2] * 100), Bottom = Math.round(nnSalida[3] * 100)
  var distX = Math.round(nnSalida[4] * 100)

  if (param_entrada[2] < 80) {
    if (Derecha > 40 && Derecha < 55) {
      return false
    }
  }

  return nnSalida[4] * 100 >= 20
}
function pausa() {
  juego.paused = true // Pausar el juego
  menu = juego.add.sprite(w / 2, h / 2, 'menu') // Añadir menú de pausa
  menu.anchor.setTo(0.5, 0.5)
}

function mPausa(event) {
  if (juego.paused) {
    var menu_x1 = w / 2 - 270 / 2,
      menu_x2 = w / 2 + 270 / 2,
      menu_y1 = h / 2 - 180 / 2,
      menu_y2 = h / 2 + 180 / 2

    var mouse_x = event.x,
      mouse_y = event.y

    if (
      mouse_x > menu_x1 &&
      mouse_x < menu_x2 &&
      mouse_y > menu_y1 &&
      mouse_y < menu_y2
    ) {
      if (
        mouse_x >= menu_x1 &&
        mouse_x <= menu_x2 &&
        mouse_y >= menu_y1 &&
        mouse_y <= menu_y1 + 90
      ) {
        eCompleto = false
        datosEntrenamiento = []
        modoAuto = false // Modo manual
        autoMode = false
      } else if (
        mouse_x >= menu_x1 &&
        mouse_x <= menu_x2 &&
        mouse_y >= menu_y1 + 90 &&
        mouse_y <= menu_y2
      ) {
        if (!eCompleto) {
          console.log('--------------- Datos de Entrenamiento --------------- \n'+
            'Total de datos que se usan para el entranamiento son: ' + datosEntrenamiento.length + ' valores',
          )
          redNeuronal()
          eCompleto = true
        }
        modoAuto = true // Modo automático
        autoMode = true
      }
      menu.destroy()
      resetGame() // Resetear el juego
      juego.paused = false
    }
  }
}

function resetGame() {
  // Resetear la posición y velocidad del jugador
  jugador.x = w / 2
  jugador.y = h / 2
  jugador.body.velocity.x = 0
  jugador.body.velocity.y = 0

  // Resetear la posición y velocidad de la bala
  bala.x = 0
  bala.y = 0
  setRandomBalaVelocity() // Establecer una velocidad inicial aleatoria para la bala
}

function setRandomBalaVelocity() {
  var speed = 550
  var angle = juego.rnd.angle() // Obtener un ángulo aleatorio
  bala.body.velocity.set(Math.cos(angle) * speed, Math.sin(angle) * speed)
}

function update() {
  fondo.tilePosition.x -= 1 // Mover el fondo para crear efecto de desplazamiento

  if (!autoMode) {
    // Resetear velocidad del jugador
    jugador.body.velocity.x = 0
    jugador.body.velocity.y = 0

    // Movimiento del jugador con teclas de dirección
    if (cursors.left.isDown) {
      jugador.body.velocity.x = -300 // Mover a la izquierda
    } else if (cursors.right.isDown) {
      jugador.body.velocity.x = 300 // Mover a la derecha
    }

    if (cursors.up.isDown) {
      jugador.body.velocity.y = -300 // Mover hacia arriba
    } else if (cursors.down.isDown) {
      jugador.body.velocity.y = 300 // Mover hacia abajo
    }
  }

  // Colisionar la bala con el jugador
  juego.physics.arcade.collide(bala, jugador, colisionH, null, this)

  // Calcular la distancia entre la bala y el jugador
  var dx = bala.x - jugador.x
  var dy = bala.y - jugador.y
  var distancia = Math.sqrt(dx * dx + dy * dy) // Fórmula de distancia euclidiana, verifica las coordenadas x,y

  ;(statusIzq = 0),
    (statusDer = 0),
    (statusTOP = 0),
    (statusBOT = 0),
    (statusMove = 0)

  if (!autoMode) {
    // Si la bala está a la derecha, moverse a la izquierda, y viceversa
    if (dx > 0) {
      statusIzq = 1
      statusMove = 1
    } else {
      statusDer = 1 // Mover a la derecha
    }

    // Si la bala está abajo, moverse hacia arriba, y viceversa
    if (dy > 0) {
      statusTOP = 1 // Mover hacia arriba
    } else {
      statusBOT = 1 // Mover hacia abajo
    }

    if (jugador.body.velocity.x != 0 || jugador.body.velocity.y != 0) {
      statusMove = 1
    } else {
      statusMove = 0
    }
  }

  if (autoMode && movimiento([dx, dy, distancia, jugadorenX, jugadorenY])) {
    if (distancia <= 150) {
      console.log( 'RETURN DEL METODO VERTICAL: ' + vertical([dx, dy, distancia, jugadorenX, jugadorenY]) +
          '\nRETURN DEL METODO HORIZONTAL: ' + horizontal([dx, dy, distancia, jugadorenX, jugadorenY]))

      if (
        vertical([dx, dy, distancia, jugadorenX, jugadorenY]) &&
        !verticalVol
      ) {
        // Mover hacia arriba si vertical es true
        jugador.body.velocity.y -= 35
      } else if (
        !vertical([dx, dy, distancia, jugadorenX, jugadorenY]) &&
        !verticalVol &&
        distancia <= 95
      ) {
        // Mover hacia abajo si vertical es false
        jugador.body.velocity.y += 35
      }

      if (
        horizontal([dx, dy, distancia, jugadorenX, jugadorenY]) &&
        !verticalHor
      ) {
        // Mover hacia arriba si horizontal es true
        jugador.body.velocity.x -= 35
      } else if (
        !horizontal([dx, dy, distancia, jugadorenX, jugadorenY]) &&
        !verticalHor &&
        distancia <= 95
      ) {
        // Mover hacia abajo si horizontal es false
        jugador.body.velocity.x += 35
      }

      // Ajustar la velocidad para que vuelva lentamente al centro si no está en movimiento
      if (jugador.x > 300) {
        jugador.body.velocity.x = -350 // Mover lentamente hacia arriba
        verticalHor = true
      } else if (jugador.x < 100) {
        jugador.body.velocity.x = 350 // Mover lentamente hacia abajo
        verticalHor = true
      } else if (verticalHor && jugador.x > 150 && jugador.x < 250) {
        jugador.body.velocity.x = 0
        verticalHor = false
      } else if (
        horizontal([dx, dy, distancia, jugadorenX, jugadorenY]) &&
        jugador.body.velocity.x != 0
      ) {
        verticalHor = false
        verticalVol = false
      }

      // Ajustar la velocidad para que vuelva lentamente al centro si no está en movimiento
      if (jugador.y > 300) {
        jugador.body.velocity.y = -350 // Mover lentamente hacia arriba
        verticalVol = true
      } else if (jugador.y < 100) {
        jugador.body.velocity.y = 350 // Mover lentamente hacia abajo
        verticalVol = true
      } else if (verticalVol && jugador.y > 150 && jugador.y < 250) {
        jugador.body.velocity.y = 0
        verticalVol = false
      } else if (
        vertical([dx, dy, distancia, jugadorenX, jugadorenY]) &&
        jugador.body.velocity.y != 0
      ) {
        verticalHor = false
        verticalVol = false
        verticalHor = false
        verticalVol = false
      }
    } else if (distancia >= 200) {
      jugador.body.velocity.y = 0
      jugador.body.velocity.x = 0
    }
  }

  if (modoAuto == false && bala.position.x > 0) {
    jugadorenX = jugador.x
    jugadorenY = jugador.y

    datosEntrenamiento.push({
      input: [dx, dy, distancia, jugadorenX, jugadorenY],
      output: [statusIzq, statusDer, statusTOP, statusBOT, statusMove],
    })

    console.log(
      '-------------- DATOS RECIBIDOS --------------\n' +
        'Distancia en el eje X: ',
      dx + '\n' + 'Distancia en el eje Y: ',
      dy + '\n' + 'Distancia: ',
      distancia + '\n' + 'Distancia del jugador en X: ',
      jugador.x + '\n' + 'Distancia del jugador en Y: ',
      jugador.y + '\n' + 'Bala en el eje X: ',
      bala.x + '\n' + 'Bala en el eje Y: ',
      bala.y + '\n\n',
    )

    console.log(
      '-------------- DATOS DE MOVIMIENTO --------------\n' +
        'Movimiento en Izquierda: ',statusIzq + '\n' 
        + 'Movimiento en Derecha: ', statusDer + '\n' 
        + 'Movimiento hacia Arriba: ',statusTOP + '\n' 
        + 'Movimiento hacia Abajo: ', statusBOT + '\n')
  }
}

function colisionH() {
  autoMode = true // Activar el modo automático tras la colisión
  pausa() // Pausar el juego en caso de colisión
}

function render() {
  // Opcionalmente, renderizar el estado del juego o información adicional
}