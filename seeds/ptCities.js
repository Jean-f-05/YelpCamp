const cities = require('cities.json');



let ptCities = cities.filter(arr => {
    return  arr.country === "PT"
})

ptCities = ptCities.map(item =>{
    return {
        country:item.country,
        name:item.name,
        latitude:item.lat,
        longitude: item.lng
    }
});

module.exports = ptCities;

