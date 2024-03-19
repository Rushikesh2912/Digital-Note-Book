var jwt = require('jsonwebtoken');   //for verfiy the user and send token by JWT
//when user change something in verfying token then JWT_SECRET check that
const JWT_SECRET = 'RUshikesh$db';

const fetchuser = (req, res, next) =>{
    //get the user from the JWT token and add the id to request the object
    const token = req.header('Authorization');
    if(!token){
        res.status(401).send({error : "Please provide a valid token"});
    }
    try {
         // Verify  the token using the JWT_SECRET
        const data = jwt.verify(token, JWT_SECRET);
        // Attach the user information to the request object
        req.user = data.user;
        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
         // Handle token verification errors
        res.status(401).send({error : "Invalid token"});
    }
}
module.exports = fetchuser;