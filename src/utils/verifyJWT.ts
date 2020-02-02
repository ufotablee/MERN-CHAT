import jwt from 'jsonwebtoken'


export default (token: any) => 
    new Promise( (resolve,reject) => {
        jwt.verify(token, process.env.JWT_KEY || '', (err: any, decodedToken : any) => {
            if( err || !decodedToken) {
                return reject(err)
            }
            resolve(decodedToken)
        });
    });
