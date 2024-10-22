import { MongoClient } from 'mongodb'

if (!process.env.MONGO_URI) {
    throw new Error('Please add your Mongo URI to .env')
}

const uri = process.env.MONGO_URI

let clientPromise: Promise<MongoClient> | undefined

try {
    const client = new MongoClient(uri)
    clientPromise = client.connect().catch(e => {
        console.error('Failed to connect to MongoDB:', e)
        throw e
    })
} catch (error) {
    console.error(error)
}

export default clientPromise


