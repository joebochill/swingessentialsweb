  import React from 'react';

  // converts a DB stored string into paragraphs (we do not store html in the database, just text)
  export function convertTextToP(string){
    if(!string.length){return null;}
    
    let array = string.split(":::");
    return array.map((val, index)=><p key={index}>{val}</p>);
  };

  export function convertTextToLine(string){
    if(!string.length){return '';}
    
    let array = string.split(":::");
    return array.join('\r\n\r\n');
  }
  export function convertLineToText(string){
    if(!string.length){return '';}

    let array = string.split(/[\r\n]+/);
    return array.join(':::');
  }

  // checks if the requested page is valid
  // if valid, it returns the index of the list record to start with
  export function validatePageNumber(list, perPage, pagenum, backToHome){
    const page = parseInt(pagenum,10);
    
    // check if the page we are requesting is valid
    if(pagenum !== undefined){
      if(!page || page < 1 || ((page-1)*perPage >= list.length)){
        backToHome();
        return 0;
      }
      else{
        return (page-1)*perPage;
      }
    }
    else{
        return 0;
    }
  }

  // formats a date string from the database to be pretty
  export function formatDate(date){
    if(!date){return "NO DATE";}
    
    let parts = date.split('-');
    const months = ['JAN','FEB','MAR','APR','MAY','JUNE','JULY','AUG','SEP','OCT','NOV','DEC'];
    return `${parts[0]}-${months[parseInt(parts[1],10)-1]}-${parts[2]}`;
  }
  export function getToday(){
    return getDate(Date.now());
  }

  // Returns the date string from a UNIX timestamp 
  export function getDate(unix){
    let day = new Date(unix);
    let dd = day.getUTCDate();
    let mm = day.getUTCMonth()+1; 
    let yyyy = day.getUTCFullYear();
    if(dd<10){dd='0'+dd;} 
    if(mm<10) {mm='0'+mm;} 
    return (yyyy + '-' + mm + '-' + dd);
  }

  // Returns a number rounded to the specified number of decimal places
  export function roundNumber(num, dec) {
    return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
  }