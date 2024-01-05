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
    console.log(arrayBuffer)
    const data = await supabase
        .storage
        .from('avatars') // Replace with your storage bucket name
        .upload(destinationPath, arrayBuffer)
        .then(response => {
            console.log(`File uploaded successfully: ${response.data}`);
        })
        .catch(error => {
            console.error(`Error uploading file: ${error.message}`);
        });
        console.log("completed")
}
const latestlistOfImage = () => {
    let fpath = "./wallpaper"
    const listOfImage = getImagesFromFolder(fpath)
        .then(imageFiles => {
            // console.log('List of image files:', imageFiles);
            return imageFiles;
        })
        .catch(error => {
            console.error('Error reading image files:', error);
        });
    return listOfImage
    // console.log(listOfImage)

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
                return ['.png', '.jpg', '.jpeg', '.gif', '.bmp'].includes(extname);
            });

            resolve(imageFiles);
        });
    });
}

exports.readFileAsArrayBuffer = async () => {
    const filepathforImage = await latestlistOfImage();
    console.log("kuch mila",filepathforImage)
    let filePath = ''
    for (let i = 0; i < 1; i++) {
        filePath = `./wallpaper/${filepathforImage[i]}`
        console.log("filePath --> ", filePath)
        // let filePath = './wallpaper/image1.jpg';
        let destinationPath = filepathforImage[i];
        try {
            const fileData = fs.readFileSync(filePath);
            // console.log("fileData --> ", fileData)
            const arrayBuffer = Buffer.from(fileData).buffer;
            // console.log("arrayBuffer --> ", arrayBuffer)
            uploadArrayBufferToSupabase(arrayBuffer, destinationPath);
        } catch (error) {
            console.error('Error reading file:', error);
        }
    }
}


// cron.schedule("08 * * 1", readFileAsArrayBuffer); 