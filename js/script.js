const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const pontuacaoTela = document.getElementById("pontuacao");
const mp3_swap = document.getElementById("mp3");

let play_musica = false;

let pontuacao = 0;
let no_cont= true;

//Velocidade inicial do cano

let atual_velo_pipe = 3;
const velo_adicional = 0.5;
const quando_att = 3;

document.addEventListener("DOMContentLoaded", () => {
    if (mp3_swap){
        mp3_swap.src = "mp3/Super Mario da Pisadinha (Ariel Skinny Remix).mp3";
        mp3_swap.loop = true;
        mp3_swap.load();
        mp3_swap.play()
        .then(() => { 
            });
    }
    
})

const jump = () => {
    mario.classList.add("jump");

    //Audio de pulo

    const jumpSound = new Audio('mp3/pulo.mp3');
    jumpSound.volume = 0.5;
    jumpSound.play()
        .catch(error => {
            console.warn("Falha ao reproduzir som de pulo:", error);
        });
    

    setTimeout(() => {
        mario.classList.remove("jump");
    }, 500);
}

const loop = setInterval(() => {

    console.log("loop")

    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace("px" , "");

    
    console.log(marioPosition);

    if (pipePosition <= 120 && pipePosition > 0  && marioPosition < 80){

        pipe.style.animation = "none";
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = "none";
        mario.style.left = `${marioPosition}px`;

        mario.src="img/game-over.png";
        mario.style.width = "75px";
        mario.style.marginLeft = "50px";
        mp3_swap.src = "mp3/game_over.mp3";
        mp3_swap.load();
        mp3_swap.play();
        document.getElementById("mp3").loop = false;

        clearInterval(loop);

        document.getElementById("new-game").style.visibility = "visible";

    }

   
    else if (pipePosition <=0 && no_cont){
        pontuacao++
        pontuacaoTela.innerHTML = `Pontuação: <br> ${pontuacao}`;
        no_cont = false;

        if (pontuacao % quando_att === 0 && atual_velo_pipe > 1){

            atual_velo_pipe = atual_velo_pipe - velo_adicional;

            document.documentElement.style.setProperty("--pipe-speed", `${atual_velo_pipe}s`);

            pipe.style.animation = 'none';
            void pipe.offsetWidth; 
            pipe.style.animation = `pipe-animation ${atual_velo_pipe}s infinite linear`;
        }
    } 

    else if (pipePosition > 0 && !no_cont){
        no_cont = true;
    }

}, 10);

document.addEventListener("keydown", jump);