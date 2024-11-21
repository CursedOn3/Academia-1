import jwt from 'jsonwebtoken';

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token) return res.status(401).json({ success: false, msg: "User not authenticated" });

        const decode = await jwt.verify(token, process.env.secreteKey);
        if(!decode) return res.status(401).json({ success: false, msg: "Invalid Token" });

        req.id = decode.userID;

        next();

    } catch (error) {
        console.log(error);
    }
}

export default isAuthenticated;