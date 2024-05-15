const Project = require("../models/project.model")

const getProjects = async (_, res) => {
    try {
        const projects = await Project.find({}, { 'title': 1, 'desc': 1, 'createDate': 1, 'contents': {$slice:1} })
        return res.json(projects)
    }catch (err) {
        console.log(err);
        return res.json({ message: "There is an error", status: false })
    }
}

const getProject = async (req, res) => {
    try{
        const { id } = req.params
        const project = await Project.findById(id)
        if(project) return res.json(project)
        
        return res.json({message: "Data not found", status: false})

    }catch (err) {
        console.log(err);
        return res.json({ message: "There is an error", status: fasle })
    }
}

const putProject = async (req, res) => {
    try {
        const { id } = req.params
        const project = await Project.findByIdAndUpdate(id, req.body, { new: true })
        if (!project) {
            return res.status(404).json({ message: "Data not found", status: false });
        }
        return res.json(project)
    }catch(err) {
        console.log(err);
        return res.json({ message: "There is an error", status: fasle })
    }
}

const postProject = async (req, res) => {
    try {
        const project = new Project(req.body)
        if(project.title && project.desc) {
            await project.save()
            return res.json({ message: "Project created", project })
        }

        return res.json({message: "The information is incomplete", status: false})

    }catch(err) {
        console.log(err);
        return res.json({ message: "There is an error", status: fasle })
    }
}

const deleteProject = async (req, res) => {
    try {
        const { id } = req.params
        const project = await Project.findByIdAndDelete(id)
        if(project) return res.json({ message: "Post o'chirib yuborildi", status: true })
        res.json({ message: "data could not be deleted", status: false })
    }catch(err) {
        console.log(err);
        return res.json({message: "There is an error", status: false});
    }    
}



module.exports = { getProjects, postProject, deleteProject, getProject, putProject }