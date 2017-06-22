<!--
/* 
 * HBBTV Interface LP SAN INA 2016
 * Pour projet Chaine media
 * Théo Grébeude theogrebeude@gmail.com
 */
-->


<!DOCTYPE html>
<html>
    <head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <link href="css/style.css" rel="stylesheet" />
        <script src="js/hbbtvlib.js" type="text/javascript"></script>
	<script src="js/keycodes.js" type="text/javascript"></script>
        <script src="js/app.js" type="text/javascript"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
        <!-- Déclaration des objets OIPF (voir à quoi ça sert), hidden via le CSS -->
        <div id="oipf">
                <object type="application/oipfApplicationManager" id="oipfAppMan"></object>
                <object type="application/oipfConfiguration" id="oipfConfig"></object>
        </div>
        <div id="fond-live">            
            <object id="live" type="video/broadcast"  title="undefined"></object>
            
        </div>
        <div id="preload" class="visible">
            <div id="rouge_loader"></div>
            <div id="Bouton_rouge_loader">Démarrer l'expérience</div>
            <div id="fond_loader"></div>
        </div>
        <div id="content" class="invisible">
            
            <div class="liste">
                <div id="vod_1" class="vodMin">
                    <div class="video_title" >Titre 1</div>
                    <div class="video_title_background"></div>
                </div>
                <div id="vod_2" class="vodMin">
                    <div class="video_title" >Woody</div>
                    <div class="video_title_background"></div>
                </div>
                <div id="vod_3" class="vodMin">
                    <div class="video_title" >FFMPEG</div>  
                    <div class="video_title_background"></div>
                </div>
                <div id="vod_4" class="vodMin">
                    <div class="video_title" >Enquêtes à Cannes</div>
                    <div class="video_title_background"></div>
                </div>
                <div id="vod_5" class="vodMin">
                    <div class="video_title" >Poppi le négociateur</div>
                    <div class="video_title_background"></div>
                </div>
                <div id="vod_6" class="vodMin">
                    <div class="video_title" >Poppi fait de la radio</div>
                    <div class="video_title_background"></div>
                </div>
                <div id="vod_7" class="vodMin">
                    <div class="video_title" >Poppi temoins à la bar</div>
                    <div class="video_title_background"></div>
                </div>
                <div id="vod_8" class="vodMin">
                    <div class="video_title" >Les Amours du Zodiaque</div>
                    <div class="video_title_background"></div>
                </div>
                <div id="vod_9" class="vodMin">
                    <div class="video_title" >The Gala de dances</div>
                    <div class="video_title_background"></div>
                </div>
            </div>
            <div id="player">
                <div id="player-video">
                    <object id="video-content"  type="video/mp4" ></object>
                </div>
            </div>
            <div id="fond"></div>
            <div class="programme">
                <p id="lepgm">Programmes</p>
                <?php

                $url='eit.xml';
                $xml=file_get_contents($url);
                $root = simplexml_load_string($xml);
                //echo $root->NETWORK->TRANSPORT_STREAM->SERVICE->EVENT[0]->NAME[0];
                $events = $root->NETWORK->TRANSPORT_STREAM->SERVICE->EVENT;
                $i=0;
                 foreach( $events as $key ) {
                     $name = $key->NAME[0]." : ".$key->SHORT_DESCRIPTION[0];
                     $name1 = $name;
                     $name1 = substr($name, 0, 42);                     
                     $duree = $key['time'];
                     preg_match('/[T]([0-9:]*)/',$duree,$m); 
                     ?><div class="event0">
                                    <b class="heure"><?php echo $m[1]; ?></b><i class="Nom_du_programmes"><?php echo $name1;?></i>
                                </div>

                <?php
                $i++;
                if($i>3){
                     break;
                }

                        }
        
        ?>
                
            </div>
            <div class="bas">
                <div class="bleu"></div>
                <div class="Bbleu">Jeux</div>
                <div class="jaune"></div>
                <div class="Bjaune">Full screen</div>
                <div class="vert"></div>
                <div class="Bvert">Programmes</div>
                <div class="rouge"></div>
                <div class="Brouge">Quitter</div>
                <div class="Valider" >Valider</div>
                <div class="Naviguer">Naviguer</div>
                <div class="Bare_blanche"></div>
                <img alt="fleches" id="fleches" src="img/fleches.png">
                <img alt="ok" id="ok" src="img/ok.png">
            </div>
        </div>
    </body>
</html>
