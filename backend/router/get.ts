import express from "express";
import db from "../db";

const router = express.Router();

const READ = 1;
const STARRED = 2;
const SENT = 4;
const SPAM = 8;
const TRASHED = 16;


router.get("/filter/:sort", async (req, res) => {
    let variant = req.params.sort;
    try {
        switch (variant) {
            case 'inbox': {
                let letters = await db.any(`SELECT * FROM letter WHERE (status = 0 OR (status & ${READ}) != 0 OR (status & ${STARRED}) != 0) and not (status & ${TRASHED}) != 0  and not (status & ${SPAM}) != 0  and not (status & ${SENT}) != 0 ORDER BY data DESC`);
                return res.json({inbox: extractStatus(letters)});
            }
            case 'sent': {
                let letters = await db.any(`SELECT * FROM letter WHERE (status & ${SENT}) != 0 and not (status & ${TRASHED}) != 0  and not (status & ${SPAM}) != 0 ORDER BY data DESC`);
                return res.json({sent: extractStatus(letters)});
            }
            case 'starred': {
                let letters = await db.any(`SELECT * FROM letter WHERE (status & ${STARRED}) != 0  and not (status & ${TRASHED}) != 0 ORDER BY data DESC`);
                return res.json({starred: extractStatus(letters)});
            }
            case 'trash': {
                let letters = await db.any(`SELECT * FROM letter WHERE (status & ${TRASHED}) != 0 ORDER BY data DESC`);
                return res.json({trash: extractStatus(letters)});
            }
            case 'spam': {
                let letters = await db.any(`SELECT * FROM letter WHERE (status & ${SPAM}) != 0 and not (status & ${TRASHED}) != 0 and not (status & ${SENT}) != 0 ORDER BY data DESC`);
                return res.json({spam: extractStatus(letters)});
            }
        }
        return res.json([]);
    } catch (e) {
        return res.json({success: false, message: "ОШИБКА ПО РУССКИ"});
    }

});

router.get("/letter/:id_letter", async (req, res) => {
    let id = req.params.id_letter;
    let letter = await db.oneOrNone(`SELECT * FROM letter WHERE id = ${id}`);
    await db.none(`UPDATE letter SET status = status | ${READ} where id = ${id}`);
    return res.json({inbox: letter, is_read: true});
});

router.post("/search", async (req, res) => {
    let {searchString} = req.body;
    let found = await db.any(`SELECT * FROM letter WHERE title LIKE '%${searchString}%' order by data desc `)
    return res.json({success: true, search: found});

})

export default router;

// const set_bit = (status: number, bit: number) => status | bit; // return status with bit
const get_bit = (status: number, bit: number) => (status & bit) !== 0; //true/false
// const remove_bit = (status: number, bit: number) => status & ~bit; //return status without removing bit


const extractStatus = (letters: any[]): any[] => {
    return letters.map(c => {
        return {
            ...c,
            is_read: get_bit(c.status, READ),
            is_flag: get_bit(c.status, STARRED)
        }
    })
}
