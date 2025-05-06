const {body,validationResult}=require("express-validator");

const MAX_LENGTH=2000;

const postValidator=[
    body("content")
        .isLength({min:10})
        .withMessage("Your post is too short. Share more of your thoughts!")
        .isLength({max:MAX_LENGTH})
        .withMessage(`Post cannot exceed ${MAX_LENGTH} characters`)
        .trim(),
];

const replyValidator=[
    body("content")
    .isLength({min:1})
    .withMessage("Your comment is too short.")
    .isLength({max:MAX_LENGTH})
    .withMessage(`Comment cannot exceed ${MAX_LENGTH} characters`)
    .trim(),
]

module.exports={
    postValidator,
    replyValidator
}