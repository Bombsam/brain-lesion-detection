const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors({
  origin: '*',
  methods: ['POST'],
  allowedHeaders: ["Content-Type"]
}));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/files');
  },
  filename: (req, file, cb) => {
    const uniqueFilename = `${file.originalname}`;
    cb(null, uniqueFilename);
  }
});

const upload = multer({ storage });

const allFilesPath = path.join(__dirname, 'public/files/allFiles.json');

// Function to read and parse JSON file
const readJSONFile = (filePath) => {
  try {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
  } catch (error) {
    return { data: [] };
  }
};

// Function to write JSON data to file
const writeJSONFile = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

app.post('/api/save', upload.single('file'), (req, res) => {
  console.log("got a request at /api/save")
  if (req.file) {
    const savedFileName = req.file.filename;
    console.log({ savedFileName })
    let allFiles = readJSONFile(allFilesPath);
    console.log({ allFiles })
    const dataToReplace = { data: [...(new Set([...allFiles["data"], savedFileName]))] }
    console.log({ dataToReplace })
    writeJSONFile(allFilesPath, dataToReplace);

    res.json({
      message: 'File saved successfully',
      filename: savedFileName
    });
  } else {
    res.status(500).json({ message: 'File upload failed' });
  }
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
