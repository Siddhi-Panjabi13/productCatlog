import dotenv from 'dotenv'
dotenv.config()
const URL={
    uri:process.env.MONGODB_URL||''
}

const port={
    port:process.env.PORT||3000
}

const Secret_key={
    secret_key:process.env.SECRET_KEY||''
}

export {URL, Secret_key, port} 