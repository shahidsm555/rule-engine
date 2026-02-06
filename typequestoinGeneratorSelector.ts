// not sure where this is 2023-04-10
/*  *** unique code ***
ok, thanks, I was looking at the skype history for that. , on another note, I am starting a section where the sorting could change and it is going to be extensive, as such, I am planning on adding the creation of a record ID for the record being saved which will allow for sorting separately. I am aware we could have a problem with hotspots on firestore, however, I do not want to rely on firestore to determine the recordID, I am planing on using a 3 part calculation of the id, with each part converted to to text and all concatenated Part 1: Math.floor(Math.random() * 1000); ( 1 to 3 characters) - numeric - to prevent hotspotting
Part 2: Date.now() ( fixed number of milliseconds) - numeric - to provide uniqueness per author
Part 3 authorID, presumably unique alphanumeric code, variable in length. - to provide uniqueness in unlikely event 1 and 2 above are not unique

Is this a good approach? I understand this is a mask for whatever is done server side, but given one to one relationship between the mask and the serverside code, I am not sure what the security benefit is. I just have to accept your word word for it.
*/



/**/
function allRemoveByClassName(classRemoving) {
    console.log("function allRemoveByClassName(classRemoving) {");
    let paras = document.getElementsByClassName(classRemoving);
    //while(paras[0]) {
      //paras[0].parentNode.removeChild(paras[0])
    //}
    while(paras[0]) {
       paras[0].remove()
    }
  }
  /**/
  
  
  function mySnackBarFunction(rowNumberValue) {
    console.log("function mySnackBarFunction(rowNumberValue) {");
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");
        x.innerHTML = rowNumberValue;
    // Add the "show" class to DIV
    x.className = "show";
  
    // After 1.5 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 1500);
  }
  
  function checkForUndefined (keyPathValue){
    console.log("function checkForUndefined (keyPathValue)");
    alert("function checkForUndefined (keyPathValue)");
    mySnackBarFunction("Still Working, please Wait!");
    //2021-03-06
    //console.log("function checkForUndefined (keyPathValue)") ;
    //console.log(keyPathValue);
    let allValid = true ;
    if(keyPathValue === undefined){
      console.log("*** keyPathValue is undefined ***") ;
      allValid = false;
      return false
    } //else {
      //console.log("keyPathValue is defined *") 
    //}
    for (let element of keyPathValue) {
      //console.log("element") ;
      //console.log(element) ;
      if(element === undefined) {
        //console.log("element - in loop is undefined");
        //console.log(element);
        allValid = false ;
        //console.log("allValid");
        //console.log(allValid);
        return false
      }else{
        //console.log("element - in loop in valid");
        //console.log(element);
      }
    }
    //console.log("allValid - all true or false, should be true");
    //console.log(allValid);
    return allValid
  }
  
  
  async function getDataAnswerByKeyPathValueV2 (key) {
    console.log("async function getDataAnswerByKeyPathValueV2 (key) {");
    let allValid = checkForUndefined (key);//2021-03-05-00-01
    if(key[4] === undefined || key[5] === undefined) {
      return "blank line"
    }
    if(!allValid) {//2021-03-05-00-01
      return "other error"
    }
    
    let theKey = key ;
    //console.log("__________________________theKey V2____________________________") ;
    //console.log(theKey) ;
    indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
    let open = indexedDB.open ("authorExcuTrust");
    open.onerror = async function () {
      console.log("open.onerror V2" )
    }
    open.onsuccess = async function () {
      //console.log("open.onsuccess V2" ) ;
      db = open.result;
      tx = db.transaction("answerStore", "readonly");
      store = tx.objectStore("answerStore");
      console.log("theKey") ;
      console.log(theKey) ;
      let dbObject = await store.get(theKey) ;
      tx.oncomplete = async function () {
        //console.log("tx.oncomplete  V2 - dbObject" ) ;
        //console.log(dbObject) ;
        let theResult = await dbObject.result ;
        //console.log("await for dbObject.result stored in theResult V2______________") ;
        //console.log(theResult) ;
        return theResult
        //return "________________ the Result will be here if ok V2 ____________________________________________________________________________________"
      }
      tx.onerror = function () {
        //return " tx.onerror V2"
        return undefined
      }
    }
  }
  
  
  async function getDataAnswerByKeyPathValueV3 (key) {
    console.log("async function getDataAnswerByKeyPathValueV3  - - revised for questionStore  - key");
    console.log(key);
    if(!Array.isArray(key)) {
      key = JSON.parse(key);
      console.log("parsed key");
      console.log(key)
    }
    let allValid = checkForUndefined (key);//2021-03-05-00-01
    /*
    if(key[4] === undefined || key[5] === undefined) {
      return "blank line"
    }
    */
  
    if(!allValid) {//2021-03-05-00-01
      //return "other error"
      console.log("!allValid")
      return "blank line"
    }
    let theKey = key ;
    console.log("theKey");
    console.log(theKey);
    indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
    let open = indexedDB.open ("authorExcuTrust");
    open.onerror = function () {
      console.log("open.onerror V3" )
    }
    open.onsuccess = async function () {
      console.log("open.onsuccess V3 - revised for questionStore" ) ;
      db = open.result;
      tx = db.transaction("questionStore", "readonly");
      store = tx.objectStore("questionStore");
      console.log("theKey") ;
      console.log(theKey) ;
      let dbObject = await store.get(theKey) ;
      tx.oncomplete =  async function () {
        console.log("tx.oncomplete  V3 - dbObject" ) ;
        console.log(dbObject) ;
        let theResult = await dbObject.result ;
        console.log("await for dbObject.result stored in theResult V3______________") ;
        console.log(theResult) ;
        return theResult
        //return "________________ the Result will be here if ok V2 ____________________________________________________________________________________"
      }
      tx.onerror = function () {
        //return " tx.onerror V2"
        return undefined
      }
    }
  }
  
  
  
  
  
  
  
  
  
  function getSourceRuleLists (completeList, count , allItems , newAnswer, priorTrueFalse) {
    console.log("function getSourceRuleLists (completeList, count , allItems , newAnswer, priorTrueFalse) {");
    if (completeList === undefined && count  === undefined && allItems  === undefined && newAnswer  === undefined   &priorTrueFalse  === undefined) {
      // not really needed just trying to find error, but now it looks like error is  uncaught it may not interfere, other code still is working, this code not yet invoked
      alert(`getSourceRuleLists missing all information
      completeList === undefined && count  === undefined && allItems  === undefined && newAnswer  === undefined   &priorTrueFalse  === undefined, priorTrueFalse likely should be undefined until checking, so not an error!
      `)
    } else {
      //let tempList = indexToSearch.getAllKeys(allItems[count]) ; // not correct code, just placeholder ***
      let tempList = ["first test of array","second test of array"] ;// not correct code, just placeholder ***
      if(tempList.length> 0 ) {
        tempList.forEach(element => {
          let where = allItems.indexOf(element) ;
          if (where === -1) { // prevents duplicates in allItems List and allows for making sure the latest complete list of sources is used. 
            allItems.push(element) ;
          }
           // *** ALTERNATIVELY DO NOT REPROCESS ELEMENTS ALREADY DEFINED IN COMPLETE LIST, this would reduce need to access disk and be faster. SO iF ELEMENT IS IN allItems skip step***
        });
        completeList.set(allItems[count] , tempList ); // this will occasionnaly be duplicated but not worth checking and an outside chance last time will be more current because od asynchronous nature of updates, *** however, when a value is sent asynchronously, it will also be processed on arrival from the API ***, there should be no conflict as both will use the readwrite to the answerstore and firstone will make the other one wait. 
      }
      if( count < allItems.length) {
        count++ ;
        getSouceRuleLists (completeList, count , allItems , newAnswer, priorTrueFalse) 
      } else {
        /* likley not needed as no duplicates in allItemsList
        let completeListKeys = Object.keys(completeList) ;
        processSourceRuleLists(completeList, count , allItems , newAnswer, priorTrueFalse, completeListKeys) 
        */
        // at this point, completeList is a Map with BOTH display and displayCollection ARRAYS objectKeys and allItems is a list of the all keyObjects fields.  We need the to process all the display items first to see if there are any changes, if no changes, no need to process the displayCollections, CHANGES are based on the customer and senario in the answerStore which needs to be processed based on the above and explicitly saved as true or false  EACH TIME THERE IS A CHANGE AND A NON EXISTING ANSWER IS ALWAYS A CHANGE, as such the firstime an answer changes, we need to process everything, however where the existing answer is the same as above, we can stop processing. 1st might be a little slow, after that, NOT slow, if may even be fast because typically very few levels of rules involved, if there are many, that is ok because it is needed because it involves a lot of rules and all need to be processed. 
    
       processSourceRuleLists(completeList, count , allItems , newAnswer, priorTrueFalse)  // consider saving  Array as the destination field  result in , one is the inverse of the other. !  NOT sure but it may be possible to use the same index??? ***   *** *** 
      }
    }
  }
  
  
  
  
  /*
  function setupEvents() { // no longer used ***
    /*
    alert ("no longer used - function setupEvents()")
    if ( 1 === 2) {
      let type = document.getElementById("process0") ;
      let form = "s";
      let dofor = "S"
      if(type === "New Questionnaire") {
          form = document.getElementById('questionnaireAnswerChoices')
      } else {
          form = document.getElementById('questionAnswerChoices')
      }
      /* ***   BELOW  is from old 20200422rebuild.js file */
      /*
        
        if(form.value !== "") {
        //if(form.innerText !== "") {
          if ( document.getElementById('process2').textContent !== "withEvents" ) {
            getProcess2Count () ;
            form.addEventListener('focusin', (event) => {
              //let doFor = ["questionAnswerSort","questionAnswerDescription","questionAnswerNotesDescription"] ;
              if(type === "New Questionnaire"){
                doFor = ["questionnaireAnswerSort","questionnaireAnswerDescription"] 
              } else {
                doFor = ["questionAnswerSort","questionAnswerDescription"] 
              }          
              for (let index = 0; index < doFor.length; index++) {
                const element = doFor[index];
                if(event.target.classList.contains(element)) {
                  event.target.style.background = "LightPink";
                  index = doFor.length
                }
              } 
            });
            /**/
            /*
            form.addEventListener('click', (event) => {
              //event.target.style.background = "LightPink"; 
              if(type === "New Questionnaire"){
                doFor = ["checkboxNoChange","copyBtn","deleteBtn"]
              } else {
                doFor = ["checkboxNoChange","copyBtn","deleteBtn"]
              }
              for (let index = 0; index < doFor.length; index++) {
                const element = doFor[index];
                if(event.target.classList.contains(element)){ 
                  index = doFor.length;
                  findRowChoice2(event, element)
                }
              } 
            });
            
            form.addEventListener('focusout', (event) => {
            //let doFor = ["questionAnswerSort","questionAnswerDescription","questionAnswerNotesDescription"] ;
            doFor = ["questionAnswerSort","questionAnswerDescription"] ;
            for (let index = 0; index < doFor.length; index++) {
              const element = doFor[index];
              if(event.target.classList.contains(element)){
                if(element === "questionAnswerSort"){
                  event.target.classList.remove("missing") ;
                  trimCapNoFormatting() ;
                  fixMissing()
                }
                else if(element === "questionAnswerDescription"){
                  if(event.target.innerText.trim() === ""){
                    event.target.classList.add("missing") ;
                    trimCapNoFormatting();
                    fixMissing()
                  } else {
                    event.target.classList.remove("missing") ;
                    trimCapNoFormatting() ;
                    fixMissing()
                  }
                }
                event.target.style.background = '';    
                index = doFor.length
              }
            }
            if(event.target.classList.contains("questionAnswerSort")) {
              let t0 = event.target.value;
              let t1 = t0 * 1;
              if( t0 !== t1){
                event.target.value = t1
              }
              let theList = document.getElementsByClassName ("questionAnswerSort");
              compareNumberInput(theList)
              } else {
                if(event.target.classList.contains("questionLevel")){
                setVguide(event) ;
                checkQuestionLevel ()
                }
              }
              //findRowChoice(event)   
            });
            document.getElementById('process2').textContent = "withEvents" 
          } else {
            document.getElementById('process2').textContent = "emptyEvents" 
          }
      }
    }
  }
  */
  function updateMissingSummary () {
    console.log("function updateMissingSummary () {");
    let count = document.getElementsByClassName("missing").length ;
    let show = document.getElementById("missing") ;
    let theStyle = window.getComputedStyle(show).display;
    if(count !== 0) {
      show.innerText = `Number of fields needing  input: ${count}.`;
      if(theStyle !== "block") {
        show.style.display = "block"
      }    
    } else {
      if(theStyle !== "none") {
        show.style.display = "none";
        show.getInnerText = ""
      } 
    }
  }
  
  function updateNotMissingTextList() {
    console.log("function updateNotMissingTextList() {");
    let x = document.getElementsByClassName("notmissing");
    let l = x.length ;
    if(l > 0 ) {
      let i;
      for (i = 0; i < l; i++) {
        let text =  x[i].innerText.trim();
        if(!text) {
          x[i].classList.remove("notmissing");
          x[i].classList.add("missing");
        }
      }
    }
    updateMissingSummary ()
  }
  
  
  function updateMissingTextList() {
    console.log("function updateMissingTextList() {");
    let x = document.getElementsByClassName("missing");
    console.log("x:");
    console.log(x);
    let l = x.length ;
    console.log("l:");
    console.log(l);
    if(l > 0 ) {
      let i;
      for (i = 0; i < l; i++) {
        console.log("i;");
        console.log(i);
        let text =  x[i] ;
        console.log("text as x[i]:");
        console.log(text);
        console.log("text.innerText");
        console.log(text.innerText);
        console.log ("text.innerText.trim()");
        console.log (text.innerText.trim());
        console.log("text =  x[i].innerText.trim() below");
        text =  x[i].innerText.trim();
        console.log(text);
        console.log("text =  x[i].innerText.trim() above");
        if(text) {
          x[i].classList.remove("missing");
          x[i].classList.add("notmissing");
        }
      }
    }
    updateNotMissingTextList()
  }
  
  function preventSave() {
    console.log("function preventSave() {");
    let save = "inline" ;
    let questionTypeExists = document.getElementById("questionTypeDiv") ;
    if (questionTypeExists === null || questionTypeExists.classList.contains("missing")) {
      save = "none" ;
      //document.getElementById("formtitle").innerText = "grouprule 2020-12-05 07:11"
    } else {
      let trimCapList = ["questionAuthor","questionID","questionContent"] ;
      for (let index = 0; index < trimCapList.length; index++) {
        if( document.getElementById(trimCapList[index]).innerText.trim() === "" ) {
          save = "none" ;
          index = trimCapList.length + 1
        }
      }
    }
    let now  = document.getElementsByClassName("saver") ;
    for (let index = 0; index < now.length; index++) {
      const element = now[index];
      element.style.display = save 
    }
  }
  
  function questionOrSingleRuleOrGroupRuleOrQuesstionnaire() {
    console.log("function questionOrSingleRuleOrGroupRuleOrQuesstionnaire() { *** likely not used ");
    let process = document.getElementById("formtitle").innerText.toUpperCase() ;
    // 20200714  keep going to create options
  }
  
  function checkDataBaseByType(objectStore , typeOfStore , theAuthor , theID , toConfirm )  {
    console.log("function checkDataBaseByType(objectStore , typeOfStore , theAuthor , theID , toConfirm )");
    console.log("objectStore:");
    console.log(objectStore);
    console.log("typeOfStore:");
    console.log(typeOfStore);
    console.log("theAuthor:");
    console.log(theAuthor);
    console.log("theID:");
    console.log(theID);
    console.log("toConfirm:");
    console.log(toConfirm);
    let db, tx, store, allSavedItems, checkDatabase ;
    checkDatabase = {} ;
    checkDatabase.store = objectStore ;
    checkDatabase.tx1 = objectStore ;
    checkDatabase.tx2 = "readonly";
    checkDatabase.keyPathValue = [
      typeOfStore,
      1,
      theAuthor,
      1,
      theID
    ];
    checkDatabase.database = "authorExcuTrust";
    let databaseOpenRequest = indexedDB.open(checkDatabase.database);
    databaseOpenRequest.onerror = () => {
      console.log("databaseOpenRequest.onerror = () => *** AND ***   selectQuestionForRuleToggleCloseWrapper()");
      selectQuestionForRuleToggleCloseWrapper()
    }
    databaseOpenRequest.onsuccess = () => {
      console.log("databaseOpenRequest.onsuccess = () => ");
      db = databaseOpenRequest.result ;
      console.log("checkDatabase.database:") ;
      console.log(checkDatabase.database) ;
      console.log("checkDatabase.tx1:") ;
      console.log(checkDatabase.tx1);
      console.log("checkDatabase.tx2:") ;
      console.log(checkDatabase.tx2);
      tx = db.transaction(checkDatabase.tx1, checkDatabase.tx2) ;
      store = tx.objectStore(checkDatabase.store) ;
      allSavedItems = store.get(checkDatabase.keyPathValue) ; // we can put back the cursor approach if needed, it appears the problem was not he cursor, but rather omitting tx.oncomplete
      tx.oncomplete = () => {
        db.close() ;
        console.log("checkDatabase.keyPathValue:");
        console.log(checkDatabase.keyPathValue);
        console.log("allSavedItems.result:");
        console.log(allSavedItems.result);
        let blankTheID = false ;
        if(allSavedItems.result !== undefined) {
          if( toConfirm === false) {
            blankTheID = true
          } else {
            let lastSaved = getdatetime(allSavedItems.result.versionDateSince1969) ;
            //let txt;
            let innerText;
            let currentProcess = sessionStorage.getItem("currentprocess");
            if(currentProcess === "newQuestion") {
              innerText = allSavedItems.result.questionContentInnerText
            } else {
              innerText = allSavedItems.result.ruleContentInnerText
            }
            if(confirm(`Press "OK" to use and modify version previously saved: ${lastSaved }. 
    
            Title: ${innerText}
            
            Press "Cancel" to enter New ID`) ) {
              blankTheID = true 
            } else {
              if(typeOfStore === "trueruleStore" ) {
                theID = document.getElementById("ruleID") 
              } else if (typeOfStore === "groupruleStore" ){
                theID = document.getElementById("groupruleID")
              } else if (typeOfStore === "questionnaireStore" ){
                theID = document.getElementById("questionnaireID")
              } else if (typeOfStore === "questionStore" ){
                theID = document.getElementById("questionID")
              }
              theID.innerText = "" ;
              theID.classList.add("missing")
            } 
          }
        }
        if(blankTheID) {
          // getRuleQuestion(allSavedItems.result)
          if(typeOfStore === "trueruleStore" ) {
            getRuleQuestion(allSavedItems.result)
          } else if(typeOfStore === "questionStore" ) {
            let questionData = allSavedItems.result ;
            updateScreen(questionData, questionData.keyPathValue) ;
            selectQuestionForRuleToggleCloseWrapper() // likely will not work, too synchronously ***  20200818 *** 
            //allSavedItems.result :   ${JSON.stringify(allSavedItems.result)}`) ;
            /*                                */
  
            let questionObject = getDatabaseSetup() ;
            questionObject.store = "questionStore" ;
            questionObject.tx1 = "questionStore" ;
            questionObject.keyPathValue = ["questionStore",1,allSavedItems.result.keyPathValue[2],1,allSavedItems.result.keyPathValue[4]] ;
            let ruleData = undefined ;
            getQuestionData(questionObject , ruleData ) 
              
              // getQuestionData(questionObject) , need the uncaught error to function properly
            }
          }
        } 
    } 
  }
  
  function all0Any1() {
    console.log("function all0Any1() {");
    let temp0 = document.getElementById("all0Any1True").checked ;
    if(temp0) {
      document.getElementById("all0Any1TrueFalse").innerHTML= "Display when <b><u>any</u></b> rule below is true" 
    } else {
      document.getElementById("all0Any1TrueFalse").innerHTML = "Display only when <b><u>all</u></b> rules below are true." 
    }
    document.getElementById("saveButton").value = " Save Multiple Rules " ;
    document.getElementById("saveButton").classList.remove("missing")
  }
  
  function getEmptyGroupHeader() {
    console.log("function getEmptyGroupHeader() {");
    return `
    <div class="groupruletitle"><h2 >Collection of Display Rules:</h2></div>
    <div class="container" >
      <!--<input type="checkbox" value="false" id="makeRuleCopy" class="hidealways hidealways2" >-->
      <div class="row">
        <div class="bg-white text-primary questionQuestionID col-3 mt-1"><input type="checkbox" class="checkboxNoChange hidealways2" disabled="true">&nbspAUTHOR:</div>
        <!--<div id="groupruleAuthor" class="center questionQuestionContent required missing col-2 m-1"  contenteditable="true" onfocus ="focusFormattingAuthor()" onblur="trimCapNoFormattingAuthor()">1</div>-->
        <div id="groupruleAuthor" class="center questionQuestionContent required col-2 m-1">2</div>  
      </div>
      <div class="row">
        <div class="bg-white text-primary  col-3 mt-1 questionQuestionID"><input type="checkbox" class="checkboxNoChange hidealways2" disabled="true">&nbsp ID:</div>
        <div id="groupruleID" class="center col-2 m-1 questionQuestionContent required missing focusFormattingID"  contenteditable="true" onblur="trimCapNoFormattingID()"></div>
      </div>
      <div class="row">
        <div class="bg-white text-primary  col-3 mt-1 questionQuestionID"><input type="checkbox" class="checkboxNoChange hidealways2" disabled="true">&nbspFormattable Title:</div>
        <div id="groupruleContent" class="center col-8 mt-1 questionQuestionContent required missing"  contenteditable="true"  onblur="trimCapNoFormatting()"></div>
      </div>
      <br>
      Display if any rule is true, OR, display if all rules below are true:<br>
      &nbsp&nbsp&nbsp
      <input type="checkbox" id="all0Any1True" name="all0Any1True" value= 0 onclick= "all0Any1()">
      <label for="all0Any1True">    </label><span id="all0Any1TrueFalse">Display only when <b><u>all</u></b> rules below are true.</span>
      <div class="row">
        <div class="bg-white text-primary  col-3 mt-1>
          Tick if any true, Not Ticked if all True
          <input type="checkbox" disabled="false">
        </div>
      </div>
    </div>` ;
  }
  
  function getCurrentScreen() {
    console.log("function getCurrentScreen() { *** likely should change to dataset on all Wrapers. ");
    return sessionStorage.getItem("currentScreen")
  }
  
  function setCurrentScreen(theScreen) {
    console.log("function setCurrentScreen(theScreen) { *** likely should change to dataset on all Wrapers. ");
    sessionStorage.setItem("currentScreen", theScreen)
  }
  
  function emptyGroupRule(theScreen) {
    console.log("function emptyGroupRule(theScreen) {");
    setCurrentScreen(theScreen) ;
    menuChoicesToggle(1);
    hideEmptyAllWrappers() ; 
    document.getElementById("process0").textContent = "New Group Rule" ;
    document.getElementById("process1").textContent = "New Group Rule-not determined yet" ;
    document.getElementById("process2").textContent = "" ;
    document.getElementById("groupruleWrapper").innerHTML = `
    <div class="groupruletitle"><h2 >Collection of Display Rules:</h2></div>
    <div class="container" >
      <input type="checkbox" value="false" id="makeRuleCopy" class="hidealways hidealways2" >
      <div class="row">
        <div class="bg-white text-primary questionQuestionID col-3 mt-1"><input type="checkbox" class="checkboxNoChange hidealways2" disabled="true">&nbspAUTHOR:</div>
        <div id="groupruleAuthor" class="center questionQuestionContent required missing col-2 m-1"  contenteditable="true" onfocus ="focusFormattingAuthor()" onblur="trimCapNoFormattingAuthor()"></div>
        <!--<div id="groupruleAuthor" class="center questionQuestionContent required col-2 m-1">4</div>  -->
      </div>
      <div class="row">
        <div class="bg-white text-primary  col-3 mt-1 questionQuestionID"><input type="checkbox" class="checkboxNoChange hidealways2" disabled="true">&nbsp ID:</div>
        <div id="groupruleID" class="center col-2 m-1 questionQuestionContent required missing focusFormattingID"  contenteditable="true" onblur="trimCapNoFormattingID()"></div>
      </div>
      <div class="row">
        <div class="bg-white text-primary  col-3 mt-1 questionQuestionID"><input type="checkbox" class="checkboxNoChange hidealways2" disabled="true">&nbspFormattable Title:</div>
        <div id="groupruleContent" class="center col-8 mt-1 questionQuestionContent required missing"  contenteditable="true"  onblur="trimCapNoFormatting()"></div>
      </div>
      <br>
      Display if any rule is true, OR, display if all rules below are true:<br>
      &nbsp&nbsp&nbsp
      <input type="checkbox" id="all0Any1True" name="all0Any1True" value= 0 onclick= "all0Any1()">
      <label for="all0Any1True">    </label><span id="all0Any1TrueFalse">Display only when <b><u>all</u></b> rules below are true.</span>
      <div class="row">
        <div class="bg-white text-primary  col-3 mt-1>
          Tick if any true, Not Ticked if all True
          <input type="checkbox" disabled="false">
        </div>
      </div>
    </div>` ;
    let groupHeader = document.createElement("div") ;
    groupHeader.innerHTML = getQuestionnaireGroupChoicesHeader() ;
    groupHeader.classList.add("row");
    //groupHeader.classList.add("rowChoice");
    groupruleWrapper.appendChild(groupHeader) ;
    groupHeader = document.createElement("div") ;
    groupHeader.innerHTML = getQuestionaireGroupRowChoice() ;
    groupHeader.classList.add("row");
    groupHeader.classList.add("rowChoice");
    groupruleWrapper.appendChild(groupHeader) ;
    /*
    groupHeader = document.createElement("div") ;
    groupHeader.innerHTML = '  ***above relies on getQuestionnaireAnswerChoicesHeader()   AND getQuestionnaireBlankRowChoice()... THIS NEEDS TO BE CHANGED TO GROUPRULE FUNCTIONS  AND DESCRIPTION FOR CHECKBOX NEEDS TO CHANGE WHHEN TICKED !!! ***  ALSO, AUTHOR AND id AND DESCRIPTION NEED TO CHANGE,  CONSIDER USING QUESTIOnnAIRE === "" AS THE TEST to distinguish between questionnaire and group rule collection !!! *** ' ;
    groupHeader.classList.add("row");
    groupruleWrapper.appendChild(groupHeader) ;
    */
    document.getElementById("groupruleWrapper").classList.remove("hidealways") 
  }
  
  function getQuestionData(checkDatabase, ruleData) {
    console.log(" function getQuestionData(checkDatabase, ruleData) { - for 582");
    let db , tx , store , allSavedItems ;
    let databaseOpenRequest = indexedDB.open(checkDatabase.database);
    databaseOpenRequest.onsuccess = () => {
      console.log(" databaseOpenRequest.onsuccess = () => {");
      db = databaseOpenRequest.result ;
      tx = db.transaction(checkDatabase.tx1, checkDatabase.tx2) ;
      store = tx.objectStore(checkDatabase.store) ;
      allSavedItems = store.get(checkDatabase.keyPathValue) ; // we can put back the cursor approach if needed, it appears the problem was not he cursor, but rather omitting tx.oncomplete
      tx.oncomplete = () => {
        console.log("tx.oncomplete = () => {");
        db.close() ;
        if(allSavedItems.result === undefined) {
          selectQuestionForRuleToggleCloseWrapper()
        } else {
          console.log("allSavedItems.result:");
          console.log(allSavedItems.result);
          console.log("ruleData:");
          console.log(ruleData);
          console.log("ruleData: above");
          updateTrueruleAndQuestion( allSavedItems.result , ruleData ) 
        }
      }
    }
  }
  
  function get1QuestionFromIndexedDB(keyPathValue) {
    console.log("function get1QuestionFromIndexedDB(keyPathValue) {");
    let db , tx , store , allSavedItems ;
    let databaseOpenRequest = indexedDB.open("authorExcuTrust");
    databaseOpenRequest.onsuccess = () => {
      db = databaseOpenRequest.result ;
      tx = db.transaction("questionStore", "readonly") ;
      store = tx.objectStore("questionStore") ;
      allSavedItems = store.get(keyPathValue) ;
      tx.oncomplete = () => {
        db.close() ;
        return allSavedItems.result
      }
    }
  }
  
  function getTrueDataList (ruleData) {
    console.log("function getTrueDataList (ruleData) {");
    if( ruleData === undefined) {
      ruleData = {} ;
      ruleData.trueAnswerList = []
    }
    return ruleData
  }
  
  function updateTrueruleAndQuestion( questionData , ruleData ) {
    console.log("function updateTrueruleAndQuestion( questionData , ruleData ) for 641") ;
    let currentProcess = sessionStorage.getItem("currentprocess");
    if(currentProcess === "newQuestion") {
      return
    } 
    console.log(questionData) ;
    console.log("ruleData") ;
    console.log(ruleData) ;
    //if(document.getElementById("ruleContent")) {
      let temp = document.getElementById("ruleContent") ; 
      if(!temp) {
        // to prevent uncaught error of setting property to null element
        temp = {};
        temp.innerHTML="";
        temp.textContent = "" 
      }
      if( ruleData !== undefined) {
        temp.innerHTML = ruleData.ruleContent ;
      } else {
        temp.textContent = "" ;
        if(document.getElementById("ruleContent")) {
          temp.innerHTML = " " // 2020-12-16 09:43   not sure if should be blank.
        } 
      }
      //temp.innerHTML = ruleData.ruleContent ;
      if(temp.textContent.trim() === "" ) { // this is where failure is if temp or texContent is null. 
        console.log("temp - below ");
        console.log(temp);
        console.log(temp.hasOwnProperty("classList"));
        console.log("***                               the uncaught error is needed to make software work.  It is unknown why this is needed. Problem only occurs when user agrees to overwrite and existing question, where the existing question was identified as using a duplicated combination of author and ID values.  One possibility is to simply not allow this and reject the ID as not valid and force the user to use the 'Select Question' to modify attributes of the question, or copy them         ***")
        console.log("temp - above");
        //if(temp.hasOwnProperty("classList")) {temp.classList.add("missing")}
        temp.classList.add("missing")
      } else {
        temp.classList.remove("missing")
      } 
    //}
    updateScreen(questionData, questionData.keyPathValue) ;
    document.getElementById("questionWrapper").classList.add("hidealways");
    document.getElementById("questionWrapper").innerHTML = "" ;
    let temporary = document.getElementsByClassName("trueRule") ;
    let questionAnswerSortList = document.getElementsByClassName("questionAnswerSort") ;
    let questionAnswerDescriptionList = document.getElementsByClassName("questionAnswerDescription") ;
    let trueAnswerDescriptionList = [] ;
    ruleData = getTrueDataList (ruleData) ;
    let trueAnswerList = ruleData.trueAnswerList ;
    for (let index = 0; index < trueAnswerList.length; index++) {
      let element1 = trueAnswerList[index] ;
      let descriptionElement = questionAnswerDescriptionList[index].innerHTML ;
      trueAnswerDescriptionList.push(descriptionElement) ;
      let isTrue = element1 + "" ;
      //alert("trueAnswerList needs to change from questionAnswerSort to what ever classname is used for the actual html element, and use the innerHTML") ;
      for (let index2 = 0; index2 < questionAnswerSortList.length; index2++) {
        let element2 = questionAnswerSortList[index2] ;
        let mightBeTrue = element2.valueAsNumber + "" ;
        trueAnswerDescriptionList.push(descriptionElement) ;
        if(isTrue === mightBeTrue) {
          let makeTrue = temporary[index2] ;
          makeTrue.checked = true ;
          index2 = questionAnswerSortList.length 
        }   
      }    
    }
    ruleData.trueAnswerDescriptionList = trueAnswerDescriptionList ;
    document.getElementById("saveButton").value = "" 
  }
  
  
  function getRuleQuestion(ruleData) {
    console.log("function getRuleQuestion(ruleData) {") ;
    let questionObject = getDatabaseSetup() ;
    questionObject.store = "questionStore" ;
    questionObject.tx1 = "questionStore" ;
    questionObject.keyPathValue = ["questionStore",1,ruleData.questionAuthor,1,ruleData.questionID] ;
    getQuestionData(questionObject , ruleData )
  }
  
  function checkDataBase(modeType) {  // when user inputs an combination of author and ID for any store which exists as a record, retreive the information from the database and prevents changes unless user checks allow changes. 
    console.log("function checkDataBase(modeType)") ;
    if(modeType === undefined ) {
      if (document.getElementById("makeCopy").checked === false) { // allow changes
        document.getElementById("questionID").innerText = document.getElementById("questionID").innerText.toUpperCase().trim() ;
        document.getElementById("questionAuthor").innerText = document.getElementById("questionAuthor").innerText.toUpperCase().trim() ;
        if(document.getElementById("questionID").innerText !== ""){ // ignore if blank
          if(document.getElementById("questionAuthor").innerText !== ""){  // ignore if blank
            let where = "look for" ;
            let type = document.getElementById("formtitle").innerText.toUpperCase() ;
            if(type.indexOf('QUESTIONNAIRE')>-1) {
              where = "questionnaireStore"
            } else if (type.indexOf('RULE')>-1) {
              where = "ruleStore" 
          } else if (type.indexOf('QUESTION')>-1) {
            questionSetup()
          }
        }
      }
    }
   }
  }
  
  function questionSetup() {
    console.log("function questionSetup() {") ;
    let checkDatabase = {} ;
    let where = "questionStore" ;
    checkDatabase.store = where ;
    checkDatabase.tx1 = where ;
    checkDatabase.keyPathValue = [
      where,
      1,
      document.getElementById("questionAuthor").innerText.trim().toUpperCase(),
      1,
      document.getElementById("questionID").innerText.trim().toLocaleUpperCase()
    ];
    allStoreSetup(checkDatabase)
  }
  
  function allStoreSetup(checkDatabase) {
    console.log("function allStoreSetup(checkDatabase) {") ;
    checkDatabase.database = "authorExcuTrust" ;
    // from retrieve
    let databaseOpenRequest = indexedDB.open(checkDatabase.database);
    databaseOpenRequest.onsuccess = () => {
      db = databaseOpenRequest.result ;
      tx = db.transaction(checkDatabase.tx1, checkDatabase.tx2) ;
      store = tx.objectStore(checkDatabase.store) ;
      allSavedItems = store.get(checkDatabase.keyPathValue) ; // we can put back the cursor approach if needed, it appears the problem was not he cursor, but rather omitting tx.oncomplete
      tx.oncomplete = () => {
        db.close() ;
        updateScreen(allSavedItems.result, checkDatabase.keyPathValue)
      } 
    }
  }
  
  function doTestForChange() {
    console.log("function doTestForChange() {") ;
    if(document.getElementById("questionID")){
      return document.getElementById("questionID").innerText
    } else if (document.getElementById("groupruleID")) {
      return document.getElementById("groupruleID").innerText
    } else if (document.getElementById("ruleID")) {
      return document.getElementById("ruleID").innerText
    }
  }
  
  function focusFormattingID(modeType){
    console.log("function focusFormattingID(modeType){") ;
    if(modeType === undefined) {
      document.getElementById("testForChange").innerText = doTestForChange() 
    } else if(modeType === 'questionnaire'){
      document.getElementById("testForChange").innerText = document.getElementById("questionnaireID").innerText
    }
  }
  
  function focusFormattingAuthor(modeType){
    console.log("function focusFormattingAuthor(modeType){") ;
    if(modeType === undefined) {
  
      document.getElementById("testForChange").innerHTML = document.getElementById("questionAuthor").innerText
    } else if (modeType === 'questionnaire') {
      document.getElementById("testForChange").innerHTML = document.getElementById(modeType+"Author").innerText
    }
  }
  
  function getTrueTypeQuestion() {
    console.log("function getTrueTypeQuestion() {") ;
    let ele = [
      "questionTypeDiv_checkbox" , // 0
      "questionTypeDiv_date" , // 1
      "questionTypeDiv_datetime-local" , // 2
      "questionTypeDiv_email" ,// 3
      "questionTypeDiv_file" ,// 4
      "questionTypeDiv_month" ,// 5
      "questionTypeDiv_number" ,// 6
      "questionTypeDiv_password" ,// 7
      "questionTypeDiv_radio" ,// 8
      "questionTypeDiv_tel" ,// 9
      "questionTypeDiv_text" ,// 10
      "questionTypeDiv_url" ,// 11
      "questionTypeDiv_week" ,// 12
      "questionTypeDiv_na" ,// 13
      "questionTypeDiv_naExplained" ,// 14
      "questionTypeDiv_modal" , // 15
      "questionTypeDiv_dropdown" // 16
      ] ;
    //let ele = document.getElementsByClassName(options); 
    let eleDescription = "" ;
    for (i = 0; i < ele.length; i++) { 
        if(document.getElementById(ele[i]).checked) {
          eleDescription = ele[i];        
          i = ele.length
        }
    }
    let temp = document.getElementById("questionTypeDiv") ;
    if (eleDescription === "") {
      temp.classList.add("missing")
    } else {
      temp.classList.remove("missing")
    }
    return eleDescription
  }
  
  function getQuestionnaireChoiceRow() {
    console.log("function getQuestionnaireChoiceRow() {") ;
    let choiceListNew = `<div class="row rowChoice">
      <div  class="col-2 numerical-input m-1 p-1" >
        <!-- <input type="number" class = "questionAnswerSort missing border-primary"> -->
        <input type="number" class = "questionAnswerSort border-primary">
      </div>
      <div class="questionAnswerDescription missing col-4 p-2" contenteditable="true"></div>
      <div class="questionExplanationRequireYesNo col-4 p-3 border border-warning" >
        <input type="checkbox" class="checkboxExplain"> Questionnaire Choice Require explanation      
        <input type="checkbox" class="checkboxNoChange hidealways"><br>
        <input type="button" value="Insert Copy" class="copyBtn">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<input type="button" value="Delete" class="deleteBtn deleteBtn2">
      </div>
      <!-- <div class="questionAnswerNotesDescription col-2" contenteditable="true"></div> -->
      <div class="btn-group trueRuleDiv rulecheckbox p-1" data-toggle="buttons">
        <label class="btn btn-outline-danger">
        <input type="checkbox" class="trueRule" autocomplete="off"> Display
        <span class="glyphicon glyphicon-ok"></span>
        </label>
      </div>
      <div>
        <hr>
      </div>
      <hr>
    </div>`  ;
    return choiceListNew
  }
  
  
  
  function getChoiceRow() {
    console.log("function getChoiceRow() {") ;
    let choiceListNew = `<div class="row rowChoice">
      <div  class="col-2 numerical-input m-1 p-1" >
        <!-- <input type="number" class = "questionAnswerSort missing border-primary"> -->
        <input type="number" class = "questionAnswerSort border-primary">
      </div>
      <div class="questionAnswerDescription missing col-4 p-2" contenteditable="true"></div>
      <div class="questionExplanationRequireYesNo col-4 p-3 border border-warning" >
        <input type="checkbox" class="checkboxExplain"> Require explanation      
        <input type="checkbox" class="checkboxNoChange hidealways"><br>
        <input type="button" value="Insert Copy" class="copyBtn">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<input type="button" value="Delete" class="deleteBtn deleteBtn2">
      </div>
      <!-- <div class="questionAnswerNotesDescription col-2" contenteditable="true"></div> -->
      <div class="btn-group trueRuleDiv rulecheckbox p-1" data-toggle="buttons">
        <label class="btn btn-outline-danger">
        <input type="checkbox" class="trueRule" autocomplete="off"> Display
        <span class="glyphicon glyphicon-ok"></span>
        </label>
      </div>
      <div>
        <hr>
      </div>
      <hr>
    </div>`  ;
    return choiceListNew
  }
  
  function getQuestionAnswerChoices() {
    console.log("function getQuestionAnswerChoices() {") ;
    let temp = '<hr>'+ getChoiceRow() ;
    return temp
  }
  function getQuestionAnswerChoicesHeader() {
    console.log("getQuestionAnswerChoicesHeader()");
  // this could replace other location if it is parsed, "HOPE TO SEE"
    let temp =  ` <div class="text-primary col-3">
    Position Number<br>&nbsp a) unique and numeric; <br>&nbsp b) negative and/or decimal point
  </div>
  <div class="questionAnswerTitle col-3 text-primary">Formattable Choice Description </div>
  <div class="questionAnswerTitle col-3 text-warning">Answer per Question Setup</div>
  
    <div class="questionAnswerTitle col-3 text-danger trueRuleDiv" style = "text-align:center"> Check to Display<br>    
      <div class="btn-group  rulecheckbox p-1" data-toggle="buttons" style = "text-align:right">
        <label class="btn btn-outline-danger" style = "text-align:right">
          <input type="checkbox" autocomplete="off" checked ="true" disabled = "true"> Display
          <span class="glyphicon glyphicon-ok"></span>
        </label>
    </div>
  
  </div>` ;
    return  temp
  }
  
  function getQuestionaireGroupRowChoice () {
    console.log("function getQuestionaireGroupRowChoice () {") ;
    let temp =  `
    <div class="row rowChoice m-0">
        <div  col-1" > </div>
        <div  col-1"> </div>
        <div class="col-6"><span class = "questionRuleDescription"><button class="QuestionnaireRule questionnaireSelectRule" type="submit">Select Display Rule or Collection </button></span></div>
        <div  class="col-3 questionnairecloud" > </div>
        <div  class="col-1" ><input type="Button" class="deleteBtn" value="Delete"><br/><br/><input type="Button" class="copyBtn" value="Insert"></div>
      </div>  
    `;
    return  temp
  }
  
  function newQuestionTrueFalse() {
    console.log("newQuestionTrueFalse()  *** could be replaced by use of arrow function syntax to define the functions in the object, and to execute the function stored in the object based on the value of the variable, e.g. myObj[myVar](); described in comments. ")
    let currentProcess = sessionStorage.getItem("currentprocess");
    if(currentProcess === "newQuestion") {
      return true
    } else {
      return false
    }
  }
  
  
  function notBlankId () {
    console.log("function notBlankId ()");
    let Id ;
    if (newQuestionTrueFalse()){
      Id = document.getElementById("questionID").innerText;  
    } else {
      Id = document.getElementById("questionnaireID").innerText ;
    }
    if(!Id) {
      //return  "noDocId"
      return  null
    }
    return Id
  }
  
  function notBlankAuthor () {
    console.log("function notBlankAuthor ()");
    // need a way to know the type document being processed in this session.   Should be saved in session storeage. 
    let author ;
    if (newQuestionTrueFalse()){
      author = document.getElementById("questionAuthor").innerText.trim().toUpperCase()  
    } else {
      author = document.getElementById("questionnaireAuthor").innerText.trim().toUpperCase()
    }
    if(!author) {
      //return  "noAuthor"
      return  null
    }
    return author
  }
  function makeQuestionnaireRowID(rowOffset) {
    console.log("function makeQuestionnaireRowID(rowOffset)");
    if(rowOffset === undefined) {
      rowOffset = document.getElementsByClassName("questionAnswerSort").length
    }
    let author = notBlankAuthor() ;
    if(!author) { return null};
    let docId = notBlankId() ; 
    if(!docId) { return null}; 
    let part1 = doPart1() ;
    let part2 = doPart2 (Date.now()) ;
    let part4 = doPart4() ;
    let rowId = part1 + author + part2 + docId + rowOffset + part4 ;
    return rowId
  }
  
  function getQuestionnaireBlankRowChoice () {
    console.log("function getQuestionnaireBlankRowChoice () {");
    let temp =  `
    <div class="row rowChoice m-0">
        <div  class="numerical-input col-2" >
          <!-- <input type="number" class = "questionAnswerSort missing border-primary"> -->
          <input type="number" class = "questionAnswerSort border-primary">
          <input type="Button" class="allowSelectRule" value="Click to Always Display">
        </div>
        <div class="questionAnswerDescription col-4">
          <button class="questionnaireQuestion questionnaireSelectQuestion" type="submit">Select Question</button>
        </div>
        <div class="col-3">
          <span class = "questionRuleDescription">
            <button class="QuestionnaireRule questionnaireSelectRule" type="submit">Select Display Rule or Collection </button>
          </span>
        </div>
        <div  class="col-1 questionnairecloud" > </div>
        <div  class="col-1" >
          <input type="Button" class="deleteBtn" value="Delete">
          <br/><br/>
          <input type="Button" class="copyBtn" value="Insert">
        </div>
      </div> 
    `;
    return  temp
  }
  
  
  function getQuestionnaireBlankRowChoiceV2() {
    console.log(" function getQuestionnaireBlankRowChoiceV2() {");
    let outerDiv = document.createElement("div") ;
    outerDiv.innerHTML = getQuestionnaireBlankRowChoice ();
    let rowDiv = outerDiv.getElementsByClassName("rowChoice")[0];
    //rowDiv.id = "rowDivId" ;
    rowDiv.id = makeQuestionnaireRowID();
    //console.log ("outerDiv");
    //console.log (outerDiv);
    //alert (`outerDiv:    ${outerDiv.innerHTML}  `)
  }
  
  function getQuestionnaireGroupChoicesHeader() {
    console.log("function getQuestionnaireGroupChoicesHeader() {");
    let temp =  `
    <div class="text-primary col-3"></div>
    <div class="questionAnswerTitle col-3 text-primary"></div>
    <div class="questionAnswerTitle col-3 text-warning"></div>
    <div class="questionAnswerTitle col-3 text-danger trueRuleDiv" style = "text-align:center"></div>
    <br>
    <div id="questionAnswerChoices" class="container-fluid saver m-1">
      <div class="row NOrowChoice m-0">
        <div class="text-primary col-4">Display Rules</div>
        <br>
      </div> 
    </div>` ;
    return  temp
  }
  
  
  function getQuestionnaireAnswerChoicesHeader() {
    console.log("function getQuestionnaireAnswerChoicesHeader() {");
    let temp =  `
    <div class="text-primary col-3"></div>
    <div class="questionAnswerTitle col-3 text-primary"></div>
    <div class="questionAnswerTitle col-3 text-warning"></div>
    <div class="questionAnswerTitle col-3 text-danger trueRuleDiv" style = "text-align:center"></div>
    <br>
    <div id="questionAnswerChoices" class="container-fluid saver m-1">
      <div class="row NOrowChoice m-0">
        <div class="text-primary col-2">1. Position Sort <br>&nbsp (any unique number)</div>
        <div class="text-primary col-1">2. Question</div>
        <div class="text-primary col-3">3. Question Wording</div>
        <div class="text-primary col-1">4. Select Display Rule</div>
        <div class="text-primary col-2">5. Display Rule Wording</div>
        <div class="text-primary col-1">6. Row Status<br>(draft, published, disabled)</div>
        <div class="text-primary col-2">7. Deleted, Insert last </div>
        <br>
      </div> 
    </div>` ;
    return  temp
  }
  
  function getQuestionnaireSubHeaderAndRows () {
    console.log("function getQuestionnaireSubHeaderAndRows () {");
    let frag ;
    document.getElementById("questionnaireAnswerChoices").innerHTML = getQuestionnaireAnswerChoicesHeader() ;
    let answerChoices = document.getElementById("questionnaireAnswerChoices") ;
    getQuestionnaireBlankRowChoiceV2();
    let blankRow = getQuestionnaireBlankRowChoice () ;
    answerChoices.insertAdjacentHTML('beforeend', blankRow) ;
    frag = document.createDocumentFragment();
    let rowsArrayLength =  document.createElement("div");
    rowsArrayLength.innerHTML = getQuestionnaireAnswerChoicesHeader() ;
    frag.appendChild(rowsArrayLength); 
    document.getElementById("questionnaireWrapper").appendChild(frag) ;
    document.getElementById("questionnaireWrapper").classList.remove("hidealways") 
  }
  
  function getChoiceListNew (){
    console.log("function getChoiceListNew (){");
    //document.getElementById("questionAnswerChoicesHeader").innerHTML = getQuestionAnswerChoices() ;
    document.getElementById("questionAnswerChoicesHeader").innerHTML = getQuestionAnswerChoicesHeader();
    document.getElementById("questionAnswerChoices").innerHTML = '<hr>'+ getChoiceRow() ;
    //allShowGroup (true, "deleteBtn")  ;
    if (document.getElementById("process1").textContent === "modifyQuestionOptions" ) {
      clearQuestionTrueRule() ;
      allShowGroup (true, "deleteBtn") 
    }
    document.getElementById('process2').textContent = "emptyEvents" 
  }
  
  function trueTypeQuestion() {
    console.log("function trueTypeQuestion() {");
    temp = getTrueTypeQuestion() ;
    if (temp === "") {
      temp = "not multi"
    }
    let multilist = [
      /*
      "questionTypeDiv_checkbox" , // 0
      "questionTypeDiv_date" , // 1
      "questionTypeDiv_datetime-local" , // 2
      "questionTypeDiv_email" ,// 3
      "questionTypeDiv_file" ,// 4
      "questionTypeDiv_month" ,// 5
      "questionTypeDiv_number" ,// 6
      "questionTypeDiv_password" ,// 7
      */ 
      "questionTypeDiv_radio" ,// 8
      /*
      "questionTypeDiv_tel" ,// 9
      "questionTypeDiv_text" ,// 10
      "questionTypeDiv_url" ,// 11
      "questionTypeDiv_week" ,// 12
      "questionTypeDiv_na" ,// 13
      "questionTypeDiv_naExplained" ,// 14
      */
      "questionTypeDiv_modal", // 15
      "questionTypeDiv_dropdown" // 16
    ] ;
    let test = multilist.indexOf(temp) ;
    if (test !== -1) {
          // requires multiple choices, and retains existing ones if any
      if( document.getElementById("questionAnswerChoicesHeader").innerHTML === ""  ) {
        //alert (`empty list`) ;
        getChoiceListNew() ;
        //setupEvents() // 2020-07-20 ***
      }
    } else {
      if( document.getElementById("questionAnswerChoicesHeader").innerHTML !== ""  ) {
        //alert (`empty list`) ;
        document.getElementById("questionAnswerChoicesHeader").innerHTML = "";
        document.getElementById("questionAnswerChoices").innerHTML = "" ;
        document.getElementById('process2').textContent = "emptyEvents" 
      }
  
      // does not allow multiple choices, and clears existing choices, if any 
      //document.getElementById("questionAnswersList").innerHTML = "" ; //*** 2020-10-31 06:59
    }
    //fixMissing2() ;
    fixMissing() ;
  }
  
  function genericTrimCapList(elementArray) {
    console.log("function genericTrimCapList(elementArray) {");
    elementArray.forEach(element => {
      alert = (` element is "${element}"`) ;
      let now = document.getElementById(element);
      if (now.innerText.trim() === ""){
        now.innerHTML = "" ;
        now.classList.add("missing") ;
        document.getElementById("saveButton").innerText = ""
        // 20200706 *** fixMissing()
      } else {
        now.classList.remove("missing") ;
        now.innerHTML = now.innerText.toUpperCase().trim() 
      }
    }) ;
    fixMissing()
  }
  
  
  function trimCapNoFormattingDefinedID(process) {
    console.log("function trimCapNoFormattingDefinedID(process) {");
      let author = document.getElementById(process+"Author") ;
      let nowAuthor = author.innerText.trim() ;
      //nowAuthor = nowAuthor.trim() ;
      if(nowAuthor === "") {
        let nowID = document.getElementById(process+"ID") ;
        nowID.innerHTML = "" ;
        let nowContent = document.getElementById(process+"Content") ;
        nowContent.innerHTML = ""
      }
      genericTrimCapList([ process+"Author", process+"ID" , process+"Content" ])
  }
  
  function trimCapNoFormattingDefinedAuthor(process) {
    console.log("function trimCapNoFormattingDefinedAuthor(process) {");
    let compareSaved = document.getElementById("testForChange") ;
    compareSaved = compareSaved.innerText ;
    //alert (`author value before change = "${compareSaved}"`) ;
    let author = document.getElementById(process+"Author") ;
    let trimed = author.innerText.toUpperCase().trim() ;
    author.innerHTML = trimed ;
    //let compareSaved = document.getElementById("testForChange").innerText;
    if ( trimed !== compareSaved) {
      document.getElementById(process+"ID").innerHTML = "" ;
      document.getElementById(process+"Content").innerHTML = "" 
    }
    if( trimed === "") {
      //let nowID = document.getElementById(process+"ID") ;
      //nowID.innerHTML = "" ;
      document.getElementById(process+"ID").innerHTML = "" ;
      document.getElementById(process+"Content").innerHTML = "" 
    }
    genericTrimCapList([ process+"Author" , process+"ID" , process+"Content" ])
  }
  
  
  function trimCapNoFormattingID(process) {
    console.log("function trimCapNoFormattingID(process)");
    if(process === 'questionnaire') {
      trimCapNoFormattingDefinedID(process)
    } else {
      // process = document.getElementById("process0").textContent ;    *** may or may not be needed. 
      trimCapNoFormatting(process) ;
      process = document.getElementById("process0").textContent ;
      if(process === "New Question" ) {
        if( document.getElementById("testForChange").innerText !== document.getElementById("questionID").innerText ) {
          checkDataBaseByType("questionStore" , "questionStore" , document.getElementById("questionAuthor").innerText , document.getElementById("questionID").innerText )
        }
      } else if (process === "New Question Level Rule") {
        if( document.getElementById("testForChange").innerText !== document.getElementById("ruleID").innerText ) {
          checkDataBaseByType("ruleStore" , "trueruleStore" , document.getElementById("ruleAuthor").innerText , document.getElementById("ruleID").innerText )
        }
      } else if (process === "New Questionnaire") { 
      } else if (process === "New Group Rule") {
        if( document.getElementById("testForChange").innerText !== doTestForChange() ) { //2020-12-06-07:11 ***
          checkDataBaseByType("ruleStore" , "groupruleStore" , document.getElementById("groupruleAuthor").innerText , document.getElementById("groupruleID").innerText ) 
        }
      }
    }
  }
  
  function trimCapNoFormattingAuthor(modeType){
    console.log("function trimCapNoFormattingAuthor(modeType){");
    if(!modeType){
      let buttonTitle = sessionStorage.getItem('buttonaction');
      if(buttonTitle === "New Question"){
  
      }
    }
    if(modeType === 'questionnaire') {
      trimCapNoFormattingDefinedAuthor(modeType) //;
      //alert (`trimCapNoFormattingAuthor(modeType) - modeType is *** B *** "${modeType}"`) 
    } else {
      modeType = document.getElementById("process0");
      let process = modeType.textContent;  
      // 2020-12-16-06-11 *** alert (`trimCapNoFormattingAuthor(modeType) - modeType is *** A ***  "${process}"`) ;
      trimCapNoFormatting(modeType) ; // *** 2020-10-23 not sure if needed. 
      if(modeType === undefined) {
        if( document.getElementById("testForChange").innerText !== document.getElementById("questionAuthor").innerText ) {
          checkDataBase() 
        }
      } else if (modeType === 'questionnaire'){
        if( document.getElementById("testForChange").innerText !== document.getElementById("questionnaireAuthor").innerText ) {
          checkDataBase(modeType) 
        }
      }
    }
  }
  
  function trimCapNoFormatting() {
    console.log("function trimCapNoFormatting() {");
    // new section below setup for 4 different types of new database entries 1) question, 2) questionnaire, 3) question level rule, 4) groups of rules ( question level and /or group rules), however, the lowest level of a group must always be a question level rule. 
    let trimCapList = [] ;
    let process = document.getElementById("process0") ;
    
    if(process.textContent === "New Question" ) {
      trimCapList = ["questionAuthor","questionID","questionContent"] ;
    } else if (process.textContent === "New Question Level Rule") {
      trimCapList = ["ruleAuthor","ruleID","ruleContent"]  ;
    } else if (process.textContent === "New Questionnaire") {
      trimCapList = ["questionnaireAuthor","questionnaireID","questionnaireContent"] ;
    } else if (process.textContent === "New Group Rule") {
      trimCapList = ["groupruleAuthor","groupruleID","groupruleContent"] ;
    }
    showHideSaveButtonByID(process.textContent) ;
    trimCapList.forEach(element => {
    let now = document.getElementById(element);
    //if(element === "questionContent") { // old
    if(element === "questionContent" || element === "ruleContent" || element === "questionnaireContent" || element === "groupruleContent" ) { // new 2020-07-31
      if (now.innerText.trim() === ""){
        now.innerHTML = "" ;
        now.classList.add("missing") ;
        // 20200706 *** fixMissing()
      } else {
          now.classList.remove("missing") ;
          // 20200706 *** fixMissing()
      }
    } else{
      if(now.innerHTML!== now.innerText.toUpperCase().trim()){
        now.innerHTML = now.innerText.toUpperCase().trim() ;
      }
    }
    checkClass(now)
    }) ;
    fixMissing()
  }
  function checkClass (now) {
    console.log("function checkClass (now) {");
    let correctClass = now.classList.contains("missing") ;
    if(now.innerText === ""){
      if(!correctClass){
        // add class  and count class elements and update
        now.classList.add("missing") ;
        trimCapNoFormatting() ;
        fixMissing()
      }
    } else {
      // not blank
      if(correctClass){
        // remove class and count class elements and update
        now.classList.remove("missing") ;
        trimCapNoFormatting() ;
        fixMissing()
      }
    }
  }
  
  function getAllChoiceTypes() {
    console.log("function getAllChoiceTypes() {");
    return `                          <div><b> 3 of 4 Multiple Choice:</b> (retains all choices, if any, listed below)<br>
    <label class="btn btn-outline-secondary" for="questionTypeDiv_radio">
        <input type="radio" id="questionTypeDiv_radio" name="questionTypeDiv" class="questionTypeDivList" value="questionTypeDiv_radio" onclick="trueTypeQuestion()">&nbsp Radio Button- used for short lists, generally less than 5 *** 1 0f 2 choices (&#128280;)
    </label>
    <br>
    <label class="btn btn-outline-secondary" for="questionTypeDiv_modal">
        <input type="radio" id="questionTypeDiv_modal" name="questionTypeDiv" class="questionTypeDivList" value="questionTypeDiv_modal" onclick="trueTypeQuestion()">&nbsp Modal - used for long and filtered lists
    </label>
    <br>
    <label class="btn btn-outline-secondary" for="questionTypeDiv_dropdown">
        <input type="radio" id="questionTypeDiv_dropdown" name="questionTypeDiv" class="questionTypeDivList" value="questionTypeDiv_dropdown" onclick="trueTypeQuestion()">&nbsp Drop Down - used for short lists, generally less than 20 choices
    </label>
  </div>
  <b>Other:</b> (clears all choices, if any, listed below) <br>
  <label class="btn btn-outline-secondary" for="questionTypeDiv_checkbox">
    <input type="radio" id="questionTypeDiv_checkbox" name="questionTypeDiv"            class="questionTypeDivList" value="questionTypeDiv_checkbox" onclick="trueTypeQuestion()">&nbsp Check Box<br>(&#9745;)
  </label>
  <label class="btn btn-outline-secondary" for="questionTypeDiv_date">
    <input type="radio" id="questionTypeDiv_date" name="questionTypeDiv" class="questionTypeDivList" value="questionTypeDiv_date" onclick="trueTypeQuestion()" >&nbsp Calendar / date<br>(&#128197;)
  </label>
  <label class="btn btn-outline-secondary" for="questionTypeDiv_datetime-local">
    <input type="radio" id="questionTypeDiv_datetime-local" name="questionTypeDiv" class="questionTypeDivList" value="questionTypeDiv_datetime-local" onclick="trueTypeQuestion()" >&nbsp Local Time<br>(&#x1F550;)
  </label>
  <label class="btn btn-outline-secondary" for="questionTypeDiv_email">
    <input type="radio" id="questionTypeDiv_email" name="questionTypeDiv" class="questionTypeDivList" value="questionTypeDiv_email" onclick="trueTypeQuestion()">&nbsp Email<br>(<b>@</b>&#9993;)
  </label>
  <label class="btn btn-outline-secondary" for="questionTypeDiv_file">
    <input type="radio" id="questionTypeDiv_file" name="questionTypeDiv" class="questionTypeDivList" value="questionTypeDiv_file" onclick="trueTypeQuestion()">&nbsp File (browse to choose a file)
  </label>
  <label class="btn btn-outline-secondary" for="questionTypeDiv_month">
    <input type="radio" id="questionTypeDiv_month" name="questionTypeDiv" class="questionTypeDivList" value="questionTypeDiv_month" onclick="trueTypeQuestion()" >&nbsp Month and Year
  </label>
  <label class="btn btn-outline-secondary" for="questionTypeDiv_number">
    <input type="radio" id="questionTypeDiv_number" name="questionTypeDiv" class="questionTypeDivList" value="questionTypeDiv_number" onclick="trueTypeQuestion()">&nbsp Number
  </label>
  <label class="btn btn-outline-secondary" for="questionTypeDiv_password">
    <input type="radio" id="questionTypeDiv_password" name="questionTypeDiv" class="questionTypeDivList" value="questionTypeDiv_password" onclick="trueTypeQuestion()">&nbsp Password
  </label>
  <label class="btn btn-outline-secondary" for="questionTypeDiv_tel">
    <input type="radio" id="questionTypeDiv_tel" name="questionTypeDiv" class="questionTypeDivList" value="questionTypeDiv_tel" onclick="trueTypeQuestion()">&nbsp Telephone<br>(&#128222;)
  </label>
  <label class="btn btn-outline-secondary" for="questionTypeDiv_text">
    <input type="radio" id="questionTypeDiv_text" name="questionTypeDiv" class="questionTypeDivList" value="questionTypeDiv_text" onclick="trueTypeQuestion()">&nbsp Text
  </label>
  <label class="btn btn-outline-secondary" for="questionTypeDiv_url">
    <input type="radio" id="questionTypeDiv_url" name="questionTypeDiv" class="questionTypeDivList" value="questionTypeDiv_url" onclick="trueTypeQuestion()">&nbsp url
  </label>
  <label class="btn btn-outline-secondary" for="questionTypeDiv_week">
    <input type="radio" id="questionTypeDiv_week" name="questionTypeDiv" class="questionTypeDivList" value="questionTypeDiv_week" onclick="trueTypeQuestion()">&nbsp week
  </label>
  <label class="btn btn-outline-secondary" for="questionTypeDiv_na">
    <input type="radio" id="questionTypeDiv_na" name="questionTypeDiv" class="questionTypeDivList" value="questionTypeDiv_na" onclick="trueTypeQuestion()">&nbsp Not Applicable, Used for information purposes
  </label>
  <label class="btn btn-outline-secondary" for="questionTypeDiv_naExplained">
    <input type="radio" id="questionTypeDiv_naExplained" name="questionTypeDiv" class="questionTypeDivList" value="questionTypeDiv_naExplained" onclick="trueTypeQuestion()">&nbsp Not Applicable, Used for requesting an explanation only
  </label>`
  }
  
  
  function questionRedundant() {
    console.log("function questionRedundant() {");
    if (
      document.getElementById("questionID").innerText.trim() === "" |
      document.getElementById("questionAuthor").innerText.trim() === "" |
      document.getElementById("questionContent").innerText.trim() === "" 
    ) {
      document.getElementById("questionAnswerChoicesHeader").innerHTML = "";
      document.getElementById("questionAnswerChoices").innerHTML = "" ;
      document.getElementById('process2').textContent = "emptyEvents"  ;
      document.getElementById("questionHeader20200707").classList.add("hidealways") ; 
      document.getElementById("typeOfQuestion20200707").classList.add("hidealways") ;
      document.getElementById("allChoiceTypes").classList.add("hidealways") ;
      document.getElementById("questionTypeDiv").classList.add("hidealways") ;
      document.getElementById("allChoiceTypes").innerHTML = "" ;
    } else {
      document.getElementById("questionHeader20200707").classList.remove("hidealways") ; 
      document.getElementById("typeOfQuestion20200707").classList.remove("hidealways") ;
      document.getElementById("allChoiceTypes").classList.remove("hidealways") ;
      document.getElementById("questionTypeDiv").classList.remove("hidealways") ;
      document.getElementById("questionHeader20200707").classList.remove("hidealways");
      document.getElementById("typeOfQuestion20200707").classList.remove("hidealways");
      if(document.getElementById("allChoiceTypes").innerHTML = "") {
        document.getElementById("allChoiceTypes").innerHTML = getAllChoiceTypes()
      }
    }
  }
  function fixQuestionnaireMissing() {
    console.log("function fixQuestionnaireMissing() {");
    let theContent ;
    let where = document.getElementById("questionnaireWrapper") ;
    let theArray = ["questionnaireAuthor","questionnaireID","questionnaireContent"] ;
    theArray.forEach(element => {
       theContent = document.getElementById(element) ;  
       let isblankContent = theContent.textContent.trim();
       if(isblankContent === "") {
        theContent.classList.add("missing") 
      } else {
        theContent.classList.remove("missing") 
      }  
    }
    );
    let temp = where.getElementsByClassName("missing") ;
    let counter = temp.length ;
    let show = document.getElementById("missing") ;
    let theStyle = window.getComputedStyle(show).display;
    if(counter !== 0) {
      show.innerText = `Number of fields needing  input: ${counter}.`;
      if(theStyle !== "block") {
        show.style.display = "block"
      }    
    } else {
      if(theStyle !== "none") {
        show.style.display = "none";
        show.getInnerText = ""
      }    
    }
  }
  
  function testForFixMissing() {
    console.log("function testForFixMissing() {");
    let count = document.getElementsByClassName("questionAnswerSort").length // *** 2020-12-01 if we remove this value to begin with, we can not test for it, see if done 
    if( count !== 0) {
        let theList = document.getElementsByClassName("questionAnswerSort") ;
        let theListLength = theList.length ;
        for (let index = 0; index < theListLength; index++) {
          let element = theList[index];
          element.classList.remove("missing")
        }
    }
    //if( 1 === 0) {
    count = document.getElementsByClassName("missing").length ;
    if( count !== 0) {
      let headerArray = ["groupruleAuthor","groupruleID","groupruleContent","ruleAuthor","ruleID","ruleContent","questionAuthor","questionID","questionContent","questionnaireAuthor","questionaireID","questionaireContent","questionnaireRuleAuthor","questionaireRuleID","questionaireRuleContent","questionnaireQuestionAuthor","questionaireQuestionID","questionaireQuestionContent"] ;
      //let headerArray = ["ruleAuthor","ruleID","ruleContent"] ;
      let headerArrayLength = headerArray.length ;
      for (i = 0; i < headerArrayLength; i++) { 
        let theElement = document.getElementById(headerArray[i]) ; 
        if( theElement !== undefined && theElement !== null) {
          let theElementText  = theElement.innerText ;
          let str = theElementText.trim() ;
          if( str.length !== 0) {
            theElement.classList.remove("missing")
          }
        }
      }
      count = document.getElementsByClassName("missing").length ;
      if(count === 0) {
        let temp = document.getElementById("missing") ;
        if ( temp !== undefined) {
          temp.style.display = "none" ;
          temp.innerHTML = ""   
        }
      }
    }
    if(count === 0) {
      let temp = document.getElementById("missing") ;
      if ( temp !== undefined) {
        temp.style.display = "none" ;
        temp.innerHTML = ""   
      }
    }
  }
  
  function fixMissing() {
    console.log("function fixMissing() {");
    testForFixMissing() ;
    let type = document.getElementById("formtitle").innerText.toUpperCase() ;
    if(type.indexOf('SELECT DISPLAY RULE OR COLLECTION') === -1) {
      let where ,counter , show , theStyle , temp ;
      if(type.indexOf('QUESTIONNAIRE')>-1) {
        where = document.getElementById("questionnaireWrapper")
      } else if (type.indexOf('RULE')>-1) {
        where = document.getElementById("ruleWrapper") ;
        preventSave()  // this when building questionnaire  surfaced when doing 
      } else if (type.indexOf('QUESTION')>-1) {
        where = document.getElementById("questionWrapper") ;
        // neeed to eliminate content not being used. 
        questionRedundant() ;
        preventSave()  // this when building questionnaire  surfaced when doing 
      }
      if(where !== undefined) {
        if(type.indexOf('QUESTIONNAIRE')>-1) {
          // to prevent checking missing furter when not a question, note questionTypeDIVs will not be there
        } else {
          //  let counter = document.getElementsByClassName("missing").length ;
          //counter = where.getElementsByClassName("missing").length ;
          //preventSave() ; // this when building questionnaire  surfaced when doing questionnaire  
          temp = where.getElementsByClassName("missing") ;
          counter = temp.length ;
          if (
            document.getElementById("questionTypeDiv_radio").checked === false &
            document.getElementById( "questionTypeDiv_modal").checked === false &
            document.getElementById("questionTypeDiv_dropdown").checked === false 
          ) {
              let noChoice = document.getElementById("questionAnswerChoices");
              noChoice.classList.add("hidealways") ;
              let thechoiceCountno = noChoice.getElementsByClassName("missing").length ;
              document.getElementById("questionAnswerChoicesHeader").classList.add("hidealways") ;
              counter = counter - thechoiceCountno
          } else {
            document.getElementById("questionAnswerChoices").classList.remove("hidealways") ;
            document.getElementById("questionAnswerChoicesHeader").classList.remove("hidealways") ;
          } 
          if (
            document.getElementById("questionID").innerText.trim() === "" |
            document.getElementById("questionAuthor").innerText.trim() === "" |
            document.getElementById("questionContent").innerText.trim() === "" 
          ) {
              --counter
          } ;
          //let show = document.getElementById("missing") ;
          show = document.getElementById("missing") ;
          theStyle = window.getComputedStyle(show).display;
          if(counter !== 0) {
            show.innerText = `Number of fields needing  input: ${counter}.`;
            if(theStyle !== "block") {
              show.style.display = "block"
            }    
          } else {
            if(theStyle !== "none") {
              show.style.display = "none";
              show.getInnerText = ""
            }    
          }
          if(
            document.getElementById("testForChange").classList.contains("firstRequiredExplanation") !== true
            ) {    
              document.getElementById("testForChange").classList.add("firstRequiredExplanation")
          }
        }
      }
    } else {
      document.getElementById("saveButton").value = " Save Multiple Rules " ;
      document.getElementById("saveButton").classList.remove("missing");
      document.getElementById("saveButton").style.display = "block"
    }
  }
  
  function saveTrueRule() {
    console.log("function saveTrueRule() {");
      let saveObject = {}; // All question details are saved in this object as key value pairs, even if some object values are themselves another object or an array. 
      let objectKey, objectValue ;
      //let objectKeyList = ["questionAuthor","questionID"] ; // *** 20200723 chnage to ["ruleAuthor","ruleID"] when ready, consider wholesale change to "trueruleAuthor" "trueruleID" and other rule type stuff, note later we will need the ability to have more true answers 
      let objectKeyList = ["questionAuthor","questionID","ruleAuthor","ruleID"] ; // *** 20200804 chnage to ["ruleAuthor","ruleID"] when ready, consider wholesale change to "trueruleAuthor" "trueruleID" and other rule type stuff, note later we will need the ability to have more true answers 
      // get and store innerText of each item in Object KeyList
      for (let index = 0; index < objectKeyList.length; index++) {
        objectKey = objectKeyList[index];
        objectValue = document.getElementById(objectKey).innerText.trim();
        saveObject[objectKey] = objectValue
        //getInnerText (saveObject, objectKey, objectValue)
      }
      let truefalseRuleList = document.getElementsByClassName("trueRule") ;
      let questionAnswerSortList = document.getElementsByClassName("questionAnswerSort") ;
      let questionAnswerDescriptionList = document.getElementsByClassName("questionAnswerDescription") ;
      let trueAnswerList = [] ;
      let trueAnswerDescriptionList = [] ;
      for (let index = 0; index < truefalseRuleList.length; index++) {
        let element = truefalseRuleList[index];
        let truefalse = element.checked ;
        if(truefalse) {
          let  element2 = questionAnswerSortList[index] ;
          let element3 = questionAnswerDescriptionList[index] ;
          let temp3 = element3.innerHTML ;
          let temp = element2.value ;
          //alert("trueAnswerList needs to change from questionAnswerSort to what ever classname is used for the actual html element, and use the innerHTML") ;
          trueAnswerList.push(temp) ;
          trueAnswerDescriptionList.push(temp3)
        }
      }
      saveObject.ruleContent = document.getElementById("ruleContent").innerHTML ;
      saveObject.ruleContentInnerText = document.getElementById("ruleContent").innerText ;
      saveObject.trueAnswerList = trueAnswerList ;
      saveObject.trueAnswerDescriptionList = trueAnswerDescriptionList ;
      saveObject.keyPathValue = ["trueruleStore",1,saveObject.ruleAuthor,1,saveObject.ruleID] ;
      saveObject.questionSource = ["questionStore",1,saveObject.questionAuthor,1,saveObject.questionID] ; //20200902 6:52am,  *** at this time there is some duplication, but consider leaving until saveObject.questionAuthor AND saveObject.questionID ARE NO LONGER NEEDED ***
      /*saveObject.ruleAuthor = saveObject.questionAuthor ;
      saveObject.ruleID = saveObject.questionID ;
      saveObject.keyPathValue = ["trueruleStore",1,saveObject.ruleAuthor,1,saveObject.ruleID] ;
      saveObject.TemporaryNotes  = "1. need to be able to store as is.  2.  save to ruleStore" ; */
      saveObject.versionDateSince1969 = Date.now() ;
      //saveObject.orderedKeyList = JSON.stringify(Object.keys(saveObject)) ;
      //saveObject.orderedKeyList = Object.keys(saveObject) ;
      const request = indexedDB.open("authorExcuTrust");
      request.onsuccess = function() {
      db = request.result;
      const tx = db.transaction("ruleStore", "readwrite");
      const store = tx.objectStore("ruleStore");
      store.put(saveObject) ;
      storePendingSave(saveObject, db) ;
      db.close()
    }
  }
  
  function getAllFromFireStore () {
    console.log("function getAllFromFireStore () {");
    promise0 = getFromFireStore("questionRuleStore") ;
    promise1 = getFromFireStore("questionStore") ;
    promise2 = getFromFireStore("questionnaireStore") ;
    promises = [ promise0, promise1, promise2 ] ;
    Promise.allSettled (promises)
  }
  
  function processFireStoreArray(fireStoreArray , theStore) {
    console.log("function processFireStoreArray(fireStoreArray , theStore) {");
    if( theStore === "questionRuleStore") {
      theStore = "ruleStore"
    }
    const request = indexedDB.open("authorExcuTrust");
    request.onsuccess = function() {
      db = request.result;
      const tx = db.transaction(theStore, "readwrite");
      const store = tx.objectStore(theStore);
      let arraylength = fireStoreArray.length ;
      for (let index = 0; index < arraylength; index++) {
        const element = fireStoreArray[index];  
        store.put(element) 
      }
      db.close()
    }
  }
  
  function saveFireStoreToPending (saveObject) {
    console.log("function saveFireStoreToPending (saveObject) {");
    saveObject.versionDateSince1969 = Date.now() ;
    const request = indexedDB.open("authorExcuTrust");
      request.onsuccess = function() {
      db = request.result;
      //    The following example populates the database using a transaction.
      // ''and *** readwrite for update / create ***
      const tx = db.transaction(saveObject.keyPathValue[0], "readwrite");
      const store = tx.objectStore(saveObject.keyPathValue[0]);
      store.put(saveObject) ;
      storePendingSave(saveObject , db) ;
      db.close() ;
    }
  }
  
  async function makeFireStoreArray (db , fireStoreArray , theStore) {
    console.log("async function makeFireStoreArray (db , fireStoreArray , theStore) {");
    await db.collection("authorsOnly").doc(theStore).collection("groupCollectionAuthor").get().then( async function(querySnapshot) {
      querySnapshot.forEach( async function(doc) {
          await fireStoreArray.push(doc.data()) ;
      });
      }).catch(function(err){
        console.log(err) 
      })
  }
  
  function doFirebaseConfig() {
    console.log("function doFirebaseConfig() {");
    var firebaseConfig = {
      apiKey: "AIzaSyDN46Bm4B9xy7uZwxldS-lOtZdUPGGRrwc",
      authDomain: "et-dev-fe04a.firebaseapp.com",
      databaseURL: "https://et-dev-fe04a.firebaseio.com",
      projectId: "et-dev-fe04a",
      storageBucket: "et-dev-fe04a.appspot.com",
      messagingSenderId: "17556042126",
      appId: "1:17556042126:web:34098f9684d00811a174df",
      measurementId: "G-YE0S6EXGR8"
    };
    try {
      firebase.initializeApp(firebaseConfig)
    } catch(err) {
      // do nothing
    }
    return firebase.firestore()
  }
  
  
  async function getFromFireStore(theStore) {
    console.log("async function getFromFireStore(theStore) {");
    let fireStoreArray = [] ;
    var db = doFirebaseConfig() ;
    await makeFireStoreArray (db , fireStoreArray , theStore) ;
    processFireStoreArray(fireStoreArray , theStore)
  }
  
  function getKeyStringifyList () {
    console.log("function getKeyStringifyList () {");
    return [
      "theRule", 
      "trueFalseValues" ,
      "questionDestination"
    ]
  }
  
  function parseTheString (maybeAString) {
    console.log("parseTheString (maybeAString)") ;
    //console.log(maybeAString) ;
    let theType = typeof mayBeString ;
    if( theType === "string" ) {
      maybeAString = JSON.parse(maybeAString)
    }
    //console.log(maybeAString) ;
    if(maybeAString === undefined || maybeAString === "undefined") {
      //maybeAString = 'not a valid string to be used, it did not make sense to Parse, before this change, null, note null is "falsy" and may still be needed' ;
      //console.log(maybeAString) ;
      maybeAString = null ;
      //console.log("maybeAString is empty, so saved as null, defined not ever processed, it is falsy, so we can use in connection with considering it has been processed , but never been true, of effectively true, false ( previously true), or null, falsy, may have been processed as false, but never been true") ;
      //console.log(maybeAString) ;
    }
    return maybeAString
  }
  
  
  
  function parseNestedArrays (saveObject) {
    console.log("function parseNestedArrays (saveObject)") ;
    console.log(JSON.parse(JSON.stringify(saveObject))) ;
    keyStringifyList = getKeyStringifyList ();
    keyStringifyListLength = keyStringifyList.length ;
    for (let index = 0; index < keyStringifyListLength ; index++) {
      const element = keyStringifyList[index];
      if(saveObject[element] !== undefined) {
        let mayBeString = saveObject[element] ;
        let theType = typeof mayBeString ;
        if( theType === "string" ) {
          saveObject[element] = JSON.parse(saveObject[element])
        }
      }
    }
    //console.log("function parseNestedArrays (saveObject) 2") ;
    //console.log(saveObject) ;
    return saveObject
  }
  
  
  function stringfyNestedArrays (saveObject) {
    console.log("function stringfyNestedArrays (saveObject) {");
    let newObject = JSON.parse(JSON.stringify(saveObject)) ;
    saveObject = newObject ;
    keyStringifyList = getKeyStringifyList ();
    keyStringifyListLength = keyStringifyList.length ;
    for (let index = 0; index < keyStringifyListLength ; index++) {
      const element = keyStringifyList[index];
      if(saveObject[element] !== undefined) {
        let mayBeString = saveObject[element] ;
        let theType = typeof mayBeString ;
        if( theType !== "string" ) {
          saveObject[element] = JSON.stringify(saveObject[element])
        }
      }
    }
    return saveObject
  }
  
  
  function batchFireStoreAnswer(outerArray) {
    console.log("function batchFireStoreAnswer(outerArray) {") ;
    var db = doFirebaseConfig() ;
    var batch = db.batch();
    let outerArrayLength = outerArray.length
    var i;
    for (i = 0; i < outerArrayLength; i++) {
      let saveObject = outerArray[i];
      saveObject = stringfyNestedArrays (saveObject) ;
      let record = db.collection(`customerOnly`).doc('answerStore').collection(`questionLevel`).doc(JSON.stringify(saveObject.keyPathValue));
      batch.set(record, saveObject);
    }
    // Commit the batch
    batch.commit().then(function () {
    // ... *** use this to update indexedDB for a status update, use outer array to get elements to process. 
      //alert ("hopefully all saved, check consol for fireStore") 
      ///authorsOnly/questionStore/groupCollectionAuthor *** 2020-11-17 ** /authorsOnly/questionRuleStore/groupCollectionAuthor/["trueruleStore",1,"2020-11-17",1,"11:33"]
  });
  }
  
  
  
  
  function batchFireStore2(outerArray) {
    console.log("function batchFireStore2(outerArray) {    2023-03-08");
    console.log(outerArray);
    console.log(outerArray[0]);
    var db = doFirebaseConfig() ;
    var batch = db.batch();
    let outerArrayLength = outerArray.length
    var i;
    for (i = 0; i < outerArrayLength; i++) {
      let saveObject = outerArray[i];
      if(saveObject.groupRuleSource !== undefined){
        saveObject.groupRuleSource = JSON.stringify(saveObject.groupRuleSource)
      }
      let theParentDocument = saveObject.keyPathValue[0] ;
      console.log(theParentDocument);
      console.log(theParentDocument);
      if( theParentDocument === "trueruleStore" || theParentDocument === "groupruleStore" ) {
        theParentDocument = "questionRuleStore"
      };
      let record = db.collection(`authorsOnly`).doc(theParentDocument).collection("groupCollectionAuthor").doc(JSON.stringify(saveObject.keyPathValue));
      console.log(`2023-03-10 "
      Record record and then saveObject`) ;
      console.log(record); console.log(saveObject);
      batch.set(record, saveObject);
      // new 2023-03-09
      saveObject.keyPathValue.push(saveObject.versionDateSince1969);
      console.log("new Save Object");
      console.log(JSON.stringify(saveObject.keyPathValue));
      console.log (saveObject);
      theParentDocument = "LatestAndPriorVersions";
      record = db.collection(`authorsOnly`).doc(theParentDocument).collection("groupCollectionAuthor").doc(JSON.stringify(saveObject.keyPathValue));
      console.log(record); console.log(saveObject);
      console.log("2nd batch.set  -   2023-03-10 09:20 ***");
      batch.set(record, saveObject)
    }
    // Commit the batch
    batch.commit().then(function () {
    // ... *** use this to update indexedDB for a status update, use outer array to get elements to process. 
      //alert ("hopefully all saved, check consol for fireStore") 
      ///authorsOnly/questionStore/groupCollectionAuthor *** 2020-11-17 ** /authorsOnly/questionRuleStore/groupCollectionAuthor/["trueruleStore",1,"2020-11-17",1,"11:33"]
  });
  }
  
  
  
  function batchFireStore() {
    console.log("function batchFireStore() {");
    var firebaseConfig = {
      apiKey: "AIzaSyDN46Bm4B9xy7uZwxldS-lOtZdUPGGRrwc",
      authDomain: "et-dev-fe04a.firebaseapp.com",
      databaseURL: "https://et-dev-fe04a.firebaseio.com",
      projectId: "et-dev-fe04a",
      storageBucket: "et-dev-fe04a.appspot.com",
      messagingSenderId: "17556042126",
      appId: "1:17556042126:web:34098f9684d00811a174df",
      measurementId: "G-YE0S6EXGR8"
    };
    // Initialize Firebase
    
    // firebase.initializeApp(firebaseConfig); - before adding try{}catch{} below *** *** 2023-03-03
  try {
      firebase.initializeApp(firebaseConfig)
    } catch(err) {
      // do nothing
    }
    // Initialize connector to 
    var db = firebase.firestore();
    // Get a new write batch
    var batch = db.batch();
  
    // Set the value of 'NYC'
    var nycRef = db.collection("cities").doc("NYC");
    batch.set(nycRef, {name: "New York City"});
    nycRef = db.collection("cities").doc("SFA");
    batch.set(nycRef, {name: "SFA if batched worked on mutiple"});
    let outerArray = [] ;
    let innerArray = ["cities","NYC2",{name: "New York City 2"}];
    outerArray.push(innerArray) ;
    innerArray = ["cities","SFA2",{name: "SFA 22"}];
    outerArray.push(innerArray) ;
    outerArrayLength = outerArray.length
    var i;
    for (i = 0; i < outerArrayLength; i++) {
      let innerArrayNew = outerArray[i];
      let record = db.collection(innerArrayNew[0]).doc(innerArrayNew[1]);
      batch.set(record, innerArrayNew[2]);
    }
     // Update the population of 'SF'
    /*
    var sfRef = db.collection("cities").doc("SF");
    batch.update(sfRef, {"population": 1000000});
    */
    // Delete the city 'LA'
    /*
    var laRef = db.collection("cities").doc("LA");
    batch.delete(laRef);
    */
  // Commit the batch
  batch.commit().then(function () {
      // ...
      alert ("hopefully the cities of new youk && SFA are  and the version 2 as well.  ")
  });
  
  }
  
  
  function saveFirestore (saveObject , questionnaireRowChoice) {
    console.log("function saveFirestore (saveObject , questionnaireRowChoice) {    2023-03-10 14:09");
    if(questionnaireRowChoice === undefined ) {
      let outerArray = [];
      outerArray.push(saveObject) ;
      batchFireStore2(outerArray)
    }
  }
  
  function storePendingSaveIndexedDBOnly(saveObject , db) {
    console.log("function storePendingSaveIndexedDBOnly(saveObject , db) { *** LIKELY not needed");
    console.log("____________   Test pending  ___________________________________") ;
    //console.log(saveObject) ;
    //console.log(db) ;
    const tx = db.transaction("pendingStore", "readwrite");
    const store = tx.objectStore("pendingStore");
    store.put(saveObject) ;
    let newEndList = [[0,"a"],["a",0],["a"],0,"D","a","aA","AA",[[0],["a"],[2],[3]],[[0],[1],[2],[3]],[[0],["a"],[2],[3]],"A",9,-100,[-100],[-100,0],"XZA",.5] ;
    //console.log(newEndList) ;
    /*
    for ( let element of newEndList) {
      //console.log(element);
      let newObject2 = JSON.parse(JSON.stringify(saveObject));    
      newObject2.keyPathValue.push(element) ;
      //console.log(newObject2) ;
      store.put(newObject2)
    }/**/
    /*
    for ( let element of newEndList) {
      //console.log(element);
      let newObject2 = JSON.parse(JSON.stringify(saveObject));    
      newObject2.keyPathValue.unshift(element) ;
      //console.log(newObject2) ;
      store.put(newObject2)
    }/**/
  }
  
  
  
  
  
  function storePendingSave(saveObject , db) {
      console.log("function storePendingSaveIndexedDBOnly(saveObject , db) { *** LIKELY not needed");
    saveFirestore (saveObject) ;
    const tx = db.transaction("pendingStore", "readwrite");
    const store = tx.objectStore("pendingStore");
    saveObject.keyPathValue.unshift(saveObject.versionDateSince1969) ; // *** decision about if all versions saved or just the version since the last time server was updated. - decided to store extra data and ask that server track the changes to know who had access to the information, at what time. a lot more data but this may be used for machine learning later.   - for now, ok, but do we need an tx.onComplete before making save button ""
    store.put(saveObject) ;
    let lastSentToServer = {} ;
    lastSentToServer.keyPathValue = [0,"lastSentToServer"] ;
    lastSentToServer.versionDateSince1969 = saveObject.versionDateSince1969 ;
    lastSentToServer.explantion = ["not actually used here","code for later use to track last sent","may be better all on server","decision needs to be made to delete records or not?","do not allow users to save over existing record, require use of Select if it exists"];
    store.put(lastSentToServer) ; 
    // new to test sorting follows
    saveObject.keyPathValue.unshift(0) ;
    saveObject.keyPathValue.unshift(1) ;
    saveObject.keyPathValue.unshift(-1) ;
    store.put(saveObject) ;
    saveObject.keyPathValue.unshift(2) ;
    saveObject.keyPathValue.unshift(3) ;
    saveObject.keyPathValue.unshift(-2) ;
    store.put(saveObject) ;
    saveObject.keyPathValue.unshift(-2) ;
    saveObject.keyPathValue.unshift(-3) ;
    saveObject.keyPathValue.unshift(2) ;
    store.put(saveObject) 
  }
  function saveAnswe1() {
    console.log("saveAnswe1()");
    // for now use existing database and store
    let saveObject = {}; // All question details are saved in this object as key value pairs, even if some object values are themselves another object or an array. 
    let objectKey, objectValue ;
    let objectKeyList = ["questionAuthor","questionID"] ;
    // get and store innerText of each item in Object KeyList
    for (let index = 0; index < objectKeyList.length; index++) {
      objectKey = objectKeyList[index];
      objectValue = document.getElementById(objectKey).innerText.trim();
      saveObject[objectKey] = objectValue 
    }
    objectKeyList = ["questionUnansweredComplete","questionUnansweredRequiresExplanation","questionAnsweredRequiresExplanation"]
    // get and store innerText of each item in Object KeyList
    for (let index = 0; index < objectKeyList.length; index++) {
      objectKey = objectKeyList[index];
      objectValue = document.getElementById(objectKey).checked;
      saveObject[objectKey] = objectValue
      //getInnerText (saveObject, objectKey, objectValue)
    }
    objectKey = "questionContent" ; 
    let t = document.getElementById(objectKey) ;
    saveObject[objectKey] = t.innerHTML;
    objectKey = objectKey+"InnerText" ;
    saveObject[objectKey] = t.innerText ;
    saveObjectAsText(saveObject);
    getQuestionLogic(saveObject) ;
    saveObjectAsText(saveObject);
    saveToDatabase(saveObject)  ;
    document.getElementById("preventAllChanges").value = "notEmpty" ;
    selectQuestionForRuleToggleCloseWrapper() // likely will not work, too synchronously ***  20200818 *** 
    lockAll()
  }
  
  function saveQuestionnaire() {
    console.log("function saveQuestionnaire() {");
    // for now use existing database and store
    let saveObject = {}; // All question details are saved in this object as key value pairs, even if some object values are themselves another object or an array. 
    let objectKey, objectValue  ;
    let objectKeyList = ["questionnaireAuthor","questionnaireID"] ;
    // get and store innerText of each item in Object KeyList
    for (let index = 0; index < objectKeyList.length; index++) {
      objectKey = objectKeyList[index];
      objectValue = document.getElementById(objectKey).innerText.trim();
      saveObject[objectKey] = objectValue 
    }
    objectKey = "questionnaireContent" ; 
    let t = document.getElementById(objectKey) ;
    saveObject[objectKey] = t.innerHTML;
    objectKey = objectKey+"InnerText" ;
    saveObject[objectKey] = t.innerText ;
    saveToDatabase(saveObject , "questionnaireRowChoice")  ;
    //lockAll() ; *** not sure should be commented out 
  }
  
  function recoverQuestionnaire(author , id) {
    console.log("function recoverQuestionnaire(author , id) { *** not used yet, see max an min values of numbers");
    const lowerbound = [author,id,-9007199254740991] ;
    const upperbound = [author,id,9007199254740991];
    const header = ["questionnaireStore",1,author,1,id];
  }
  
  function buildAllArrayTemp (){
    console.log("function buildAllArrayTemp (){   2023-03-09 17:48");
    let theClassArray = document.getElementsByClassName("rowChoice");
    console.log(theClassArray);
    let theClassArrayLength = theClassArray.length ;
    let allArrayTemp = [] ;
    let allArrayTempClassInnerHTML = [];
    for (let index = 0; index < theClassArrayLength; index++) {
      const element = theClassArray[index];
      let nestedArray = [];
      if(element.dataset.questionnairerowruletype !== undefined) {
        nestedArray.push(element.dataset.questionnairerowruletype);
        nestedArray.push(1);
        nestedArray.push(element.dataset.questionnairerowruleauthor);
        nestedArray.push(1);
        nestedArray.push(element.dataset.questionnairerowruleid);
        allArrayTemp.push(nestedArray) ;
        allArrayTempClassInnerHTML.push(element.innerHTML)
      }
    }
    let objectOfArrays = {};
    objectOfArrays.allArrayTemp = allArrayTemp ;
    objectOfArrays.allArrayTempClassInnerHTML = allArrayTempClassInnerHTML ;
    return objectOfArrays
  }
  
  function removeDuplicatesKeepOrder (allArrayTemp) {
    console.log("function removeDuplicatesKeepOrder (allArrayTemp) {");
    let allArrayTempClassInnerHTML = allArrayTemp.allArrayTempClassInnerHTML ;
    allArrayTemp = allArrayTemp.allArrayTemp ;
    let allItems = [];
    let allItemsInnerHTML = [];
    let allItemsStrings = [] ;
    let allArrayTempLength = allArrayTemp.length ;
    for (let index = 0; index < allArrayTempLength; index++) {
      const element = allArrayTemp[index];
      let where = allItemsStrings.indexOf(JSON.stringify(element)) ;
      if (where === -1) { // prevents duplicates in allItems List and allows for making sure the latest complete list of sources is used. 
        allItemsStrings.push(JSON.stringify(element)) ;
        allItems.push(allArrayTemp[index]) ;
        allItemsInnerHTML.push(allArrayTempClassInnerHTML[index])
      }
    }
    let objectOfArrays = {};
    objectOfArrays.allItems = allItems ;
    objectOfArrays.allItemsInnerHTML = allItemsInnerHTML ;
    return objectOfArrays 
  }
  
  function splitNestedArrayForFireStore (nestedArray) {
    console.log("function splitNestedArrayForFireStore (nestedArray) {");
    let nestedArrayLength = nestedArray.length ;
    let splitArray = {} ;
    splitArray.type = [] ;
    splitArray.author = [] ;
    splitArray.id = [] ;
    for (let index = 0; index < nestedArrayLength; index++) {
      const element = nestedArray[index];
      splitArray.type.push(element[0]);
      splitArray.author.push(element[2]);
      splitArray.id.push(element[4]);
    }
    return splitArray
  }
  function makeElementsText(allRowChoices) {
    console.log("makeElementsText(allRowChoices) {      2023-03-09 19:59 - look for nees to be here next *** ");
    console.log("allRowChoices)  2023-03-09 19:59");
    console.log(allRowChoices);
    console.log(allRowChoices.length);
    if (allRowChoices.length === 0){
      return []
    }
    console.log("allRowChoices)  2023-03-09 19:59 *** need to be here. ****");
    let textArray = [];
    for (var i = 0; i < allRowChoices.length; i++) {
      textArray.push(allRowChoices[i].outerHTML)
    }
    console.log(textArray);
    return textArray
  }
  
  
  function makeGroupRuleSource(groupRule) {
    console.log("function makeGroupRuleSource(groupRule) {");
    let allSources = [];
    const numberOfSources = groupRule.allRowChoices.length ;
    for (let index = 0; index < numberOfSources; index++) {
      let uniqueSource = [groupRule.allArrayType[index],1,groupRule.allArrayAuthor[index],1,groupRule.allArrayID[index]];
      allSources.push(uniqueSource)
    }
    return allSources
  }
  
  
  function saveGrouprule() {
    console.log("function saveGrouprule() {   2023-03-09 17:17");
    let grouprule = {} ;
    grouprule.keyPathValue = ["groupruleStore",1,document.getElementById("groupruleAuthor").innerText,1,document.getElementById("groupruleID").innerText] ;
    //grouprule.questionSource = grouprule.keyPathValue; Removed 2023-03-10 11:49
    grouprule.groupruleContent = document.getElementById("groupruleContent").innerHTML ;
    grouprule.groupruleContentInnerText = document.getElementById("groupruleContent").innerText ;
    let allArrayTemp = buildAllArrayTemp () ;
    console.log("allArrayTemp");
    console.log(allArrayTemp);
    if(allArrayTemp.allArrayTemp.length > 0){
      let objectOfArrays = removeDuplicatesKeepOrder (allArrayTemp) ;
      grouprule.allArrayInnerHTML = objectOfArrays.allItemsInnerHTML ;
      allArrayTemp = objectOfArrays.allItems
    }
    allArrayTemp = splitNestedArrayForFireStore (allArrayTemp);
    grouprule.allArrayType = allArrayTemp.type ;
    grouprule.allArrayAuthor = allArrayTemp.author ;
    grouprule.allArrayID = allArrayTemp.id ;
    grouprule.versionDateSince1969 = Date.now() ;
    grouprule.all0Any1True = document.getElementById("all0Any1True").checked ;
    grouprule.allRowChoices = makeElementsText(document.getElementsByClassName("rowChoice"));
    grouprule.groupRuleSource = makeGroupRuleSource(grouprule) ;
    console.log("grouprule    2023-03-10 08:36");
    console.log(grouprule);
    let databaseOpenRequest = indexedDB.open("authorExcuTrust");
    databaseOpenRequest.onsuccess =  () => {
      let db = databaseOpenRequest.result ;
      const tx = db.transaction("ruleStore", "readwrite");
      const store = tx.objectStore("ruleStore");
      /*
      grouprule.allRowChoices = document.getElementsByClassName("rowChoice");
      console.log("grouprule.allRowChoices    2023-03-09 19:13");
      console.log(grouprule.allRowChoices);*/
      store.put(grouprule) ;
      tx.oncomplete = () => {
        let clearAll = document.getElementsByClassName("questionnairecloud") ;
        let clearAllLength = clearAll.length ;
        for (let index = 0; index < clearAllLength; index++) {
          let element = clearAll[index];
          element.innerText = "Saved" //  2023-03-10   12:25
        }
        console.log("*** ***saved to indexeddb, not to firestore  yet working on it  *** ***       batchFireStore2([grouprule])      2023-03-08 5:51pm") ;
        batchFireStore2([grouprule])
      }
    }
  }
  
  
  
  
  
  function saveAnswers() {
    console.log("function saveAnswers()");
    /*  Consider replacing chain of If or else if statements with  ***
    const myObj = {
    key1: () => {
      console.log('Function 1 executed');
    },
    key2: () => {
      console.log('Function 2 executed');
    },
    key3: () => {
      console.log('Function 3 executed');
    }
  };
  
  const myVar = 'key2';
  
  myObj[myVar]();    ***  see function getScreenChoices()  as a parital example.  remeber to consider event delegation to enable new child elements to benefit from not needing to have event delegation specifically to new child element e.g. for parent ul and child li - e.g. 
  const ul = document.querySelector('ul');
  ul.addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') {
      console.log('Clicked on', event.target.textContent);
    }
  });
    */
    let temp = document.getElementById("saveButton") ;
    //alert (`SaveBUtton, tempvalue :  ${temp.value}`) ;
    if(temp.value !== "") {
        if(temp.value === getQuestionLevelRuleButton()) {
          saveTrueRule()
      } else if(temp.value === " Save Questionnaire ") {
          saveQuestionnaire()
      } else if(temp.value === " Save Multiple Rules ") {
        saveGrouprule()
      } else if(newQuestionTrueFalse()) {
        saveAnswe1() 
      }
      temp.value = ""
    }
  }
  
  function saveObjectAsText(object) {
    console.log("saveObjectAsText(object) - now hopefuly a")
    const T = JSON.stringify(object) ;
    console.log(T)
    const t1 = JSON.parse(T);
    console.log(t1)
  }
  
  
  function resetFireStoreFlag (element , setFlag) { // setFlag if defined, will cause the element to be resaved
    console.log("function resetFireStoreFlag (element , setFlag) {");
    if( setFlag === undefined) { //setFlag  DOES NOT exist - undefined
      delete element.dataset.sendtofirestore ;
      if(element.getElementsByClassName("questionnairecloud")[0] !== undefined) {
        /* 2020-12-14 05:42
        // probably not needed.  - can be cleaned later, after saving to database */
       element.getElementsByClassName("questionnairecloud")[0].innerHTML = ""
      } 
    } else { //  setFlag exists, in variable change
      if(element.getElementsByClassName("questionnairecloud")[0] !== undefined) {
        element.getElementsByClassName("questionnairecloud")[0].innerHTML = "Not Saved" 
      }
      element.dataset.sendtofirestore = "Cloud Update Needed";
      if(document.getElementById("groupruleWrapper").innerHTML !== "") {
        document.getElementById("saveButton").value = " Save Multiple Rules " ;
        document.getElementById("saveButton").classList.remove("missing");
        document.getElementById("saveButton").style.display = "block"
      } else {
        document.getElementById("saveButton").value = " Save Questionnaire " ;
      }    
      document.getElementById("saveButton").classList.remove("hidealways")
    } 
    return element
  }
  
  function replaceQuestionArray(saveRowObject) {
    console.log("function replaceQuestionArray(saveRowObject) {");
    if(saveRowObject.questionnaireRowQuestion[2] === undefined) {
      delete saveRowObject.questionnaireRowQuestion ;
      replaceRuleArray(saveRowObject)
    } else {
      let db ;
      const request = indexedDB.open("authorExcuTrust");
      request.onsuccess = function() {
        db = request.result;
        const questiontx = db.transaction("questionStore", "readwrite");
        const questionstore = questiontx.objectStore("questionStore");
        let fromtx = questionstore.get(saveRowObject.questionnaireRowQuestion) ;
        questiontx.oncomplete = () => {
          saveRowObject.questionnaireRowQuestion = fromtx.result ;
          replaceRuleArray(saveRowObject)
        }
      }
    }
  }
  
  //function saveLaslogicalAnswerToIndexedDB (saveRowObject) {
  function saveLastObjectToIndexedDB (saveRowObject) {
    console.log("function saveLastObjectToIndexedDB (saveRowObject) {");
    saveRowObject.firebaseFirestoreTimestamp = firebase.firestore.FieldValue.serverTimestamp();
    let db ;
    const request = indexedDB.open("authorExcuTrust");
    request.onsuccess = function() {
      db = request.result;
      const questionnairetx = db.transaction("questionnaireStore", "readwrite");
      const questionnairestore =  questionnairetx.objectStore("questionnaireStore");
      questionnairestore.put(saveRowObject) ;
      questionnairetx.oncomplete = () => {
        batchFireStore2([saveRowObject]) 
      }
    }
  }
  
  async function replaceRuleArray(saveRowObject) {
    console.log("async function replaceRuleArray(saveRowObject) {");
    if(saveRowObject.questionnaireRowRule[0] === undefined) {
      delete saveRowObject.questionnaireRowRule ;
      saveLastObjectToIndexedDB (saveRowObject)
    } else {
      let db ;
      const request = indexedDB.open("authorExcuTrust");
      request.onsuccess = function() {
        db = request.result;
        const ruletx =  db.transaction("ruleStore", "readwrite");
        const rulestore = ruletx.objectStore("ruleStore");
        let fromtx = rulestore.get(saveRowObject.questionnaireRowRule) ;
        ruletx.oncomplete = async () => {
          saveRowObject.questionnaireRowRule = await fromtx.result ;
          saveLastObjectToIndexedDB (saveRowObject)
        }
      }
    }
  }
  
  function addObjectQuestionKeyPathValueListUniqueQuestionRows (objectQuestionKeyPathValueListUniqueQuestionRows , element) {
    console.log("function addObjectQuestionKeyPathValueListUniqueQuestionRows (objectQuestionKeyPathValueListUniqueQuestionRows , element) {");
    console.log("element");
    console.log(element);
    if(element.getElementsByClassName("questionnaireRowQuestionAuthor")[0] === undefined) {
      return  objectQuestionKeyPathValueListUniqueQuestionRows 
    }
    let questionnaireRowQuestionAuthor = element.getElementsByClassName("questionnaireRowQuestionAuthor")[0].innerText.trim() ;
    if(questionnaireRowQuestionAuthor === "") {
      return  objectQuestionKeyPathValueListUniqueQuestionRows 
    }
    let questionnaireRowQuestionID = element.getElementsByClassName("questionnaireRowQuestionID")[0].innerText.trim() ;
    let questionArray = ["questionStore",1,questionnaireRowQuestionAuthor,1,questionnaireRowQuestionID] ;
    let questionKeyPath = JSON.stringify(questionArray);
    if(objectQuestionKeyPathValueListUniqueQuestionRows[questionKeyPath] === undefined) {
      objectQuestionKeyPathValueListUniqueQuestionRows[questionKeyPath] = [element.id]
    }else {
      objectQuestionKeyPathValueListUniqueQuestionRows[questionKeyPath].push(element.id)
    }
    console.log(objectQuestionKeyPathValueListUniqueQuestionRows);
    return objectQuestionKeyPathValueListUniqueQuestionRows
  }
  
  function addobjectRuleKeyPathValueListUniqueQuestionRows (objectRuleKeyPathValueListUniqueQuestionRows , element) {
    console.log("function addobjectRuleKeyPathValueListUniqueQuestionRows (objectRuleKeyPathValueListUniqueQuestionRows , element) {");
    /*
    The purpose of this function is to provide a complete list of display rules and the elements to which they apply in the DOM.
  
    It  checks each row to see if a rule is applicable, note the same rule may be applicable to many rows and many rows do not have any rules, and so are always visble.   
    
    If effect, if a rule exists and it is calculated as false, it is deleted from the DOM, if it in in the DOM.  If it is calculated to be true and it in not in the DOM, it is added in the correct place.   
    
    if no rule is applicable, then on load, it is added to the DOM and never removed. 
    
    */
    /*
    console.log("element.dataset.questionnairerowruletype");
    console.log("element");
    
    let element2 = document.getElementById(element);
    console.log(element);
    console.log("element2");
    console.log(element2);
    */
    //element = document.getElementById(element);
    if(element.dataset.questionnairerowruletype) { 
      let ruleKeyPath = JSON.stringify([element.dataset.questionnairerowruletype,1,element.dataset.questionnairerowruleauthor,1,element.dataset.questionnairerowruleid]) ;
      if(objectRuleKeyPathValueListUniqueQuestionRows[ruleKeyPath] === undefined) {
        objectRuleKeyPathValueListUniqueQuestionRows[ruleKeyPath] = [element.id]
      }else {
        objectRuleKeyPathValueListUniqueQuestionRows[ruleKeyPath].push(element.id)
      }
    }
    return objectRuleKeyPathValueListUniqueQuestionRows
  }
  
  function processQuestionnaireRows1By1() {
  
  }
  
  function saveModifiedQuestionnaireRows(saveObject , questionnaireRowChoice) {
    console.log("function saveModifiedQuestionnaireRows(saveObject , questionnaireRowChoice) {");
    /*
  
    if processing a questionnaire which is being modified, this function gets each modified row from the DOM and:
     a) updates the saveObject ;
     b) saves the row; 
     c) updates the row on the DOM so it no longer is flagged as needing to be saved.
    
    if not processing a questionnaire, this function simply returns the saveObject, unchanged, not 100% sure returning the saveObject is really needed. 
    
    */
    if(questionnaireRowChoice === "questionnaireRowChoice") {
      let theRowList = document.getElementsByClassName("rowChoice") ;
      let theLength = theRowList.length ;
      saveObject.versionDateSince1969 = Date.now() ;
      for (let index = 0; index < theLength; index++) {
        let element = theRowList[index];
        if(element.dataset.sendtofirestore !== undefined) {
          element =  resetFireStoreFlag (element) ; // setFlag is undefined on purpose, 
          let outerElement = element ;
          let saveRowObject = {} ;
          saveRowObject.questionnaireAuthor = saveObject.questionnaireAuthor ;
          saveRowObject.questionnaireID = saveObject.questionnaireID ;
          saveRowObject.keyPathValue = ["questionnaireStore",1,document.getElementById("questionnaireAuthor").innerText.trim(),1,document.getElementById("questionnaireID").innerText.trim(),element.dataset.uniquequestionnairerow] ;
          saveRowObject.questionAnswerSort = element.getElementsByClassName("questionAnswerSort")[0].value*1;
          saveRowObject.theContent = "*** theContent to be programned, now given change in approach, this may not be needed ***" ;
          saveRowObject.versionDateSince1969 = [document.getElementById("questionnaireAuthor").innerText.trim(),document.getElementById("questionnaireID").innerText.trim(),saveObject.versionDateSince1969];
          saveRowObject.questionnaireRow = [document.getElementById("questionnaireAuthor").innerText.trim(),document.getElementById("questionnaireID").innerText.trim(),element.getElementsByClassName("questionAnswerSort")[0].value*1];
          document.getElementById("questionnaireID").innerText.trim(),element.getElementsByClassName("questionAnswerSort")[0].classList.remove("missing") ;
          let temp0 = ["questionnaireRowQuestionAuthor", "questionnaireRowQuestionID", "questionnaireRowRuleAuthor","questionnaireRowRuleID","questionnaireRowRuleType"] ;
          let temp0Length = temp0.length ;
          for (let index = 0; index < temp0Length; index++) {
            const element = temp0[index];
            if( outerElement.getElementsByClassName(element).length > 0){
              saveRowObject[element] = outerElement.getElementsByClassName(element)[0].innerText ;               
            }
          }
          temp0 = ["questionnairerowquestionauthor", "questionnairerowquestionid", "questionnairerowruleauthor","questionnairerowruleid","questionnairerowruletype"];
          temp0Length = temp0.length ;
          for (let index = 0; index < temp0Length; index++) {
            const element = temp0[index];
            if(outerElement.dataset[element] !== undefined) {
              saveRowObject[element] = outerElement.dataset[element] //2020-11-27
            }
          }
          temp0 = ["rowChoice"] ;
          temp0Length = temp0.length ;
          for (let index = 0; index < temp0Length; index++) {
            const element = temp0[index];
            saveRowObject[element] = outerElement.innerHTML  
          }
            saveRowObject.questionnaireRowQuestion = ["questionStore",1,saveRowObject.questionnaireRowQuestionAuthor,1,saveRowObject.questionnaireRowQuestionID];
            saveRowObject.questionnaireRowRule = [saveRowObject.questionnairerowruletype,1,saveRowObject.questionnairerowruleauthor,1,saveRowObject.questionnairerowruleid];
            replaceQuestionArray(saveRowObject) ;
          }
        }    
    }
    return saveObject
  }
  
  function cleanBeforeSentToFireStore (saveObject) {
    console.log("function cleanBeforeSentToFireStore (saveObject) {");
    if (1 === 0) {
      return saveObject
    } else {
      let list1 = [] , list2 = [] ;
      let arrayLength = saveObject.rowIDarray.length ;
      for (let index = 0; index < arrayLength; index++) {
        const element = saveObject.rowIDarray[index];
        if(element !== undefined) {
          list1.push(saveObject.rowIDarray[index]);
          // 7 of 18   list2.push(saveObject.rowTimeArray[index]);
        }      
      }
      saveObject.rowIDarray = [...list1];
      // *** always a comment *** no need to clean rowRuleTypearray before saving, all ready clean, may be an idea to do same later, for rowRuleType
       // 8 of 18 saveObject.rowTimeArray = [...list2];
      return saveObject
    }
  }
  
  
  function saveArrayItemsToIndexedDB (changedTrueRuleConclusionList) {
    console.log("function saveArrayItemsToIndexedDB (changedTrueRuleConclusionList) {");
    if(changedTrueRuleConclusionList.length === 0) {
      return
    }
    const request = indexedDB.open("authorExcuTrust");
    request.onsuccess = function() {
      db = request.result;
      const tx = db.transaction("pendingStore", "readwrite");
      const store = tx.objectStore("pendingStore");
      changedTrueRuleConclusionList.forEach(element => store.put(element));
      tx.oncomplete = () => {
        let fireArray = [];
        let fireLength = changedTrueRuleConclusionList.length;
        for (let index = 0; index < fireLength; index++) {
          const element = changedTrueRuleConclusionList[index] ;
          let objectToBesaved = {} ;
          let ObjectValueToBeSaved ;
          const keyUsed = Object.keys(element) ;
          const keyUsedLength = keyUsed.length ;
          for (let index2 = 0; index2 < keyUsedLength; index2++) {
            const element2 =   keyUsed[index2] ;
            let noStringArray = ["keyPathValue","finnished","questionDestination","factsTrueRuleConclusion", "ruleTrueFalse","trueAnswerDescriptionList", "factsAnswer","trueRuleListItem","trueRule_theRule_trueAnswerDescriptionList","trueRule_ruleTrueFalse","trueRule_ruleQuestionDestination****","trueRule**", "questionDestination"]
            const theMatch = (element4) => element4 ===element2 ;
            const temp3 =  noStringArray.findIndex(theMatch);
            if(temp3 !== -1 ){
              ObjectValueToBeSaved = changedTrueRuleConclusionList[index][element2]
            } else {
              ObjectValueToBeSaved = JSON.stringify(changedTrueRuleConclusionList[index][element2])
            }
          objectToBesaved[element2] = ObjectValueToBeSaved
          }
          /*
          objectToBesaved.trueRule_finished = element.trueRule.finished ;
          objectToBesaved.trueRule_keyPathValue = element.trueRule.keyPathValue ;
          objectToBesaved.trueRule_questionDestination = element.trueRule.questionDestination ;
          objectToBesaved.trueRule_theRule_keyPathValue = element.trueRule.theRule.keyPathValue ;
          objectToBesaved.trueRule_theRule_questionAuthor = element.trueRule.theRule.questionAuthor ;
          objectToBesaved.trueRule_theRule_questionID = element.trueRule.theRule.questionID ;
          objectToBesaved.trueRule_theRule_questionSource = element.trueRule.theRule.questionSource ;
          objectToBesaved.trueRule_theRule_ruleAuthor = element.trueRule.theRule.ruleAuthor ;
          objectToBesaved.trueRule_theRule_ruleContent = element.trueRule.theRule.ruleContent ;
          objectToBesaved.trueRule_theRule_ruleContentInnerText = element.trueRule.theRule.ruleContentInnerText ;
          objectToBesaved.trueRule_theRule_ruleID = element.trueRule.theRule.ruleID ;
          objectToBesaved.trueRule_theRule_ruleID = element.trueRule.theRule.ruleID ;
          */
         objectToBesaved.trueRule_finished = changedTrueRuleConclusionList[index].trueRule.finished ;
         objectToBesaved.trueRule_keyPathValue = changedTrueRuleConclusionList[index].trueRule.keyPathValue ;
         objectToBesaved.trueRule_questionDestination = JSON.stringify(changedTrueRuleConclusionList[index].trueRule.questionDestination) ;
         objectToBesaved.trueRule_theRule_keyPathValue = JSON.stringify(changedTrueRuleConclusionList[index].trueRule.theRule.keyPathValue) ;
         objectToBesaved.trueRule_theRule_questionAuthor = changedTrueRuleConclusionList[index].trueRule.theRule.questionAuthor ;
         objectToBesaved.trueRule_theRule_questionID = changedTrueRuleConclusionList[index].trueRule.theRule.questionID ;
         objectToBesaved.trueRule_theRule_questionSource = changedTrueRuleConclusionList[index].trueRule.theRule.questionSource ;
         objectToBesaved.trueRule_theRule_ruleAuthor = changedTrueRuleConclusionList[index].trueRule.theRule.ruleAuthor ;
         objectToBesaved.trueRule_theRule_ruleContent = changedTrueRuleConclusionList[index].trueRule.theRule.ruleContent ;
         objectToBesaved.trueRule_theRule_ruleContentInnerText = changedTrueRuleConclusionList[index].trueRule.theRule.ruleContentInnerText ;
         objectToBesaved.trueRule_theRule_ruleID = changedTrueRuleConclusionList[index].trueRule.theRule.ruleID ;
         /*
         // 
         //
         //
         //
         */
         console.log("objectToBesaved") ;
         console.log(objectToBesaved) ;
          fireArray.push(objectToBesaved)
        }
        console.log("*********************** fireArray ******************************") ;
        console.log(fireArray) ;
        batchFireStoreAnswer(fireArray)
      }
      //store.put(saveObject) ;
    }
  }
  
  
  
  
  
  function getAllQuestionsWithUniqueRows(theRowList) {
    console.log("function getAllQuestionsWithUniqueRows(theRowList) {");
    let objectQuestionKeyPathValueListUniqueQuestionRows = {} ;
    for (const elementId of theRowList) {
      let element = document.getElementById(elementId);
      objectQuestionKeyPathValueListUniqueQuestionRows = addObjectQuestionKeyPathValueListUniqueQuestionRows (objectQuestionKeyPathValueListUniqueQuestionRows , element)
    }
    return objectQuestionKeyPathValueListUniqueQuestionRows      
  }
  
  
  
  function getAllRulesWithUniqueRows( theRowList ) {
    console.log("function getAllRulesWithUniqueRows( theRowList ) {");
    let objectRuleKeyPathValueListUniqueQuestionRows = {} ;
    for (const elementID of theRowList) {
      let element = document.getElementById(elementID);
      objectRuleKeyPathValueListUniqueQuestionRows = 
      addobjectRuleKeyPathValueListUniqueQuestionRows (objectRuleKeyPathValueListUniqueQuestionRows , element)
    }
    return objectRuleKeyPathValueListUniqueQuestionRows      
  }
  
  
  function getAllUniqueRows (theRowList) {
    console.log("function getAllUniqueRows (theRowList) {");
    let rowIDarray = Array.from(theRowList , element => element.dataset.uniquequestionnairerow) ;
    return rowIDarray
  }
  
  function setQuestionKeyPathValueInCombinationDetail (saveObject) {
    console.log("function setQuestionKeyPathValueInCombinationDetail (saveObject) {");
    let answerKeyListArray =  Object.keys(saveObject.objectQuestionKeyPathValueListUniqueQuestionRows);
    for (keyPathValueText of  answerKeyListArray ) {
      let keyPathValue = JSON.parse(keyPathValueText) ;
      for (uniqueRow of saveObject.objectQuestionKeyPathValueListUniqueQuestionRows[keyPathValueText]) {
        saveObject.uniqueRowCombinationList[uniqueRow].questionKeyPathValue = keyPathValue
      }
    }
    return saveObject
  }
  
  function setRuleKeyPathValueInCombinationDetail (saveObject) {
    console.log("function setRuleKeyPathValueInCombinationDetail (saveObject) {- first item Object");
    console.log("saveObject");
    console.log(saveObject);
    //let answerKeyListArray =  Object.keys(saveObject.objectRuleKeyPathValueListUniqueQuestionRows);
    console.log("saveObject.objectRuleKeyPathValueListUniqueQuestionRows")
    console.log(saveObject.objectRuleKeyPathValueListUniqueQuestionRows);
    let answerKeyListArray =  Object.keys(saveObject.objectRuleKeyPathValueListUniqueQuestionRows);
    console.log("answerKeyListArray");
    console.log(answerKeyListArray);
    for (keyPathValueText of  answerKeyListArray ) {
      let keyPathValue = JSON.parse(keyPathValueText) ;  
      for (uniqueRow of saveObject.objectRuleKeyPathValueListUniqueQuestionRows[keyPathValueText]) {
        saveObject.uniqueRowCombinationList[uniqueRow].ruleKeyPathValue = keyPathValue
      }
    }
    return saveObject
  
  
  /*
    console.log(saveObject);
    console.log(saveObject.objectRuleKeyPathValueListUniqueQuestionRows);
    let ruleKeyListArray =  Object.keys(saveObject.objectRuleKeyPathValueListUniqueQuestionRows);
    for (keyPathValueText of  ruleKeyListArray ) {
      let keyPathValue = JSON.parse(keyPathValueText) ;
      for (uniqueRow of saveObject.objectQuestionKeyPathValueListUniqueQuestionRows[keyPathValueText]) {
        saveObject.uniqueRowCombinationList[uniqueRow].ruleKeyPathValue = keyPathValue
      }
    }
    return saveObject
    */
  }
  
  
  
  function setKeyPathValuesInCombinationDetail (saveObject) {
    console.log("function setKeyPathValuesInCombinationDetail (saveObject) {");
    saveObject = setQuestionKeyPathValueInCombinationDetail (saveObject) ;
    saveObject = setRuleKeyPathValueInCombinationDetail (saveObject) ;
    return saveObject
  }
  
  
  function makeCombinationDetail (saveObject){
    console.log("function makeCombinationDetail (saveObject){");
    let zeroBasedCount = 0;
    for ( element of saveObject.rowIDarray) {
      let tempObject = {} ;
      tempObject.zeroBasedCount = zeroBasedCount++;
      saveObject.uniqueRowCombinationList[element] = tempObject
    }
    setKeyPathValuesInCombinationDetail (saveObject);
    return saveObject
  }
  
  function correctTheStore(keyPathValue){
    console.log("function correctTheStore(keyPathValue){");
    let correctStore = keyPathValue[0];
    if(correctStore === "questionnaireStore") {
      return "questionnaireStore"
    }
    if(correctStore === "questionStore") {
      return "questionStore"
    }
    let allCaps = correctStore.toUpperCase();
    let isItRule = allCaps.search("RULE");
    if(isItRule>-1){
      return "ruleStore"
    }
    return "answerStore"
  }
  
  
  function getSingleRecordFromStore(keyPathValue) {
    console.log("function getSingleRecordFromStore(keyPathValue) {");
    let dbProperties = {};
    dbProperties.keyPathValue = keyPathValue;
    dbProperties.database = "authorExcuTrust";
    let correctStore = correctTheStore(keyPathValue);
    dbProperties.store = correctStore;
    dbProperties.transactionName = correctStore;
    dbProperties.transactionRead = "readonly" ;
    return dbProperties
  }
  
  async function getQuestionCurrentVersionDate(keyPathValue) {
    console.log("async function getQuestionCurrentVersionDate(keyPathValue) - keyPathValue") ;
    console.log(keyPathValue);
    let indexedDBValue;
    let indexedDBValueReturn = async function () {
      return async () => {
         await getDataAnswerByKeyPathValueV3 (keyPathValue) ;
        //return indexedDBValue
      }
    }
    //console.log(" ------------------------- __________________________________ async function getQuestionCurrentVersionDate(keyPathValue) - indexedDBValue __________________________________________________________________________________ ------------------");
    //console.log(indexedDBValue) ;
    let test =  indexedDBValueReturn ;
    //console.log ("test");
    //console.log (test);
    //console.log("indexedDBValue") ;
    //console.log(indexedDBValue) ;
    return test
  }
  
  function promiseSingleValueFromDB (dbProperties) {
    console.log("function promiseSingleValueFromDB (dbProperties) {");
    //console.log("****************************************************** dbProperties from function promiseSingleValueFromDB (dbProperties) ********************************************************");
    //console.log("dbProperties");
    //console.log(dbProperties);
    //return new Promise(function(resolve , reject) {
    return new Promise(function(resolve) {
      let databaseOpenRequest = indexedDB.open(dbProperties.database);
      databaseOpenRequest.onerror = () => {
        console.log("databaseOpenRequest.onerror");
        resolve("databaseOpenRequest.onerror")
      }
      databaseOpenRequest.onsuccess = () => {
        db = databaseOpenRequest.result ;
        tx = db.transaction(dbProperties.transactionName, dbProperties.transactionRead ) ;
        store = tx.objectStore(dbProperties.store) ;
        let thePromise = store.get(dbProperties.keyPathValue) ;
        //console.log("thePromise");
        //console.log(thePromise);
        tx.oncomplete =  () => {
          let txThePromise = thePromise.result;
          //console.log("txThePromise");
          //console.log(txThePromise);
          resolve(txThePromise);
          /*  do not use onsuccess because it relates to only one request we want to wait until all requests are finished. *** 
          thePromise.onsuccess = () => {
          console.log("thePromise.result");
          console.log(thePromise.result);
            let  answer = thePromise.result ;
            console.log(` :)  :)
            tx.oncomplete =  () => {
              thePromise.onsuccess = () => {
            answer`);
            console.log(answer);
            resolve(answer)
          }
          */
          thePromise.onerror = () => {
            console.log("thePromise.onerror");
            resolve("thepromise.onerror")
          }
        }
        tx.onerror = () => {
           resolve("tx.onerror")
        }
      }
      //return reject("reject - unknown error")
    })
  }
  
  function makeArray(keyPathValue){
    console.log("function makeArray(keyPathValue){");
    if(!Array.isArray(keyPathValue)) {
      keyPathValue = JSON.parse(keyPathValue)
    }
    return keyPathValue
  }
  
  
  async function getOneRecordByKeyPathValue(keyPathValue){
    console.log("async function getOneRecordByKeyPathValue(keyPathValue){");
    //console.log("************************************************************** function getOneRecordByKeyPathValue(keyPathValue) **************************************************************************");
    //console.log("keyPathValue");
    //console.log(keyPathValue);
    keyPathValue = makeArray(keyPathValue);
   //console.log("after makeArray() - keyPathValue");
    //console.log(keyPathValue);
    //console.log(1);
    let allValid = checkForUndefined (keyPathValue);
    //console.log("allValid");
    //console.log(allValid);
    //console.log("keyPathValue");
    //console.log(keyPathValue);
    //console.log(2);
    if(!allValid) {
      //console.log("blank line")
      return "blank line"
    } else {
      //console.log("******************************* NOT blank line! ***********************************")
    }
    //console.log(3);
    let dbProperties = getSingleRecordFromStore(keyPathValue);
    //console.log(4);
    //console.log("dbProperties");
    //console.log(dbProperties);
    //dbProperties.keyPathValue = keyPathValue ;
    let canAsyncGetThis = await  promiseSingleValueFromDB (dbProperties).then(
      function(data){
        let theNewPromise = data ;
        theNewPromise2 = theNewPromise;
        //console.log("theNewPromise to be returned");
        //console.log( theNewPromise ) ;
        return theNewPromise
      });
      //console.log ("canAsyncGetThis");
      //console.log (canAsyncGetThis);
      return canAsyncGetThis
      // Note any code here can run, but will NOT be a updated by the promiseSingleValueFromDB, nor the attached .then.  Effectively this is anysynchronous code. ....
  }
  
  
  
  
  async function getQuestionCurrentVersionDateWithObject(saveObject) {
    console.log("async function getQuestionCurrentVersionDateWithObject(saveObject) {");
    let questionKeyPathList =  Object.keys(saveObject.objectQuestionKeyPathValueListUniqueQuestionRows);
    console.log("_________________________________________________________________________________________________________________________________ questionKeyPathList ____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________");
    console.log(questionKeyPathList);
    for (keyPathValueText of  questionKeyPathList ) {
      console.log("keyPathValueText");
      console.log(keyPathValueText);
      let keyPathValue = JSON.parse(keyPathValueText) ;
      console.log("keyPathValue");
      console.log(keyPathValue);
      let newValueForVersionDate = await getOneRecordByKeyPathValue(keyPathValue) ;
      console.log( "newValueForVersionDate - should be same as theNewPromise" )
      console.log( newValueForVersionDate );
      console.log( "Save Object - no change yet, use newvalue to create change " );
      console.log(saveObject)
    }
  }
  
  function makeEmptyQuestionnaireObjects(saveObject){
    console.log("function makeEmptyQuestionnaireObjects(saveObject){");
    saveObject.uniqueRowCombinationListV2 = {};
    saveObject.questionKeyPathValueListUniqueV2 = {};
    saveObject.ruleKeyPathValueListUniqueV2 = {};
    return saveObject
  }
  
  function getRowQuestion(rowProperties, rowDiv){
    console.log("function getRowQuestion(rowProperties, rowDiv) - values below");
    console.log (rowProperties);
    console.log (rowDiv);
    let elementsByClassName = rowDiv.getElementsByClassName("questionnaireRowQuestionAuthor");
    if(elementsByClassName.length === 0) {
      rowProperties.questionAuthor = null;
      rowProperties.questionId = null
    } else {
      rowProperties.questionAuthor = rowDiv.getElementsByClassName("questionnaireRowQuestionAuthor")[0].innerText;
    rowProperties.questionId = rowDiv.getElementsByClassName("questionnaireRowQuestionID")[0].innerText
    }
    return rowProperties
  }
  
  function getRowRule(rowProperties, rowDiv){
    console.log("function getRowRule(rowProperties, rowDiv){");
    let elementsByClassName = rowDiv.getElementsByClassName("questionnaireRowRuleAuthor");
    if(elementsByClassName.length === 0) {
      rowProperties.ruleAuthor = null;
      rowProperties.ruleId = null;
      rowProperties.ruleType = null;
      return rowProperties
    } else {
      rowProperties.ruleAuthor = rowDiv.getElementsByClassName("questionnaireRowRuleAuthor")[0].innerText;
      rowProperties.ruleId = rowDiv.getElementsByClassName("questionnaireRowRuleID")[0].innerText;
      rowProperties.ruleType = rowDiv.dataset.questionnairerowruletype;
      return rowProperties
    }
  }
  
  function getRowSortAnswer(rowProperties, rowDiv) {
    console.log("function getRowSortAnswer(rowProperties, rowDiv) { *** looks like not used");
    return
    //saveRowObject.questionAnswerSort = element.getElementsByClassName("questionAnswerSort")[0].value*1;
    /*
    let elementsByClassName = rowDiv.getElementsByClassName("questionSortAnswer");
    if(elementsByClassName.length === 0) {
      return rowProperties
    }
    */
   console.log("rowDiv");
   console.log(rowDiv);
   console.log("rowDiv");
   console.log(rowDiv);
   console.log("rowDiv");
   console.log(rowDiv);
   console.log("rowDiv");
   console.log(rowDiv);
   console.log("rowDiv");
   console.log(rowDiv);
   console.log("rowDiv");
   console.log(rowDiv);
   console.log("rowDiv");
   console.log(rowDiv);
   console.log("rowDiv");
   console.log(rowDiv);
  
    let numericValue = rowDiv.getElementsByClassName("questionSortAnswer")[0].value*1;
    rowProperties.questionAnswerSort = numericValue;
    return rowProperties
  }
  
  function appendQuestionnaireRowQuestion (rowId ,questionnaireQuestionKeyPathListsV3, questionString) {
    console.log("function appendQuestionnaireRowQuestion (rowId ,questionnaireQuestionKeyPathListsV3, questionString) {");
    let currentArray =  questionnaireQuestionKeyPathListsV3[questionString];
    if(currentArray === undefined) {
      /*
      questionnaireQuestionKeyPathListsV3[questionString] = [];
      currentArray = questionnaireQuestionKeyPathListsV3[questionString]
      */
      questionnaireQuestionKeyPathListsV3[questionString] = {};
      questionnaireQuestionKeyPathListsV3[questionString].rowIdList = [];
      questionnaireQuestionKeyPathListsV3[questionString].versionDate = "to be coded";
      currentArray = questionnaireQuestionKeyPathListsV3[questionString]
    }
    currentArray = questionnaireQuestionKeyPathListsV3[questionString].rowIdList;
    currentArray.push(rowId)
    return questionnaireQuestionKeyPathListsV3
  }
  
  
  function appendQuestionnaireRowRule (rowId ,questionnaireRuleKeyPathListsV3, ruleString) {
    console.log("function appendQuestionnaireRowRule (rowId ,questionnaireRuleKeyPathListsV3, ruleString) {");
    let currentArray =  questionnaireRuleKeyPathListsV3[ruleString];
    if(currentArray === undefined) {
      /*
      questionnaireRuleKeyPathListsV3[ruleString] = [];
      currentArray = questionnaireRuleKeyPathListsV3[ruleString]
      */
      questionnaireRuleKeyPathListsV3[ruleString] = {};
      questionnaireRuleKeyPathListsV3[ruleString].rowIdList = [];
      questionnaireRuleKeyPathListsV3[ruleString].versionDate = "to be coded";
      currentArray = questionnaireRuleKeyPathListsV3[ruleString]
    }
    currentArray = questionnaireRuleKeyPathListsV3[ruleString].rowIdList;
    currentArray.push(rowId)
    return questionnaireRuleKeyPathListsV3
  }
  
  function getQuestionnaireRowRule(rowDiv) {
    console.log("function getQuestionnaireRowRule(rowDiv) {");
    if(!rowDiv) {
      return null    
    }
    //console.log("rowDiv");
    //console.log(rowDiv);
    let classLength = rowDiv.getElementsByClassName("questionnaireRowRuleAuthor").length ;
    if(classLength === 0) {
      return null    
    }
    let rowRuleAuthor = rowDiv.getElementsByClassName("questionnaireRowRuleAuthor")[0].innerText;
    if(!rowRuleAuthor) {
      return null    
    }
    let rowRuleId = rowDiv.getElementsByClassName("questionnaireRowRuleID")[0].innerText;
    let ruleTypeWording = rowDiv.getElementsByClassName("questionnaireRowRuleType")[0].innerText;
    let ruleType ;
    if(ruleTypeWording === "Collection") {
      ruleType = "groupruleStore"
    } else if(ruleTypeWording === "Display Rule") {
      ruleType = "trueruleStore"
    }
    let rule = [ruleType,1,rowRuleAuthor,1,rowRuleId];
    return rule
  }
  
  
  
  function getQuestionnaireRowQuestion( rowDiv ){
    console.log("function getQuestionnaireRowQuestion( rowDiv ){");
    if(!rowDiv) {return null};
    let classLength = rowDiv.getElementsByClassName("questionnaireRowQuestionAuthor").length ;
    if(classLength === 0) {
      //console.log("classLength === 0");
      return null
    }
    let questionAuthor = rowDiv.getElementsByClassName("questionnaireRowQuestionAuthor")[0].innerText;
    if(!questionAuthor) {
      console.log("!questionAuthor");
      return null
    }
    let questionId = rowDiv.getElementsByClassName("questionnaireRowQuestionID")[0].innerText;
    let questionnaireRowQuestion = ["questionStore",1,questionAuthor,1,questionId] ;
    /*
    console.log(`["questionStore",1,questionAuthor,1,questionId]`);
    console.log(["questionStore",1,questionAuthor,1,questionId]);
    console.log(questionnaireRowQuestion);
    //let theString = JSON.stringify(questionnaireRowQuestion) ;
    //return theString
    */
    return questionnaireRowQuestion
  }
  
  
  
  
  
  function getRowProperties( rowId, rowDiv ){
    console.log("function getRowProperties( rowId, rowDiv ){");
    let rowProperties = {};
    rowProperties.rowId = rowId;
    rowProperties = getRowQuestion(rowProperties, rowDiv);
    rowProperties = getRowRule(rowProperties, rowDiv);
    //rowProperties = getRowSortAnswer(rowProperties, rowDiv);
    //console.log(rowProperties);
    return rowProperties
  }
  
  function cleanRowProperties(rowProperties) {
    console.log("function cleanRowProperties(rowProperties) {");
    let keyList = Object.keys(rowProperties) ;
    for ( let key of keyList) {
      if(rowProperties[key] === null) {
        delete rowProperties[key]
      }
    }
    return rowProperties
  }
  
  function appendRowProperties (rowPropertiesList , rowProperties ){
    console.log("function appendRowProperties (rowPropertiesList , rowProperties ){");
    let unique = JSON.stringify(rowProperties.rowId);
    let uniqueText = JSON.parse(unique);
    //delete rowProperties.rowId;
    let cleanedRowProperties = cleanRowProperties(rowProperties); 
    //rowPropertiesList[uniqueText] = rowProperties ;
    rowPropertiesList[uniqueText] = cleanedRowProperties ;
    return rowPropertiesList
  }
  
  function makeQuestionKeyPathLists (questionKeyPathLists, rowProperties) {
    console.log("function makeQuestionKeyPathLists (questionKeyPathLists, rowProperties) {");
    if( rowProperties.questionAuthor === null ) {
      return questionKeyPathLists
    }
    if( rowProperties.questionAuthor === null ) {
      return questionKeyPathLists
    }
    if( rowProperties.questionAuthor === undefined ) {
      return questionKeyPathLists
    }
    let questionKeyPathValue = ["questionStore",1,rowProperties.questionAuthor,1,rowProperties.questionId];
    let questionKeyPathValueText = JSON.stringify(questionKeyPathValue);
    if(questionKeyPathLists[questionKeyPathValueText] === undefined) {
      questionKeyPathLists[questionKeyPathValueText] = [rowProperties.rowId];
      return questionKeyPathLists
    } else {
      questionKeyPathLists[questionKeyPathValueText].push(rowProperties.rowId)
      return questionKeyPathLists
    }
  }
  
  function makeRuleKeyPathLists (ruleKeyPathLists, rowProperties) {
    console.log("function makeRuleKeyPathLists (ruleKeyPathLists, rowProperties) {");
    if( rowProperties.ruleAuthor === null ) {
      return ruleKeyPathLists
    }
    if( rowProperties.ruleAuthor === undefined ) {
      return ruleKeyPathLists
    }
    let ruleKeyPathValue = [rowProperties.ruleType,1,rowProperties.ruleAuthor,1,rowProperties.ruleId];
    let ruleKeyPathValueText = JSON.stringify(ruleKeyPathValue);
    if(ruleKeyPathLists[ruleKeyPathValueText] === undefined) {
      ruleKeyPathLists[ruleKeyPathValueText] = [rowProperties.rowId];
      return ruleKeyPathLists
    } else {
      ruleKeyPathLists[ruleKeyPathValueText].push(rowProperties.rowId)
      return ruleKeyPathLists
    }
  }
  
  
  function makeQuestionnaireRowIdList() {
    console.log(" function makeQuestionnaireRowIdList() {");
    let rowElements = document.getElementsByClassName("rowChoice");
    let rowIdList = [];
    let rowOffset = 0;
    for ( let element of rowElements){
      let elementId = element.id ;
      if(!elementId) {
        elementId = makeQuestionnaireRowID(rowOffset)
      }
      let elementIdIsInArray = rowIdList.includes(elementId);
      if(elementIdIsInArray) {
        elementId = makeQuestionnaireRowID(rowOffset)
      }
      rowIdList.push(elementId);
      ++rowOffset
    }
    // next part is to correct an error in earlier versions and will not be needed for newly created lists after 2021-03-28
    let uniqueArray  = [... new Set(rowIdList)];
    
    return uniqueArray
  }
  function openModal() {
    console.log("function openModal() {");
    let modal = document.getElementById("myModal");
    modal.style.display = "block"
  }
  function closeModal() {
    console.log("function closeModal() {");
    let modal = document.getElementById("myModal");
    modal.style.display = "none"
  }
  
  function operateModal() {
    console.log("function operateModal() {");
    openModal();
    let place = document.getElementById("modal-list");
    place.innerHTML = rowNumberValue;
    closeModal();
  }
  
  function setupBasicSaveObject(saveObject){
    console.log(" function setupBasicSaveObject(saveObject){");
    saveObject.questionnaireKeyPathValueV3 = ["questionnaireStore",1,document.getElementById("questionnaireAuthor").innerText,1,document.getElementById("questionnaireID").innerText]
    saveObject.questionnaireRowIdListV3 = makeQuestionnaireRowIdList();
    saveObject.questionnaireQuestionKeyPathListsV3 = {};
    saveObject.questionnaireRuleKeyPathListsV3 = {};
    saveObject.questionnaireRowDivDetails = {};
    return saveObject
  }
  
  async function getAllListCombinationsV5(){
    console.log("async function getAllListCombinationsV5(){");
    let saveObject = {};
    saveObject = setupBasicSaveObject(saveObject);
    let rowNumberValue = 0 ;
    for ( let rowId of saveObject.questionnaireRowIdListV3){
      saveObject.questionnaireRowDivDetails[rowId] = {};
      saveObject.questionnaireRowDivDetails[rowId].rowNumber = ++rowNumberValue;
      mySnackBarFunction(rowNumberValue);
      //console.log("mySnackBarFunction")
      let rowDiv = document.getElementById(rowId);
      if(!rowDiv) {
        return getAllListCombinationsV3()
      }
      let question = getQuestionnaireRowQuestion(rowDiv);
      if(question !== null) {
        let questionArrayString = JSON.stringify(question) ;
        saveObject.questionnaireRowDivDetails[rowId].questionArray = question;      
        saveObject.questionnaireQuestionKeyPathListsV3 = appendQuestionnaireRowQuestion (rowId , saveObject.questionnaireQuestionKeyPathListsV3 , questionArrayString);
        let aNumberValue = Number.isFinite(saveObject.questionnaireQuestionKeyPathListsV3[questionArrayString].versionDate);
        if(!aNumberValue) {
          let dbProperties = getSingleRecordFromStore(question);
          let canAsyncGetThis = await  promiseSingleValueFromDB (dbProperties).then(
            function(data){
              let theNewPromise = data ;
              theNewPromise2 = theNewPromise;
              return theNewPromise
            });
          let indexedDBRecord = canAsyncGetThis ;
          let vdate = 0;
          if(indexedDBRecord) {
            if(indexedDBRecord.versionDateSince1969){
              vdate = indexedDBRecord.versionDateSince1969
            }
          }
          saveObject.questionnaireQuestionKeyPathListsV3[questionArrayString].versionDate = vdate
        }
      }
      let rule = getQuestionnaireRowRule(rowDiv);
      if(rule !== null) {
        let ruleString = JSON.stringify(rule) ;
        saveObject.questionnaireRowDivDetails[rowId]["ruleArray"] = rule;
        saveObject.questionnaireRuleKeyPathListsV3 = appendQuestionnaireRowRule(rowId , saveObject.questionnaireRuleKeyPathListsV3 , ruleString);
        let aNumberValue = Number.isFinite(saveObject.questionnaireRuleKeyPathListsV3[ruleString].versionDate);
        if(!aNumberValue) {
          let dbProperties = getSingleRecordFromStore(rule);
          let canAsyncGetThis = await  promiseSingleValueFromDB (dbProperties).then(
            function(data){
              let theNewPromise = data ;
              theNewPromise2 = theNewPromise;
              return theNewPromise
            });
            let indexedDBRecord = canAsyncGetThis ;
            let vdate = 0;
            if(indexedDBRecord) {
              if(indexedDBRecord.versionDateSince1969){
                vdate = indexedDBRecord.versionDateSince1969
              }
            }
            saveObject.questionnaireRuleKeyPathListsV3[ruleString].versionDate = vdate
        }
      }
    }
    let stringSaveObject = JSON.stringify(saveObject);
    return stringSaveObject
    //return saveObject
  }
  
  function addQuestionnaireDescription(saveObject) {
    console.log("function addQuestionnaireDescription(saveObject) {");
    // may only need "questionnaireContent"
    for(let valid of ["questionnaireAuthor","questionnaireID","questionnaireContent"] ) {
      let domValue = document.getElementById(valid).innerHTML ;
      saveObject[valid] = domValue
    }
    return saveObject
  }
  
  
  
  function addKeyPathValueQuestionnaire (saveObject){
    console.log("function addKeyPathValueQuestionnaire (saveObject){");
    saveObject.keyPathValue = [...saveObject.questionnaireKeyPathValueV3];
    saveObject.keyPathValue.push("allDetails");
    saveObject.versionDateSince1969 = Date.now() ;
    /*
    console.log(saveObject);
    mySnackBarFunction(`Now Save "saveObject", then process it by creating questionnaires. Remember document frag. `);
    */
    saveLastObjectToIndexedDB (saveObject)
  }
  
  
  async function getAllListCombinationsV6() {  
    console.log("async function getAllListCombinationsV6() {  ");
    let dataEmpty = sessionStorage.getItem('questionnairedetails');
    if(dataEmpty) {
      sessionStorage.removeItem('questionnairedetails')
    }
    //dataEmpty = await getAllListCombinationsV5();
    let change = async () => {
      //console.log("change");
      //let saveObject = await getAllListCombinationsV5();
      let stringSaveObject = await getAllListCombinationsV5();
      let saveObject = await JSON.parse(stringSaveObject);
      let keypathListtemp = await JSON.parse(JSON.stringify(saveObject.questionnaireRowIdListV3.length));
      let domLength = document.getElementsByClassName("questionAnswerSort").length;
      let newDomLength = await JSON.parse(JSON.stringify(domLength));
      if(newDomLength !== 0){
        if(newDomLength === keypathListtemp) {
          clearInterval(idVar); 
          sessionStorage.setItem('questionnairedetails',stringSaveObject)
        }
      }
    }
    let doSessionVariableSaveDetailsOfQuestionnaire = () => {
      //console.log("doSessionVariableSaveDetailsOfQuestionnaire");
      let data = sessionStorage.getItem('questionnairedetails');
      if(data) {
        //console.log(`data<>""`);
        clearInterval(idVar2);
        let saveObject = JSON.parse(data);
        sessionStorage.removeItem('questionnairedetails');
        saveObject = addQuestionnaireDescription(saveObject);
        addKeyPathValueQuestionnaire (saveObject)
      }
    }
    let interval = 100;
    let idVar = setInterval(change, interval) ;
    let idVar2  = setInterval(doSessionVariableSaveDetailsOfQuestionnaire, interval+10)
  }
  
  
  
  
  async function getAllListCombinationsV3(){
    console.log("async function getAllListCombinationsV3(){");
    //openModal();
    //let place = document.getElementById("modal-list");
    let saveObject = {};
    saveObject = setupBasicSaveObject(saveObject);
    let rowNumberValue = 0 ;
    for ( let rowId of saveObject.questionnaireRowIdListV3){
      saveObject.questionnaireRowDivDetails[rowId] = {};
      saveObject.questionnaireRowDivDetails[rowId].rowNumber = ++rowNumberValue;
      mySnackBarFunction(rowNumberValue);
      //console.log("mySnackBarFunction")
      let rowDiv = document.getElementById(rowId);
      if(!rowDiv) {
        //console.log("getAllListCombinationsV3()");
        return getAllListCombinationsV3()
      }
      let question = getQuestionnaireRowQuestion(rowDiv);
      if(question !== null) {
        let questionArrayString = JSON.stringify(question) ;
        saveObject.questionnaireRowDivDetails[rowId].questionArray = question;      
        saveObject.questionnaireQuestionKeyPathListsV3 = appendQuestionnaireRowQuestion (rowId , saveObject.questionnaireQuestionKeyPathListsV3 , questionArrayString);
        let aNumberValue = Number.isFinite(saveObject.questionnaireQuestionKeyPathListsV3[questionArrayString].versionDate);
        if(!aNumberValue) {
          let dbProperties = getSingleRecordFromStore(question);
          let canAsyncGetThis = await  promiseSingleValueFromDB (dbProperties).then(
            function(data){
              let theNewPromise = data ;
              theNewPromise2 = theNewPromise;
              return theNewPromise
            });
          let indexedDBRecord = canAsyncGetThis ;
          let vdate = 0;
          if(indexedDBRecord) {
            if(indexedDBRecord.versionDateSince1969){
              vdate = indexedDBRecord.versionDateSince1969
            }
          }
          saveObject.questionnaireQuestionKeyPathListsV3[questionArrayString].versionDate = vdate
        }
      }
      let rule = getQuestionnaireRowRule(rowDiv);
      if(rule !== null) {
        let ruleString = JSON.stringify(rule) ;
        saveObject.questionnaireRowDivDetails[rowId]["ruleArray"] = rule;
        saveObject.questionnaireRuleKeyPathListsV3 = appendQuestionnaireRowRule(rowId , saveObject.questionnaireRuleKeyPathListsV3 , ruleString);
        //console.log(saveObject);
        //console.log(saveObject.questionnaireRuleKeyPathListsV3)
        //console.log(saveObject.questionnaireRuleKeyPathListsV3[ruleString]);
        let aNumberValue = Number.isFinite(saveObject.questionnaireRuleKeyPathListsV3[ruleString].versionDate);
       //saveObject.questionnaireRuleKeyPathListsV3[ruleString].versionDate = "to get from IndexedDB";
        if(!aNumberValue) {
          let dbProperties = getSingleRecordFromStore(rule);
          let canAsyncGetThis = await  promiseSingleValueFromDB (dbProperties).then(
            function(data){
              let theNewPromise = data ;
              theNewPromise2 = theNewPromise;
              return theNewPromise
            });
            let indexedDBRecord = canAsyncGetThis ;
            let vdate = 0;
            if(indexedDBRecord) {
              if(indexedDBRecord.versionDateSince1969){
                vdate = indexedDBRecord.versionDateSince1969
              }
            }
            saveObject.questionnaireRuleKeyPathListsV3[ruleString].versionDate = vdate
        }
      }
    }
    //let keypathListtemp = JSON.parse(JSON.stringify(saveObject.questionKeyPathListsV3.length)) ;
    //console.log(saveObject.questionKeyPathListsV3.length);
    //console.log("keypathListtemp");
    //console.log(saveObject.questionnaireRowIdListV3);
    //console.log(saveObject.questionnaireRowIdListV3.length);
    let keypathListtemp = JSON.parse(JSON.stringify(saveObject.questionnaireRowIdListV3.length));
    //console.log(keypathListtemp);
  
    //console.log("domLength");
    //console.log(domLength);
    //console.log(domLength === keypathListtemp);
    if(domLength === 0){
      return
    }
    if(domLength !== keypathListtemp) {
      return
    }
    /*
    console.log(domLength === keypathListtemp);
    console.log("keypathListtemp");
    console.log(keypathListtemp);
    console.log("domLength");
    console.log(domLength);
    */
    console.log(`^^^^ ***************** rowPropertiesListV3 **************** ^^^^
    saveObject.questionnaireRowIdListV3
    saveObject.questionnaireRowIdListV3
    questionKeyPathListsV3
    ruleKeyPathLists
    saveObject.questionKeyPathListsV3
    saveObject-rowIdListV3
    saveObject
    +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ function getAllListCombinationsV3 (saveObject) +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++`);
    console.log(saveObject)
  }
  
  function confirmQuestionnaireAuthorIdDescription(){
    console.log("function confirmQuestionnaireAuthorIdDescription(){");
    for (let valid of ["questionnaireAuthor","questionnaireID","questionnaireContent"]){
      let domValue = document.getElementById(valid).innerText ;
      //console.log(valid);
      //console.log(domValue);
      if(!domValue){ 
        return false
      }
    }
    return true
  }
  
  function getAllListCombinationsV2 (saveObject) {
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ function getAllListCombinationsV2 (saveObject) +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ ");
    saveObject = makeEmptyQuestionnaireObjects(saveObject);
    saveObject.rowIdListV2 = makeQuestionnaireRowIdList();
    console.log("saveObject");
    console.log(saveObject);
    let questionKeyPathLists = {};
    let ruleKeyPathLists = {};
    let rowPropertiesList = {};
    let rowNumberValue = 0;
    for ( let rowId of saveObject.rowIdListV2){
      mySnackBarFunction(++rowNumberValue);
      let rowDiv = document.getElementById(rowId);
      let rowProperties = getRowProperties( rowId, rowDiv );
      rowPropertiesList = appendRowProperties (rowPropertiesList , rowProperties );
      questionKeyPathLists = makeQuestionKeyPathLists (questionKeyPathLists, rowProperties);
      ruleKeyPathLists = makeRuleKeyPathLists (ruleKeyPathLists, rowProperties);
    }
    console.log("^^^^ ***************** rowPropertiesList **************** ^^^^");
    console.log(rowPropertiesList);
    console.log("questionKeyPathLists");
    console.log(questionKeyPathLists);
    console.log("ruleKeyPathLists");
    console.log(ruleKeyPathLists);
    console.log("saveObject-rowIdListV2");
    console.log(saveObject);
    return saveObject
  }
  
  
  function getAllListCombinations (saveObject) {
    console.log(" function getAllListCombinations (saveObject) {");
    saveObject.uniqueRowCombinationList = {};    
    saveObject.rowIDarray = makeQuestionnaireRowIdList();      
    let theRowList = saveObject.rowIDarray;
    console.log("getAllUniqueRows")
    console.log(saveObject);
    saveObject.objectRuleKeyPathValueListUniqueQuestionRows = getAllRulesWithUniqueRows(theRowList);
    console.log("getAllRulesWithUniqueRows")
    console.log(saveObject);
    saveObject.objectQuestionKeyPathValueListUniqueQuestionRows = getAllQuestionsWithUniqueRows(theRowList);
    console.log("getAllQuestionsWithUniqueRows");
    console.log(saveObject);
    saveObject = makeCombinationDetail (saveObject);
    saveObject = getQuestionCurrentVersionDateWithObject(saveObject) ;
    return saveObject
  }
  
  
  function setKeyPathValueForQuestionnaireStore (saveObject) {
    console.log("function setKeyPathValueForQuestionnaireStore (saveObject) {");
    saveObject.keyPathValue = [] ;
    saveObject.keyPathValue.push("questionnaireStore");
    saveObject.keyPathValue.push(1);
    saveObject.keyPathValue.push(saveObject.questionnaireAuthor);
    saveObject.keyPathValue.push(1);
    saveObject.keyPathValue.push(saveObject.questionnaireID);
    return saveObject
  }
  
  function setKeyPathValueForQuestionStore (saveObject) {
    console.log("function setKeyPathValueForQuestionStore (saveObject)")
    saveObject.keyPathValue = [] ;
    saveObject.keyPathValue.push("questionStore");
    saveObject.keyPathValue.push(1);
    saveObject.keyPathValue.push(saveObject.questionAuthor);
    saveObject.keyPathValue.push(1);
    saveObject.keyPathValue.push(saveObject.questionID);
    saveObject.questionType = getTrueTypeQuestion() ;    
    console.log("saveObjectAsText(saveObject)");
    saveObjectAsText(saveObject);
    return saveObject
  }
  
  async function saveToDatabase(saveObject, questionnaireRowChoice) { 
    console.log("async function saveToDatabase(saveObject, questionnaireRowChoice) { ");
    console.log ( "prevent adding questionnaire properties 1");
    console.log(questionnaireRowChoice);
    saveObjectAsText(saveObject);  
    let db ;  
    if(saveObject.questionnaireAuthor === undefined) {
      saveObject = setKeyPathValueForQuestionStore (saveObject)
    } else {
      saveObject = setKeyPathValueForQuestionnaireStore (saveObject);
      saveObject = await saveModifiedQuestionnaireRows(saveObject , questionnaireRowChoice) ;
    }
    const request = indexedDB.open("authorExcuTrust");
    console.log(`const request = indexedDB.open("authorExcuTrust");`)
    request.onsuccess =  function() {
      console.log("request.onsuccess =  function() {") ;
      db = request.result;
      //    The following example populates the database using a transaction.
      // ''and *** readwrite for update / create ***
      const tx = db.transaction(saveObject.keyPathValue[0], "readwrite");
      const store = tx.objectStore(saveObject.keyPathValue[0]);
      let rowIDarray = [];
      //let rowRuleTypearray = [];
      if(saveObject.questionnaireAuthor) {
  
        
        // *** this saves row choice, if needed, 
        let theRowList = document.getElementsByClassName("rowChoice") ;
        let theLength = theRowList.length ;
        saveObject.versionDateSince1969 = Date.now() ;
        for (let index = 0; index < theLength; index++) {
          mySnackBarFunction(index);
          let element = theRowList[index];
          //*** this is correct element for saving ***
          rowIDarray.push(element.dataset.uniquequestionnairerow) ;
          //rowRuleTypearray.push("element.dataset.uniquequestionnairerow equivalent for rule 1") ;
          if(element.dataset.sendtofirestore !== undefined) {
            element =  resetFireStoreFlag (element) ; // setFlag is undefined on purpose
            let outerElement = element ;
            let saveRowObject = {} ;
            saveRowObject.questionnaireAuthor = saveObject.questionnaireAuthor ;
            saveRowObject.questionnaireID = saveObject.questionnaireID ;
            saveRowObject.keyPathValue = ["questionnaireStore",1,document.getElementById("questionnaireAuthor").innerText.trim(),1,document.getElementById("questionnaireID").innerText.trim(),element.dataset.uniquequestionnairerow] ;
            saveRowObject.questionAnswerSort = element.getElementsByClassName("questionAnswerSort")[0].value*1;
            saveRowObject.theContent = "theContent to be programned" ;
            saveRowObject.versionDateSince1969 = [document.getElementById("questionnaireAuthor").innerText.trim(),document.getElementById("questionnaireID").innerText.trim(),saveObject.versionDateSince1969];
            saveRowObject.questionnaireRow = [document.getElementById("questionnaireAuthor").innerText.trim(),document.getElementById("questionnaireID").innerText.trim(),element.getElementsByClassName("questionAnswerSort")[0].value*1];
            document.getElementById("questionnaireID").innerText.trim(),element.getElementsByClassName("questionAnswerSort")[0].classList.remove("missing") ;
            let temp0 = ["questionnaireRowQuestionAuthor", "questionnaireRowQuestionID", "questionnaireRowRuleAuthor","questionnaireRowRuleID","questionnaireRowRuleType"] ;
            let temp0Length = temp0.length ;
            for (let index = 0; index < temp0Length; index++) {
              mySnackBarFunction(index);
              const element = temp0[index];
              if( outerElement.getElementsByClassName(element).length > 0){
                saveRowObject[element] = outerElement.getElementsByClassName(element)[0].innerText ;               
              }
            }
            temp0 = ["questionnairerowquestionauthor", "questionnairerowquestionid", "questionnairerowruleauthor","questionnairerowruleid","questionnairerowruletype"]
            temp0Length = temp0.length ;
            for (let index = 0; index < temp0Length; index++) {
              const element = temp0[index];
              if(outerElement.dataset[element] !== undefined) {
                saveRowObject[element] = outerElement.dataset[element] //2020-11-27
              }
            }
            temp0 = ["rowChoice"] ;
            temp0Length = temp0.length ;
            for (let index = 0; index < temp0Length; index++) {
              const element = temp0[index];
              saveRowObject[element] = outerElement.innerHTML  
            }
              console.log("store.put(saveRowObject)");
              store.put(saveRowObject) ;
              batchFireStore2([saveRowObject]) ;
            }
          }    
        }
        if(questionnaireRowChoice === "questionnaireRowChoice") {
          console.log ( "prevent adding questionnaire properties 2");
          saveObject = getAllListCombinationsV2 (saveObject) ;
          saveObject = getAllListCombinations (saveObject) ; // to be removed later
          
          // *** always a comment  *** no need to clean rowRuleTypearray
          saveObject = cleanBeforeSentToFireStore (saveObject) ;
         
        }
        saveObject.versionDateSince1969 = Date.now() ;
        store.put(saveObject) ;
        let fireStoreArray = [saveObject];
        let t1 ;
        function fireStoreCurrentAndHistory() {
          console.log("fireStoreCurrentAndHistory() - *** look into using transaction instead of array, it may be faster and less memory intensive. ***");
          const T = JSON.stringify(saveObject) ;
           t1 = JSON.parse(T);
           t1.keyPathValue.push(saveObject.versionDateSince1969)
        }
        fireStoreCurrentAndHistory() ;
        fireStoreArray.push(t1);
        //batchFireStore2([saveObject]) 
        batchFireStore2(fireStoreArray) 
      }   
  }
  function getQuestionLogic(saveObject) {
    console.log("function getQuestionLogic(saveObject) {");
    let wrapper = document.getElementById("questionAnswerChoices");
    let theClass = "questionAnswerSort" ;
    let details = [], detailsInnerText ; 
    // get choice numbers
    let detailsList = wrapper.getElementsByClassName (theClass) ;
    for (let index = 0; index < detailsList.length; index++) {
      const element = detailsList[index];
      details.push(element.valueAsNumber)    
    };
    saveObject[theClass] = details ;
    //let theClassList =  [ "questionAnswerDescription", "questionAnswerNotesDescription" ];
    let theClassList =  [ "questionAnswerDescription"] ;
    for (let index = 0; index < theClassList.length; index++) {
      theClass = theClassList[index];
      detailsList = wrapper.getElementsByClassName (theClass) ;
      details = [] ;
      detailsInnerText = [] ;
      for (let index = 0; index < detailsList.length; index++) {
        const element = detailsList[index];
        details.push(element.innerHTML) ;
        detailsInnerText.push(element.innerText);
      }
      saveObject[theClass] = details ;
      theClass = theClass + "InnerText";
      saveObject[theClass] = detailsInnerText ;
    }
    theClassList =  [ "checkboxExplain", "checkboxNoChange" ];
    detailsInnerText = [] ; // /* may not be needed, because this variable no longer used. 
    for (let index = 0; index < theClassList.length; index++) {
      theClass = theClassList[index];
      detailsList = wrapper.getElementsByClassName (theClass) ;
      details = [] ;
      for (let index = 0; index < detailsList.length; index++) {
        const element = detailsList[index];
        details.push(element.checked) ;
      }
      saveObject[theClass] = details ;
    }
  }
  
  
  /* ***   ABOVE  is from old 20200422rebuild.js file */
  
  function manageCopyBTN( theSelected ){
    console.log("function manageCopyBTN( theSelected ){");
  let cln = theSelected.cloneNode(true);
  theSelected.insertAdjacentElement("afterend",cln);
  let preventChanges = theSelected.getElementsByClassName("checkboxNoChange")[0].checked ;
  let rowCount = document.getElementsByClassName("checkboxNoChange").length ;
  if(!preventChanges && rowCount === 2){
    document.getElementsByClassName("deleteBtn")[0].style.display = "" ;
    document.getElementsByClassName("deleteBtn")[1].style.display = "" ;
  }
  let theList = document.getElementsByClassName ("questionAnswerSort");
  compareNumberInput() 
  }
  
  function getTrueHiddenSome(clearList) {
    console.log("function getTrueHiddenSome(clearList) {");
    for (let index = 0; index < clearList.length; index++) {
      const element = clearList[index];
      if(element.checked) {
        element.classList.add("hidealways")
      }
    }
  }
  
  function getTrueHiddenALL(clearList) {
    console.log("function getTrueHiddenALL(clearList) {");
    for (let index = 0; index < clearList.length; index++) {
      const element = clearList[index];   
      element.classList.add("hidealways")
    }
  }
  
  function clearQuestionTrueRule() {  
    console.log("function clearQuestionTrueRule() {  ");
      let clearList = document.getElementsByClassName("trueRuleDiv") ;
      if(clearList.length > 0) {
        if(clearList[0].classList.contains("hidealways") === false) {
          for (let index = 0; index < clearList.length; index++) {
            const element = clearList[index];
            element.classList.add("hidealways")
          }
        }
      }
  }
  
  function clearTrueRule() { // 20200715 not being called, likely can be deleted
  // hides option to change rules for answer choices and shows button choice for making and answer choice true for this rule, DO NOT REMOVE AS SOME CODE WILL HAVE ERRORS
  console.log("function clearTrueRule() {");
    let = clearList = document.getElementsByClassName("copyBtn") ;
    if(clearList.length > 0) {
      if(clearList[0].classList.contains("hidealways") === false) {
        for (let index = 0; index < clearList.length; index++) {
          const element = clearList[index];
          element.classList.add("hidealways")
        }
      }
    }
    clearList = document.getElementsByClassName("deleteBtn") ;
    if(clearList.length > 0) {
      if(clearList[0].classList.contains("hidealways") === false) {
        for (let index = 0; index < clearList.length; index++) {
          const element = clearList[index];
          element.classList.add("hidealways")
        }
      }
    }
    clearList = document.getElementsByClassName("checkboxNoChange") ;
    if(clearList.length > 0) {
      if(clearList[0].classList.contains("hidealways") === false) {
        for (let index = 0; index < clearList.length; index++) {
          const element = clearList[index];
          element.classList.add("hidealways")
        }
      }
    }
    /**/
    if(document.getElementById("testForChange").classList.contains("firstRequiredExplanation") !== true) {
      let clearList = document.getElementsByClassName("checkboxExplain") ;
      if(clearList.length > 0) {
        let allRequireExplanation = document.getElementById("questionAnsweredRequiresExplanation") ;
        if(allRequireExplanation.checked) {
          getTrueHiddenALL(clearList)
        } else {
          getTrueHiddenSome(clearList)
        }
      }
      document.getElementById("testForChange").classList.add("firstRequiredExplanation")
    }
  }
  
  function unlockAll() {
    console.log("function unlockAll() {");
    showHideSaveButtonByID() ;
    if(document.getElementById("allowAllChanges").value !== "" ) {
      // do not  use setupEvents() ; // not sure needed
      document.getElementById("allowAllChanges").value = "" ; // applies to all unlocks
  
      let checkForQuestion = document.getElementById("process0").textContent ;
        if ( checkForQuestion === "New Question Level Rule") {
          contentEditabledByID(true, ["ruleAuthor","ruleID", "ruleContent"]) ;
          document.getElementById("selectChangeButtonForRule").classList.remove("hidealways") ;
        }
  
      if (document.getElementById("process1").textContent === "modifyRuleDisabledTrueFalse") { 
        document.getElementById("preventAllChanges").value = "Prevent Changes to Display Rule" ; // applies when changing True rule to allow changes to true 
        
        let trueRuleList = document.getElementsByClassName("trueRule");
        for (let index = 0; index < trueRuleList.length; index++) {
          let element = trueRuleList[index];
          element.disabled = false
        }
      } else if (document.getElementById("process1").textContent === "modifyQuestionOptions" ) {
        document.getElementById("preventAllChanges").value = "Prevent Changes to Question" ;
        let btemp =  document.getElementById("saveButton") ;
        btemp.value = "Save Changes to Question" ; /**/
        let radioChoices = document.getElementsByClassName("questionTypeDivList") ; // unlock Type of Question. applicable to Question modification, NOT  to True rule modification 
        document.getElementById("questionID").contentEditable = true ;
        for (let index = 0; index < radioChoices.length; index++) {
          radioChoices[index].disabled = false    
        }
        allContentEditabledGroup(true,"questionAnswerDescription") ;      
        allDisabledGroup(false,"copyBtn") ;
        allDisabledGroup(false,"deleteBtn") ;
        allDisabledGroup(false,"checkboxExplain") ;
        // below  moved  from commented out section below. 
        document.getElementById("makeCopy").checked = false ;
        document.getElementById("questionUnansweredComplete").disabled = false ; 
        document.getElementById("questionUnansweredRequiresExplanation").disabled = false ; 
        document.getElementById("questionAnsweredRequiresExplanation").disabled = false ; 
        let theWrapper = document.getElementById("questionAuthorContent") ;
        let theList = theWrapper.getElementsByClassName("checkboxNoChange");
        for (let index = 0; index < theList.length; index++) {
          const element = theList[index];
          element.checked = false 
        }
        theList = theWrapper.getElementsByClassName("questionQuestionContent");
        for (let index = 2; index < theList.length; index++) {
          const element = theList[index];
          element.contentEditable = true 
        }
        theWrapper = document.getElementById("questionAnswerChoices") ;  
        theList = theWrapper.getElementsByClassName("rowChoice");
        for (let index = 0; index < theList.length; index++) {
          const theSelected = theList[index];
          theSelected.getElementsByClassName("checkboxNoChange")[0].checked = false ;
          undoPreventChange( theSelected )
        }
      }
    }
  }
  
  function ruleLockQuestion() {
    console.log("function ruleLockQuestion() {");
  // used to prevent changes to question atrributes and allow selection of True Rule checkmarks
    let temp = document.getElementById("preventAllChanges") ;
    temp.textContent = "" ;
    temp = document.getElementById("allowAllChanges") ;
    temp.textContent = 'Allow Changes to "to Display Rules"' ;
      let array = document.getElementsByClassName("checkboxNoChange") ;
      for (let index = 0; index < array.length; index++) {
        let element = array[index];
        element.classList.add("hidealways") ;
        element.classList.add("hidealways2") 
      }
      array = document.getElementsByClassName("copyBtn") ;
      for (let index = 0; index < array.length; index++) {
        let element = array[index];
        element.classList.add("hidealways") ;
        element.classList.add("hidealways2") 
      }
      array = document.getElementsByClassName("trueRule") ;
      for (let index = 0; index < array.length; index++) {
        let element = array[index];
        element.disabled = true 
      }
      if(array.length > 0 ) {
  
      }
  
    //}
  }
  
  function allShowGroup (truefalse, group) {
    console.log("function allShowGroup (truefalse, group) {");
    if(group === "deleteBtn") {
      if(truefalse === true) {
        let temp = document.getElementsByClassName("copyBtn");
        let count = temp.length ;
        if( count < 2) {
          truefalse = false
        }
      }
    }
    let radioChoices = document.getElementsByClassName(group) ;
    if(truefalse) {
      for (let index = 0; index < radioChoices.length; index++) {
        let element = radioChoices[index] ;
        element.classList.remove("hidealways") 
      }
    } else {
      for (let index = 0; index < radioChoices.length; index++) {
        let element = radioChoices[index] ;
        element.classList.add("hidealways") 
      }
    }
    /**/
  }
  
  
  function allDisabledGroup(truefalse,group) {
    console.log("function allDisabledGroup(truefalse,group) {");
    let radioChoices = document.getElementsByClassName(group) ;
    for (let index = 0; index < radioChoices.length; index++) {
      radioChoices[index].disabled = truefalse    
    }
  }
  
  function allContentEditabledGroup(truefalse,group) {
    console.log("function allContentEditabledGroup(truefalse,group) {");
    let radioChoices = document.getElementsByClassName(group) ;
    for (let index = 0; index < radioChoices.length; index++) {
      radioChoices[index].contentEditable = truefalse    
    }
  }
  
  function contentEditabledByID(truefalse, idList) {
    console.log("function contentEditabledByID(truefalse, idList) {");
    let save = true ;
    for (let index = 0; index < idList.length; index++) {
      let idName = idList[index] ;
      let isItBlank = document.getElementById(idName) ;
      isItBlank.contentEditable = truefalse ;
      if (save) {
        let temp = isItBlank.textContent.trim() ;
        if(temp === "") {save = false}
      }
    }
    let checkForQuestion = document.getElementById("process0").textContent ;
    if ( checkForQuestion === "New Question Level Rule") {
      if(save) {
        document.getElementById("selectChangeButtonForRule").classList.remove("hidealways")
      } else {
        document.getElementById("selectChangeButtonForRule").classList.add("hidealways")
      }
    }
  }
  
  function checkboxAllDisabled(truefalse) {
    console.log("function checkboxAllDisabled(truefalse) {");
    let radioChoices = document.getElementsByClassName("questionTypeDivList") ;
    for (let index = 0; index < radioChoices.length; index++) {
      radioChoices[index].disabled = truefalse    
    }
    radioChoices = document.getElementsByClassName("checkboxNoChange") ;
    for (let index = 0; index < radioChoices.length; index++) {
      radioChoices[index].disabled = truefalse
    }
    document.getElementById("questionUnansweredComplete").disabled = truefalse ; 
    document.getElementById("questionUnansweredRequiresExplanation").disabled = truefalse ; 
    document.getElementById("questionAnsweredRequiresExplanation").disabled = truefalse
  }
  
  function disableByID (truefalse, idList) {
    console.log("function disableByID (truefalse, idList) {");
    for (let index = 0; index < idList.length; index++) {
      let element = idList[index];
      document.getElementById(element).disabled = truefalse 
    }
  }
  
  function modalJoeFilter() {
    console.log("function modalJoeFilter() {");
    let input, input2,  input3, filter, filter2, filter3, ul, li, a, i, txtValue;
    input = document.getElementById("modalJoeInput");
    input2 = document.getElementById("modalJoeIDInput");
    input3 = document.getElementById("modalJoeWordInput");
    filter = input.value.toUpperCase();
    filter2 = input2.value.toUpperCase();
    filter3 = input3.value.toUpperCase();
    //ul = document.getElementById("myUL");
    uf = document.getElementsByClassName("modal-filter-row") ;
    li = uf.length ;
    for (i = 0; i < li; i++) {
        a = uf[i].getElementsByClassName("modal-author")[0];
        if(a === undefined) {
          textValue = "not a valid entry 2021-02-10"
        } else if(a.textContent === undefined) {
          textValue = "not a valid entry 2021-02-10"
        } else if( a.innerText === undefined) {
          textValue = "not a valid entry 2021-02-10"             
        } else {
          txtValue = a.textContent || a.innerText
        }
        //txtValue = a.textContent || a.innerText;
        let test1 = txtValue.toUpperCase().indexOf(filter) ;
        a = uf[i].getElementsByClassName("modal-ID")[0];
        txtValue = a.textContent || a.innerText;
        let test2 = txtValue.toUpperCase().indexOf(filter2) ;
        a = uf[i].getElementsByClassName("modal-word")[0];
        if( a !== undefined) {
          txtValue = a.textContent || a.innerText
        } else {
          a = false 
        }
        //txtValue = a.textContent || a.innerText;
        let test3 = txtValue.toUpperCase().indexOf(filter3) ;
  
        if (test1 > -1 && test2 > -1 && test3 > -1) {
            uf[i].style.display = "";
        } else {
            uf[i].style.display = "none";
        }
    }
  }
   
  function showHideSaveButtonByID(checkForQuestion) {
    console.log("function showHideSaveButtonByID(checkForQuestion) {");
    let idList = [];
    if(checkForQuestion === undefined) { //20200902 12:37
       checkForQuestion = document.getElementById("process0").textContent 
    } //20200902 12:37
    if ( checkForQuestion === "New Question Level Rule") {
      idList = ["ruleAuthor","ruleID","ruleContent"] 
    } else if (checkForQuestion === "New Questionnaire") {
      idList = ["questionnaireAuthor","questionnaireID","questionnaireContent"]
    } else if (checkForQuestion === "New Question") {
      idList = ["questionAuthor","questionID","questionContent"]
    }
    let save = true ;
    for (let index = 0; index < idList.length; index++) {
      if (save) {
        let idName = idList[index] ;
        let isItBlank = document.getElementById(idName) ;    
        let temp = isItBlank.textContent.trim() ;
        if(temp === "") {
          save = false ;
          index = idList.length
        }
      }
    }
    if(save) {
      if ( checkForQuestion === "New Question Level Rule") {
        document.getElementById("saveButton").value = getQuestionLevelRuleButton()
      } else if (checkForQuestion === "New Questionnaire") {
        //idList = ["questionnaireAuthor","questionnaireID","questionnaireContent"]
        document.getElementById("saveButton").value = " Save Questionnaire " ;
        document.getElementById("saveButton").classList.remove("hidealways") ;
        document.getElementById("questionnaireAnswerChoicesHeader").classList.remove("hidealways") ;
        document.getElementById("questionnaireAnswerChoices").classList.remove("hidealways") ;
        //fixMissing()
        fixQuestionnaireMissing()
      } else if (checkForQuestion === "New Question") {
        idList = ["questionAuthor","questionID","questionContent"]
      }
      //document.getElementById("saveButton").classList.remove("hidealways")
    } else {
      document.getElementById("saveButton").value = "" ;
      if ( checkForQuestion === "New Question Level Rule") {
        //document.getElementById("saveButton").value = getQuestionLevelRuleButton()
      } else if (checkForQuestion === "New Questionnaire") {
        //idList = ["questionnaireAuthor","questionnaireID","questionnaireContent"]
        document.getElementById("questionnaireAnswerChoicesHeader").classList.add("hidealways") ;
        document.getElementById("questionnaireAnswerChoices").classList.add("hidealways") ;
        //fixMissing()
        fixQuestionnaireMissing()
      } else if (checkForQuestion === "New Question") {
        idList = ["questionAuthor","questionID","questionContent"]
      }
      //document.getElementById("saveButton").classList.remove("hidealways")
    }
  }
  
  
  function lockAll() {
    console.log("function lockAll() {");
    //showHideSaveButtonByID() ;
    if(document.getElementById("preventAllChanges").value !== "" ) {
      showHideSaveButtonByID() ;
      //setupEvents() ; // not sure needed - do not use
      document.getElementById("preventAllChanges").value = "" ;
      let checkForQuestion = document.getElementById("process0").textContent ;
      if ( checkForQuestion === "New Question Level Rule") {
        contentEditabledByID(false, ["ruleAuthor","ruleID", "ruleContent"]) ;
        document.getElementById("selectChangeButtonForRule").classList.add("hidealways") ;
      }
  
  
      allContentEditabledGroup(false,"questionAnswerDescription") ;
      allDisabledGroup(true,"questionTypeDivList") ;
      allDisabledGroup(true,"checkboxNoChange") ;
      allDisabledGroup(true,"copyBtn") ;
      allDisabledGroup(true,"deleteBtn") ;
      allDisabledGroup(true,"questionAnswerSort") ;
      allDisabledGroup(true,"checkboxExplain") ;
      document.getElementById("questionUnansweredComplete").disabled = true ; 
      document.getElementById("questionUnansweredRequiresExplanation").disabled = true ; 
      document.getElementById("questionAnsweredRequiresExplanation").disabled = true ;
      if(
        document.getElementById("process1").textContent === "modifyRuleDisabledTrueFalse"
        )
      {
        ruleLockQuestion()
      }
      else if(
        document.getElementById("process1").textContent === "modifyQuestionOptions" 
        )
      {
        document.getElementById("allowAllChanges").value = "Allow Changes to Question 4:45" ;
        let temp =  document.getElementById("saveButton") ;
        temp.value = "Save Changes to Question" ;
        temp.classList.remove("hidealways") ;
        clearQuestionTrueRule() ;
      }
      if(
        document.getElementById("process1").textContent === "modifyRuleDisabledTrueFalse"
        )
      {
        document.getElementById("allowAllChanges").value = "Allow Changes to Display Rule " /*;
        let temp = document.getElementById("saveButton") ;
        temp.value = getQuestionLevelRuleButton() + "   3" ;
        //temp.clearList.remove("hidealways")
        temp.classList.remove("hidealways") */
      }
      else if(
        document.getElementById("process1").textContent === "modifyQuestionOptions" 
        )
      {
        document.getElementById("allowAllChanges").value = `Allow Changes to Question ` ;
        
        let btemp =  document.getElementById("saveButton") ;
        btemp.value = "" /**/
      }
      else {
        //alert (`process0:${document.getElementById("process0").textContent} process1:${document.getElementById("process1").textContent}`)
      }
    
  
      document.getElementById("makeCopy").checked = false ;
      document.getElementById("questionUnansweredComplete").disabled = true ; 
      document.getElementById("questionUnansweredRequiresExplanation").disabled = true ; 
      document.getElementById("questionAnsweredRequiresExplanation").disabled = true ; 
      let theWrapper = document.getElementById("questionAuthorContent") ;
      let theList = theWrapper.getElementsByClassName("checkboxNoChange");
      for (let index = 0; index < theList.length; index++) {
        const element = theList[index];
        element.checked = true 
      }
      theList = theWrapper.getElementsByClassName("questionQuestionContent");
      for (let index = 0; index < theList.length; index++) {
        const element = theList[index];
        element.contentEditable = false 
      }
      theWrapper = document.getElementById("questionAnswerChoices") ;  
      theList = theWrapper.getElementsByClassName("rowChoice");
      for (let index = 0; index < theList.length; index++) {
        const theSelected = theList[index];
        theSelected.getElementsByClassName("checkboxNoChange")[0].checked = true ;
        doPreventChange( theSelected )
      }
    }
  }
  function doPreventChange( theSelected ) {
    console.log("function doPreventChange( theSelected ) {");
    // what to do if true
    theSelected.getElementsByClassName("questionAnswerSort")[0].disabled = true ;
    theSelected.getElementsByClassName("checkboxExplain")[0].disabled = true ;
    theSelected.getElementsByClassName("questionAnswerDescription")[0].contentEditable = false ;
    //theSelected.getElementsByClassName("questionAnswerNotesDescription")[0].contentEditable = false ;
    theSelected.getElementsByClassName("deleteBtn")[0].style.display = "none" 
  }
  function undoPreventChange( theSelected ) {
    console.log("function undoPreventChange( theSelected ) {");
    // what to do if false
    theSelected.getElementsByClassName("questionAnswerSort")[0].disabled = false;
    theSelected.getElementsByClassName("checkboxExplain")[0].disabled = false ;
    theSelected.getElementsByClassName("questionAnswerDescription")[0].contentEditable = true ;
    //theSelected.getElementsByClassName("questionAnswerNotesDescription")[0].contentEditable = true ;
    theSelected.getElementsByClassName("deleteBtn")[0].style.display = "" ;
  }
  
  function findRowChoice2(event, element) { // may no longer be needed because of event listners *** 2020-11-08 6:17
    console.log("function findRowChoice2(event, element) {");
    let theSelected = event.target ;
    let theParent = 1,  parentIsRowChoice = false ;
    while (!parentIsRowChoice && theParent !== null) {
      theParent = theSelected.parentElement ;
      parentIsRowChoice =  theParent.classList.contains("rowChoice") ;
      theSelected = theParent ; 
    }
    //["checkboxNoChange","copyBtn","deleteBtn"];
    if(element === "checkboxNoChange"){
      if(theSelected.getElementsByClassName("checkboxNoChange")[0].checked){
        // what to do if true
        doPreventChange( theSelected )
      }  else {
        // what to do if false
        undoPreventChange( theSelected )
      }
    } else if(element === "copyBtn") {
      manageCopyBTN( theSelected ) ;
      allShowGroup (true, "deleteBtn")
    } else if (element === "deleteBtn"){
        let counter = document.getElementsByClassName ("deleteBtn").length;
        if(counter < 2) {
          document.getElementsByClassName ("deleteBtn")[0].style.display = "none"
        } else {
          theSelected.remove();
          fixMissing() ;
          if(document.getElementsByClassName("deleteBtn").length === 1){
            document.getElementsByClassName("deleteBtn")[0].style.display = "none" ;
          }
        }
          let theList = document.getElementsByClassName ("questionAnswerSort");
          compareNumberInput(theList) ;
      }
  }
  function findRowChoice(event) {
    console.log("function findRowChoice(event) {");
    let theSelected = event.target ;
    let theParent = 1,  parentIsRowChoice = false ;
    while (!parentIsRowChoice && theParent !== null) {
      theParent = theSelected.parentElement ;
      parentIsRowChoice =  theParent.classList.contains("rowChoice") ;
      theSelected = theParent ; 
    }
    // sortRowValue is on blur and values are all available using pertinent className ; because, each pertinent className is only used ONCE per "rowChoice"  ***
    //let sortRowValue = theSelected.getElementsByClassName("questionAnswerSort")[0].valueAsNumber ;
    if (event.target.classList.contains("checkboxNoChange")){
      manageNoChange(theSelected)
    }
  }
  
  function compareNumberInput() {
    console.log("function compareNumberInput() {");
    let theList = document.getElementsByClassName ("questionAnswerSort");
    let outOfOrderCount = 0 ;
    let priorValue  = undefined ;
    for (let index = 0; index < theList.length; index++) {
        const element = theList[index];
        //element.style.background = "" ; // end of original, following replaces A
        let t0 = element.value;
        let t1 = t0 * 1;
        if( t0 !== t1){
          element.value = t1 //;
          //t0 = t1 
        }
        element.classList.remove("missing");
        if (outOfOrderCount === 0) {
          if (priorValue === undefined) {
            priorValue = element.value ;
            element.style.background = "" 
          } else {
            if(priorValue >= t1) {
              element.style.background = "lightBlue";
              //element.style.color = "white";
              outOfOrderCount = 1
            } else {
              priorValue = element.value ;
              element.style.background = "" 
            }
          }
        }
      }
      let theButton = document.getElementById("outofOrderBtn");
      if (outOfOrderCount === 0){
          theButton.style.display = "none"
      }
      else {
          theButton.style.display = "block"
      }
     fixMissing()
  }
  
  function sortByValueAsNumber0(){
    console.log("function sortByValueAsNumber0(){");
    let questionAnswerSortByOriginalOrder = document.getElementsByClassName(`questionAnswerSort`);
    let originalLength = questionAnswerSortByOriginalOrder.length ;
    for (let index = 0; index < originalLength - 1; index++) {
      let ivalue0 = questionAnswerSortByOriginalOrder[index].valueAsNumber;
      let ivalue1 = questionAnswerSortByOriginalOrder[index+1].valueAsNumber;
      let rowCount = document.getElementsByClassName(`rowChoice`).length ;
      if(rowCount !== originalLength){
        let temp = `ivalue0:   ${ivalue0} 
        ivalue1:  ${ivalue1}
        index where we are testing:   ${index}
        originalLength of questionAnswerSort: ${originalLength}
        length of rowChoice ${rowCount}
        ` ;
        //console.log(temp) ;
        alert (temp) ;
      }
      if(ivalue0 >  ivalue1) {
        let row0 = document.getElementsByClassName(`rowChoice`)[index];
        let row1 = document.getElementsByClassName(`rowChoice`)[index+1];
        row1.insertAdjacentElement("afterend",row0);
        questionAnswerSortByOriginalOrder = document.getElementsByClassName(`questionAnswerSort`);
        index = -1  
      }
    }
    compareNumberInput()
  }
  
  function getElementContent(element) {
    console.log("function getElementContent(element) {");
    let contentByStore = {} ;
    if(element.keyPathValue[0] === "questionStore") {
      contentByStore.content = element.questionContent
    }else if(element.keyPathValue[0] === "trueruleStore") {
      contentByStore.content = element.ruleContent
    }else if(element.keyPathValue[0] === "questionnaireStore") {
      contentByStore.content = element.questionnaireContent
    }else if(element.keyPathValue[0] === "groupruleStore") {
      contentByStore.content = element.groupruleContent
    }
    return contentByStore
  }
  
  function saveModalAnswer(a, buildSaveModalAnswer ) {
    console.log("function saveModalAnswer(a, buildSaveModalAnswer ) {");
    document.getElementById("myModal").style.display = "none" ;
    //let themodal ;
    let remainder = a ;
    let count = 0, keyPathValue = [] ;
    while (count < 2) {
      let number = remainder.indexOf("█");
      let b  = remainder.substr(number + 1 , 9999999) ;
      let element = remainder.substr(0,number) ;
      keyPathValue.push(element) ;
      keyPathValue.push(1) ; // the 1 is used for sorting and eliminates needs for 
      count++ ;
      remainder = b 
    }
    keyPathValue.push(remainder) ;
    let place = document.getElementById("modal-list") ;
    place.innerHTML = "" ;
    retrieve (keyPathValue, buildSaveModalAnswer) ;
  }
  
  function buildSaveModalAnswerUse(a) {
    console.log("function buildSaveModalAnswerUse(a) {");
    saveModalAnswer(a, "buildSaveModalAnswerUse") 
  }
  
  function buildSaveModalAnswer(a) {
    console.log("function buildSaveModalAnswer(a) {");
    saveModalAnswer(a, "buildSaveModalAnswer") 
  }
  
  function NEWgetinnerHTML(element){
    console.log("function NEWgetinnerHTML(element){");
    // ***
    return `<span class="modalAuthor"</span>Author: ${element.questionAuthor} < span class="modalPosition">Question&nbspID:&nbsp${element.questionID} </span>`
  }
  
  function upDateModalForQuestionnaireQuestion(allSavedItems , selectObject , rule) {
    console.log("function upDateModalForQuestionnaireQuestion(allSavedItems , selectObject , rule) {");
    let buttonWord; 
    let place = document.getElementById("modal-list") ;
    place.innerHTML = "" ;
    let frag = document.createDocumentFragment();
    for (let index = 0; index < allSavedItems.length; index++) {
      const element = allSavedItems[index];
      let t = element.keyPathValue[0]+'█'+element.keyPathValue[2]+'█'+element.keyPathValue[4] ;
      let row = document.createElement("div");
      row.classList.add("modal-filter-row");
      //2020-11-11 5:39
      row.dataset.store = element.keyPathValue[0];
      if(element.keyPathValue[0] === "groupruleStore") {
        rule = "groupruleStore"
      }else if(element.keyPathValue[0] === "trueruleStore"){
        rule = "trueruleStore"
      }
      row.dataset.author = element.keyPathValue[2] ;
      row.dataset.id = element.keyPathValue[4] ;
      //2020-11-11 5:39
      let elementByStore = getElementContent(element) ;
      //let content = `<br><b>AuthorCC:&nbsp</b><span class="modal-author">${element.keyPathValue[2]}</span><b>&nbsp&nbsp&nbspID:&nbsp</b><span>${element.keyPathValue[4]}</span>` ;
      let content = `<b>Author: </b><span class="modal-author">${element.keyPathValue[2]}</span><b>&nbsp ID:&nbsp</b><span class="modal-ID">${element.keyPathValue[4]}</span>` ;
      if (rule === "groupruleStore" ) {
        content = content +` &nbsp<b>Rule&nbspCollection&nbspWording:&nbsp`  ;
        buttonWord = '"Retrieve Rule Collection"' ;
        row.classList.add("groupruleWrapper")
      } else if (rule === "trueruleStore" ) {
        content = content +` &nbsp<b>Rule&nbspWording:&nbsp`  ;
        buttonWord = '"Retrieve Rule"' ;
        row.classList.add("ruleWrapper")
      } else {
        content = content +` &nbsp<b>Question&nbspWording:&nbsp`  ;
        buttonWord = '"Retrieve Question"'
      }
      //row.className = "questionWrapper rowChoice" ;
      row.classList.add("questionWrapper") ;
      row.classList.add("rowChoice")
      //2020-11-11 5:40
      //content = content + `</b> <span>${elementByStore.content}</span> `+`<input type="Button" onclick= "saveModalAnswer('` ;
      content = content + `</b> <span class="content modal-word">${elementByStore.content}</span> `+`<input type="Button" value=${buttonWord} class="modalselectquestionnairequestion">` ;
      //content = content + t ; // *** this is where inline function call is saved, is it a good idea or should it be replaced? ??? *** 2020-11-06 ***
      //content = content + `')" value="Retrieve">` ;
      row.innerHTML = content ;
      if (rule === "groupruleStore" ) {
        row.classList.add("groupruleWrapper")
      } else if (rule === "trueruleStore" ) {
        row.classList.add("ruleWrapper")
      } 
      //place.appendChild(row) ;
      frag.appendChild(row) ;
      t = 0 ;
    } ;
    place.appendChild(frag)
  }
  
  function upDateModal(allSavedItems , selectObject, workingQuestionnaire) {
    console.log("function upDateModal(allSavedItems , selectObject, workingQuestionnaire) {");
    console.log("workingQuestionnaire 2799") ;
    console.log(workingQuestionnaire) ;
    console.log(workingQuestionnaire) ;
    let place = document.getElementById("modal-list") ;
    place.innerHTML = "" ;
    let frag = document.createDocumentFragment();
    for (let index = 0; index < allSavedItems.length; index++) {
      const element = allSavedItems[index]; // 0 is  type ( questionStore, ruleStore, etc,)  2 is author ; 4 is id, these three items are enough to uniquely identify the parts of a unique record. 
      let t = element.keyPathValue[0]+'█'+element.keyPathValue[2]+'█'+element.keyPathValue[4] ;
      let row = document.createElement("div");
      row.className = "modal-filter-row";
      let elementByStore = getElementContent(element) ;
      //let content = `<br><b>Author: </b><span class="modal-author">${element.keyPathValue[2]}</span><b>&nbsp ID:&nbsp</b>&nbsp<span class="modal-ID">${element.keyPathValue[4]}</span>&nbsp` ;
      let content = `<b>Author:&nbsp</b><span class="modal-author">${element.keyPathValue[2]}</span><b>&nbsp ID:&nbsp</b><span class="modal-ID">${element.keyPathValue[4]}</span>&nbsp`
      if (element.keyPathValue[0] === "questionStore") {
        content = content +`<b>Formattable Question Wording:` ;
        //row.className = "questionWrapper" 
        row.classList.add("questionWrapper")
      } else if(element.keyPathValue[0] === "trueruleStore") {
        content = content +`<b>Display Rule:` ;
        //row.className = "ruleWrapper" 
        row.classList.add("ruleWrapper")
      } else if(element.keyPathValue[0] === "groupruleStore") {
        content = content +`<b>Display Rule Collection:` ;
        //row.className = "groupruleWrapper"
        row.classList.add("groupruleWrapper") 
      }  else if(element.keyPathValue[0] === "questionnaireStore") {
        content = content +`<b>Questionnaire Title:` ;
        row.classList.add("questionnaireWrapper") ; 
        row.classList.add("questionnaireSelectModal")
      }
      if(workingQuestionnaire === "buildSelectQuestionnaire") {
        content = content + `</b> <span class="modal-word">${elementByStore.content}</span> `+`<input type="Button" onclick= "buildSaveModalAnswer('` ;   
      } else if(workingQuestionnaire === "useQuestionnaire") {
        content = content + `</b> <span class="modal-word">${elementByStore.content}</span> `+`<input type="Button" onclick= "buildSaveModalAnswerUse('` ;   
      } else {
        content = content + `</b> <span class="modal-word">${elementByStore.content}</span> `+`<input type="Button" onclick= "saveModalAnswer('` ;
      }
      content = content + t ; // *** this is where inline function call is saved, is it a good idea or should it be replaced? ??? *** 2020-11-06 ***
      content = content + `')" value="Retrieve">` ;
      row.innerHTML = content ;
      //place.appendChild(row) ;
      frag.appendChild(row) ;
      t = 0 ;
    } ;
    place.appendChild(frag)
  }
  
  function getNewRuleList(newRule , store2, newRuleList ) {
    console.log("function getNewRuleList(newRule , store2, newRuleList ) {  2023-03-09 17:11");
    let subGroupList = [] ;
    let theGroupListLength = newRule.theRule.allArrayAuthor.length ;
    for (let index = 0; index < theGroupListLength; index++) {
      const subKeyPathValue = 
        ["customer",1,"SCENARIO",1,newRule.theRule.allArrayType[index],1,newRule.theRule.allArrayAuthor[index],1,newRule.theRule.allArrayID[index]];
      newRuleList.push(subKeyPathValue)
    }
    return newRuleList
  }
  
  function setupAnchors () {
    console.log("function setupAnchors () { ***   likely not needed. ");
    if( 1 === 2) {
      let multiEntryanchor = {} ;
      let databaseOpenRequest = indexedDB.open("authorExcuTrust") ;
      let questionnaire = "every nth"
      let testMultiEntryList = [
        ["Aquestion", "AdisplayRule"],
        ["", "AdisplayRule"],
        ["Aquestion","" ],
        ["Aquestion","" ],
        ["Aquestion", "AdisplayRule"],
        ["Aquestion", "AdisplayRule"],
        ["Aquestion", "AdisplayRule"],
        ["", "AdisplayRule"],
        ["Aquestion","" ],
        ["Aquestion","" ],
        ["Aquestion", "AdisplayRule"],
        ["Aquestion", "AdisplayRule"]
      ]
      let questionDestinationList = [];
      for (let index = 0; index < testMultiEntryList.length; index++) {
        const element = testMultiEntryList[index];
        //questionDestinationList.push(index) ;
        //questionDestinationList.push([index,element]) ;
        //questionDestinationList.push([index,element[0]]) ;
        //questionDestinationList.push([index,element[1]]) ;
        questionDestinationList.push(["test1",index,element[0],element[1]]) ;
      }
  
      let objectSaved = {} ;
      objectSaved.keyPathValue = questionnaire ;
      objectSaved.questionDestination = questionDestinationList ;
      databaseOpenRequest.onsuccess = () => {
        db = databaseOpenRequest.result ;
        const tx3 = db.transaction("answerStore", "readwrite");
        const store3 = tx3.objectStore("answerStore");
        //store3.put(objectSaved) ;
      
        multiEntryanchor.keyPathValue = [0,"trueruleStore"] ;
        //store3.put(multiEntryanchor) ;
        multiEntryanchor.keyPathValue =  [0,"groupruleStore"] ;
        //store3.put(multiEntryanchor) ;
        let skipNotSkip = 0  ;
        for (let index = 0; index < questionDestinationList.length; index++) {
          if (skipNotSkip < 2){
            const element = questionDestinationList[index];
            let objectSaved = {} ;
            objectSaved.keyPathValue = element ;
            //objectSaved.questionDestination = [[questionnaire,index],["2nd Questionnaire", index+100]] ;
            objectSaved.questionDestination = [[questionnaire,index]] ;
            //console.log(objectSaved) ;
            store3.put(objectSaved) ;
            skipNotSkip++
          } else {
            skipNotSkip = 0
          }
        } 
        db.close()
      }
    }
  }
  
  function saveRuleAnswerStore20210105 (db , newRule) {
    console.log("function saveRuleAnswerStore20210105 (db , newRule) {");
    const tx3 = db.transaction("answerStore", "readwrite");
    const store3 = tx3.objectStore("answerStore");
   console.log ("newRule ***   to see if it has all the info needed?   ??   ***   1 of 2") ;
    store3.put(JSON.parse(JSON.stringify(newRule))) ;
    //console.log (JSON.parse(JSON.stringify(newRule))) ;
    //console.log ("newRule ***   to see if it has all the info needed?   ??   *** 2 of 2") ;
    tx3.oncomplete = function () {
      //console.log("store3.put(newRule) ; *** *** ") ;
      processNewTrueRules () ; // *** 2021-01-12 needed for browse filter, do not remove
      newRule.questionDestination = JSON.stringify(newRule.questionDestination) ;
      newRule.trueFalseValues = JSON.stringify(newRule.trueFalseValues) ;
      batchFireStoreAnswer([newRule]) // this could perhaps wait until the nexphase is complete, but for now good to do for testing purposes.  *** 2021-01-05 15:21
    }
  }
  
  
  function makeUndefinedList (newRuleList) {
    console.log("function makeUndefinedList (newRuleList) {");
    //prevent holey array problem, consider cln method for deep copy, cloneNode(true)???
    let trueFalseValueList = [] ;
    for (let index = 0; index < newRuleList.length; index++) {
      trueFalseValueList.push (undefined)   
    }
    return trueFalseValueList
  }
  
  
  
  
  
  function checkDisplayRuleAnswerStore (theRowObject) {
    console.log("function checkDisplayRuleAnswerStore (theRowObject) {");
    let  theCopy, ruleKeyPathValue , newRule ;
    theCopy = JSON.stringify(theRowObject) ;
    theCopy = JSON.parse(theCopy) ;
    ruleKeyPathValue = ["customer",1,"SCENARIO",1,theCopy.questionnaireRowRule.keyPathValue[0],1,theCopy.questionnaireRowRule.keyPathValue[2],1,theCopy.questionnaireRowRule.keyPathValue[4]];
    const request = indexedDB.open("authorExcuTrust");
    if( 1 === 1)  {
      request.onsuccess = function() {
        db = request.result;
        const tx1 = db.transaction("answerStore", "readonly");
        const store1 = tx1.objectStore("answerStore");
        let stored = store1.get(ruleKeyPathValue) ;
        tx1.oncomplete = function () {
         // if(stored.result  === undefined || stored.result  !== undefined) {
            if(stored.result  === undefined ) {
            const tx2 = db.transaction("answerStore", "readonly");
            const store2 = tx2.objectStore("answerStore");
            newRule = {} ;
            newRule.keyPathValue = ruleKeyPathValue ;
            newRule.theRule = JSON.parse(JSON.stringify(theRowObject.questionnaireRowRule)) ;
            newRuleList = [] ;
            if(newRule.keyPathValue[4] === "groupruleStore") {
              //newRuleList = [[0,"groupruleStore"]] ;
              newRuleList = getNewRuleList(newRule , store2, newRuleList ) ;
              newRule.all0Any1True = JSON.parse(JSON.stringify(newRule.theRule.all0Any1True)) ;
              newRule.finished = "NO - just testing grouprule"
            } else {
              //newRuleList = [[0,"trueruleStore"]] ;
              let temp = JSON.parse(JSON.stringify(theRowObject.questionnaireRowRule.questionSource)) ;
              temp.unshift("customer",1,"SCENARIO") ;
              newRule.finished = "NO - just testing truerule" ;
              newRuleList.push(temp)
            }
            //newRule.trueFalseValues = [] ;
            //newRule.trueFalseValues.length = newRuleList.length -1 ;
            newRule.trueFalseValues = makeUndefinedList (newRuleList)
            console.log( ` Not sure which part of software this is in, try to make a new rule first
            
            was:
            //newRule.trueFalseValues = [] ;
            //newRule.trueFalseValues.length = newRuleList.length -1 ;
              resulting in: ${[]}
  
  
            now:
            newRule.trueFalseValues = makeUndefinedList (newRuleList)
              resultingin : ${newRule.trueFalseValues}
            `) ;
            console.log(newRule.trueFalseValues) ;
            
            newRule.theRule = JSON.parse(JSON.stringify(theRowObject.questionnaireRowRule)) ;
            newRule.questionDestination = JSON.parse(JSON.stringify(newRuleList)) ;
            saveRuleAnswerStore20210105 (db , newRule)
          }
        }
      }
    }
  }
  
  function makeInfoButton() {// not working 2021-02-23-04-21, unknown why not ***
    console.log("function makeInfoButton() { *** likely not needed");
    let infoButton = document.createElement("button") ;
    infoButton.classList.add(indexedDBRowRecord.keyPathValue[5]);
    infoButton.classList.add("info_circle");
    infoButton.classList.add("endline");
    infoButton.id = indexedDBRowRecord.keyPathValue[5]+"info_circle";
    infoButton.innerHTML = "&#128712;" ;  
    return infoButton
  }
  
  
  function saverowDisplayRuleType (row , theRowObject) {
    console.log("function saverowDisplayRuleType (row , theRowObject) {");
    let temp0 , temp1 ;
    temp0 = theRowObject.questionnaireRowRule ;
    if (temp0 === undefined) {
      return row  
    } else {
      temp1 = theRowObject.questionnaireRowRule.keyPathValue ;
      if (temp1 === undefined  ) {
        return row  
      } else {
        row.dataset.displayruletype = temp1[0] ;
        row.dataset.displayruleauthor = temp1[2];
        row.dataset.displayruleid = temp1[4] ;
        checkDisplayRuleAnswerStore (theRowObject) ;
        return row
      }
    } 
  }
  
  function addMissingDot (indexedDBRowRecord) {
    console.log("function addMissingDot (indexedDBRowRecord) {");
    if(indexedDBRowRecord.questionnaireRowQuestionAuthor === undefined) {
      return  ""
    }
    let number = indexedDBRowRecord.questionAnswerSort
    number = number + "" ;
    if(number.includes(".")) {
    } else {
      number = number + "." 
    }
    return number
  }
  
  
  function makeRowIdAndSetQuestionNumber (questionnaireRowFragment, indexedDBRowRecord)  {
    console.log("function makeRowIdAndSetQuestionNumber (questionnaireRowFragment,indexedDBRowRecord)  {");
    let row = document.createElement("div");
    row.classList.add("sidebar") ;
    row.classList.add(indexedDBRowRecord.keyPathValue[5]);
    row.id = indexedDBRowRecord.keyPathValue[5];
    //if(indexedDBRowRecord.questionnairerowquestionauthor !== undefined) {
      //row.id = indexedDBRowRecord.keyPathValue[5];
      row.innerText = addMissingDot (indexedDBRowRecord) ;
    //}  
    questionnaireRowFragment.appendChild(row) ;
    return questionnaireRowFragment
  }
  
  function makeQuestionContentDiv(indexedDBRowRecord , preFixToId) {
    console.log("function makeQuestionContentDiv(indexedDBRowRecord , preFixToId) {");
    let questionDiv = document.createElement("div") ;
    questionDiv.innerHTML = indexedDBRowRecord.questionnaireRowQuestion.questionContent ;
    questionDiv.className = "content" ;
    questionDiv.classList.add(preFixToId);
    questionDiv.id = preFixToId + "content";
    return questionDiv
  }
  
  
  async function getExistingIndexedDBAnswerDetails (indexedDBRowRecord) {
    console.log("async function getExistingIndexedDBAnswerDetails (indexedDBRowRecord) {");
    let existingIndexedDBAnswerKeyPathValue = ["customer",1,"SCENARIO",1,indexedDBRowRecord.questionnaireRowQuestionAuthor,1,indexedDBRowRecord.questionnaireRowQuestionID];
    console.log("existingIndexedDBAnswerKeyPathValue - 2021-03-01-06-15 v1") ;
    console.log(existingIndexedDBAnswerKeyPathValue) ;
    let existingIndexedDBAnswerDetails = await getDataAnswerByKeyPathValueV2(existingIndexedDBAnswerKeyPathValue) ;
    console.log(existingIndexedDBAnswerDetails) ;
    return existingIndexedDBAnswerDetails
  }
  
  function addExistingExplanation(explanationElement, awaitExistingAnswerDetails) {
    console.log("function addExistingExplanation(explanationElement, awaitExistingAnswerDetails) {");
    if( awaitExistingAnswerDetails === undefined) {
    } else {
      if(awaitExistingAnswerDetails.explanation === undefined) {
      } else {
        explanationElement.innerHTML = awaitExistingAnswerDetails.explanation
      }
    }
    return explanationElement
  }
  
  function makeExplanationElement(awaitExistingAnswerDetails , indexedDBRowRecord ) {
    console.log("function makeExplanationElement(awaitExistingAnswerDetails , indexedDBRowRecord ) {");
    let explanationElement = document.createElement("p") ;
    explanationElement.className = "p explanation" ;
    explanationElement.id = indexedDBRowRecord.keyPathValue[5]+"explanation";
    explanationElement.classList.add(indexedDBRowRecord.keyPathValue[5]);
    explanationElement.contentEditable = true ;
    explanationElement.dataset.author =  indexedDBRowRecord.questionnaireRowQuestionAuthor;
    explanationElement.dataset.id =  indexedDBRowRecord.questionnaireRowQuestionID;
    explanationElement = addExistingExplanation(explanationElement, awaitExistingAnswerDetails)
    return explanationElement
  }
  
  function addQuestionContentWordingAndExplanation(indexedDBRowRecord , awaitExistingAnswerDetails , preFixToId) {
    console.log("function addQuestionContentWordingAndExplanation(indexedDBRowRecord , awaitExistingAnswerDetails , preFixToId) {");
    let questionContentDiv = makeQuestionContentDiv(indexedDBRowRecord , preFixToId);
    if(awaitExistingAnswerDetails === "blank line"){
      alert(`blank line  
      JSON.stringify(questionContentDiv)
      ${JSON.stringify(questionContentDiv)}    
      `)
    }
    let infoButton = document.createElement("button") ;
    infoButton.classList.add("endline") ;
    infoButton.classList.add("info_circle");
    infoButton.classList.add(indexedDBRowRecord.keyPathValue[5]);
    infoButton.id = indexedDBRowRecord.keyPathValue[5]+"info_circle";
    infoButton.innerHTML = "&#128712;" ;
    //questionnaireRowFragment.appendChild(infoButton)
    //let infoButton = makeInfoButton() ;
    let linebreakElement = document.createElement("br") ;
    //questionContentDiv.appendChild(linebreakElement) ;
    questionContentDiv.appendChild(infoButton) ;
    //questionContentDiv.appendChild(linebreakElement) ;
    console.log(questionContentDiv) ;
    let explanationElement =  makeExplanationElement(awaitExistingAnswerDetails , indexedDBRowRecord );
    console.log(explanationElement) ;
    //questionContentDiv.appendChild(linebreakElement) ;
    questionContentDiv.appendChild(explanationElement);
    console.log(questionContentDiv) ;
    /*
    let infoButton = document.createElement("button") ;
    infoButton.classList.add("endline") ;
    infoButton.innerHTML = "&#128712;" ;
    //questionnaireRowFragment.appendChild(infoButton)
    //let infoButton = makeInfoButton() ;
    questionContentDiv.appendChild(infoButton) ;
    */
    return questionContentDiv
  }
  
  
  function makeQuestionWordingAndExplanation (indexedDBRowRecord , awaitExistingAnswerDetails, preFixToId) {
    console.log("function makeQuestionWordingAndExplanation (indexedDBRowRecord , awaitExistingAnswerDetails, preFixToId) {");
    if( indexedDBRowRecord === undefined) {
      return undefined
    };
    if( indexedDBRowRecord.questionnaireRowQuestion === undefined) {
      return undefined
    }
    if( indexedDBRowRecord.questionnaireRowQuestion.questionContentInnerText === undefined){
      return undefined
    }
    if( indexedDBRowRecord.questionnaireRowQuestion.questionContentInnerText.trim() === "") {
      return undefined
    }
  //  let questionContentWordingAndExplanation = addQuestionContentWordingAndExplanation(indexedDBRowRecord , awaitExistingAnswerDetails) ;
  //  return questionContentWordingAndExplanation
  return addQuestionContentWordingAndExplanation(indexedDBRowRecord , awaitExistingAnswerDetails , preFixToId)
  }
  
  
  
  function makeInfoButton (frag, indexedDBRowRecord) {
    console.log("function makeInfoButton (frag, indexedDBRowRecord) { *** may not be used!");
    return frag
  }
  
  /*
  if()
    makeExplanationElement(indexedDBRowRecord) ; 
    questionDiv.insertAdjacentElement("beforeend",questionExplanation) ;
    questionnaireRowFragment.appendChild(questionDiv) ;
    return questionnaireRowFragment
  }
  */
  
  function makeToggleButton(indexedDBRowRecord) {
    console.log("function makeToggleButton(indexedDBRowRecord) {");
    let toggleButton = document.createElement("button") ;
    toggleButton.className = "endline user_answer_choice_toggle";
    toggleButton.classList.add(indexedDBRowRecord.keyPathValue[5]);
    toggleButton.id = indexedDBRowRecord.keyPathValue[5]+"user_answer_choice_toggle";
    toggleButton.innerHTML = "&#9776;"; 
    return toggleButton
  }
  
  function getAnswerElement(indexedDBRowRecord , awaitExistingAnswerDetails) {
    console.log("function getAnswerElement(indexedDBRowRecord , awaitExistingAnswerDetails) {");
    let answerElement;
    answerElement = document.createElement("div");
    answerElement.className = "answer" ;
    answerElement.classList.add(indexedDBRowRecord.keyPathValue[5]);
    answerElement.id = indexedDBRowRecord.keyPathValue[5]+"answer";
    //answertemp = "User choice" ;
    let firstbutton = document.createElement("button") ;
    firstbutton.className = "beginline user_answer_choice_list" ;
    firstbutton.innerHTML = ">" ; 
    firstbutton.classList.add(indexedDBRowRecord.keyPathValue[5]);
    firstbutton.id = indexedDBRowRecord.keyPathValue[5]+"user_answer_choice_list";
    answerElement.appendChild(firstbutton) ;
    let the_answer_text = document.createElement("span") ;
    //the_answer_text.innerHTML = '&nbsp;'+"User choice 3";
    the_answer_text.innerHTML = "";
    the_answer_text.classList.add("the_answer_text") ;
    the_answer_text.classList.add(indexedDBRowRecord.keyPathValue[5]);
    the_answer_text.id = indexedDBRowRecord.keyPathValue[5]+"the_answer_text";
    the_answer_text.dataset.answer_choice = -1 ;
    if(awaitExistingAnswerDetails !== undefined) {
      if(awaitExistingAnswerDetails.answer !== undefined){
        let theArray = awaitExistingAnswerDetails.questionnaireRowQuestion.questionAnswerDescription ;
        let theArrayLength = theArray.length ;
        for (let index = 0; index < theArrayLength; index++) {
          const element = theArray[index]; 
          if(element === awaitExistingAnswerDetails.answer ) {
            the_answer_text.innerHTML = awaitExistingAnswerDetails.answer ;
            the_answer_text.dataset.answer_choice = index ;
            index = theArrayLength
          }
        }
      }
    }
    if(indexedDBRowRecord !== undefined) {
      if(indexedDBRowRecord.questionnaireRowQuestion !== undefined) {
        if(indexedDBRowRecord.questionnaireRowQuestionAuthor !== undefined){
          the_answer_text.dataset.author = indexedDBRowRecord.questionnaireRowQuestionAuthor
        }
        if(indexedDBRowRecord.questionnaireRowQuestionID !== undefined){
          the_answer_text.dataset.id = indexedDBRowRecord.questionnaireRowQuestionID;
        }
        console.log("indexedDBRowRecord.questionnaireRowQuestion.questionAnswerDescription - should this be saved to thechoicehtmllist ???") ;
        if(indexedDBRowRecord.questionnaireRowQuestion.questionAnswerDescription !== undefined){
          the_answer_text.dataset.thechoicehtmllist = JSON.stringify(indexedDBRowRecord.questionnaireRowQuestion.questionAnswerDescription)
        }
      }
    }
    answerElement.appendChild(the_answer_text) ;
    answerElement.appendChild(makeToggleButton(indexedDBRowRecord)) ;
    return answerElement
  }
  
  
  function makeAttachButton(indexedDBRowRecord) {
    console.log("function makeAttachButton(indexedDBRowRecord) {");
    let attachButton = document.createElement("div");
    attachButton.classList.add("attach") ;
    attachButton.classList.add(indexedDBRowRecord.keyPathValue[5]);
    attachButton.id = indexedDBRowRecord.keyPathValue[5]+"attach";
    attachButton.innerHTML = `<button id="${indexedDBRowRecord.keyPathValue[5]+"attached_file_button1"}  class="beginline ${indexedDBRowRecord.keyPathValue[5]+" attached_file_button1"}">+</button>`+"attached file"+`<button  <button id="${indexedDBRowRecord.keyPathValue[5]+"attached_file_button2"}  class="endline ${indexedDBRowRecord.keyPathValue[5]+" attached_file_button2"}">&#128206;</button>`;
    return attachButton
  }
  
  function makeSignOff(indexedDBRowRecord) {
    console.log("function makeSignOff(indexedDBRowRecord) {");
    let signOff = document.createElement("div");
    signOff.classList.add("sign") ;
    signOff.classList.add(indexedDBRowRecord.keyPathValue[5]);
    signOff.id = indexedDBRowRecord.keyPathValue[5]+"sign";
    signOff.innerHTML = `${"AD"}
    ${"JSM"} ${"YK"}`+`<button id="${indexedDBRowRecord.keyPathValue[5]+"sign_button1"}" class="endline ${indexedDBRowRecord.keyPathValue[5]+" sign_button1"}">&#9776;</button>`;
    return signOff
  }
  
  async function getDetailAnswer(ruleRecord) {
    console.log("async function getDetailAnswer(ruleRecord) {");
    let answerContent, answerIndexedDbRecord;
    let answerKeyPathValue = ["customer",1,"scenario",1,ruleRecord.keyPathValue[0],1,ruleRecord.keyPathValue[2],1,ruleRecord.keyPathValue[4]];
    answerIndexedDbRecord = await getOneRecordByKeyPathValue(answerKeyPathValue);
    console.log("answerKeyPathValue");
    console.log(answerKeyPathValue);
    if(!answerIndexedDbRecord) {
      return answerContent
    }
    console.log("answerIndexedDbRecord");
    console.log(answerIndexedDbRecord);
    console.log("answerContent");
    console.log(answerContent);
    return answerContent
  }
  
  function makeContent (questionnaireRowId, questionnaireRowDetails,questionRecord) {
    console.log("function makeContent (questionnaireRowId, questionnaireRowDetails,questionRecord) {");
    console.log("questionRecord from makeContent()");
    console.log(questionnaireRowDetails);
    console.log(questionRecord);
    if(!questionRecord.questionContent) {
      return null
    }
    /*
    if(!questionnaireRowDetails) {
      return null
    }
    if(!questionnaireRowDetails) {
      return null
    }
    */
    let content = document.createElement("div");
    content.classList.add("content") ;
    content.classList.add(questionnaireRowId) ;
    //content.innerHTML = questionnaireRowDetails.rowNumber+"***  get the real content soon! ***";
    content.innerHTML = questionRecord.questionContent;
    let infoButton = document.createElement("button") ;
    infoButton.classList.add("endline") ;
    infoButton.classList.add("info_circle");
    infoButton.classList.add(questionnaireRowId);
    infoButton.innerHTML = "&#128712;" ;
    content.appendChild(infoButton) ;
    let explanation = document.createElement("p");
    explanation.classList.add("p");
    explanation.classList.add("explanation");
    explanation.classList.add(questionnaireRowId);
    explanation.contentEditable = true ;
    content.appendChild(explanation) ;
    return content
  }
  
  
  function makeSideBar(questionnaireRowId, questionnaireRowDetails){
    console.log("function makeSideBar(questionnaireRowId, questionnaireRowDetails){");
    let sideBar = document.createElement("div");
    sideBar.classList.add("sidebar") ;
    sideBar.classList.add(questionnaireRowId) ;
    sideBar.id = questionnaireRowId;
    sideBar.innerHTML = questionnaireRowDetails.rowNumber;
    return sideBar
  }
  
  
  
  
  async function makeAllDetailsQuestionnaireRow (questionnaireRowId,indexedDbRecord, offset) {
    console.log("async function makeAllDetailsQuestionnaireRow (questionnaireRowId,indexedDbRecord, offset) {");
    console.log("offset");
    console.log(offset);
    let questionRecord, ruleRecord, answerContent;
    let displayRow = false;
    let questionnaireRowDetails = await  indexedDbRecord.questionnaireRowDivDetails[questionnaireRowId];
    /*
    console.log("questionnaireRowDetails.rowNumber") ;
    console.log(questionnaireRowDetails.rowNumber) ;
    console.log(questionnaireRowDetails) ;
    */
    if(questionnaireRowDetails.ruleArray) {
      ruleRecord = await getOneRecordByKeyPathValue(questionnaireRowDetails.ruleArray);
      //console.log(ruleRecord) ;
      answerContent = await getDetailAnswer(ruleRecord)
    } else {
      displayRow = true
    }
    if(!displayRow) {
      if(!answerContent) {
        console.log(`*** 
        Ignore row, displayRow false and no existing answer.  Later we can add if statement to test where content exist, display may be hidden.  This is a second rule, which over-rides default.  
        
        Default shows rows where either an explanation is present or an answer is present.  
        ***`);
        return null //"display details to be null and hence ignored"
      }
    }
    let rowDisplayWrapper = document.createElement("div");
    
    rowDisplayWrapper.appendChild(makeSideBar(questionnaireRowId, questionnaireRowDetails));
    console.log("questionRecord");
    console.log(questionRecord);
    if(questionnaireRowDetails.questionArray) {
      questionRecord = await getOneRecordByKeyPathValue(questionnaireRowDetails.questionArray);
      console.log("*** *** questionRecord  from makeAllDetailsQuestionnaireRow (questionnaireRowId,indexedDbRecord, offset) *** ***") ; 
     console.log(questionRecord) ;
   }
    if(questionRecord) {
      let content = makeContent (questionnaireRowId, questionnaireRowDetails,questionRecord);
      if(content) {
        rowDisplayWrapper.appendChild(content)
      }
    }
    
  
    console.log("questionnaireRowDetails.rowNumber") ;
    console.log(questionnaireRowDetails.rowNumber) ;
    console.log(questionnaireRowDetails) ;
    console.log("answerContent");
    console.log(answerContent);
    console.log("displayRow");
    console.log(displayRow);
    console.log("ruleRecord");
    console.log(ruleRecord);
    /*
    if(questionnaireRowDetails.questionArray) {
       questionRecord = await getOneRecordByKeyPathValue(questionnaireRowDetails.questionArray);
       console.log("*** *** questionRecord  from makeAllDetailsQuestionnaireRow (questionnaireRowId,indexedDbRecord, offset) *** ***") ; 
      console.log(questionRecord) ;
    }
    */
    return rowDisplayWrapper.innerHTML //"display details to be built"
  }
  
  
  
  async function buildQuestionnaireFromAllDetails() {
    console.log("async function buildQuestionnaireFromAllDetails() {");
    let questionnaireKeyValuePath = ["questionnaireStore",1,"JSM-2021-02-06-39",1,"JSM-2021-02-06-39","allDetails"];
    //console.log( questionnaireKeyValuePath);
    let indexedDbRecord = await getOneRecordByKeyPathValue(questionnaireKeyValuePath);
    let offset = 0;
    for (let questionnaireRowId of indexedDbRecord.questionnaireRowIdListV3) {
       let displayDetails = await makeAllDetailsQuestionnaireRow (questionnaireRowId,indexedDbRecord,offset);
       if(displayDetails){
          console.log("*** displayDetails ***");
          console.log(displayDetails);
         document.getElementById("questionAnswerChoices").insertAdjacentHTML('beforeend',displayDetails)
       }  else {
         console.log( ` ***
  
          Nothing to display. 
  
         ***`)
       }
      ++offset
    }
    /*
    console.log( "indexedDbRecord  from buildQuestionnaireFromAllDetails()");
    console.log( indexedDbRecord)
    */
  }
  
  
  
  async function getQuestionnaireRow (indexedDBRowRecord ,rowNumber) {
    console.log("async function getQuestionnaireRow (indexedDBRowRecord ,rowNumber) {");
      /*
      Questionnaires have many rows which are added the DOM on loading because they are always relevant. Questionnaires also have many rows which are NOT added to DOM until they are relevant. Each row is initially built in a document fragment called "questionnaireRowFragment".
  
     Each "questionnaireRowFragment" is made up of many elements.  Elements are created and both attributes and properties are set before adding the element to the fragment.  At the end of the process the "questionnaireRowFragment" is added to the DOM.  It may be advisable to setup a process to test relevance before running this the "async function getQuestionnaireRow (indexedDBRowRecord ,rowNumber)". 
     
     If there are any child elements of an element:    
      a) all child elements and their attributes and their properties are added to the element first; then
      b) the element is added to the "questionnaireRowFragment".
    */
    let questionnaireRowFragment = document.createDocumentFragment() ; 
    console.log(`makeRowIdAndSetQuestionNumber (questionnaireRowFragment, indexedDBRowRecord)  3342 only indexedDBRecord ______________________________________________________________________________________________________________`);
    console.log(indexedDBRowRecord);
    questionnaireRowFragment = makeRowIdAndSetQuestionNumber (questionnaireRowFragment, indexedDBRowRecord) ;
    let existingAnswerKeyPathValue = existingIndexedDBAnswerKeyPathValue = ["customer",1,"SCENARIO",1,indexedDBRowRecord.questionnaireRowQuestionAuthor,1,indexedDBRowRecord.questionnaireRowQuestionID];
    let preFixToId = indexedDBRowRecord.keyPathValue[5];
    console.log(" *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** existingIndexedDBAnswerKeyPathValue - 2021-03-01-06-15 v2  *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** ***  *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** ***  *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** ***  *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** ") ;
    console.log(existingAnswerKeyPathValue) ;
    let questionWordingAndExplanation ;
    let awaitExistingAnswerDetails = await getDataAnswerByKeyPathValueV2(existingAnswerKeyPathValue) ;
    if(awaitExistingAnswerDetails === "blank line"){
      //alert(`blank line  
      //getQuestionnaireRow - 1.A  `); 
    } else {
      questionWordingAndExplanation =  makeQuestionWordingAndExplanation (indexedDBRowRecord , awaitExistingAnswerDetails , preFixToId)
    }
    
    if(questionWordingAndExplanation  !== undefined){
      questionnaireRowFragment.appendChild(questionWordingAndExplanation)
    }
    if(awaitExistingAnswerDetails === "blank line"){
      //alert(`blank line  
      //getQuestionnaireRow - 1.B  `); 
      console.log("______________________ questionnaireRowFragment ___________________________");
      console.log(questionnaireRowFragment)
    } else {
      questionnaireRowFragment.appendChild(getAnswerElement(indexedDBRowRecord , awaitExistingAnswerDetails)) ;
      questionnaireRowFragment.appendChild(makeAttachButton(indexedDBRowRecord)) ;
      questionnaireRowFragment.appendChild(makeSignOff(indexedDBRowRecord)) ;    
    }
    document.getElementById("questionAnswerChoices").appendChild(questionnaireRowFragment) ;
    document.getElementById("questionAnswerChoices").classList.add("grid1")
    // If performance becomes an issue, it may be advisable to return the "questionnaireRowFragment" to another function which will then collect all the fragments in another collection of documentFragements and add all the rows at once, this is not done yet because, later, when a row becomes relevant, we will want to just add the newly relevant row.  Another option is to always add all the always shown rows first then process the conditionally shown rows. 
  }
  /*
    else {
  
    row = saverowDisplayRuleType (row , theRowObject) ; 
    row.dataset.checkboxexplain = JSON.stringify(theRowObject.questionnaireRowQuestion.checkboxExplain) ; //A
    row.dataset.questionansweredrequiresexplanation = JSON.stringify(theRowObject.questionnaireRowQuestion.questionAnsweredRequiresExplanation) ; //C
    row.dataset.questionunansweredcomplete = JSON.stringify(theRowObject.questionnaireRowQuestion.questionUnansweredComplete) ; //D ?
    row.dataset.questionunansweredrequiresexplanation = JSON.stringify(theRowObject.questionnaireRowQuestion.questionUnansweredRequiresExplanation) ; //E ?
    /** above duplicated below, may not be needed.  */
    /*
    }
  }
  */
  
  
  function getQuestionRowToUse (theRowObject , theAnswerObject , frag , db , buildSaveModalAnswer , element, index, rowLength) {
    console.log("function getQuestionRowToUse (theRowObject , theAnswerObject , frag , db , buildSaveModalAnswer , element, index, rowLength) {");
    console.log("theRowObject");console.log(theRowObject);console.log("theAnswerObject");console.log(theAnswerObject);console.log("frag");console.log(frag);console.log("db");console.log(db);console.log("buildSaveModalAnswer");console.log(buildSaveModalAnswer);console.log("element");console.log(element);console.log("index");console.log(index);
    // to be built 
    //alert( `show this for ${buildSaveModalAnswer} 2747`) ;
    let row = document.createElement("div");
    row.classList.add("sidebar") ;
    row.dataset.rowcode = element ; // *** possibly needed for faster processing later ***
    let tempIndex = index+1 ;
    row.id = "qrow"+tempIndex ;
    row = saverowDisplayRuleType (row , theRowObject) ; 
    row.dataset.checkboxexplain = JSON.stringify(theRowObject.questionnaireRowQuestion.checkboxExplain) ; //A
    row.dataset.questionansweredrequiresexplanation = JSON.stringify(theRowObject.questionnaireRowQuestion.questionAnsweredRequiresExplanation) ; //C
    row.dataset.questionunansweredcomplete = JSON.stringify(theRowObject.questionnaireRowQuestion.questionUnansweredComplete) ; //D ?
    row.dataset.questionunansweredrequiresexplanation = JSON.stringify(theRowObject.questionnaireRowQuestion.questionUnansweredRequiresExplanation) ; //E ?
    /** above duplicated below, may not be needed.  */
    
    if(theRowObject.questionnaireRowQuestion === undefined ){
      frag.appendChild(row)
    } else 
    {
      row.innerHTML = tempIndex ;
      frag.appendChild(row) ;
      row = document.createElement("div");
      row.classList.add("content") ;
      if(theRowObject.questionnaireRowQuestion !== undefined ) {
        row.innerHTML = theRowObject.questionnaireRowQuestion.questionContent;
        let temp = document.createElement("button") ;
        temp.classList.add("endline") ;
        temp.classList.add(indexedDBRowRecord.keyPathValue[5]);
        temp.id = indexedDBRowRecord.keyPathValue[5]+"endline";
        temp.innerHTML = "&#128712;" ;
        row.appendChild(temp) ;
        let innerP = document.createElement("p") ;
        if(theAnswerObject !== undefined) {
          if(theAnswerObject.ContentHTML !== undefined) {
            innerP.innerHTML = theAnswerObject.ContentHTML ;
          }
        }
        innerP.className = "p" ;
        innerP.classList.add("explanation") ;
        innerP.classList.add(indexedDBRowRecord.keyPathValue[5]);
        innerP.id = indexedDBRowRecord.keyPathValue[5]+"explanation";
        innerP.contentEditable = true ;
        innerP.dataset.author = theRowObject.questionnaireRowQuestionAuthor ;
        innerP.dataset.id = theRowObject.questionnaireRowQuestionID;
        row.appendChild(innerP) ;
        frag.appendChild(row) ;
        row = document.createElement("div");
        row.className = "answer" ;
        //answertemp = "User choice" ;
        let firstbutton = document.createElement("button") ;
        firstbutton.className = "beginline user_answer_choice_list" ;
        firstbutton.innerHTML = ">" ; 
        row.appendChild(firstbutton) ;
        let the_answer_text = document.createElement("span") ;
        //the_answer_text.innerHTML = '&nbsp;'+"User choice 3";
        the_answer_text.innerHTML = "";
        the_answer_text.classList.add("the_answer_text") ;
        the_answer_text.dataset.answer_choice = -1 ;
        if(theAnswerObject !== undefined) {
          if(theAnswerObject.answer !== undefined){
            let theArray = theRowObject.questionnaireRowQuestion.questionAnswerDescription ;
            let theArrayLength = theArray.length ;
            for (let index = 0; index < theArrayLength; index++) {
              const element = theArray[index]; 
              if(element === theAnswerObject.answer ) {
                the_answer_text.innerHTML = theAnswerObject.answer ;
                the_answer_text.dataset.answer_choice = index ;
                index = theArrayLength
              }
            }
          }
        }
        the_answer_text.dataset.author = theRowObject.questionnaireRowQuestionAuthor ;
        the_answer_text.dataset.id = theRowObject.questionnaireRowQuestionID;
        the_answer_text.dataset.thechoicehtmllist = JSON.stringify(theRowObject.questionnaireRowQuestion.questionAnswerDescription) ; //B
        
        /*
        *** this proves it is easy to save all, but , likely we do not want all. 
        //the_answer_text.dataset.questionobject = JSON.stringify(theRowObject.questionnaireRowQuestion) ;
        //the_answer_text.dataset.ruleobject = JSON.stringify(theRowObject.questionnaireRowRule) ;
        */
        row.appendChild(the_answer_text) ;
        let secondbutton = document.createElement("button") ;
        secondbutton.className = "endline user_answer_choice_toggle" ;
        secondbutton.innerHTML = "&#9776;" ; 
        secondbutton.classList.add(indexedDBRowRecord.keyPathValue[5]);
        secondbutton.id = indexedDBRowRecord.keyPathValue[5]+"user_answer_choice_toggle";
  
        //secondbutton.dataset.author = theRowObject.questionnaireRowQuestionAuthor ;
        //secondbutton.dataset.id = theRowObject.questionnaireRowQuestionID;
        row.appendChild(secondbutton) ;
        //row.innerHTML = '<button class="beginline">></button>'+'&nbsp;'+`${answertemp}`+'&nbsp;'+'<button class="endline">&#9776;</button>';
        frag.appendChild(row) ;
        row = document.createElement("div");
        row.classList.add("attach") ;
        secondbutton.classList.add(indexedDBRowRecord.keyPathValue[5]);
        secondbutton.id = indexedDBRowRecord.keyPathValue[5]+"user_answer_choice_toggle";
        row.innerHTML = '<button class="beginline">+</button>'+"attached file"+'<button class="endline">&#128206;</button>';
        row.innerHTML = `<button id="${indexedDBRowRecord.keyPathValue[5]+"attached_file_button1"}" class="beginline ${indexedDBRowRecord.keyPathValue[5]} ">+</button>`+"attached file"+`<button id="${indexedDBRowRecord.keyPathValue[5]+"attached_file_button2"}"  class="endline ${indexedDBRowRecord.keyPathValue[5]}">&#128206;</button>`;
        frag.appendChild(row) ;
        row = document.createElement("div");
        row.classList.add("sign") ;
        row.innerHTML = `${"AD"}
        ${"JSM"} ${"YK"}`+`<button id="${indexedDBRowRecord.keyPathValue[5]+"sign_button1"}" class="endline ${indexedDBRowRecord.keyPathValue[5]}">&#9776;</button>`;
        frag.appendChild(row) 
      }
    }
  }
  
  function retreiveFromQuestionnaireStore (keyPathValue) {
    console.log("function retreiveFromQuestionnaireStore (keyPathValue) {");
    let databaseOpenRequest = indexedDB.open("authorExcuTrust") ;
    databaseOpenRequest.onsuccess = () => {
      let db = databaseOpenRequest.result ;
      let tx = db.transaction( "questionnaireStore" , "readonly") ;
      let store = tx.objectStore("questionnaireStore" ) ;
      let rowObject = store.get(keyPathValue) ;
      tx.oncomplete = () => {
         let temp = rowObject.result ;
         console.log("temp") ;
         console.log(temp) ;
         return temp
      }
    }
  }
  
  function getQuestionnaireData(theRowKeyPath) {
    console.log("function getQuestionnaireData(theRowKeyPath) {");
    let indexedDBRecord = retreiveFromQuestionnaireStore (theRowKeyPath) ;
    console.log("indexedDBRecord") ;
    console.log(indexedDBRecord)
  }
  
  function getQuestionRowAnswer (theRowObject , theAnswerObject , frag , db , buildSaveModalAnswer , element, index, rowLength) {
    console.log("function getQuestionRowAnswer (theRowObject , theAnswerObject , frag , db , buildSaveModalAnswer , element, index, rowLength) {");
    console.log("theRowObject");console.log(theRowObject);console.log("theAnswerObject");console.log(theAnswerObject);console.log("frag");console.log(frag);console.log("db");console.log(db);console.log("buildSaveModalAnswer");console.log(buildSaveModalAnswer);console.log("element");console.log(element);console.log("index");console.log(index);
    if( 1 === 0) {
      // nothing to be done and never asked 
    } else {
      if(buildSaveModalAnswer === "buildSaveModalAnswer" ) {
        // to be built 
        //alert( `show this for ${buildSaveModalAnswer} 2747`) ;
        let row = document.createElement("div");
        row.classList.add("sidebar") ;
        row.dataset.rowcode = element ; // *** possibly needed for faster processing later ***
        let tempIndex = index+1 ;
        row.id = "qrow"+tempIndex ;
        row = saverowDisplayRuleType (row , theRowObject) ; 
        row.dataset.checkboxexplain = JSON.stringify(theRowObject.questionnaireRowQuestion.checkboxExplain) ; //A
        row.dataset.questionansweredrequiresexplanation = JSON.stringify(theRowObject.questionnaireRowQuestion.questionAnsweredRequiresExplanation) ; //C
        row.dataset.questionunansweredcomplete = JSON.stringify(theRowObject.questionnaireRowQuestion.questionUnansweredComplete) ; //D ?
        row.dataset.questionunansweredrequiresexplanation = JSON.stringify(theRowObject.questionnaireRowQuestion.questionUnansweredRequiresExplanation) ; //E ?
        /** above duplicated below, may not be needed.  */
        
        if(theRowObject.questionnaireRowQuestion === undefined ){
          frag.appendChild(row)
        } else {
          row.innerHTML = tempIndex ;
          frag.appendChild(row) ;
          row = document.createElement("div");
          row.classList.add("content") ;
          if(theRowObject.questionnaireRowQuestion !== undefined ){
            row.innerHTML = theRowObject.questionnaireRowQuestion.questionContent;
            let temp = document.createElement("button") ;
            temp.classList.add("endline") ;
            temp.classList.add(indexedDBRowRecord.keyPathValue[5]);
            temp.id = indexedDBRowRecord.keyPathValue[5]+"info_circle";
            temp.innerHTML = "&#128712;" ;
            row.appendChild(temp) ;
            let innerP = document.createElement("p") ;
            if(theAnswerObject !== undefined) {
              if(theAnswerObject.ContentHTML !== undefined){
                innerP.innerHTML = theAnswerObject.ContentHTML ;
              }
            }
            innerP.className = "p" ;
            innerP.classList.add("explanation") ;
            innerP.contentEditable = true ;
            innerP.dataset.author = theRowObject.questionnaireRowQuestionAuthor ;
            innerP.dataset.id = theRowObject.questionnaireRowQuestionID;
            row.appendChild(innerP) ;
            frag.appendChild(row) ;
            row = document.createElement("div");
            row.className = "answer" ;
            //answertemp = "User choice" ;
            let firstbutton = document.createElement("button") ;
            firstbutton.className = "beginline user_answer_choice_list" ;
            firstbutton.innerHTML = ">" ; 
            row.appendChild(firstbutton) ;
            let the_answer_text = document.createElement("span") ;
            //the_answer_text.innerHTML = '&nbsp;'+"User choice 3";
            the_answer_text.innerHTML = "";
            the_answer_text.classList.add("the_answer_text") ;
            the_answer_text.dataset.answer_choice = -1 ;
            if(theAnswerObject !== undefined) {
              if(theAnswerObject.answer !== undefined){
                let theArray = theRowObject.questionnaireRowQuestion.questionAnswerDescription ;
                let theArrayLength = theArray.length ;
                for (let index = 0; index < theArrayLength; index++) {
                  const element = theArray[index]; 
                  if(element === theAnswerObject.answer ) {
                    the_answer_text.innerHTML = theAnswerObject.answer ;
                    the_answer_text.dataset.answer_choice = index ;
                    index = theArrayLength
                  }
                }
              }
            }
            the_answer_text.dataset.author = theRowObject.questionnaireRowQuestionAuthor ;
            the_answer_text.dataset.id = theRowObject.questionnaireRowQuestionID;
            the_answer_text.dataset.thechoicehtmllist = JSON.stringify(theRowObject.questionnaireRowQuestion.questionAnswerDescription) ; //B
            
            /*
            *** this proves it is easy to save all, but , likely we do not want all. 
            //the_answer_text.dataset.questionobject = JSON.stringify(theRowObject.questionnaireRowQuestion) ;
            //the_answer_text.dataset.ruleobject = JSON.stringify(theRowObject.questionnaireRowRule) ;
            */
            row.appendChild(the_answer_text) ;
            let secondbutton = document.createElement("button") ;
            secondbutton.className = "endline user_answer_choice_toggle" ;
            secondbutton.innerHTML = "&#9776;" ; 
            //secondbutton.dataset.author = theRowObject.questionnaireRowQuestionAuthor ;
            //secondbutton.dataset.id = theRowObject.questionnaireRowQuestionID;
            row.appendChild(secondbutton) ;
            //row.innerHTML = '<button class="beginline">></button>'+'&nbsp;'+`${answertemp}`+'&nbsp;'+'<button class="endline">&#9776;</button>';
            frag.appendChild(row) ;
            row = document.createElement("div");
            row.classList.add("attach") ;
            row.innerHTML = '<button class="beginline">+</button>'+"attached file"+'<button class="endline">&#128206;</button>';
            frag.appendChild(row) ;
            row = document.createElement("div");
            row.classList.add("sign") ;
            row.innerHTML = `${"AD"}
            ${"JSM"} ${"YK"}`+'<button  class="endline">&#9776;</button>';
            frag.appendChild(row) 
          }
        }
      } else {
        let targetElement = document.createElement("div") ;
        targetElement.classList.add("row");
        targetElement.classList.add("rowChoice");
        if(theRowObject === undefined) {
          theRowObject = {} ;
        }
        if(theRowObject.rowChoice === undefined) {
          theRowObject.rowChoice = "" ;
        }
        targetElement.innerHTML = theRowObject.rowChoice ;
        if(theRowObject.questionAnswerSort !== undefined) {
          targetElement.getElementsByClassName("questionAnswerSort")[0].value = theRowObject.questionAnswerSort  ;
          targetElement.dataset.uniquequestionnairerow = theRowObject.keyPathValue[5];
          targetElement.dataset.store = theRowObject.keyPathValue[0];
          targetElement.dataset.author = theRowObject.keyPathValue[2] ;
          targetElement.dataset.id = theRowObject.keyPathValue[4]         
        }
        let temp0 = ["questionnaireRowQuestionAuthor", "questionnaireRowQuestionID", "questionnaireRowRuleAuthor","questionnaireRowRuleType","questionnaireRowRuleID","ruletype","ruleauthor","ruleid" ]
        let temp0Length = temp0.length ;
        for (let index = 0; index < temp0Length; index++) {
          const element = temp0[index];
          if( theRowObject[element] !== undefined){
            targetElement.dataset[element] = theRowObject[element]
          }
        }
        frag.appendChild(targetElement)
      }
    }
    if(buildSaveModalAnswer === "buildSaveModalAnswer" ) {
      if(!document.getElementById("questionnaireGrid1")){
        let all = document.createElement("div") ;
        all.classList.add("grid1") ;
        all.classList.add("hidealways") ;
        all.id = "questionnaireGrid1" ;
        document.getElementById("questionnaireWrapper").appendChild(all) ;
      }
      document.getElementById("questionnaireGrid1").appendChild(frag) ;
      document.getElementById("questionnaireGrid1").classList.remove("hidealways");
    } else {
     document.getElementById("questionnaireWrapper").appendChild(frag) ;
     document.getElementById("questionnaireWrapper").classList.remove("hidealways") 
    }
    document.getElementById("questionnaireWrapper").appendChild(frag) ;
    db.close() ;
  }
  
  function getDataFromQuestionnaireStore2 (theRowKeyPath , rowNumber){
    //console.log(`function getDataFromQuestionnaireStore2 ********************************************`)
    console.log("function getDataFromQuestionnaireStore2 (theRowKeyPath , rowNumber){");
    let indexedDBRowRecord ;
    const request = indexedDB.open("authorExcuTrust");
    request.onsuccess =  async function() {
      db = request.result;
      const tx = db.transaction(["questionnaireStore"], "readonly");
      const store = tx.objectStore("questionnaireStore");
      const retreivedFromIndexedDB = await store.get(theRowKeyPath) ;
      tx.oncomplete = async function() {
        let theResult = await retreivedFromIndexedDB.result ;
        //console.log( theResult) ;
        indexedDBRowRecord = theResult
        //console.log("indexedDBRowRecord 3") ;
        //console.log(indexedDBRowRecord) ;
        //let newDiv = document.createElement("div") ;
        //newDiv.innerHTML = "hope to see a few times" ;
        //let newDiv = getQuestionnaireChoiceRow(); getChoiceRow()
        //document.getElementById("questionAnswerChoices").appendChild(newDiv)
        //processlater = getChoiceRow() ;
        //document.getElementById("questionAnswerChoices").insertAdjacentHTML('beforeend', processlater) ;
        getQuestionnaireRow (indexedDBRowRecord, rowNumber)
        //let completeRow = getQuestionnaireRow (indexedDBRowRecord, rowNumber)
        /*
        console.log(` commented out = document.getElementById("questionAnswerChoices").appendChild(completeRow)`) ;
        console.log(` commented out = document.getElementById("questionAnswerChoices").appendChild(completeRow)`) ;
        console.log(` commented out = document.getElementById("questionAnswerChoices").appendChild(completeRow)`) ;
        console.log(` commented out = document.getElementById("questionAnswerChoices").appendChild(completeRow)`) ;
        console.log(completeRow) ;
        */
        //document.getElementById("questionAnswerChoices").appendChild(completeRow)
        //document.getElementById("questionAnswerChoices").insertAdjacent('beforeend', processlater)
        //frag.appendChild(newDiv)
      }
    }
  }
  /*
  function loadFromIndexedDB(storeName, id){
    return new Promise(
      function(resolve, reject) {
        var dbRequest = indexedDB.open(storeName);
  
        dbRequest.onerror = function(event) {
          reject(Error("Error text"));
        };
  
        dbRequest.onupgradeneeded = function(event) {
          // Objectstore does not exist. Nothing to load
          event.target.transaction.abort();
          reject(Error('Not found'));
        };
  
        dbRequest.onsuccess = function(event) {
          var database      = event.target.result;
          var transaction   = database.transaction([storeName]);
          var objectStore   = transaction.objectStore(storeName);
          var objectRequest = objectStore.get(id);
  
          objectRequest.onerror = function(event) {
            reject(Error('Error text'));
          };
  
          objectRequest.onsuccess = function(event) {
            if (objectRequest.result) resolve(objectRequest.result);
            else reject(Error('object not found'));
          };
        };
      }
    );
  }
  
  async function saveData(dataArray) {
    const db = await idb.open('YourDB', currentVersion, upgradeFunction);
    const tran = await db.transaction('StoreName', 'readwrite');
    const store = tran.objectStore('StoreName');
  
    // This will add the items sequentially
    for (let item of dataArray) {
        await store.add({data:item});
    }
  }
  */
  
  function addRowDisplayDatasetValues (itemResult, newDiv) {
    console.log("function addRowDisplayDatasetValues (itemResult, newDiv) {");
    if(itemResult.questionnairerowruletype){
      let rowRuleDatasetIds = ["questionnairerowruletype","questionnairerowruleauthor","questionnairerowruleid"] ;
      for (const element of rowRuleDatasetIds) {
        newDiv.dataset[element] = itemResult[element];
      }
    }
    return newDiv
  }
  
  function addRowUniqueDatasetValues (itemResult, newDiv) {
    console.log("function addRowUniqueDatasetValues (itemResult, newDiv) {");
    newDiv.id = itemResult.keyPathValue[5] ;
    newDiv.dataset.uniquequestionnairerow = itemResult.keyPathValue[5];
    newDiv.dataset.store = itemResult.keyPathValue[0];
    newDiv.dataset.author = itemResult.keyPathValue[2] ;
    newDiv.dataset.id = itemResult.keyPathValue[4]  ;
    return newDiv
  }
  
  
  function makeNewDivForModifyQuestionnaire (itemResult) {
    console.log("function makeNewDivForModifyQuestionnaire (itemResult) {");
    let newDiv = document.createElement("div") ;
    newDiv  = addRowUniqueDatasetValues (itemResult, newDiv) ;
    newDiv =  addRowDisplayDatasetValues (itemResult, newDiv) ;
    newDiv.className = "row rowChoice" ;
    newDiv.innerHTML = itemResult.rowChoice ;
    let sortNumberElement = newDiv.getElementsByClassName("questionAnswerSort")[0];
    sortNumberElement.value = itemResult.questionAnswerSort ;
    return newDiv
  }
  
  async function getDataQuestionnaireStoreJoe0(questionnaireOutline) {
    console.log("async function getDataQuestionnaireStoreJoe0(questionnaireOutline) {");
    const request = indexedDB.open("authorExcuTrust");
    request.onsuccess = async function() {
      const db = request.result ;
      let lastRowToProcess = questionnaireOutline.rowIDarray.length - 1 ;
      let rowCount = 0;
      let updateScreenRowCount = 0;   /* 2021-02-25-10-31
      Used to update screen when many rows are being processed, so users do not have to wait to begin to read content and while they are reading.
      
      Done once only, the screen is redrawn below where they are likely reading with all remaining questions only once.  
      
      This may cause html jank, but better than not seeing it or relying on a loader spinner.  Currently set at 100, but that can be changed, put in a negative number if not wanted.
  
      For Desktops and laptops, probably could be set 500 or more.  We could have changes in viewPort determine the value, assuming larger viewports indicate faster machines.
  
      */
      let rowContentForDom = document.createDocumentFragment() ;
      for ( item of questionnaireOutline.rowIDarray) { 
        let itemResult;
        const tx = db.transaction(["questionnaireStore"], "readonly");
        const store = tx.objectStore("questionnaireStore");
        let itemKeyPathValue = [...questionnaireOutline.keyPathValue];
        itemKeyPathValue.push(item) ;
        storePendingSaveIndexedDBOnly(questionnaireOutline , db) ; //20201-03-02
        const retreivedFromIndexedDB = store.get(itemKeyPathValue) ;
        tx.oncomplete = async function() {
          itemResult = await retreivedFromIndexedDB.result ;
          /*   2021-02-25-10-31
          *** need to put in an additional few tests here when the row has a displayRule (either type, single or group).  These tests will process the rules to determine if displayRules are true, if true, display, if not true, then reset itemResult to undefined.
  
          Note this concern is for when the function is reused with modifications for when the questionnaire is actuallt being used and not simply being updated, as such, it will not apply to authors developing content. 
          */
          if( itemResult !== undefined) {
            ++updateScreenRowCount ;
            rowContentForDom.appendChild(makeNewDivForModifyQuestionnaire (itemResult)) ;
          }
          if(++rowCount > lastRowToProcess || updateScreenRowCount === 100 ) {
            document.getElementById("questionAnswerChoices").appendChild(rowContentForDom)
          }
        }
      }
    }
  }
  
  async function getDataFromQuestionnaireStoreByKeyPathValue (keyPathValue) {
    console.log("async function getDataFromQuestionnaireStoreByKeyPathValue (keyPathValue) {");
    const request = indexedDB.open("authorExcuTrust");
    request.onsuccess = async function() {
      db = request.result;
      const tx = await db.transaction(["questionnaireStore"], "readonly");
      const store = await tx.objectStore("questionnaireStore");
      const retreivedFromIndexedDB = await store.get(keyPathValue) ;
      tx.oncomplete = async function() {
        let theResult = await retreivedFromIndexedDB.result ;
        console.log(indexedDBRecordRetreived);
        return theResult
      }
      tx.onerror =  function() {
         let theResult = undefined ;
        return theResult
      }
    }
    request.onerror = function() {
      let theResult = undefined;
      return theResult
    }
   } 
  
   async function getQuestionnaireStoreDataByKeyPathValueWrapper (theRowKeyPath ) {
    console.log("async function getQuestionnaireStoreDataByKeyPathValueWrapper (theRowKeyPath ) {");
     let awaitFinalResult = await getDataFromQuestionnaireStoreByKeyPathValue (theRowKeyPath).then()
     finalResult = awaitFinalResult ;
     console.log("finalResult") ;
     console.log(finalResult)
   }
  
  
  
  async function getDataFromQuestionnaireStore (key) {
    console.log("async function getDataFromQuestionnaireStore (key) {");
    return new Promise (function(resolve) {
        indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
        let open = indexedDB.open ("authorExcuTrust");
        let theRow ;
        open.onsuccess = function () {
          db = open.result;
          tx = db.transaction("questionnaireStore", "readonly");
          store = tx.objectStore("questionnaireStore");
  
          theRow  = store.get(key).onsuccess =  function (event) {
              resolve(event.target.result);
          }
          tx.oncomplete = function () {
            return  theRow
          }
        }
      }
    );
  }
  
  function questionnaireBuildRowUse(questionnaireOutline) {
    console.log("function questionnaireBuildRowUse(questionnaireOutline) {");
    console.log("questionnaireOutline");
    console.log(questionnaireOutline);
    let rowNumber = 0 ;
    let tempPlace = document.getElementById("questionAnswerChoices") ;
    //tempPlace.innerHTML = "" ;
    let tempPlace2 = tempPlace.nextElementSibling ;
    if(tempPlace2 !== null) {
      console.log(tempPlace2) ;
      tempPlace2.remove()   
    }
    for (const element of questionnaireOutline.rowIDarray) {
      let theRowKeyPath = [...questionnaireOutline.keyPathValue] ;
      theRowKeyPath.push(element) ;
      getDataFromQuestionnaireStore2 (theRowKeyPath , rowNumber) ;
      rowNumber++ 
       //console.log("processLater 7") ;
       //console.log(processLater)
      //console.log(element);
    }
  
    let variableNames = ["questionnaireOutline"  ] ;
    let variables = [questionnaireOutline ] ;
    let variableLength = variables.length ;
    for ( let index = 0; index < variableLength ; index++) {
      //console.log(variableNames[index]) ;
      //console.log(variables[index])
    }
    //let theplace = document.getElementById("allWrappers") ;
    //let theplace = document.getElementById("questionnaireAuthorContent") ;
    //let theplace = document.getElementById("questionnaireAnswerChoices") ;
    //document.getElementById("questionnaireAnswerChoices").innerHTML = frag ;
  ["questionnaireAnswerChoices","questionAnswerChoices"].forEach(element => {
      //console.log(element) ;
      let temp = document.getElementById(element) ;
      temp.classList.remove("hidealways") ;
      //console.log(temp)
    }
   ) ;
   questionnaireOutline.rowIDarray.forEach(
     element => {
       let theRowKeyPath = [...questionnaireOutline.keyPathValue] ;
       theRowKeyPath.push(element) ;
       //console.log("theRowKeyPath") ;
       //console.log(theRowKeyPath) ; 
       //retreiveFromQuestionnaireStore (theRowKeyPath) ;
       /*
       let anonFunction = async function(){
         await getDataFromQuestionnaireStore (theRowKeyPath) 
       }
       */
       //let processLater = getDataFromQuestionnaireStore2 (theRowKeyPath) ;
       //console.log("processLater 10") ;
       //console.log(processLater)
       //let theDatafromIndexedDB = anonFunction  ;
       /*;
       getQuestionnaireData(theRowKeyPath)
       */
     }
   )
    
  //  let thePlace = document.getElementById("questionnaireAnswerChoices") ;
  //  console.log("thePlace") ; console.log(thePlace) ;
  
    //let theplace = document.getElementById("questionAnswerChoices") ;
    //let theplace = document.getElementById("questionWrapper") ;
    //theplace.insertAdjacentElement("afterend",theNewDiv)
    //theplace.insertAdjacentElement("beforebegin",theNewDiv)
    //theplace.insertAdjacentElement("afterend",theNewDiv) // 2021-02-09
    //theplace.appendChild(theNewDiv) 
  }
  
  async function questionnaireRetrieveRowChoices (questionnaireOutline , db , keyPathValue , selectObject, buildSaveModalAnswer) { 
    console.log("async function questionnaireRetrieveRowChoices (questionnaireOutline , db , keyPathValue , selectObject, buildSaveModalAnswer) { ");
    if(buildSaveModalAnswer === "buildSaveModalAnswerUse") {
  /*
    console.log(` Beginning  of a.  questionnaireOutline ; b. db ;
    c. keyPathValue ; d. selectObject;
    e. buildSaveModalAnswer
  
      in %%%%%%%%%%            async function questionnaireRetrieveRowChoices (questionnaireOutline , db , keyPathValue , selectObject, buildSaveModalAnswer)       1   is it only an array?  %%%%%%%%%%%%%%%%%%%"`);
    console.log(questionnaireOutline);
    console.log(db);
    console.log(keyPathValue);
    console.log(selectObject);
    console.log(buildSaveModalAnswer);
    console.log(` End of a.  questionnaireOutline ; b. db ;
     c. keyPathValue ; d. selectObject;
     e. buildSaveModalAnswer
  
       in %%%%%%%%%%            async function questionnaireRetrieveRowChoices (questionnaireOutline , db , keyPathValue , selectObject, buildSaveModalAnswer)       1   is it only an array?  %%%%%%%%%%%%%%%%%%%"`);
       */
      questionnaireBuildRowUse(questionnaireOutline) ;
      return ; // 2021-02-20-04-28
    
    }
    let thevariablesstr = ["questionnaireOutline","db","keyPathValue","selectObject"] ;
    let thevariables = [questionnaireOutline,db,keyPathValue,selectObject] ;
    let theLength = thevariables.length ;
    for (let index = 0; index < theLength; index++) {
      let element = thevariablesstr[index];
      element = thevariables[index] ;
    }
    document.getElementById("questionnaireAnswerChoices").innerHTML = getQuestionnaireAnswerChoicesHeader() ;
    let rowIDarray = await questionnaireOutline.rowIDarray; // questionnaireOutline is list of all rows in a questionnaire, even if not shown!  Consideration should be given to making this list dynamic by adding a true / null, false field, representing the current status, right now not considered necessary - 2020-01-07
    //let rowlength = JSON.parse(JSON.stringify(rowIDarray.length)) ;
    console.log(` Beginning  of a.  questionnaireOutline ; b. db ;
    c. keyPathValue ; d. selectObject;
    e. buildSaveModalAnswer
  
      in %%%%%%%%%%            async function questionnaireRetrieveRowChoices (questionnaireOutline , db , keyPathValue , selectObject, buildSaveModalAnswer)       2   is it only an array?  %%%%%%%%%%%%%%%%%%%"`);
    console.log(questionnaireOutline);
    console.log(db);
    console.log(keyPathValue);
    console.log(selectObject);
    console.log(buildSaveModalAnswer);
    let test2BeRenamed = await getDataQuestionnaireStoreJoe0(questionnaireOutline) ;
    console.log(test2BeRenamed) ;
    return
  
    for (const element of questionnaireOutline.rowIDarray) {
        let theRowKeyPath = [...questionnaireOutline.keyPathValue] ;
        theRowKeyPath.push(element) ;
        console.log("theRowKeyPath then record retrieved");
        console.log(theRowKeyPath);
        let indexedDBRecordRetreived = getDataFromQuestionnaireStoreByKeyPathValue (theRowKeyPath) ;
        console.log(indexedDBRecordRetreived)
        //indexedDBRecordRetreived = getQuestionnaireStoreDataByKeyPathValueWrapper (theRowKeyPath);
        }
    return
    console.log(` End of a.  questionnaireOutline ; b. db ;
     c. keyPathValue ; d. selectObject;
     e. buildSaveModalAnswer
  
       in %%%%%%%%%%            async function questionnaireRetrieveRowChoices (questionnaireOutline , db , keyPathValue , selectObject, buildSaveModalAnswer)       2   is it only an array?  %%%%%%%%%%%%%%%%%%%"`);
    questionnaireBuildRowUse(rowIDarray , db , keyPathValue , selectObject, buildSaveModalAnswer) ;
    console.log("___________________rowIDarray list ___________________________________________") ;
    console.log(rowIDarray) ;
    let rowlength = rowIDarray.length ;
    let frag = document.createDocumentFragment() ;
    for (let index = 0; index < rowlength; index++) {
      let tx = db.transaction( selectObject.tx1 , selectObject.tx2) ;
      let store = tx.objectStore(keyPathValue[0]) ;
      const element = rowIDarray[index];
      let rowKeyPathValue = [...keyPathValue] ;console.log("rowKeyPathValue before adding element");console.log(rowKeyPathValue);console.log("element");console.log(element);
      rowKeyPathValue.push(element) ; console.log("rowKeyPathValue before test for undefined ");console.log(rowKeyPathValue);  questionnaireBuildRow(rowKeyPathValue , db , keyPathValue , selectObject, buildSaveModalAnswer) ;
      let row = await store.get(rowKeyPathValue) ;
      tx.oncomplete = () => {
        let theRowObject = row.result ;
        console.log("rowKeyPathValue ???") ;
        console.log(rowKeyPathValue) ;
        questionnaireBuildRow(theRowObject , db , rowKeyPathValue , selectObject, buildSaveModalAnswer) ;
        const tx2 = db.transaction( "answerStore" , "readonly") ;
        console.log("theRowObject");
        const store2 = tx2.objectStore("answerStore");
        console.log("________ theRowObject ______________");
        console.log(theRowObject);
        if(theRowObject !== undefined ) {
          console.log(theRowObject.rowChoice) 
        }  else {
          let temp = getQuestionnaireBlankRowChoice () ;
          let h = document.getElementById("questionAnswerChoices");
          /*
          let tDiv = document.createElement("div") ; 
          tDiv.
          tDiv.classList.add("row"); tDiv.classList.add("rowChoice"); tDiv.classList.add("m-0"); 
          h.insertAdjacentElement("beforeend", tDiv);
          */
          h.insertAdjacentHTML("beforeend", temp) ;
          return
        }
  
        let h = document.getElementById("questionAnswerChoices");
        let tDiv = document.createElement("div") ; 
        tDiv.classList.add("row"); tDiv.classList.add("rowChoice"); tDiv.classList.add("m-0"); 
        tDiv.innerHTML = theRowObject.rowChoice ;
  
        tDiv.dataset.uniquequestionnairerow = theRowObject.keyPathValue[5];
        // not sure if needed, likely yes. 
        tDiv.dataset.store = theRowObject.keyPathValue[0];
        tDiv.dataset.author = theRowObject.keyPathValue[2] ;
        tDiv.dataset.id = theRowObject.keyPathValue[4]      
  
  
        /*
        tDiv.dataset.store = theRowObject.keyPathValue[0];
        tDiv.dataset.author = theRowObject.keyPathValue[2] ;
        tDiv.dataset.id = theRowObject.keyPathValue[4]      
        
        tDiv.dataset.questionnairerowruletype = questionnaireOutline.allArrayType[index];
        tDiv.dataset.questionnairerowruleauthor = questionnaireOutline.allArrayAuthor[index];
        tDiv.dataset.questionnairerowruletid = questionnaireOutline.allArrayID[index];
  
        */
  
        console.log("_________________  tDiv ___________________") ; 
        console.log(tDiv) ; 
        let sortNumberElement = tDiv.getElementsByClassName("questionAnswerSort")[0];
        sortNumberElement.value = theRowObject.questionAnswerSort ;
        console.log("_________________sortNumberElement ____________________________") ;
        console.log(sortNumberElement) ;
        //h.insertAdjacentHTML("beforeend", theRowObject.rowChoice);
        h.insertAdjacentElement("beforeend", tDiv); // 2021-02-09
        let theAnswerObjectKeyPathValue = ["customer",1,"SCENARIO",1,theRowObject.questionnaireRowQuestionAuthor,1,theRowObject.questionnaireRowQuestionID] ; 
        console.log("theAnswerObjectKeyPathValue") ;console.log(theAnswerObjectKeyPathValue) ;
        if( theAnswerObjectKeyPathValue[4] === undefined || theAnswerObjectKeyPathValue[6] === undefined) {
           console.log ("Blank line"); theAnswerObjectKeyPathValue = ["$3& not a valid key so make sure null !!!23456"] 
          } ; //return 
        let theAnswerObjectTemp = store2.get(theAnswerObjectKeyPathValue) ;
        tx2.oncomplete = () => {console.log("theAnswerObjectTemp.result");console.log(theAnswerObjectTemp.result); if(theAnswerObjectTemp.result !== undefined){
          let theAnswerObject = theAnswerObjectTemp.result ; console.log("theAnswerObjectTemp - before lookUp ****");console.log(theAnswerObjectTemp); 
          getQuestionRowAnswer (theRowObject , theAnswerObject , frag , db , buildSaveModalAnswer , element , index) ; }else{console.log("undefined, we need to add a line to DOM")}
          //questionnaireBuildRow(theAnswerObjectTemp.result , db , keyPathValue , selectObject, buildSaveModalAnswer) ;
          console.log("*** ***************** theAnswerObjectTemp.result  may or may not be reached *********************************************************") ;
          console.log(theAnswerObjectTemp ) ;
          if(theAnswerObjectTemp.result !== undefined) {
            console.log("*** ***************** theAnswerObjectTemp.result *********************************************************") ;
            console.log(theAnswerObjectTemp.result) ;
            //document.getElementById("questionAnswerChoices").insertAdjacentElement("afterend",theAnswerObjectTemp.result) //2021-02-09
          } else {
            console.log("*********** theAnswerObjectTemp.result is undefined ***************") 
          }
          //console.log("removehidealways1") ;
          //document.getElementById("questionnaireAnswerChoices").classList.remove("hidealways")
        } 
        console.log("removehidealways2") ;
        document.getElementById("questionnaireAnswerChoices").classList.remove("hidealways")
      }
      //console.log("removehidealways3") ;
      //document.getElementById("questionnaireAnswerChoices").classList.remove("hidealways")
    }
    //console.log("removehidealways4") ;
    //document.getElementById("questionnaireAnswerChoices").classList.remove("hidealways")
  }
  
  function noAnswerNoExplanation (tObject) {
    console.log("function noAnswerNoExplanation (tObject) {");
    //console.log(`function noAnswerNoExplanation (tObject) {   - 0`) ;
    //console.log(tObject) ; 
    if(tObject.questionUnansweredRequiresExplanation === true ) {
    // no explanation // no answer // unanswered questions require explanation  = true
      tObject.explanationComplete = false ;
      tObject.explanationCompleteReason =  `1 false, UNanswered, no explanation, Unanswered ALWAYS EXPLAINED"`;
      return tObject
    } else {
      tObject.explanationComplete = true ;
      tObject.explanationCompleteReason =  `"2 true, UNanswered, no explanation, UNanswered NEVER EXPLAINED";`;
      return tObject
    }
  }
  
  function answeredNoExplanationCheckAnswers (tObject) {
    console.log("function answeredNoExplanationCheckAnswers (tObject) {");
    let listLength = tObject.theChoiceHTMLList.length ;
    for (let index = 0; index < listLength; index++) {
      const element =   tObject.theChoiceHTMLList[index];
      if( element === tObject.answer) {
      // identify answer in list   
        let answerRequiresExplanation = tObject.checkBoxExplain[index] ;
        if(answerRequiresExplanation) {
          tObject.explanationComplete = false ;
          tObject.explanationCompleteReason =  `4 false , checked answer, ALWAYS EXPLAINED`;
          return tObject
        } else {
          tObject.explanationComplete = true ;
          tObject.explanationCompleteReason =  `5 true , checked answer, NEVER EXPLAINED`;
          return tObject              
        }
      }
    }
  }
  
  function answeredNoExplanation (tObject) {
    console.log("function answeredNoExplanation (tObject) {");
    if(tObject.questionAnsweredRequiresExplanation  === true) {
      tObject.explanationComplete = false ;
      tObject.explanationCompleteReason =  `3 false, answered, no explanation, answered ALWAYS EXPLAINED";`;
      return tObject
    } else {
    // no explanation  // answered question // NOT all answered questions require explanation  
      tObject = answeredNoExplanationCheckAnswers (tObject) ;
      return tObject 
    }
  }
  
  
  
  function getExplanationComplete (tObject) { 
    console.log("function getExplanationComplete (tObject) { ");
    if(tObject.ContentTEXT === undefined) { tObject.ContentTEXT = "" }
    if( tObject.answer === undefined) {tObject.answer = "" } 
    if(tObject.ContentTEXT === "" ) {
    // no explanation
      if(tObject.answer === "" ) {
      // no explanation // no answer
      tObject = noAnswerNoExplanation (tObject) ;
      return tObject
      } else {
      // no explanation  // answered
        tObjection = answeredNoExplanation (tObject);
        return tObject
      }
    } else {
      // explanation exists 
      tObject.explanationComplete = true ;
      tObject.explanationCompleteReason =  `6 true - explanation exists`;
      return tObject
    }
  }
  
  function getAnswerComplete (tObject) {
    console.log("function getAnswerComplete (tObject) {")
    if(tObject === undefined ){
      return tObject
    } else{
      if(tObject.answer !== "" ){
        tObject.answerComplete = true ;
        tObject.answerCompleteReason = " Answer Exists"
        return tObject
      } else {
        if (tObject.questionUnansweredComplete === true) { // wording on screen changed from double negative, now says Answer required, so 
          tObject.answerComplete = false ;
          tObject.answerCompleteReason = " Answer is ALWAYS required"
          return tObject
        } else {
          tObject.answerComplete = true ;
          tObject.answerCompleteReason = " Answer is NEVER required"
          return tObject
        }
      }
    }
  }
  
  function setQuestionRuleStatus (tObject) {
    console.log("function setQuestionRuleStatus (tObject) {");
    let priorValue; 
    if(tObject !== undefined) {
      priorValue =  JSON.stringify(tObject) ;
      tObject = getExplanationComplete (tObject) ;
      if (tObject === undefined ) {
        tObject = JSON.parse(priorValue)
      }
      priorValue =  JSON.stringify(tObject) ;
      tObject = getAnswerComplete (tObject) ;
      if (tObject === undefined ) {
        tObject = JSON.parse(priorValue)
      }
    } 
    return tObject
  }
  
  function getGroupruleAnswerRows(questionnaireOutline) {
    console.log("function getGroupruleAnswerRows(questionnaireOutline) {   2023-03-09 17:12");
    let frag = document.createDocumentFragment();
    let docLength = questionnaireOutline.allArrayAuthor.length; 
    for (let index = 0; index < docLength; index++) {
      let newRow = document.createElement("div") ; 
      newRow.dataset.questionnairerowruletype = questionnaireOutline.allArrayType[index];
      newRow.dataset.questionnairerowruleauthor = questionnaireOutline.allArrayAuthor[index];
      newRow.dataset.questionnairerowruletid = questionnaireOutline.allArrayID[index];
      newRow.innerHTML = questionnaireOutline.allArrayInnerHTML[index] ;
      //newRow.getElementsByClassName("questionnairecloud")[0].innerHTML = ""; removed 2023-03-10 19:38
      newRow.getElementsByClassName("questionnairecloud")[0].innerHTML = "Saved";
      newRow.classList.add("row") ;
      newRow.classList.add("rowChoice") ;
      newRow.classList.add("m-0") ;
      if(questionnaireOutline.allArrayType[index] ==="groupruleStore") {
        newRow.classList.add("groupruleWrapper")
      } else {
        newRow.classList.add("ruleWrapper")
      }
      //newRow.innerHTML = questionnaireOutline.allArrayInnerHTML[index] ;      
      frag.appendChild(newRow)
    }
    document.getElementById("groupruleWrapper").appendChild(frag)
  }
  
  function storeGroupruleInDOM (questionnaireOutline){
    console.log("function storeGroupruleInDOM (questionnaireOutline){");
    document.getElementById("groupruleWrapper").innerHTML = getEmptyGroupHeader() + getQuestionnaireGroupChoicesHeader();
    let temp0 = document.getElementById("groupruleAuthor") ;
    temp0.textContent = questionnaireOutline.keyPathValue[2] ;
    temp0.contentEditable = false ;
    temp0.classList.remove("missing");
    temp0 = document.getElementById("groupruleID") ;
    temp0.textContent = questionnaireOutline.keyPathValue[4] ;
    temp0.contentEditable = false ;
    temp0.classList.remove("missing");
    document.getElementById("all0Any1True").checked = questionnaireOutline.all0Any1True ;
    all0Any1() ;
    if(questionnaireOutline.groupruleContentInnerText.trim() !== "") {
      temp0 = document.getElementById("groupruleContent") ;
      temp0.innerHTML = questionnaireOutline.groupruleContent ;
      temp0.classList.remove("missing");
    }
    document.getElementById("groupruleWrapper").classList.remove("hidealways") ;
    getGroupruleAnswerRows(questionnaireOutline) ;
    document.getElementById("saveButton").value = ""
  }
  
  
  function retreiveGrouprule (keyPathValue) {
    console.log("function retreiveGrouprule (keyPathValue) {");
    let selectObject = {} ;
    selectObject.database = "authorExcuTrust" ;
    selectObject.tx1 = "ruleStore" ;
    selectObject.tx2 = "readonly" ;
    selectObject.store = "ruleStore" ;
    let databaseOpenRequest = indexedDB.open(selectObject.database);
  
    databaseOpenRequest.onsuccess = () => {
      let db = databaseOpenRequest.result ;
      let tx = db.transaction( selectObject.tx1 , selectObject.tx2) ;
      let store = tx.objectStore(selectObject.store) ;
      let rowObject = store.get(keyPathValue) ;
      tx.oncomplete = async () => {
        db.close() ;
        let indexedDBRecordRetreived = await rowObject.result ;
        storeGroupruleInDOM (indexedDBRecordRetreived)
      }
    }
  }
  
  function retrieve (keyPathValue , buildSaveModalAnswer) { 
    console.log("function retrieve (keyPathValue , buildSaveModalAnswer) { ");
    if(keyPathValue[0] === "trueruleStore") {
      emptyRule31() ;
      preCheckDataBaseByTypeRule(keyPathValue)
      } else if (keyPathValue[0] === "groupruleStore"){
        retreiveGrouprule (keyPathValue)
      }
    else if(keyPathValue[0] === "questionStore") {
      let checkIfQuestionForRule ;
      checkIfQuestionForRule  = document.getElementById("testForChange2").textContent ;
      if(checkIfQuestionForRule === "▌╪█questionForSingleRuleStarted" ) {
        preCheckDataBaseByTypeQuestion(keyPathValue)
      } else {
        newemptyQuestion() ;
        let questionAuthor = keyPathValue[2] ;
        let questionID = keyPathValue[4] ;
        document.getElementById("questionAuthor").innerText = questionAuthor ;
        document.getElementById("questionID").innerText  = questionID ;
        let toConfirm = false ;
        checkDataBaseByType("questionStore" , "questionStore" , questionAuthor, questionID , toConfirm) ;
      }
    } else if(keyPathValue[0] === "questionnaireStore") {
      //alert(`retrieve (keyPathValue) = ${JSON.stringify(keyPathValue)}`) ;
      let selectObject = {} ;
      selectObject.database = "authorExcuTrust" ;
      selectObject.tx1 = keyPathValue[0] ;
      selectObject.tx2 = "readonly" ;
      selectObject.store = keyPathValue[0] ;
      let databaseOpenRequest = indexedDB.open(selectObject.database);
      databaseOpenRequest.onsuccess = () => {
        let db = databaseOpenRequest.result ;
        let tx = db.transaction( selectObject.tx1 , selectObject.tx2) ;
        let store = tx.objectStore(keyPathValue[0]) ;
        let rowObject = store.get(keyPathValue) ;
        tx.oncomplete = async () => {
          let questionnaireOutline = await rowObject.result ;
          let temp = document.getElementById("questionnaireAuthor") ;
          temp.innerText = questionnaireOutline.questionnaireAuthor ;
          temp.classList.remove("missing") ;
          temp = document.getElementById("questionnaireID") ;
          temp.innerText = questionnaireOutline.questionnaireID ;
          temp.classList.remove("missing") ;
          temp = document.getElementById("questionnaireContent") ;
          temp.innerHTML = questionnaireOutline.questionnaireContent ;
          temp.classList.remove("missing") ; 
          questionnaireRetrieveRowChoices (questionnaireOutline , db , keyPathValue , selectObject , buildSaveModalAnswer)
        }
      }
    }
  }
  
  function preCheckDataBaseByTypeQuestion(keyPathValue) {
    console.log("function preCheckDataBaseByTypeQuestion(keyPathValue) {");
    //let ruleAuthor = objectRetrieved.keyPathValue[2] ;
    let questionAuthor = keyPathValue[2] ;
    //let ruleID = objectRetrieved.keyPathValue[4] ;
    let questionID = keyPathValue[4] ;
    document.getElementById("questionAuthor").innerText = questionAuthor ;
    document.getElementById("questionID").innerText  = questionID ;
    //checkDataBaseByType("ruleStore" , "trueruleStore" , document.getElementById("ruleAuthor").innerText , document.getElementById("ruleID").innerText )
    //checkDataBaseByType("ruleStore" , "trueruleStore" , ruleAuthor, ruleID)
    let toConfirm = false ;
    checkDataBaseByType("questionStore" , "questionStore" , questionAuthor, questionID , toConfirm) 
  }
  
  function preCheckDataBaseByTypeRule(keyPathValue) {
    console.log("function preCheckDataBaseByTypeRule(keyPathValue) {");
    //let ruleAuthor = objectRetrieved.keyPathValue[2] ;
    let ruleAuthor = keyPathValue[2] ;
    //let ruleID = objectRetrieved.keyPathValue[4] ;
    let ruleID = keyPathValue[4] ;
    document.getElementById("ruleAuthor").innerText = ruleAuthor ;
    document.getElementById("ruleID").innerText  = ruleID ;
    //checkDataBaseByType("ruleStore" , "trueruleStore" , document.getElementById("ruleAuthor").innerText , document.getElementById("ruleID").innerText )
    //checkDataBaseByType("ruleStore" , "trueruleStore" , ruleAuthor, ruleID)
    let toConfirm = false ;
    checkDataBaseByType("ruleStore" , "trueruleStore" , ruleAuthor, ruleID , toConfirm) ;
  }
  
  
  /*  
        let checkForQuestion = document.getElementById("process0").textContent ;
        if ( checkForQuestion === "New Question Level Rule") {
          contentEditabledByID(true, ["ruleAuthor","ruleID", "ruleContent"]) ;
          document.getElementById("selectChangeButtonForRule").classList.remove("hidealways") ;
        }
  */
  
  function updateScreenQuestionPart3(saveObject) {
    console.log("function updateScreenQuestionPart3(saveObject) {");
    let choiceListNew = getChoiceRow() ;
      //let count = saveObject.questionAnswerNotesDescriptionInnerText.length ;
      let counter = 0 ;
      let empty = "<hr>" + choiceListNew ;
      while (counter < count-1){
      empty = empty + choiceListNew ;
      counter++
      }
      let temp = document.getElementById("questionAnswerChoices") ;
      temp.innerHTML = empty ;
      document.getElementById('process2').textContent = "emptyEvents" ;
      let theClassList =  [ "questionAnswerDescription"];
      for (let index = 0; index < theClassList.length; index++) {
        const theClass = theClassList[index];
        counter = 0 ;
        while (counter < count){
          temp.getElementsByClassName(theClass)[counter].innerHTML = saveObject[theClass][counter] ;
          if(temp.getElementsByClassName(theClass)[counter].innerText !== "" ){
            temp.getElementsByClassName(theClass)[counter].classList.remove("missing")
          }
          counter++
        }
      }
      theClassList =  [ "checkboxExplain", "checkboxNoChange" ];
      for (let index = 0; index < theClassList.length; index++) {
        const theClass = theClassList[index];
        counter = 0 ;
        while (counter < count){
          temp.getElementsByClassName(theClass)[counter].checked = saveObject[theClass][counter] ;
          counter++
        }
      }
      theClassList =  [ "questionAnswerSort" ];
      for (let index = 0; index < theClassList.length; index++) {
        let theClass = theClassList[index];  // change from cont to let and it worked without error message. 
        counter = 0 ;
        while (counter < count){
          temp.getElementsByClassName(theClass)[counter].valueAsNumber = saveObject[theClass][counter]*1 ;
          temp.getElementsByClassName(theClass)[counter].classList.remove("missing")
          counter++
        }
      } ;
      sortByValueAsNumber0() ;
      fixMissing() ;
      //allShowGroup (true, "deleteBtn")  ; /// used to show delete immediately on screen update. 
      if(saveObject === undefined) {
        unlockAll()
      } else {
        document.getElementById("preventAllChanges").value = "notEmpty" ;
        lockAll()
      }
      //setupEvents() ; // ** consider if events setup can be limited to once, i.e. do not setup on insert BUtton for all.  
      allShowGroup (true, "deleteBtn")  ; /// used to show delete immediately on screen, *** 20200727
  }
  
  
  
  function updateScreenQuestionStorePart2(saveObject) {
    console.log("function updateScreenQuestionStorePart2(saveObject) {");
    document.getElementById("questionWrapper").innerHTML = getQuestionWrapper() ;
    getQuestionWrapperPart2() ;
    if (saveObject.questionType === "" ) {
      let ele = [
        "questionTypeDiv_checkbox" , // 0
        "questionTypeDiv_date" , // 1
        "questionTypeDiv_datetime-local" , // 2
        "questionTypeDiv_email" ,// 3
        "questionTypeDiv_file" ,// 4
        "questionTypeDiv_month" ,// 5
        "questionTypeDiv_number" ,// 6
        "questionTypeDiv_password" ,// 7
        "questionTypeDiv_radio" ,// 8
        "questionTypeDiv_tel" ,// 9
        "questionTypeDiv_text" ,// 10
        "questionTypeDiv_url" ,// 11
        "questionTypeDiv_week" ,// 12
        "questionTypeDiv_na" ,// 13
        "questionTypeDiv_naExplained" ,// 14
        "questionTypeDiv_modal" , // 15
        "questionTypeDiv_dropdown" // 16
      ] ;
      //let ele = document.getElementsByClassName(options); 
      for (i = 0; i < ele.length; i++) { 
        document.getElementById(ele[i]).checked = false
      }
      document.getElementById(saveObject.questionType).checked = true;
      let temp = document.getElementById("questionTypeDiv") ;
      temp.classList.add("missing")
    } else {
      document.getElementById(saveObject.questionType).checked = true;
      let temp = document.getElementById("questionTypeDiv") ;
      temp.classList.remove("missing") ;
    }
    //count =  saveObject.questionAnswerNotesDescriptionInnerText.length ;
    count =  saveObject.questionAnswerDescriptionInnerText.length ;
    let idList = ["questionAuthor","questionID","questionContent"] ;
    for (let index = 0; index < idList.length; index++) {
      document.getElementById(idList[index]).innerHTML = saveObject[idList[index]] ;
      let temp = document.getElementById(idList[index]) ;
      if (temp.innerText.trim() !== "") {
        temp.classList.remove("missing")
      }
    } 
    // get checkmark values at the top ( before choices)
    idList = ["questionUnansweredComplete","questionUnansweredRequiresExplanation","questionAnsweredRequiresExplanation"] ;
    for (let index = 0; index < idList.length; index++) {
      document.getElementById(idList[index]).checked = saveObject[idList[index]]   
    } ;
    // get all the choices
    // - setup new element 
    //let choiceList = document.createDocumentFragment() ; //*** may not be needed ***
    //let newDiv = document.createElement("li");
  }
  
  
  function updateScreen(saveObject , keyPathValue) { 
    console.log("function updateScreen(saveObject , keyPathValue) { ");
    if(saveObject.keyPathValue[0] === "questionStore") {
      // get text and innerHTML value
      let count ;
      if(saveObject === undefined) {
        count =  0 ;
      } else {
        updateScreenQuestionStorePart2(saveObject) ;
      }
      updateScreenQuestionPart3(saveObject) 
    }
    //renumberquestionnairedevelopment()
  }
  
  function updateGridRowsFromDatabase(list) {
    console.log("function updateGridRowsFromDatabase(list) {");
    menuChoicesToggle(1);
    const request = indexedDB.open("authorExcuTrust");
    request.onsuccess = function() {
      db = request.result;
      const tx = db.transaction(["questionnaireStore"], "readonly");
      const store = tx.objectStore("questionnaireStore");
      //const lowerExcludedBound  = ["questionnaireStore",1,"JSM",1,"2020-12-06-12:38"] ;
      const lowerExcludedBound  = ["questionnaireStore",1,"JSM",1,"2020-12-09-09:18"] ;
      let upperExcludedBound = [...lowerExcludedBound] ;
      upperExcludedBound.push("■") ; // this appears to be highest value in text
      //const keyList = store.getAllKeys(IDBKeyRange.bound(lowerExcludedBound, upperExcludedBound,true,true)) ; //z{}~ ²works as first non included after null, used ■
      const keyList = store.getAllKeys(IDBKeyRange.bound(lowerExcludedBound, lowerExcludedBound,false,false)) ; //z{}~ 
      const versionDateSince1969 = Date.now() ;
      tx.oncomplete = () => {
        let listLength = keyList.result.length ;
        for (let index = 0; index < listLength; index++) {
          const tx1 = db.transaction(["questionnaireStore"], "readonly") ;
          const store1 = tx1.objectStore("questionnaireStore");
          const element1 = keyList.result[index];
          const current1 = store1.get(element1) ;
          tx1.oncomplete = () => {
            console.log("*** makePublishedquestionnaire() does not appear to exist as a function yet ***  Note follows are are variable to be sent to the new function, i.e. (current1.result, element1, versionDateSince1969 - last one being current1)");
            console.log(current1.result);console.log(element1);console.log(versionDateSince1969);console.log(current1);
            makePublishedquestionnaire(current1.result, element1, versionDateSince1969)
          }        
        }
      }
    }
    if(list === undefined) {
      list = [,,]
    }
    console.log("list");
    console.log(list);
    // open the database  - read only   for now get all data.
    let frag = document.createDocumentFragment() ;
    let listLength = list.length ;
    for (let index = 0; index < listLength; index++) {
      let answertemp ;
      const element = list[index];
      let row = document.createElement("div");
      row.classList.add("sidebar") ;
      row.innerHTML = index*1+1 ;
      frag.appendChild(row) ;
      row = document.createElement("div");
      row.classList.add("content") ;
      row.innerHTML = "content"+index +`>Start Question content --- --- --- ---- --- ---Question middle --- --- --- ---- ---- --- Question content  end  *** <p class="p" contenteditable="true" p>Input of explanation </p></div>`;
      frag.appendChild(row) ;
      row = document.createElement("div");
      row.classList.add("answer") ;
      answertemp = "Hope Hope Hope ** * ** * ** *" ;
      row.innerHTML = '<button class="beginline">></button>'+'&nbsp;'+`${answertemp}`+'&nbsp;'+'<button class="endline">&#9776;</button>';
      frag.appendChild(row) ;
      row = document.createElement("div");
      row.classList.add("sign") ;
      row.innerHTML = '<button class="beginline">></button>'+"*"+'<button  class="endline">&#9776;</button>';
      frag.appendChild(row) ;
      row = document.createElement("div");
      row.classList.add("attach") ;
      row.innerHTML = '<button>&#128206;</button>';
      frag.appendChild(row) ;
      row = document.createElement("div");
      row.classList.add("attach") ;
      row.innerHTML = "&#x1F4CE;";
      frag.appendChild(row) 
    }
    /*let temp1 = document.createElement("div") ;
    temp1.classList.add("grid1") ;
  */
    document.getElementById("firstGrid1").classList.add("hidealways") ;
    document.getElementById("firstGrid1").innerHTML = "" ;
    document.getElementById("firstGrid1").appendChild(frag) ;
    document.getElementById("firstGrid1").classList.remove("hidealways") ;
  }
  
  
  function getDatabaseSetup() {
    console.log("function getDatabaseSetup() {");
    let readObject = {} ;
    readObject.store = "ruleStore" ;
    readObject.database = "authorExcuTrust" ;
    readObject.tx1 = "ruleStore" ;
    readObject.tx2 = "readonly" ;
    return readObject
  }
  
  function getTrueruleRead(){
    console.log("function getTrueruleRead(){");
    let readObject = getDatabaseSetup();
    readObject.keyPathValue = ["trueruleStore",1,document.getElementById("ruleAuthor").textContent,1,document.getElementById("ruleID").textContent] ;
    readObject.store = "ruleStore" ;
    readObject.database = "authorExcuTrust" ;
    readObject.tx1 = "ruleStore" ;
    readObject.tx2 = "readonly" ;
    return readObject
  }
  
  function getTrueruleWrite(){
    console.log("function getTrueruleWrite(){");
    let saveObject = getTrueruleRead();
    saveObject.tx2 = "readwrite" ;
    return saveObject
  }
  
  function getQuestionRead() {
    console.log("function getQuestionRead() {");
    let readObject = getDatabaseSetup() ;
    readObject.store = "questionStore" ;
    readObject.tx1 = readObject.store ;
    return readObject
  }
  
  function getTheSelected (event) {
    console.log("function getTheSelected (event) {");
    let theSelected = event.target ;
    //console.log(theSelected) ;
    let theParent = 1,  parentIsRowChoice = false ;
    while (!parentIsRowChoice && theParent !== null) {
      theParent = theSelected.parentElement ;
      if (theParent !== null) {
        parentIsRowChoice =  theParent.classList.contains("rowChoice") ;
        theSelected = theParent
      }
    }
    return theSelected
  }
  
  function domakeModalForQuestionnaireQuestion(theselectedrow , rule) {
    console.log("function domakeModalForQuestionnaireQuestion(theselectedrow , rule) {");
    // theSelectedRow is source of request on questionnaire, or a grouprule
    let row ;
    let answer ;
    let modal = document.getElementById("myModal");
    modal.style.display = "block";
    window.onclick = function(event) {
      if(event.target.id === "modalJoeInput" || event.target.id === "modalJoeIDInput" || event.target.id === "modalJoeWordInput" ) {
        // do nothing, else
      } else {
  
      //}
        if(event.target.classList.contains("modalselectquestionnairequestion")) {
          row = getTheSelected (event) ;
          let questionForQuestionnaire = [row.dataset.store,1,row.dataset.author,1,row.dataset.id] 
          if(questionForQuestionnaire) {
            answer = questionForQuestionnaire 
          }
        }
        modal.style.display = "none";
        document.getElementById("modal-list").innerHTML = "" ;
        /*
          need to use above to console logged variables, if answer is defined, to go to next step, otherwise, return to screen. 
        */
        if(undefined !== answer) {
          let newContent =  row.getElementsByClassName("content")[0] ;
          let replacedContent , temp, temp2 ; 
          if (rule === undefined) {
            replacedContent = theselectedrow.getElementsByClassName("questionAnswerDescription")[0] ;
            temp = `<button class="questionnaireQuestion questionnaireSelectQuestion" type="submit">Select Question</button> <b>Author:&nbsp</b><span class="questionnaireRowQuestionAuthor">${answer[2]}</span>&nbsp <b>ID:&nbsp</b><span class="questionnaireRowQuestionID">${answer[4]}</span><br>` ;
            theselectedrow.dataset.questionnairerowquestionauthor = answer[2];
            theselectedrow.dataset.questionnairerowquestionid = answer[4]
          } else {
            theselectedrow.dataset.questionnairerowruletype = answer[0];
            if(theselectedrow.dataset.questionnairerowruletype === "groupruleStore") {
              theselectedrow.classList.remove("ruleWrapper") ;
              theselectedrow.classList.add("groupruleWrapper")
            } else if(theselectedrow.dataset.questionnairerowruletype === "trueruleStore"){
              theselectedrow.classList.remove("groupruleWrapper") ;
              theselectedrow.classList.add("ruleWrapper")
            }
            theselectedrow.dataset.questionnairerowruleauthor = answer[2];
            theselectedrow.dataset.questionnairerowruleid = answer[4];
            theselectedrow.classList.add("modal-filter-row") ;
            replacedContent = theselectedrow.getElementsByClassName("questionRuleDescription")[0];
            if(answer[0] === "trueruleStore") { // *** needs random condtion removeed when collections are started  *** 
              temp2 = "Display Rule" ;
              //row.className.remove("groupruleWrapper") ;
              //row.className.add("ruleWrapper")
            } else {
              temp2 = "Display Rule Collection" ;
              //row.className.remove("ruleWrapper") ;
              //row.className.add("groupruleWrapper")          
            }
            temp = `<button class="QuestionnaireRule questionnaireSelectRule " type="submit">Select Display Rule or Collection </button> </div><span><b>${temp2}</b><br></span><b>Author:&nbsp</b><span class="questionnaireRowRuleAuthor modal-author">${answer[2]}</span><b>&nbsp ID:&nbsp</b><span class="questionnaireRowRuleID modal-ID">${answer[4]}</span><br>` 
          }     
          replacedContent.innerHTML = temp + newContent.innerHTML 
        }
      }
    }
  }
  
  function browseQuestionsForQuestionnaire ( selectAQuestion, theSelectedRow) { // selectAQuestion contains all data needed to connect to record in database 
    //let selectedQuestionArray ;
    console.log("function browseQuestionsForQuestionnaire ( selectAQuestion, theSelectedRow) {");
    document.getElementById("modaltitle").innerHTML = "Select Question for this row of Questionnaire - browse" ;
    let db, tx, store, allSavedItems;
    let database = selectAQuestion.database;
    let databaseOpenRequest = indexedDB.open(database);
    databaseOpenRequest.onsuccess = () => {
      db = databaseOpenRequest.result ;
      tx = db.transaction( selectAQuestion.tx1 , selectAQuestion.tx2) ;
      store = tx.objectStore(selectAQuestion.store) ;
      allSavedItems = store.getAll() ; // we can put back the cursor approach if needed, it appears the problem was not he cursor, but rather omitting tx.oncomplete
      tx.oncomplete = () => {
        db.close() ;
        //upDateModal(allSavedItems.result , selectAQuestion) ;
        upDateModalForQuestionnaireQuestion(allSavedItems.result , selectAQuestion) ;
        domakeModalForQuestionnaireQuestion(theSelectedRow);  // this needs to change so modal returns correct version; this may mean changing updateModal so it returns the data we need and does not execute the inline function created *** ***  DO ONLY IF REFACTORING AS IT IS NOW WORKING 2020-12-03
      } 
    }
  }
  
  function browseAllData(selectObject, theSelectedRow , workingQuestionnaire) { // selectObject contains all data needed to connect to record in database
    // working Questionnaire is either buildSelectQuestionnaire for make a new questionnaire or useQuestionnaire 
    console.log("function browseAllData(selectObject, theSelectedRow , workingQuestionnaire) {");
    let db, tx, store, allSavedItems;
    let database = selectObject.database;
    let databaseOpenRequest = indexedDB.open(database);
    databaseOpenRequest.onsuccess = () => {
      db = databaseOpenRequest.result ;
      tx = db.transaction( selectObject.tx1 , selectObject.tx2) ;
      //tx2 = db.transaction( selectObject.tx1 , selectObject.tx2) ;
      store = tx.objectStore(selectObject.store) ;
      if(selectObject.index === undefined) {
        allSavedItems = store.getAll()
      } else {
        let myIndex = store.index(selectObject.index); 
        allSavedItems = myIndex.getAll(IDBKeyRange.bound(selectObject.lowwerBound , selectObject.upperBound,true,true))
      } 
      tx.oncomplete = () => {
        db.close() ;
        upDateModal(allSavedItems.result , selectObject , workingQuestionnaire) ;
        //console.log("theSelectedRow(s)");
        //console.log(theSelectedRow);
        makeModal(workingQuestionnaire)  // this needs to change so modal returns correct version; this may mean changing updateModal so it returns the data we need and does not execute the inline function created *** *** 
      }
    }
  }
  /*  
  function getRuleHeader () {
    return 
  }
  */
  function ruleHeader() {
    console.log("function ruleHeader() {");
    let element = document.getElementById("formtitle") ;
       document.getElementById("saveButton").value = " Save Rule " ;
       hideStart() ;
       element.innerText = "Generate Rule" ; //  formtitle    
       element.className = "formtitlerule" ; 
       element = document.getElementById("modaltitle") ;
       element.innerText = "Generate Rule" ; //  modalTitle
       checkDataBase() 
      //}
  }
  
  function doQuestionnaireHeaderPart2 () {
    console.log("function doQuestionnaireHeaderPart2 () {");
    let element = document.getElementById("formtitle") ;
    document.getElementById("saveButton").value = "" ;
    element.innerText = "Generate Questionnaire" ;
    element.className = "formtitlequestionnaire";
    element = document.getElementById("modaltitle") ;
    element.innerText = "Select Questionnaire To Modify - E" ;
    element.className = "formtitlequestionnaire" ;
  }
  
  function doQuestionnaireHeaderPart2ToUse () {
    console.log("function doQuestionnaireHeaderPart2ToUse () {");
    let element = document.getElementById("formtitle") ;
    document.getElementById("saveButton").value = "" ;
    element.innerText = "Generate Questionnaire" ;
    element.className = "formtitlequestionnaire";
    element = document.getElementById("modaltitle") ;
    element.innerText = "Select Questionnaire To Use" ;
    element.className = "formtitlequestionnaire" ;
  }
  
  
  function questionnaireHeader() {
    console.log("function questionnaireHeader() {");
    let element = document.getElementById("formtitle") ;
    if(element.innerText !== "Generate Questionnaire") {
      hideStart() ;
      doQuestionnaireHeaderPart2 () ;
      checkDataBase("questionnaire") 
      }
  }
  
  
  function questionHeader() {
    console.log("function questionHeader() {");
    let element = document.getElementById("formtitle") ;
    if(element.innerText !== "Generate Question") {
      doQuestionHeaderPart2() ;
      checkDataBase() ;
    } 
  }
  
  function doGrouprulePart2() {
    console.log("function doGrouprulePart2() {");
    let element = document.getElementById("formtitle") ;
    document.getElementById("saveButton").value = " Save Group Rule " ;
    hideStart() ;
    element.innerText = "Generate Group Rule" ;
    element.className = "formtitlegrouprule" ; 
    element = document.getElementById("modaltitle") ;
    element.innerText = "Select Group Rule" ;
    element.className = "formtitlegrouprule" ; 
  }
  
  
  function groupRuleHeader() {
    console.log("function groupRuleHeader() {");
    let element = document.getElementById("formtitle") ;
    if(element.innerText !== "Generate Group Rule") {
      doGrouprulePart2()
      checkDataBase() 
    }
  }
  
  function selectGroupRule() {
    console.log("function selectGroupRule() {");
    document.getElementById("process0").textContent = "Select Question Level or Select Group Rule" ; 
    document.getElementById("process1").textContent = "Select Question Level or Select Group Rule-not determined yet" ;
    hideAllWrappers() ;
    doGrouprulePart2() ;
    groupRuleHeader() ;
    let element = document.getElementById("formtitle") ;
    let theName = "ruleWrapper", theHtml = `<div class="gbtext"> 
    Select Display Rule or Collection of Display Rules</div>` ;
    element.className = theName ; 
    element.innerHTML = theHtml ;
    let modalTitle = document.getElementById("modaltitle") ;
    modalTitle.className = theName ;
    modalTitle.innerHTML = theHtml;
    selectRulePart2() 
  }
  
  function checkForSource(theRule) {
    console.log("function checkForSource(theRule) {");
    //console.log("theRule from checkForSource(theRule)") ;
    //console.log(theRule) ;
    const request = indexedDB.open("authorExcuTrust");
    request.onsuccess = function() {
      db = request.result;
      const tx1 = db.transaction("answerStore", "readonly");
      const store1 = tx1.objectStore("answerStore");
      let stored = store1.get(theRule) ;
      tx1.oncomplete = function () {
        let source =  stored.result ;
        //console.log( " source object") ;
        //console.log (source)
      }
    }
  }
  
  function processNewOnlyRules (customer , SCENARIO , savedItems) {
    console.log("function processNewOnlyRules (customer , SCENARIO , savedItems) {");
    //console.log("processNewOnlyRules") ;
    //console.log(savedItems)
    let savedItemsLength = savedItems.length ;
    for (let index = 0; index < savedItemsLength; index++) {
      const theRule = savedItems[index] ;
      checkForSource (customer , SCENARIO , theRule) ;     
    }
  }
  
  
  function processNewTrueRules () {
    console.log("function processNewTrueRules () {");
    // needed for browse selection 
    let  tx, store, allSavedItems;
    let selectObject = {} ;
    selectObject.database = "authorExcuTrust" ;
    selectObject.tx1 = "answerStore" ;
    selectObject.tx2 = "readonly" ;
    selectObject.store = "answerStore" ;
    selectObject.index = "questionDestination" ;
    selectObject.lowwerBound = [0,"trueruleStore"] ; 
    selectObject.upperBound = [0,"trueruleStore"]; 
    let database = selectObject.database;
    let databaseOpenRequest = indexedDB.open(database);
    databaseOpenRequest.onsuccess = () => {
      db = databaseOpenRequest.result ;
      tx = db.transaction( selectObject.tx1 , selectObject.tx2) ;
      //tx2 = db.transaction( selectObject.tx1 , selectObject.tx2) ;
      store = tx.objectStore(selectObject.store) ;
      let myIndex = store.index(selectObject.index); 
      allSavedItems = myIndex.getAllKeys(IDBKeyRange.only([0,"groupruleStore"])) ; // this access to database no longer needed, take out evenutualy
      //console.log("// this access to database no longer needed, take out evenutualy") ;
      tx.oncomplete = () => {
        if(allSavedItems !== undefined) {
          if(allSavedItems.result !== undefined) {
            let newAllSavedItems = JSON.parse(JSON.stringify(allSavedItems.result)) ;
            //console.log (newAllSavedItems) ;
            processNewOnlyRules ("customer" , "SCENARIO" , newAllSavedItems)
          }
        } 
        tx1 = db.transaction( selectObject.tx1 , selectObject.tx2) ;
        store1 = tx1.objectStore(selectObject.store) ;
        let myIndex1 = store1.index(selectObject.index); 
        let allSavedItems1 = myIndex1.getAllKeys(IDBKeyRange.only([0,"trueruleStore"])) ;
        tx1.oncomplete = () => {
          if(allSavedItems1 !== undefined) {  
            if(allSavedItems1.result !== undefined) {
              let newAllSavedItems1 = JSON.parse(JSON.stringify(allSavedItems1.result)) ;
              //console.log (newAllSavedItems1) ;
              processNewOnlyRules ("customer" , "SCENARIO" , newAllSavedItems1)
            } 
          }
        }
      }
    }    
  }
  
  function buildSelectQuestionnairePart1() {
    console.log("function buildSelectQuestionnairePart1() {");
    emptyQuestionnaire()
    document.getElementById("process0").textContent = "Select Questionnaire A"; 
    document.getElementById("process1").textContent = "Select Questionnaire-not yet determined"; 
    doQuestionnaireHeaderPart2ToUse() ;
    selectQuestionnairePart2("buildSelectQuestionnaire") ;
    //return 1
  }
  
  
  function buildSelectQuestionnaire() {
    console.log("function buildSelectQuestionnaire() {");
    menuChoicesToggle(1);
    //setupAnchors () ;
    //buildSelectQuestionnairePart1() 
    emptyQuestionnaire();
    doQuestionnaireHeaderPart2() ;
    selectQuestionnairePart2("useQuestionnaire") ;
    // remember we need to use function getQuestionRowToUse( with all the many vairables) 2021-02-16-12:22
  }
  
  
  function renumberquestionnairedevelopment() {
    console.log("function renumberquestionnairedevelopment() {");
    console.log("renumberquestionnairedevelopment()");
    console.log("*** Not sure when it will be used. 2023-02-28 part A ***");
    menuChoicesToggle(1);
    // array of all elements were class includes numList and delete each element from the DOM
    document.querySelectorAll('.numList').forEach(function(a){
      console.log("*** Not sure when it will be used. 2023-02-28 part B ***");
      console.log("a");
      console.log(a);
      a.remove()
      }) ;
    theListLength = document.getElementsByClassName("rowChoice").length ;
    for (let index = 0; index < theListLength; index++) {
      const element = document.getElementsByClassName("rowChoice")[index];
      let tempIndex = index+1 ;
      let newnum = document.createElement("span") ;
      newnum.classList.add("numList");
      newnum.innerHTML = `Row: ${tempIndex}`;
      element.appendChild(newnum)
    }
  }
  
  
  function OLDselectQuestionnaire() {
    console.log("function OLDselectQuestionnaire() {");
    emptyQuestionnaire() ; // same as brand new questionnaire setup, then it is meant to update each field as a user would for first time. 
    document.getElementById("process0").textContent = "Select Questionnaire - b"; 
    document.getElementById("process1").textContent = "Select Questionnaire-not yet determined"; 
    doQuestionnaireHeaderPart2() ;
    selectQuestionnairePart2() ;
    console.log('document.getElementById("questionnaireAnswerChoices").classList.remove("hidealways")') ;
    document.getElementById("questionnaireAnswerChoices").classList.remove("hidealways")
  }
  
  
  
  function selectQuestionnaire() {
    console.log("function selectQuestionnaire() {");
    emptyQuestionnaire() ; // same as brand new questionnaire setup, then it is meant to update each field as a user would for first time. 
    document.getElementById("process0").textContent = "Select Questionnaire- C"; 
    document.getElementById("process1").textContent = "Select Questionnaire-not yet determined"; 
    doQuestionnaireHeaderPart2() ;
    selectQuestionnairePart2() ;
    console.log('document.getElementById("questionnaireAnswerChoices").classList.remove("hidealways")') ;
    document.getElementById("questionnaireAnswerChoices").classList.remove("hidealways")
  }
  
  function hideEmptyAllWrappers() { // hide and empty saveButton, hide and empty each HTML section with data input fields
    console.log("function hideEmptyAllWrappers() ");
    let temp =  document.getElementById("saveButton") ;
    temp.value = "" ;
    temp.classList.add("hidealways") ;
    hideAllWrappers() ;
    // following to be replaced by sessionStorage
    document.getElementById("process0").textContent = "?" ;
    document.getElementById("process1").textContent = "?" ;
    document.getElementById("process2").textContent = "?" ;
    document.getElementById("process2Count").textContent = 0 
  }
  
  function emptyQuestionnaire() {
    console.log("function emptyQuestionnaire() {");
    menuChoicesToggle(1);
    hideEmptyAllWrappers() ; 
    document.getElementById("process0").textContent = "New Questionnaire" ;
    document.getElementById("process1").textContent = "modifyQuestionnaireOptions" ;
    document.getElementById("process2").textContent = "" ;
    document.getElementById("questionnaireWrapper").innerHTML = getQuestionnaireWrapper() ;
    document.getElementById("questionnaireWrapper").classList.remove("hidealways") ;
    questionnaireHeader() ; // *** NOT SURE NEEDED
    getQuestionnaireSubHeaderAndRows ();
    document.getElementById('process2').textContent = "emptyEvents" ;
    fixQuestionnaireMissing()
  }
  
  function selectQuestionForRuleToggleCloseWrapper() {
    console.log("function selectQuestionForRuleToggleCloseWrapper() {");
    // used to control workflow
    let elementA = document.getElementById("testForChange2") ;
    let theToggle = elementA.textContent; 
    let temporary = "▌╪█questionForSingleRuleStarted" ;
    if( theToggle === temporary) {
      elementA.textContent = "▌╪█this will not be keyed ▐▀▀▐▌▄█ by customers everü┌▌╪█  questionForSingleRuleCompleted" ;
      //document.getElementById("questionWrapper").classList.add("hidealways");
      document.getElementById("questionWrapper").innerHTML = " Note to Programmer. Hide this, if all else works, when testing is complete and hide workflow commands from user."
    }
  }
  
  
  
  function selectQuestionForRuleToggle() {
    // used to control workflow
    let elementA = document.getElementById("testForChange2") ;
    let theToggle = elementA.textContent; 
    let temporary = "▌╪█questionForSingleRuleStarted" ;
    if( theToggle === temporary) {
      elementA.textContent = "▌╪█this will not be keyed ▐▀▀▐▌▄█ by customers everü┌▌╪█  questionForSingleRuleCompleted"
    } else {
      elementA.textContent = temporary
    }
  }
  
  function selectQuestionForRule() {
    console.log("function selectQuestionForRule() {");
    selectQuestionForRuleToggle() ;
    selectQuestionPart2("questionForSingleRule") 
  }
  
  function emptyRule31() {
    console.log("function emptyRule31() {");
    menuChoicesToggle(1);
    console.log("function emptyRule31()");
    hideEmptyAllWrappers() ; // done in newempty
    document.getElementById("ruleWrapper").innerHTML = getRuleWrapper() ; // done in newempty
    document.getElementById("ruleWrapper").classList.remove("hidealways") ;
    //document.getElementById("ruleQuestionWrapper").classList.add("hidealways") ;
    document.getElementById("ruleQuestionWrapper").innerHTML = getQuestionWrapper() ;  // done in newempty
    console.log("function emptyRule31()");
    getQuestionWrapperPart2 () ;  // done in newempty
    document.getElementById("ruleQuestionWrapper").classList.add("hidealways") ;
    document.getElementById("questionWrapper").classList.add("hidealways") ;
    //modifyTrueRule()
    //emptyQuestion() ;
    //emptyQuestion() ;
    modifyTrueRule() ;
    document.getElementById("process0").textContent = "New Question Level Rule" ;
    //document.getElementById("process1").textContent = "emptyRule()-not yet determined" ;
    document.getElementById("testForChange").classList.remove("firstRequiredExplanation") ; //20200715 to be refactored
    //document.getElementById("makeRuleCopy").checked = false ;
    document.getElementById("makeCopy").checked = false ;
    //getRuleWrapper() ;
    ruleHeader() ;
    document.getElementById("questionAnswerChoices").innerHTML = getQuestionAnswerChoices() ;
    //clearAuthorIDcontent() ;
    trimCapNoFormatting();
    fixMissing() ;
    allShowGroup (false, "deleteBtn2") ;// not sure why 
  }
  
  function modifyTrueRule() {
    console.log("function modifyTrueRule() {");
    document.getElementById("process1").textContent = "modifyRuleDisabledTrueFalse" ;
    document.getElementById("saveButton").value = getQuestionLevelRuleButton() ;
    document.getElementById("process0").textContent = "New Question Level Rule" ;
  }
  
  function newemptyQuestion() {
    console.log("function newemptyQuestion() {");
    sessionStorage.setItem("currentprocess", "newQuestion");
    menuChoicesToggle(1);
    console.log("function newemptyQuestion()");
    hideEmptyAllWrappers() ; // done in emptyRule31, done in emptyQuestionnaire
    document.getElementById("process0").textContent = "New Question" ;
    document.getElementById("process1").textContent = "modifyQuestionOptions" ;
    document.getElementById("process2").textContent = "" ;
    document.getElementById("questionWrapper").innerHTML = getQuestionWrapper() ; // done in emptyRule31, done in done in emptyQuestionnaire
    document.getElementById("questionAuthor").innerHTML = document.getElementById("testForChange").dataset.currentuser;
    getQuestionWrapperPart2() ; // done in emptyRule31
    document.getElementById("makeCopy").checked = false ;
    questionHeader() ;
    doQuestionHeaderPart2() ;
    document.getElementById("questionAnswerChoices").innerHTML = getQuestionAnswerChoices() ;
     //  document.getElementById('process2').textContent = "emptyEvents" ;
    // setupEvents() ;
    //clearAuthorIDcontent() ;
    //trimCapNoFormatting();
    document.getElementById("questionAnswerChoicesHeader").innerHTML = "" ;
    document.getElementById("questionAnswerChoices").innerHTML = "" ;
    document.getElementById('process2').textContent = "emptyEvents" ;
    //setupEvents() ;
    fixMissing() ;
    unlockAll() ;
  }
  
  function doSameAllAuthorStartButtons (buttonTitle) { 
    console.log("function doSameAllAuthorStartButtons (buttonTitle) { ");
    // cache buttonClicked  information to be used to later add correct data input fields and apply correct formatting
    //sessionStorage.setItem('buttonaction', buttonTitle);
    hideEmptyAllWrappers() ;   // hide and empty all HTML with data input fields
    document.getElementById("formtitle").innerText = buttonTitle // change title on header
  }
  
  function saveNewScreenButtonClicked(event,buttonTitle) { // setup screen for new question
    console.log("function saveNewScreenButtonClicked(event,buttonTitle) { ") ;
    console.log("buttonTitle:");
    console.log(buttonTitle);
    hideEmptyAllWrappers() ;   // hide and empty all HTML with data input fields
    console.log(event);
    document.getElementById("formtitle").innerText = event.target.defaultValue // change title on header
    //doSameAllAuthorStartButtons (buttonTitle) ;
    //return
    newemptyQuestion()
  }
  
  function getProcess2Count() { // *** not needed permanently, only needed to test events, not events add duplicate lines but do not delete more than one lines, so perhaps events are good enough
    console.log("function getProcess2Count() {") ;
    let count = document.getElementById('process2').value * 1 ;
    if (document.getElementById('process2').value === "emptyEvents") {
      count = 0
    }
    count = count + 1 ;
    document.getElementById('process2').textContent = count 
  }
  
  function getQuestionLevelRuleButton() {
    console.log("function getQuestionLevelRuleButton() {") ;
    return "Save Changes to Display Rule"
  }
  
  function doQuestionHeaderPart2() {
    console.log("function doQuestionHeaderPart2() {") ;
    let element = document.getElementById("formtitle") ;
    document.getElementById("saveButton").value = " Save Question " ;
      hideStart() ;
      //element.innerText = "Generate Question" ;
      element.className = "formtitlequestion" ; 
      element = document.getElementById("modaltitle") ;
      element.innerText = "Select Question" ;
      element.className = "formtitlequestion" 
  }
  
  
  function hideAllWrappers() {
    console.log("function hideAllWrappers() {");
     // all wrappers  - questionnaireWrapper,groupruleWrapper,ruleWrapper,questionWrapper are hidden and made = to "", 
    let allwrappers = ["questionnaireWrapper","groupruleWrapper","ruleWrapper","questionWrapper","firstGrid1"] ;
    for (let index = 0; index < allwrappers.length; index++) {
      let element = allwrappers[index];
      let element2 = document.getElementById(element)  ;
      element2.classList.add("hidealways") ;
      //element2.classList.remove("hidealways") ; // *** *** 2020-11-27
      element2.innerHTML = ""
    }
  }
  
  function getRuleWrapper() {
    console.log("function getRuleWrapper()");
    return `          <div id="ruletitle" class="ruletitle"><h2 >Display Rule based on Question:</h2></div>
    <div class="container"  id="ruleAuthorContent">  <!-- Class information, may not be needed  -->
    <!-- ***
      <input class="btn btn-danger saver" type="Button" onclick= "lockAll()" id="preventRuleAllChanges" value="">            
      <input class="btn btn-warning" type="Button" onclick= "unlockAll()"  id="allowRuleAllChanges"value="">  
    -->
      <input type="checkbox" value="false" id="makeRuleCopy" class="hidealways hidealways2" >
      <div class="row">
        <div class="bg-white text-primary questionQuestionID col-3 mt-1"><input type="checkbox" class="checkboxNoChange hidealways2" disabled="true">&nbspAUTHOR:</div>
        <div id="ruleAuthor" class="center questionQuestionContent required missing col-2 m-1"  contenteditable="true" onfocus ="focusFormattingAuthor()" onblur="trimCapNoFormattingAuthor()"></div>  
    </div>
    <div class="row">
      <div class="bg-white text-primary  col-3 mt-1 questionQuestionID"><input type="checkbox" class="checkboxNoChange hidealways2" disabled="true">&nbsp ID:</div>
      <div id="ruleID" class="center col-2 m-1 questionQuestionContent required missing focusFormattingID"  contenteditable="true" onblur="trimCapNoFormattingID()"></div>
    </div>
      <div class="row">
        <div class="bg-white text-primary  col-3 mt-1 questionQuestionID"><input type="checkbox" class="checkboxNoChange hidealways2" disabled="true">&nbspFormattable Title:</div>
        <div id="ruleContent" class="center col-8 mt-1 questionQuestionContent required missing"  contenteditable="true"  onblur="trimCapNoFormatting()"></div></div> <br>
        <input id="selectChangeButtonForRule" type="Button" class="btn btn-outline-dark btext" onclick= "selectQuestionForRule()" value=" Select / Change Question for Rule">
      <div id="ruleQuestionWrapper" class="questionWrapper"> 
        <div >
          Place for question relating to true rule - NEED TO MAKE BROWSE !   Place for question relating to true rule - NEED TO MAKE BROWSE !   Place for question relating to true rule - NEED TO MAKE BROWSE ! Place for question relating to true rule - NEED TO MAKE BROWSE !Place for question relating to true rule - NEED TO MAKE BROWSE !Place for question relating to true rule - NEED TO MAKE BROWSE !
        </div>
        </div>
        <br>
    </div>` 
    document.getElementById("ruleWrapper").innerHTML = getRuleWrapper0() ;
    getQuestionWrapper() ;
    ruleHeader() ;
    document.getElementById("ruleWrapper").classList.remove("hidealways")
  }
  
  function getQuestionnaireWrapper() {
    console.log("function getQuestionnaireWrapper() {");
    let temp = `
    <h2 id="questionnairetitle" class="questionnairetitle">Questionnaire: </h2>
    <div class="container"  id="questionnaireAuthorContent">
        <div class="row">
            <div class="bg-white text-primary col-3 mt-1">
                <input type="checkbox" class="checkboxNoChange hidealways" disabled="true">&nbspAUTHOR:
            </div>
            <div id="questionnaireAuthor" class="center questionnaireQuestionContent required missing col-2 m-1"  contenteditable="true" onfocus ="focusFormattingAuthor('questionnaire')" onblur="trimCapNoFormattingAuthor('questionnaire')"></div>
        </div>
        <div class="row">
            <div class="bg-white text-primary  col-3 mt-1">
                <input type="checkbox" class="checkboxNoChange hidealways" disabled="true">&nbsp ID:
            </div>
            <div id="questionnaireID" class="center col-2 m-1 questionnaireQuestionContent required missing focusFormattingID"  contenteditable="true" onblur="trimCapNoFormattingID('questionnaire')"></div>
        </div>
        <div class="row">
            <div class="bg-white text-primary  col-3 mt-1">
                <input type="checkbox" class="checkboxNoChange hidealways" disabled="true">&nbspFormattable Content:
            </div>
            <div id="questionnaireContent" class="center col-8 mt-1 questionnaireQuestionContent required missing"  contenteditable="true"  onblur="trimCapNoFormatting()"></div>
        </div>
        <div class="row">
                &nbsp &nbsp &nbsp &nbsp Formattable  - Format / remove format of selected text with [Ctrl] key and u - underline;  b - bold; i - italics ;  <br>&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp [Shift][Enter] to insert a new line and use spacebar to manage spacing
        </div>
        <div class="container saver">
            <div id = "questionnaireAnswerChoicesHeader" class="row hidealways questionwrapper"></div>
        </div>
    </div>
    <ul id="questionnaireAnswerChoices" class="hidealways questionnaireanswerchoices">id is questionnaireAnswerChoices
    </ul>
    `;
    return temp  
  }
  
  
  function getQuestionWrapper() {
    console.log("function getQuestionWrapper()");
    return `
    <h2 id="questiontitle" class="questiontitle">Question: </h2>
    <div class="container"  id="questionHeader20200707">
    <input class="btn btn-danger saver" type="Button" onclick= "lockAll()" value='***1 Prevent All Changes' id="preventAllChanges">
      <input class="btn btn-warning" type="Button" onclick= "unlockAll()" value='*** 2 Allow all changes other than Author, ID or Formattable Content'id="allowAllChanges">
      <input type="checkbox" value="false" id="makeCopy" class="hidealways">
    </div>
    <div class="container"  id="questionAuthorContent">
        
        
        <div class="row">
            <div class="bg-white text-primary col-3 mt-1">
                <input type="checkbox" class="checkboxNoChange hidealways" disabled="true">&nbspAUTHOR:
            </div>
            <div id="questionAuthor" class="center questionQuestionContent required col-2 m-1"  contenteditable="false" ></div>
        </div>
        <div class="row">
            <div class="bg-white text-primary  col-3 mt-1">
                <input type="checkbox" class="checkboxNoChange hidealways" disabled="true">&nbsp ID:
            </div>
            <div id="questionID" class="center col-2 m-1 questionQuestionContent required missing focusFormattingID"  contenteditable="true" onblur="trimCapNoFormattingID()"></div>
        </div>
        <div class="row">
            <div class="bg-white text-primary  col-3 mt-1">
                <input type="checkbox" class="checkboxNoChange hidealways" disabled="true">&nbspFormattable Content:
            </div>
            <div id="questionContent" class="center col-8 mt-1 questionQuestionContent required missing"  contenteditable="true"  onblur="trimCapNoFormatting()"></div>
        </div>
        <div class="row">
                &nbsp &nbsp &nbsp &nbsp Formattable  - Format / remove format of selected text with [Ctrl] key and u - underline;  b - bold; i - italics ;  <br>&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp [Shift][Enter] to insert a new line and use spacebar to manage spacing
            </div>
        <div id="typeOfQuestion20200707" class="container">
            <br><h5 class="bg-white text-primary">Type of Question:</h5>
            <div  id ="questionTypeDiv" class="missing" >
                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                    <div class="col-12">
                        <p id = "allChoiceTypes" >
                        <div><b> 4 of 4 Multiple Choice:</b> (retains all choices, if any, listed below)<br>
    <label class="btn btn-outline-secondary" for="questionTypeDiv_radio">
        <input type="radio" id="questionTypeDiv_radio" name="questionTypeDiv" class="questionTypeDivList" value="questionTypeDiv_radio" onclick="trueTypeQuestion()">&nbsp Radio Button- used for short lists, generally less than 5 choices *** 2 0f 2 (&#128280;)
    </label>
    <br>
    <label class="btn btn-outline-secondary" for="questionTypeDiv_modal">
        <input type="radio" id="questionTypeDiv_modal" name="questionTypeDiv" class="questionTypeDivList" value="questionTypeDiv_modal" onclick="trueTypeQuestion()">&nbsp Modal - used for long and filtered lists
    </label>
    <br>
    <label class="btn btn-outline-secondary" for="questionTypeDiv_dropdown">
        <input type="radio" id="questionTypeDiv_dropdown" name="questionTypeDiv" class="questionTypeDivList" value="questionTypeDiv_dropdown" onclick="trueTypeQuestion()">&nbsp Drop Down - used for short lists, generally less than 20 choices
    </label>
  </div>
  <b>Other:</b> (clears all choices, if any, listed below) <br>
  <label class="btn btn-outline-secondary" for="questionTypeDiv_checkbox">
    <input type="radio" id="questionTypeDiv_checkbox" name="questionTypeDiv"            class="questionTypeDivList" value="questionTypeDiv_checkbox" onclick="trueTypeQuestion()">&nbsp Check Box<br>(&#9745;)
  </label>
  <label class="btn btn-outline-secondary" for="questionTypeDiv_date">
    <input type="radio" id="questionTypeDiv_date" name="questionTypeDiv" class="questionTypeDivList" value="questionTypeDiv_date" onclick="trueTypeQuestion()" >&nbsp Calendar / date<br>(&#128197;)
  </label>
  <label class="btn btn-outline-secondary" for="questionTypeDiv_datetime-local">
    <input type="radio" id="questionTypeDiv_datetime-local" name="questionTypeDiv" class="questionTypeDivList" value="questionTypeDiv_datetime-local" onclick="trueTypeQuestion()" >&nbsp Local Time<br>(&#x1F550;)
  </label>
  <label class="btn btn-outline-secondary" for="questionTypeDiv_email">
    <input type="radio" id="questionTypeDiv_email" name="questionTypeDiv" class="questionTypeDivList" value="questionTypeDiv_email" onclick="trueTypeQuestion()">&nbsp Email<br>(<b>@</b>&#9993;)
  </label>
  <label class="btn btn-outline-secondary" for="questionTypeDiv_file">
    <input type="radio" id="questionTypeDiv_file" name="questionTypeDiv" class="questionTypeDivList" value="questionTypeDiv_file" onclick="trueTypeQuestion()">&nbsp File (browse to choose a file)
  </label>
  <label class="btn btn-outline-secondary" for="questionTypeDiv_month">
    <input type="radio" id="questionTypeDiv_month" name="questionTypeDiv" class="questionTypeDivList" value="questionTypeDiv_month" onclick="trueTypeQuestion()" >&nbsp Month and Year
  </label>
  <label class="btn btn-outline-secondary" for="questionTypeDiv_number">
    <input type="radio" id="questionTypeDiv_number" name="questionTypeDiv" class="questionTypeDivList" value="questionTypeDiv_number" onclick="trueTypeQuestion()">&nbsp Number
  </label>
  <label class="btn btn-outline-secondary" for="questionTypeDiv_password">
    <input type="radio" id="questionTypeDiv_password" name="questionTypeDiv" class="questionTypeDivList" value="questionTypeDiv_password" onclick="trueTypeQuestion()">&nbsp Password
  </label>
  <label class="btn btn-outline-secondary" for="questionTypeDiv_tel">
    <input type="radio" id="questionTypeDiv_tel" name="questionTypeDiv" class="questionTypeDivList" value="questionTypeDiv_tel" onclick="trueTypeQuestion()">&nbsp Telephone<br>(&#128222;)
  </label>
  <label class="btn btn-outline-secondary" for="questionTypeDiv_text">
    <input type="radio" id="questionTypeDiv_text" name="questionTypeDiv" class="questionTypeDivList" value="questionTypeDiv_text" onclick="trueTypeQuestion()">&nbsp Text
  </label>
  <label class="btn btn-outline-secondary" for="questionTypeDiv_url">
    <input type="radio" id="questionTypeDiv_url" name="questionTypeDiv" class="questionTypeDivList" value="questionTypeDiv_url" onclick="trueTypeQuestion()">&nbsp url
  </label>
  <label class="btn btn-outline-secondary" for="questionTypeDiv_week">
    <input type="radio" id="questionTypeDiv_week" name="questionTypeDiv" class="questionTypeDivList" value="questionTypeDiv_week" onclick="trueTypeQuestion()">&nbsp week
  </label>
  <label class="btn btn-outline-secondary" for="questionTypeDiv_na">
    <input type="radio" id="questionTypeDiv_na" name="questionTypeDiv" class="questionTypeDivList" value="questionTypeDiv_na" onclick="trueTypeQuestion()">&nbsp Not Applicable, Used for information purposes
  </label>
  <label class="btn btn-outline-secondary" for="questionTypeDiv_naExplained">
    <input type="radio" id="questionTypeDiv_naExplained" name="questionTypeDiv" class="questionTypeDivList" value="questionTypeDiv_naExplained" onclick="trueTypeQuestion()">&nbsp Not Applicable, Used for requesting an explanation only
  </label>
                        </p>
                    </div>
                </div>
            </div>
            <div class="row">
                <h5 class="bg-white text-primary">Question rules:</h5>
            </div>
            <div class="row">
                <div class="bg-white text-primary  col-6 mt-1">
                &nbsp&nbsp&nbsp&nbsp&nbsp Answer required:&nbsp
                    <div class="btn-group" data-toggle="buttons">          
                      <label class="btn btn-default"><br>
                        <input type="checkbox" autocomplete="off" id="questionUnansweredComplete">
                        <span class="glyphicon glyphicon-ok"></span>
                      </label>	
                    </div>
                </div>
            </div>
            <!--<div class="row">-->
                <div class="bg-white text-primary  col-6 mt-1 questionQuestionID">
                    &nbsp&nbsp&nbsp&nbsp&nbsp Explanation required if <u>Unanswered</u>:&nbsp&nbsp
                    <div class="btn-group" data-toggle="buttons">          
                      <label class="btn btn-default"><br>
                      <input type="checkbox" autocomplete="off" id="questionUnansweredRequiresExplanation" >
                        <span class="glyphicon glyphicon-ok"></span>
                      </label>	
                    </div><br>
                    &nbsp&nbsp&nbsp&nbsp&nbsp Explanation required if<u>Answered</u>:&nbsp
                    <div class="btn-group" data-toggle="buttons">          
                      <label class="btn btn-default"><br>
                      <input type="checkbox" autocomplete="off" id="questionAnsweredRequiresExplanation" >
                        <span class="glyphicon glyphicon-ok"></span>
                      </label>	
                    </div>
                </div>
            <!--</div>
            <div class="row">
                ???
            </div>-->
        </div>
        <div class="container saver">
            <div id = "questionAnswerChoicesHeader" class="row"></div>
            <ul id="questionAnswerChoices">
            </ul>
        </div>
    </div>  
    `   
  }
  function getQuestionWrapperPart2() {
    console.log("function getQuestionWrapperPart2()");
    document.getElementById("questionAnswerChoicesHeader").innerHTML = getQuestionAnswerChoicesHeader();
    document.getElementById("questionAnswerChoices").innerHTML = '<hr>'+ getChoiceRow() ;
    document.getElementById("questionWrapper").classList.remove("hidealways") ;
    if(document.getElementById("ruleQuestionWrapper") !== null ) {
      document.getElementById("ruleQuestionWrapper").classList.remove("hidealways") ;
    }
    document.getElementById('process2').textContent = "emptyEvents" ;
    //setupEvents() ;
  }
  
  function getdatetime(dthen) {
    console.log("function getdatetime(dthen) {");
    let toreturn = new Date (dthen) ;
    return toreturn
  }
  
  
  function hideStart() { // display all needed  headings after swtiching to any of choices available to user
    console.log("function hideStart() {");
    let list = document.getElementsByClassName("hidestart") ;
    if(list.length > 0) {
      for (let index = 0; index < list.length; index++) {
        const element = list[index];
        element.classList.remove("hidestart");
      }
    }
  }
  
  
  function selectRule() {
    console.log("function selectRule() {");
    document.getElementById("process0").textContent = "selectRule()" ;
    document.getElementById("process1").textContent = "selectRule()-not yet determined" ;
    ruleHeader() ;
    let selectObject = getTrueruleRead() ;
    browseAllData(selectObject)
  }
  
  function selectQuestion() {
    document.getElementById("process0").textContent = "Select Question" ;
    document.getElementById("process1").textContent = "modifyQuestionOptions" ;
    hideAllWrappers() ; 
    doQuestionHeaderPart2() ;
    selectQuestionPart2() ;
  }
  
  function selectQuestionnairePart2(workingQuestionnaire) {
    console.log("function selectQuestionnairePart2(workingQuestionnaire) {");
    let selectObject = {} ;
    selectObject.database = "authorExcuTrust" ;
    selectObject.tx1 = "questionnaireStore" ;
    selectObject.tx2 = "readonly" ;
    selectObject.store = "questionnaireStore" ;
    selectObject.index = "versionDateSince1969" ;
    selectObject.lowwerBound = 0 ; 
    selectObject.upperBound = Date.now() ; 
    browseAllData(selectObject , undefined , workingQuestionnaire) 
  }
  
  
  
  function selectQuestionPart2(questionForSingleRule) {
    console.log("function selectQuestionPart2(questionForSingleRule) {");
    let selectObject = {} ;
    selectObject.database = "authorExcuTrust" ;
    selectObject.tx1 = "questionStore" ;
    selectObject.tx2 = "readonly" ;
    selectObject.store = "questionStore" ;
    browseAllData(selectObject, questionForSingleRule) 
  }
  
  function selectRulePart2() {
    console.log("function selectRulePart2() {");
    let selectObject = {} ;
    selectObject.database = "authorExcuTrust" ;
    selectObject.tx1 = "ruleStore" ;
    selectObject.tx2 = "readonly" ;
    selectObject.store = "ruleStore" ;
    browseAllData(selectObject)
  }
  
  function makeModal2(questionWords)  {
    console.log("function makeModal2(questionWords)  {");
    if(questionWords === undefined) {
      document.getElementById("modaltitle").innerHTML = "PlaceHolder for Question"
    } else {
      document.getElementById("modaltitle").innerHTML = questionWords
    }  
    document.getElementById("modal-body-2").classList.remove("hidealways2");
    document.getElementById("modal-body-1").classList.add("hidealways2");
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    span.onclick = function() {
      modal.style.display = "none";
      document.getElementById("modal-body-2").classList.add("hidealways");
      document.getElementById("modal-body-1").classList.remove("hidealways")
    }
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
        document.getElementById("modal-body-2").classList.add("hidealways");
        document.getElementById("modal-body-1").classList.remove("hidealways")
        //modal.innerHTML = ""
      }
    }
  }
  
  function makeModal(workingQuestionnaire)  {
    console.log("function makeModal(workingQuestionnaire)  {");
    /*
    if( workingQuestionnaire === "useQuestionnaire") {
      alert ( "function makeModal(workingQuestionnaire questionnaire to use 4619")
    }
    */
    // Get the modal
    var modal = document.getElementById("myModal");
    // Get the button that opens the modal
    //var btn = document.getElementById("myBtn");
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    // When the user clicks the button, open the modal 
    //btn.onclick = function() {
    modal.style.display = "block";
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";  //*** 
      //modal.innerHTML = ""
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
        //modal.innerHTML = ""
      }
    }
  }
  
  function resetFlag (event, change) {
    console.log("function resetFlag (event, change) {");
    let theSelectedRow = getTheSelected (event) ;
    resetFireStoreFlag (theSelectedRow , change) //  setFlag exists, in variable change
  }
  
  function compareArrays ( array1, array2) {
    console.log("function compareArrays ( array1, array2) {");
    if( array1.length !== array2.length ) {
      return false
    } else {
      for (let index = 0; index < array1.length; index++) {
        if( array1[index] !== array2[index]) {
          return false
        } 
      }
    }
    return true
  }
  
  function saveAnswerLogicIndexedDBOnly (newObject) {
    console.log("function saveAnswerLogicIndexedDBOnly (newObject) {");
    let databaseOpenRequest = indexedDB.open("authorExcuTrust");
    databaseOpenRequest.onsuccess = function () {
      let db = databaseOpenRequest.result ;
      let tx = db.transaction( "answerStore", "readwrite") ;
      let store = tx.objectStore("answerStore") ;
      store.put(newObject) /*;
      tx.oncomplete = function () {
        return
      } */
    }
  }
  
  function checkMultiLevelItem( keyPathValue , ruleTrueFalse, parent, preSave , parent2 ) {
    console.log("function checkMultiLevelItem( keyPathValue , ruleTrueFalse, parent, preSave , parent2 ) {");
    console.log("keyPathValue") ;
    console.log(keyPathValue) ;
    console.log("ruleTrueFalse to update preSave and possibly already saved ruleTrueFalse") ;
    console.log(ruleTrueFalse) ;
    console.log ("parent to match in question.Destination") ;
    console.log(parent);
    console.log ("parent2 to match in question.Destination") ;
    console.log(parent2);
    console.log("preSave") ;
    console.log(preSave)
  }
  
  function doMultiLevelItem( keyPathValue , ruleTrueFalse, parent, parent2) {
    console.log("function doMultiLevelItem( keyPathValue , ruleTrueFalse, parent, parent2) {");
    let preSave ;
    let databaseOpenRequest = indexedDB.open("authorExcuTrust");
    databaseOpenRequest.onsuccess = function () {
      let db = databaseOpenRequest.result ;
      let tx = db.transaction( "answerStore", "readonly") ;
      let store = tx.objectStore("answerStore") ;
      let temp = store.get(keyPathValue) ;
      tx.oncomplete = function () {
        preSave = temp.result ;
        checkMultiLevelItem( keyPathValue , ruleTrueFalse, parent, preSave , parent2 )
      }
    }
  }
  
  function multiLevelRuleTrueFalseUpdate (childLevelNewKeyPathValuesAndNewRuleTrueFalse , grandChildLevelNewKeyPathValuesAndNewRuleTrueFalse , parent ) {
    console.log("function multiLevelRuleTrueFalseUpdate (childLevelNewKeyPathValuesAndNewRuleTrueFalse , grandChildLevelNewKeyPathValuesAndNewRuleTrueFalse , parent ) {");
    // when starting here, neither child nor grandchildren, if any, have been updated, 
    if(grandChildLevelNewKeyPathValuesAndNewRuleTrueFalse === undefined) {
      grandChildLevelNewKeyPathValuesAndNewRuleTrueFalse = [] ;
    }
    if(childLevelNewKeyPathValuesAndNewRuleTrueFalse === undefined) {
      childLevelNewKeyPathValuesAndNewRuleTrueFalse = [] ;
    } else {
      grandChildLevelNewKeyPathValuesAndNewRuleTrueFalse.push(childLevelNewKeyPathValuesAndNewRuleTrueFalse[0])
    }
    if(grandChildLevelNewKeyPathValuesAndNewRuleTrueFalse.length === 0) {
      console.log(" child and all granchildren processed") ;
      return
    }
    console.log("JSON.parse(JSON.stringify(grandChildLevelNewKeyPathValuesAndNewRuleTrueFalse))");
    console.log("JSON.parse(JSON.stringify(grandChildLevelNewKeyPathValuesAndNewRuleTrueFalse))");
    console.log("JSON.parse(JSON.stringify(grandChildLevelNewKeyPathValuesAndNewRuleTrueFalse))");
    console.log(JSON.parse(JSON.stringify(grandChildLevelNewKeyPathValuesAndNewRuleTrueFalse)));
    let itemultiLevelRuleTrueFalseUpdate = grandChildLevelNewKeyPathValuesAndNewRuleTrueFalse.shift() ;
    console.log("childLevelNewKeyPathValuesAndNewRuleTrueFalse");
    console.log(childLevelNewKeyPathValuesAndNewRuleTrueFalse);
    console.log("grandChildLevelNewKeyPathValuesAndNewRuleTrueFalse") ;
    console.log(grandChildLevelNewKeyPathValuesAndNewRuleTrueFalse);
    console.log("itemultiLevelRuleTrueFalseUpdate") ;
    console.log(itemultiLevelRuleTrueFalseUpdate) ;
    const GRTFdatabaseOpenRequest = indexedDB.open("authorExcuTrust");
    GRTFdatabaseOpenRequest.onsuccess = function () {
      let GRTFdb = GRTFdatabaseOpenRequest.result ;
      let txgroupTF = GRTFdb.transaction( "answerStore", "readonly") ;
      let storetxgroup = txgroupTF.objectStore("answerStore") ;
      let myIndexgroupTF = storetxgroup.index("questionDestination"); 
      console.log(itemultiLevelRuleTrueFalseUpdate.keyPathValue) ;
      let sourceKeys = myIndexgroupTF.getAllKeys(IDBKeyRange.only(itemultiLevelRuleTrueFalseUpdate.indexValue)) ;
      txgroupTF.oncomplete = function () {
        let newSourceKeys = sourceKeys.result ;
        if(newSourceKeys.length) {
          for (let index = 0; index < newSourceKeys.length; index++) {
            const element = newSourceKeys[index];
            let newSourceItem = {} ;
            newSourceItem.parent = itemultiLevelRuleTrueFalseUpdate.indexValue ;
            newSourceItem.indexValue = element ;
            newSourceItem.ruleTrueFalse = itemultiLevelRuleTrueFalseUpdate.ruleTrueFalse ;
            console.log("grandChildLevelNewKeyPathValuesAndNewRuleTrueFalse.push(newSourceItem)");
            grandChildLevelNewKeyPathValuesAndNewRuleTrueFalse.push(newSourceItem) ;
            
          }
          console.log("grandChildLevelNewKeyPathValuesAndNewRuleTrueFalse") ;
          console.log(grandChildLevelNewKeyPathValuesAndNewRuleTrueFalse) ;
          doMultiLevelItem( itemultiLevelRuleTrueFalseUpdate.indexValue , itemultiLevelRuleTrueFalseUpdate.ruleTrueFalse , itemultiLevelRuleTrueFalseUpdate.indexValue , itemultiLevelRuleTrueFalseUpdate)  }
      }
      let temp = undefined ;
      multiLevelRuleTrueFalseUpdate (temp , grandChildLevelNewKeyPathValuesAndNewRuleTrueFalse , parent )
    }
  }
  
  function saveRuleTrueFalseUpdate (newObject , parent) {
    console.log("function saveRuleTrueFalseUpdate (newObject , parent) {");
    let ruleTrueFalseByLogic; 
    let childLevelNewKeyPathValuesAndNewRuleTrueFalse = [] ;
    console.log ("function saveRuleTrueFalseUpdate (newObject)") ;
    console.log ("  tobject BEFORE processing new answer ") ;
    let tobject = JSON.parse(JSON.stringify(newObject)) ;
    console.log (tobject) ; 
    if(newObject.all0Any1True) {
      ruleTrueFalseByLogic  = false ;
      // all must be true for newObject.ruleTrueFalse to be true
      for (let index = 0; index <  newObject.trueFalseValues.length; index++) {
        const element = newObject.trueFalseValues[index] ;
        if( element) {
          ruleTrueFalseByLogic = true ;
          index = newObject.trueFalseValues.length
        }
      }
    } else {
      // any true newObject.ruleTrueFalse to be true
      ruleTrueFalseByLogic  = true ;
      for (let index = 0; index <  newObject.trueFalseValues.length; index++) {
        const element = newObject.trueFalseValues[index] ;
        if( element !== true) {
          ruleTrueFalseByLogic = false ;
          index = newObject.trueFalseValues.length
        }
      }
    }
    if(ruleTrueFalseByLogic) {
      if (newObject.ruleTrueFalse !== true) {
        console.log("*** newObject.ruleTrueFalse !== true ***") ;
        newObject.ruleTrueFalse = true ; 
        console.log(newObject) ;
        let newIndexValueAndRuleTrueFalse = {} ;
        newIndexValueAndRuleTrueFalse.indexValue = newObject.keyPathValue ;
        newIndexValueAndRuleTrueFalse.ruleTrueFalse = true ;
        newIndexValueAndRuleTrueFalse.parent = parent ;
        childLevelNewKeyPathValuesAndNewRuleTrueFalse.push(newIndexValueAndRuleTrueFalse) ;
        saveAnswerLogicIndexedDBOnly (newObject) 
      } else {
        saveAnswerLogicIndexedDBOnly (newObject)
      }
    } else {
      if (newObject.ruleTrueFalse === true) {
        console.log("*** newObject.ruleTrueFalse === true ***") ;
        newObject.ruleTrueFalse = false ;
        console.log(newObject) ;
        let newIndexValueAndRuleTrueFalse = {} ;
        newIndexValueAndRuleTrueFalse.indexValue = newObject.keyPathValue ;
        newIndexValueAndRuleTrueFalse.ruleTrueFalse = true ;
        newIndexValueAndRuleTrueFalse.parent = parent ;
        childLevelNewKeyPathValuesAndNewRuleTrueFalse.push(newIndexValueAndRuleTrueFalse) ;
        saveAnswerLogicIndexedDBOnly (newObject)
      } else {
        saveAnswerLogicIndexedDBOnly (newObject)
      }
    }
    if(childLevelNewKeyPathValuesAndNewRuleTrueFalse.length) {
      multiLevelRuleTrueFalseUpdate (childLevelNewKeyPathValuesAndNewRuleTrueFalse)
    }
  }
  
  
  
  function compareAndProcessAnswerChange (ruleTrueFalse , newObject, groupKeyPathValueIndex ) {
    console.log("function compareAndProcessAnswerChange (ruleTrueFalse , newObject, groupKeyPathValueIndex ) {");
    let listLength = newObject.questionDestination.length ;
    //console.log("listLength") ;
    //console.log(listLength) ;
    for (let index = 0; index < listLength; index++) {
      const matchedSource = newObject.questionDestination[index] ;
      let arraysMatch  = compareArrays ( matchedSource, groupKeyPathValueIndex)
      if( arraysMatch) {
        let oldTrueFalseValue = newObject.trueFalseValues[index] ;
        if(ruleTrueFalse) {
          if(oldTrueFalseValue !== true) {
            newObject.trueFalseValues[index] = true ;
            saveRuleTrueFalseUpdate (newObject, groupKeyPathValueIndex)
          }
        } else {
          if(oldTrueFalseValue === true) {
            newObject.trueFalseValues[index] = false ;
            saveRuleTrueFalseUpdate (newObject, groupKeyPathValueIndex)
          }
        }
      } 
    }
  }
  
  
  
  function dogroupRuleTrueFalsePart2 ( ruleTrueFalse , newSourceKeyList , groupKeyPathValueIndex ) {
    let newSourceKeyListLength = newSourceKeyList.length ;
    if(newSourceKeyListLength) {
      for (let index = 0; index <  newSourceKeyListLength; index++) {
        const element = newSourceKeyList[index];
        let databaseOpenRequest = indexedDB.open("authorExcuTrust");
        databaseOpenRequest.onsuccess = function () {
          let db = databaseOpenRequest.result ;
          let tx = db.transaction( "answerStore", "readonly") ;
          let store = tx.objectStore("answerStore") ;
          let ruleObject = store.get(element) ;
          tx.oncomplete = function () {
            let newObject = ruleObject.result ;
            compareAndProcessAnswerChange (ruleTrueFalse , newObject ,groupKeyPathValueIndex )
          }
        }
      }
    }
  }
  
  
  
  function dogroupRuleTrueFalse ( ruleTrueFalse , groupKeyPathValueIndex ) {
    console.log("function dogroupRuleTrueFalse ( ruleTrueFalse , groupKeyPathValueIndex ) {");
    /*
    console.log("dogroupRuleTrueFalse ( ruleTrueFalse , groupKeyPathValueIndex ) {") ;
    console.log("dogroupRuleTrueFalse ( ruleTrueFalse , groupKeyPathValueIndex ) {") ;
    console.log("dogroupRuleTrueFalse ( ruleTrueFalse , groupKeyPathValueIndex ) {") ;
    console.log("dogroupRuleTrueFalse ( ruleTrueFalse , groupKeyPathValueIndex ) {") ;
    console.log("dogroupRuleTrueFalse ( ruleTrueFalse , groupKeyPathValueIndex ) {") ;
    console.log ("ruleTrueFalse") ;
    console.log (ruleTrueFalse) ;
    console.log ("groupKeyPathValueIndex") ;
    console.log (groupKeyPathValueIndex) 
    */
    const GRTFdatabaseOpenRequest = indexedDB.open("authorExcuTrust");
    GRTFdatabaseOpenRequest.onsuccess = function () {
  
      //console.log("databaseOpenRequest.onsuccess = () => {") ;
      //console.log("databaseOpenRequest.onsuccess = () => {") ;
      //console.log("databaseOpenRequest.onsuccess = () => {") ;
      //console.log("databaseOpenRequest.onsuccess = () => {") ;
  
      let GRTFdb = GRTFdatabaseOpenRequest.result ;
      let txgroupTF = GRTFdb.transaction( "answerStore", "readonly") ;
      //tx2 = db.transaction( selectObject.tx1 , selectObject.tx2) ;
      let storetxgroup = txgroupTF.objectStore("answerStore") ;
      let myIndexgroupTF = storetxgroup.index("questionDestination"); 
      let sourceKeys = myIndexgroupTF.getAllKeys(IDBKeyRange.only(groupKeyPathValueIndex)) ;
      /*
      sourceKeys.oncomplete = function () {
      }
      */
      txgroupTF.oncomplete = function () {
        //console.log("sourceKeys.oncomplete = function () {") ;
        //console.log("sourceKeys.oncomplete = function () {") ;
        //console.log("sourceKeys.oncomplete = function () {") ;
        //console.log("sourceKeys.oncomplete = function () {") ;
        let newSourceKeys = sourceKeys.result
        //console.log("newSourceKeys") ;
        //console.log(newSourceKeys) ;
        if (sourceKeys !== undefined) {
          let newSourceKeyList = JSON.parse(JSON.stringify(newSourceKeys)) ;
          //console.log("*** newSourceKeyList *** ") ;
          //console.log(newSourceKeyList) ;
          //console.log("*** sourceKeys ***") ;
          //console.log(sourceKeys)  ;
          dogroupRuleTrueFalsePart2 ( ruleTrueFalse , newSourceKeyList , groupKeyPathValueIndex )
        }
      }
    }
  }
  
  
  
  
  function saveRuleTrueFalse (db ,testRuleObject) {
    console.log("function saveRuleTrueFalse (db ,testRuleObject) {");
    let txSaveTF = db.transaction( "answerStore" , "readwrite") ;
    let storeTF = txSaveTF.objectStore("answerStore") ;
    storeTF.put(testRuleObject) ;
    txSaveTF.oncomplete = () => {
      batchFireStoreAnswer([testRuleObject]) ;
      dogroupRuleTrueFalse (testRuleObject.ruleTrueFalse , testRuleObject.keyPathValue ) 
    }
    //txSaveTF.oncomplete = function () {
      
    //}
  }
  
  function cleanDuplicateGroups(newCurrentLevelLists) {
    console.log("function cleanDuplicateGroups(newCurrentLevelLists) {");
    let trueFalse = false ;
    let arrayItemLast = newCurrentLevelLists.indexKeys.length -1 ;
    let arrayItem2ndLast = newCurrentLevelLists.indexKeys.length -2 ; 
    if(newCurrentLevelLists.indexKeys.length > 1) {
      let arrayLast = newCurrentLevelLists.indexKeys[arrayItemLast] ;
      let array2ndLast = newCurrentLevelLists.indexKeys[arrayItem2ndLast] ;
      trueFalse = compareArrays ( arrayLast, array2ndLast) 
    }
    if(trueFalse){
      newCurrentLevelLists.indexKeys.length = arrayItem2ndLast ;
      newCurrentLevelLists.indexValues.length = arrayItem2ndLast 
      /*
      newCurrentLevelLists.indexKeys = newCurrentLevelLists.indexKeys.slice(0,arrayItem2ndLast) ;
      newCurrentLevelLists.indexValues = newCurrentLevelLists.indexValues.slice(0,arrayItem2ndLast)
      */
    }
    return newCurrentLevelLists
  }
  
  function getKeysFromIndex( newCurrentLevelLists ) {
    console.log("function getKeysFromIndex( newCurrentLevelLists ) {");
    console.log("newCurrentLevelLists without  new items") ;
    console.log("newCurrentLevelLists without  new items") ;
    console.log("newCurrentLevelLists without  new items") ;
    console.log("newCurrentLevelLists without  new items") ;
    console.log("newCurrentLevelLists without  new items") ;
    console.log(newCurrentLevelLists);
    const GRTFdatabaseOpenRequest = indexedDB.open("authorExcuTrust");
    GRTFdatabaseOpenRequest.onsuccess = function () {
      let GRTFdb = GRTFdatabaseOpenRequest.result ;
      let txgroupTF = GRTFdb.transaction( "answerStore", "readonly") ;
      let storetxgroup = txgroupTF.objectStore("answerStore") ;
      let myIndexgroupTF = storetxgroup.index("questionDestination"); 
      let rangeValue = newCurrentLists[0].indexKeys[0] ;
      console.log("rangeValue") ;
      console.log("rangeValue") ;
      console.log("rangeValue") ;
      console.log(rangeValue) ;
      let sourceKeys = myIndexgroupTF.getAllKeys(IDBKeyRange.only(rangeValue)) ;
      txgroupTF.oncomplete = function () {
        let newSourceKeys = sourceKeys.result ;
        console.log("newSourceKeys") ;
        console.log("newSourceKeys");
        console.log("newSourceKeys");
        console.log("newSourceKeys");
        console.log(newSourceKeys);
  
        if(newSourceKeys.length) {
          for (let index = 0; index < sourceKeys.length; index++) {
            const element = sourceKeys[index];
            let newObject = {};
            newObject.indexKeys = [element];
            newObject.indexValues = [newCurrentLists[0].indexValues[0]];
            newCurrentLevelLists.push(newObject)          
          }
          console.log("newCurrentLevelLists with new items") ;
          console.log("newCurrentLevelLists with new items") ;
          console.log("newCurrentLevelLists with new items") ;
          console.log("newCurrentLevelLists with new items") ;
          console.log(newCurrentLevelLists)
        } else {
          console.log("newCurrentLevelLists has no new items") ;
          console.log("newCurrentLevelLists has no new items") ;
          console.log("newCurrentLevelLists has no new items") ;
          console.log("newCurrentLevelLists has no new items") ;
        }
      }
    }
  }
  
  function groupRuleAnswersGroup (newCurrentLevelLists) {
    console.log("function groupRuleAnswersGroup (newCurrentLevelLists) {");
    console.log("*** *** ***function groupRuleAnswersGroup (newCurrentLevelLists) PRE TRIM *** *** ***") ;
    console.log("*** *** ***function groupRuleAnswersGroup (newCurrentLevelLists) PRE TRIM *** *** ***") ;
    console.log("*** *** ***function groupRuleAnswersGroup (newCurrentLevelLists) PRE TRIM *** *** ***") ;
    console.log(newCurrentLevelLists) ;
    console.log("*** *** ***function groupRuleAnswersGroup (newCurrentLevelLists) POST TRIM *** *** ***") ;
    console.log("*** *** ***function groupRuleAnswersGroup (newCurrentLevelLists) POST TRIM *** *** ***") ;
    console.log("*** *** ***function groupRuleAnswersGroup (newCurrentLevelLists) POST TRIM *** *** ***") ;
    newCurrentLevelLists = cleanDuplicateGroups(newCurrentLevelLists) ;
    console.log(newCurrentLevelLists);
    if(newCurrentLevelLists.length > 0 ) {
      getKeysFromIndex( newCurrentLevelLists ) 
    }
  }
  
  
  
  function groupRuleAnswers (db ,currentLevelLists) {
    console.log("function groupRuleAnswers (db ,currentLevelLists) {");
    console.log(db);
    console.log(currentLevelLists);
    const request = indexedDB.open("authorExcuTrust");
    request.onsuccess = function() {
      db = request.result;
      for (let index = 0; index < currentLevelLists.indexKeys.length; index++) {
        //console.log(`currentLevelLists.indexKeys.length  ${index}`) ;
        const theIndexKey = currentLevelLists.indexKeys[index];
        //console.log("theIndexKey") ;
        //console.log(theIndexKey) ;
        const theIndexValue = currentLevelLists.indexKeys[index];
        //let databaseOpenRequest = indexedDB.open(authorExcuTrust);
        //databaseOpenRequest.onsuccess = () => {
  
        let txLists = db.transaction("answerStore", "readonly") ;
        let storeLists = txLists.objectStore("answerStore") ;
        let indexLists = storeLists.index("questionDestination") ;
        
        //console.log("theIndexKey") ;
        //console.log(theIndexKey) ;
  
        let savedLists = indexLists.getAllKeys(IDBKeyRange.only(theIndexKey)) ;
        //console.log ("indexLists.getAllKeys(IDBKeyRange.only(theIndexKey)) ;")
        txLists.oncomplete = () => {
          let groupList = savedLists.result ;
          //console.log("groupList.length") ;
          //console.log(groupList.length) ;
          //console.log("groupList - empty, or a list of rules") ;
          //console.log(groupList) ;
          if(groupList !== undefined) {
            /*
            console.log("function groupRuleAnswers (db , currentLevelLists) - savedLists.results - if(groupList !== undefined) ") ;
            console.log("theIndexKey - value that found records in index") ;
            console.log(theIndexKey) ;
            */
            let groupListLength = groupList.length ;
            for (let index = 0; index < groupListLength ; index++) {
              const groupKey = groupList[index] ;
              //console.log("groupList[index] - groupKey") ;
              //console.log(groupKey) ;
              const request = indexedDB.open("authorExcuTrust");
              request.onsuccess = function() {
                let db = request.result;
                let txListItem = db.transaction("answerStore", "readonly") ;
                let storeListItem = txListItem.objectStore("answerStore") ;
                let savedListItem = storeListItem.get(groupKey) ;
                txListItem.onerror = (e) => {
                  console.log(e) ;
                  console.log ( "above is error code on NOT COMPLETING TRANSACTION ")   ;
                  alert(`code on NOT COMPLETING TRANSACTION:  ${e}`)
                }
                txListItem.oncomplete = () => {
                  //if(savedListItemsResults !== undefined) {
                    if(savedListItem !== undefined) {
                    let savedListItemResult = savedListItem.result ;
                    
                    console.log("*** savedListItem.results ***") ;
                    console.log(JSON.parse(JSON.stringify(savedListItemResult))) ; 
                    console.log("  FOUND a record in the database searching by groupKey, not index") ;
                    console.log(JSON.parse(JSON.stringify(groupKey))) ;
                    console.log("groupList")
                    console.log(JSON.parse(JSON.stringify(groupList))) ;
                    console.log("savedLists - this should be a list of all rules possible, from this location, however, it may be best to use array to begin with above in this function  - below is the list") ;
                    console.log(savedLists.result) ;
                    console.log("*** JSON.parse(JSON.stringify(currentLevelLists)) ***");
                    console.log("*** JSON.parse(JSON.stringify(currentLevelLists)) ***");
                    console.log("*** JSON.parse(JSON.stringify(currentLevelLists)) ***");
                    console.log("*** JSON.parse(JSON.stringify(currentLevelLists)) ***");
                    console.log(JSON.parse(JSON.stringify(currentLevelLists))) ;
                    let newCurrentLevelLists =  JSON.parse(JSON.stringify(currentLevelLists)) ;
                    console.log("before .shift()");
                    console.log(newCurrentLevelLists) ;
                    newCurrentLevelLists.indexKeys.shift() ;
                    if (newCurrentLevelLists.indexKeys.length) {
                      console.log("after .shift()");
                      console.log(newCurrentLevelLists.indexKeys) ; 
                      //let newList = [...newCurrentLevelLists.indexKeys] ;
                      console.log("newCurrentLevelLists")   ;
                      console.log(newCurrentLevelLists)   ;
                      //groupRuleAnswers ("db place Holder" ,newList) ;
                      groupRuleAnswersGroup (newCurrentLevelLists)
                    }
                  }
                }
              }
              request.onerror = function (event) {
                console.log( event ) ;
                console.log ( "above is error code on opening the database") ;
                alert(`error code on opening the database:  ${event}`)
              }
            }
          } 
        } 
      }
    }
  }
  
  function getTrueRuleListItemRule1(trueRuleListItem) {
    console.log("function getTrueRuleListItemRule1(trueRuleListItem) {");
    let databaseOpenRequest = indexedDB.open("authorExcuTrust");
    databaseOpenRequest.onsuccess = async ()  => {
      let db = databaseOpenRequest.result ;
      const tx = db.transaction("answerStore", "readonly");
      const store = tx.objectStore("answerStore");
      let rule =  store.get(trueRuleListItem) ;
      tx.oncomplete = function()  {
        let newRule =  rule.result ;
        console.log("newRule") ;
        console.log(newRule) ;
        return newRule
      }
    }
  }
  
  function getUpdatedAllTrueConclusionList (trueRuleList, facts) {
    console.log("function getUpdatedAllTrueConclusionList (trueRuleList, facts) {");
    return new Promise (function(resolve) {
      resolve(getChangedTrueRuleList(trueRuleList, facts)).then(function(result){
        let temp = result.target.result ;
        return temp
      }) ;
    });
  }
  
  function  exampleOfPromise() {
    console.log("function  exampleOfPromise() { *** unlikely needed");
  // no  marker, sync NOT needed here
  // *** marker, this function only meeded for making new ones
  
  
  let myPromise = new Promise(function(myResolve, myReject) {
    // "Producing Code" (May take some time)
    
      myResolve(); // when successful
      myReject();  // when error
    });
    
    // "Consuming Code" (Must wait for a fulfilled Promise)
    myPromise.then(
      function(value) { /* code if successful */ },
      function(error) { /* code if some error */ }
    );
  
  }
  
  
  /**/
  function getDataAnswerKeysByIndex (key) {
    console.log("function getDataAnswerKeysByIndex (key) {");
    return new Promise (function(resolve) {
        indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
        let open = indexedDB.open ("authorExcuTrust");
        let keyValuePathList ;
  
        open.onsuccess = function () {
            db = open.result;
            tx = db.transaction("answerStore", "readonly");
            store = tx.objectStore("answerStore");
            index = store.index("questionDestination") ;
            keyValuePathList = index.getAllKeys(IDBKeyRange.only(key)).onsuccess =  function (event) {
                resolve(event.target.result)
            }
            tx.oncomplete = function () {
              return keyValuePathList
            }
        }
    });
  }
  /**/
  
  function saveDataAnswer (replacement) {
    console.log("function saveDataAnswer (replacement) {") ;
    let open = indexedDB.open ("authorExcuTrust");
    open.onsuccess = function () {
      db = open.result;
      tx = db.transaction("answerStore", "readwrite");
      store = tx.objectStore("answerStore");
      store.put(replacement) ;
      console.log("store.put(replacement) ;") ;
      tx.oncomplete = () => {
        console.log("tx.oncomplete = () => {") ;
        batchFireStoreAnswer([replacement]);
      }
      tx.onerror = (e) => {
        console.log(e) ;
                  console.log ( "above is an IndexedDB database error code on NOT COMPLETING TRANSACTION.  Note the tranaction has also NOT been saved to the cloud ")   ;
                  alert(`code on NOT COMPLETING TRANSACTION:  ${e}`)
      }
    }
  }
  
  
  
  function getDataAnswerByKeyPathValue (key) {
    console.log("function getDataAnswerByKeyPathValue (key) {") ;
    return new Promise (function(resolve) {
        indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
        let open = indexedDB.open ("authorExcuTrust");
        let theRule ;
  
        open.onsuccess = function () {
            db = open.result;
            tx = db.transaction("answerStore", "readonly");
            store = tx.objectStore("answerStore");
  
            theRule  = store.get(key).onsuccess =  function (event) {
                resolve(event.target.result);
            }
            tx.oncomplete = function () {
              return theRule
            }
        }
    });
  }
   
  function determineConclusionBasedonFacts(possibleNewFirstLevelRuleConclusionListItem) {
    console.log("function determineConclusionBasedonFacts(possibleNewFirstLevelRuleConclusionListItem) {") ;
    console.log("*** possibleNewFirstLevelRuleConclusionListItem") ;
    console.log("possibleNewFirstLevelRuleConclusionListItem") ;
    console.log("possibleNewFirstLevelRuleConclusionListItem") ;
    console.log("possibleNewFirstLevelRuleConclusionListItem ***") ;
    console.log(possibleNewFirstLevelRuleConclusionListItem) ;
      if (  possibleNewFirstLevelRuleConclusionListItem.trueRule_theRule_trueAnswerDescriptionList.length === 0) {
      return possibleNewFirstLevelRuleConclusionListItem
    }
    let factsRuleTrueFalse = false ;
    let factsAnswer = possibleNewFirstLevelRuleConclusionListItem.factsAnswer
    for (let index = 0; index <  possibleNewFirstLevelRuleConclusionListItem.trueRule_theRule_trueAnswerDescriptionList.length ; index++) {
      const element =  possibleNewFirstLevelRuleConclusionListItem.trueRule_theRule_trueAnswerDescriptionList[index] ;
      if(factsAnswer === element) {
        factsRuleTrueFalse = true ;
        index = possibleNewFirstLevelRuleConclusionListItem.trueRule_theRule_trueAnswerDescriptionList.length
      }
    }
    possibleNewFirstLevelRuleConclusionListItem.factsTrueRuleConclusion = factsRuleTrueFalse
    console.log("onlyNeededFacts - pared down possibleNewFirstLevelRuleConclusionListItem") ;
    console.log(possibleNewFirstLevelRuleConclusionListItem) ;
    return possibleNewFirstLevelRuleConclusionListItem
  }
  
  async function getChangedTrueRuleList(trueRuleList, facts) {
    console.log ( "async function getChangedTrueRuleList(trueRuleList, facts) {");
    console.log ( trueRuleList);
    console.log ( "**** facts ****");
    console.log ( facts);
  //function getChangedTrueRuleList(trueRuleList, facts) {
    //save all rules because answer has changed
    // collect all changes in conclusion for later processing 
    let changedTrueRuleConclusionList = [] ;
    for (let index = 0; index <  trueRuleList.length; index++) {
      const trueRuleListItem =   trueRuleList[index];
      let possibleNewFirstLevelRuleConclusionListItem = {};
      possibleNewFirstLevelRuleConclusionListItem.trueRuleListItem = trueRuleListItem ;
      possibleNewFirstLevelRuleConclusionListItem.keyPathValue = trueRuleListItem ;
      possibleNewFirstLevelRuleConclusionListItem.factsAnswer = facts.answer ;
      await getDataAnswerByKeyPathValue(trueRuleListItem).then(async function(result) {
      //getDataAnswerByKeyPathValue(trueRuleListItem).then(function(result) {
        possibleNewFirstLevelRuleConclusionListItem.trueRule = result ;
        possibleNewFirstLevelRuleConclusionListItem.trueRule_ruleTrueFalse = result.ruleTrueFalse ;
        possibleNewFirstLevelRuleConclusionListItem.ruleTrueFalse = result.ruleTrueFalse ;
        possibleNewFirstLevelRuleConclusionListItem.trueRule_ruleQuestionDestination = result.questionDestination ;
        possibleNewFirstLevelRuleConclusionListItem.questionDestination = result.questionDestination ;
        possibleNewFirstLevelRuleConclusionListItem.trueRule_theRule_trueAnswerDescriptionList = result.theRule.trueAnswerDescriptionList ;
        possibleNewFirstLevelRuleConclusionListItem.trueAnswerDescriptionList = result.theRule.trueAnswerDescriptionList ;
        //result = possibleNewFirstLevelRuleConclusionListItem ;
        //return result
        return possibleNewFirstLevelRuleConclusionListItem
      }).then( async function(result) {
          //console.log("result *** *** *** *** *** *** *** *** *** *** ***") ;
          //console.log(result) ;
          possibleNewFirstLevelRuleConclusionListItem = await determineConclusionBasedonFacts(result) ;
          //console.log("What now? *****************************") ;
          //console.log(possibleNewFirstLevelRuleConclusionListItem) ;
          return possibleNewFirstLevelRuleConclusionListItem
        }) ;
        let temp2 = possibleNewFirstLevelRuleConclusionListItem ;
        console.log ("temp2    after chainingin *** did it work?  ***") ;
        console.log (temp2) ;
        console.log("possibleNewFirstLevelRuleConclusionListItem - after chaining ") ;
        console.log(possibleNewFirstLevelRuleConclusionListItem) ;
      if(possibleNewFirstLevelRuleConclusionListItem.factsTrueRuleConclusion === true) {
        if(possibleNewFirstLevelRuleConclusionListItem.trueRule.ruleTrueFalse !== true){
          possibleNewFirstLevelRuleConclusionListItem.trueRule.ruleTrueFalse = true ;
          changedTrueRuleConclusionList.push(possibleNewFirstLevelRuleConclusionListItem)
        }
      } else {
        if(possibleNewFirstLevelRuleConclusionListItem.trueRule !== undefined) {
          if(possibleNewFirstLevelRuleConclusionListItem.trueRule.ruleTrueFalse === true){
            possibleNewFirstLevelRuleConclusionListItem.trueRule.ruleTrueFalse = false;
            changedTrueRuleConclusionList.push(possibleNewFirstLevelRuleConclusionListItem)
          }
        } else {
          /*
          possibleNewFirstLevelRuleConclusionListItem.trueRule.ruleTrueFalse = " for some reason undefined" ;
          */
  
          console.log(`        possibleNewFirstLevelRuleConclusionListItem.trueRule.ruleTrueFalse = " not found, unknown why an error" ;`) ;
          console.log(possibleNewFirstLevelRuleConclusionListItem) ;
          changedTrueRuleConclusionList.push(possibleNewFirstLevelRuleConclusionListItem ) ;
          console.log(changedTrueRuleConclusionList)
        }
      }
    }
    return changedTrueRuleConclusionList
  }
  
  async function getWaitForList(waitForList) {
    console.log("async function getWaitForList(waitForList) {");
    let onlyChanged = [] ;
    console.log(waitForList);
    if(waitForList.length) {
      for (let index = 0; index < waitForList.length; index++) {
        const element = waitForList[index];
        console.log("element - need to compare true/false/undefined") ;
        console.log(element) ;
        console.log("element.factsTrueRuleConclusion") ;
        //console.log(element.factsTrueRuleConclusion) ;
        const factsTrueRuleConclusion = element.factsTrueRuleConclusion ;
        console.log("factsTrueRuleConclusion") ;
        console.log(factsTrueRuleConclusion) ;
        console.log("element.trueRule") ;
        console.log(element.trueRule) ;
        //const priorTrueFalseConclusion =  element.trueRule.ruleTrueFalse ;
        console.log("factsTrueRuleConclusion") ;
        console.log(factsTrueRuleConclusion) ;
        //console.log("priorTrueFalseConclusion") ;
        //console.log(priorTrueFalseConclusion) ;
        onlyChanged.push(element) ;
      }
    }
    //let temp = onlyChanged ;
    return onlyChanged 
  }
  
  async function  returnChangedConclusions(allTrueRuleConclusionList) {
    console.log("async function  returnChangedConclusions(allTrueRuleConclusionList) {");
    let onlyChanged  = await getWaitForList(allTrueRuleConclusionList)
    //let waitForList = await JSON.parse(JSON.stringify(allTrueRuleConclusionList)) ;
    
    console.log("onlyChanged - actually all for now" )
    console.log(onlyChanged )
    return onlyChanged
  }
  
  async function makeConclusionsForTheseFacts0 (db , facts) { // db is only a placeholder
    console.log("async function makeConclusionsForTheseFacts0 (db , facts) { &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&      async function makeConclusionsForTheseFacts0 (db , facts)")
    let trueRuleIndexKey = [facts.keyPathValue[0],facts.keyPathValue[1],facts.keyPathValue[2],"questionStore",1,facts.keyPathValue[4],1,facts.keyPathValue[6]] ;
    let trueRuleList  = await getDataAnswerKeysByIndex(trueRuleIndexKey).then(function(result) {
      console.log( " this only returns list of true rules") ;
      console.log( result) ;
      return result
    }) ;
    if(trueRuleList.length === 0) { 
     return
    }  
    /**/
    let promise =  new Promise ( async function (resolve) {
          console.log("resolve(getChangedTrueRuleList(trueRuleList, facts)) &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&") ;
           resolve(getChangedTrueRuleList(trueRuleList, facts))
    }) ;
    /**/
    let allTrueRuleConclusionList = await promise.then( // this is where the promise is called 
      function (data){
         return data 
        }
      ).then(function (data) {
        let allTrueRuleConclusionList = data ;
        let dataLength = allTrueRuleConclusionList.length
        //alert(JSON.stringify(data)) ;
          for (let index = 0; index <  dataLength; index++) { // this does not work, proably because promise did not return a result. 
            let element = allTrueRuleConclusionList[index];
            console.log("**************************************************************************************************************************************************************") ;
            console.log ("allTrueRuleConclusionList");
            console.log (allTrueRuleConclusionList);
            console.log(index) ;
            console.log("element.factsTrueRuleConclusion");
            console.log(element.factsTrueRuleConclusion);
            console.log("element.trueRule");
            console.log(element.trueRule);
          }
        }
      ) 
  }
  
   async function makeConclusionsForTheseFacts (db ,facts) {
    console.log ("async function makeConclusionsForTheseFacts (db ,facts) { +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++        function makeConclusionsForTheseFacts (db ,facts) {");
  
  
     if(1 === 1 ){
      makeConclusionsForTheseFacts0 (db ,facts) ; 
      return
     }
  
    // this is first set of rules, only trueRules ( firstLevel of rules), NO grouptRules yet ***
    console.log("this is first set of rules, only trueRules ( firstLevel of rules), NO grouptRules yet ***");
    let txCon = db.transaction( "answerStore" , "readonly") ;
    let storeCon = txCon.objectStore("answerStore") ;
    let indexCon = storeCon.index("questionDestination") ;
    let theRange = [facts.keyPathValue[0],facts.keyPathValue[1],facts.keyPathValue[2],"questionStore",1,facts.keyPathValue[4],1,facts.keyPathValue[6]] ;
    let savedCon = indexCon.getAllKeys(IDBKeyRange.only(theRange)) ;
    txCon.oncomplete = () => {
      if( 1 === 2) {
        /**/
        trueRuleList = savedCon.result ;
        console.log(`makeConclusionsForTheseFacts (db ,tObject)
        stringify(trueRuleList)
        ${JSON.stringify(trueRuleList)}`) ;
        let nextLevelLists = {} ;
        nextLevelLists.indexKeys = [] ;
        nextLevelLists.indexValues = [] ;
        trueRuleListLength = trueRuleList.length ;
        if(trueRuleListLength > 0) {
          for (let index = 0; index < trueRuleListLength; index++) {
            const testrule  = trueRuleList[index];
            let txTrue = db.transaction( "answerStore" , "readonly") ;
            let storeTrue = txTrue.objectStore ("answerStore") ;
            let savedTrue = storeTrue.get(testrule) ;
            let nextLevelListsGroup = [] ;
            txTrue.oncomplete = () => {
              let testRuleObject = savedTrue.result ;
              let answerTrueFalse = false ;
              let answerListLength = testRuleObject.theRule.trueAnswerDescriptionList.length ;
              for (let index = 0; index < answerListLength; index++) {
                
                testRuleObject.theRule = parseTheString(testRuleObject.theRule) ;
  
                testRuleObject.theRule.trueAnswerDescriptionList = parseTheString(testRuleObject.theRule.trueAnswerDescriptionList) ;
  
                testRuleObject.trueFalseValues = parseTheString(testRuleObject.trueFalseValues) ;
                testRuleObject.theRule.trueAnswerDescriptionList = parseTheString(testRuleObject.theRule.trueAnswerDescriptionList) ;
                //console.log(testRuleObject.theRule.trueAnswerDescriptionList) ;
                //console.log(testRuleObject.theRule.trueAnswerDescriptionList[index]) ;
                const element = testRuleObject.theRule.trueAnswerDescriptionList[index];
                if (element === tObject.answer) {
                  answerTrueFalse = true ;
                  index = answerListLength
                }
                if(answerTrueFalse) {
                  if(testRuleObject.ruleTrueFalse !== true) {
                    testRuleObject.ruleTrueFalse = true ;
                    let theIndexKey = [...testRuleObject.keyPathValue]
                    nextLevelLists.indexKeys.push(theIndexKey) ;
                    nextLevelLists.indexValues.push(true);
                    console.log("saveRuleTrueFalse (db , testRuleObject) 1 of 2") ;
                    console.log(" db ") ;
                    console.log(db) ;
                    console.log(" testRuleObject") ;
                    console.log(testRuleObject) ;
                    nextLevelListsGroup.push (nextLevelLists) ;
  
                    saveRuleTrueFalse (db , testRuleObject) ;
                    console.log("groupRuleAnswers (db , nextLevelLists 1 of 2)") ;
                    console.log("db") ;
                    console.log(db) ;
                    console.log("nextLevelLists") ;
                    console.log(nextLevelLists) ;
                    console.log("saveRuleTrueFalse (db , testRuleObject) 1 of 2") ;
                    console.log(" db ") ;
                    console.log(db) ;
                    console.log(" testRuleObject") ;
                    console.log(testRuleObject) ;
                    groupRuleAnswers ("db placeHolder" , JSON.parse(JSON.stringify(nextLevelLists)))
                  }
                } else {
                  if(testRuleObject.ruleTrueFalse === true) {
                    testRuleObject.ruleTrueFalse = false ;
                    let theIndexKey = [...testRuleObject.keyPathValue]
                    nextLevelLists.indexKeys.push(theIndexKey) ;
                    nextLevelLists.indexValues.push(false);
                    nextLevelListsGroup.push (nextLevelLists) ;
                    console.log("nextLevelListsGroup") ;
                    console.log(JSON.parse(JSON.stringify(nextLevelListsGroup))) ;
                    console.log("saveRuleTrueFalse (db , testRuleObject) 2 of 2") ;
                    console.log(" db ") ;
                    console.log(db) ;
                    console.log(" testRuleObject") ;
                    console.log(testRuleObject) ;
                    saveRuleTrueFalse (db , testRuleObject) ;
                    console.log("groupRuleAnswers (db , nextLevelLists 2 o2 2)") ;
                    console.log("db") ;
                    console.log(db) ;
                    console.log("nextLevelLists") ;
                    console.log(nextLevelLists) ;
                    //groupRuleAnswers (db , nextLevelLists) ;
                    groupRuleAnswers ("db placeholder" , JSON.parse(JSON.stringify(nextLevelLists)))
  
                  }
                }
              }
              if ( 1 === 2){
  
                if(nextLevelListsGroup.length) {
                  console.log("nextLevelListsGroup") ;
                  console.log(JSON.parse(JSON.stringify(nextLevelListsGroup))) ;
                  console.log(nextLevelListsGroup) ;
                  //groupRuleAnswers (db, nextLevelListsGroup)
                  for (let index = 0; index < nextLevelListsGroup.length; index++) {
                    const element =  nextLevelListsGroup[index];
                    if(element.indexKeys.length) {
  
                    console.log(`makeConclusionsForTheseFacts (db ,tObject)
                    stringify(element)
                    ${JSON.stringify(element)}
                    stringify(db) **** ***** ***********
                    ${JSON.stringify(db)}
                    `) ;
                      groupRuleAnswers (db , element)
                    }
                  }
                }  else {
                  console.log("theRange results in 0 - zero,  records from let savedCon = indexCon.getAllKeys(IDBKeyRange.only(theRange))") 
                }
              }
            }
          } 
        }
        /**/
      } else {
        //console.log(`1 === 1 alternative testing `) ;
        trueRuleList = savedCon.result ;
        if(trueRuleList.length === 0) { 
          console.log( "trueRuleList is empty - no rules applicable")
          return
        }    
        let changedTrueRuleConclusionListPromise = new Promise (function (resolve) {
          resolve( getChangedTrueRuleList(trueRuleList, facts) )
        });
        //let changedTrueRuleConclusionList =  getChangedTrueRuleList(trueRuleList, facts) ;
        changedTrueRuleConclusionList = changedTrueRuleConclusionListPromise ;
        console.log(" changedTrueRuleConclusionList ") ;
        console.log( changedTrueRuleConclusionList ) ;
        console.log("insert nextSteps above")
      }
    }
  }
  
  
  function updatetobject (theSidebar , tObject) {
    console.log("function updatetobject (theSidebar , tObject)") ;
    console.log("theSidebar") ;
    console.log(theSidebar) ;
    console.log("tObject") ;
    console.log(tObject) ;
    let theNewList ;
    if( theSidebar !== undefined) {
      console.log("theSidebar.dataset.checkboxexplain");
      console.log(theSidebar);
      console.log(theSidebar.dataset);
      console.log(theSidebar.dataset.checkboxexplain);
      tObject.checkBoxExplain = JSON.parse(theSidebar.dataset.checkboxexplain) ;
      tObject.questionAnsweredRequiresExplanation = JSON.parse(theSidebar.dataset.questionansweredrequiresexplanation) ;
      tObject.questionUnansweredRequiresExplanation = JSON.parse(theSidebar.dataset.questionunansweredrequiresexplanation) ;
      tObject.questionUnansweredComplete = JSON.parse(theSidebar.dataset.questionunansweredcomplete) ;
      let theAnswerElement = theSidebar.nextElementSibling.nextElementSibling.children[1] ;
      theNewList = theAnswerElement.dataset.thechoicehtmllist ;
      tObject.theChoiceHTMLList = JSON.parse(theNewList) ;
    }
    return tObject
  }
  
  
  function getQuestionnaireAuthorModeOutline() {
    console.log ("function getQuestionnaireAuthorModeOutline() {");
    return `<div class="row rowChoice m-0">
    <div  class="numerical-input col-2" >
      <!-- <input type="number" class = "questionAnswerSort missing border-primary"> -->
      <input type="number" class = "questionAnswerSort border-primary">
      <input type="Button" class="allowSelectRule" value="Click to Always Display">
    </div>
    <div class="questionAnswerDescription col-4">
      <button class="questionnaireQuestion questionnaireSelectQuestion" type="submit">Select Question</button>
    </div>
    <div class="col-3">
      <span class = "questionRuleDescription">
      </span>
    </div>
    <div  class="col-1 questionnairecloud" > </div>
    <div  class="col-1" >
      <input type="Button" class="deleteBtn" value="Delete">
      <br/><br/>
      <input type="Button" class="copyBtn" value="Insert">
    </div>
  </div> 
  `
  }
  
  
  async function applyTheRuleAuthorMode(theRule , outerDiv) {
    console.log ("async function applyTheRuleAuthorMode(theRule , outerDiv) {  -- *** likely not eeded, always same answer");
    if(!theRule) {
      return outerDiv
    }
    return outerDiv
  }
  
  async function getWordingForAuthorMode (keyPathValue) {
    console.log ("async function getWordingForAuthorMode (keyPathValue) {");
    //console.log("keyPathValue");
    //console.log(keyPathValue);
    let dbProperties = getSingleRecordFromStore(keyPathValue);
    //console.log("dbProperties");
    //console.log(dbProperties);
    let canAsyncGetThis = await  promiseSingleValueFromDB (dbProperties).then(
      function(data){
        let theNewPromise = data ;
        theNewPromise2 = theNewPromise;
        //console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& theNewPromise to be returned &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
        //console.log( theNewPromise ) ;
        return theNewPromise
      });
      let indexedDBRecord = canAsyncGetThis ;
      if(indexedDBRecord.questionContent){
        /*
        console.log("+++++++++++++++++++++++++++++++++++++++++++++++++ indexedDBRecord.questionContent ++++++++++++++++++++++");
        console.log(indexedDBRecord.questionContent);
        console.log(indexedDBRecord.questionContent);
        console.log(indexedDBRecord.questionContent);
        */
        return indexedDBRecord.questionContent
      }
      if(indexedDBRecord.ruleContent){
        /*
        console.log(indexedDBRecord.ruleContent);
        */
        return indexedDBRecord.ruleContent
      }
      return null
  }
  
  
  async function findQuestionnaireQuestionClass(questionnaireProperty){
    console.log(`async function findQuestionnaireQuestionClass(questionnaireProperty)`) ;
    let listOfQuestionProperties = ["sidebar","explanation","content","info_circle","answer","user_answer_choice_list","the_answer_text","user_answer_choice_toggle","attach","attached_file_button1","attached_file_button2","sign","sign_button1"] ;
    let actualClass = "" ;
    for ( let theClass of listOfQuestionProperties) {
        if(!actualClass) {
          let suffixLength = theClass.length;
          let idLength = questionnaireProperty.id.length;
          let uniqueRowPrefix = questionnaireProperty.id.substring(0,idLength-suffixLength);
          let buttonTitle = sessionStorage.getItem('buttonaction');
          if( buttonTitle === "New Question") {
            let temp = document.getElementById("questionAuthor").innerText;
            if(!temp) {return} ;
            temp = document.getElementById("questionId").innerText;
            if(!temp) {return} ;
            temp = document.getElementById("questionContent").innerText;
            if(!temp) {return} ;
          }
          let questionnaireAuthor = document.getElementById("questionnaireAuthor").innerText;
          if(!questionnaireAuthor){
            return
          }
          let questionnaireID = document.getElementById("questionnaireID").innerText;
          if(!questionnaireID){
            return
          }
          let keyPathValue = ["questionnaireStore",1,questionnaireAuthor,1,questionnaireID];
          let questionnaireDbValue = await getOneRecordByKeyPathValue(keyPathValue) ;
          if(!questionnaireDbValue){
            return
          }
          mySnackBarFunction("Still Working, please Wait!");
          //console.log("questionnaireDbValue.questionnaireContent");
          //console.log(questionnaireDbValue.questionnaireContent);
          document.getElementById("questionnaireContent").innerHTML = questionnaireDbValue.questionnaireContent;
          questionnaireDbValue.rowIDarray = [... new Set(questionnaireDbValue.rowIDarray)];
          questionnaireDbValue.rowIdListV2 = [... new Set(questionnaireDbValue.rowIdListV2)];
          let answerChoices = document.getElementById("questionnaireAnswerChoices") ;
          answerChoices.innerHTML = getQuestionnaireAnswerChoicesHeader() ;
          let rowNumber = 0;
          for ( let element of questionnaireDbValue.rowIDarray) {
            let outerDiv = document.createElement("div") ;
            //outerDiv.innerHTML = getQuestionnaireBlankRowChoice ();
            outerDiv.innerHTML= getQuestionnaireAuthorModeOutline();
            let rowDiv = outerDiv.getElementsByClassName("rowChoice")[0];
            //rowDiv.id = "rowDivId" ;
            rowDiv.id = element;
            //rowDiv.dataset.uniquequestionnairerow = element ;          
            let numericalInput = outerDiv.getElementsByClassName("questionAnswerSort")[0] ;
            numericalInput.value = ++rowNumber ;
            let uniqueRow = questionnaireDbValue.uniqueRowCombinationList[element];
            let theQuestion ;
            if(uniqueRow.questionKeyPathValue) {
              theQuestion = JSON.stringify(uniqueRow.questionKeyPathValue) ;
              let theQuestionBlank = outerDiv.getElementsByClassName("questionAnswerDescription")[0];
  
              theQuestionBlank.insertAdjacentHTML("beforeend",`
              <b>Author:&nbsp;</b><span class="questionnaireRowQuestionAuthor">${uniqueRow.questionKeyPathValue[2]}</span>
              <b>ID:&nbsp;</b><span class="questionnaireRowQuestionID">${uniqueRow.questionKeyPathValue[4]}</span><hr>
              <span class="questionnaireRowQuestionContent"> Question ??? to be removed </span>
              `);
              //theRuleBlank.insertAdjacentHTML("beforeend",theRule);
              let tempKeyPathValue  = [uniqueRow.questionKeyPathValue[0],uniqueRow.questionKeyPathValue[1],uniqueRow.questionKeyPathValue[2],uniqueRow.questionKeyPathValue[3],uniqueRow.questionKeyPathValue[4]];
              theQuestionBlank.getElementsByClassName("questionnaireRowQuestionContent")[0].innerHTML = await getWordingForAuthorMode (tempKeyPathValue);
              //theQuestionBlank.insertAdjacentHTML("beforeend",theQuestionBlank)
              //theQuestionBlank.insertAdjacentHTML("beforeend",theQuestion)
            }
            /*
            console.log("outerDiv") ;
            let temo = outerDiv.cloneNode(true) ;
            console.log(temo) ;
            outerDiv.innerHTML = applyTheQuestionAuthorMode(theQuestion , temo);
            */
            if(uniqueRow.ruleKeyPathValue) {
              let ruleType = "Unknown Type";
              if(uniqueRow.ruleKeyPathValue[0] === "groupruleStore"){
                ruleType = "Collection"
              }
              if(uniqueRow.ruleKeyPathValue[0] === "trueruleStore"){
                ruleType = "Display Rule"
              }
              //theRule = JSON.stringify(uniqueRow.ruleKeyPathValue);
              let theRuleBlank = outerDiv.getElementsByClassName("questionRuleDescription")[0];
              //theRuleBlank.insertAdjacentHTML("beforeend",`<button 
              theRuleBlank.insertAdjacentHTML("afterbegin",`<button 
              class="QuestionnaireRule questionnaireSelectRule" type="submit">Select Display Rule or Collection </button>
              <span class="questionnaireRowRuleType"><b>${ruleType}</b></span><br>
              <b>Author:&nbsp;</b><span class="questionnaireRowRuleAuthor">${uniqueRow.ruleKeyPathValue[2]}</span>
              <b>ID:&nbsp;</b><span class="questionnaireRowRuleID">${uniqueRow.ruleKeyPathValue[4]}</span><hr>
              <span class="questionnaireRowRuleContent">??? to be removed </span>
              `);
              //theRuleBlank.insertAdjacentHTML("beforeend",theRule);
              let tempKeyPathValue  = [uniqueRow.ruleKeyPathValue[0],uniqueRow.ruleKeyPathValue[1],uniqueRow.ruleKeyPathValue[2],uniqueRow.ruleKeyPathValue[3],uniqueRow.ruleKeyPathValue[4]];
              theRuleBlank.getElementsByClassName("questionnaireRowRuleContent")[0].innerHTML = await getWordingForAuthorMode (tempKeyPathValue)
            }
            // why not commenting out :
            /*
            console.log(rowNumber) ;
            console.log(element) ;
            console.log(uniqueRow);
            */
            answerChoices.insertAdjacentElement('beforeend', rowDiv);
          }
          answerChoices.classList.remove("hidealways");
          return ;
  
          console.log("===================================================================================================================== **************************************** questionnaireDbValue.uniqueRowCombinationList - each part below  ************************* =========================================================================");
          console.log(questionnaireDbValue);
          console.log(questionnaireDbValue.uniqueRowCombinationList);
          let uniqueRowCombinationList = questionnaireDbValue.uniqueRowCombinationList ;
          let uniqueRowObject = uniqueRowCombinationList[uniqueRowPrefix];
          //let questionKeyPathValue = uniqueRowObject.questionKeyPathValue;
          //let questionKeyPathValueText = JSON.stringify(questionKeyPathValue);
          let questionKeyPathValueUniqueQuestionRows = questionnaireDbValue.objectQuestionKeyPathValueListUniqueQuestionRows;
          //let questionKeyPathValueTextUniqueRows = questionnaireDbValue.objectQuestionKeyPathValueListUniqueRows[questionKeyPathValueText]
          //let questionKeyPathValuePreFixList = uniqueRowCombinationList.objectQuestionKeyPathList[JSON.stringify(questionKeyPathValue)];
          let contentId = uniqueRowPrefix+theClass ;
          let contentElement = document.getElementById(contentId);
          let newValue;
          if (contentElement){
            newValue = contentElement.innerHTML
          }
          let completeList = ["_____________________________________________________________________________________________________","questionnaireDbValue",questionnaireDbValue,"contentElement",contentElement,"newValue",newValue,"theClass",theClass,"uniqueRowPrefix",uniqueRowPrefix,"questionnaireProperty.id",questionnaireProperty.id,"uniqueRowCombinationList",uniqueRowCombinationList,"keyPathValue",keyPathValue,"questionnaireDbValue",questionnaireDbValue,"uniqueRowCombinationList","uniqueRowCombinationList","uniqueRowObject",uniqueRowObject,"questionKeyPathValueUniqueQuestionRows",questionKeyPathValueUniqueQuestionRows,"questionKeyPathValueText","questionKeyPathValueText","questionKeyPathValueTextUniqueRows","questionKeyPathValueTextUniqueRows","_____________________________________________________________________________________________________"];
          for ( let element of completeList) {
            console.log(element)
          }
          if(questionnaireProperty.classList.contains(theClass)){
            alert (`theClass: -- ${theClass} --
            questionnaireProperty: ${questionnaireProperty.id}
            suffixLength: ${suffixLength}
            idLength: ${idLength}
            uniqueRowPrefix: ${uniqueRowPrefix}
            questionnaireAuthor: ${questionnaireAuthor}
            questionnaireID: ${questionnaireID}
            keyPathValue: ${JSON.stringify(keyPathValue)}
            questionnaireDbValue: ${JSON.stringify(questionnaireDbValue)}
            questionKeyPathValue:${"JSON.stringify(questionKeyPathValue)"}
            questionKeyPathValuePreFixList:${"JSON.stringify(questionKeyPathValuePreFixList)"}
            uniqueRowCombinationList :${JSON.stringify( uniqueRowCombinationList )}
            `);
            return theClass
          }
        }
    }
    //alert(" questionnaireQuestionProperty is not a question class");
    return undefined
  }
  
  function findQuestionnaireQuestionProperty(event){
    console.log ("function findQuestionnaireQuestionProperty(event){");
    //console.log("function findQuestionnaireQuestionProperty(event){");
    let questionnaireQuestionProperty = event.target;
    let questionnaireQuestionPropertyID = questionnaireQuestionProperty.id;
    let valid = true ;
    //console.log(!questionnaireQuestionPropertyID);
    while(!questionnaireQuestionPropertyID  && valid){
      questionnaireQuestionProperty = questionnaireQuestionProperty.parentElement ;
      if(!questionnaireQuestionProperty) {
        valid = false
      }else {
        questionnaireQuestionPropertyID = questionnaireQuestionProperty.id    
      }
    }
    if(!valid) {
      //console.log("undefined");
      //console.log(undefined);
      return undefined
    } else {
      //console.log("questionnaireQuestionProperty");
      //console.log(questionnaireQuestionProperty);
      return questionnaireQuestionProperty
    }
  }
  
  
  function findQuestionnaireQuestionPropertyUpdatedByUser(event){
    console.log("function findQuestionnaireQuestionPropertyUpdatedByUser(event){");
    let questionnaireQuestionClass ;
    let questionnaireQuestionProperty = findQuestionnaireQuestionProperty(event);
    buttonTitle = sessionStorage.getItem('buttonaction');
    if(!questionnaireQuestionProperty.contentEditable) {return};
    if (buttonTitle === "New Question") {
      console.log("questionnaireQuestionProperty:");
    console.log(questionnaireQuestionProperty);
    console.log("questionnaireQuestionProperty:");
    console.log(questionnaireQuestionProperty);  console.log("questionnaireQuestionProperty:");
    console.log(questionnaireQuestionProperty);
    }
    
    if(questionnaireQuestionProperty) {   
      questionnaireQuestionClass = findQuestionnaireQuestionClass(questionnaireQuestionProperty)
    } else {
      alert(" questionnaireQuestionProperty is undefined");
      return
    }
    if(questionnaireQuestionClass) {
      //console.log("questionnaireQuestionClass");
      //console.log(questionnaireQuestionClass);
      //console.log("questionnaireQuestionProperty");
      //console.log(questionnaireQuestionProperty);
      mySnackBarFunction("Still Working Please Wait")
    }else {
      alert(" questionnaireQuestionClass is undefined")
    }
  }
  
  function removeMissing (theElement) {
    console.log ("function removeMissing (theElement) { *** very limited function");
    theElement.classList.remove("missing");
  }
  
  function addMissing (theElement) {
    console.log ("function addMissing (theElement) { *** very limited function");
    theElement.classList.add("missing");
  }
  
  function getAuthorDatabase(checkDatabase) {
    checkDatabase.database = "authorExcuTrust";
    checkDatabase.tx2 = "readonly";
    return checkDatabase
  }
  
  function checkAuthorDatabase(checkDatabase) {
    console.log ("function checkAuthorDatabase(checkDatabase) {");
    let db, tx, store, allSavedItems;
    console.log("function checkAuthorDatabase(checkDatabase) { - checkDatabase below ");
    console.log(checkDatabase);
    console.log("function checkAuthorDatabase(checkDatabase) { - checkDatabase above ");
    let databaseOpenRequest = indexedDB.open(checkDatabase.database);
    databaseOpenRequest.onerror = () => {
      console.log("databaseOpenRequest.onerror = () => {")
      //selectQuestionForRuleToggleCloseWrapper() - *** likely not needed
    }
    databaseOpenRequest.onsuccess = () => {
      console.log("databaseOpenRequest.onsuccess = () => {");
      db = databaseOpenRequest.result ;
      tx = db.transaction(checkDatabase.tx1, checkDatabase.tx2) ;
      store = tx.objectStore(checkDatabase.store) ;
      allSavedItems = store.get(checkDatabase.keyPathValue) ;
      tx.onerror = () => {
        console.log("tx.onerror = () => {") ;
        db.close() ;
      }
      tx.oncomplete = () => {
        db.close() ;
        console.log("allSavedItems.result:");
        console.log(allSavedItems);
        console.log(allSavedItems.result) ;
        console.log( "***                                                                                                                                                           End of test !                                                                                                                                                                  ***")
      }
    }  
  }
  
  function geAuthorNewQuestionInfoForIndexedDB(checkDatabase) {
    console.log("geAuthorNewQuestionInfoForIndexedDB(checkDatabase) { - checkDatabase - below ***");
    checkDatabase.store = "questionStore";
    checkDatabase.tx1 = "questionStore" ;
    checkDatabase.theAuthor = document.getElementById("questionAuthor").innerText ;
    checkDatabase.theID = document.getElementById("questionID").innerText ;
    checkDatabase.keyPathValue = [checkDatabase.store,1,checkDatabase.theAuthor,1,checkDatabase.theID];
    console.log(checkDatabase) ;
    console.log("geAuthorNewQuestionInfoForIndexedDB(checkDatabase) { - checkDatabase - above ***");
    checkAuthorDatabase(checkDatabase) 
    /*;    ***
    return ;
    indexedDBValueReturn = await checkAuthorDatabase(checkDatabase) ;
    console.log("indexedDBValueReturn - below");
    console.log(indexedDBValueReturn);
    console.log(indexedDBValueReturn);
    console.log(indexedDBValueReturn);
    console.log(indexedDBValueReturn);
    console.log("indexedDBValueReturn - above");
    */
  }
  
  
  function checkIndexedDBforAuthorRecord(screen) {
    console.log ("function checkIndexedDBforAuthorRecord(screen) {");
    let checkDatabase = {};
    checkDatabase.screen = screen;
    checkDatabase = getAuthorDatabase(checkDatabase);
    if(screen === "NewQuestion") {
      geAuthorNewQuestionInfoForIndexedDB(checkDatabase); return
    }
  }
  
  function focusoutFormattingID(theElement) {
    console.log ("function focusoutFormattingID(theElement) {");
    /*     ***      
  
    Author name field is system determined and can not be edited.  ID field name is input by author-user.  The combination of Author name field and and ID field values is unique and may not be changed for any given type of author generated content once saved to database.    Authors are expected to describe the content in a way which is meaning full to all users.  The description can be modified using the modify buttons for each type until the question is published for other author-users or customer-users to use. 
    
    The types of author generated content are  1) questions, 2) single rules, 3) complex rules, 4) questionnaires, and 5) reports.  Other types may be added in the future.  Examples of new types could be  rules for ranges (considered too advanced for most authors), or how to reccommend supplmentry questionnaires and reports (also considered too advanced for many authors ???) and mapping for each type (also considered too advanced for many authors ???).  ***
    
    If ID field is blank,  description/explanation is blank and not available for author-user input.      ***
    
    */
    if(document.getElementById("testForChange").dataset.focusin === theElement.innerHTML) {return};
    let trimed = theElement.innerText.toUpperCase().trim() ;
    theElement.innerHTML = trimed ;
    let screen = document.getElementById("testForChange").dataset.screen;
    if(trimed) {
      removeMissing (theElement) ;
      checkIndexedDBforAuthorRecord(screen)
    } else {
      addMissing (theElement);
      checkHideDescrption(screen)
    }
  }
  
  function focusoutEvents (event) {
    console.log("function focusoutEvents (event)") ;
    let theElement = event.target ;
    theElement.style.background = '';
    if(theElement.classList.contains("focusFormattingID")) {
        event.stopPropagation() ;
        focusoutFormattingID(theElement); 
        return      
      }
      return;
    updateMissingTextList() ;
    return ;
    findQuestionnaireQuestionPropertyUpdatedByUser(event); return
  
    alert (" do we even reach here? - no because we are changing this.") ;
    if(event.target.id === "questionContent"){
      questionRedundant()
    }
    // from old eventListner 2020-11-02am
    else if(event.target.classList.contains("questionAnswerSort")) {
      let t0 = event.target.value;
      let t1 = t0 * 1;
      event.target.classList.remove("missing") ;
      if( t0 !== t1){
        event.target.value = t1 ;
        resetFlag (event , "Row may have changed")
      }      
      compareNumberInput()      
    }
    else if(event.target.classList.contains("questionAnswerDescription")){
      if(event.target.innerText.trim() === ""){
        event.target.innerHTML = "";
        event.target.classList.add("missing") ;
        trimCapNoFormatting();
        fixMissing()
      } else {
        event.target.classList.remove("missing") ;
        fixMissing() // NOT SURE WHAT THIS IS DOING ANY MORE   *** 
      }
    }
    else if(event.target.classList.contains("explanation")){
      if (sessionStorage.getItem( 'temp' ) !== event.target.innerHTML){
        let tObject = {} ;
        tObject.keyPathValue = ["customer",1,"SCENARIO",1,event.target.dataset.author,1,event.target.dataset.id] ;
        tObject.ContentHTML = event.target.innerHTML ;
        tObject.ContentTEXT = event.target.innerText.trim() ;
        let temp1 = [...tObject.keyPathValue] ;
        temp1.unshift(Date.now(),1);
        tObject.versionDateSince1969 = temp1 ;
        const request = indexedDB.open("authorExcuTrust");
        request.onsuccess = function() {
          db = request.result;
          const tx1 = db.transaction("answerStore", "readonly");
          const store1 = tx1.objectStore("answerStore");
          console.log("tObject.keyPathValue - likeley missing datastoreage being completed. ") ;
          console.log(tObject.keyPathValue) ;
          let stored = store1.get(tObject.keyPathValue) ;
          tx1.oncomplete = function () {
            let modified  = stored.result ;
            const tx2 = db.transaction("answerStore", "readwrite");
            const store2 = tx2.objectStore("answerStore");
            if(modified  === undefined) {
              
              let theBase = event.target ;
              console.log("theBase - from focusoutEvents");
              console.log(theBase)
              findSidebar (theBase) ;
              let theSidebar = document.getElementById(window.sessionStorage.getItem("finaltheBase")) ;
              console.log("updatetobject (theSidebar , tObject) 2")
              tObject = updatetobject (theSidebar , tObject) ;
              tObject = setQuestionRuleStatus (tObject) ;
              console.log("store2.put(tObject) ; / tObject below") ;
              console.log(tObject) ;
              store2.put(tObject) ;
              tx2.oncomplete = () => {
                console.log("-------------  makeConclusionsForTheseFacts 9 ( db ,tObject) --------------------------------------------")
                makeConclusionsForTheseFacts ( db ,tObject) ;
                batchFireStoreAnswer([tObject])
              }
            } else {
              modified.ContentHTML = tObject.ContentHTML ;
              modified.ContentTEXT = tObject.ContentTEXT ;
              modified.versionDateSince1969 = tObject.versionDateSince1969 ;
              modified = setQuestionRuleStatus (modified) ;
              console.log("store2.put(modified) ; / modified below") ;
              console.log(modified) ;
              store2.put(modified) ;
              tx2.oncomplete = () => {
                console.log("-------------  makeConclusionsForTheseFacts 11 ( db ,tObject) ----------------------------------") ;
                makeConclusionsForTheseFacts ( db ,modified) ;
                batchFireStoreAnswer([modified])
              }
            }
            //db.close()
           }
        }
      }
    }
  }
  
  function doQuestionnaireSelectRule (event) {
    console.log ("function doQuestionnaireSelectRule (event) {");
    resetFlag (event , "Row may have changed")
    let theSelectedRow = getTheSelected (event) ;
    let selectARule = {store:"ruleStore", database: "authorExcuTrust", tx1:"ruleStore", tx2:"readonly"} ;
    document.getElementById("process0").textContent = "Select Rule For Questionnaire Row" ;
    document.getElementById("process1").textContent = "Modify Rule Selection For Questionnaire Row" ;
    //browseQuestionsForQuestionnaire( selectARule, theSelectedRow) *** above might be reolaced by sessionStorage ***
    //let selectedQuestionArray ;
    document.getElementById("modaltitle").innerHTML = "Select Rule for this row of Questionnaire - browse" ;
    //browseAllData(selectAQuestion, theSelectedRow) ;
    let db, tx, store, allSavedItems;
    let database = selectARule.database;
    let databaseOpenRequest = indexedDB.open(database);
    databaseOpenRequest.onsuccess = () => {
      db = databaseOpenRequest.result ;
      tx = db.transaction( selectARule.tx1 , selectARule.tx2) ;
      store = tx.objectStore(selectARule.store) ;
      allSavedItems = store.getAll() ; // we can put back the cursor approach if needed, it appears the problem was not he cursor, but rather omitting tx.oncomplete
      tx.oncomplete = () => {
        db.close() ;
        upDateModalForQuestionnaireQuestion(allSavedItems.result , selectARule , "rule" ) ;
        domakeModalForQuestionnaireQuestion(theSelectedRow, "rule")  // this needs to change so modal returns correct version; this may mean changing updateModal so it returns the data we need and does not execute the inline function created *** *** 
      }
    }
  }
  
  
  
  function doQuestionnaireSelectQuestion (event) {
    console.log ("function doQuestionnaireSelectQuestion (event) {");
    //alert(`function doQuestionnaireSelectQuestion (event) 0`);
    let theSelectedRow = getTheSelected (event) ;
    resetFlag (event , "Row may have changed") ;
    let selectAQuestion = getQuestionRead() ;
    document.getElementById("process0").textContent = "Select Question For Questionnaire Row" ;
    document.getElementById("process1").textContent = "Modify Question Selection For Questionnaire Row" ;
    browseQuestionsForQuestionnaire( selectAQuestion, theSelectedRow)
  }
  
  function doPart1 () {
    console.log ("function doPart1 () {");
    let part1 = Math.floor(Math.random() * 1000) + "" ;
    if(part1.length === 1) {
      part1 = "ZZ" + part1
    } else if (part1.length === 2){
      part1 = "A" + part1
    }
    return part1
  }
  
  function doPart4 () {
    console.log ("function doPart4 () {");
    let part4 = Math.floor(Math.random() * 1000) + "" ;
    if(part4.length === 1) {
      part4 = part4+"ZZ"
    } else if (part4.length === 2){
      part4 = part4+ "A"
    }
    return part4
  }
  
  function doPart2 (part2) {
    part2 = part2 + "" ;
    let part2a = "" ;
    let part2length = part2.length -1 ;
    for (let index = part2length; index > -1; index--) {
      const element = part2[index];
      part2a = part2a + element
    }
    return part2a
  }
  
  
  function clearExisting (cln , theSelected) {
    console.log ("function clearExisting (cln , theSelected) {");
    let part2 ;
    let theSelectedunique = theSelected.dataset.uniquequestionnairerow ;
    let part1 = doPart1() ;
    let part4 = doPart4() ;
    let author , docId ;
    if(document.getElementById("questionnaireAuthor") ) {
       author = document.getElementById("questionnaireAuthor").innerText ;
       docId = document.getElementById("questionnaireID").innerText 
      if (theSelectedunique === undefined ) {
        theSelected = resetFireStoreFlag (theSelected , "theSelected") ; // setFlag exists in theSelected
        part2 = doPart2 (Date.now()-1) ;
        theSelected.dataset.uniquequestionnairerow = part1 + author + part2 + docId + document.getElementsByClassName("questionAnswerSort").length + part4 ;
        part1 = doPart1() ;
        part4 = doPart4() 
      }
      temp0 = ["questionnairerowquestionauthor", "questionnairerowquestionid", "questionnairerowruleauthor","questionnairerowruleid","questionnairerowruletype"]
      temp0Length = temp0.length ;
      for (let index = 0; index < temp0Length; index++) {
        const element = temp0[index] ;
        delete cln.dataset[element]
      }
      cln.innerHTML = `
          <div  class="numerical-input col-2" >
            <!-- <input type="number" class = "questionAnswerSort missing border-primary"> -->
            <input type="number" class = "questionAnswerSort border-primary">
            <input type="Button" class="allowSelectRule" value="Click to Always Display">
          </div>
          <div class="questionAnswerDescription col-4"><button class="questionnaireQuestion questionnaireSelectQuestion" type="submit">Select Question</button></div>
          <div class="col-3">
            <span class = "questionRuleDescription">
              <button class="QuestionnaireRule questionnaireSelectRule" type="submit">Select Display Rule or Collection </button>
            </span></div>
          <div  class="col-1 questionnairecloud" > </div>
          <div  class="col-1" ><input type="Button" class="deleteBtn" value="Delete"><br/><br/><input type="Button" class="copyBtn" value="Insert"></div>`;
      part2 = doPart2 (Date.now()) ;
      cln.dataset.uniquequestionnairerow = part1 + author + part2 + docId + document.getElementsByClassName("questionAnswerSort").length + part4 ;
      cln = resetFireStoreFlag (cln , "cln") ; //  setFlag exists as "cln"
      if(cln.getElementsByClassName("questionAnswerSort").length === 1) {
        cln.getElementsByClassName("questionAnswerSort")[0].value = 0 
      }
    }
  }
  
  
  function removeRuleDataSets(theSelected){
    console.log ("function removeRuleDataSets(theSelected){");
    if(theSelected.dataset.ruletype !== undefined) {
      delete theSelected.dataset.ruletype 
    }
    if(theSelected.dataset.ruleauthor !== undefined) {
       delete theSelected.dataset.ruleauthor
    }
    if(theSelected.dataset.ruleid  !== undefined) {
      delete theSelected.dataset.ruleid 
    }
    return theSelected
  }
  
  function doRulePermission (event) {
    console.log ("function doRulePermission (event) {");
    let theSelected = event.target ;
    let theParent = 1,  parentIsRowChoice = false ;
    while (!parentIsRowChoice && theParent !== null) {
      theParent = theSelected.parentElement ;
      parentIsRowChoice =  theParent.classList.contains("rowChoice") ;
      theSelected = theParent ; 
    }
    if( event.target.value === "Click to Always Display") {
      event.target.value = "Click to Allow Conditional Rule" ;
      theSelected.getElementsByClassName("questionRuleDescription")[0].innerHTML = " " ;
      theSelected = removeRuleDataSets (theSelected)    
    } else {
      event.target.value = "Click to Always Display";
      theSelected.getElementsByClassName("questionRuleDescription")[0].innerHTML = '<button class="QuestionnaireRule questionnaireSelectRule" type="submit">Select Display Rule or Collection </button>'
    }
  }
  
  function updateLogicalAnswerToggle (event, logicalAnswer) {
    console.log ("function updateLogicalAnswerToggle (event, logicalAnswer) {");
    let element = getPreviousElementSibling (event) ;
    console.log(`  console.log(element) ;
    console.log(element) ;
    console.log(element) ;
    console.log ( logicalAnswer) ; ()()())()))
    console.log ( logicalAnswer) ; ()()())()))
    console.log ( logicalAnswer) ; ()()())()))`) ;
    console.log(element) ;
    console.log ( logicalAnswer) ;
    element.innerText = logicalAnswer ;
    console.log(element) ;console.log(element) ;console.log(element) ;console.log(element) ;console.log(element) ;console.log(element) ;console.log(element)   
  }
  
  function saveLogicalAnswerToDataBase (theAnswerElement , event) { // *** event does not appear to be relevant here  
    console.log("function saveLogicalAnswerToDataBase (theAnswerElement , event) {   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^     function saveLogicalAnswerToDataBase 1 ") ;
    let logicalAnswer = {} ;
    logicalAnswer.keyPathValue = ["customer",1,"SCENARIO",1,theAnswerElement.dataset.author,1,theAnswerElement.dataset.id] ;
    logicalAnswer.answer =  theAnswerElement.innerHTML ;
    let temp1 = [...logicalAnswer.keyPathValue] ;
    temp1.unshift(Date.now(),1);
    logicalAnswer.versionDateSince1969 = temp1 ;
    const request = indexedDB.open("authorExcuTrust");
    request.onsuccess = function() {
      db = request.result;
      const tx1 = db.transaction("answerStore", "readonly");
      const store1 = tx1.objectStore("answerStore");
      let stored = store1.get(logicalAnswer.keyPathValue) ;
      tx1.oncomplete = function () {
        let modified  = stored.result ;
        const tx2 = db.transaction("answerStore", "readwrite");
        const store2 = tx2.objectStore("answerStore");
        if(modified  === undefined) {
          let theSidebar = document.getElementById(window.sessionStorage.getItem("finaltheBase")) ;
          console.log ("from updatelogicalAnswer (theSidebar , logicalAnswer) - 4") ;
          logicalAnswer = updatetobject (theSidebar , logicalAnswer) ;
          logicalAnswer = setQuestionRuleStatus (logicalAnswer) ;
          console.log("logicalAnswer 2 - put") ;
          console.log(logicalAnswer);
          store2.put(logicalAnswer) ;
          tx2.oncomplete = () => {
            batchFireStoreAnswer([logicalAnswer]);
            console.log("-------------  makeConclusionsForTheseFacts 13 ( db ,tObject) ------------------") ;
            makeConclusionsForTheseFacts ( db ,logicalAnswer)
          }
          // batchFireStoreAnswer([logicalAnswer]) // removed 2021-01-22  10:08 ***
        } else {
          /* // removed 2021-01-22  10:08 ***
          if( modified === undefined) {
            modified = {} ;
            modified.keyPathValue = logicalAnswer.keyPathValue          
          }
          */
          
          modified.answer = logicalAnswer.answer ;
          modified.versionDateSince1969 = logicalAnswer.versionDateSince1969 ;
          modified = setQuestionRuleStatus (modified) ;
          console.log("()()()()()()()() modified   ()()()()()()()()") ;
          console.log(modified) ;
          store2.put(modified) ;
          tx2.oncomplete = () => {
            batchFireStoreAnswer([modified]) ;
            console.log("-------------  makeConclusionsForTheseFacts 15 ( db ,tObject) ------------") ;
            makeConclusionsForTheseFacts ( db ,modified)
          }
        }
      }
    }
  }
  
  function specificAnswer(number) {
    console.log("function specificAnswer(number) {") ;
    let theAnswerElement = document.getElementById("theAnswerElement") ;
    let priorChoice = theAnswerElement.dataset.answer_choice * 1 ;
    if(number !== priorChoice) {
      let theChoices = JSON.parse(theAnswerElement.dataset.thechoicehtmllist) ;
      theAnswerElement.innerHTML = theChoices[number] ;
      theAnswerElement.dataset.answer_choice = number ;
      console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^     function saveLogicalAnswerToDataBase 4 ") ;
      saveLogicalAnswerToDataBase (theAnswerElement)
    }
    document.getElementById("myModal").style.display = "none";
    document.getElementById("modal-body-2").classList.add("hidealways");
    document.getElementById("modal-body-1").classList.remove("hidealways")
    document.getElementById("modal-list").innerHTML = "" 
  }
  
  function makeBuiltSpan (priorNumberElement) {
    console.log("function makeBuiltSpan (priorNumberElement) {") ;
      let theNewPriorNumberElementParent =  document.createElement("div") ;
      let cln =  priorNumberElement.cloneNode(true) ;
      theNewPriorNumberElementParent.appendChild(cln) ;
      return theNewPriorNumberElementParent.firstChild
  }
  
  function getPreviousElementSibling (event) {
    console.log("function getPreviousElementSibling (event) {") ;
    let theClickedButton = event.target ;
    let priorNumberElement = theClickedButton.previousElementSibling ;
    return priorNumberElement
  }
  
  async function replacementConclusions (replacement , previousDomSibling) {
    console.log("async function replacementConclusions (replacement , previousDomSibling) {") ;
    let changedTrueRuleConclusionListPromise , changedTrueRuleConclusionList;
    console.log("function replacementConclusions (replacement  *** likely need to update conclusions at question Level ")
    console.log(replacement) ;
    console.log(previousDomSibling) ;
    saveDataAnswer (replacement) ; 
    console.log( "now process rules.! ") ;
    let trueRuleList = await getDataAnswerKeysByIndex([replacement.keyPathValue[0],replacement.keyPathValue[1],replacement.keyPathValue[2],"questionStore",1,replacement.keyPathValue[4],1,replacement.keyPathValue[6]]) ;
    let temp = JSON.stringify(trueRuleList) ;
    let temp2 = JSON.parse(temp) ;
    console.log(temp2) ;
    if(trueRuleList.length === 0) { 
      console.log( "trueRuleList is empty - no rules applicable")
      return
    }    
    changedTrueRuleConclusionListPromise = new Promise (function (resolve) {
      resolve( getChangedTrueRuleList(trueRuleList, replacement) )
    });
    //let changedTrueRuleConclusionList =  getChangedTrueRuleList(trueRuleList, facts) ;
    changedTrueRuleConclusionList =  await changedTrueRuleConclusionListPromise ;
    console.log(" changedTrueRuleConclusionList ") ;
    console.log( changedTrueRuleConclusionList ) ;
    saveArrayItemsToIndexedDB (changedTrueRuleConclusionList) ;
    //saveArrayItemsToFireStore (changedTrueRuleConclusionList)  ;
    console.log("insert nextSteps above")
  }
  
  //async function toggleAnswer1 (event) {
  function toggleAnswer1 (event) {
    console.log("function toggleAnswer1 (event) {") ;
    // the purposes of this function are:
    //  a) if current answer = "" and "" is NOT and option, choose first option, OR 
    //  b) if current answer is not the last option, then choose next option, OR
    //  c) if current option is last option, then choose first option
    // This function uses a series of anonymous functions to set previously "let"  outer function level declared variables so the anonymous functions can update the function level scope, not seen elsewhere, but it works very well.  
    let previousDomSibling, currentChoice, choiceList, choiceListMax , newChoiceIndex, newChoice;
    // data needed is in DOM element prior to buttonClick
    let getPreviousDomSibling =  async () => {
      previousDomSibling = await getPreviousElementSibling (event)
      //; console.log(previousDomSibling)
    };
    let getCurrentChoice  = async () => {
      currentChoice = await previousDomSibling.innerHTML
      //; console.log(currentChoice)
    };
    let getChoiceList = async () => {
  //    choiceList = await  JSON.parse(builtSpan.dataset.thechoicehtmllist) ;
      choiceList = await  JSON.parse(previousDomSibling.dataset.thechoicehtmllist) ;
      choiceListMax = await choiceList.length - 1
      //; console.log(choiceList)
      //; console.log(choiceListMax)
    };
    let isTrueFalse = (element) => element === currentChoice ;
    let getCurrentIndex = async  () => {
      currentIndex = await choiceList.findIndex(isTrueFalse)
      //; console.log(currentIndex)
    } ;
    let getNewChoiceIndex = () => {
      if (currentIndex === -1){
        newChoiceIndex =  0
      } else if (currentIndex === choiceListMax){
        newChoiceIndex =  0
      } else {
        newChoiceIndex = ++currentIndex
      }
      //; console.log(newChoiceIndex)
    }
    let getNewChoice = async () => {
        newChoice = await choiceList[newChoiceIndex]
    }
    let saveToDOMandDatabases = async () => {
      let temp ;
      temp = previousDomSibling.cloneNode(true) ;
      previousDomSibling.innerHTML = newChoice ;
      previousDomSibling.dataset.answer_choice = newChoiceIndex ;
      let key = ["customer",1,"SCENARIO",1,previousDomSibling.dataset.author,1,previousDomSibling.dataset.id] ;
      let priorIndexedDBRecord = await getDataAnswerByKeyPathValue(key) ;
      console.log("priorIndexedDBRecord - clone temp")
      temp = JSON.stringify(priorIndexedDBRecord) ;
      console.log(JSON.parse(temp)) ;
      let replacement = JSON.parse(temp) ;
      replacement.answer = newChoice ;
      temp = Date.now() ;
      let temp1 = [temp,1] ;
      replacement.versionDateSince1969 = temp1.concat(replacement.keyPathValue) ;
      replacement = getAnswerComplete (replacement) ; // sets commpletion status
      replacement  = setQuestionRuleStatus (replacement); // sets true / false status
      replacementConclusions (replacement , previousDomSibling ) // exits this function to new function which saves updated data
    }
    getPreviousDomSibling().then(getCurrentChoice).then(getChoiceList).then(getCurrentIndex).then(getNewChoiceIndex).then(getNewChoice).then(saveToDOMandDatabases)
  }
  
  function toggleAnswer (event) {
    console.log("function toggleAnswer (event) {  ::::::::::::::::::::::::::::::::::::    4  toggleAnswer (event) ::::::::::::::::  *** next is a always true condition for testing");
    if( 1 === 1) {
      console.log("if( 1 === 1)") ;
      toggleAnswer1(event)
    } else {
      console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                            function toggleAnswer (event)            @@@@@@@@@@@@@@@@@@@@@@@@@@")
      let priorNumberElement = getPreviousElementSibling (event) ; //
      let currentAnswer = getPreviousElementSibling (event) ;
      let builtSpan = makeBuiltSpan (priorNumberElement) ; 
      let oldAnswer = builtSpan.innerHTML ;
      /*
      alert(`oldAnswer:
      ${JSON.stringify(oldAnswer)}`) ;
      */
      let theArray = JSON.parse(builtSpan.dataset.thechoicehtmllist) ;
      /*
      alert(`theArray:
      ${JSON.stringify(theArray)}`)  ;
      */
      let theArrayLength = theArray.length ;
      let theNumberValue  = -1;
      for (let theArrayIndex = 0; theArrayIndex < theArrayLength; theArrayIndex++) {
        const element = theArray[theArrayIndex];
        if(element === oldAnswer ) {
          theNumberValue = theArrayIndex + 1 
        }    
      }
      if(theNumberValue === theArrayLength) {
        theNumberValue = 0
      } else if(theNumberValue === -1) {
        theNumberValue = 0
      }
      priorNumberElement.innerHTML = theArray[theNumberValue] ;
      let nextAnswer = theArray[theNumberValue] ;
      updateLogicalAnswerToggle (event, nextAnswer) ;    
      oldAnswer = 
      priorNumberElement.dataset.answer_choice = theNumberValue ;
      let allDetail = [builtSpan.innerHTML+"",builtSpan.dataset.answer_choice*1,builtSpan.dataset.author+"", builtSpan.dataset.id+"",builtSpan.dataset.thechoicehtmllist] ;
      priorNumberElement.innerHTML = theArray[allDetail[1]] ;
      console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^     function saveLogicalAnswerToDataBase 6 ") ;
      //oldAnswer = priorNumberElement.innerHTML ;
      saveLogicalAnswerToDataBase (priorNumberElement, event)
    }
  }
  
  function clearTempIDandAnswerElement() {
    console.log("function clearTempIDandAnswerElement() {");
    if(document.getElementById("tempid")) {
      document.getElementById("tempid").id = ""
    }
    if(document.getElementById("theAnswerElement")) {
      document.getElementById("theAnswerElement").id = ""
    }
  }
  
  function findWords(theClickedButton) {
    console.log("function findWords(theClickedButton) {");
    let theParent = theClickedButton.parentElement ;
    let sibling1Left = theParent.previousElementSibling ;
    let sibling1LeftText = sibling1Left.firstChild.nodeValue ;
    return sibling1LeftText
  }
  
  function findSidebar (theBase) {
    console.log("function findSidebar (theBase) {");
    if(theBase.classList !== undefined) {
      if(theBase.classList.contains("sidebar")) {
        window.sessionStorage.setItem("finaltheBase" , theBase.id) 
      } else {
        let thePrior = theBase.previousElementSibling ;
        if(thePrior) {
          findSidebar (thePrior)
        } else {
          let theParent = theBase.parentElement ;
          findSidebar (theParent)
        }
      } 
    } else {
      let theParent = theBase.parentElement ;
      findSidebar (theParent)
    }
  }
  
  function doQuestionnaireSelectModal (event) {
    console.log("function doQuestionnaireSelectModal (event) {");
    clearTempIDandAnswerElement() ;
    let theClickedButton = event.target ;
    let theBase = event.target ;
    findSidebar (theBase) ;
    let theSidebar = document.getElementById(window.sessionStorage.getItem("finaltheBase")) ;
    theSidebar.dataset.thenewid = theSidebar.id ; // this proves, id we want to we can add datasets to the sidebar, so all is there. alternatively, keep separate.   Right now, saving to a few places
    let questionWords = findWords (theClickedButton) ;
    theClickedButton.id = "tempid" ;
    let theAnswerElement = document.getElementById("tempid").nextElementSibling ;
    theAnswerElement.id = "theAnswerElement" ;
    let theChoices = JSON.parse(theAnswerElement.dataset.thechoicehtmllist);
    let frag = document.createDocumentFragment() ;
    let theLength = theChoices.length ; 
    for (let index = 0; index < theLength; index++) {
      const element = theChoices[index];
      let temp1 = document.createElement("div") ;
      temp1.className = "questionWrapper" ;
      //let temp2 = '<span>'+ element+`<button class="endline" onclick= "specificAnswer(${index})">Select</button>`+'</span>'
      let temp2 = `<button class="beginline" onclick= "specificAnswer(${index})">Select</button>`+element.toString()
      temp1.innerHTML = temp2;
      /*
      let temp3 = document.createElement("span") ;
      temp3.innerHTML = temp2 ;
      temp1.appendChild(temp3) ;
      frag.appendChild(temp1)
      */
     frag.appendChild(temp1)
    }
    /*
    let tempModal = document.getElementById("tempModal") ;
    tempModal.innerHTML = "" ;
    tempModal.appendChild(frag) 
    */
    let tempModal = document.getElementById("modal-list") ;
    tempModal.innerHTML = "" ;
    tempModal.appendChild(frag) ;
    makeModal2(questionWords)
  }
  
  function eventCopyBtn(event) {
    console.log("function eventCopyBtn(event) {");
    event.target.style.background = '';
    let theSelected = getTheSelected (event) ;
    let cln = theSelected.cloneNode(true);
    theSelected.insertAdjacentElement("afterend",cln);
    clearExisting (cln , theSelected) ;
    let counter = document.getElementsByClassName ("deleteBtn").length ;
    if (counter === 2 ) {
      document.getElementsByClassName("deleteBtn")[0].style.display = "" ;
      document.getElementsByClassName("deleteBtn")[1].style.display = "" ;
    }
    compareNumberInput()  
  }
  
  function eventUserAnswerChoiceList(event) {
    console.log("function eventUserAnswerChoiceList(event) {");
    let theBase = event.target ;
    findSidebar (theBase) ;
    doQuestionnaireSelectModal (event)
  }
  
  function objectLiterals(fruit) {
    console.log("function objectLiterals(fruit) {  ***  likely NOT NEEDED");
    /*  ***   ***  */
    const logFruit = {
      'apples': () => console.log('Apples'),
      'oranges': () => console.log('Oranges'),
      'default': () => console.log('Unknown fruit')
    };
    (logFruit[fruit] || logFruit['default'])(); // Logs: 'Unknown fruit'
  
  }
  
  function menuChoicesToggle(hideit) {
    console.log("function menuChoicesToggle(hideit) {");
    if(true) {
      console.log("menuChoicesToggle( *** skipped for now *** )");
      return
    }
    console.log("menuChoicesToggle(hideit)");
    let menuOnOff = document.getElementById("menuChoices");
    console.log(menuOnOff);
    if(hideit) {
      menuOnOff.classList.add("hidealways")    
    } else {
      if(menuOnOff.classList.contains("hidealways")) {
        menuOnOff.classList.remove("hidealways")
      } else {
        menuOnOff.classList.add("hidealways")
      }
    }
    console.log(menuOnOff)
  }
  
  function getScreenChoices() {
    console.log("function getScreenChoices() {");
      //const hope = {
      return {
        // consider theses as only for authors 
         'default':  () => alert("not a valid screen choice"),
      'newQuestion': () => newemptyQuestion('newQuestion'),
      'newDisplayRule': () => emptyRule31('newDisplayRule'), //alert ("newDisplayRule"),
      'newQuestionnaire':  () => emptyQuestionnaire('newQuestionnaire'), // alert("newQuestionnaire"),
      'menuChoicesToggle':  () => menuChoicesToggle(),
      'renumberquestionnairedevelopment':  () => renumberquestionnairedevelopment('renumberquestionnairedevelopment'),
      'updateGridRowsFromDatabase':  () => updateGridRowsFromDatabase('updateGridRowsFromDatabase'),
      'collectionOfDisplayRules':() => emptyGroupRule('collectionOfDisplayRules'), //" alert("collectionOfDisplayRules")
      'getAllFromFireStore':() => getAllFromFireStore('getAllFromFireStore'), // includes 
      // consider the following as only for end users.
      'buildSelectQuestionnaire':  () => buildSelectQuestionnaire('buildSelectQuestionnaire')  // need to get for users answers, relevant questions, relevant rules, etc. things needed by end user without the abilityy to create new author content, except to the extent is an ad hoc addition, which perhaps should be limited to modals.
    } 
    //return hope
  }
  
  
  function clickEventsMenuChoices(event) {
    console.log("function clickEventsMenuChoices(event)");
    event.stopPropagation() ;
    const buttonPressed = event.target.dataset.screen ;
    console.log("*** buttonPressed ");
    console.log(buttonPressed);
    console.log("buttonPressed ***");
    if(buttonPressed) {
      document.getElementById("testForChange").dataset.screen = buttonPressed;
      hideEmptyAllWrappers();
      document.getElementById("formtitle").innerText = event.target.defaultValue; // change title on header
      //if (buttonPressed === "NewQuestion"){
      const screenChoices = getScreenChoices();
      const keyList = Object.keys(screenChoices);
      const keyListString = JSON.stringify(keyList);
      const valid = keyList.indexOf(buttonPressed);
      //(logFruit[fruit] || logFruit['default'])();
      
      if(valid === -1){
        console.log(` ${buttonPressed} Not Valid  for ${keyListString}`)
      } else {
        console.log(` ${buttonPressed} Valid at ${valid} for ${keyListString}`);
  
      }
      console.log(keyListString);
      console.log(screenChoices);
      console.log(buttonPressed);
      console.log(screenChoices.buttonPressed); // not defined ??
      //return screenChoices.buttonPressed
      //saveNewScreenButtonClicked(event,buttonPressed) ;
      //Object.call(screenChoices.buttonPressed)
      (screenChoices[buttonPressed] || screenChoices['default'])()
    }
    //}
  }
  
  function clickEventsAllWrappers (event) {  
    console.log ("function clickEventsAllWrappers (event) {");
    event.stopPropagation() ;
    let theClassList = event.target.classList ;
    if(theClassList.contains("copyBtn")) {
      eventCopyBtn(event); return
    } 
    if(theClassList.contains("user_answer_choice_list")){
      eventUserAnswerChoiceList(event) ; return
    } 
    if(theClassList.contains("user_answer_choice_toggle")){
      toggleAnswer (event); return
    }
    if (theClassList.contains("questionnaireSelectModal")) {
      //doQuestionnaireSelectModal (event)
      return
    } 
    if (theClassList.contains("questionnaireSelectQuestion")) {
      doQuestionnaireSelectQuestion (event); return
    } 
    if (theClassList.contains("allowSelectRule")) {
      resetFlag (event , "Row may have changed") ;
      doRulePermission (event) ; return
    } 
    if (theClassList.contains("questionnaireSelectRule")) {
      doQuestionnaireSelectRule (event); return
    }
    if (theClassList.contains("deleteBtn")) {
      let theSelected = getTheSelected (event) ;
      let counter = document.getElementsByClassName ("deleteBtn").length;
      if(counter === 1) {
        document.getElementsByClassName ("deleteBtn")[0].style.display = "none"
      } else {
        theSelected.remove();
        if(document.getElementsByClassName("deleteBtn").length === 1){
          document.getElementsByClassName("deleteBtn")[0].style.display = "none" ;
        }
      }
      compareNumberInput() ; return
    }
    if (theClassList.contains("checkboxNoChange")){
      let theSelected = getTheSelected (event) ;
      if(theSelected.getElementsByClassName("checkboxNoChange")[0].checked){
        // what to do if true
        doPreventChange( theSelected )
      } else {
        // what to do if false
        undoPreventChange( theSelected )
      }
      return
    } 
    // nothing to do if no matches
    console.log ("no Click matches in  clickEventsAllWrappers")
  }
  
  function focusinFormattingID(theElement) {
    console.log ("function focusinFormattingID(theElement) {");
    document.getElementById("testForChange").dataset.focusin = theElement.innerHTML
  }
  
  
  function focusinEvents(event) {
    console.log(" function focusinEvents(event) {");
    let theElement = event.target ;
    if(theElement.contentEditable === true) {
      theElement.style.background = 'lightpink';
      if(theElement.contains("focusFormattingID")) {
        event.stopPropagation() ;
        focusinFormattingID(theElement); 
        return      
      }
    }
    /*
    event.target.style.background = 'lightpink';
    let trueFalse = event.target.classList.contains("explanation") ;
    if(trueFalse) {
      let trueFalse2 = event.target.contentEditable;
      if(trueFalse2) {
        let element = getElementById("testforchange") ;
        element.dataset.focusintext = event.target.innerHTML
      }
      // *** 20211227 sessionStorage.setItem( 'temp' , event.target.innerHTML)
    } */
  }
  
  function setupAllWrapperEvents0() {
    console.log ("function setupAllWrapperEvents0()") ;
    // No action taken unless matching value found in classList of one of functions or child functions 
    // If matching value found, skip rest of else if commands ( i.e. match  is good only for one action).  This is important to differentiate between focusin and click 
    // Dataset only used where no need for element ID and formatting is not affected.
    let form = document.getElementById('allWrappers') ; // 2020-12-16-08:10 *** keep as it currently is used to add events to most of document. POSSIBLY could be in body, not sure. 
    // 2020-12-16-08:10let form = document.getElementById('notCleared') ;
    console.log("form.addEventListener('focusin', (event)");
    form.addEventListener('focusin', (event) => {
      focusinEvents(event) 
      });  
      console.log("form.addEventListener('focusout', (event)");
    form.addEventListener('focusout', (event) => {
      focusoutEvents (event)
    });
    console.log(`form.addEventListener('click', (event) - 1st`);
    form.addEventListener('click', (event) => {
      clickEventsAllWrappers (event)
    });
    console.log(`form.addEventListener('click', (event) - 2nd`);
    document.getElementById('menuChoices').addEventListener('click', (event) => {
      clickEventsMenuChoices (event)
    });
    document.getElementById('menuChoicesToggle').addEventListener('click', (event) => {
      clickEventsMenuChoices (event)
    });
    console.log(`document.addEventListener("DOMContentLoaded", function()`);
    document.addEventListener("DOMContentLoaded", function(){
      //dom is fully loaded, but maybe waiting on images & css files
      document.getElementById("testForChange").dataset.currentuser = "JSM" 
    });
  }
  
  
  setupAllWrapperEvents0() ;
  
  
  //setupAllWrapperEvents0b()  // allwrappers - each screen has it own wrapper, however, wrappers are emptied when not in use to minimize size of DOM.  When a screen is selected, the type of screen is saved in session.storage value Screen.  Screen values change every time new screen is used including when an author types in an id they have already used. In that case the screen value changes to modify