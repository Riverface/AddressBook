// Business Logic for AddressBook ---------
var yell = new Contact("Jon", "Tron", "503-857-3853");
var smell = new Contact("Mike", "Wazowski", "592-393-6837");

function AddressBook() {
  this.contacts = [],
  this.currentId = 0
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
}

Contact.prototype.parsedID = function(){
  return this.firstName.replace(" ", "_") + this.lastName.replace(" ", "_") + addressBook.currentId;
  //console.log(this.firstName.replace(" ", "") + this.lastName.replace(" ", ""));
}

Contact.prototype.stringPrint = function() {
  //starting print var

  this.stringPrint = "";
  //adding HTML id based on first name and last name
  this.stringPrint += "<div  class='container'>";
  console.log(this.parsedID());
  //add first name to string
  this.stringPrint += "<a class='buttonlikething' id='" + this.parsedID() + "-button'" + "><div class='animated entryLabel'>"  + this.fullName() + "</div></a>";
  this.stringPrint +=  "<div class='animated entry ' id=\'" + this.parsedID() + "\'><div class='animated propertyLabel name '> First name </div>";
  this.stringPrint += " <div class='animated property'>" + this.firstName + "</div>";
  //add last name to string
  this.stringPrint += "<div class='animated propertyLabel name title'> Last Name </div>";
  this.stringPrint += "<div class='animated property '> <span class='nes-text is-default'>" + this.lastName + "</span></div>";
  //add phone number to string
  this.stringPrint += "<br><div class='animated propertyLabel phoneNumber'> Phone Number</div><div class=' animated property'>" + this.phoneNumber;
  //add video games to string
  //add closing divs
  this.stringPrint += "</div></div>";

  return this.stringPrint;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}
function addCollapseToggle(id){
  console.log("did it");
  $("#"+id + "-button").click(function(){
    $("#"+id).toggle();
    console.log("click created");
  });
  console.log("#"+id + "-button");
}


var addressBook = new AddressBook();
$(document).ready(function() {
  var storedVolume = 0;
  addressBook.addContact(yell);
  addressBook.addContact(smell);
  var vid = $("#ebselect")[0];
  vid.volume = 0.025;


  BookRefresh();


  $("#newContactForm").submit(function(event){

      event.preventDefault();
      newContact = new Contact($("#fName").val(), $("#lName").val(),$("#pNumber").val() );
      addressBook.addContact(newContact);
      //addressBook.contacts[contactIndex] = newContact;
      $("#entries").append(newContact.stringPrint());
          addCollapseToggle( newContact.parsedID());
  });


  $("#volup").click(function(){
    vid.volume += .05;
  });
  $("#voldown").click(function(){
    vid.volume -= .05;
  });
  $("#mute").click(function(){

    vid.muted =  !vid.muted;
  });

});
function BookRefresh()
{
  addressBook.contacts.forEach(function(contactIndex){
    console.log(contactIndex);
    $("#entries").append(contactIndex.stringPrint());
    addCollapseToggle( contactIndex.parsedID());
  });
}
