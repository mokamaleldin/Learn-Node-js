// موديول مسؤول فقط عن المنطق (Route Handler)
const fs = require("fs");
const path = require("path");

const handler = (req, res) => {
    const { url, method } = req;

    if (url === "/" && method === "GET") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.write("<html>");
        res.write("<head><title>Enter message</title></head>");
        res.write('<body><form action="/message" method="POST"> <input type="text" name="message"/> <button type="submit">send</button> </form></body>');
        res.write("</html>");
        return res.end();
    }

    if (url === "/message" && method === "POST") {
        const chunks = [];
        req.on("data", (chunk) => chunks.push(chunk));
        req.on("end", () => {
            const parsedBody = Buffer.concat(chunks).toString();
            const raw = parsedBody.split("=")[1] || "";
            const decoded = decodeURIComponent(raw.replace(/\+/g, " "));
            const filePath = path.join(__dirname, "message.txt");
            fs.writeFile(filePath, decoded + "\n", { flag: "a" }, (err) => {
                if (err) console.error("Write error:", err);
                res.statusCode = 302;
                res.setHeader("Location", "/");
                res.end();
            });
        });
        return;
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.write("<html>");
    res.write("<head><title>My First Page</title></head>");
    res.write("<body><h1>Hello from my Node.js server!</h1></body>");
    res.write("</html>");
    res.end();
};

module.exports = { handler };