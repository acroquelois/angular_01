const axios = require('axios');

export async function aggregationApi(){
    try{
        const [joke, taco, gps, cats, beer] = await Promise.all([
            getOneJoke(),
            getOneTacos(),
            getGouvAdress(),
            getThreeCatFact(),
            getBeerRecipe()
        ])
        return {
            "gps":gps,
            "joke": joke,
            "catFact":cats,
            "beer":beer,
            "taco": taco 
        }
    }catch(error){
        return error
    }
}

async function getThreeCatFact(){
    return await axios('https://cat-fact.herokuapp.com/facts/random?amount=3')
    .then(({data}) =>{
        return data.map(x => { return x.text})
    }).catch(() => {
        throw "Error fetching cats";
    })
}

async function getOneJoke(){
    return await axios('https://sv443.net/jokeapi/v2/joke/Any')
    .then(({data}) =>{
        return `${data.setup} ${data.delivery}`;
    }).catch(() => {
        throw "Error fetching joke";
    })
}

async function getOneTacos(){
    return await axios('http://taco-randomizer.herokuapp.com/random/')
    .then(({data}) =>{
        return data.condiment.name;
    }).catch(() => {
        throw "Error fetching tacos";
    })
}

async function getGouvAdress(){
    return await axios('https://api-adresse.data.gouv.fr/search/?q=41+rue+du+port')
    .then(({data}) =>{
        let [{properties}] = data.features;
        return {
            "lat":properties.x,
            "lgn":properties.y
        }
    }).catch(() => {
        throw "Error fetching adress";
    })
}

async function getBeerRecipe(){
    return await axios('https://api.punkapi.com/v2/beers/random')
    .then(({data}) =>{
        let [{name,description}] = data
        return {
            "name":name,
            "description":description
        }
    }).catch(() => {
        throw "Error fetching beer";
    })
}