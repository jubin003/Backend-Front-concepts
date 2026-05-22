import joi from 'joi';

export const schemaTask= joi.object({
    name:joi.string().required().messages({
        'any.required':"name field is needed"
    }),
    content:joi.string().required().messages({
        'any.required':"content field is needed"
    }),
    priority:joi.number().required().min(1).max(5).messages({
        'any.required':"priority of task is needed",
        'number.min':"minimun priority is 1",
        'number.max':"maximum priority is 5"
    })
})