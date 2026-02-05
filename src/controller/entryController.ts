import {Request, Response} from "express"

export function entryCreate(request: Request, response: Response) {
    response.status(200).send("entry created");
}

export function entryGetData(request: Request, response: Response) {
    let body = "Data Dummy";
    console.log("Requested data from Entry");
    response.status(200).send(body);
}

export function entryGetAll(request: Request, response: Response) {
    let body = "Insert All Entries here";
    console.log("Requested every Entry");
    response.status(200).send(body);
}