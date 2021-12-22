const Bootcamp = require('../models/Bootcamp')
const asyncHandler = require('../middleware/asyncHandler')
const errorResponse = require('../utils/errorResponse');


exports.getAllBootcamps = asyncHandler( async(req, res, next) =>{

const bootcamps = await Bootcamp.find();

res.status(200).json({
    success: true,
    data: bootcamps
})
});

exports.createNewBootcamp = asyncHandler (async (req, res, next) =>{
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
        success: true,
        data: bootcamp,
    })
});

exports.updateBootcampById = asyncHandler (async (req, res, next) =>{
const bootcamp = await Bootcamp.findById(req.params.id);

if(!bootcamp){
    return next(new ErrorResponse(`Bootcamp with id ${req.params.id} was not found`, 404))
}

bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, { new:true, runValidators: true})

res.status(201).json({
    success:true,
    data: bootcamp,

})

});

exports.deleteBootcampById = asyncHandler (async (req, res, next) =>{
    const bootcamp = await Bootcamp.findById(req.params.id);

if(!bootcamp){
    return next(new ErrorResponse(`Bootcamp with id ${req.params.id} was not found`, 404))
}

await bootcamp.remove();

res.status(200).json({
    success:true,
    data: {},

})
});