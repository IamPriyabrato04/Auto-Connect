import jwt from "jsonwebtoken";
const authenticateUser = (req, res, next) => {
    var _a;
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        console.log("No token provided");
        res.status(401);
        return;
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // 🔥 Important
        console.log("Middleware triggered");
        console.log("Auth Header:", req.headers.authorization);
        console.log("Token:", token);
        next();
    }
    catch (error) {
        console.log("err: ", error);
        res.status(403).json({ message: "Invalid or expired token" });
        return;
    }
};
export default authenticateUser;
