import FileModel from "../models/File.js";


export const addFile = async (req, res, next) => {
    const doc = new FileModel({
        fileUrl: `/uploads/${req.file.originalname}`,
        fileName: req.file.originalname,
        type: req.file.originalname.split('.').pop(),
    });

    await doc.save();

    let filedata = req.file;
    if(!filedata)
        res.send("Ошибка при загрузке файла");
    else
        res.send("Файл загружен");
}

export const addFiles = async (req, res, next) => {
    
    req.files.map(async item => {
        const doc = new FileModel({
            fileUrl: `/uploads/${req.file.originalname}`,
            fileName: req.file.originalname,
            type: req.file.originalname.split('.').pop(),
        });
    
        await doc.save();
    })

    let filedata = req.file;
    if(!filedata)
        res.send("Ошибка при загрузке файла");
    else
        res.send("Файл загружен");
}

export const downloadFile = async (req, res) => {

    const file = FileModel.findOne({fileUrl: `uploads/${req.params.filename}`})

    if(file){
        return res.download(`uploads/${req.params.filename}`, req.params.filename);
    }
    if(!filedata)
        res.send("Ошибка при загрузке файла");
    else
        res.send("Файл загружен");
}