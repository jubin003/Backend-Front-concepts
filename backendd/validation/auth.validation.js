import joi from 'joi';

export const schemaRegister= joi.object({
    name:joi.string().min(5).max(30).required().messages({
            'string.min':"name should be greater than 5 letter",
            'string.max':"name should be smaller then 30",
            'any.requied': "name field is required"
        }),
    
    email:joi.string().email().required().messages({
        'string.email':"should be in a standard mail format",
        'any.required':"email field is required"
    }),

    password:joi.string().min(8).required().messages({
        'string.min':"password should atleast have 8 letters",
        'any.required':"password field is required"
    })

}
);

export const schemaLogin= joi.object({
    email:joi.string().email().required().messages({
        'string.email':"should be email format",
        'any.required':"field is required"
    }),

    password:joi.string().min(8).required().messages({
            'string.min':"atleast 8",
            'any.required':"field is required"
    })
})