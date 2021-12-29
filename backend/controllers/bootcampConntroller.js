const Bootcamp = require('../models/Bootcamp')
const asyncHandler = require('../middleware/asyncHandler')
const errorResponse = require('../utils/errorResponse');


exports.getAllBootcamps = asyncHandler( async(req, res, next) =>{

    let query;
    const reQuery = { ...req.query };

    const removeFields = ["sort"];
console.log(reqQuery);
    removeFields.forEach(param => delete reqQuery[val]);
console.log(reqQuery);

let querystr = JSON.stringify(reqQuery);
console.log(querystr);

querystr = querystr.replace(/\b(gt|gte|lt|lte|in)|b/g,(match) => `$${match}`);

query = Bootcamp.find(JSON.parse(querystr));

if(req.query.sort){
    const sortByArr = req.quessry.sort.split(',');

    const sortByStr = sortByArr.join(' ');

    query = query.sort(sortByStr);
}

else{
    query = query.sort('-price');
}


const bootcamps = await query;

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