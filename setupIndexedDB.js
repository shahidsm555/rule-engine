function addMissingStores(missingStores , version ) {
  console.log (`missingStores :
    ${JSON.stringify(missingStores)}`) ;
  let database = "authorExcuTrust" ;
  let databaseOpenRequest = indexedDB.open(database, version )
  // if it does not exist, it is automatically created and triggers upgrade
  // The database did not previously exist, so create object stores and indecies.  Indecies created only if needed, for now assume no indecies needed
  databaseOpenRequest.onupgradeneeded = function() {
      //const db = databaseOpenRequest.result;
      let db = databaseOpenRequest.result;
      missingStores.forEach(element => {
          let keyPathConfig = (element === "authorMetadata") ? {keyPath: "authorName"} : {keyPath: "keyPathValue"};
          const store = db.createObjectStore(element, keyPathConfig); // Use appropriate keyPath
          if(element === "answerStore") {
            store.createIndex('versionDateSince1969', 'versionDateSince1969') ;
            store.createIndex('questionDestination', 'questionDestination', { multiEntry: true}) ;
            console.log(`added missingIndex questionDestination for ${element}`) 
          } else if(element === "ruleStore") {
            store.createIndex('versionDateSince1969', 'versionDateSince1969') ;
            store.createIndex('questionSource', 'questionSource') ;
            store.createIndex('groupRuleSource', 'groupRuleSource', { multiEntry: true}) ; // 2023-03-10    19:03
            console.log(`added missingIndex questionSource for ${element}`) 
          } else if(element === "questionnaireStore") {
            store.createIndex('versionDateSince1969', 'versionDateSince1969') ;
            store.createIndex('questionnaireRow', 'questionnaireRow') ;
            console.log(`added missingIndex questionnaireRow for ${element}`) 
          } else if(element === "questionStore") {
            store.createIndex('versionDateSince1969', 'versionDateSince1969') ;
            console.log(`added missingIndex questionnaireRow for ${element}`) 
          } 
           else {
                      //const titleIndex = store.createIndex("by_title", "title", {unique: true});  * rarely if ever use this because plan is to rely on the keyPath to prevent dupicates
          //const authorIndex = store.createIndex("by_author", "author"); possibly use this with split strings which allow all values to be found in the index:   "objectStore.createIndex('hobbies', 'hobbies', { multiEntry: true});"  *** multiEntry *** 
          console.log(`added missingStores element ${element}`)  
          }

      }) ;   
  databaseOpenRequest.onsuccess = function() {
   // in the future if we need to add stores or indicies, 
   const db = databaseOpenRequest.result;
   db.close() ;
   console.log("missingStores added finshed ") ; 
    }
  }
 //db.close()
}


function upgradeFromSuccess(databaseOpenRequest1){
  const db1 = databaseOpenRequest1.result;
  let  newStoreList = ["questionStore","formStore","questionnaireStore","customerStore","ruleStore","pendingStore", "aliasStore", "answerStore", "authorMetadata"] ;
  let missingStores = [];
  let oldStoreList = db1.objectStoreNames ;
  let exists ; 
  // I do not know why indexof was not working so I did the nested For loop below.
  for (let index = 0; index < newStoreList.length; index++) {
      let newItem = newStoreList[index] ;
      exists = false ;
      for (let index2 = 0; index2 < oldStoreList.length; index2++) {
        let oldItem = oldStoreList[index2] ;
        if (newItem === oldItem) {
          exists = true ;
          inndex2 = oldStoreList.length + 1
        }
      }
      if (exists === false) {
        missingStores.push(newItem)
      }
    }  
    if (missingStores.length !== 0) {
      let version = db1.version ;
      //alert(`version = ${version}`) ; 
      version = version * 1 ;
      version++ ;
      db1.close()
      addMissingStores(missingStores , version)
    } else {
      db1.close()
    }
}

function initialSetupIndexedDB(){
  //alert (`This proves Initial Setup Running!`) ;
  let database = "authorExcuTrust" ;
  let databaseOpenRequest = indexedDB.open(database);
  // if it does not exist, it is automatically created and triggers upgrade
  // The database did not previously exist, so create object stores and indecies.  Indecies created only if needed, for now assume no indecies needed
  databaseOpenRequest.onupgradeneeded = function() {
      const db = databaseOpenRequest.result;
      //let  storeList =["questionStore","formStore","customerStore"] ;
      let  storeList =[] ;
      storeList.forEach(element => {
          const store = db.createObjectStore( element, {keyPath: "keyPathValue"});
      });
  }
  databaseOpenRequest.onsuccess = function() {
      // in the future if we need to add stores or indicies, 
      const db = databaseOpenRequest.result;
      upgradeFromSuccess(databaseOpenRequest)
      //db.close()
  }   
}
/*
//alert ("** promise next")
let p = new Promise((done, notDone) => {
  let a = 1+1;
//  if( a === 2){
//    done(`Success ***`)
//  } else {
//    notDone(`*** Failed`)
//  }
});
p
.then((message) => {
 // console.log(`This is the then message:  ${message}   `)
})
.catch((message) => {
// console.log(`This is the catch  message:  ${message}`  )
})
*/
initialSetupIndexedDB();