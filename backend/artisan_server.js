import express, { response } from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import { AImodel } from "./controllers/geminiAi.js"
import cors from "cors"
import bodyParser from "body-parser"
import { createOrUpdateDocument, fetchAllDocuments, updateDocument } from "./controllers/CRUD.js"
import multer from "multer"
import { admin, db } from "./controllers/firestore.js";

// CREATE or UPDATE document
const bucket = admin.storage().bucket()

const app = express()
const httpserver = createServer(app)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors({ origin: true }));

const upload = multer({ storage: multer.memoryStorage() })

const all_products = {
    "products": []
}

async function fetch_all_products() {
    all_products.products.push(...(await fetchAllDocuments("product")))
}

await fetch_all_products()

console.log("all_products", all_products)

const cart = {
    "cart_products": [
        {
            "id": 5,
            "name": "Shower Chair with Backrest",
            "description": "A sturdy shower chair with a backrest for elderly individuals who need extra support while bathing.",
            "price": 2500.00,
            "ratingAverage": 4.9,
            "ratingCount": 350,
            "imgUrl": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/codestorm%2Fshower_chair.jpg?alt=media&token=1aff6936-cf66-4451-8c99-e6ba9dc7ef32"
        },
    ]
}

const wishlist = {
    "wishlist_products": [
        {
            "id": 4,
            "name": "Grabber Reacher Tool",
            "description": "A lightweight reacher tool designed to help elderly individuals grab items from hard-to-reach places without bending.",
            "price": 1500.00,
            "ratingAverage": 4.8,
            "ratingCount": 600,
            "imgUrl": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/codestorm%2Fgrabber_reacher.jpg?alt=media&token=868eb908-a6c2-4e9f-9122-fdfc32644104"
        },
    ]
}

const profile = {
    "name": "Aryan Maurya",
    "contact": "9967855432",
    "gender": "Male",
    "address": "Wadala East, Mumbai-400037",
    "email": "aryan@gmail.com",
    "previous_orders": [
        {
            "id": 10,
            "name": "Bedside Adjustable Overbed Table",
            "description": "An adjustable overbed table that allows elderly individuals to comfortably eat or work while in bed.",
            "price": 3500.00,
            "ratingAverage": 4.8,
            "ratingCount": 460,
            "imgUrl": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/codestorm%2Fbedside_table.jpg?alt=media&token=85e1694e-007e-41e1-8067-6b6cf8e761c9"
        }
    ]
}

function searchbyKeyword(keyword) {
    console.log(all_products)
    const search_list = all_products.products
    const search_result = []
    for (let i = 0; i < search_list.length; i++) {
        // Check if the product name contains the keyword (case-insensitive)
        if (search_list[i].name.toLowerCase().includes(keyword.toLowerCase())) {
            search_result.push(search_list[i]);
        }
    }

    console.log(search_result)
    return search_result

}

const io = new Server(httpserver, {
    cors: {
        origin: "http://localhost:5173"
    }
})

io.use((socket, next) => {
    const user_name = socket.handshake.auth.user_name;
    console.log(user_name)
    socket.user_name = user_name
    next()
});


io.on('connection', (socket) => {
    console.log(socket.id, socket.user_name)

    const actual_history = [{
        role: "user",
        parts: [
            {
                text: `You are a personal assistant named ArtisanHelper, designed to assist users on an eCommerce platform where artisans sell their products. Your responses should be plain text, free of any emojis. If the user asks to go to or open a particular location, reply with "open LOCATION NAME," substituting "LOCATION NAME" with the name of the location they want to visit. For commands related to ordering or adding an item to the wishlist, respond with "order PRODUCT NAME," "wishlist PRODUCT NAME," or "cart PRODUCT NAME," depending on whether the user wants to place an order, add the item to their wishlist, or add the item to their cart. Do not add any regular expressions in the response. Respond in plain text.

There are five pages available on the website: the home page, cart page, wishlist page, profile page, and products page. When the user asks to navigate to or open a page, try to map their input to the closest matching page. If the user explicitly mentions the word "page," slice that part out, and do not include it in the response. Your command should simply be "open LOCATION NAME," without including the word "page." For example, if the user says "open home page," your response should be "open home."

If the user inquires about a particular product, initially provide them with the name, rating, and price of the product, making sure to include the price in Indian currency (INR). If the user expresses interest, follow up with additional details such as the description of the product. Ensure your interactions are concise and ask questions to the user, replying accordingly based on their responses.

When the user wants to search for a product, look for matching products from the given list of products and generate the response in JSON format as follows:
{
  "data-type": "JSON",
  "search_result": [{product1}, {product2}, ...],
  "summary": ""
}
The summary should be based on the products in the search result to give the user a quick overview. Ensure that the response strictly adheres to this JSON format, with no additional comments, text, or formatting included.

Additionally, as an assistant on an artisan marketplace, you will help users buy handmade and artisan products, assist with any inquiries about the products, and provide details about artisans and their craft if requested. Keep responses concise and helpful, focused on artisan products and shopping experience.`
            },
        ],
    },
    {
        role: "user",
        parts: [
            { text: JSON.stringify(profile) },
        ],
    },
    {
        role: "user",
        parts: [
            { text: JSON.stringify(all_products) },
        ],
    },
    {
        role: "user",
        parts: [
            { text: JSON.stringify(cart) },
        ],
    },
    {
        role: "user",
        parts: [
            { text: JSON.stringify(wishlist) },
        ],
    },
    {
        role: "model",
        parts: [
            { text: "Hello, I am your personal shopping assistant. How may I assist you?" },
        ],
    },]


    const chatSession = AImodel.startChat({

        // safetySettings: Adjust safety settings
        // See https://ai.google.dev/gemini-api/docs/safety-settings
        history: actual_history
    });

    socket.on('prompt', async (response) => {
        console.log(response)

        actual_history.push({
            role: "user",
            parts: [
                { text: `${response}` }
            ]
        })

        try {
            const result = await chatSession.sendMessage(response);
            const Airesponse = result.response.text();

            if (Airesponse) {
                actual_history.push({
                    role: "model",
                    parts: [
                        { text: `${Airesponse}` }
                    ]
                })
            }
            socket.emit("response", Airesponse)

        }
        catch (err) {
            socket.emit("error", "some internal error occured")
            console.error(err)
        }

    })
})

app.use(cors())
app.use(bodyParser.json())

app.get("/profile", (req, res) => {
    res.status(200).send(profile)
})

app.get("/update-gemini-context", async (req, res)=>{
    await fetch_all_products()
    res.status(200).send("context updated successfully")
})

httpserver.listen(8000, () => {
    console.log("server is running on port 8000")
})

export { io }
