const fs = require('fs');
const path = require('path');

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
const listOfImage = () => {
    let fpath = "./backend/wallpaper"
    const listOfImage = getImagesFromFolder(fpath)
        .then(imageFiles => {
            console.log('List of image files:', imageFiles);
        })
        .catch(error => {
            console.error('Error reading image files:', error);
        });
    console.log(listOfImage)
    return listOfImage

}
// exports.uploadFile = async (listOfImages) => {
//     let fpath = "./backend/wallpaper"
//     const listOfImage = getImagesFromFolder(fpath)
//         .then(imageFiles => {
//             console.log('List of image files:', imageFiles);
//             return imageFiles
//         })
//         .catch(error => {
//             console.error('Error reading image files:', error);
//         });
//     const { data, error } = await supabase
//         .storage
//         .from('FileOfImages')
//         .upload('image', listOfImage, {
//             cacheControl: '3600',
//             upsert: false
//         })
//         console.log(data)
// }


// const fileToUpload = './logs';  // Replace with the path to your file

// console.log(fileToUpload)