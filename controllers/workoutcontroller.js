const Express = require("express");
const { usernameController } = require(".");
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");

router.get("/workoutlog", (req,res) =>{
    res.send("Hey This is the workout route")
});

router.get("/about", (req,res)=>{
    res.send("This is the about route");
});

router.post("/create", validateJWT, async(req,res) =>{
    const {title, date, entry} = req.body.user;
    const {id} = req.user;
    const journalEntry = {
        title,
        date,
        entry,
        owner : id
    }
    try{
        const newJournal = await JournalModel.create(journalEntry);
        res.status(200).json(newJournal);
    }catch(err){
        res.status(500).json({error:err});
    }
    JournalModel.create(journalEntry)
});

router.get("/about", (req, res) =>{
    res.send("This is the about route!")
});

/*
=======================
Get all Journals
=======================

*/

router.get("/", async (req,res)=>{
    try{
        const entries = await UsernameModel.findAll();
        res.status(200).json(entries);
    } catch(err){
        res.status(500).json({error:err});
    }
});

/*
====================
Get Journals by User
====================
*/

router.get("/mine", validateJWT, async (req, res)=>{
    let id = req.user.id;
    try{
        const userJournals = await UsernameModel.findAll({
            where:{
                owner: id
            }
        });
        res.status(200).json(UsernameModel);
    }catch(err){
        res.status(500).json({error:err});
    }
});

/*
=========================
Get Journals by title
=========================
*/

router.get("/:title", async(req, res)=>{
    const {title} = req.params;
    try{
        const results = await UsernameModel.findAll({
            where:{title:title}
        });
        res.status(200).json(results);
    }catch(err){
        res.status(500).json({error:err});
    }
});

/*
==============
Update Journal
==============
*/
router.put("/update/:entryId", validateJWT, async (req,res)=>{
    const {title, date, entry} = req.body.user;
    const userId = req.params.entryId;
    const userId = req.user.id;

    const query = {
        where:{
            id: usernameId,
            owner: userId
        }
    };

    const updatedUsername = {
        title: title,
        date: date,
        entry: entry
    };

    try{
        const update = await UsernameModel.update(updatedUsername, query);
        res.status(200).json(update);
    }catch(err){
        res.status(500).json({error:err});
    }
});

/*
====================
Delete a Journal
====================
*/
router.delete("/delete/:id", validateJWT, async (req,res)=>{
    const ownerId = req.user.id;
    const journalId = req.params.entryId;

    try{
        const query = {
            where:{
                id: usernameId,
                owner: ownerId
            }
    };

    await UsernameModel.destroy(query);
    res.status(200).json({message:"Username Entry Removed"});
}catch(err){
    res.status(500).json({error: err});
}
})

module.exports = router;

