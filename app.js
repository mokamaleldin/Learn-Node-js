const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer(function (req, res) {
    const { url, method } = req;

    // الصفحة الرئيسية: نموذج إدخال رسالة
    if (url === "/" && method === "GET") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.write("<html>");
        res.write("<head><title>Enter message</title></head>");
        // أضف name حتى يُرسَل المفتاح message
        res.write('<body><form action="/message" method="POST"> <input type="text" name="message"/> <button type="submit">send</button> </form></body>');
        res.write("</html>");
        return res.end();
    }

    // استقبال البيانات كـ Stream ثم كتابة الملف ثم إعادة توجيه
    if (url === "/message" && method === "POST") {
        const chunks = [];
        req.on("data", (chunk) => {
            chunks.push(chunk); // كل chunk هو Buffer
        });
        req.on("end", () => {
            const parsedBody = Buffer.concat(chunks).toString(); // مثال: message=Hello+World
            const raw = parsedBody.split("=")[1] || "";
            const decoded = decodeURIComponent(raw.replace(/\+/g, " ")); // فك ترميز المسافات
            const filePath = path.join(__dirname, "message.txt");
            // كتابة غير حاجبة (Non-Blocking)
            fs.writeFile(filePath, decoded + "\n", { flag: "a" }, (err) => {
                if (err) {
                    console.error("Write error:", err);
                }
                res.statusCode = 302; // إعادة توجيه بعد اكتمال الكتابة
                res.setHeader("Location", "/");
                res.end();
            });
        });
        return; // ننتظر حدث end
    }

    // رد افتراضي
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.write("<html>");
    res.write("<head><title>My First Page</title></head>");
    res.write("<body><h1>Hello from my Node.js server!</h1></body>");
    res.write("</html>");
    res.end();
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});