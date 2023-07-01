import {Request, Response, NextFunction} from 'express';


// Catch all routes that are not found
const notFound = (req: Request, res: Response, next: NextFunction) => {
    const error: Error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}


// If we put error as the first parameter, express will know that this is an error handler
const errorHandler = (err:Error, req: Request, res: Response, next: NextFunction) => {
    let statusCode: number = res.statusCode === 200 ? 500 : res.statusCode
    let message: string = err.message

    // If the error is a Mongoose error, we want to send a more user friendly message
    //@ts-ignore
    if (err.name === "CastError" && err.kind === "ObjectId") {
        statusCode = 404
        message = "Resource not found"
    }

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack
    })
}


export {notFound, errorHandler}