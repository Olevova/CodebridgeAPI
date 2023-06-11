const Joi = require('joi');

const dogValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(1).required(),
        color: Joi.string().required(),
        tail_length: Joi.number().min(0),
        weight: Joi.number().min(0).max(150)
    })
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        res.status(400).json({ message: validationResult.error.details[0].message })
        next(error);
    }
    next();
};
module.exports = dogValidation;