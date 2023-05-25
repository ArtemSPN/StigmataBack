import PostModel from "../models/Post.js";


export const create = async (req, res) => {
    try{
        console.log(req.body)
        const doc = new PostModel({
            author: req.body.author,
            authorUrl: req.body.authorUrl,
            text: req.body.text,
            title: req.body.title,
            section: req.body.section,
            fileArr: req.body.fileArr,
            imgArr: req.body.imgArr.map((item) => "https://stigmataback.onrender.com/uploads/"+item)
        });

        const post = await doc.save();
        res.json(post)
    } catch(err){
        console.log(err);
        res.status(500).json({
            message: "не удалось создать запись"
        })
    }
}

export const getAll = async (req, res) => {
    try{
        const posts = await PostModel.find();
        
        if (posts){
            res.json({
                posts:posts.slice(-10)
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
export const getAllInSection = async (req, res) => {
    try{
        const section = req.params.id;
        const page = req.params.page;

        console.log(page);

        PostModel.find(
            {
                section: section,
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
                res.json(doc.slice(5*(page-1),5*page)); 
            }
        )  
    } catch(err){
        console.log(err);
        res.status(500).json({
            message: "не удалось получить посты"
        })
    }
}

export const getOne = async (req, res) => {
    try{
        const postId = req.params.id;

        console.log(postId)

        PostModel.findById(
            {
                _id: postId,
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
        await PostModel.deleteOne({_id: req.params.id});
        res.json("DA") 
    } catch(err){
        console.log(err);
        res.status(500).json({
            message: "не удалось получить посты"
        })
    }
}
