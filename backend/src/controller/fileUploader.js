require('dotenv').config()
const { createClient } = require('@supabase/supabase-js');
const { supabaseUrl, supabaseKey } = require('../db/books.db')
const supabase = createClient(supabaseUrl, supabaseKey)
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const multer = require("multer");
const upload = multer();
const cron = require("node-cron")
const fsPromises = require("fs/promises")

// Upload images to Supabase

const storageBucket = 'FileOfImages';
const file = '../../wallpaper';


function getImagesFromFolder(folderPath) {
    return new Promise((resolve, reject) => {
        fs.readdir(folderPath, (err, files) => {
            if (err) {
                reject(err);
                return;
            }

            const imageFiles = files.filter(file => {
                const extname = path.extname(file).toLowerCase();
                return ['.png', '.jpg', '.jpeg', '.gif', '.bmp'].includes(extname);
            });

            resolve(imageFiles);
        });
    });
}
// let fpath = "./backend/wallpaper"
// const listOfImage = getImagesFromFolder(fpath)
//     .then(imageFiles => {
//         console.log('List of image files:', imageFiles);
//     })
//     .catch(error => {
//         console.error('Error file path list of image reading image files:', error);
//     });


// console.log(listOfImage)



async function uploadArrayBufferToSupabase(arrayBuffer, destinationPath) {
    // console.log(arrayBuffer)
    await supabase
        .storage
        .from('FileOfImages') 
        .upload(destinationPath, arrayBuffer)
        .then(response => {
            console.log(`File uploaded successfully: ${response.data}`);
        })
        .catch(error => {
            console.error(`Error uploading file: ${error.message}`);
        });
}
const latestlistOfImage = (fpath) => {
    const listOfImage = getImagesFromFolder(fpath)
        .then(imageFiles => {
            // console.log('List of image files:', imageFiles);
            return imageFiles;
        })
        .catch(error => {
            console.error('Error reading image files:', error);
        });
    return listOfImage
}
function getImagesFromFolder(folderPath) {
    return new Promise((resolve, reject) => {
        fs.readdir(folderPath, (err, files) => {
            if (err) {
                reject(err);
                return;
            }
            const imageFiles = files.filter(file => {
                const extname = path.extname(file).toLowerCase();
                return ['.png', '.jpg', '.jpeg', '.gif', '.bmp','.log','.txt'].includes(extname);
            });
            resolve(imageFiles);
        });
    });
}

exports.readFileAsArrayBuffer = async () => {
    let imagesPath = "./wallpaper"
    const filepathforImage = await latestlistOfImage(imagesPath);
    let filePath = ''
    for (const fileItem of filepathforImage) {
        filePath = `./wallpaper/${fileItem}`
        let destinationPath = fileItem;
        try {
            const fileData = fs.readFileSync(filePath);
            const arrayBuffer = Buffer.from(fileData).buffer;
            await uploadArrayBufferToSupabase(arrayBuffer, destinationPath);
        } catch (error) {
            console.error('Error reading file:', error);
        }
    }
    fs.readdir(imagesPath, (err, files) => {
        if (err) throw err;
        for (const file of files) {
            fs.unlink(path.join(imagesPath, file), (err) => {
                if (err) throw err;
            });
        }
    });
}


// cron.schedule("08 * * 1", readFileAsArrayBuffer); 
