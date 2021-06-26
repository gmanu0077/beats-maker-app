const router = require('express').Router();
let Beats = require('./models/beats.nod');

router.route('/').get((req, res) => {
  Beats.find()
    .then(beats => res.json(beats))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const beats= req.body.beats;
  const username=req.body.username;
  const beatname=req.body.beatname
  

  const newbeat = new Beats({
    
    beats,
    username,
    beatname

    
  });

  newbeat.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').get((req,res)=>{
 Beats.findById(req.params.id)
 .then(beats => res.json(beats))
 .catch(err => res.status(400).json('Error: ' + err));

})
router.route('/:id').delete((req, res) => {
    Beats.findByIdAndDelete(req.params.id)
      .then(() => res.json('beat deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router; 