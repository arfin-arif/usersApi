const { Router } = require("express");
const usersController = require("../../controllers/user.controller");
const router = Router();

router.route('/all')
    /**
       * @api {get} get all users 
       * @apiEndPoint http://localhost:5000/api/v1/users/all
       * if you want to get random user use limit like   
       * @apiEndPoint http://localhost:5000/api/v1/users/all?limit=1
       */
    .get(usersController.getAllUsers);

router.route('/random')
    /**
     * @api {get} get random user 
     *@apiEndPoint http://localhost:5000/api/v1/users/random
     */
    .get(usersController.getRandomUsers)


router.route('/save')
    /**
    * @api {post} /save post a ew user
    * @apiBody include body while requesting and the body should include all the user info
    * [{"id":"1","name":"Bonita Gilbert","gender":"female","contact":"555-555-5555","address":"95 Laurel Avenue, Homeland, Idaho","photoUrl":"url"}
    * @apiEndPoint http://localhost:5000/api/v1/users/save
    */
    .post(usersController.saveUser)

router.route('/update/:id')
    /**
    * @api {patch} /update/id update any portion of a user info 
    * @apiBody include body while requesting and the body should include the the user info that you want to update
    *@apiEndPoint http://localhost:5000/api/v1/users/update/640c8857c86d0d632eff3c1a
    */
    .patch(usersController.updateUsers)
router.route('/bulk-update')
    /**
     * @api {patch} /bulk-update update multiple users contact 
     * @apiBody include body while requesting and the body should look like this 
     * { "updates": [ {  "id": "1","contact": "555-555-5555" },{"id": "2","contact": "123-456-7890" }]}   
     * @apiEndPoint  http://localhost:5000/api/v1/users/bulk-update
     */
    .patch(usersController.updateMultipleUsers)

router.route('/delete/:id')
    /**
     * @api {delete} /delete/id delete any user by id
     * @apiEndPoint  http://localhost:5000/api/v1/users/delete/20
     */
    .delete(usersController.deleteUser)

module.exports = router;