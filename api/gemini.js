// This file would typically be deployed as a serverless function.
// For example, on Vercel, you would place this file in the `/api` directory.

const featuresData = {
    ff2: {
        title: 'FF2 Script Features',
        features: {
            'General': [
                'Advanced Aimbot with prediction',
                'Customizable Style Throws',
                'Automated Route Assists',
                'Anti-Tag Visuals',
                'Fully Customizable HUD'
            ]
        }
    },
    rivals: {
        title: 'Rivals - Full Feature List',
        features: {
            'Combat Features': ['Mouse Aimbot', 'Mouse Aimbot Target Part', 'Mouse Aimbot Smoothness', 'Silent Aim', 'Head Hit Chance', 'Max Distance', 'FOV Visible', 'FOV Size', 'Anti Katana', 'Triggerbot', 'No Recoil', 'Rapid Fire', 'No Spread', 'Instant Aim', 'Teleport Above Player', 'Teleport Height', 'Teleport Key-bind'],
            'Visuals Features': ['Highlight ESP', 'Team Highlight Color / Enemy Highlight Color', 'Max Highlight Distance', 'Box ESP, Tracers, Name ESP, Weapon ESP', 'Health Bar and Health Value', 'Hide Dead, Hide Team', 'Show Skeleton for R15', 'Team Color / Enemy Color', 'Max Distance for ESP features'],
            'Utilities / Movement': ['UI Toggle Key', 'Use WalkSpeed / WalkSpeed value', 'Use JumpPower / Jump Power value', 'Fly with Toggle key and Fly Speed', 'Noclip with Toggle Key', 'SpinBot with speed', 'Bhop, Auto Ping, Infinite Jump', 'Anti Flash, No Smoke, Explode Trignines', 'No Killbricks, No Out Of Bounds, Walk on Water', 'Device Spoofer (Mouse/Keyboard, Touch, Gamepad, VR)', 'AutoSelectGun + AutoSelectPrimary/Secondary/Melee/Utility'],
            'Anti-Cheat & Misc': ['Anti-Cheat Bypass', 'Notification system with custom icons', 'Settings auto-save and load', 'Handles R6 and R15 rigs for ESP/Skeleton', 'Streamer mode support for all UI text', 'Weapon ownership detection for auto-select']
        }
    }
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { query: userQuery } = req.body;

    if (!userQuery) {
        return res.status(400).json({ error: 'Query is required' });
    }

    const ff2Features = JSON.stringify(featuresData.ff2.features, null, 2);
    const rivalsFeatures = JSON.stringify(featuresData.rivals.features, null, 2);

    const systemPrompt = `You are the Exerium Assistant, a helpful and friendly AI chatbot. Your purpose is to answer questions about the Exerium scripts for the games FF2 and Rivals.
    
    Key Information:
    - The website and scripts were created by a talented developer named "auaqa".
    - You are an AI powered by Google's Gemini model.
    - The current year is 2025.
    
    Here are the features for the scripts:
    
    FF2 SCRIPT FEATURES:
    ${ff2Features}
    
    RIVALS SCRIPT FEATURES:
    ${rivalsFeatures}
    
    Your instructions:
    - Be friendly, concise, and helpful.
    - If you don't know the answer, say that you are specialized in Exerium scripts and cannot answer that.
    - Do not answer questions outside the scope of Exerium, FF2, Rivals, or the website itself.
    - Keep your answers relatively short and easy to read. Use bullet points if listing multiple features.`;
    
    const apiKey = "AIzaSyBE-ZUjBKqYz4Q8eVKI8znI4l3YX2zgW4Q"; 
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    const payload = {
        contents: [{ parts: [{ text: userQuery }] }],
        systemInstruction: {
            parts: [{ text: systemPrompt }]
        },
    };

    try {
        const geminiResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!geminiResponse.ok) {
            console.error('Gemini API Error:', await geminiResponse.text());
            return res.status(500).json({ error: 'Failed to fetch response from AI' });
        }

        const result = await geminiResponse.json();
        const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (text) {
            res.status(200).json({ reply: text });
        } else {
            res.status(200).json({ reply: "I'm not sure how to respond to that. Can I help with something else?" });
        }

    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ error: 'An internal server error occurred.' });
    }
}
