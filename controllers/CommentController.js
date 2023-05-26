import CommentModel from "../models/Comment.js";


export const create = async (req, res) => {
    try{
        console.log(req.body)
        const doc = new CommentModel({
            author: req.body.author,
            text: req.body.text,
            postId: req.body.postId,
            authorUrl: req.body.authorUrl,
            img: "https://stigmataback.onrender.com/uploads/"+ req.body.img,
            fileArr: req.body.fileArr
        });

        const comment = await doc.save();
        res.json(comment)
    } catch(err){
        console.log(err);
        res.status(500).json({
            message: "не удалось создать запись"
        })
    }
}

export const getAll = async (req, res) => {
    try{
        const postId = req.params.id;
        const com = await CommentModel.find();
        const comments = com.filter(item => item.postId ==  postId)
        if (comments){
            res.json({
                comments:comments
            }) 
        } 
        else{
            res.json("pusto") 
        }
    } catch(err){
        console.log(err);
        res.status(500).json({
            message: "не удалось получить посты"
        })
    }
}

export const getOne = async (req, res) => {
    try{
        const comId = req.params.id;
        CommentModel.findById(
            {
                _id: comId,
            },
            (err, doc) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({message: "не удалось получить новость"})
                }
                if(!doc){
                    return res.status(404).json({
                        message: 'Статья не найдена'
                    })
                }
                res.json(doc) 
            }
        )

          
    } catch(err){
        console.log(err);
        res.status(500).json({
            message: "не удалось получить пост"
        })
    }
}

export const Remove = async (req, res) => {
    try{
        await CommentModel.deleteOne({_id: req.params.id});
        res.json("DA") 
    } catch(err){
        console.log(err);
        res.status(500).json({
            message: "не удалось получить посты"
        })
    }
}
