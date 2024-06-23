import * as Yup from 'yup';

export const userSchema = Yup.object({
    username : Yup.string().max(40).matches(/^[A-Za-z0-9]+$/, 'Only numbers and letters are allowed'),
    email : Yup.string().required(),
    password : Yup.string().required().min(6),
    money: 0.0,
    tickets: 0,
    theta: 0.0,
})