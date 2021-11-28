const Sauce = require("../models/sauce");
const fs = require("fs");

//create
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  sauce
    .save()
    .then(() => {
      res.status(201).json({
        message: "sauce created successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

//update
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  if (req.token.userId == sauceObject.userId) {
    Sauce.updateOne(
      { _id: req.params.id },
      { ...sauceObject, _id: req.params.id }
    )
      .then(() => {
        res.status(201).json({
          message: "Sauce updated successfully!",
        });
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  } else {
    res.status(401).json({
      message: "unauthorized modification",
    });
  }
};

//delete
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId == req.token.userId) {
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: "Objet supprimé !" }))
            .catch((error) => res.status(400).json({ error }));
        });
      } else {
        res.status(401).json({
          message: "unauthorized to delete",
        });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

//get all
exports.getAllSauce = (req, res, next) => {
  Sauce.find()
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

//get one
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id,
  })
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

//Like or dislike
exports.evaluateSauce = (req, res, next) => {
  const userId = req.body.userId;
  const like = req.body.like;
  const sauceId = req.params.id;
  
  Sauce.findOne({ _id: sauceId })
    .then((sauce) => {
      const userLike = sauce.usersLiked.includes(userId);
      const userDislike = sauce.usersDisliked.includes(userId);

      switch (like) {
        case 0:
          if (userLike) {
            sauce.likes -= 1;
            sauce.usersLiked = sauce.usersLiked.filter((id) => id !== userId);
          } else if (userDislike) {
            sauce.dislikes -= 1;
            sauce.usersDisliked = sauce.usersDisliked.filter(
              (id) => id !== userId
            );
          }
          break;

        case 1:
          if (userLike) {
            throw new Error("vous aimez déjà cette sauce !");
          }
          if (userDislike) {
            throw new Error(
              "vous n'aimez pas cette sauce, veuillez d'abord annuler votre dislike");
          }
          if (!userLike && !userDislike) {
            sauce.likes += 1;
            sauce.usersLiked.push(userId);
          }

          break;

        case -1:
          if (!userDislike && !userLike) {
            sauce.dislikes += 1;
            sauce.usersDisliked.push(userId);
          }
          if (userDislike) {
            throw new Error("vous n'aimez déjà pas cette sauce !");
          }
          if (userLike) {
            throw new Error(
              "vous aimez cette sauce, veuillez d'abord annuler votre like");
          }

          break;

        default:
          return res.status(400).json({ message: "error, invalid request" });
      }
      sauce
        .save()
        .then(() => res.status(201).json({ message: "ok" }))
        .catch((error) => {
          res.status(400).json({ error: error });
        });
    })
    .catch((error) => res.status(500).json({ error: error.message }));
};
