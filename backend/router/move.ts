import express from "express";
import db from "../db";

const router = express.Router();

const READ = 1;
const STARRED = 2;
const SENT = 4;
const SPAM = 8;
const TRASHED = 16;


router.post("/new_letter", async (req, res) => {
    try {
        let title = req.body.title;
        let text = req.body.text;
        let sender = req.body.sender;

        await db.none(`INSERT INTO letter (title, text, status, sender) VALUES( '${title}', '${text}', ${READ} + ${SENT} ,'lena')`);

        res.json({success: true, is_sent: true, message: "New letter done"})

    } catch (e) {
        return res.json({success: false, message: `ОШИБКА НОВОГО ПИСЬМА`});
    }

});

router.post("/delete_letter/:id_letter", async (req, res) => {
    try{
        for (let id of req.params.id_letter.split(',')) {
            await db.none(`DELETE FROM letter WHERE id = ${id} and (status & ${TRASHED}) != 0`);
        }
        return res.json({success: true, message: "Remove done"});
    }catch (e) {
        res.json({success: false, message: "Удалялка по id не робит"});
    }

});



export default router;

// const set_bit = (status: number, bit: number) => status | bit; // return status with bit
// const get_bit = (status: number, bit: number) => (status & bit) !== 0; //true/false
// const remove_bit = (status: number, bit: number) => status & ~bit; //return status without removing bit
