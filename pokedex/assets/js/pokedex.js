/*

var pokemonList = ["Bulbasaur","Ivysaur","Venusaur","Charmander","Charmeleon","Charizard",
"Squirtle","Wartortle","Blastoise","Caterpie","Metapod","Butterfree","Weedle","Kakuna",
"Beedrill","Pidgey","Pidgeotto","Pidgeot","Rattata","Raticate","Spearow","Fearow","Ekans",
"Arbok","Pikachu","Raichu","Sandshrew","Sandslash","Nidoran-f","Nidorina","Nidoqueen","Nidoran-m",
"Nidorino","Nidoking","Clefairy","Clefable","Vulpix","Ninetales","Jigglypuff","Wigglytuff",
"Zubat","Golbat","Oddish","Gloom","Vileplume","Paras","Parasect","Venonat","Venomoth","Diglett",
"Dugtrio","Meowth","Persian","Psyduck","Golduck","Mankey","Primeape","Growlithe","Arcanine",
"Poliwag","Poliwhirl","Poliwrath","Abra","Kadabra","Alakazam","Machop","Machoke","Machamp",
"Bellsprout","Weepinbell","Victreebel","Tentacool","Tentacruel","Geodude","Graveler","Golem",
"Ponyta","Rapidash","Slowpoke","Slowbro","Magnemite","Magneton","Farfetch'd","Doduo","Dodrio",
"Seel","Dewgong","Grimer","Muk","Shellder","Cloyster","Gastly","Haunter","Gengar","Onix","Drowzee",
"Hypno","Krabby","Kingler","Voltorb","Electrode","Exeggcute","Exeggutor","Cubone","Marowak","Hitmonlee",
"Hitmonchan","Lickitung","Koffing","Weezing","Rhyhorn","Rhydon","Chansey","Tangela","Kangaskhan","Horsea"
,"Seadra","Goldeen","Seaking","Staryu","Starmie","Mr.Mime","Scyther","Jynx","Electabuzz","Magmar",
"Pinsir","Tauros","Magikarp","Gyarados","Lapras","Ditto","Eevee","Vaporeon","Jolteon","Flareon","Porygon",
"Omanyte","Omastar","Kabuto","Kabutops","Aerodactyl","Snorlax","Articuno","Zapdos","Moltres","Dratini",
"Dragonair","Dragonite","Mewtwo","Mew"];

 */
url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=964";
var pokemonList = [];
fetch(url)
    .then(function (response) {
        //console.log(response)
        response.json()
            .then(function (pokemonData) {
                //console.log(pokemonData)

                for (pk = 0; pk < pokemonData.count; pk++) {
                    pokemonList.push(pokemonData.results[pk].name)
                    console.log(pokemonData.results[pk].name);
                }
            })
    })
    .catch(
        document.getElementById("info-screen").innerHTML = "no data or error"
    )


document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementById('nb').value = 1;
    document.getElementById("info-screen").innerHTML = "bulbasaur";
    document.getElementById('screen').getElementsByTagName('img')[0].src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + (idPokemon + 1) + ".png";
});

function getElemPokemonList() {
    //msg on screen
    document.getElementById("info-screen").innerHTML = pokemonList[idPokemon]
}

function getElemIdPokemon() {
    if (idPokemon < (pokemonList.length)) {
        document.getElementById('nb').value = idPokemon + 1;
    } else {
        document.getElementById('nb').value = idPokemon;
    }
}

var idPokemon = 0;

function increaseIdPokemon() {
    if (idPokemon < pokemonList.length - 1) {
        idPokemon++;
    } else {
        idPokemon = 0;
    }
    getElemIdPokemon();
    getElemPokemonList();
    //NEXT WAS pokemonList[idPokemon]
    document.getElementById('screen').getElementsByTagName('img')[0].src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + (idPokemon + 1) + ".png";
}

function decreaseIdPokemon() {
    if (idPokemon > 0) {
        idPokemon--;
    } else {
        idPokemon = pokemonList.length - 1;
    }
    getElemIdPokemon()
    getElemPokemonList()
    document.getElementById('screen').getElementsByTagName('img')[0].src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + (idPokemon + 1) + ".png";
}

function updateIdPokemon(val) {
    //input field

    if (isNaN(val)){
        console.log("not a number");
    } else {
        console.log("search ");
        if (val <= pokemonList.length) {
            idPokemon = parseInt(val) - 1
            document.getElementById("info-screen").innerHTML = pokemonList[idPokemon];
            document.getElementById('screen').getElementsByTagName('img')[0].src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + (idPokemon + 1) + ".png";
        } else {
            document.getElementById("info-screen").innerHTML = "this pokemon doesn't exist";
            document.getElementById('screen').getElementsByTagName('img')[0].src = "assets/img/pokedex/Pokemon-disappointed.jpg";
        }
    }
}

//search by name
searchByNameDiv = document.getElementById("searchByNameDiv");
document.getElementById("blue-button-left").addEventListener("click", searchByName);
function searchByName(){
    if (searchByNameDiv.value !=="name of pokemon" && searchByNameDiv.value !==""){
        name = searchByNameDiv.value;
        console.log("name", searchByNameDiv.value);
        pokeurl = "https://pokeapi.co/api/v2/pokemon/";
        mypokemon = pokeurl+name;
        console.log("query", mypokemon);
        //fetch single pokemon by name
        fetch(mypokemon)
        .then(function (response) {
                response.json()
                    .then(function (pokemonSingle) {
                        console.log(pokemonSingle.id);
                        document.getElementById('nb').value = pokemonSingle.id;
                        updateIdPokemon(pokemonSingle.id);
                    })
            })
                .catch(
                    document.getElementById("info-screen").innerHTML = "did not find anything"
                )
        //end fetch
    }

    else{
        document.getElementById("info-screen").innerHTML = "write a name";
    }
}

input = document.getElementById('nb');
//get ids
document.getElementById("cross-button").addEventListener("click", showId);
function showId(){
   console.log("id");
    fetch('https://pokeapi.co/api/v2/pokemon/' + input.value)
        .then((response) => response.json())
        .then((data) => {

            document.getElementById("info-screen").innerHTML ="id: "+input.value
        })
        .catch(
            document.getElementById("info-screen").innerHTML = "No id Found :("
        )
}

function getMoves(sat) {
    console.log(sat);
    fetch('https://pokeapi.co/api/v2/pokemon/' + input.value)
        .then((response) => response.json())
        .then((data) => {
            var powerRe =  data.moves[sat].move.name;
            document.getElementById("info-screen").innerHTML = powerRe;
        })
        .catch(
            document.getElementById("info-screen").innerHTML = "No Moves Found :("
        )
}
var kys = document.querySelectorAll("#keyboard>div");
kys.forEach((element) => {
    let dtnum = element.getAttribute("data-move");
    element.addEventListener("click", function (){
        getMoves(dtnum);
    });
});



//get height
document.getElementById("green-button-right").addEventListener("click", getHeight);
function getHeight(){
    fetch('https://pokeapi.co/api/v2/pokemon/' + input.value)
        .then((response) => response.json())
        .then((data) => {
            var height =  data.height;
            document.getElementById("info-screen").innerHTML = "height: "+height+" ft";
        })
        .catch(
            document.getElementById("info-screen").innerHTML = "No height Found :("
        )
}
//get weight
document.getElementById("orange-button-right").addEventListener("click", getWeight);
function getWeight(){
    fetch('https://pokeapi.co/api/v2/pokemon/' + input.value)
        .then((response) => response.json())
        .then((data) => {
            var weight =  data.weight;
            document.getElementById("info-screen").innerHTML = "weight: "+weight+" lb";
        })
        .catch(
            document.getElementById("info-screen").innerHTML = "No weight Found :("
        )
}
//evolves from
document.getElementById("left-cross-button").addEventListener("click", evolvesFrom);
function evolvesFrom(){
    fetch('https://pokeapi.co/api/v2/pokemon-species/' + input.value)
        .then((response) => response.json())
        .then((data) => {
            if (data.evolves_from_species) {
                //name
                var evolveData =  data.evolves_from_species.name
                console.log("evolveData",evolveData)

                //url of ancestor
                //console.log(data.evolves_from_species)
                //console.log("https://pokeapi.co/api/v2/pokemon/"+evolveData+sprites.front_default
                return fetch("https://pokeapi.co/api/v2/pokemon/"+evolveData)
            }})
            .then(function(response){
                return response.json()
            })
            .then((data) =>{

                sprite = data.sprites.front_default
                id = data.id
                //var imgdiv = "<a href='evolveToscreen("+id+");'><img src='"+sprite+"' alt='pokemon evolve from'></a>"
                var imgdiv = "<a href='javascript:;' onclick='evolveToScreen("+id+")'><img src='"+sprite+"' alt='pokemon evolve from'></a>"
                document.getElementById("info-screen").innerHTML = imgdiv
                console.log(id)
            })


        .catch(
            document.getElementById("info-screen").innerHTML = "No evolution Found :("
        )
}
//evolution to
document.getElementById("right-cross-button").addEventListener("click", evolveTo);
function evolveTo(){


    var evoChain = [];
    fetch('https://pokeapi.co/api/v2/pokemon-species/' + input.value)
        .then((response) => response.json())
        .then((data) => {
            //console.log(data)
            evolution_chain_url = data.evolution_chain.url
            //console.log(evolution_chain_url)
            fetch(evolution_chain_url)
                .then((response) => response.json())
                .then((data) =>{
                    //console.log(data)
                    var evoChain = [];
                    var evoData = data.chain;

                    do {
                        var evoDetails = evoData['evolution_details'][0];

                        evoChain.push({
                            "species_name": evoData.species.name,
                            "min_level": !evoDetails ? 1 : evoDetails.min_level,
                            "trigger_name": !evoDetails ? null : evoDetails.trigger.name,
                            "item": !evoDetails ? null : evoDetails.item
                        });

                        evoData = evoData['evolves_to'][0];
                    } while (!!evoData && evoData.hasOwnProperty('evolves_to'));

                    //console.log(evoChain[evoChain.length-1])

                    toTest = document.getElementById("info-screen").innerHTML
                    evolved ="";
                    if ( evoChain.length == 3){
                        console.log("got the third one")
                        poke0 = evoChain[evoChain.length-3].species_name
                        poke1 = evoChain[evoChain.length-2].species_name
                        poke2 = evoChain[evoChain.length-1].species_name
                        poke3 = "nothing"

                        console.log(toTest)

                        if (toTest == poke0){
                            console.log("first",poke1)
                            evolved = poke1
                        }
                        if (toTest == poke1){
                            console.log("second",poke2)
                            evolved = poke2
                        }
                        if (toTest == poke2){
                            console.log("third",poke3)
                            evolved = poke3
                        }
                    }
                    else if (evoChain.length == 2){
                        console.log("length two")

                        poke0 = "nothing";//evoChain[evoChain.length-3].species_name
                        poke1 = evoChain[evoChain.length-2].species_name
                        poke2 = evoChain[evoChain.length-1].species_name
                        poke3 = "nothing"

                        if (toTest == poke1){
                            console.log("second",poke2)
                            evolved = poke2
                        }
                        if (toTest == poke2){
                            console.log("third",poke3)
                            evolved = poke3
                        }


                        if (evolved=="nothing"){


                            msg = "No evolution Found :("

                            document.getElementById("info-screen").innerHTML = msg

                        }

                    }
                    else if (evoChain.length == 1){
                        console.log("length one")
                        poke0 = "nothing";
                        poke1 =  "nothing"
                        poke2 = evoChain[evoChain.length-1].species_name
                        poke3 = "nothing"

                        if (toTest == poke2){
                            console.log("third",poke3)
                            evolved = "nothing"
                            msg = "No evolution Found :("

                            document.getElementById("info-screen").innerHTML = msg
                        }
                    }
                    if (evolved=="nothing"){

                        document.getElementById("info-screen").innerHTML = "No evolution Found :("
                    }
                    else{
                    console.log("url","https://pokeapi.co/api/v2/pokemon/"+evolved)

                    return fetch("https://pokeapi.co/api/v2/pokemon/"+evolved)
                    }


                })

                .then(function(response){
                    return response.json()
                })
                .then((data) =>{

                    sprite = data.sprites.front_default
                    id = data.id
                    //var imgdiv = "<a href='evolveToscreen("+id+");'><img src='"+sprite+"' alt='pokemon evolve from'></a>"
                    var imgdiv = "<a href='javascript:;' onclick='evolveToScreen("+id+")'><img src='"+sprite+"' alt='pokemon evolve from'></a>"
                    document.getElementById("info-screen").innerHTML = imgdiv
                    console.log(id)

                })

                //if empty raise exception


        })




        //.then((response) => { })


            //console.log(data)
            //evolution_chain
            /*
            var evoData = response.data.chain;

            do {
                var evoDetails = evoData['evolution_details'][0];

                evoChain.push({
                    "species_name": evoData.species.name,
                    "min_level": !evoDetails ? 1 : evoDetails.min_level,
                    "trigger_name": !evoDetails ? null : evoDetails.trigger.name,
                    "item": !evoDetails ? null : evoDetails.item
                });

                evoData = evoData['evolves_to'][0];
            } while (!!evoData && evoData.hasOwnProperty('evolves_to'));

             */

    /*


    var evoData = response.data.chain;

    do {
        var evoDetails = evoData['evolution_details'][0];

        evoChain.push({
            "species_name": evoData.species.name,
            "min_level": !evoDetails ? 1 : evoDetails.min_level,
            "trigger_name": !evoDetails ? null : evoDetails.trigger.name,
            "item": !evoDetails ? null : evoDetails.item
        });

        evoData = evoData['evolves_to'][0];
    } while (!!evoData && evoData.hasOwnProperty('evolves_to'));

     */





}
//audio
var audio1 = new Audio('assets/audio/professor oak.mp3');
function audioPlayGreen() {
    if(audio1.paused) {audio1.play()}
    else audio1.pause();
}

var audio2 = new Audio('assets/audio/ending.mp3');
function audioPlayYellow() {
    if(audio2.paused) {audio2.play()}
    else audio2.pause();
}

document.getElementById("leaf-button-right").addEventListener("click",audioPlayGreen);
document.getElementById("yellow-button-right").addEventListener("click",audioPlayYellow);



function evolveToScreen(element){
    document.getElementById('nb').value = element;
    updateIdPokemon(element);
}

function retroPicturePokemon() {
    document.getElementById('screen').getElementsByTagName('img')[0].src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/" + (idPokemon + 1) + ".png";
}

function PicturePokemon() {
    document.getElementById('screen').getElementsByTagName('img')[0].src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + (idPokemon + 1) + ".png";
}

function ShinyPicture() {
    if (!document.getElementById('screen').getElementsByTagName('img')[0].src.includes("shiny")) {
        if (document.getElementById('screen').getElementsByTagName('img')[0].src.includes("back")) {
            document.getElementById('screen').getElementsByTagName('img')[0].src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/" + (idPokemon + 1) + ".png";
        } else {
            document.getElementById('screen').getElementsByTagName('img')[0].src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/" + (idPokemon + 1) + ".png";
        }
    } else {
        if (document.getElementById('screen').getElementsByTagName('img')[0].src.includes("back")) {
            document.getElementById('screen').getElementsByTagName('img')[0].src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/" + (idPokemon + 1) + ".png";
        } else {
            document.getElementById('screen').getElementsByTagName('img')[0].src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + (idPokemon + 1) + ".png";
        }
    }

    //document.getElementById('screen').getElementsByTagName('img')[0].src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + (idPokemon + 1) + ".png";
    /*
    if (idPokemon == 24) {
        document.getElementById('screen').getElementsByTagName('img')[0].src = "assets/img/pokedex/pokemon/Pikachu-drug.gif";
    } else {
        document.getElementById('screen').getElementsByTagName('img')[0].src = "assets/img/pokedex/pokemon/" + pokemonList[idPokemon] + ".jpg";
    }

     */


}

