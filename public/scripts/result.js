import axios from 'axios'

let HOST_URI = 'http://localhost:8080'

// Catch Every Input Field And Form Element 
let selectClass = document.getElementById('class')
let selectSection = document.getElementById('section')
let selectGroup = document.getElementById('group')
let selectExamination = document.getElementById('examination')
let selectYear = document.getElementById('year')
let fieldOfRoll = document.getElementById('roll')
let fieldOfId = document.getElementById('id')

// Error Feedback Div Element
let classError = document.getElementById('feedBackClass')
let sectionError = document.getElementById('feedBackSection')
let groupError = document.getElementById('feedBackGroup')
let examinationError = document.getElementById('feedBackExamination')
let yearError = document.getElementById('feedBackYear')
let rollError = document.getElementById('feedBackRoll')
let idError = document.getElementById('feedBackId')

// Result Showing and Hidden Element
let showResult = document.getElementById('showResult')
let resultFindingForm = document.getElementById('resultFindingForm')

// Alert Message Parent Element
let alertParent = document.getElementById('alert__box')
let loadingParentElement = document.getElementById('loading__box')


let submitBtn = document.getElementById('submit_btn')

if(submitBtn){
    submitBtn.addEventListener('click',formSubmitHandler)
}



// Alert Message Handler
function alertMsgHandler(msg,opt){
    let alertDiv = document.createElement('div')
    if(opt==='success'){
        alertDiv.className='alert alert-success'
    }
    if(opt==='fail'){
        alertDiv.className='alert alert-danger'
    }
    
    alertDiv.setAttribute('role','alert')
    alertDiv.innerText = msg
    return alertDiv
}


function formSubmitHandler(){
    loadingParentElement.style.display = 'block'

    let classValue = selectClass.value
    let sectionValue = selectSection.value
    let groupValue = selectGroup.value
    let examinationValue = selectExamination.value
    let yearValue =  selectYear.value
    let rollValue =  fieldOfRoll.value
    let idValue = fieldOfId.value

    let error = {}

    classValue.length===0?error.classError = 'Please Select Class':''
    examinationValue.length===0?error.examinationError = 'Please Select Examination':''
    yearValue.length===0?error.yearError = 'Please Select Year':''
    rollValue.length===0?error.rollError = 'Please Provied Roll':''
    idValue.length===0?error.idError = 'Please Provied Student Id':''

    if(Number(classValue)>3){
        sectionValue.length===0?error.sectionError = 'Please Select Section':''
    }

    if(Number(classValue)>8){
        groupValue.length===0?error.groupError = 'Please Select Class Group':''
    }
    
    if(Object.keys(error).length>0){

        error.classError?classError.innerText = error.classError:null
        error.examinationError?examinationError.innerText = error.examinationError:null
        error.yearError?yearError.innerText = error.yearError:null
        error.rollError?rollError.innerText = error.rollError:null
        error.idError?idError.innerText = error.idError:null

        error.sectionError?sectionError.innerText=error.sectionError:null
        error.groupError?groupError.innerText = error.groupError:null

        error.classError?selectClass.classList.add('is-invalid'):selectClass.classList.contains('is-invalid')?selectClass.classList.remove('is-invalid'):null

        error.examinationError?selectExamination.classList.add('is-invalid'):selectExamination.classList.contains('is-invalid')?selectExamination.classList.remove('is-invalid'):null

        error.yearError?selectYear.classList.add('is-invalid'):selectYear.classList.contains('is-invalid')?selectYear.classList.remove('is-invalid'):null

        error.rollError?fieldOfRoll.classList.add('is-invalid'):fieldOfRoll.classList.contains('is-invalid')?fieldOfRoll.classList.remove('is-invalid'):null

        error.idError?fieldOfId.classList.add('is-invalid'):fieldOfId.classList.contains('is-invalid')?fieldOfId.classList.remove('is-invalid'):null

        error.sectionError?selectSection.classList.add('is-invalid'):selectSection.classList.contains('is-invalid')?selectSection.classList.remove('is-invalid'):null

        error.groupError?selectGroup.classList.add('is-invalid'):selectGroup.classList.contains('is-invalid')?selectGroup.classList.remove('is-invalid'):null
        loadingParentElement.style.display = 'none'
        return false
    }
    getResultRequestHandler(classValue,sectionValue,groupValue,examinationValue,yearValue,rollValue,idValue)
}

let GET_RESULT_URI = `${HOST_URI}/api/result/get`

function getResultRequestHandler(Class,section,group,exam,year,roll,id){

    axios.get(`${GET_RESULT_URI}?Class=${Class}&&section=${section}&&group=${group}&&exam=${exam}&&year=${year}&&roll=${roll}&&id=${id}`)
    .then(res=>{
        if(res.data.errormsg){

            alertParent.appendChild(alertMsgHandler(res.data.errormsg,'fail'))
            setTimeout(()=>{
                alertParent.childNodes[0].remove()
            },3000)

            if(alertParent.childNodes.length>1){
                alertParent.childNodes.forEach(node=>{
                    node.remove()
                })
            }
            loadingParentElement.style.display = 'none'
            return false
        }

        if(res.data.msg){
            alertParent.appendChild(alertMsgHandler(res.data.msg,'success'))
            setTimeout(()=>{
                alertParent.childNodes[0].remove()
            },3000)

            if(alertParent.childNodes.length>1){
                alertParent.childNodes.forEach(node=>{
                    node.remove()
                })
            }
            showResult.style.display = 'block'
            createResultElement(res.data.result)
            loadingParentElement.style.display='none'
            resultFindingForm.remove()
        }
    })
    .catch(e=>{
        console.log(e)
    })
}

// Result Views Elements

let title1,title2,title3,title4,logo;
title1 = document.getElementById('title1')
title2 = document.getElementById('title2')
title3 = document.getElementById('title3')
title4 = document.getElementById('title4')
logo = document.getElementById('logo')

// let headParentElement = document.getElementById('tableHeadParent')

let bodyParentElement1,bodyParentElement2,bodyParentElement3,bodyParentElement4;
bodyParentElement1 = document.getElementById('tableParentElement1')
bodyParentElement2 = document.getElementById('tableParentElement2')
bodyParentElement3 = document.getElementById('tableParentElement3')
bodyParentElement4 = document.getElementById('tableParentElement4')

function createTRElement(){
    let TR = document.createElement('tr')
    return TR
}

function createTDElement(text,classname,attrProps,attrVal,head,everyClassName){
    if(head){
        let TD = document.createElement('td')
        classname||everyClassName?TD.className = `${classname?classname:''} ${everyClassName?everyClassName:''}`:null
        
        attrProps?TD.setAttribute(attrProps,attrVal):null
        let h6 = document.createElement('h6')
        h6.innerText = text
        h6.style.padding='0px'
        h6.style.margin='0px'
        TD.appendChild(h6)
        return TD
    }else{
        let TD = document.createElement('td')
        TD.innerText = text 
        classname||everyClassName?TD.className = `${classname?classname:''} ${everyClassName?everyClassName:''}`:null
        attrProps?TD.setAttribute(attrProps,attrVal):null
        return TD
    }
  
    
}

function createRow(firstName,lastName,firstValue,lastValue){
    let row = createTRElement()
    row.appendChild(createTDElement(firstName,null,null,null,true))
    row.appendChild(createTDElement(firstValue))
    row.appendChild(createTDElement(lastName,null,null,null,true))
    row.appendChild(createTDElement(lastValue))
    bodyParentElement1.appendChild(row)
}
function create3ColRow(parent,name1,name2,name3,name4,name5,head,className){
    let row = createTRElement()
    row.appendChild(createTDElement(name1,null,null,null,head,'w-10'))
    row.appendChild(createTDElement(name2,className,null,null,head,'w-40'))
    row.appendChild(createTDElement(name3,null,null,null,head,'w-20'))
    row.appendChild(createTDElement(name4,null,null,null,head,'w-20'))
    row.appendChild(createTDElement(name5,null,null,null,head,'w-10'))
    parent.appendChild(row)
}
function create3ColRowsPan(parent,name1,name2,name3,name4,name5,rowspan,classname){
    let row = createTRElement()
    row.appendChild(createTDElement(name1,null,null,null,null,'w-10'))
    row.appendChild(createTDElement(name2,classname,null,null,null,'w-40'))
    row.appendChild(createTDElement(name3,null,null,null,null,'w-20'))
    row.appendChild(createTDElement(name4,null,null,null,null,'w-20'))
    rowspan?row.appendChild(createTDElement(name5,null,'rowspan','2',null,'w-10')):null
    parent.appendChild(row)
}

function createResultElement(data){
    console.log(data)
    logo.src = data.logo
    logo.style.display = 'block'
    title1.innerText = data.university.name
    title2.innerText = 'SHOLASHAHAR,CHATTOGRAM' 
    title3.innerText = data.examtitle
    title4.innerText = `Class ${data.classsName} ${data.classSection?' Branch '+data.classSection:''}`

    createRow('Roll No ','Student Id',data.studentInformation.roll,data.studentInformation.id)

    let row2 = createTRElement()
    row2.appendChild(createTDElement('Name Of Student :',null,null,null,true))
    row2.appendChild(createTDElement(data.name,null,'colspan','3'))
    bodyParentElement1.appendChild(row2)

    createRow('Group','Type',data.studentInformation.group?data.studentInformation.group:'N/A',data.types.toUpperCase())

    createRow('Session','Total Students ',data.examyear,data.totalStudents)
    
    createRow('Working Days','Present Days',data.workingDays,data.presentDays)

    createRow('Grade ','GPA ',data.grade,data.gradePoint)

    createRow('Result','Rank',data.passedOrFailed?'Passed':'Failed',data.rank?data.rank:'N/A')

    let subjectsTitleParent = document.getElementById('subjectsTitle') 
    let combinationSubjectTitleParent = document.getElementById('combinationSubjectTitle')
    let optionalSubjectTitleParent = document.getElementById('optionalSubjectTitle')


    let h5 = document.createElement('h5')
    h5.innerText = 'Subjects'
    h5.className = 'my-2 text-center'
    subjectsTitleParent.appendChild(h5)
    create3ColRow(bodyParentElement2,'Code','Subjects Name','Full Marks','Obtained Marks','Grade',true)
    for(let s of data.subjects){
        create3ColRow(bodyParentElement2,s.code,s.name,s.fullMarks,s.obtainedMarks,s.gradePoint,null,'text-left')
    }

    if(data.subjectAandSubjectB.length>0){
        let h5 = document.createElement('h5')
        h5.innerText = 'Combination Subjects'
        h5.className = 'my-2 text-center'
        combinationSubjectTitleParent.appendChild(h5)

        create3ColRow(bodyParentElement3,'Code','Subjects Name','Full Marks','Obtained Marks','Grade',true)
        data.subjectAandSubjectB.forEach((s,ind)=>{
            create3ColRowsPan(bodyParentElement3,s.code,s.name,s.fullMarks,s.obtainedMarks,s.gradePoint,ind%2===0?true:false,'text-left')
        })
    }
    
    if(data.optionalSubject.length>0){
        let h5 = document.createElement('h5')
        h5.innerText = 'Optional Subjects'
        h5.className = 'my-2 text-center'
        optionalSubjectTitleParent.appendChild(h5)
        create3ColRow(bodyParentElement4,'Code','Subjects Name','Full Marks','Obtained Marks','Grade',true)
        for(let s of data.optionalSubject){
            console.log(s)
            create3ColRow(bodyParentElement4,s.code,s.name,s.fullMarks,s.obtainedMarks,s.gradePoint,null,'text-left')
        }
    }
}