import rateLimit from 'express-rate-limit'

export const allRateLimit= rateLimit({
    windowMs:1*60*1000,
    max:40,
    message:{message:'only 40 request per minute'}

})