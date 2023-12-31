
import DataModel from '../models/productdata.js';
// import cloudinary from "cloudinary"
// cloudinary.v2.config({
//     cloud_name: 'dvnubzprf',
//     api_key: '355881747719519',
//     api_secret: 'N9twT6TyEA79iaVrisgngm-rm6I'
// });
// this is with cloudnary

// multer 



const AddProductData = async (req, res) => {
    const { title, catagory, shape, price, carat, colour, clarity, cut, polish, symmetry, fluorescence, measurements, table, depth, ratio, crownangle, crownheight, pavilionangle, paviliondepth, } = req.body;
    if (title && catagory && shape && carat && price) {
        const productData = await DataModel.findOne({ title });
        if (productData) {
            res.json({ message: "Data Alreay Exist !" })
        }
        else {
            if (!req.file) {
                return res.json({ message: "error in file img" })
            }
            else {
                // const imageUrl = `${req.protocol}://${req.get('host')}/${req.file.path}`;
                const imageUrl = req.file.filename
                let doc = await new DataModel({ title, catagory, "threesixty": imageUrl, shape, price, carat, colour, clarity, cut, polish, symmetry, fluorescence, table, depth, ratio, crownangle, crownheight, pavilionangle, paviliondepth, })
                await doc.save();
                return res.status(201).send("Record insert successfully")
            }
            // if (req.file) {
            //     console.log("req.file")
            //     const transformationOptions = {
            //         width: 300,
            //         height: 300,
            //         crop: 'fill',
            //     };
            //      cloudinary.uploader.upload_stream(
            //         { transformation: transformationOptions },
            //         async (error, result) => {
            //             if (error) {
            //                 console.error(error);
            //                 return res.status(500).json({ message: 'Upload failed' });
            //             }
            //             console.log("unser cloud")
            //             // let newcount = await DataModel.countDocuments() + 1
            //             let doc = await new DataModel({ title, catagory, "threesixty": result.secure_url, shape, price, carat, colour, clarity, cut, polish, symmetry, fluorescence, table, depth, ratio, crownangle, crownheight, pavilionangle, paviliondepth, })
            //             await doc.save();
            //         return res.status(201).send("Record insert successfully")

            //         }).end(req.file.buffer);

            // }

            // else {
            //     console.log("error in file img")
            //     res.json({ message: "error in file img" })
            // }
        }
    }
    else {
        res.json({ message: "All Fields are required" })
    }
}

// const AddProductData = async (req, res) => {
//     const { title, catagory, shape, price, carat, colour, clarity, cut, polish, symmetry, f0luorescence, measurements, table, depth, ratio, crownangle, crownheight, pavilionangle, paviliondepth, } = req.body;
//     if (title && catagory && shape && carat && price) {
//         const productData = await DataModel.findOne({ title });
//         if (productData) {
//             res.json({ message: "Data Alreay Exist !" })
//         }
//         else {

//                 }

//    }
//     else {
//         res.json({ message: "All Fields are required" })
//     }
// }

// GET || READ-PRODUCTS
const GetProductData = async (req, res) => {


    const productData = await DataModel.find();
    res.json(productData)
}

// UPDATE || PUT  
const updateProductActive = async (req, res) => {
    console.log("update")
    const _id = req.params.id
    if (_id) {
        await DataModel.findByIdAndUpdate(_id, { active: false })

        return res.json({ code: 200, message: "Update succesfully" })
    }

    else {
        return res.json({ code: 404, message: "Id must require" })
    }
}
const updateProductInactive = async (req, res) => {
    console.log("update")
    const _id = req.params.id
    if (_id) {
        await DataModel.findByIdAndUpdate(_id, { active: true })

        return res.json({ code: 200, message: "Update succesfully" })
    }
    else {
        return res.json({ code: 404, message: "Id must require" })
    }


}

// DELETE || DELETE-PRODUCTS
// const deleteProduct = async (req, res) => {
//     const id = req.params['id']

//     try {
//         await DataModel.findOneAndDelete({ "_id": id })
//             .then(() => console.log("delete success"))
//             .catch((e) => {
//                 console.log(e)
//             })
//         console.log("delete")

//         res.json({ message: "deleted successfully" })

//     } catch (error) {
//         return error
//     }
// }

export { AddProductData, GetProductData, updateProductActive, updateProductInactive }