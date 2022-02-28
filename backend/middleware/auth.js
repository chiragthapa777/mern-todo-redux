//middle ware func
//does jwt token exist
// verify the token
// next()
const jwt =require("jsonwebtoken");

function auth(req, res, next)
{
    //header works in key value pair so we are give key to get its value which is jwt token
    const token =req.header("x-auth-token")
    if(!token) return res.status(401).send("Not authorized...")
    try{
        const secretKey=process.env.SECRET_KEY
        const payload= jwt.verify(token, secretKey);
        //token verify gardine ani request ma user vanne add gardine ani balla next middeware ma control transfer garne
        req.user = payload;
        next()
    }catch(error)
    {
        res.status(400).send("invalid token")
    }

}

module.exports = auth;