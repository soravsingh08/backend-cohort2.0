export async function registerController(req, res, next) {
    try {
        throw new Error("Encounter an error while registering new user");
    } catch (err) {
        err.status = 400;
        next(err);
    }

}