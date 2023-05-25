import { body } from "express-validator";

export const postCreateValidation = [
    body('author_name', 'Введите заголовок статьи').isLength({min: 8}).isString(),
    body('text', 'Введите текст комментария').isLength({min: 15}).isString(),
    body('title', 'неверно указан id').isLength({min: 6}),
    body('link', 'неверная контактная ссылка').isURL(),
    body('section', '').isString(),
]


export const commentCreateValidation = [
    body('link', 'неверная контактная ссылка').isURL(),
    body('text', 'Введите текст комментария').isLength({min: 15}).isString(),
    body('author', '').isString(),
    body('postId', '').isString(),

]

export const userCreateValidation = [
    body('link', 'неверная контактная ссылка').isURL(),
    body('password', 'Введите кафедру').isLength({min: 8}).isString(),
    body('username', 'Введите заголовок статьи').isLength({min: 8}).isString(),
]