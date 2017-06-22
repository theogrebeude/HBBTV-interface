/* 
 * HBBTV Interface LP SAN INA 2016
 * Pour projet Chaine media
 * Théo Grébeude theogrebeude@gmail.com
 */
// video selectionnée
 var curent = false;
 // interface connecté actif ou non 
 var actif = false;
 // lecture en cour
 var playing = false; 
 // affichage programme
var pgm = false;
// plaine ecran
var fullscreen = false;
 // instance bouton
var table = [];
    // Fonction d'initialisation du système HbbTV et de surveillance des appuis sur les touches
function init() {
    var ResultHbbtvInit = hbbtvlib_initialize() && hbbtvlib_show();
    // Ajout flux DVB dans player
    try {
            document.getElementById('live').bindToCurrentChannel();
    } catch (e) {
            // ignore
    }
    document.addEventListener("keydown", function(e) {
            if (handleKeyCode(e.keyCode))
                    e.preventDefault();
    }, false);
    curent = "vod_5";
    table[curent].inhover();
    window.setTimeout(function active(){
        hide("preload");
        } , 8000);
    return true;

};

function show(id){
    this.id = id;
   document.getElementById(id).style.visibility = "visible";
    return true;
};

function hide(id){
    this.id = id;
    document.getElementById(id).style.visibility = "hidden"; 
    return true;
};
    
// objet bouton 
function bouton(id,nom,vurl,haut,bas,gauche,droite){
    this.id = id;
    this.nom = nom;
    this.vurl = vurl;
    this.haut = haut;
    this.bas = bas;
    this.gauche = gauche;
    this.droite = droite;
    return true;
};
// fonction selection 
bouton.prototype.inhover = function() {
    document.getElementById(this.id).classList.add("select");
    document.getElementById(this.id).getElementsByClassName("video_title_background")[0].style.opacity = "0.8";
    document.getElementById(this.id).getElementsByClassName("video_title_background")[0].style.background = "black";
    return true;
};
// fonction deselection
bouton.prototype.outhover = function() {
    document.getElementById(this.id).classList.remove("select");
    document.getElementById(this.id).getElementsByClassName("video_title_background")[0].style.opacity = "0.3";
    document.getElementById(this.id).getElementsByClassName("video_title_background")[0].style.background = "white";
    return true;
};

   

    


function handleKeyCode(keyCode) {
    // si l'interface n'est pas actif
    if(!actif){
        // si on appuie sur le bouton rouge
        if (keyCode == VK_RED) {
            console.log("entrée red");
            show("content");
            hide("video-content"); 
            hide("preload");
          // document.getElementById("live").classList.add("top-b");
         //  document.getElementById("live").getElementsByTagName("video")[0].classList.add("top-b");
           actif = true;
       }
    }else{
    // si l'interface est active    
        if (keyCode == VK_RED) {
            actif = false;
            console.log("fermetire de l'applie");
            // s'il ya une lecture en cour
            if(playing){
                
                var sel = document.getElementById('player-video');
                var toto = sel.removeChild(document.getElementById('video-content'));
                var sp2 = document.getElementById('player-video').firstChild;
                console.log(sp2);
                var sp1 = document.createElement("object");
                sp1.setAttribute("id", "video-content");
                sp1.setAttribute("type", "video/mp4");
                element = document.getElementById('player-video').replaceChild(sp1, sp2);

                // pause du la video
                // document.getElementById('video-content').play(0);
                // document.getElementById('video-content').innerHTML ="<h1>player</h1>";
                // Crée un nœud d'élément vide

                
                
                
                //document.getElementById('video-content').innerHTML = '<object id="video-content" type="video/broadcast"></object>';
                // il n'y a plus de lecture en cour              
                playing = false;
                // on masque le contenu
               
            }else{
                hide("video-content"); 
                
            }                  
            hide("content");
            show("preload");
            
            // après 10 sec on masque de préload
           window.setTimeout(function active(){
                hide("preload");
                } , 10000);
           return true;
        };
        if (keyCode == VK_GREEN) {
                console.log("Appuie sur vert");
                return true;
        };
        if (keyCode == VK_YELLOW) {
            console.log(fullscreen);
            // fonction fullscreen
                if(fullscreen){
                    endfullscreen();
                    fullscreen = false;
                }else{
                    tofullscreen();
                    fullscreen = true;
                }
                return true;
        };
        if (keyCode == VK_BLUE) {
                console.log("Appuie sur bleu");
                return true;
        };
        if (keyCode == VK_RIGHT) {
                if(table[curent].droite){
                   table[curent].outhover();
                   curent = table[curent].droite;
                   table[curent].inhover();
               }else{
                  // console.log("tout à droite");
                }
                return true;
        }
        if (keyCode == VK_LEFT) {
                if(table[curent].gauche){
                   table[curent].outhover();
                   curent = table[curent].gauche;
                   table[curent].inhover();
               }else{
                  // console.log("tout à gauche");
                }
                return true;
        }
        if (keyCode == VK_UP) {
                if(table[curent].haut){
                   table[curent].outhover();
                   curent = table[curent].haut;
                   table[curent].inhover();
               }else{
                 //  console.log("tout en haut");
                }
                return true;
        }
        if (keyCode == VK_DOWN) {
                if(table[curent].bas){
                   table[curent].outhover();
                   curent = table[curent].bas;
                   table[curent].inhover();
               }else{
                  // console.log("tout en bas");
                }
                return true;
        }
        if (keyCode == VK_ENTER) {
            show("video-content");
            document.getElementById('video-content').data = table[curent].vurl;
            playing = true;
            document.getElementById('video-content').play(1);            
            document.getElementById('video-content').setFullScreen(false);        
            fullscreen = false;
            console.log("debut play");
            function myHandler(e) {
                if(!e) { e = window.event; }
                endfullscreen();
            };
            document.getElementById('video-content').getElementsByTagName('video')[0].addEventListener('ended',myHandler,false);
    
        }
        // bouton pause 
        if (keyCode == VK_PAUSE) {
            if(playing){
                document.getElementById('video-content').play(0);
                playing = false;
            }                
        }
        // bouton play
        if (keyCode == VK_PLAY) {
            if(!playing){
               document.getElementById('video-content').play(1);
               playing = true;
            }                
        }
        // bouton stop 
        if (keyCode == VK_STOP) {
            if(playing){
               document.getElementById('video-content').play(0);
               document.getElementById('video-content').getElementsByTagName('video')[0].currentTime =0;
            }

        }
    }
 return true;
}

// sortie fullscreen

function endfullscreen(){
    document.getElementById('video-content').style.width = "492px";
    document.getElementById('video-content').style.height = "277px";
    document.getElementById('video-content').style.top = "0px";
    document.getElementById('video-content').style.left = "0px";
    return true;
    
}

// entrée fullscreen

function tofullscreen(){
    document.getElementById('video-content').style.width = "1280px";
    document.getElementById('video-content').style.height = "720px";
    document.getElementById('video-content').style.top = "-103px";
    document.getElementById('video-content').style.left = "-648px";
    return true;
    
}



 window.onload = function() {
    //function lanceur() { : à activer à la place du window.onlaod si déclaration onload dans body
    var ResultInit = init();
    console.log("apllication start normaly ");
    // declaration du boutou courant
}



// remplissage des videos du tableau
table["vod_1"] = new bouton("vod_1","nom1","videos/sample.mp4",null,"vod_4",null,"vod_2");
table["vod_2"] = new bouton("vod_2","nom2","videos/woody.mp4",null,"vod_5","vod_1","vod_3");
table["vod_3"] = new bouton("vod_3","nom3","videos/3.mp4",null,"vod_6","vod_2",null);
table["vod_4"] = new bouton("vod_4","nom4","../wp-content/uploads/2016/03/Enquete-Speciale-CANNES.mp4","vod_1","vod_7",null,"vod_5");
table["vod_5"] = new bouton("vod_5","nom5","../wp-content/uploads/2016/03/Poppi-le-Negociateur.mp4","vod_2","vod_8","vod_4","vod_6");
table["vod_6"] = new bouton("vod_6","nom6","../wp-content/uploads/2016/03/Poppi-Qui-Fait-de-la-Radio.mp4","vod_3","vod_9","vod_5",null);
table["vod_7"] = new bouton("vod_7","nom7","../uploads/2016/03/Poppi-Qui-Temoigne-a-la-Barre.mp4","vod_4",null,null,"vod_8");
table["vod_8"] = new bouton("vod_8","nom8","../wp-content/uploads/2016/03/horoscope.mp4","vod_5",null,"vod_7","vod_9");
table["vod_9"] = new bouton("vod_9","nom9","../wp-content/uploads/2016/03/Film-Gala-GPD-2015-HD-H.264.mp4","vod_6",null,"vod_8",null);


