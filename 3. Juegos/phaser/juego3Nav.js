var w=800, h=400;
var jugador, fondo;

var bala, balaD=false, nave; // bala de la nabe original
var bala2, balaD2=false, nave2; // bala de la nave arriba del mono
var bala3, balaD3=false, nave3; // bala de la nave en diagonal en pausa

var jumpJugador, moveRigth, moveBack, regreRight, regreBack; //declaracion de los movimiento que realiza el muñeco

var menu, balas;

// declaracion de las variables para los disparos y velocidades de las balas
var veloB1, despBala;
var veloB2, despBala2;
var veloB3X, veloB3Y, despBala3x, despBala3y;
var timeB3, timeB2; //tiempos de las balas
var despDerTiempo, despAtrTiempo; // tiempos

var statusAire, statusSuelo, monoPierde; //estados del mono, tecnicamente el porcentaje que pasa en cada uno de los elementos y si perdio

//datos para el entrenamiento
var nnNetwork , nnEntrenamiento, nnSalida, datosEntrenamiento=[];
var modoAuto = false, eCompleto=false;

// los estados de los movimientos
var statusRigth, statusLeft, statusBack, statusStart; 


var juego = new Phaser.Game(w, h, Phaser.CANVAS, '', { preload: preload, create: create, update: update, render:render});

function preload() {
    juego.load.image('fondo', 'assets/game/fondoEspacio.png');
    juego.load.spritesheet('mono', 'assets/sprites/altair.png',32 ,48);
    juego.load.image('nave', 'assets/game/ufo.png');
    juego.load.image('bala', 'assets/sprites/purple_ball.png');
    juego.load.image('menu', 'assets/game/menu.png');

}



function create() {
    juego.physics.startSystem(Phaser.Physics.ARCADE);
    juego.physics.arcade.gravity.y = 800;
    juego.time.desiredFps = 30;

    fondo = juego.add.tileSprite(0, 0, w, h, 'fondo');

    nave = juego.add.sprite(w-100, h-70, 'nave'); //nave original
    bala = juego.add.sprite(w-100, h, 'bala');

    jugador = juego.add.sprite(50, h, 'mono');
    
    nave2 = juego.add.sprite(20, 10, 'nave'); // nave arriba del mono
    bala2 = juego.add.sprite(60, 70, 'bala');

    nave3 = juego.add.sprite(w-100, 10, 'nave');// nave diagonal en pausa
    bala3 = juego.add.sprite(w-100, 10, 'bala');
    

    juego.physics.enable(jugador);
    jugador.body.collideWorldBounds = true;
    var corre = jugador.animations.add('corre',[8,9,10,11]);
    jugador.animations.play('corre', 10, true);

    juego.physics.enable(bala);
    bala.body.collideWorldBounds = true;
    
    juego.physics.enable(bala2);
    bala2.body.collideWorldBounds = true;
    juego.physics.enable(bala3);
    bala3.body.collideWorldBounds = true;
    

    pausaL = juego.add.text(w - 100, 20, 'Pausa', { font: '20px Arial', fill: '#fff' });
    pausaL.inputEnabled = true;
    pausaL.events.onInputUp.add(pausa, self);
    juego.input.onDown.add(mPausa, self);

    
    jumpJugador = juego.input.keyboard.addKeys({
        'space': Phaser.Keyboard.SPACEBAR,
        'up': Phaser.Keyboard.UP
    });

    //Red de entrenamiento NO MOVER, es la ultima prueba (Esta bien)
    nnNetwork =  new synaptic.Architect.Perceptron(5,12, 6);
    nnEntrenamiento = new synaptic.Trainer(nnNetwork);

    //movimientos
    moveRigth = juego.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    moveBack = juego.input.keyboard.addKey(Phaser.Keyboard.LEFT);

    //Estados de movimiento, inicializacion
    statusRigth = 0, statusLeft = 1;
    statusStart = 1, statusBack = 0;

    //inicializacion de los tiempos 
    timeB3 = 0, timeB2 = 0;
    despDerTiempo = 0, despAtrTiempo = 0;

    balas = juego.add.group();
    balas.add(bala);
    balas.add(bala2);
    balas.add(bala3);

    monoPierde = false, regreRight = false, regreBack = false;
}

//DISPARO DE LADO
function shoot1(){
    veloB1 =  -1 * velocidadRandom(150,400); //Formula de fisica que es estadnar y no se puede mofidicar, ayuda a la velocidad de la bala
    bala.body.velocity.y = 0 ;
    bala.body.velocity.x = veloB1 ;
    balaD=true;
}

//DISPARO ARRIBA
function shoot2(){
    veloB2 =  1 * velocidadRandom(100, 50);
    bala2.position.x = 60;
    bala2.position.y = 70;
    bala2.body.velocity.x = 0;
    bala2.body.velocity.y = veloB2;
    balaD2=true;
    bala2.visible = true;
}

//DISPARO DIAGONAL
function shoot3(){
    var targetX = 60, targetY = h;

    var dx = targetX - bala3.x, dy = targetY - bala3.y;

    var angle = Math.atan2(dy, dx);

    bala3.visible = true;
    veloB3Y = 1 * velocidadRandom(200,50);
    veloB3X = -700;
    bala3.position.x = 700;
    bala3.position.y = 50;
    bala3.body.velocity.x = veloB3X;
    bala3.body.velocity.y = Math.sin(angle) * veloB3Y;
    balaD3=true;
}

// MOVIMIENTO DALTAR
function saltar(){
    jugador.body.velocity.y = -270;
}

//MOVIMIENTO DERECHA
function movingtoRigth(){
    statusLeft = 0, statusRigth = 1;
    jugador.position.x = 90;
    
    statusBack = 0, statusStart = 1;

    despAtrTiempo = 0, despDerTiempo = 0;

    regreBack = false, regreRight = false;
}

// MOVIMIENTO HACIA ATRAS
function movingtoBack(){
    statusLeft = 1, statusRigth = 0;
    jugador.position.x = 0;

    statusBack = 1, statusStart = 0;

    despAtrTiempo = 0, despDerTiempo = 0;

    regreBack = false, regreRight = false;
}



function redNeuronal(){
    nnEntrenamiento.train(datosEntrenamiento, {rate: 0.0003, iterations: 10000, shuffle: true});// manejo de las interacciones a la red
}

//DATOS DEL ENTRENAMIENTO DE LA BALA DE LADO
function entranamientoB1(param_entrada){
    console.log("--------- DATOS B1 ---------");
    console.log("Entradas: "
                +"\nDatos en el aire: "+param_entrada[0]
                +"\nDatos en el suelo: "+param_entrada[1]
                +"\nDatos derecha: "+param_entrada[2]
                +"\nDatos izquierda"+param_entrada[3]
                +"\nDatos de regreso"+param_entrada[4]);

    nnSalida = nnNetwork.activate(param_entrada);

    var aire=Math.round( nnSalida[0]*100 ), piso=Math.round( nnSalida[1]*100 );
    var rigth=Math.round( nnSalida[2]*100 ), left=Math.round( nnSalida[3]*100 );
    var back=Math.round( nnSalida[4]*100 ), start=Math.round( nnSalida[5]*100 );

    console.log("------------ PORCENTAJES B1 ------------")
    console.log("Valores en porcentajes: "+
                "\nAire: "+ aire + "%"+
                "\nSuelo: " + piso + "%"+
                "\nDerecha: " + rigth + "%"+
                "\nIzquierda: " + left + "%"+
                "\nAtras: " + back + "%"+ 
                "\nInicio: " + start+ "%" );

    return nnSalida[0]>=nnSalida[1];
}

//DATOS DEL ENTRENAMIENTO DE LA BALA ARRIBA
function entranamientoB2(param_entrada){
    console.log("--------- DATOS B2 ---------");
    console.log("Entradas: "
                +"\nDatos en el aire: "+param_entrada[0]
                +"\nDatos en el suelo: "+param_entrada[1]
                +"\nDatos derecha: "+param_entrada[2]
                +"\nDatos izquierda"+param_entrada[3]
                +"\nDatos de regreso"+param_entrada[4]);

    nnSalida = nnNetwork.activate(param_entrada);

    var aire=Math.round( nnSalida[0]*100 ), piso=Math.round( nnSalida[1]*100 );
    var rigth=Math.round( nnSalida[2]*100 ), left=Math.round( nnSalida[3]*100 );
    var back=Math.round( nnSalida[4]*100 ), start=Math.round( nnSalida[5]*100 );

    console.log("------------ PORCENTAJES B2 ------------")
    console.log("Valores en porcentajes: "+
                "\nAire: "+ aire + "%"+
                "\nSuelo: " + piso + "%"+
                "\nDerecha: " + rigth + "%"+
                "\nIzquierda: " + left + "%"+
                "\nAtras: " + back + "%"+ 
                "\nInicio: " + start+ "%" );

    return nnSalida[2]>=nnSalida[3];
}

//DATOS DEL ENTRENAMIENTO DE LA BALA DIAGONAL
function entranamientoB3(param_entrada){
    console.log("--------- DATOS B3 ---------");
    console.log("Entradas: "
                +"\nDatos en el aire: "+param_entrada[0]
                +"\nDatos en el suelo: "+param_entrada[1]
                +"\nDatos derecha: "+param_entrada[2]
                +"\nDatos izquierda"+param_entrada[3]
                +"\nDatos de regreso"+param_entrada[4]);

    nnSalida = nnNetwork.activate(param_entrada);

    var aire=Math.round( nnSalida[0]*100 ), piso=Math.round( nnSalida[1]*100 );
    var rigth=Math.round( nnSalida[2]*100 ), left=Math.round( nnSalida[3]*100 );
    var back=Math.round( nnSalida[4]*100 ), start=Math.round( nnSalida[5]*100 );
    
    console.log("------------ PORCENTAJES B3 ------------")
    console.log("Valores en porcentajes: "+
                "\nAire: "+ aire + "%"+
                "\nSuelo: " + piso + "%"+
                "\nDerecha: " + rigth + "%"+
                "\nIzquierda: " + left + "%"+
                "\nAtras: " + back + "%"+ 
                "\nInicio: " + start+ "%" );
    
    return nnSalida[4]>=nnSalida[5];
}


//PAUSA DEL JUEGO
function pausa(){
    juego.paused = true;
    menu = juego.add.sprite(w/2,h/2, 'menu');
    menu.anchor.setTo(0.5, 0.5);
}

//PAUSA DEL JUEGO EN AUTO
function mPausa(event){
    if(juego.paused){
        var menu_x1 = w/2 - 270/2, menu_x2 = w/2 + 270/2,
            menu_y1 = h/2 - 180/2, menu_y2 = h/2 + 180/2;

        var mouse_x = event.x  ,
            mouse_y = event.y  ;

        if(mouse_x > menu_x1 && mouse_x < menu_x2 && mouse_y > menu_y1 && mouse_y < menu_y2 ){
            if(mouse_x >=menu_x1 && mouse_x <=menu_x2 && mouse_y >=menu_y1 && mouse_y <=menu_y1+90){
                eCompleto=false;
                datosEntrenamiento = [];
                modoAuto = false;
            }else if (mouse_x >=menu_x1 && mouse_x <=menu_x2 && mouse_y >=menu_y1+90 && mouse_y <=menu_y2) {
                if(!eCompleto) {
                    console.log("-------- DATOS DE ENTRENAMIENTO -------- \n",
                    "Datos obtenidos para el entrenamiento:  "+ datosEntrenamiento.length +" valores" );
                    redNeuronal();
                    eCompleto=true;
                }
                modoAuto = true;
            }

            menu.destroy();
            resetVariables();
            balas.forEach(function(bala) {
                bala.body.checkCollision.none = false;
            });
            juego.paused = false;
            monoPierde = false;

            balaD2=false;
            balaD3=false;
        }
    }
}

// RESETAR LAS VARIABLES 
function resetVariables(){
    jugador.body.velocity.x=0, jugador.body.velocity.y=0;
    bala.body.velocity.x = 0, bala.position.x = w-100;
    jugador.position.x=50;
    balaD=false;
    
    bala2.body.velocity.y = 0, bala2.position.y = 70;
    balaD2=false;

    bala3.body.velocity.y = 0, bala3.body.velocity.x = 0;
    bala3.position.x = 600, bala3.position.y = 100;
    balaD3=false;

    statusRigth = 0, statusLeft = 1;
    despDerTiempo = 0;

    monoPierde = false, regreRight = false;

    statusStart = 1, statusBack = 0;
    despAtrTiempo = 0;

    regreBack = false;

    timeB3 = 0, timeB2 = 0;
}



function update() {
    fondo.tilePosition.x -= 1; 

    juego.physics.arcade.collide(balas, jugador, colisionH, null, this);

    statusSuelo = 1;
    statusAire = 0;

    if(!jugador.body.onFloor()) {
        statusSuelo = 0;
        statusAire = 1;
    }
	
    despBala = Math.floor( jugador.position.x - bala.position.x );
    
    despBala2 = Math.floor( jugador.position.y - bala2.position.y );

    despBala3x = Math.floor( jugador.position.x - bala3.position.x );
    despBala3y = Math.floor( jugador.position.y - bala3.position.y );

    if(modoAuto==false && moveRigth.isDown && statusRigth==0){
        movingtoRigth();
    }

    if ((despDerTiempo>=12) && (regreRight == false) && (statusRigth==1)) {
        jugador.position.x = 90;
        regreRight = true;
    }

    if(regreRight==true && statusRigth==1){
        jugador.position.x = Phaser.Math.linear(jugador.position.x, 50, 0.7);
    }

    if ((Math.abs(jugador.position.x - 50) < 1) && (regreRight == true) && (statusRigth==1)){
        jugador.position.x = 50;
        
        regreRight = false;
        statusRigth = 0, statusLeft = 1, despDerTiempo = 0;

        regreBack = false;
        statusBack = 0, statusStart = 1, despAtrTiempo = 0;
    }

    if(statusRigth==1 && regreRight == false){
        despDerTiempo++;
    }

    if(statusBack==1 && regreBack == false){
        despAtrTiempo++;
    }

    if(modoAuto==false && moveBack.isDown && statusBack==0){
        movingtoBack();
    }

    if ((despAtrTiempo>=12) && (regreBack == false) && (statusBack==1)) {
        jugador.position.x = 0;
        regreBack = true;
    }

    if(regreBack==true && statusBack==1){
        jugador.position.x = Phaser.Math.linear(jugador.position.x, 50, 0.7);
    }

    if ((Math.abs(jugador.position.x - 50) < 1) && (regreBack == true) && (statusBack==1)){
        jugador.position.x = 50;
        
        regreRight = false;
        statusRigth = 0, statusLeft = 1;

        despDerTiempo = 0;

        regreBack = false;
        statusBack = 0, statusStart = 1;

        despAtrTiempo = 0;
    }

    if( modoAuto == true  && bala2.position.y>250 && (statusRigth==0)) {

        if( entranamientoB2( [despBala , veloB1, despBala2 , despBala3x, despBala3y] )  ){
            movingtoRigth();
        }
    }

    if( modoAuto == true  && (bala3.position.y>200 || bala3.position.x<400) && (statusBack==0)) {

        if( entranamientoB3( [despBala , veloB1, despBala2 , despBala3x, despBala3y] )  ){
            movingtoBack();
        }
    }

    if( modoAuto==false && (jumpJugador.space.isDown || jumpJugador.up.isDown) &&  jugador.body.onFloor() ){
        saltar();
    }
    
    if( modoAuto == true  && bala.position.x>0 && jugador.body.onFloor()) {

        if( entranamientoB1( [despBala , veloB1, despBala2 , despBala3x, despBala3y] )  ){
            saltar();
        }
    }

    if( balaD==false ){
        shoot1();
    }
    if( balaD2==false && timeB2 >= 20){
        shoot2();
    }
    if( balaD3==false && timeB3 >= 45){
        shoot3();
    }

    if( balaD3==false ){
        bala3.position.x = 780;
        bala3.position.y = 380;
        bala3.body.velocity.y = 0;
        bala3.body.velocity.x = 0;
        bala3.visible = true;
        timeB3++;
    }

    if( balaD2==false ){
        bala2.body.velocity.y = 0;
        bala2.body.velocity.x = 0;
        bala2.position.x = 780;
        bala2.position.y = 380;
        bala2.visible = true;
        timeB2++;
    }

    if( bala.position.x <= 0  ){
        bala.body.velocity.x = 0;
        bala.position.x = w-100;
        balaD=false;
    }

    if( bala2.position.y >= 310 && bala2.position.x <= 70 && balaD2==true ){
        bala2.position.x = 750;
        bala2.position.y = 350;
        bala2.body.velocity.y = 0;
        bala2.body.velocity.x = 0;
        balaD2=false;
        timeB2=0;
        bala2.visible = true;
    }

    if( bala3.position.y >= 380 && bala3.position.x <= 70 && balaD3==true ){
        bala3.body.velocity.y = 0;
        bala3.body.velocity.x = 0;
        bala3.position.x = 600;
        bala3.position.y = 100;
        balaD3=false;
        timeB3=0;
        bala3.visible = true;
    }

    
    if( modoAuto ==false  && bala.position.x > 0 ){

        datosEntrenamiento.push({
                'input' :  [despBala , veloB1, despBala2 , despBala3x, despBala3y],
                'output':  [statusAire , statusSuelo , statusRigth , statusLeft , statusBack , statusStart ]
        });

        console.log("---------- Velocidad de las balas ----------");
        console.log("\nVelocidad de las balas"+
                    "\nVelocidad de la bala 1 en x:"+veloB1+
                    "\nVelocidad de la bala 2 en y:"+veloB2+
                    "\nVelocidad de la bala 3 en x:"+veloB3X+
                    "\nVelocidad de la bala 3 en x:"+veloB3Y
        );

        console.log("---------- Desplazamientos de las balas ----------");
        console.log("\nDesplazamiento de las balas"+
                    "\nDesplazamiento de la bala 1 en x:"+despBala+
                    "\nDesplazamiento de la bala 2 en y:"+despBala2+
                    "\nDesplazamiento de la bala 3 en x:"+despBala3x+
                    "\nDesplazamiento de la bala 3 en x:"+despBala3y
        );

        console.log("---------- Estatus ----------");
        console.log("\nEstatus Aire: "+statusAire+
                    "\nEstatus Derecha: "+statusRigth+
                    "\nEstatus Atras: "+statusBack
        );
        
   }

}

function colisionH(){
    if (!monoPierde) {
        balas.forEach(function(bala) {
            bala.body.checkCollision.none = true;
        });
        pausa();
        monoPierde = true;
    }
}

function velocidadRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function render(){

}
