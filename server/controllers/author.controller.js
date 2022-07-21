const { Author } = require('../models/author.model')

// create
module.exports.createAuthor = (req, res) => {
  const { name } = req.body
  Author.create({
    name,
  })
    .then((author) => res.json(author))
    .catch((err) => res.status(400).json(err))
}

// Get all
module.exports.getAllAuthors = (req, res) => {
  Author.find({})
    .then((authors) => res.json(authors))
    .catch((err) => res.json(err))
}

// Get one
module.exports.getAuthor = (req, res) => {
  Author.findOne({ _id: req.params.id })
    .then((author) => res.json(author))
    .catch((err) => res.status(400).json(err))
}

// update
module.exports.updateAuthor = (req, res) => {
  Author.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((updatedAuthor) => res.json(updatedAuthor))
    .catch((err) => res.status(400).json(err))
}

// delete
module.exports.deleteAuthor = (req, res) => {
  Author.deleteOne({ _id: req.params.id })
    .then((deleted) => res.json(deleted))
    .catch((err) => res.status(400).json(err))
}
