const { hash } = require("bcrypt");
const { Schema, model } = require("mongoose");

const fieldOptions = {
    type: String,
    required: true,
};

const userSchema = new Schema(
    {
        name: { ...fieldOptions },
        email: { ...fieldOptions, unique: true },
        password: { ...fieldOptions },
        isAdmin: { type: Boolean, required: true, default: false },
        resetPasswordToken: { type: String, default: null },
        isRemoved: { ...fieldOptions, default: false },
        reasonToRemove: { type: String, default: null },
    },
    { versionKey: false, timestamps: true }
);

userSchema.pre("save", async function (next) {
    this.password = await hash(this.password, 10);
    next();
});

const User = model("users", userSchema);

module.exports = { User };
