"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const google_auth_library_1 = require("google-auth-library");
// image stuff
const { createReadStream } = require('fs');
const { v4: uuidv4 } = require('uuid');
const { GraphQLUpload } = require('graphql-upload');
const jwt = require('jsonwebtoken');
const client_id = "10547820426-g94ke317qjsssctc8epuear86u5tf7vp.apps.googleusercontent.com";
const googleClient = new google_auth_library_1.OAuth2Client({
    clientId: `${client_id}`,
    clientSecret: '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'
});
var mongoose = require("mongoose"), Schema = mongoose.Schema;
var UserSchema = new Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    resCollege: String,
    phoneNumber: String,
    gradYear: String,
    major: String,
    minor: String,
    pronouns: String,
    sex: String,
    onCampus: Boolean,
    roomType: String,
    numRoommates: String,
    genderPref: String,
    overnightGuests: Boolean,
    presence: String,
    roomTemp: String,
    bedTime: String,
    wakeTime: String,
    personality: [String],
    outingFrequency: String,
    neatness: String,
    smoker: String,
    noise: String,
    pfp: String,
    auth: {
        google: {
            id: String,
            token: String
        }
    },
    newUser: Boolean,
}, {
    methods: {
        generateJWT() {
            const today = new Date();
            const expirationDate = new Date(today);
            expirationDate.setDate(today.getDate() + 60);
            return jwt.sign({
                email: this.email,
                id: this._id,
                exp: expirationDate.getTime() / 1000,
            }, 'secret');
        }
    },
    statics: {
        upsertGoogleUser(email) {
            return __awaiter(this, void 0, void 0, function* () {
                const User = this;
                const user = yield User.findOne({ 'email': email });
                // no user was found, lets create a new one
                if (!user) {
                    console.log('no user found');
                    console.log(email);
                    const newUserDict = yield User.create({
                        name: "defaultName",
                        email: email,
                        newUser: true,
                    });
                    // newUser.save() maybe
                    return newUserDict;
                }
                return user;
            });
        },
        findUsers() {
            return __awaiter(this, void 0, void 0, function* () {
                let doc = yield exports.User.find();
                return doc;
            });
        },
        updateUser(filter, update) {
            return __awaiter(this, void 0, void 0, function* () {
                //first process image
                console.log("input");
                console.log(update);
                var updatedUser = {};
                if (update.pfp) {
                    // const { filename, mimetype, createReadStream } = await update.pfp
                    // const ext = mimetype.split('/')[1]
                    // const newFilename = `${uuidv4()}.${ext}`
                    // Store the uploaded image data in MongoDB as a Base64-encoded string
                    const buffer = yield update.pfp.buffer();
                    const base64Image = buffer.toString('base64');
                    console.log("base 64");
                    console.log(base64Image);
                    updatedUser = Object.assign(Object.assign({}, update), { "pfp": base64Image });
                }
                else {
                    updatedUser = update;
                }
                let doc = yield exports.User.findOneAndUpdate(filter, updatedUser);
                console.log("output");
                console.log(doc);
                return doc;
            });
        }
    }
});
UserSchema.methods.generateJWT = function () {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);
    return jwt.sign({
        email: this.email,
        id: this._id,
        exp: expirationDate.getTime() / 1000,
    }, 'secret');
};
exports.User = mongoose.model("User", UserSchema);
//# sourceMappingURL=User.js.map