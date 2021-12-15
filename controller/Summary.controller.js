const Summary = require('../model/Summary')

export const getSummaryById = (req,res,next) => {
    const ownerId = req.params.ownerId
    return Summary.findById(ownerId).then(result => {
        return res.status(200).json({
            message: 'successful',
            status:1,
            result: result
        })
    })
}