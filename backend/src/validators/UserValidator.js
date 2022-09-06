const { celebrate, Segments, Joi } = require('celebrate');

module.exports={
    create: celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
        })
    }),
    getById: celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            userId: Joi.string().required(),
        })
    }),
    update: celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            userId: Joi.string().required(),
        }),
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().optional(),
            email: Joi.string().optional(),
        })
        .min(1),
        [Segments.HEADERS]: Joi.object().keys({
            authorization: Joi.string().required(),
        }).unknown(),
    }),
    delete: celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            userId: Joi.string().required(),
        }),
        [Segments.HEADERS]: Joi.object().keys({
            authorization: Joi.string().required(),
        }).unknown(),
    }),
};