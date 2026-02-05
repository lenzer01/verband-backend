import {Request, Response} from "express"

export function user_delete(request: Request, response: Response ) {

    let body = "Hello World"; 
    console.log("Hello World");
    response.status(200).send(body);
}

export function user_create(request: Request, response: Response) {
    let body = "User created";
    console.log("User created");
    response.status(200).send(body);
}