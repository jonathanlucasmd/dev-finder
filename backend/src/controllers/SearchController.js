const Dev = require('../models/dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async index(request, response) {
    // Buscar todos os devs num raio 10km
    // Filtrar por tecnologias
    const { latitude, longitude, techs } = request.query;
    const techsv = parseStringAsArray(techs);
    const devs = await Dev.find({
      techs: {
        $in: techsv,
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000,
        },
      },
    });

    return response.json({ devs });
  },
};
