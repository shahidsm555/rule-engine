 // We will need to change this - done so We can stage this document.
// Seems like Display rules and collections work except for ranges not yet created or number of true rules other than any or all, make flexible so that number or % of rules makes true,
// and also need to make sure that if a rule is deleted that it is removed from any collections it is in.
// Also need to make sure that if a rule is changed that it is updated in any collections it is in.
// 2025-10-01 8:58am   Looking at adding new rules to a collectionn of rules see where the errors are if any, is it being saved?  number of rules in a collection is working.

function classNameLength(theName) {
  //const theClassArray = document.getElementsByClassName(theName);
  const theLocation  = document.getElementById("groupruleWrapper") ;
  const theNameDot = "."+theName ;
  const theClassArray = theLocation.querySelectorAll(theNameDot) ;
  const idValue = "numberOf"+theName ;
  let theNumber;
  /*
  if (theName === "ruleWrapper") {
    theNumber = theClassArray.length*1;
    theNumber = theNumber-2 ; // because of the template in the html
  } else { */
    theNumber = theClassArray.length;
  //}
  document.getElementById(idValue).innerHTML = theNumber;
}
function printToConsoleLengths(){
  //classNameLength("row") ;
  //classNameLength("rowChoice") ;
  classNameLength("groupruleWrapper") ;
  classNameLength("ruleWrapper") ;
  const total0   = document.getElementById("numberOfruleWrapper").innerHTML*1 ;
  const total1   = document.getElementById("numberOfgroupruleWrapper").innerHTML*1 ;
  const totalAll = total0 + total1 ;
  document.getElementById("totalNumberOfRulesWrapper").innerHTML = totalAll ;
}
function selectQuestionForRule() {
  console.log("function selectQuestionForRule() {");
  selectQuestionForRuleToggle() ;
  selectQuestionPart2("questionForSingleRule") 
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


async function getFromFireStore(theStore) {
  console.log("async function getFromFireStore(theStore) {");
  let fireStoreArray = [] ;
  var db = doFirebaseConfig() ;
  await makeFireStoreArray (db , fireStoreArray , theStore) ;
  processFireStoreArray(fireStoreArray , theStore)
}

function getAllFromFireStore() {
  console.log("function getAllFromFireStore () {");
  promise0 = getFromFireStore("questionRuleStore") ;
  promise1 = getFromFireStore("questionStore") ;
  promise2 = getFromFireStore("questionnaireStore") ;
  promises = [ promise0, promise1, promise2 ] ;
  Promise.allSettled (promises)
}

/**
 * Evaluate whether a group rule passes based on its logic type
 * @param {Object} groupRule - The group rule object containing ruleLogicType, minRuleCount, minRulePercent
 * @param {Array} ruleResults - Array of boolean values indicating which rules passed
 * @returns {boolean} - Whether the group rule should display
 * @since 2026-01-29
 */
function evaluateGroupRule(groupRule, ruleResults) {
  console.log("function evaluateGroupRule(groupRule, ruleResults) { 2026-01-29");
  console.log("groupRule:", groupRule);
  console.log("ruleResults:", ruleResults);
  
  if (!ruleResults || ruleResults.length === 0) {
    return false;
  }
  
  const trueCount = ruleResults.filter(r => r === true).length;
  const totalCount = ruleResults.length;
  const ruleLogicType = groupRule.ruleLogicType || (groupRule.all0Any1True ? "any" : "all");
  
  switch(ruleLogicType) {
    case "all":
      // All rules must be true
      return trueCount === totalCount;
      
    case "any":
      // At least one rule must be true
      return trueCount >= 1;
      
    case "count":
      // At least N rules must be true
      const minCount = groupRule.minRuleCount || 1;
      return trueCount >= minCount;
      
    case "percent":
      // At least X% of rules must be true
      const minPercent = groupRule.minRulePercent || 50;
      const actualPercent = (trueCount / totalCount) * 100;
      return actualPercent >= minPercent;
      
    default:
      // Default to "all" for backward compatibility
      return trueCount === totalCount;
  }
}

function extractTextBeforeSecondLastExclamation(text) {
  // Find all occurrences of "!1!"
  const exclamationIndices = [];
  let index = text.indexOf("!1!");
  while (index !== -1) {
    exclamationIndices.push(index);
    index = text.indexOf("!1!", index + 2);
  }
  // If there are less than 2 occurrences, return the original text
  if (exclamationIndices.length < 2) {
    return text;
  } else {
    // Extract the text up to the second-to-last occurrence
    const secondLastIndex = exclamationIndices[exclamationIndices.length - 2];
    return text.substring(0, secondLastIndex + 3); // Include the last "!1!"
  }
}

function getTextTo2ndLastMarker(text) {
 let extract = extractTextBeforeSecondLastExclamation(text);
 return extract
}

/*
// Example usage:
const text = "This is a test string with !1! multiple !1! instances !1! and we want to extract text up to the second-to-last one.";
const extractedText = extractTextBeforeSecondLastExclamation(text);
console.log(extractedText); // Output: "This is a test string with !1! multiple !1! instances !1!"
*/

function groupruleHTMLElement(indexedDBRecord) {
    'use strict';
    console.log("function groupruleHTMLElement(indexedDBRecord) { 2024-10-08 15:50");
    // remember to use the indexedDBRecord to get the correct data
    /**
     * Represents a collection of items.
     * @type {Array}
     */
    var wrapper, collectionT, htmlDescription;
    if(indexedDBRecord.keyPathValue[0] === "groupruleStore"){wrapper ="groupruleWrapper"; collectionT = " Collection"; htmlDescription = indexedDBRecord.groupruleContent;}else{wrapper ="ruleWrapper"; collectionT = ""; htmlDescription = indexedDBRecord.ruleContent; }
    var theRow = `<div data-questionnairerowruletype="${indexedDBRecord.keyPathValue[0]}" data-questionnairerowruleauthor="${indexedDBRecord.keyPathValue[2]}" data-questionnairerowruletid="${indexedDBRecord.keyPathValue[4]}" class="row rowChoice m-0 ${wrqpper} modal-filter-row">
        <div col-1"=""> </div>
        <div col-1"=""> </div>
        <div class="col-6"><span class="questionRuleDescription"><button class="QuestionnaireRule questionnaireSelectRule " type="submit">Select Display Rule or Collection </button> <span><b>Display Rule${collectionT}</b><br></span><b>Author:&nbsp;</b><span class="questionnaireRowRuleAuthor modal-author">${indexedDBRecord.keyPathValue[2]}</span><b>&nbsp; ID:&nbsp;</b><span class="questionnaireRowRuleID modal-ID">${indexedDBRecord.keyPathValue[4]}</span><br><b>Descripttion: </b>${htmlDescription}</span></div>
        <div class="col-3 questionnairecloud">Saved</div>
        <div class="col-1"><input type="Button" class="deleteBtn" value="Delete"><br><br><input type="Button" class="copyBtn" value="Insert"></div>
      </div>` ;
      console.log("theRow 2024-10-08 15:42");
      console.log(theRow);
      return theRow;
  }


  function getIndexedDBRuleArray(finalList , myStore, sourceDB) {
    'use strict';
    console.log("function getIndexedDBRuleArrayfinalist, myStore, sourceDB) 2024-10-08 15:54");
    let arrayOfRetrievedFromDb = [];
     // Open a request to the database
  const openRequest = indexedDB.open(sourceDB);

  openRequest.onupgradeneeded = function(e) {
    /* Not needed here, assume no upgrade doing this function
      const db = e.target.result;
      // Create a store named 'myStore' if it doesn't already exist
      if (!db.objectStoreNames.contains('myStore')) {
          db.createObjectStore('myStore', { keyPath: 'id' });
      }   
    */
  };
  
  openRequest.onsuccess = function(e) {
      const db = e.target.result;
      // Start a new transaction
      const transaction = db.transaction(myStore, 'readonly');
      const store = transaction.objectStore(myStore);
      
      // Retrieve the record with the known key path value
      let count = 0;
      let stop = finalList.length - 1;
      finalList.forEach((keyPathValue) => {
        const getRequest = store.get(keyPathValue);
        getRequest.onsuccess = function() {
          // Do something with the request.result
          //console.log('Consider Array and Syc to keep order ???    RuleArray:'+count);
          count++;  
          //console.log(getRequest.result);
          arrayOfRetrievedFromDb.push(getRequest.result);
          if(stop === count){
            console.log("arrayOfRetrievedFromDb");
            console.log(arrayOfRetrievedFromDb);
          }
      };
    });
  };
  openRequest.onerror = function() {
      // Handle errors
      console.error('IndexedDB error:', openRequest.error);
  };
}

  function getIndexedDBRule(keyPathValue , myStore, sourceDB){
    console.log("function getIndexedDBRule(keyPathValue , myStore, sourceDB){ 2024-10-08 15:54");
    console.log("function getIndexedDBRule(keyPathValue){");
    // Open a request to the database
    const openRequest = indexedDB.open(sourceDB);
    openRequest.onupgradeneeded = function(e) {
      /* Not needed here, assume no upgrade doing this function
        const db = e.target.result;
        // Create a store named 'myStore' if it doesn't already exist
        if (!db.objectStoreNames.contains('myStore')) {
            db.createObjectStore('myStore', { keyPath: 'id' });
        }
      */
  };

  openRequest.onsuccess = function(e) {
      const db = e.target.result;
      // Start a new transaction
      const transaction = db.transaction(myStore, 'readonly');
      const store = transaction.objectStore(myStore);
      
      // Retrieve the record with the known key path value
      const getRequest = store.get(keyPathValue);
      
      getRequest.onsuccess = function() {
          // Do something with the request.result
          console.log(getRequest.result);
      };
  };
  
  openRequest.onerror = function() {
      // Handle errors
      console.error('IndexedDB error:', openRequest.error);
  };
  
  }
  
  function makeStringIfiedFilteredList(filteredList) {
    console.log("function makeStringIfiedFilteredList(filteredList) {");
    let stringIfiedFilteredList = [];
    filteredList.forEach((element) => stringIfiedFilteredList.push(JSON.stringify(element)));
    console.log("stringIfiedFilteredList");
    console.log(stringIfiedFilteredList);
    //let unique = stringIfiedFilteredList.filter(onlyUnique);
    let unique = [...new Set(stringIfiedFilteredList)];
    //return stringIfiedFilteredList;
    return unique
  }
  
  function makeParsedreducedList(reducedstringIfiedFilteredList) {
    console.log("function makeParsedreducedList(reducedstringIfiedFilteredList) { 2024-08-07   17:22");
    let parsedReducedList = [];
    reducedstringIfiedFilteredList.forEach((element) => parsedReducedList.push(JSON.parse(element)));
    console.log("parsedReducedList");
    console.log(parsedReducedList);
    //parsedReducedList.forEach((element) => getIndexedDBRule(element , "ruleStore", "authorExcuTrust"));
    return parsedReducedList
  }
  
  
  function getTheRowID (element) {
    console.log("function getTheRowID (element) {");
    let theID = Array.from(element.getElementsByClassName("questionnaireRowRuleID")) ;
    console.log("*** theID, then Value");
    console.log(theID);
    console.log(theID[0].textContent);
    console.log(theID[0].textContent.trim());
    console.log("*** theID, then Value***");
    return theID[0].textContent.trim()
  }
  
  function buildKeyPathListForStringfied() {
    console.log("uildKeyPathListForStringfiedAndParsed ()  *** *** 2024-08-07 19:42");
    let theCount = 0;
    let ruleWrapperClassList = Array.from(document.getElementsByClassName("ruleWrapper")) ;
    ruleWrapperClassList.forEach((element) => {element.classList.add("modal-filter-row")});
    console.log(ruleWrapperClassList);
    let groupruleWrapperClassList = Array.from(document.getElementsByClassName("groupruleWrapper")) ;
    groupruleWrapperClassList.forEach((element) => {element.classList.add("modal-filter-row")});
    console.log(groupruleWrapperClassList);
    let modalList = Array.from(document.getElementsByClassName("modal-filter-row"));
    console.log("modalList");
    console.log(modalList);
    let filteredList = [];
    modalList.forEach((element) => { 
      if(element.dataset.questionnairerowruleauthor !== undefined) {
        console.log(`element.dataset.questionnairerowruleauthor !== undefined ?? with count  ${theCount}`);
        //filteredList.push(theCount);
        //filteredList.push(element.dataset.questionnairerowruleauthor);
        const rowIDText = getTheRowID(element);
  
        //filteredList.push(rowIDText);
        //filteredList.push(element.dataset.questionnairerowruletid);
        //filteredList.push(element.dataset.questionnairerowruletype);
        console.log(`array ${[element.dataset.questionnairerowruletype,1,element.dataset.questionnairerowruleauthor,1,rowIDText]}`);
        filteredList.push([element.dataset.questionnairerowruletype,1,element.dataset.questionnairerowruleauthor,1,rowIDText])
      }
      else{
        console.log(`element.dataset.questionnairerowruleauthor === undefined ?? with count  ${theCount}`);
        //consol.log(element.dataset.questionnairerowruleauthor);
        //consol.log(element)
      }
      theCount++
    });
      /*
      if(element.dataset.questionnairerowruleauthor === undefined || element.dataset.questionnairerowruleauthor === "undefined" || element.dataset.questionnairerowruletid === "undefined" || element.dataset.questionnairerowruletid === undefined) {}else{filteredList.push(element)}
    });
    */
    console.log("filteredList = []");
    console.log(filteredList);
    let stringIfiedFilteredList = makeStringIfiedFilteredList(filteredList);
    console.log("reducedstringIfiedFilteredList ");
    let reducedstringIfiedFilteredList = stringIfiedFilteredList.flat();
    console.log(reducedstringIfiedFilteredList);
    if( 1 === 1) {
      return reducedstringIfiedFilteredList    
    } else
    {
     makeParsedreducedList(reducedstringIfiedFilteredList),
     console.log (makeParsedreducedList(reducedstringIfiedFilteredList));
     let finalList = makeParsedreducedList(reducedstringIfiedFilteredList);
     console.log("finalList ************ *************************** ********************** 2024-08-07 17:28 *************************************");
     console.log(finalList);
     stopTheNonsense();
    }
  
  }
  
  
  function buildKeyPathListForStringfiedAndParsed () {
    console.log("uildKeyPathListForStringfiedAndParsed ()  *** *** 2024-08-07 19:42");
    let theCount = 0;
    let ruleWrapperClassList = Array.from(document.getElementsByClassName("ruleWrapper")) ;
    ruleWrapperClassList.forEach((element) => {element.classList.add("modal-filter-row")});
    console.log(ruleWrapperClassList);
    let groupruleWrapperClassList = Array.from(document.getElementsByClassName("groupruleWrapper")) ;
    groupruleWrapperClassList.forEach((element) => {element.classList.add("modal-filter-row")});
    console.log(groupruleWrapperClassList);
    let modalList = Array.from(document.getElementsByClassName("modal-filter-row"));
    console.log("modalList");
    console.log(modalList);
    let filteredList = [];
    modalList.forEach((element) => { 
      if(element.dataset.questionnairerowruleauthor !== undefined) {
        console.log(`element.dataset.questionnairerowruleauthor !== undefined ?? with count  ${theCount}`);
        //filteredList.push(theCount);
        //filteredList.push(element.dataset.questionnairerowruleauthor);
        const rowIDText = getTheRowID(element);
  
        //filteredList.push(rowIDText);
        //filteredList.push(element.dataset.questionnairerowruletid);
        //filteredList.push(element.dataset.questionnairerowruletype);
        console.log(`array ${[element.dataset.questionnairerowruletype,1,element.dataset.questionnairerowruleauthor,1,rowIDText]}`);
        filteredList.push([element.dataset.questionnairerowruletype,1,element.dataset.questionnairerowruleauthor,1,rowIDText])
      }
      else{
        console.log(`element.dataset.questionnairerowruleauthor === undefined ?? with count  ${theCount}`);
        //consol.log(element.dataset.questionnairerowruleauthor);
        //consol.log(element)
      }
      theCount++
    });
      /*
      if(element.dataset.questionnairerowruleauthor === undefined || element.dataset.questionnairerowruleauthor === "undefined" || element.dataset.questionnairerowruletid === "undefined" || element.dataset.questionnairerowruletid === undefined) {}else{filteredList.push(element)}
    });
    */
    console.log("filteredList = []");
    console.log(filteredList);
    let stringIfiedFilteredList = makeStringIfiedFilteredList(filteredList);
    console.log("reducedstringIfiedFilteredList ");
    let reducedstringIfiedFilteredList = stringIfiedFilteredList.flat();
    console.log(reducedstringIfiedFilteredList);
    makeParsedreducedList(reducedstringIfiedFilteredList),
    console.log (makeParsedreducedList(reducedstringIfiedFilteredList));
    let finalList = makeParsedreducedList(reducedstringIfiedFilteredList);
    console.log("finalList ************ *************************** ********************** 2024-08-07 17:28 *************************************");
    console.log(finalList);
    stopTheNonsense();
  }
  function buildKeyPathList() {
    console.log("function getTheRowID (element) {");
    let theCount = 0;
    let ruleWrapperClassList = Array.from(document.getElementsByClassName("ruleWrapper")) ;
    ruleWrapperClassList.forEach((element) => {element.classList.add("modal-filter-row")});
    console.log(ruleWrapperClassList);
    let groupruleWrapperClassList = Array.from(document.getElementsByClassName("groupruleWrapper")) ;
    groupruleWrapperClassList.forEach((element) => {element.classList.add("modal-filter-row")});
    console.log(groupruleWrapperClassList);
    let modalList = Array.from(document.getElementsByClassName("modal-filter-row"));
    console.log("modalList");
    console.log(modalList);
    let filteredList = [];
    modalList.forEach((element) => { 
      if(element.dataset.questionnairerowruleauthor !== undefined) {
        console.log(`element.dataset.questionnairerowruleauthor !== undefined ?? with count  ${theCount}`);
        //filteredList.push(theCount);
        //filteredList.push(element.dataset.questionnairerowruleauthor);
        const rowIDText = getTheRowID(element);
  
        //filteredList.push(rowIDText);
        //filteredList.push(element.dataset.questionnairerowruletid);
        //filteredList.push(element.dataset.questionnairerowruletype);
        console.log(`array ${[element.dataset.questionnairerowruletype,1,element.dataset.questionnairerowruleauthor,1,rowIDText]}`);
        filteredList.push([element.dataset.questionnairerowruletype,1,element.dataset.questionnairerowruleauthor,1,rowIDText])
      }
      else{
        console.log(`element.dataset.questionnairerowruleauthor === undefined ?? with count  ${theCount}`);
        //consol.log(element.dataset.questionnairerowruleauthor);
        //consol.log(element)
      }
      theCount++
    });
      /*
      if(element.dataset.questionnairerowruleauthor === undefined || element.dataset.questionnairerowruleauthor === "undefined" || element.dataset.questionnairerowruletid === "undefined" || element.dataset.questionnairerowruletid === undefined) {}else{filteredList.push(element)}
    });
    */
    console.log("filteredList = []");
    console.log(filteredList);
    let stringIfiedFilteredList = makeStringIfiedFilteredList(filteredList);
    console.log("reducedstringIfiedFilteredList ");
    let reducedstringIfiedFilteredList = stringIfiedFilteredList.flat();
    console.log(reducedstringIfiedFilteredList);
    makeParsedreducedList(reducedstringIfiedFilteredList),
    console.log (makeParsedreducedList(reducedstringIfiedFilteredList));
    let finalList = makeParsedreducedList(reducedstringIfiedFilteredList);
    console.log("finalList ************ *************************** ********************** 2024-08-07 17:28 *************************************");
    console.log(finalList);
    stopTheNonsense();
   // finalList.forEach((element) => getIndexedDBRule(element , "ruleStore", "authorExcuTrust")); // *** CONSIDER SENDING ARRAY ***
  // finalList.push("nonsense");
    getIndexedDBRuleArray(finalList , "ruleStore", "authorExcuTrust");
    /**/
    let uf = document.getElementsByClassName("modal-filter-row") ;
    console.log("*********************************************** uf - 2024-07-20 11:42am *********************************************************");
    console.log(uf);
    console.log("uf - 2024-07-20 11:42am ??");
    console.log("*************************************************************uf - 2024-08-01 12:44 pm***********************************");
    //stopThisNonsense
  }
  
  function makeGroupRuleSource(groupRule) {
    console.log("function makeGroupRuleSource(groupRule) {");
    console.log("groupRule");
    console.log(groupRule);
    let allSources = [];
    const numberOfSources = groupRule.allRowChoices.length ;
    console.log("numberOfSources");
    console.log(numberOfSources);
    for (let index = 0; index < numberOfSources; index++) {
      let uniqueSource = [groupRule.allArrayType[index],1,groupRule.allArrayAuthor[index],1,groupRule.allArrayID[index]];
      allSources.push(uniqueSource)
    }
    return allSources
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

  function splitNestedArrayForFireStore (nestedArray) {
    console.log("function splitNestedArrayForFireStore (nestedArray) {");
    console.log("nestedArray");
    console.log(nestedArray);
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
  
  function getAllRowChoiceFromHTML(){
  //function buildAllArrayTemp (){
    //console.log("function buildAllArrayTemp (){   2023-03-09 17:48");
    console.log("function getAllRowChoiceFromHTML()   2024-11-07-08:09 - includes duplicates if any");
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
  
async  function getObjectFromIndexedDB(keyPathValue) {
    console.log("function getObjectFromIndexedDB(keyPathValue) { 2024-10-05 08:36");
    console.log("keyPathValue");
    console.log(keyPathValue);
    let newObject = {};
    let data;
    // Open the database
    let request =  indexedDB.open('authorExcuTrust');
    request.onsuccess = async function(event) {
      console.log(" request.onsuccess = async function(event)");
      let db = event.target.result;
      console.log("db 2024-09-08 12:50");
      console.log(db);
      let transaction = db.transaction(['ruleStore'], 'readonly');
      let store = transaction.objectStore('ruleStore');
  
      // Retrieve the object using the keypath value
      console.log("let getRequest = await store.get(keyPathValue) - next id keypath value; 2024-09-08 12:54");
      console.log(keyPathValue);
      //let getRequest = await store.get(keyPathValue);
      let getRequest =  await store.get(keyPathValue);
      console.log("getRequest  2024-09-08 12:56");
      console.log(getRequest);
       getRequest.onsuccess = function(event) {
        console.log("event 2024-09-08 13:36" );
        console.log(event);
        console.log("*** getRequest.onsuccess = function(event) {   2024-09-08 13:05 ***")
          data = event.target.result;
          console.log("data 2024-09-08 13:07 ");
          console.log(data);
          if (data) {
              console.log('Object retrieved: 2024-10-05 09:01', data);
              //return data
               newObject = data ;
              console.log("newObject 2024-10-05 12:52");
              console.log(newObject);
              return newObject
              //db.close();
          } else {
              console.log('No object found with the given keypath value.');
          }
      };
      getRequest.onerror = async function(event) {
          console.error('Error retrieving object:',  event.target.error);
      };
    };
    request.onerror = async function(event) {
      console.error('Error opening database:', event.target.error);
    };
    //db.close();
    //console.log(" see data and return data 2024-10-05 11:46");
    /*
    console.log("newObject 2024-10-05 12:38 - last")
    console.log(newObject);
    return newObject
    */
  }

  async function getHtmlWording(theObject) {
    console.log("function getHtmlWording(theObject) {, next is theObject, now cheking if array 2024-10-05 08:30");
    console.log(theObject);
    let result = Array.isArray(theObject);
    console.log("result 2024-10-05 08:30");
    console.log(result);
    if(result) {
        theObject = await getObjectFromIndexedDB(theObject, "fromFunctionGetHtmlWording");
        console.log("theObject from the keyPathValue 2024-10-05 08:30");
        console.log(theObject);
        return theObject
    }
    let tempText = "not saved tempText";
    let ruleDescription = " ";
    console.log("tempText / theObject");
    console.log(tempText);
    console.log(theObject);
    if(theObject.ruleContent) {ruleDescription = theObject.ruleContent };
    if( theObject.keyPathValue[0] === "groupruleStore") {
      tempText =`<div data-questionnairerowruletype="groupruleStore" data-questionnairerowruleauthor="${theObject.keyPathValue[2]}" data-questionnairerowruletid="${theObject.keyPathValue[4]}" class="row rowChoice m-0 groupruleWrapper">
        <div col-1"=""> </div>
        <div col-1"=""> </div>
        <div class="col-6"><span class="questionRuleDescription"><button class="QuestionnaireRule questionnaireSelectRule " type="submit">Select Display Rule or Collection </button> <span><b>Display Rule Collection</b><br></span><b>Author:&nbsp;</b><span class="questionnaireRowRuleAuthor modal-author">${theObject.keyPathValue[2]}</span><b>&nbsp; ID:&nbsp;</b><span class="questionnaireRowRuleID modal-ID">${theObject.keyPathValue[4]}</span><br>${ruleDescription}</span></div>
        <div class="col-3 questionnairecloud">Saved</div>
        <div class="col-1"><input type="Button" class="deleteBtn" value="Delete"><br><br><input type="Button" class="copyBtn" value="Insert"></div>
      </div>`
    } else {
        console.log("tempText - 2024-10-08 08:07");
      tempText = `<div data-questionnairerowruletype="trueruleStore" data-questionnairerowruleauthor="${theObject.keyPathValue[2]}" data-questionnairerowruletid="${theObject.keyPathValue[4]}" class="row rowChoice m-0 ruleWrapper">
        <div col-1"=""> </div>
        <div col-1"=""> </div>
        <div class="col-6"><span class="questionRuleDescription"><button class="QuestionnaireRule questionnaireSelectRule " type="submit">Select Display Rule or Collection </button> <span><b>Display Rule</b><br></span><b>Author:&nbsp;</b><span class="questionnaireRowRuleAuthor modal-author">${theObject.keyPathValue[2]}</span><b>&nbsp; ID:&nbsp;</b><span class="questionnaireRowRuleID modal-ID">${theObject.keyPathValue[4]}<b>&nbsp; Title:&nbsp;</b></span><span class ="ruleDescription">${ruleDescription}</span></span></div>
        <div class="col-3 questionnairecloud">Saved</div>
        <div class="col-1"><input type="Button" class="deleteBtn" value="Delete"><br><br><input type="Button" class="copyBtn" value="Insert"></div>
      </div>`
    }
    console.log("tempText - 2nd");
    console.log(tempText);
    return tempText
  }

  async function getRowHtmlV2(grouprule) {
    console.log("*** async function getRowHtmlV2(grouprule) {*** 2024-10-01- 15:20")
      // Open the database
    let request =  indexedDB.open('authorExcuTrust');
    request.onsuccess = async function(event) {
      console.log("**** 2024-10-01 15:14  request.onsuccess = async function(event) ******");
      let db = await event.target.result;
      console.log("db 2024-09-08 12:50");
      console.log(db);
      let transaction = db.transaction(['ruleStore'], 'readonly');
      let store = transaction.objectStore('ruleStore');
      // Retrieve the object using the keypath value
      console.log("let getRequest = await store.get(keyPathValues) - next id keypath value; 2024-09-08 12:54");
      console.log(grouprule.parsedReducedList);
      let theLength = grouprule.parsedReducedList.length;
      for(let counter = 0; counter < theLength; counter++) {
        console.log("counter from getRowHTMLV2");
        console.log(counter);
        let getRequest =  await store.get(grouprule.parsedReducedList[counter]);
        getRequest.onsuccess = async function (event){
          let theObject = await event.target.result;
          console.log("theObject 2024-10-07 08:46");
          console.log(theObject);
          let tallChoicesWordtext = await getHtmlWording(theObject);
          if(grouprule.tAllRowChoicesString === undefined) {grouprule.tAllRowChoicesString = tallChoicesWordtext} else {grouprule.tAllRowChoicesString = grouprule.tAllRowChoicesString + tallChoicesWordtext};
          //grouprule.tAllRowChoices.push (getHtmlWording(theObject));
          grouprule.tAllRowChoices.push (tallChoicesWordtext);
          console.log("*** grouprule 2021-10-07 08:53 ***");
          console.log(grouprule)
        }
        getRequest.onerror = async function(event) {
          console.error('Error retrieving object:',  event.target.error);
        }
      }
      db.close();
    }
    console.log("grouprule after db.close() 2024-10-07 09:15");
    console.log(grouprule);
    removePriorClassItems();
    let allRulesDiv = document.getElementById("questionAnswerChoices");
    console.log("allRulesDiv = document.getElementById(questionAnswerChoices) 2024-10-07 09:19");
    console.log(allRulesDiv);
    let NewAllRulesDiv = document.getElementById("questionAnswerChoices");
    console.log("NewAllRulesDiv = document.getElementById(questionAnswerChoices) 2024-10-07 09:19");
    NewAllRulesDiv.insertAdjacentHTML('beforeend', grouprule.tAllRowChoicesString);
    console.log(NewAllRulesDiv);
    //stopTheNonsense();
    console.log("stopTheNonsense() 2024-10-17 19:34");
    console.log("2024-11-05 10:12");
    return grouprule
  }

  async function getRowHtml(element) {
    console.log("function getRowHtml(element) { - next is element value");
    console.log(element);
    let tempText = "not saved tempText";
    let ruleDescription = " ??? ";
    console.log("tempText");
    console.log(tempText);
    let data = await getObjectFromIndexedDB(element);
    console.log("data 2024-09-08 11:50");
    console.log(data);
    if(data.ruleContent) {ruleDescription = data.ruleContent };
    if( element[0] === "groupruleStore") {
      tempText =`<div data-questionnairerowruletype="groupruleStore" data-questionnairerowruleauthor="${element[2]}" data-questionnairerowruletid="${element[4]}" class="row rowChoice m-0 groupruleWrapper">
        <div col-1"=""> </div>
        <div col-1"=""> </div>
        <div class="col-6"><span class="questionRuleDescription"><button class="QuestionnaireRule questionnaireSelectRule " type="submit">Select Display Rule or Collection </button> <span><b>Display Rule Collection</b><br></span><b>Author:&nbsp;</b><span class="questionnaireRowRuleAuthor modal-author">${element[2]}</span><b>&nbsp; ID:&nbsp;</b><span class="questionnaireRowRuleID modal-ID">${element[4]}</span>${ruleDescription}</span></div>
        <div class="col-3 questionnairecloud">Saved</div>
        <div class="col-1"><input type="Button" class="deleteBtn" value="Delete"><br><br><input type="Button" class="copyBtn" value="Insert"></div>
      </div>`
    } else {
      tempText = `<div data-questionnairerowruletype="trueruleStore" data-questionnairerowruleauthor="${element[2]}" data-questionnairerowruletid="${element[4]}" class="row rowChoice m-0 ruleWrapper">
        <div col-1"=""> </div>
        <div col-1"=""> </div>
        <div class="col-6"><span class="questionRuleDescription"><button class="QuestionnaireRule questionnaireSelectRule " type="submit">Select Display Rule or Collection </button> <span><b>Display Rule</b><br></span><b>Author:&nbsp;</b><span class="questionnaireRowRuleAuthor modal-author">${element[2]}</span><b>&nbsp; ID:&nbsp;</b><span class="questionnaireRowRuleID modal-ID">${element[4]}<b>&nbsp; Title:&nbsp;</b></span><span class ="ruleDescription">${ruleDescription}</span></span></div>
        <div class="col-6"><span class="questionRuleDescription"><button class="QuestionnaireRule questionnaireSelectRule " type="submit">Select Display Rule or Collection </button> <span><b>Display Rule</b><br></span><b>Author:&nbsp;</b><span class="questionnaireRowRuleAuthor modal-author">${element[2]}</span><b>&nbsp; ID:&nbsp;</b><span class="questionnaireRowRuleID modal-ID">${element[4]}<b>&nbsp; Title:&nbsp;</b></span><span class ="ruleDescription">${ruleDescription}</span></span></div>
        <div class="col-3 questionnairecloud">Saved</div>
        <div class="col-1"><input type="Button" class="deleteBtn" value="Delete"><br><br><input type="Button" class="copyBtn" value="Insert"></div>
      </div>`
    }
    console.log("tempText - 2nd");
    console.log(tempText);
    return tempText
  }
  
  function replaceModalFilterRow (groupRule){
    console.log("function replaceModalFilterRow (groupRule){");
    // Assuming `newElements` is an array or NodeList of the new elements to replace with
  const modalRows = document.querySelectorAll('.modal-filter-row');  // Select all current modal-filter-row elements
  //const newElements = [...];  // Replace this with the array of new elements you want to add
  const newElements = groupRule.tAllRowChoices;
  
  // Loop through and replace existing elements with new elements
  modalRows.forEach((modalRow, index) => {
    console.log("modalRow");
    console.log(modalRow);
    console.log("index");
    console.log();
    if (newElements[index]) {
      modalRow.replaceWith(newElements[index]); // Replace the element if there is a new one
    } else {
      modalRow.remove(); // Remove the extra modal-filter-row if there are no more new elements
    }
  });
  
  // If there are more new elements than existing modalRows, append the remaining new elements
  if (newElements.length > modalRows.length) {
    const parentElement = modalRows[0]?.parentNode || document.body; // Use the parent of modalRows or the body
    newElements.slice(modalRows.length).forEach(newElement => {
      parentElement.appendChild(newElement);  // Append the extra new elements
    });
  }
  /*
  console.log("function replaceModalFilterRow (groupRule){")
    let originalElements = document.getElementsByClassName("modal-filter-row");
    groupRule.lastOriginal  = originalElements.length;
    groupRule.lastNew = groupRule.tAllRowChoices.length;
    if(groupRule.lastOriginal > groupRule.lastNew) {
      doUpToLastNew(originalElements, groupRule)
    } else if(groupRule.lastOriginal < groupRule.lastNew) {
      addToToLast(originalElements, groupRule)
    }
    */
  }

  async function fixAllRowChoicesV2(grouprule){
    console.log("function fixAllRowChoicesV2(grouprule){ 2024-10-01-15:16 ***")
    grouprule.tAllRowChoices = [];
    grouprule = await getRowHtmlV2(grouprule);
    return grouprule
  }
  /*
  function fixAllRowChoices(grouprule){
    console.log("function fixAllRowChoices(grouprule){ 2024-10-06 10:27");
    grouprule.tAllRowChoicesB = [];
    grouprule.parsedReducedList.forEach((element) => grouprule.tAllRowChoicesB.push(getRowHtml(element)));
    return grouprule
  }
  */

  function fixAllArrayID(grouprule) {
    console.log("function fixAllArrayID(grouprule) { 2024-10-17 22:09");
    grouprule.allArrayID = [];
    grouprule.parsedReducedList.forEach((element) => grouprule.allArrayID.push(element[4]));
    return grouprule
  }

  function fixGroupruleSource(grouprule) {
    console.log("function fixGroupruleSource(grouprule) { 2024-10-17 22:11");
    grouprule.groupRuleSource = [];
    grouprule.parsedReducedList.forEach((element) => grouprule.groupRuleSource.push(element));
    return grouprule
  }

  async function fixGrouprule(grouprule) {
    console.log("function fixGrouprule(grouprule) { 2024-10-17 22:12");
    grouprule =  fixGroupruleSource(grouprule);
    grouprule =  fixAllArrayID(grouprule);
    //grouprule = fixAllRowChoices(grouprule);
    grouprule = await fixAllRowChoicesV2(grouprule);
    showCurrentGroupRule(grouprule);
    return grouprule
  }
  
function removePriorClassItems(){
    let paras = document.getElementsByClassName("rowChoice");
    while(paras[0]) {
        paras[0].parentNode.removeChild(paras[0]);
    }
}

async function insertNewClassItemsPart2(element, allRulesDiv){
    console.log("function insertNewClassItemsPart2(element, allRulesDiv){ 2024-10-05 13:01");
    console.log("element");
    console.log(element);
    console.log("allRulesDiv");
    console.log(allRulesDiv);
    let newElement = await getHtmlWording(element);
    console.log("newElement");
    console.log(newElement);
    allRulesDiv.insertAdjacentElement("beforeend", newElement)
}

function insertNewClassItems(groupRuleSource){
    console.log("function insertNewClassItems(groupRuleSource){");
    console.log("groupRuleSource");
    console.log(groupRuleSource);
    let allRulesDiv = document.getElementById("questionAnswerChoices");
    console.log("allRulesDiv");
    console.log(allRulesDiv);
    groupRuleSource.forEach((element) =>  insertNewClassItemsPart2(element, allRulesDiv))
}

function appendNewHtml(tAllRowChoices){
  console.log("function appendNewHtml(tAllRowChoices){ 2024-10-17 20:04 - groupRule = problem is array tAllRowChoices IS NOT COMPLETE YET AND DISAPPEARS *** *** ");
  console.log(tAllRowChoices);
  /*
  let theString = JSON.stringify(grouprule);
  let newObject = JSON.parse(theString);
  console.log("tAllRowChoices 2024-10-17 21:30");
  */
  //console.log(newObject);
  //console.log(tAllRowChoices);
  console.log(tAllRowChoices.length);
  let frag = document.createDocumentFragment();
  let theCount = newObject.tAllRowChoices.length;
  console.log("theCount 2024-10-17 21:17");
  console.log(theCount);
  let newElement;
  for(let index = 0; index < theCount; index++) {
    newElement = document.createElement("div");
    newElement.innerHTML = newObject.tAllRowChoices[index];
    console.log("newElement.outerHTML 2024-10-17 21:14");
    console.log(newElement.outerHTML);
    console.log("newElement.child[0]) 2024-10-17 20:21");
    console.log(newElement.child[0].outerHTML);
    frag.appendChild(newElement.child[0]);
  };
  let place = document.getElementById("questionAnswerChoices");
  console.log("place, before and after 2024-10-17 20:27");
  console.log(place);
  place.appendChild(frag) ;
  console.log("place, before and after 2024-10-17 20:28");
  console.log(place);
  let textPlace = place.outerHTML;
  console.log("textPlace 2024-10-17 21:03");
  console.log(textPlace)
}

function showCurrentGroupRule(grouprule) {
    console.log("function showCurrentGroupRule(grouprule){ 2024-10-17 22:30");
    console.log("grouprule");
    console.log(grouprule);
    let tempString = JSON.stringify(grouprule);
    console.log("tempString 2024-10-17 22:12 likely has blank tAllRowChoices");
    console.log(JSON.parse(tempString))
}

async function getObjectFromIndexedDB1(dbName, storeName, key) {
  let openRequest, db, tx, store, getRequest, theObject;
  theObject = {};
    // Initialize the IndexedDB connection
  openRequest = indexedDB.open(dbName);
  openRequest.onerror = () => {
    // Handle errors
    console.error('IndexedDB error:', openRequest.error)};
    openRequest.onsuccess =  async function () {
      db = openRequest.result;
      tx = db.transaction(storeName, 'readonly');
      store = tx.objectStore(storeName);
      getRequest =  store.get(key);
      getRequest.onerror = () => {
        // Handle errors
        console.error('Error getting object from store:', getRequest.error)
      };
      getRequest.onsuccess = () => {
        // Process the object
        console.log('Object retrieved:', getRequest.result);
        theObject = getRequest.result;
        db.close();
      }
    };
  return theObject
}

async function getRuleContents1(dbName, storeName, keys, grouprule) {
  console.log("function getRuleContents(dbName, storeName, keys) { 2024-10-28 13:37");
  console.log("dbName");
  console.log(dbName);
  console.log("storeName");
  console.log(storeName);
  console.log("keys");
  console.log(keys);
  grouprule.tAllRowChoices = [];
  keys.forEach(async (key) => {
    let ruleDescription ;
    let newElement = await getObjectFromIndexedDB1(dbName, storeName, key);
    console.log("newElement");
    console.log(JSON.parse(JSON.stringify(newElement)));
    console.log("key");
    console.log(JSON.parse(JSON.stringify(key)));
    ruleDescription = 'Blank description or not found';
    if(newElement.ruleContent) {ruleDescription = newElement.ruleContent } else if(newElement.ruleContentInnerText) {ruleDescription = newElement.ruleContentInnerText};
    grouprule.tAllRowChoices.push(ruleDescription);
  });
  console.log("grouprule");
  console.log(JSON.parse(JSON.stringify(grouprule)));
  return grouprule
}
function getGroupruleInnerHtmlRow(theObject) {
  let ruleDescription = 'No Description Available';
  console.log("function getGroupruleInnerHtmlRow(element) { 2024-10-29 19:09 ");
  if(theObject.groupruleContent) {ruleDescription = theObject.groupruleContent } else if(theObject.groupruleContentInnerText) {ruleDescription = theObject.groupruleContentInnerText};
  return `<div data-questionnairerowruletype="groupruleStore" data-questionnairerowruleauthor="${theObject.keyPathValue[2]}" data-questionnairerowruletid="${theObject.keyPathValue[4]}" class="row rowChoice m-0 groupruleWrapper">
        <div col-1"=""> </div>
        <div col-1"=""> </div>
        <div class="col-6"><span class="questionRuleDescription"><button class="QuestionnaireRule questionnaireSelectRule " type="submit">Select Display Rule or Collection </button> <span><b>Display Rule Collection</b><br></span><b>Author:&nbsp;</b><span class="questionnaireRowRuleAuthor modal-author">${theObject.keyPathValue[2]}</span><b>&nbsp; ID:&nbsp;</b><span class="questionnaireRowRuleID modal-ID">${theObject.keyPathValue[4]}<b>&nbsp; Title:&nbsp;</b></span><span class ="ruleDescription">${ruleDescription}</span></span></div>
        <div class="col-3 questionnairecloud">Saved</div>
        <div class="col-1"><input type="Button" class="deleteBtn" value="Delete"><br><br><input type="Button" class="copyBtn" value="Insert"></div>
      </div>`
}
function getTrueruleInnerHtmlRow(theObject) {
  let ruleDescription = 'No Description Available';
  console.log("function getTrueruleInnerHtmlRow(element) { 2024-10-29 19:09 ");
  if(theObject.ruleContent) {ruleDescription = theObject.ruleContent } else if(theObject.ruleContentInnerText) {ruleDescription = theObject.ruleContentInnerText};
  return `<div data-questionnairerowruletype="trueruleStore" data-questionnairerowruleauthor="${theObject.keyPathValue[2]}" data-questionnairerowruletid="${theObject.keyPathValue[4]}" class="row rowChoice m-0 ruleWrapper">
        <div col-1"=""> </div>
        <div col-1"=""> </div>
        <div class="col-6"><span class="questionRuleDescription"><button class="QuestionnaireRule questionnaireSelectRule " type="submit">Select Display Rule or Collection </button> <span><b>Display Rule</b><br></span><b>Author:&nbsp;</b><span class="questionnaireRowRuleAuthor modal-author">${theObject.keyPathValue[2]}</span><b>&nbsp; ID:&nbsp;</b><span class="questionnaireRowRuleID modal-ID">${theObject.keyPathValue[4]}<b>&nbsp; Title:&nbsp;</b></span><span class ="ruleDescription">${ruleDescription}</span></span></div>
        <div class="col-3 questionnairecloud">Saved</div>
        <div class="col-1"><input type="Button" class="deleteBtn" value="Delete"><br><br><input type="Button" class="copyBtn" value="Insert"></div>
      </div>`
}
function replaceInnerHTMLquestionAnswerChoices() {
  document.getElementById("questionAnswerChoices").innerHTML = '<div class="row NOrowChoice m-0"><div class="text-primary col-4"><b>Display Rules:</b></div><br></div>'
}
function addNoDuplicatesToRules(objectList) {
  console.log("function addNoDuplicatesToRules(objectList) { 2024-10-29 18:32");
  console.log("objectList 2025-06-07 16:21");
  console.log(objectList);
  let frag = document.createDocumentFragment();
  objectList.forEach((element) => {
    let innerHtmlRow  = '<div></div>';
    let newElement = document.createElement("div");
    let allRowChoices = [];
    if(element.keyPathValue[0] === "groupruleStore") {
      innerHtmlRow = getGroupruleInnerHtmlRow(element)} else if(element.keyPathValue[0] === "trueruleStore") { innerHtmlRow = getTrueruleInnerHtmlRow(element)};
      console.log("innerHtmlRow 2024-10-29 19:35a");
      console.log(innerHtmlRow);
      newElement.innerHTML = innerHtmlRow;
      console.log("newElement 2024-10-29 19:35b");
      console.log(newElement);
      console.log(newElement.children[0]);
      frag.appendChild(newElement.children[0]);
      allRowChoices.push(newElement.children[0]);
  });
  let place = document.getElementById("groupruleWrapper");
  place.appendChild(frag);
  replaceInnerHTMLquestionAnswerChoices()
}

function modifyForNestedArrays(newGroup) {
  function testForAnySubArrays(subArrayCount, testCount , subArrayGroup){
    let trueFalseSubArray = false;
    while(testCount < subArrayCount) {
      if(Array.isArray(subArrayGroup[testCount])) {
        trueFalseSubArray = true;
        testCount = subArrayCount;
      }
      testCount++
    }
    return trueFalseSubArray
  }
  console.log("newGroup 2024-11-08 08:32");
  console.log(newGroup);
  const objectPropertyNames = Object.getOwnPropertyNames(newGroup);
  console.log("objectPropertyNames 2024-11-08 09:13");
  console.log(objectPropertyNames);
  objectPropertyNames.forEach((element) => {
    console.log("element 2024-11-08 09:13");
    let propertyName = element;
    console.log(element);
    console.log(newGroup[element]);
    if(Array.isArray(newGroup[element])) {
      console.log(`isArray( newGroup[${element}]) 2024-11-08 09:13`);
      let subArrayCount = newGroup[element].length;
      if(subArrayCount > 0) {
        let testCount = 0;
        const trueFalseSubArray = testForAnySubArrays(subArrayCount,    testCount , newGroup[element]);
        if(trueFalseSubArray) {
          console.log(`trueFalseSubArray 2024-11-08 10:14`);
          console.log(trueFalseSubArray);
          console.log(`newGroup[${element}] Again 2024-11-08 10:14`);
          console.log(newGroup[element]);
          //if(newGroup.stringifiedArrays.Ob20241108Exist !== true) {newGroup.stringifiedArrays.Ob20241108Exist = true};
          if(newGroup.stringifiedArrays === undefined) {newGroup.stringifiedArrays = {}};
          newGroup.stringifiedArrays[propertyName] = JSON.stringify(newGroup[element]);
          console.log("newGroup - updated");
          console.log(newGroup);
        }
      }
    } else {
      console.log(`NOT isArray( newGroup[${element}]) 2024-11-08 09:13`);
    }
  });
  console.log("newGroup - temp and updated 2024-11-08 11:17");
  let temp = JSON.parse(JSON.stringify(newGroup));
  console.log(temp);
  console.log(newGroup);
  return newGroup
}

async function getRuleContents(dbName, storeName, keys, grouprule) {
  console.log("function getRuleContents(dbName, storeName, keys) { 2024-10-28 13:37");
  console.log("dbName");
  console.log(dbName);
  console.log("storeName");
  console.log(storeName);
  console.log("keys");
  console.log(keys);
  // Initialize the IndexedDB connection
  const request = indexedDB.open(dbName);

  // Return a promise that resolves when the database is ready
  const db = await new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
  });

  /*
  function processObject(object) {
    // Do something with the object
    console.log("object");
    console.log(object);
  }
  */
  const ruleContentGroup = [];
  
  // Use a transaction for read-only access
  const transaction = db.transaction(storeName, 'readonly');
  const store = transaction.objectStore(storeName);

  // Iterate over each key asynchronously
  for (const key of keys) {
      // Retrieve each record by key
      const ruleContent = await new Promise((resolve, reject) => {
          const getRequest = store.get(key);
          //getRequest.onsuccess = () => resolve(getRequest.result?.ruleContent);
          getRequest.onsuccess = () => resolve(getRequest.result);

          getRequest.onerror = () => reject(getRequest.error);
      });
      console.log("ruleContent", ruleContent);
      // Add the rule content to the array if it exists
      if (ruleContent !== undefined) {
          ruleContentGroup.push(ruleContent);
      } else{
        ruleContentGroup.push('');
      }
  }

  // Close the database when done
  db.close();
  console.log("ruleContentGroup");
  console.log(ruleContentGroup);
  grouprule.ruleDescriptions = ruleContentGroup;
  let newGroup = JSON.parse(JSON.stringify(grouprule));
  console.log("newGroup 2024-10-28 13:37");
  console.log(newGroup , grouprule);
  addNoDuplicatesToRules(newGroup.ruleDescriptions);
  newGroup = await modifyForNestedArrays(newGroup);
  console.log("newGroup 2024-11-08 11:25");
  console.log(newGroup);
  storePendingSave(newGroup)
}
/*
// Usage example
(async () => {
  const keys = ['key1', 'key2', 'key3'];  // Replace with actual keys
  const ruleContentGroup = await getRuleContents('myDatabase', 'myObjectStore', keys);
  
  console.log('Rule contents retrieved:', ruleContentGroup);
  // Continue processing after all data is retrieved
})();
*/

function getGroupruleHeaderFromHtml() {
  console.log("function getGroupruleHeaderFromHtml() 2024-11-07-07:52");
  let grouprule = {};
  grouprule.keyPathValue = ["groupruleStore",1,document.getElementById("groupruleAuthor").innerText,1,document.getElementById("groupruleID").innerText] ;
    //grouprule.questionSource = grouprule.keyPathValue; Removed 2023-03-10 11:49
    const tgroupHTML = document.getElementById("groupruleContent");
    grouprule.groupruleContent = tgroupHTML.innerHTML ;
    grouprule.groupruleContentInnerText = tgroupHTML.innerText ;
    return grouprule
}

function removeDuplicateRowChoices(allArrayTemp, grouprule) {
  console.log("function removeDuplicateRowChoices(allArrayTemp) { 2024-11-07-08:24");
  if(allArrayTemp.allArrayTemp.length > 0){
    let objectOfArrays = removeDuplicatesKeepOrder (allArrayTemp) ;
    grouprule.allArrayInnerHTML = objectOfArrays.allItemsInnerHTML ;
    allArrayTemp = objectOfArrays.allItems
  }
  let bothObjects = {};
  bothObjects.allArrayTemp = allArrayTemp;
  bothObjects.grouprule = grouprule;
  return bothObjects
}

function getFirebaseVersionDateSince1969(dateNumber) {
  console.log("getFirebaseVersionDateSince1969( 2024-11-14-09:39");
  const negativeVersion = 9999999999999 - dateNumber;
  const text = negativeVersion.toString();
  return text
}


async function groupruleForFireStoreAndStoreTimeStampsEtc(allArrayTemp, grouprule) {
  console.log("function groupruleForFireStore(allArrayTemp, grouprule) { 2024-11-07-09:08");
    allArrayTemp = splitNestedArrayForFireStore (allArrayTemp);
    grouprule.allArrayType = allArrayTemp.type ;
    grouprule.allArrayAuthor = allArrayTemp.author ;
    grouprule.allArrayID = allArrayTemp.id ;
    console.log("allArrayTemp  ***   2024-08-07 19:19 ***   ***  from  splitNestedArrayForFireStore (allArrayTemp)"); 
    console.log(allArrayTemp);
    grouprule.versionDateSince1969 = Date.now() ;
    grouprule.firebaseVersionDateSince1969 = getFirebaseVersionDateSince1969(grouprule.versionDateSince1969);
    grouprule.localTimeString = Date(grouprule.versionDateSince1969);
    grouprule.UTCstring = Date(grouprule.versionDateSince1969);
    
    // Save new rule logic settings (2026-01-29)
    grouprule.ruleLogicType = document.getElementById("ruleLogicType").value;
    if (grouprule.ruleLogicType === "count") {
      grouprule.minRuleCount = parseInt(document.getElementById("minRuleCount").value) || 1;
    }
    if (grouprule.ruleLogicType === "percent") {
      grouprule.minRulePercent = parseInt(document.getElementById("minRulePercent").value) || 50;
    }
    
    // Backward compatibility: set all0Any1True based on new logic type
    grouprule.all0Any1True = (grouprule.ruleLogicType === "any");
    
    grouprule.allRowChoices = makeElementsText(document.getElementsByClassName("rowChoice"));
    grouprule.groupRuleSource = makeGroupRuleSource(grouprule) ;
    console.log("grouprule    2023-03-10 08:36");
    console.log(grouprule);
    //buildKeyPathListForStringfiedAndParsed ();
    grouprule.reducedstringIfiedFilteredList =  await buildKeyPathListForStringfied() ;
    console.log("grouprule    2024-08-07 19:57 *** ****************");
    console.log(grouprule);
    grouprule.parsedReducedList = makeParsedreducedList(grouprule.reducedstringIfiedFilteredList );
    console.log("grouprule    2024-08-07 19:59 *** ****************");
    console.log(grouprule);
    //delete grouprule.groupRuleSource; delete grouprule.allArrayID; delete grouprule.allArrayType; delete grouprule.allArrayAuthor;
    console.log("grouprule    2024-08-07 20:20 *** ****************");
    const temp = JSON.parse(JSON.stringify(grouprule));
    console.log(temp);
    console.log(grouprule);
    return grouprule
}
async function saveGrouprule() {
    console.log("function saveGrouprule() {   2023-03-09 17:17   ***  2024-08-07 18:22   ****  **********************************************************************************************************************************************************************");
    //let grouprule = {};
    let grouprule = getGroupruleHeaderFromHtml();
    //let allArrayTemp = buildAllArrayTemp () ;
    let allArrayTemp = getAllRowChoiceFromHTML();
    console.log("allArrayTemp  ***   2024-08-07   18:49 ***   *********************************************************************************************************************************************************************************************  from buildAllArraytemp - will not be needed if we eventually prevent duplicates!");
    console.log(allArrayTemp);
    let bothObjects = removeDuplicateRowChoices(allArrayTemp, grouprule);
    allArrayTemp = bothObjects.allArrayTemp;
    grouprule = bothObjects.grouprule;
    console.log("allArrayTemp  ***   2024-08-07 19:19 ***   ***  from  objectOfArrays"); 
    console.log(allArrayTemp);
    grouprule = await groupruleForFireStoreAndStoreTimeStampsEtc(allArrayTemp, grouprule);
    grouprule = await fixGrouprule(grouprule);
    console.log("*** 2024-10-01 18:44 *** ");
    grouprule.ruleDescriptions = [];
    console.log(grouprule);
    let perm202410281159Agrouprule  =  JSON.parse(JSON.stringify(grouprule));
    console.log("Apermgrouprule 2024-10-28 11:44");
    console.log(perm202410281159Agrouprule);
    //let perm202410281159Bgrouprule  =  JSON.parse(JSON.stringify(grouprule));
    let dbName = 'authorExcuTrust';
    let storeName = 'ruleStore';
    console.log("dbName");
    console.log(dbName);
    console.log("storeName");
    console.log(storeName);
    let keys = perm202410281159Agrouprule.parsedReducedList;
    console.log("keys");
    console.log(keys);
    //grouprule.ruleDescriptions = await getRuleContents(dbName, storeName, keys);
    getRuleContents(dbName, storeName, keys, perm202410281159Agrouprule);
    /*
    console.log("getRuleContents1 called  2024-10-29 17:20");
    grouprule = await getRuleContents1(dbName, storeName, keys, perm202410281159Agrouprule);
    console.log("grouprule 2024-10-29 17:16");
    console.log(JSON.parse(JSON.stringify(grouprule)));
    */
  }
  function saveGroupruleDiscarded() {
    getRuleContents(dbName, storeName, keys, )
    console.log("Bpermgrouprule 2024-10-28 11:44");
    console.log(perm202410281159Bgrouprule);
    stopTheNonsense();
    if(1 === 1) {
     //removePriorClassItems();
     console.log("appendNewHtml(grouprule)  2024-10-17 20:00");
    // await appendNewHtml(grouprule.tAllRowChoices);
    let allRulesDiv = document.getElementById("questionAnswerChoices");
    console.log("allRulesDiv = document.getElementById(questionAnswerChoices) 2024-10-07 09:19");
    console.log(allRulesDiv);
    let NewAllRulesDiv =  document.getElementById("questionAnswerChoices");
    console.log("NewAllRulesDiv = document.getElementById(questionAnswerChoices) 2024-10-07 09:19");
    NewAllRulesDiv.insertAdjacentHTML('beforeend', grouprule.tAllRowChoicesString);
    console.log(NewAllRulesDiv);
    console.log("2024-11-05 10:12")
   } else {
            replaceModalFilterRow (grouprule);
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
                console.log("tx.oncomplete 2023-10-07 12:16");
                db.close();
                let clearAll = document.getElementsByClassName("questionnairecloud") ;
                let clearAllLength = clearAll.length ;
                for (let index = 0; index < clearAllLength; index++) {
                let element = clearAll[index];
                element.innerText = "Saved" //  2023-03-10   12:25
                }
                console.log("*** ***saved to indexeddb, not to firestore  yet working on it  *** ***       batchFireStore2([grouprule])      2023-03-08 5:51pm ***  2024-08-08  7:52") ;
                console.log(grouprule);
                removePriorClassItems();
                console.log("grouprule.groupRuleSource");
                console.log(grouprule.groupRuleSource);
                insertNewClassItems(grouprule.groupRuleSource);
                //stopTheNonsense();
                //batchFireStore2([grouprule])
            }
    }
    }
    //stopThisNonsense() ;
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
    console.log("*** event ");
    console.log(event);
    console.log("event ***");
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
    console.log("place.appendChild(frag) 2024-10-23 12:14 place then frag");
    console.log(place);
    !console.log(frag);
    place.appendChild(frag)
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
  /*
  *** Currently, it looks like html is place where modal is filtered, CONSIDER EVENTUALLY to do this in IndexedDB, possibly use multi value array
  */
  
  /*
    ***  NEW CODE ***
    */
  
    /*  THIS MAY NOT BE NEEDED !!! *** */
  function doPreventChanges() {
    /*  THIS MAY NOT BE NEEDED !!! *** */
    documemt.getElementById("saveButton").classList.add("hideAlways") 
  }
  
  /*
     *** OLD CODE  BROUGHT IN ***
  */
function undoPreventChange( theSelected ) {
  console.log("function undoPreventChange( theSelected ) {");
  // what to do if false
  theSelected.getElementsByClassName("questionAnswerSort")[0].disabled = false;
  theSelected.getElementsByClassName("checkboxExplain")[0].disabled = false ;
  theSelected.getElementsByClassName("questionAnswerDescription")[0].contentEditable = true ;
  //theSelected.getElementsByClassName("questionAnswerNotesDescription")[0].contentEditable = true ;
  theSelected.getElementsByClassName("deleteBtn")[0].style.display = ""
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
  
function getLowAsciiSrting() {
  console.log("function getlowAsciiSrting(theString) {");
  let nullChar = `"!0! 1!▼ !☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄↕‼¶§▬↨↑↓→←∟`, groupSeprarator = "↔", recordSeparator = "▲" , UnitSeparator = "▼" ;
    let newStringList  = nullChar+groupSeprarator+recordSeparator+UnitSeparator ;
    let stringfunction  = {} ;
    stringfunction.separator  = "!1!"; //space is needed to show it is a number because only numbers are pefaced by a space, if it is text, it is pefaced by only a !
    //stringfunction.indexedDBPathValue  = getFirebaseKey (keyPathValue) "!1!"; //space is needed to show it is a number because only numbers are pefaced by a space, if it is text, it is pefaced by only a !
    return newStringList
}
function stringKeypathValueElement(element){
  console.log("function stringKeypathValueArray(element) { 2024-11-11-20:29");
  if(element === 1){
    return "" // space means a number after a space which follows a ! then the number, text are not allowed to have trailing or leading spaces
  }else if(typeof element === "number"){
    console.log('typeof element === "number" element:');
    console.log(element);
    let negVersion =  9999999999999-element;
    negVersion = negVersion.toString();
    return   ` ${negVersion}!1!` // see above - text are not allowed to have trailing or leading spaces
  }else{
    console.log('typeof element !== "number" element:');
    console.log(element);
    return `${element.trim()}!1!` // see above - text are not allowed to have trailing or leading spaces
  }
}
  function stringKeypath(keypath) {
    console.log("function stringKeypath(keypath) { 2024-11-16-11:02");
    console.log("keypath");
    console.log(keypath);
    console.log("typeof keypath");
    console.log(typeof keypath);
    if(typeof keypath === "string"){
      console.log("keypath");
      console.log(keypath);
      console.log("typeof keypath");
      console.log(typeof keypath);
      return keypath
    } else{
      console.log("function   stringKeypath(keypath) {  - 2024-11-05-08:30  consider find making all nested arrays listed in an array, then stringifying each array.  *** 2024-11-05-08:30 ***");
      console.log("keypath");
      console.log(keypath);
      console.log("typeof keypath");
      console.log(typeof keypath);
      let theString = "";
      let separator = "ÿ" ;
      separator = "no longer needed?";
      let nullChar = "!1! 1!▼ !☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄↕‼¶§▬↨↑↓→←∟", groupSeprarator = "↔", recordSeparator = "▲" , UnitSeparator = "▼" ;
      let newStringList  = nullChar+groupSeprarator+recordSeparator+UnitSeparator ;
      theString = theString+newStringList;
      theString = getLowAsciiSrting();
      theString = "";
      separator = "!1!"; ;
      //keypath.forEach((element) => theString = theString+element+separator);
      keypath.forEach((element) => theString = theString+stringKeypathValueElement(element));
      /*
      for (let i = 0; i < keypath.length; i++) {
        if((i>0) && (i % 2 === 0)){
          console.log("i>0 && i % 2 === 0 2024-11-16-19:38");
          console.log(i)
        } else {
          console.log("i NOT >0i % 2 !== 0 0 2024-11-16-19:40");
          console.log(i)
          const element = keypath[i];
          theString = theString+stringKeypathValueElement(element)
        }
      } */
      console.log("theString     2024-11-11-20:28");
      console.log(theString);
      return theString
    }
  }
function findNestedArray(saveObject){
  console.log(' ********************************************************* function findNestedArray(saveObject) { 2025-03-26 19:07 ***********************************************************************************************');
  console.log("saveObject");
  const keysLevel0 = Object.keys(saveObject);
  console.log(keysLevel0);
  console.log ("Not needed 2025-03-26 19:07")
}

  function batchFireStore2(outerArray) {
    let record2, object2,theDoc;
    console.log("function batchFireStore2(outerArray) {    2023-03-08");
    console.log(outerArray);
    console.log(outerArray[0]);
    var db = doFirebaseConfig() ;
    var batch = db.batch();
    let outerArrayLength = outerArray.length
    var i;
    for (i = 0; i < outerArrayLength; i++) {
      let saveObject = outerArray[i];
      console.log("saveObject 2024-11-16-14:45");
      console.log(saveObject);
      if(saveObject.groupRuleSource !== undefined){
        saveObject.groupRuleSource = JSON.stringify(saveObject.groupRuleSource)
      }
      let theParentDocument = saveObject.keyPathValueFireBase // was = let theParentDocument = saveObject.keyPathValue[0];
      console.log(theParentDocument);
      console.log(theParentDocument);
      if( theParentDocument === "trueruleStore" || theParentDocument === "groupruleStore" ) {
        theParentDocument = "questionRuleStore"
      };
      /*
        theDoc = String.fromCodePoint(8456,8448,9884) ; 
        console.log("theDoc  - fromCodePoint(8456,8448,9884)");
        console.log(theDoc);
        theDoc = "" + JSON.stringify(saveObject.keyPathValue);
      */
        saveObject = structuredClone(saveObject);
      if(Array.isArray(saveObject.keyPathValue)){
        console.log("Array.isArray(saveObject.keyPathValue) 2024-11-16-11:40");
        console.log(saveObject.keyPathValue);
        console.log(Array.isArray(saveObject.keyPathValue));
        theDoc = stringKeypath(saveObject.keyPathValue)
      }else{
        theDoc = saveObject.keyPathValue
      };
      //const negVersion =  9999999999999 - saveObject.versionDateSince1969;
      //theDoc = theDoc+negVersion;
      console.log("theDoc");
      console.log(theDoc);
      let record = db.collection(`authorsOnly`).doc(theParentDocument).collection("groupCollectionAuthor").doc(JSON.stringify(saveObject.keyPathValue));
      console.log(`record first 2025-03-25 08:09 A`);
      console.log(record);
      console.log("saveObject");
      console.log(saveObject);
      record = db.collection(`authorsOnly`).doc(theParentDocument).collection("groupCollectionAuthor").doc(theDoc);
      console.log(`2024-11-10-00:09  Record record and then saveObject - batch.set(record, saveObject)`) ;
      console.log("theParentDocument");
      console.log(theParentDocument);
      console.log("JSON.stringify(saveObject.keyPathValue)");
      console.log(JSON.stringify(saveObject.keyPathValue));
      console.log("saveObject");
      console.log(saveObject);
      console.log(`record first 2025-03-25 08:09 B `);
      console.log(record);
      console.log("batch.set to be run for record and saveObject 2025-03-24 15:39 - see next 15:39");
      console.log("record"); console.log(record);
      console.log("saveObject");
      console.log(saveObject);
      console.log("batch,set - 2025-03-25 12:14 1 ***");
      //batch.set(record, saveObject);
      console.log("batch.set run for record and saveObject 2025-03-24 15:39, this is the 2nd 15:39") ;
      // new 2023-03-09
      const clonedObject = structuredClone(saveObject); // *** 2024-12-06-15:13
      clonedObject.Atemporary = "clonedObject - 024-12-06-15:13";
      console.log("clonedObject 2024-12-06-15:13");
      console.log(clonedObject);
      // test to update repository
      //saveObject.keyPathValue.push(saveObject.versionDateSince1969); ***2024-12-06-15:13  ***
      saveObject.keyPathValue = saveObject.keyPathValueBaseIndexDB;
      console.log("new Save Object");
      console.log(JSON.stringify(saveObject.keyPathValue));
      console.log (saveObject);
      theParentDocument = "LatestAndPriorVersions";
      record = db.collection(`authorsOnly`).doc(theParentDocument).collection("groupCollectionAuthor").doc(JSON.stringify(saveObject.keyPathValueFireBase));
      console.log(`2024-11-10-00:09 - 2nd time?  Record record and then saveObject - batch.set(record, saveObject)`) ;
      console.log("record");
      console.log(record);
      console.log("saveObject");
       console.log(saveObject);
       findNestedArray(saveObject);
       saveObject.ruleDescriptions = JSON.stringify(saveObject.ruleDescriptions);
       console.log("saveObject after stringifying ruleDescriptions");
       console.log(saveObject);
      console.log("batch,set - 2025-03-25 12:14 2   PRE ***");      batch.set(record, saveObject);
      console.log("batch,set - 2025-03-25 12:14 2  POST *** 20-262-03 18:19 comment OUT");
      /* 20-262-03 18:19
      record2 = record;
      object2 = saveObject;
      object2.fireBaseIDrecord = record2
      */
    }
    // Commit the batch
    batch.commit().then(function () {
      console.log(`batch.commit().then(function () {   2024-11-09-23:32 record: ${record2}  saveObject: ${object2}`);
    // ... *** use this to update indexedDB for a status update, use outer array to get elements to process.
      //alert ("hopefully all saved, check consol for fireStore")
      ///authorsOnly/questionStore/groupCollectionAuthor *** 2020-11-17 ** /authorsOnly/questionRuleStore/groupCollectionAuthor/["trueruleStore",1,"2020-11-17",1,"11:33"]
  });
  }

  function saveFirestore (saveObject , questionnaireRowChoice) {
    console.log("function saveFirestore (saveObject , questionnaireRowChoice) {    2023-03-10 14:09");
    console.log("saveObject 2024-11-16;14:50");
    console.log(saveObject);
    if(questionnaireRowChoice === undefined ) {
      let outerArray = [];
      outerArray.push(saveObject) ;
      batchFireStore2(outerArray)
    }
  }

  function storePendingSave(saveObject , db) {
    console.log("function storePendingSave(saveObject , db) { A");
    let request, tx, store,databaseOpenRequest,fBaseSaveObject2,fBaseSaveObject2A;
    if(db === undefined) {
      console.log("function storePendingSave(saveObject , db) { B");
      request = undefined;
      databaseOpenRequest = indexedDB.open("authorExcuTrust");
      databaseOpenRequest.onsuccess = () => {
          console.log("function storePendingSave(saveObject , db) { B.1");
          db = databaseOpenRequest.result;
          tx = db.transaction("pendingStore", "readwrite");
          store = tx.objectStore("pendingStore");
          console.log("function storePendingSave(saveObject , db) { B.2");
          //let negativeVersion = 9999999999999 - saveObject.versionDateSince1969; // No longer needed? ***
          const negativeVersion = getFirebaseVersionDateSince1969(saveObject.versionDateSince1969);
          saveObject.keyPathValue.push(negativeVersion);
          saveObject.keyPathValueBaseIndexDB = [...saveObject.keyPathValue];
          saveObject.keyPathValueFireBase = stringKeypath(saveObject.keyPathValue);
          saveObject = JSON.parse(JSON.stringify(saveObject));
          console.log("saveObject 2024-11-14-11:23");
          console.log(saveObject);
          store.put(saveObject);
          //saveObject.keyPathValue = [...saveObject.keyPathValueFireBase];
          saveObject.keyPathValue = saveObject.keyPathValueFireBase;
          store.put(saveObject);
          //saveFirestore (saveObject) ;
          let fBaseSaveObject = JSON.parse(JSON.stringify(saveObject));
          //fBaseSaveObject.keyPathValue.push("fBaseSaveObject");
          if(fBaseSaveObject.stringifiedArrays !== undefined) {
            console.log("fBaseSaveObject B.2.A");
            const propertyNameList = Object.getOwnPropertyNames(fBaseSaveObject.stringifiedArrays);
            console.log("fBaseSaveObject B.2.A.1  propertyNameList");
            console.log(propertyNameList);
            propertyNameList.forEach((element) => {
              console.log("element");
              console.log([element])
              console.log(element);
              console.log("fBaseSaveObject[element]");
              let temp =JSON.parse(JSON.stringify(fBaseSaveObject[element]));
              console.log(temp);
             delete fBaseSaveObject[element];
             fBaseSaveObject2 = JSON.parse(JSON.stringify(fBaseSaveObject));
             console.log(fBaseSaveObject2);
            });
          }
          console.log("fBaseSaveObject B.3");
          console.log(fBaseSaveObject2);
          fBaseSaveObject2A = JSON.parse(JSON.stringify(fBaseSaveObject2));
          store.put(fBaseSaveObject2A);
          console.log("saveFirestore (fBaseSaveObject2A) Cancelled 2024-11-14-10:18");
          saveFirestore (fBaseSaveObject2A) ;
          tx.oncomplete = () => {
            console.log("tx.oncomplete 2023-10-07 12:16");
            db.close();
            saveFirestore (fBaseSaveObject2A)
          };
      }
    } else {
      /*function storeBothToPending(saveObject) {
        store.put(saveObject);
        let fBaseSaveObject = JSON.parse(JSON.stringify(saveObject));
        fBaseSaveObject.keyPathValue.shift(fBaseSaveObject.versionDateSince1969);
        store.put(fBaseSaveObject)
      } */
      console.log("storePendingSave(saveObject , db) {");
        console.log("function storePendingSaveIndexedDBOnly(saveObject , db) { *** LIKELY not needed");
      //saveFirestore (saveObject) ;
      console.log('***** saveFirestore (saveObject)   2024-11-08 17:40 *********************************************************************************************');
      tx = db.transaction("pendingStore", "readwrite");
      store = tx.objectStore("pendingStore");
      //saveObject.keyPathValue.unshift(saveObject.versionDateSince1969) ; // *** decision about if all versions saved or just the version since the last time server was updated. - decided to store extra data and ask that server track the changes to know who had access to the information, at what time. a lot more data but this may be used for machine learning later.   - for now, ok, but do we need an tx.onComplete before making save button ""
      console.log("*** first store of saveObject");
      saveObject.keyPathValue.shift(saveObject.versionDateSince1969);
      console.log(saveObject);
      //store.put(saveObject) ;
      store.put(saveObject);
      /*
      let fBaseSaveObject = JSON.parse(JSON.stringify(saveObject));
      fBaseSaveObject.keyPathValue.shift("fBaseVersion");
      store.put(fBaseSaveObject)
      */
      //storeBothToPending(saveObject);
      let lastSentToServer = {} ;
      lastSentToServer.keyPathValue = [0,"lastSentToServer"] ;
      lastSentToServer.versionDateSince1969 = saveObject.versionDateSince1969 ;
      lastSentToServer.explantion = ["not actually used here","code for later use to track last sent","may be better all on server","decision needs to be made to delete records or not?","do not allow users to save over existing record, require use of Select if it exists"];
      store.put(lastSentToServer) ; 
      // new to test sorting follows
      saveObject.keyPathValue.unshift(0) ;
      saveObject.keyPathValue.unshift(1) ;
      saveObject.keyPathValue.unshift(-1) ;
      console.log("*** 2nd store of saveObject - to test sorting ???");
      console.log(saveObject);
      store.put(saveObject) ;
      saveObject.keyPathValue.unshift(2) ;
      saveObject.keyPathValue.unshift(3) ;
      saveObject.keyPathValue.unshift(-2) ;
      console.log("*** 3rd store of saveObject - to test sorting ???");
      console.log(saveObject);
      store.put(saveObject) ;
      saveObject.keyPathValue.unshift(-2) ;
      saveObject.keyPathValue.unshift(-3) ;
      saveObject.keyPathValue.unshift(2) ;
      console.log("*** 4th store of saveObject - to test sorting ???");
      console.log(saveObject);
      store.put(saveObject) 
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
      saveObject.versionDateSince1969 = Date.now() ;
      const negVersion =  9999999999999 - saveObject.versionDateSince1969;
      console.log(negVersion);
      //saveObject.dateAndTime = [saveObject.versionDateSince1969.toString(),saveObject.versionDateSince1969.toISOString()];
      saveObject.keyPathValue = ["trueruleStore",1,saveObject.ruleAuthor,1,saveObject.ruleID,negVersion] ; // 2024-06-28
      saveObject.keyPathValue = ["trueruleStore",1,saveObject.ruleAuthor,1,saveObject.ruleID] ; // 2024-06-28
      saveObject.questionSource = ["questionStore",1,saveObject.questionAuthor,1,saveObject.questionID] ; //20200902 6:52am,  *** at this time there is some duplication, but consider leaving until saveObject.questionAuthor AND saveObject.questionID ARE NO LONGER NEEDED ***
      /*saveObject.ruleAuthor = saveObject.questionAuthor ;
      saveObject.ruleID = saveObject.questionID ;
      saveObject.keyPathValue = ["trueruleStore",1,saveObject.ruleAuthor,1,saveObject.ruleID] ;
      saveObject.TemporaryNotes  = "1. need to be able to store as is.  2.  save to ruleStore" ; */
      //saveObject.versionDateSince1969 = Date.now() ; //// 2024-06-28
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

  function getGroupruleAnswerRows(questionnaireOutline) {
    console.log("function getGroupruleAnswerRows(questionnaireOutline) {   2023-03-09 17:12");
    let frag = document.createDocumentFragment();
    let docLength = questionnaireOutline.allArrayAuthor.length; 
    for (let index = 0; index < docLength; index++) {
      let newRow = document.createElement("div");
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
      console.log("newRow 2024-10-17 - adds row to frag");
      console.log(newRow);
      frag.appendChild(newRow)
    }
    console.log("appends frag to groupruleWrapper   2024-10-17");
    document.getElementById("groupruleWrapper").appendChild(frag);
    printToConsoleLengths();
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

  function updateGroupRuleLogicDisplay() {
    console.log("function updateGroupRuleLogicDisplay() 2026-01-29");
    const ruleLogicType = document.getElementById("ruleLogicType").value;
    const ruleCountInput = document.getElementById("ruleCountInput");
    const rulePercentInput = document.getElementById("rulePercentInput");
    const displayText = document.getElementById("ruleLogicDisplayText");
    
    // Hide all input fields first
    ruleCountInput.classList.add("hidealways");
    rulePercentInput.classList.add("hidealways");
    
    switch(ruleLogicType) {
      case "all":
        displayText.innerHTML = "Display only when <b><u>all</u></b> rules below are true.";
        break;
      case "any":
        displayText.innerHTML = "Display when <b><u>any</u></b> rule below is true.";
        break;
      case "count":
        ruleCountInput.classList.remove("hidealways");
        const countValue = document.getElementById("minRuleCount").value || "N";
        displayText.innerHTML = `Display when at least <b><u>${countValue}</u></b> rule(s) below are true.`;
        break;
      case "percent":
        rulePercentInput.classList.remove("hidealways");
        const percentValue = document.getElementById("minRulePercent").value || "X";
        displayText.innerHTML = `Display when at least <b><u>${percentValue}%</u></b> of rules below are true.`;
        break;
    }
    
    document.getElementById("saveButton").value = " Save Multiple Rules ";
    document.getElementById("saveButton").classList.remove("missing");
  }

  function onRuleCountChange() {
    console.log("function onRuleCountChange() 2026-01-29");
    const countValue = document.getElementById("minRuleCount").value;
    if (countValue && countValue > 0) {
      document.getElementById("ruleLogicDisplayText").innerHTML = 
        `Display when at least <b><u>${countValue}</u></b> rule(s) below are true.`;
    }
  }

  function onRulePercentChange() {
    console.log("function onRulePercentChange() 2026-01-29");
    const percentValue = document.getElementById("minRulePercent").value;
    if (percentValue && percentValue > 0 && percentValue <= 100) {
      document.getElementById("ruleLogicDisplayText").innerHTML = 
        `Display when at least <b><u>${percentValue}%</u></b> of rules below are true.`;
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
  
  function doPreventChange( theSelected ) {
    console.log("function doPreventChange( theSelected ) {");
    // what to do if true
    theSelected.getElementsByClassName("questionAnswerSort")[0].disabled = true ;
    theSelected.getElementsByClassName("checkboxExplain")[0].disabled = true ;
    theSelected.getElementsByClassName("questionAnswerDescription")[0].contentEditable = false ;
    //theSelected.getElementsByClassName("questionAnswerNotesDescription")[0].contentEditable = false ;
    theSelected.getElementsByClassName("deleteBtn")[0].style.display = "none" 
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
  
  function getDatabaseSetup() {
    console.log("function getDatabaseSetup() {");
    let readObject = {} ;
    readObject.store = "ruleStore" ;
    readObject.database = "authorExcuTrust" ;
    readObject.tx1 = "ruleStore" ;
    readObject.tx2 = "readonly" ;
    return readObject
  }
  
  function getRuleQuestion(ruleData) {
    console.log("function getRuleQuestion(ruleData) {") ;
    let questionObject = getDatabaseSetup() ;
    questionObject.store = "questionStore" ;
    questionObject.tx1 = "questionStore" ;
    questionObject.keyPathValue = ["questionStore",1,ruleData.questionAuthor,1,ruleData.questionID] ;
    getQuestionData(questionObject , ruleData )
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
  
  function getQuestionAnswerChoices() {
    console.log("function getQuestionAnswerChoices() {") ;
    let temp = '<hr>'+ getChoiceRow() ;
    return temp
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
  
  function getQuestionLevelRuleButton() {
    console.log("function getQuestionLevelRuleButton() {") ;
    return "Save Changes to Display Rule"
  }
  
  function modifyTrueRule() {
    console.log("function modifyTrueRule() {");
    document.getElementById("process1").textContent = "modifyRuleDisabledTrueFalse" ;
    document.getElementById("saveButton").value = getQuestionLevelRuleButton() ;
    document.getElementById("process0").textContent = "New Question Level Rule" ;
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
  
  function getEmptyGroupHeader() {
    console.log("function getEmptyGroupHeader() {");
    return `
    <div class="groupruletitle">
      <h2 >Collection of Display Rules:</h2>
      <div>Number of Collections of Rules:<span id="numberOfgroupruleWrapper">?</span>+ Number of Display Rules:<span id="numberOfruleWrapper">??</span>= Total Number of Rules:<span id="totalNumberOfRulesWrapper">????</span></div>
    </div>
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
      <div class="container border border-info p-3 mb-3" style="background-color: #f0f8ff;">
        <h5>Rule Evaluation Logic:</h5>
        <div class="row mb-2">
          <div class="col-12">
            <label for="ruleLogicType"><b>Select how rules should be evaluated:</b></label>
            <select id="ruleLogicType" class="form-control" onchange="updateGroupRuleLogicDisplay()" style="max-width: 300px;">
              <option value="all">All rules must be true (AND)</option>
              <option value="any">Any rule must be true (OR)</option>
              <option value="count">At least N rules must be true</option>
              <option value="percent">At least X% of rules must be true</option>
            </select>
          </div>
        </div>
        <div id="ruleCountInput" class="row mb-2 hidealways">
          <div class="col-12">
            <label for="minRuleCount">Minimum number of rules that must be true:</label>
            <input type="number" id="minRuleCount" class="form-control" min="1" value="1" onchange="onRuleCountChange()" style="max-width: 150px;">
          </div>
        </div>
        <div id="rulePercentInput" class="row mb-2 hidealways">
          <div class="col-12">
            <label for="minRulePercent">Minimum percentage of rules that must be true:</label>
            <input type="number" id="minRulePercent" class="form-control" min="1" max="100" value="50" onchange="onRulePercentChange()" style="max-width: 150px;">
            <small class="form-text text-muted">Enter a value between 1 and 100</small>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-12">
            <div class="alert alert-success" role="alert">
              <span id="ruleLogicDisplayText">Display only when <b><u>all</u></b> rules below are true.</span>
            </div>
          </div>
        </div>
      </div>
    </div>` ;
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
    
    // Handle new rule logic types (2026-01-29)
    if (questionnaireOutline.ruleLogicType) {
      document.getElementById("ruleLogicType").value = questionnaireOutline.ruleLogicType;
      if (questionnaireOutline.ruleLogicType === "count" && questionnaireOutline.minRuleCount) {
        document.getElementById("minRuleCount").value = questionnaireOutline.minRuleCount;
      }
      if (questionnaireOutline.ruleLogicType === "percent" && questionnaireOutline.minRulePercent) {
        document.getElementById("minRulePercent").value = questionnaireOutline.minRulePercent;
      }
      updateGroupRuleLogicDisplay();
    } else if (questionnaireOutline.all0Any1True !== undefined) {
      // Backward compatibility with old all0Any1True checkbox
      document.getElementById("ruleLogicType").value = questionnaireOutline.all0Any1True ? "any" : "all";
      updateGroupRuleLogicDisplay();
    } else {
      updateGroupRuleLogicDisplay();
    }
    if(questionnaireOutline.groupruleContentInnerText.trim() !== "") {
      temp0 = document.getElementById("groupruleContent") ;
      temp0.innerHTML = questionnaireOutline.groupruleContent ;
      temp0.classList.remove("missing");
    }
    document.getElementById("groupruleWrapper").classList.remove("hidealways") ;
    getGroupruleAnswerRows(questionnaireOutline) ;
    document.getElementById("saveButton").value = ""
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
    console.log("retrieve (keyPathValue, buildSaveModalAnswer)");
    retrieve (keyPathValue, buildSaveModalAnswer)
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
    console.log("uf - 2024-07-20 11:42am *********************************************************");
    console.log(uf);
    console.log("uf - 2024-07-20 11:42am ??");
    console.log("uf - 2024-07-20 11:42am***********************************");
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
  
  
  function upDateModal(allSavedItems , selectObject, workingQuestionnaire) {
    console.log("function upDateModal(allSavedItems , selectObject, workingQuestionnaire) {");
    console.log("workingQuestionnaire 2799") ;
    console.log(workingQuestionnaire) ;
    console.log(workingQuestionnaire) ;
    let place = document.getElementById("modal-list") ;
    place.innerHTML = "" ;
    
    // Check if no items found (2026-01-29)
    if (!allSavedItems || allSavedItems.length === 0) {
      place.innerHTML = `
        <div style="padding: 2rem; text-align: center; background: #fff3cd; border: 1px solid #ffc107; border-radius: 8px; margin: 1rem 0;">
          <h4 style="color: #856404;">📋 No Rules Found</h4>
          <p style="color: #856404;">There are no Display Rules or Collections saved yet.</p>
          <p style="color: #856404;">Close this dialog and create a new Display Rule or Collection first.</p>
          <button onclick="document.getElementById('myModal').style.display='none'" class="btn btn-warning" style="margin-top: 1rem;">Close</button>
        </div>`;
      return;
    }
    
    let frag = document.createDocumentFragment();
    for (let index = 0; index < allSavedItems.length; index++) {
      const element = allSavedItems[index]; // 0 is  type ( questionStore, ruleStore, etc,)  2 is author ; 4 is id, these three items are enough to uniquely identify the parts of a unique record. 
      let t = element.keyPathValue[0]+'█'+element.keyPathValue[2]+'█'+element.keyPathValue[4] ;
      let row = document.createElement("div");
      row.className = "modal-filter-row";
      let elementByStore = getElementContent(element) ;
      //let content = `<br><b>Author: </b><span class="modal-author">${element.keyPathValue[2]}</span><b>&nbsp ID:&nbsp</b>&nbsp<span class="modal-ID">${element.keyPathValue[4]}</span>&nbsp` ;
      let content = `<b>Author:&nbsp</b><span class="modal-author">${element.keyPathValue[2]}</span><b>&nbsp ID:&nbsp</b><span class="modal-ID">${element.keyPathValue[4]}</span>&nbsp`;
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
      console.log("console.log(content); console.log(t)");
      console.log(content); console.log(t);
      content = content + t ; // *** this is where inline function call is saved, is it a good idea or should it be replaced? ??? *** 2020-11-06 ***
      content = content + `')" value="Retrieve">` ;
      row.innerHTML = content ;
      //place.appendChild(row) ;
      frag.appendChild(row) ;
      t = 0 ;
    } ;
    place.appendChild(frag)
  }
  
  function browseAllData(selectObject, theSelectedRow , workingQuestionnaire) { // selectObject contains all data needed to connect to record in database
    // working Questionnaire is either buildSelectQuestionnaire for make a new questionnaire or useQuestionnaire 
    console.log("function browseAllData(selectObject, theSelectedRow , workingQuestionnaire) {");
    console.log("*** 2026-01-29: Attempting to open database ***");
    let db, tx, store, allSavedItems;
    let database = selectObject.database;
    console.log("Opening database:", database);
    let databaseOpenRequest = indexedDB.open(database);
    
    databaseOpenRequest.onerror = (event) => {
      console.error("*** 2026-01-29: Database open ERROR ***", event);
      alert("Error opening database: " + event.target.error);
    };
    
    databaseOpenRequest.onsuccess = () => {
      console.log("*** 2026-01-29: Database opened successfully ***");
      db = databaseOpenRequest.result ;
      console.log("Database object stores:", db.objectStoreNames);
      tx = db.transaction( selectObject.tx1 , selectObject.tx2) ;
      //tx2 = db.transaction( selectObject.tx1 , selectObject.tx2) ;
      store = tx.objectStore(selectObject.store) ;
      console.log("*** 2026-01-29: Getting all items from store:", selectObject.store);
      if(selectObject.index === undefined) {
        allSavedItems = store.getAll()
      } else {
        let myIndex = store.index(selectObject.index); 
        allSavedItems = myIndex.getAll(IDBKeyRange.bound(selectObject.lowwerBound , selectObject.upperBound,true,true))
      }
      
      allSavedItems.onsuccess = () => {
        console.log("*** 2026-01-29: Retrieved items count:", allSavedItems.result.length);
        console.log("Items:", allSavedItems.result);
      };
      
      tx.oncomplete = () => {
        console.log("*** 2026-01-29: Transaction complete, closing database ***");
        db.close() ;
        upDateModal(allSavedItems.result , selectObject , workingQuestionnaire) ;
        //console.log("theSelectedRow(s)");
        //console.log(theSelectedRow);
        makeModal(workingQuestionnaire)  // this needs to change so modal returns correct version; this may mean changing updateModal so it returns the data we need and does not execute the inline function created *** *** 
      }
    }
  }
  
  function selectRulePart2() {
    console.log("function selectRulePart2() {");
    console.log("*** 2026-01-29: Opening modal to select rules ***");
    let selectObject = {} ;
    selectObject.database = "authorExcuTrust" ;
    selectObject.tx1 = "ruleStore" ;
    selectObject.tx2 = "readonly" ;
    selectObject.store = "ruleStore" ;
    console.log("selectObject:", selectObject);
    browseAllData(selectObject)
  }
  
      
  function groupRuleHeader() {
    console.log("function groupRuleHeader() {");
    let element = document.getElementById("formtitle") ;
    if(element.innerText !== "Generate Group Rule") {
      doGrouprulePart2()
      checkDataBase() 
    }
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

  function resetFlag (event, change) {
    console.log("function resetFlag (event, change) {");
    let theSelectedRow = getTheSelected (event) ;
    resetFireStoreFlag (theSelectedRow , change) //  setFlag exists, in variable change
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
              console.log(theBase);
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
    //console.log("form.addEventListener('focusin', (event)");
    form.addEventListener('focusin', (event) => {
      focusinEvents(event)
      });
      //console.log("form.addEventListener('focusout', (event)");
    form.addEventListener('focusout', (event) => {
      focusoutEvents (event)
    });
    //console.log(`form.addEventListener('click', (event) - 1st`);
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

    setupAllWrapperEvents0()