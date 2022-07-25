async function ValidateGameAvailability(req, res, next) {
    const game = res.locals.game;

    if (game[0].stockTotal > 0) next();
    else return res.sendStatus(400);
}

export default ValidateGameAvailability;