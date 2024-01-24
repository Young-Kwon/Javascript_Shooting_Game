// Young Sang Kwon 000847777 Assignment5 Shooting Game

const svgNS = "http://www.w3.org/2000/svg";
const boardsizeX = 800; // board size
const boardsizeY = 500; // board size

let tx = 0; // target ellipse cx value
let ty = 0; // target ellipse cy value
let rx = 0; // target ellipse rx value
let ry = 0; // target ellipse ry value
let bx = 0; // bullet cx value
let by = 0; // bullet cy value

let targetSpeed = 0; // target moving speed
let bulletSpeed = 0; // bullet moving speed

let myTimer1 = null; // target timer
let myTimer2 = null; // bullet timer

let recordTarget = 0; // save target x posion value
let recordBullet = 0; // save bullet x posion value

let currentScore = 0; // current shooting score
let totalScore = 0; // total shooting score

let count = 0; // count shooting chance

// Remove all Child Nodes from an Svg element	
function clearAll() {
    let svg = document.getElementById("board");	
    while(svg.childNodes.length > 0)
        svg.removeChild(svg.firstChild);
    currentScore = 0; // initialize current score value
    TotalScore = 0; // initialize total score value
    count = 0; // initialize count value
    document.getElementById("curScore").innerHTML = "Hit the moving target!";
    document.getElementById("totalScore").innerHTML = " click Shoot button.";
    document.getElementById("remainCount").innerHTML = " (Centet: 10point, middel: 7point, Edge: 4pint)";
    document.getElementById("gameOver").innerHTML = "";
}

// program start	
window.addEventListener("load", function() {   
    document.getElementById("hard").addEventListener("click", hardLevelTarget); // select Hard level game
    document.getElementById("medium").addEventListener("click", mediumLevelTarget); // select medium level game
    document.getElementById("easy").addEventListener("click", easyLevelTarget); // select easy level game
    
    // Hard level game(Target size(rx) is smaller and target moving speed(targetSpeed) is faster)
    function hardLevelTarget() {
        let target = document.createElementNS( svgNS, "ellipse" )                
        let radius = 20;
        target.setAttribute("r", radius);
        tx = radius;
        target.setAttribute("cx", tx);
        ty = radius;
        target.setAttribute("cy", ty);
        rx = radius*1.5;
        target.setAttribute("rx", rx);
        ry = radius/2;
        target.setAttribute("ry", ry);
        targetSpeed = 8;
        target.setAttribute("fill", "RED");
        gameStart(target)
    }

    // Medium level game(Target size(rx) is medium and target moving speed(targetSpeed) is medium)
    function mediumLevelTarget() {
        let target = document.createElementNS( svgNS, "ellipse" )                
        let radius = 20;
        target.setAttribute("r", radius);                    
        tx = radius;
        target.setAttribute("cx", tx);
        ty = radius;
        target.setAttribute("cy", ty);
        rx = radius*2;
        target.setAttribute("rx", rx);
        ry = radius/2;
        target.setAttribute("ry", ry); 
        targetSpeed = 6;
        target.setAttribute("fill", "RED");
        gameStart(target)
    }

    // Easy level game(Target size(rx) is bigger and target moving speed(targetSpeed) is slower)
    function easyLevelTarget() {
        let target = document.createElementNS( svgNS, "ellipse" )
        let radius = 20;
        target.setAttribute("r", radius);
        tx = radius;
        target.setAttribute("cx", tx);
        ty = radius;
        target.setAttribute("cy", ty);
        rx = radius*2.5;
        target.setAttribute("rx", rx);
        ry = radius/2;
        target.setAttribute("ry", ry);
        targetSpeed = 4;
        target.setAttribute("fill", "RED");
        gameStart(target)
    }

    // game start
    function gameStart(target) {
        clearAll();		
        let svg = document.getElementById("board");	
        svg.appendChild(target);
        
        if (myTimer1 != null)
            clearInterval(myTimer1);			
        
        // timer for target moving
        myTimer1 = setInterval(function() {
            if (target != null) {
                tx = tx + targetSpeed;
                target.setAttribute("cx", tx);                            
                let r = Number(target.getAttribute("r"));
                // target moving 
                if (tx + r >= boardsizeX || tx - r <= 0)
                    targetSpeed *= -1;
            }
        }, 1000 / 30);  // This will be 30 frames per second (fps)
    }

    // shooting to target 
    document.getElementById("shoot").addEventListener("click", function(event) { 
        if ( by > 0 ) { 
            // No input is received when the previous bullet is flying.
        }
        else {
            let svg = document.getElementById("board");	
            let bullet = makeBullet();
            svg.appendChild(bullet);
            if (myTimer2 != null)
                clearInterval(myTimer2);			
                
            // timer for bullet moving
            myTimer2 = setInterval(function() {
                if (bullet != null) {
                    by = by - bulletSpeed;
                    bullet.setAttribute("cy", by);
                    if ( count == 10) { // finish chance
                        targetSpeed = 0; // stop target moving
                        bulletSpeed = 0; // stop bullet moving
                        by = -100; 
                        document.getElementById("gameOver").innerHTML = "Game Over. if you want to play game again, click one of Difficulty Level button";
                    }
                    else if ( by == 0 ) {
                        recordBullet = bx; // save bullet x position value
                        recordTarget = tx; // save target x position value
                        if( recordTarget <= recordBullet+(rx/7) && recordTarget >= recordBullet-(rx/7) )
                            currentScore = 10; // get high score
                        else if( recordTarget <= recordBullet+(rx/3) && recordTarget >= recordBullet-(rx/3) )
                            currentScore = 7; // get middle score
                        else if( recordTarget <= recordBullet+rx && recordTarget >= recordBullet-rx )
                            currentScore = 4; // get low score
                        else
                            currentScore = 0; // no score
                        TotalScore += currentScore // sum score
                        count++; // add counting number
                        document.getElementById("curScore").innerHTML = "Current Score: " + currentScore; // display current score
                        document.getElementById("totalScore").innerHTML = ", Total Score: " + TotalScore; // display total score
                        document.getElementById("remainCount").innerHTML = ", Remain chance: " + (10-count); // display remain chance
                    }
                }
            }, 1000 / 30);  // This will be 30 frames per second (fps)
        }
    });

    // Create an object that is a moving target 
    function makeBullet() {
        let bullet = document.createElementNS( svgNS, "circle" )                
        let radius = 5;
        bullet.setAttribute("r", radius);
        bx = boardsizeX/2;
        bullet.setAttribute("cx", bx);
        by = boardsizeY-20;
        bullet.setAttribute("cy", by);
        bulletSpeed = 15;
        bullet.setAttribute("fill", "WHITE");                
        return bullet;            
    }	
});