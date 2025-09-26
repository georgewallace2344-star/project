
import User from "../model/User.js";

const handleLogout = async(req,res) => {

    const cookies = req.cookies;

    if(!cookies?.jwt) {

        return res.sendStatus(204); // Successful no content

    }

    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({refreshToken}).exec();

    if(!foundUser) {

        res.clearCookie("jwt", {httpOnly: true, sameSite: "None", maxAge: 24 * 60 * 60 * 1000});

        return res.sendStatus(204); // Successful no content

    }

    foundUser.refreshToken = "";

    const result = await foundUser.save();

    console.log(result);

    res.clearCookie("jwt",{httpOnly: true, sameSite: "None", maxAge: 24 * 60 * 60 * 1000});

    res.sendStatus(204); // Successful no content

}

export default { handleLogout };