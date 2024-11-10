import mongoose from "mongoose"


    const ReviewSchema = mongoose.Schema({
        reviewer:{
            type:String,
            required:true
        },
        comment:{
            type:String,
            required:true
        },
        rating:{
            type:String,
            required:true
        },
        movie:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Movie"
        },
        reviewedBy:{
            type:mongoose.Schema.Types.ObjectId,
        }

    },{timestmps:true}
)
const ReviewModel = mongoose.model("Review", ReviewSchema);
export default ReviewModel