import { myDataSource2Pg } from '../routes/routes';
export function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}
export function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    return next();
}
export async function getUserByEmail(email) {
    try {
        console.log('****');
        const repo = await myDataSource2Pg.getRepository('User');
        console.log('repo ', repo);
        const user = await repo.findOne({ where: { email } });
        return user;
    }
    catch (error) {
        console.error('Error executing query:', error);
    }
    return undefined;
}
export async function getUserById(id) {
    try {
        const repo = await myDataSource2Pg.getRepository('User');
        const foundUser = await repo.findOne({ where: { id } });
        return foundUser;
    }
    catch (error) {
        console.error('Error executing query:', error);
    }
    return undefined;
}
