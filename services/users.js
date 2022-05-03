const encrypt = require("../permit/crypto.js");
const auth = require("../permit/auth");
var nodemailer = require('nodemailer')
const fs = require('fs');

const setUser = async (model, user, context) => {
    const log = context.logger.start("services:users:setUser");

    if (model.name !== "string" && model.name !== undefined) {
        user.name = model.name;
    }

    if (model.fcmToken !== "string" && model.fcmToken !== undefined) {
        user.fcmToken = model.fcmToken;
    }

    if (model.sex !== "string" && model.sex !== undefined) {
        user.sex = model.sex;
    }

    if (model.status !== "string" && model.status !== undefined) {
        user.status = model.status;
    }

    if (model.dob !== "string" && model.dob !== undefined) {
        user.dob = model.dob;
    }

    if (model.loc !== "string" && model.loc !== undefined) {
        user.loc = model.loc;
    }
    log.end();
    await user.save();
    return user;
};
//register user

const buildUser = async (model, context) => {
    const { email, password, name, dob, fcmToken } = model;
    const log = context.logger.start(`services:users:buildUser${model}`);
    const user = await new db.user({
        email: email,
        name: name,
        dob: dob,
        password: password,
        fcmToken: fcmToken
    }).save();
    log.end();
    return user;
};

const create = async (model, context) => {
    const log = context.logger.start("services:users:create");
    let user = await db.user.findOne({ email: model.email });
    if (user) {
        throw new Error("user already exists");
    } else {
        model.password = encrypt.getHash(model.password, context);
        user = buildUser(model, context);
        log.end();
        return user;
    }

};

// login 

const login = async (model, context) => {
    const log = context.logger.start("services:users:login");
    const user = await db.user.findOne({ email: model.email })
    if (!user) {
        log.end();
        throw new Error("user not found");
    }
    if (user.status === 'inactive') {
        throw new Error("user Is inactive please contact with admin");
    }
    const isMatched = encrypt.compareHash(model.password, user.password, context);
    if (!isMatched) {
        log.end();
        throw new Error("password mismatch");
    }
    const token = auth.getToken(user.id, false, context);
    user.updatedOn = new Date();
    await user.save();
    user.token = token;
    user.fcmToken =model.fcmToken;
    log.end();
    return user;
};
// change password

const resetPassword = async (id, model, context) => {
    const log = context.logger.start(`service/users/resetPassword`);
    if (!id) {
        throw new Error("user id is required");
    }
    let user = await db.user.findById(id)
    if (!user) {
        log.end();
        throw new Error("user is not found");
    }
    const isMatched = encrypt.compareHash(
        model.oldPassword,
        user.password,
        context
    );

    if (isMatched) {
        const newPassword = encrypt.getHash(model.newPassword, context);
        user.password = newPassword;
        user.updatedOn = new Date();
        await user.save();
        log.end();
        return "Password Updated Successfully";
    } else {
        log.end();
        throw new Error("Old Password Not Match");
    }

};

const getUserById = async (id, context) => {
    const log = context.logger.start(`services:users:getUserById`);
    if (!id) {
        throw new Error("user id is required");
    }
    let user = await db.user.findById(id)
    if (!user) {
        throw new Error("user not found");
    }
    log.end();
    return user;
};

const update = async (id, model, context) => {
    const log = context.logger.start(`services:users:update`);
    let entity = await db.user.findById(id)
    if (!entity) {
        throw new Error("invalid user");
    }
    const user = await setUser(model, entity, context);
    log.end();
    return user
};

const search = async (name, context) => {
    const log = context.logger.start(`services:users:search`);
    if (!name) {
        throw new Error("name is required");
    }
    const users = await db.user.find({ name: { "$regex": '.*' + name + '.*', "$options": 'i' } }).limit(5);
    return users
};

const list = async (context) => {
    const log = context.logger.start(`services:users:list`);
    const users = await db.user.find()
    log.end()
    return users
};

const buildOtp = async (user, context) => {
    const log = context.logger.start('services:users:buildOtp')
    // four digit otp genration logic
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    let message = `hi ${user.name} Your 4 digit One Time Password: <br>${OTP}<br></br>
              otp valid only 4 minutes`
    let = subject = "One Time Password"
    const isEmailSent = await sendMail(user.email, message, subject)
    if (!isEmailSent) {
        throw new Error('something went wrong')
    }
    const otpToken = auth.getOtpToken(OTP, user.id, true, context)
    log.end()
    let data = {
        token: otpToken
    }
    log.end()
    return data
}

const otpVerify = async (model, token, context) => {
    const log = context.logger.start('services:users:otpVerify')
    const otpDetail = await auth.extractToken(token, context)
    if (otpDetail.otp.name === "TokenExpiredError") {
        throw new Error("otp expired");
    }
    if (otpDetail.otp.name === "JsonWebTokenError") {
        throw new Error("otp is invalid");
    }
    if (otpDetail.otp !== undefined && otpDetail.otp != model.otp) {
        throw new Error("please enter valid otp");;
    }
    log.end()
    return "otp verify successfully"
}


const changePassword = async (model, token, context) => {
    const log = context.logger.start('services:users:changePassword')
    const otpDetail = await auth.extractToken(token, context)
    if (otpDetail.otp.name === "TokenExpiredError") {
        throw new Error("session expired please try again");
    }
    if (otpDetail.otp.name === "TokenExpiredError") {
        throw new Error("session expired please try again");
    }
    if (otpDetail.otp == undefined || otpDetail.otp.name === "JsonWebTokenError") {
        throw new Error("token is invalid");
    }
    let user = context.user
    user = await db.user.findById(user.id);
    if (!user) {
        throw new Error("user not found");
    }
    const newPassword = encrypt.getHash(model.newPassword, context);
    user.password = newPassword;
    user.updatedOn = new Date();
    await user.save();
    log.end()
    return "password updated successfully"
}

// forgetPassword
const forgotPassword = async (model, context) => {
    const log = context.logger.start('services:users:forgotPassword')
    const user = await db.user.findOne({ email: { $eq: model.email } });
    if (!user) {
        throw new Error("The email address " + model.email + " is not associated with any account. Please check your email address and try again.");
    }
    const data = await buildOtp(user, context)
    if (!data) {
        throw new Error('something went wrong')
    }
    log.end()

    return data
}

const sendMail = async (email, message, subject) => {
    var smtpTrans = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: `ourmallapp@gmail.com`,
            pass: `myMall@321`
        }
    });
    // email send to registered email
    var mailOptions = {
        from: 'myMall',
        to: email,
        subject: subject,
        html: message
    };
    let mailSent = await smtpTrans.sendMail(mailOptions)
    if (mailSent) {
        console.log("Message sent: %s", mailSent.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(mailSent));
        return true
    } else {
        throw new Error("Unable to send email try after sometime");
    }
}

const imageUpload = async (id, files, context) => {
    const log = context.logger.start(`services:users:imageUpload`);
    let fileName = files[0].filename.replace(/ /g, '')
    let file = files[0]
    if (!id) {
        throw new Error("user id is required");
    }
    let user = await db.user.findById(id)
    if (!user) {
        throw new Error("user not found");
    }
    if (files == undefined && files.length < 0) throw new Error("image is required");
    if (user.profileImageName != "") {
        const path = file.destination + '/' + user.profileImageName
        try {
            fs.unlinkSync(path);
            console.log(`image successfully removed from ${path}`);
        } catch (error) {
            console.error('there was an error to remove image:', error.message);
        }
    }
    user.profileImageName = fileName
    await user.save()
    log.end();
    return 'image uploaded successfully'
};

exports.login = login;
exports.create = create;
exports.search = search;
exports.getUserById = getUserById;
exports.resetPassword = resetPassword;
exports.forgotPassword = forgotPassword;
exports.update = update;
exports.buildOtp = buildOtp;
exports.changePassword = changePassword;
exports.otpVerify = otpVerify;
exports.imageUpload = imageUpload;
exports.list = list;