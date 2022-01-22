const courseTable = {
 "General Studies": {
  "Arcana":"arc",
  "Investigation":"inv",
  "Medicine":"med",
  "Perception":"prc"
 },
 "Witherbloom": {
  "Animal Handling":"ani",
  "Nature":"nat",
  "Medicine":"med",
  "Survival":"sur"
 },
 "Silverquill": {
  "Deception":"dec",
  "Insight":"ins",
  "Intimidation":"itm",
  "Perception":"prc",
  "Persuasion":"prs"
 },
 "Quandrix": {
  "Arcana":"arc",
  "History":"his",
  "Insight":"ins",
  "Investigation":"inv",
  "Nature":"nat"
 },
 "Lorehold": {
  "Arcana":"arc",
  "History":"his",
  "Insight":"ins",
  "Investigation":"inv",
  "Religion":"rel"
 },
 "Prismari": {
  "Athletics":"ath",
  "Acrobatics":"acr",
  "Performance":"prf",
  "Persuasion":"prc",
  "Sleight of Hand":"slt"
 },
};

function getCourseFlag(){
  let ret = game.user.getFlag("world", "courseLoad");
  if (ret == null){
    ret = ["General Studies", "General Studies", "General Studies", "General Studies"];
  }
  return ret;
}

function generateCourseOption(currentCourse, defaultCourse){
    let courseOption = `
        <option 
            value=${currentCourse} 
            ${(defaultCourse == currentCourse) ?"selected":""}
        >
        ${currentCourse}
        </option>`;
    return courseOption;
}

function generateAllCourseOptions(defaultCourse){
    let courseOptions = "";
    for (const courseName in courseTable){
        courseOptions += generateCourseOption(courseName, defaultCourse);
    }
    return courseOptions;   
}

function modifyArray(array, index, value){
    array[index] = value;
    return array;
}

function generateCourseDropDown(nb, courseLoad){
     let courseDropDown = `
        <label for="course${nb}"> Course ${nb}</label>
        <select name="course${nb}" id="course${nb}" >
            ${generateAllCourseOptions(courseLoad[nb-1])} "
        </select>
        <br>
    `;
    
    return courseDropDown;
}

function generateAllDropDown(courseLoad){
  let ret = "";
  for (let i = 1; i < 5; i++){
    ret += generateCourseDropDown(i, courseLoad);
  }
  return ret;
}

let content = `
<form>
  ${generateAllDropDown(getCourseFlag())}
   <button value="Set courses" onclick="game.user.setFlag('world','courseLoad', [document.getElementById('course1').value,document.getElementById('course2').value,document.getElementById('course3').value,document.getElementById('course4').value])">Set courses</button>
</form>
`;


new Dialog({
  title: "This",
  content: content,
  buttons: { close: { label: "Close" }}
},{
resizable: true,

}).render(true);
