const { getgenres } = require('../../controllers/controllers')

const getgenresHandler = async (req, res) => {
    try {
        const response = await getgenres();
        return res.status(200).json(response);
      } catch (err) {
        return res.status(500).send(err.message);
      }
};

module.exports = {
    getgenresHandler,
}