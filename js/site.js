let events = [{
    event: "ComicCon",
    city: "New York",
    state: "New York",
    attendance: 240000,
    date: "06/01/2017",
  },
  {
    event: "ComicCon",
    city: "New York",
    state: "New York",
    attendance: 250000,
    date: "06/01/2018",
  },
  {
    event: "ComicCon",
    city: "New York",
    state: "New York",
    attendance: 257000,
    date: "06/01/2019",
  },
  {
    event: "ComicCon",
    city: "San Diego",
    state: "California",
    attendance: 130000,
    date: "06/01/2017",
  },
  {
    event: "ComicCon",
    city: "San Diego",
    state: "California",
    attendance: 140000,
    date: "06/01/2018",
  },
  {
    event: "ComicCon",
    city: "San Diego",
    state: "California",
    attendance: 150000,
    date: "06/01/2019",
  },
  {
    event: "HeroesCon",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 40000,
    date: "06/01/2017",
  },
  {
    event: "HeroesCon",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 45000,
    date: "06/01/2018",
  },
  {
    event: "HeroesCon",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 50000,
    date: "06/01/2019",
  },
];

// Build a dropdown of distinct cities
function buildDropDown(){

    let eventDD = document.getElementById("eventDropDown");
    // Clear out the drop down
    eventDD.innerHTML = "";
    // Get the template
    let ddTemplate = document.getElementById("cityDD-template");

    let currentEvents = JSON.parse(localStorage.getItem("eventData")) || events;

    // Get unique values from the array 
    let distinctEvents = [...new Set(currentEvents.map((event) => event.city))];

    let ddItemNode = document.importNode(ddTemplate.content, true);
    // <li><a class="dropdown-item" onClick="getEvents(this)"></a></li>
    // Use the importNode method to make a copy of the HTML from the node
    let ddItem = ddItemNode.querySelector("a");
    // <a class="dropdown-item" onClick="getEvents(this)"></a>
    // Use querySelector methods to select the anchor tag element within the node to modify
    ddItem.setAttribute("data-string", "All");
    // <a class="dropdown-item" data-string="All" onClick="getEvents(this)"></a>
    // Use setAttribute method to add a new attribute to the HTML called data string, and set value to "All"
    ddItem.textContent = "All";
    // <a class="dropdown-item" data-string="All" onClick="getEvents(this)">All</a>
    // Use textContent method to insert "All" between the opening and closing anchor tag
    eventDD.appendChild(ddItemNode);


  // Loop over each iteration of the mapped cities from the Set
  // and add the cities to the drop down
    for (let i = 0; i < distinctEvents.length; i++) {

      ddItemNode = document.importNode(ddTemplate.content, true);
      ddItem = ddItemNode.querySelector("a");
      ddItem.setAttribute("data-string", distinctEvents[i]);
      ddItem.textContent = distinctEvents[i];
      eventDD.appendChild(ddItemNode);

    }

    displayStats(currentEvents);
    displayData();

}

// Get the events for the selected city
function getEvents(ddElement){

  let cityName = ddElement.getAttribute("data-string");    
  let currentEvents = JSON.parse(localStorage.getItem("eventData")) || events;
  let filteredEvents = currentEvents;

  document.getElementById("statsHeader").innerHTML = `Stats for ${cityName}`;
  
  if (cityName != "All"){
    // Filter an array
    filteredEvents = currentEvents.filter(function (event) {
      if (event.city == cityName){
        return event;
      }
    })
  }
  
  displayStats(filteredEvents);

}

// Display stats for the filtered events
function displayStats(filteredEvents){

  let total = 0;
  let average = 0;
  let most = 0;
  let least = -1;

  let currentAttendance = 0;

  for (let i = 0; i < filteredEvents.length; i++) {
    
    currentAttendance = filteredEvents[i].attendance;
    total += currentAttendance;

    if (most < currentAttendance){
      most = currentAttendance;
    }

    if (least > currentAttendance || least < 0){
      least = currentAttendance;
    }    
  }

  // Calculate the average
  average = total / filteredEvents.length;

  document.getElementById("total").innerHTML = total.toLocaleString();
  document.getElementById("average").innerHTML = average.toLocaleString(
    undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }
  );
  document.getElementById("most").innerHTML = most.toLocaleString();
  document.getElementById("least").innerHTML = least.toLocaleString();

}

// Display data in data tabler
function displayData(){
  let template = document.getElementById("eventData-template");
  let eventBody = document.getElementById("eventBody");

  eventBody.innerHTML = "";

  let currentEvents = JSON.parse(localStorage.getItem("eventData")) || events;

  for (let i = 0; i < currentEvents.length; i++) {
    
    let eventRow = document.importNode(template.content, true);
    let eventCols = eventRow.querySelectorAll("td");

    eventCols[0].textContent = currentEvents[i].event;
    eventCols[1].textContent = currentEvents[i].city;
    eventCols[2].textContent = currentEvents[i].state;
    eventCols[3].textContent = currentEvents[i].attendance;
    eventCols[4].textContent = new Date (
      currentEvents[i].date
    ).toLocaleDateString();
    
    eventBody.appendChild(eventRow);    
  }
}

//Save event data to local storage
function saveData() {
  let currentEvents = JSON.parse(localStorage.getItem("eventData")) || events;
  let stateSelect = document.getElementById("addEventState");
  let eventDate = document.getElementById("addDate").value;
  let eventDate2 = `${eventDate} 00:00`;

  let newEvent = {
      event: document.getElementById("addEventName").value,
      city: document.getElementById("addCity").value,
      state: stateSelect.options[stateSelect.selectedIndex].text,
      attendance: parseInt(document.getElementById("addAttendance").value, 10),
      date: new Date(eventDate2).toLocaleDateString(),
  };

  currentEvents.push(newEvent);

  localStorage.setItem("eventData", JSON.stringify(currentEvents));

  buildDropDown();
  displayData();


}