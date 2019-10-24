const fsp = require('fs').promises;

async function deleteProductImage (imagePath) {
    try {
        const productImage = await fsp.unlink(imagePath);
        console.log(productImage);
        if (productImage) {
            console.log('File Deleted!');
        }
        // console.log(`File Doesn't Exist`);
    } catch (err) {
        console.log(err.message);
    }
}


module.exports = {
    deleteProductImage
}
