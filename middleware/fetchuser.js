import jwt from 'jsonwebtoken';
const JWT_SECRET = 'TaskManager@123';

const fetchuser = (req, res, next) => {
    try {
        console.log("fetchuser backend")
        // Get the user from the jwt token and add id to req object
        const token = req.header('auth-token');
        console.log(req.header)
        // console.log("kjl",token)
        if (!token) {
            // console.log(token)
            return res.status(401).send({ error: "Please authenticate using a valid token" })
        }

        const data = jwt.verify(token, JWT_SECRET);
        console.log("middle ware data",data);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }

}


export default fetchuser;