const { getVideogameHandler } = require('./modulos/getVideogameHandler')
const { getIdVideogameHandler } = require('./modulos/getIdVideogameHandler')
const { getNameHandler } = require('./modulos/getNamehandler')
const { getgenresHandler } = require('./modulos/getGenresHandler')
const { postVideogameHandler } = require('./modulos/postVideogameHandler')

module.exports = {
    getVideogameHandler,
    getIdVideogameHandler,
    getNameHandler,
    getgenresHandler,
    postVideogameHandler,
}