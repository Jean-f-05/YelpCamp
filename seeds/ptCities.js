const cities = require('all-the-cities');



let ptCities = cities.filter(arr => {
    return  arr.country === "PT"
})

ptCities = ptCities.map(item =>{
    return {
        country:item.country,
        name:item.name,
        latitude:item.loc.coordinates[1],
        longitude: item.loc.coordinates[0]
    }
});

module.exports = ptCities;

