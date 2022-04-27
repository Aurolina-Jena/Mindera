// const controlRecipes = async function () {

  let finalValue = {
    caledarData: [
      {
        date: "Apr 26",
        eventName: ["Client Discussion with Aurolina 6-7pm"],
      },
      {
        date: "Apr 25",
        eventName: ["React js interview with mindera"],
      },
      {
        date: "Apr 24",
        eventName: [],
      },
      {
        date: "Apr 23",
        eventName: ["Client Discussion with Aurolina 6-7pm"],
      },
      {
        date: "Apr 22",
        eventName: ["Client Discussion with Aurolina 6-7pm"],
      },
      {
        date: "Apr 21",
        eventName: ["Client Discussion with Aurolina 6-7pm"],
      },
      {
        date: "Apr 20",
        eventName: ["Client Discussion with Aurolina 6-7pm"],
      },
      {
        date: "Apr 19",
        eventName: ["Scrum Call"],
      },
      {
        date: "Apr 18",
        eventName: ["Client Discussion with Aurolina 6-7pm"],
      },
      {
        date: "Apr 17",
        eventName: [],
      },
      {
        date: "Apr 16",
        eventName: ["Client Discussion with Aurolina 6-7pm"],
      },
      {
        date: "APR 15",
        eventName: [
          "Aurolina Birthday",
          "Client Discussion with Aurolina 9-10pm",
        ],
      },
      {
        date: "APR 14",
        eventName: ["Client Discussion with Aurolina 6-7pm Client Discussion with Aurolina 6-7pmClient Discussion with Aurolina 6-7pm Client Discussion with Aurolina 6-7pm"],
      },
      {
        date: "APR 13",
        eventName: [
          "Angular Discussion with XYZ",
          "Client Discussion with Aurolina 9-10pm",
        ],
      },
      {
        date: "APR 12",
        eventName: [
          "Angular Discussion with XYZ",
          "Client Discussion with Aurolina 9-10pm",
        ],
      },
      {
        date: "APR 11",
        eventName: [
          "Angular Discussion with XYZ",
          "Client Discussion with Aurolina 9-10pm",
        ],
      }
    ],
  };

let selectedDate = '';

let todayDate = "APR 11";
let finalResult = [];
let ele = document.getElementById("calendar");

function bfrEnd(ele, data) {
  ele.insertAdjacentHTML("beforeend", data);
}

function removeUnwanted(data) {
  data = data.replace(/\W/g, "");
  return data.toLowerCase();
}

for (let x of finalValue.caledarData) {
  const htmlData = removeUnwanted(x.date);
  if (!x.eventName.length) {
    bfrEnd(ele, `<div class='event-date'>${x.date}</div>`);
    bfrEnd(ele, `<div id='no-event' data-event="${htmlData+"-nodata"}" onclick="openPopUp(event)" class='event-date'>
      Nothing panned. Tap to create
    </div>`);
  } else {
    bfrEnd(ele, `<div class='event-date'>${x.date}</div>`);
    let flag = false;
    let i = 0;
    for (let y of x.eventName) {
      if (flag) {
        bfrEnd(ele, `<div class='event-date'></div>`);
      }
      bfrEnd(ele, `<div id="${x.date}" data-event="${htmlData+"-"+i}" onclick="openPopUp(event)" class='event-name'>${y}</div>`);
      flag = true;
      i += 1;

    }
  }
  if(x.date === todayDate){
    document.getElementById(x.date).insertAdjacentHTML("beforeend", '<div id="high-lighter"></div>');
  } 
}

function openPopUp(event) {
  const data = event.target.getAttribute("data-event");
  console.log("Selected dat is ", data);
  selectedDate = data;
  document.getElementById("popup").classList.remove('hide');
}

function deleteEvents() {
  const removeEnd = selectedDate.replace(/\d+$/, "");
  const allElement = document.querySelectorAll(`[data-event^='${removeEnd}']`)
  const element = document.querySelector(`[data-event='${selectedDate}']`)
  if (allElement.length === 1) {
    element.insertAdjacentHTML('afterend', `<div id='no-event' data-event="${removeEnd+"nodata"}" onclick="openPopUp(event)" class='event-date'>
    Nothing panned. Tap to create
  </div>`);
  } else {
    element.previousSibling.remove();
  }
  element.remove();
  selectedDate = "";
  closeEvent();
}


function addEvents() {
  const removeEnd = selectedDate.replace(/-.+$/, "");
  const value = document.getElementById("eventInput").value;

  if (selectedDate.includes('nodata')) {
    const element = document.querySelector(`[data-event='${selectedDate}']`)
    element.insertAdjacentHTML('afterend', `<div data-event="${removeEnd+"-0"}" onclick="openPopUp(event)" class='event-name'>${value}</div>`);
    element.remove();
  } else {
    const allElement = document.querySelectorAll(`[data-event^='${removeEnd}']`)
    const lastEle = allElement[allElement.length - 1];
    const i = lastEle.getAttribute("data-event").split("-")[1];
    lastEle.insertAdjacentHTML("afterend", `<div class='event-date'></div><div data-event="${removeEnd+"-"+parseInt(i+1)}" onclick="openPopUp(event)" class='event-name'>${value}</div>`);

  }
  closeEvent();
}

function closeEvent(event) {
  document.getElementById("popup").classList.add('hide');
  console.log('test');
  selectedDate = "";
}



