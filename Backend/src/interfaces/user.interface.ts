import {Types} from 'mongoose'
interface IUSER{
    _id?:Types.ObjectId
    userName:string,
    password:string,
    role:string
}
export {IUSER}