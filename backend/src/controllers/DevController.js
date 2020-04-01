const axios = require('axios');
const Dev = require('../models/dev');
const parseStringAsArray = require('../utils/parseStringAsArray');


// index = listar, show = mostrar um, store = armazenar, update = atualizar , destroy= deletar

module.exports = {
  async show(req, res) {
    const { github_username } = req.body;
    return res.json(Dev.findOne({ github_username }));
  },
  async update(req, res) {
    const { github_username } = req.params;
    const { techs, ...updates } = req.query;
    const techsv = parseStringAsArray(techs);

    updates.techs = techsv;

    const devUpdated = await Dev.updateOne({ github_username }, {
      $set: updates,
    });
    return res.json({ devUpdated });
  },
  async index(req, res) {
    const devs = await Dev.find();
    return res.json(devs);
  },

  async store(req, res) {
    const {
      github_username, techs, longitude, latitude,
    } = req.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const request = await axios.get(`https://api.github.com/users/${github_username}`);
      const { name, avatar_url, bio } = request.data;

      const techsv = parseStringAsArray(techs);

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };
      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsv,
        location,
      });
    }

    return res.json(dev);
  },
};
