import jwt from "jsonwebtoken";
import { errorHandler } from './error.js'


export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        return next(errorHandler(401, 'Unautorized'));
    };

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(errorHandler(401, 'Unautorized'));
        };

        req.user = user;
        next();
    });
};

// export const checkSuperAdmin = async (req, res, next) => {
//     try {
//         const superAdminId = req.body.superAdminId;
//         const superAdmin = await User.findById(superAdminId);

//         if (!superAdmin || !superAdmin.superAdmin) {
//             return res.status(403).json({ message: 'Access denied. Only super admins can perform this action.' });
//         }

//         next();
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };