const { Schema, model } = require("mongoose")

const ProjectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        default: new Date()
    },
    desc: {
        type: String,
        required: true
    },
    contents: {
        type: [{
            imgUrl: {
                type: String,
                required: true
            },
            desc: {
                type: String,
                required: true
            }
        }],
        default: []
    }
})




const Project = model("Project", ProjectSchema)


module.exports = Project