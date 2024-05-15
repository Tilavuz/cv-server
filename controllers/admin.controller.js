const Admin = require('../models/admin.model')
const bcrypt = require('bcrypt') 
const { generateToken } = require('../helper/generateToken')


const getAdmins = async (_, res) => {
    try {
        const admins = await Admin.find({});
        res.json(admins);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
}

const postAdmin = async (req, res) => {
    try {
        const admin = new Admin(req.body);
        if (admin.userName && admin.password) {
            await admin.save(); // Save the admin first
            return res.status(201).json(admin); // Send response after saving
        }
        return res.status(400).json({ message: "Malumot to'liq emas!", status: false });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
}

const deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const admin = await Admin.findByIdAndDelete(id);
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.status(200).json({ message: "Admin deleted successfully", admin });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
}

const putAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const admin = await Admin.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.status(200).json({ message: "Admin updated successfully", admin });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
}

const login = async (req, res) => {
    try {
        const admin = await Admin.findOne({ userName: req.body.userName }).lean();
        if(!admin) {
            return res.json({ message: 'No such admin exists', status: false })
        }

        const result = await bcrypt.compare(req.body.password, admin.password)
        if(result) {
            const token = generateToken({
                userName: admin.userName,
                role: 'admin'
            })
            return res.status(200).json({ message: 'Login muvaffaqiyatli', token });
        }

        return res.json({ message: 'password is incorrect' })
    } catch (err) {
        console.error('Xatolik:', err);
        return res.status(500).send('Server xatosi');
    }
};


module.exports = { getAdmins, postAdmin, deleteAdmin, putAdmin, login }