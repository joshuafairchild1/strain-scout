const express = require('express');
const router = express.Router();
const Rx = require('rxjs/Rx');
const rp = require('request-promise');

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/search/:query', (req, res) => {
  const { query } = req.params
  rp(`https://www.cannabisreports.com/api/v1.0/strains/search/${query}`)
    .then(response => res.send(response))
    .catch(error => console.warn('ERROR: ', JSON.stringify(error)))
})

router.get('/details/:ucpc', (req, res) => {
  const { ucpc } = req.params
  rp(`https://www.cannabisreports.com/api/v1.0/strains/${ucpc}`)
    .then(response => res.send(response))
    .catch(error => console.warn('ERROR: ', JSON.stringify(error)))
})

router.get('/pages/:url(*)', (req, res) => {
  const { url } = req.params
  rp(url)
    .then(response => res.send(response))
    .catch(error => console.log('ERROR: ', JSON.stringify(error)))
})

router.get('/effectsFlavors/:ucpc', (req, res) => {
  const { ucpc } = req.params
  rp(`https://www.cannabisreports.com/api/v1.0/strains/${ucpc}/effectsFlavors`)
    .then(response => res.send(response))
    .catch(error => console.log('ERROR: ', JSON.stringify(error)))
})

module.exports = router;
