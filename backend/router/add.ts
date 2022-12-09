import express from "express";
import db from "../db";

const router = express.Router();

const READ = 1;
const STARRED = 2;
const SENT = 4;
const SPAM = 8;
const TRASHED = 16;


router.post("/no_read/:id_letter", async (req, res) => {
    try {
        let data_id_success : {[k : string] : {success : boolean, is_read: boolean, message : string}}= {};
        for (let id of req.params.id_letter.split(',')) {
            let read = await db.oneOrNone(`SELECT * FROM letter WHERE id = ${id} and (status & ${READ}) != 0`);
            if (!read) {
                await db.none(`UPDATE letter SET status = status | ${READ} where id = ${id}`);
                data_id_success[id] = {success: true, is_read: true, message: "Add read works"};
            }
        }
        res.json(data_id_success);
    } catch (e) {
        res.json({success: false, message: "Прочитано не робит"});
    }
});

router.post("/read/:id_letter", async (req, res) => {
    try {
        let data_id_success : {[k : string] : {success : boolean, is_read: boolean, message : string}}= {};
        for (let id of req.params.id_letter.split(',')) {
            let read = await db.oneOrNone(`SELECT * FROM letter WHERE id = ${id} and (status & ${READ}) != 0`);
            if (read) {
                await db.none(`UPDATE letter SET status = status & ~${READ} where id = ${id}`);
                data_id_success[id] = {success: true, is_read: false, message: "Remove read works"};
            }
        }
        res.json(data_id_success);
    } catch (e) {
        res.json({success: false, message: "Прочитано не робит"});
    }
});

router.post("/starred/:id_letter", async (req, res) => {
    try {
        let data_id_success : {[k : string] : {success : boolean, is_flag: boolean, message : string}}= {};
        for (let id of req.params.id_letter.split(',')) {
            let starred = await db.oneOrNone(`SELECT * FROM letter WHERE id = ${id} and (status & ${STARRED}) != 0`);
            if (starred) {
                await db.none(`UPDATE letter SET status = status & ~${STARRED} where id = ${id}`);
                data_id_success[id] = {success: true, is_flag: false, message: "Remove flag works"};
            } else {
                await db.none(`UPDATE letter SET status = status | ${STARRED} where id = ${id}`);
                data_id_success[id] = {success: true, is_flag: true, message: "Add flag works"};
            }
        }
        res.json(data_id_success);
    } catch (e) {
        res.json({success: false, message: "Флаг не робит"});
    }
});

router.post("/spam/:id_letter", async (req, res) => {
    try {
        let data_id_success : {[k : string] : {success : boolean, is_spam: boolean, message : string}}= {};
        for (let id of req.params.id_letter.split(',')) {
            let spam = await db.oneOrNone(`SELECT * FROM letter WHERE id = ${id} and (status & ${SPAM}) != 0`);
            if (spam) {
                await db.none(`UPDATE letter SET status = status & ~${SPAM} where id = ${id}`);
                data_id_success[id] = {success: true, is_spam: false, message: "Remove spam works"};
            } else {
                await db.none(`UPDATE letter SET status = status | ${SPAM} where id = ${id}`);
                data_id_success[id] = {success: true, is_spam: true, message: "Add spam works"};
            }
        }
        res.json(data_id_success);
    } catch (e) {
        res.json({success: false, message: "Спам не робит"});
    }
});

router.post("/trash/:id_letter", async (req, res) => {
    try {
        let data_id_success : {[k : string] : {success : boolean, is_trash: boolean, message : string}}= {};
        for (let id of req.params.id_letter.split(',')) {
            let trashed = await db.oneOrNone(`SELECT * FROM letter WHERE id = ${id} and (status & ${TRASHED}) != 0`);
            if (trashed) {
                await db.none(`UPDATE letter SET status = status & ~${TRASHED} where id = ${id}`);
                data_id_success[id] = {success: true, is_trash: false, message: "Remove trash works"};
            } else {

                await db.none(`UPDATE letter SET status = status | ${TRASHED} where id = ${id}`);
                data_id_success[id] = {success: true, is_trash: true, message: "Add trash works"};
            }
        }
        res.json(data_id_success);
    } catch (e) {
        res.json({success: false, message: "Мусорка не робит"});
    }

});


export default router;

// const set_bit = (status: number, bit: number) => status | bit; // return status with bit
// const get_bit = (status: number, bit: number) => (status & bit) !== 0; //true/false
// const remove_bit = (status: number, bit: number) => status & ~bit; //return status without removing bit
