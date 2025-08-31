// https://news.google.com/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGRqTVhZU0FtVnVHZ0pWVXlnQVAB?hl=en-US&gl=US&ceid=US%3Aen
// https://newsletter.victordibia.com/p/mcp-for-software-engineers-part-1
import * as cheerio from 'cheerio';


export async function GET(request: Request) {
    try{
        const res = await fetch(
            "https://news.google.com/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGRqTVhZU0FtVnVHZ0pWVXlnQVAB?hl=en-US&gl=US&ceid=US%3Aen",
            { cache: "no-store" }
        )
        if (!res.ok) {
            throw new Error("Failed to fetch news");
        }
        const htmlContent = await res.text()
        const webpage = cheerio.load(htmlContent)
        webpage('script').remove()
        webpage('style').remove()
        webpage('nav').remove()
        webpage('header').remove()
        webpage('footer').remove()
        webpage('img').remove()
        webpage('form').remove()
        webpage('a').remove()
        return new Response(JSON.stringify({ message: "Hello, world!" }), {
            headers: { "Content-Type": "application/json" },
        })
    }catch(error){
        return new Response(JSON.stringify({ message: "Can't fetch : " + error }), {
            headers: { "Content-Type": "application/json" }
        })
    }
}