import { verifyJWT } from '../utils'


export default (
    req : any, 
    res : any,
    next : any,
) => {

    if(req.path === "/user/signin" ||
       req.path === "/user/signup" ||
       req.path === "/user/verify" ||
       req.path === "/favicon.ico")
       {
        return next()
    }

    const token = req.headers.token

    verifyJWT(token)
    .then( (user : any) => {
        req.user = user.data._doc
        next();
    })
    .catch( () => {
        res.status(403)
            .json({
                message: 'invalid auth token provided'
            })
    })
};