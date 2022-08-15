import PostModel from '../models/Post.js';

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();

        res.json(posts);
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Article creation fail',
        });
    }
};

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;

        PostModel.findOneAndUpdate({
                _id: postId,
            }, {
                $inc: {
                    viewsCount: 1,
                },
            }, {
                returnDocument: 'after',
            },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'Can not receive the article',
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'No article found',
                    });
                }

                res.json(doc);
            },
        );
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Article creation fail',
        });
    }
};

export const remove = async (req, res) => {
    try {
        const postId = req.params.id;

        PostModel.findOneAndDelete({
                _id: postId,
            },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'Can not delete the article',
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'No article found',
                    });
                }

                res.json({
                    success: true,
                });
            },
        );
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Article creation fail',
        });
    }
};

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        });

        const post = await doc.save();
        console.log(post);
        res.json(post);
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Article creation fail',
        });
    }
};

export const update = async (req, res) => {
    try {
        const postId = req.params.id;

        await PostModel.updateOne({
            _id: postId,
        }, {
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            user: req.userId,
            tags: req.body.tags,
        }, );

        res.json({
            success: true,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Article update fail',
        });
    }
};