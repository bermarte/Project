url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=964";
var pokemonList = [];
fetch(url)
    .then(function (response) {
        //console.log(response)
        response.json()
            .then(function (pokemonData) {
                //console.log(pokemonData);

                for (pk = 0; pk < pokemonData.count; pk++) {
                    pokemonList.push(pokemonData.results[pk].name);

                }
            })
    })
    .catch(
        console.log("cannot load data")
    );

document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementById('nb').value = 1;
    document.getElementById("info-screen").innerHTML = "bulbasaur"+ "<br />" + arr;
    document.getElementById('screen').getElementsByTagName('img')[0].src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + (idPokemon + 1) + ".png";
});
let input = document.getElementById('nb');
let arr = [];


function getMoves(sat) {
        console.log(sat);
        fetch('https://pokeapi.co/api/v2/pokemon/' + input.value)
            .then((response) => response.json())
            .then((data) => {
                let arr =[];
               // console.log(data);
                //let nom = data.moves.length;
               // console.log(nom);
                let numPow = 10;
                /*for (let i = 0; i < numPow; i++) {
                    arr.push(data.moves[i].move.name);
                }*/
               // console.log(arr)
            })
            .catch(
                document.getElementById("info-screen").innerHTML = "No Moves Found :("
            )
    }

var kys = document.querySelectorAll("#keyboard>div");
kys.forEach((element) => {

    let dtnum = element.getAttribute("data-move");
    element.addEventListener("click",getMoves(dtnum));
});

//document.getElementById(keyboard").addEventListener("click", getMoves);

function getElemPokemonList() {
    //msg on screen
    document.getElementById("info-screen").innerHTML = pokemonList[idPokemon];

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
    console.log("test");
    //input field
    if (val <= pokemonList.length) {
        idPokemon = parseInt(val) - 1
        document.getElementById("info-screen").innerHTML = pokemonList[idPokemon];
        document.getElementById('screen').getElementsByTagName('img')[0].src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + (idPokemon + 1) + ".png";
    } else {
        document.getElementById("info-screen").innerHTML = "this pokemon doesn't exist";
        document.getElementById('screen').getElementsByTagName('img')[0].src = "assets/img/pokedex/Pokemon-disappointed.jpg";
    }
    //console.log(getMoves(),"mess")

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
}