import dotenv from "dotenv";
dotenv.config();

function handleError(err, req, res, next) {
    res.status(err.status).json({
        message: err.message,

    }
    )
    if (process.env.NODE_ENVIRONMENT === "development") {
        res.stack = err.stack;
    }

    res.status(err.status ).json(response)
}

export default handleError;