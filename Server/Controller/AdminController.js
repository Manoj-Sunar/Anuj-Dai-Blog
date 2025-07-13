import { BlogModel } from "../Models/BlogModelSchema.js";
import UsersRegisterModel from "../Models/UsersRegisterModel.js";

export const AdminLogin = async (req, res) => {

    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ status: false, msg: 'All Field are required' });
        }

        const isAdmin = await UsersRegisterModel.findOne({ email: email });

        if (!isAdmin) {
            return res.status(404).json({ status: false, msg: 'Invalid credentials' });
        }

        const loginPassword = await isAdmin.comparePassword(password);

        if (!loginPassword) {

            return res.status(404).json({ status: false, msg: 'Invalid credentials' });
        }

        if (!isAdmin || isAdmin.isAdmin === false) {

            return res.status(404).json({ status: false, msg: 'You are Unable to login' });
        }

        return res.status(201).json({ status: true, msg: 'Login successfully', isAdmin, token: await isAdmin.generateToken() });


    } catch (error) {
        console.log(error);
    }
}


export const getDashboardSummary = async (req, res) => {
    try {

        if (!req.user || req.user.isAdmin === false) {
            return res.status(404).json({ status: false, msg: 'you are unauthorized to access' });
        }

        const totalBlogs = await BlogModel.countDocuments();
        const totalUsers = await UsersRegisterModel.countDocuments();
        const totalCommentsAgg = await BlogModel.aggregate([
            { $unwind: "$activity.comments" },
            { $count: "totalComments" }
        ]);


        const totalLikesAgg = await BlogModel.aggregate([
            { $unwind: "$activity.likes" },
            { $count: "totalLikes" }
        ]);

        const totalComments = totalCommentsAgg[0]?.totalComments || 0;
        const totalLikes = totalLikesAgg[0]?.totalLikes || 0;

        res.status(200).json({
            status: true,
            totalBlogs,
            totalUsers,
            totalComments,
            totalLikes
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};


// for charts
export const getBlogsOverTime = async (req, res) => {
    try {


        if (!req.user || req.user.isAdmin === false) {
            return res.status(404).json({ status: false, msg: 'Unauthorized accesss' });
        }


        const result = await BlogModel.aggregate([
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    blogs: { $sum: 1 }
                }
            },
            {
                $project: {
                    month: "$_id",
                    blogs: 1,
                    _id: 0
                }
            },
            { $sort: { month: 1 } }
        ]);

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const mapped = result.map(item => ({
            date: months[item.month - 1],
            blogs: item.blogs
        }));

        res.status(200).json({ status: true, mapped });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching blog stats' });
    }
};



export const getCategoryStats = async (req, res) => {
    try {



        if (!req.user || req.user.isAdmin === false) {
            return res.status(404).json({ status: false, msg: 'Unauthorized accesss' });
        }

        const result = await BlogModel.aggregate([
            { $unwind: "$tags" },
            {
                $group: {
                    _id: "$tags",
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    category: "$_id",
                    count: 1,
                    _id: 0
                }
            }
        ]);

        res.status(200).json({ status: true, result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching category stats' });
    }
};
