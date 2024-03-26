import log from '@ajar/marker';
import Promise from 'bluebird';

function getCountryPopulation(country:string){
    return new Promise((resolve,reject)=> {
        const url = `https://countriesnow.space/api/v0.1/countries/population`;
        const options = {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({country})
        };
        fetch(url,options)
            .then(res => res.json())
            .then(json => {
                if (json?.data?.populationCounts) resolve(json.data.populationCounts.at(-1).value);
                else reject(new Error(`My Error: no data for ${country}`)) //app logic error message
            })
            // .catch(err => reject(err)) // network error - server is down for example...
            .catch(reject)  // same same, only shorter... 
    })
}
//--------------------------------------------------------
//  Manual - call one by one...
//--------------------------------------------------------
function manual() {
    getCountryPopulation("France")
        .then( population => {
            console.log(`population of France is ${population}`);
            return getCountryPopulation("Germany")
        })
        .then( population => console.log(`population of Germany is ${population}`))
        .catch(log.error);
}
manual()

//--------------------------------------------------------
//  Parallel processing 
//--------------------------------------------------------
const countries = ["France","Russia","Germany","United Kingdom","Portugal","Spain","Netherlands","Sweden","Greece","Czechia","Romania","Israel"];

function parallel() {


}
// parallel();
//------------------------------
//   Sequential processing 
//------------------------------
function sequence() {
    

}
// sequence();