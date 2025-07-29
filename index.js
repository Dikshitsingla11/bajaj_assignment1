const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());


app.post('/bfhl', (req, res) => {
    // Input validation
    const input = req.body.data;
    if (!Array.isArray(input)) {
        return res.status(400).json({
            is_success: false,
            message: "Invalid input: 'data' must be an array"
        });
    }

    const fullName = "john_doe";
    const dob = "17091999"; // ddmmyyyy
    const userId = `${fullName.toLowerCase()}_${dob}`;
    const email = "john@xyz.com";
    const rollNumber = "ABCD123";

    let even_numbers = [];
    let odd_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;
    let alphabetConcat = "";

    input.forEach(item => {
        // Check if item is a number (string or number type)
        if (/^-?\d+$/.test(item)) {
            const num = parseInt(item, 10);
            sum += num;
            if (num % 2 === 0) {
                even_numbers.push(item.toString());
            } else {
                odd_numbers.push(item.toString());
            }
        } else if (/^[a-zA-Z]+$/.test(item)) {
            alphabets.push(item.toUpperCase());
            alphabetConcat += item;
        } else {
            special_characters.push(item);
        }
    });

    // Create alternating caps in reverse order of alphabetConcat
    const reversed = alphabetConcat.split("").reverse();
    let concat_string = "";
    for (let i = 0; i < reversed.length; i++) {
        concat_string += i % 2 === 0
            ? reversed[i].toUpperCase()
            : reversed[i].toLowerCase();
    }

    res.status(200).json({
        is_success: true,
        user_id: userId,
        email: email,
        roll_number: rollNumber,
        odd_numbers,
        even_numbers,
        alphabets,
        special_characters,
        sum: sum.toString(),
        concat_string
    });
});

// Health check route (optional, for deployment testing)
app.get('/', (req, res) => {
    res.send('BFHL API is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port  ${PORT}`);
    });