import { request } from 'http'
import { MongoClient } from 'mongodb'

if (!process.env.MONGO_URI) {
    throw new Error('Please add your Mongo URI to .env')
}



const uri = process.env.MONGO_URI

export async function load() {
    try {
        


    } catch (error) {
        console.error(error)
    }  


  return {
    status: 200,
    body: {
      message: 'Hello from the MongoDB server page'
    }
  }
}

export const actions = {
    addNameToDB: async ({ request }) => {
        const formData = await request.formData()
        const name = formData.get('userName')

        const client = new MongoClient(uri)
        await client.connect()
        const database = client.db('cs3380db')
        const collection = database.collection('test')
        collection.insertOne({ userName: name })

        return {
            status: 200,
            body: {
                message: `${name} added to the database`
            }
        }
    }
}