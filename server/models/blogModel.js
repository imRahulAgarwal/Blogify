const { Schema, model } = require("mongoose");
const { SERVER_DOMAIN } = process.env;

const fieldOptions = {
    type: String,
    required: true,
};

const blogSchema = new Schema(
    {
        title: { ...fieldOptions },
        content: { ...fieldOptions },
        image: { ...fieldOptions },
        userName: { ...fieldOptions },
        userId: { type: Schema.Types.ObjectId, required: true },
        status: { ...fieldOptions, enum: ["Approved", "Pending", "Rejected"] },
        byAdmin: { type: Boolean, default: false, required: true },
    },
    { versionKey: false, timestamps: true }
);

blogSchema.post("find", function (docs) {
    docs.forEach((doc) => {
        doc.image = `${SERVER_DOMAIN}/${doc.image}`;
    });
});

blogSchema.post("findOne", function (doc) {
    if (doc) {
        doc.image = `${SERVER_DOMAIN}/${doc.image}`;
    }
});

const Blog = model("blogs", blogSchema);

module.exports = { Blog };
