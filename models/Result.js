const { Schema,model } = require('mongoose')

const schema = new Schema({
    totalStudents:{
        type:String,
        trim:true
    },
    workingDays:{
        type:String,
        trim:true
    },
    presentDays:{
        type:String,
        trim:true
    },
    session:{
        type:String,
        trim:true
    },
    types:{
        type:String,
        trim:true,

    },
    result:{
        type:String,
        trim:true,

    },
    gpa:{
        type:String,
        trim:true,

    },
    rank:{
        type:String,
        trim:true 
    },
    comments:{
        type:String,
        trim:true
    },
    signatureOfPrinciple:String,
    signatureOfTeacher:String,
    approved:{
        type:Boolean
    },
    submited:{
        type:Boolean
    },
    rejected:{
        Boolean
    },
    passedOrFailed:{
        type:Boolean
    },
    dateOfResultPublication:{
        type:String,
        trim:true
    },
    subjects:[
        {
        name:{
            type:String,
            trim:true,
        },
        obtainedMarks:{
            type:String,
            trim:true,
        },
        grade:{
            type:String,
            trim:true,
        
        },
        gradePoint:{
            type:String,
            trim:true
        },
        passedMarks:String,
        fullMarks:String,
        code:String
        }
    ],
    subjectAandSubjectB:[
        {
        name:{
            type:String,
            trim:true,
        },
        obtainedMarks:{
            type:String,
            trim:true,
        },
        grade:{
            type:String,
            trim:true,
        
        },
        gradePoint:{
            type:String,
            trim:true
        },
        passedMarks:String,
        fullMarks:String,
        code:String,
        }
    ],
    optionalSubject:[
        {
        name:{
            type:String,
            trim:true,
        
        },
        obtainedMarks:{
            type:String,
            trim:true,
        
        },
        grade:{
            type:String,
            trim:true,
        
        },
        gradePoint:{
            type:String,
            trim:true
        },
        passedMarks:String,
        fullMarks:String,
        code:String,
        }
    ],
    student:{
        type:Schema.Types.ObjectId,
        ref:'Student'
    }

})

const Result = new model('Result',schema)
module.exports = Result