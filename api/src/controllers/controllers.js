const { getAllVideogame } = require('./modulos/getAllVideogame')
const { getIdVideogame } = require('./modulos/getIdVideogame')
const { getName } = require('./modulos/getName')
const { getgenres } = require('./modulos/getGenres')
const { createVideogame } = require('./modulos/createVideogame')

module.exports = {
    getAllVideogame,
    getIdVideogame,
    getName,
    getgenres,
    createVideogame,
}