//authentication middleware
const authMiddleware = (req, res, next) => {
    if(req.session.userId){
        next();
    }else{
        res.status(401).json({ message: 'Unauthorized' });
    }
}


module.exports = authMiddleware;