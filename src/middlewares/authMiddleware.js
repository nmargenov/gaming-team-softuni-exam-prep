const { SECRET } = require("../config/config");
const { verify } = require("../lib/jwt");

exports.auth = async(req,res,next)=>{
    const token = req.cookies['auth'];
    
    if(token){
        try{
            const decodedToken = await verify(token,SECRET);
            
            req.user = decodedToken,
            res.locals.isLogged = true;

            next();
        }catch(err){
            res.clearCookie('auth');

            res.redirect('/login');
        }
    }else{
        next();
    }
};