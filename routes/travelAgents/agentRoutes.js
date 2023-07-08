const express = require("express")
const authenticate = require("../../middlewares/authenticate")
const users = require("../../models/userModel")
const sendResponse = require("../../helpers/sharedHelpers")
const router = express.Router()

router.get(`/get-agencies`, authenticate, async(req, res)=> {
    try {
        const ss = await users.find({ user_type: 0 })
        sendResponse(res, 200, ss)
    } catch (error) {
        console.log(error)
        sendResponse(res, 400, {
            message: 'Failed to retrieve travel agencies'
        })
    }
})

module.exports = router
