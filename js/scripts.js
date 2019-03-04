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
  var stringToPrint = "";

  //adding HTML id based on first name and last name
  stringToPrint += "<div  class=''>";
  console.log(this.parsedID());
  //add first name to string
  stringToPrint += "<div class='animated entryLabel'> <a class='buttonlikething' id='" + this.parsedID() + "-button" + this.id + "' >" + this.fullName() + "</a><a value='x' class='labelclose btn-default'id='" + this.parsedID() + this.id + "-close'>x</a> </div></div></div> </div>";
  stringToPrint +=  "<div class='animated entry ' id=\'" + this.parsedID() + "\'><div class='animated propertyLabel name '> First name </div>";
  stringToPrint += " <div class='animated property'>" + this.firstName + "</div>";
  //add last name to string
  stringToPrint += "<div class='animated propertyLabel name title'> Last Name </div>";
  stringToPrint += "<div class='animated property '> <span class='nes-text is-default'>" + this.lastName + "</span></div>";
  //add phone number to string
  stringToPrint += "<br><div class='animated propertyLabel phoneNumber'> Phone Number</div><div class=' animated property'>" + this.phoneNumber;
  //add video games to string
  //add closing divs
  stringToPrint += "</div></div>";
  return stringToPrint;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}
function addCollapseToggle(cTact, parsed, id){
  console.log("did it");
  $("#"+parsed + "-button" + id).click(function(){
    $("#"+parsed).toggle();
    console.log("click created");
  });
  console.log("#"+id + "-button");
}

function addClose(cTact, parsed, id){
  console.log("did it");
      console.log(cTact, parsed, id);
  $("#" + parsed + id + "-close").click(function(){
    addressBook.deleteContact(id);
    BookRefresh(addressBook);
    console.log("click created");
  });
  console.log("#"+ cTact.parsedID() + "-button");
}
var addressBook = new AddressBook();
$(document).ready(function() {
  var storedVolume = 0;
  addressBook.addContact(yell);
  addressBook.addContact(smell);
  var vid = $("#ebselect")[0];
  vid.volume = 0.025;


  BookRefresh(addressBook);


  $("#newContactForm").submit(function(event){

    event.preventDefault();
    newContact = new Contact($("#fName").val(), $("#lName").val(),$("#pNumber").val() );
    addressBook.addContact(newContact);
    //addressBook.contacts[contactIndex] = newContact;
    $("#entries").append(newContact.stringPrint());
    addCollapseToggle(newContact, newContact.parsedID(), newContact.id);
        addClose(newContact, newContact.parsedID(), newContact.id);
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
function BookRefresh(aB)
{

  $("#entries").html("");
  aB.contacts.forEach(function(contactIndex){
    console.log(contactIndex);
    $("#entries").append(contactIndex.stringPrint());
    addCollapseToggle(contactIndex, contactIndex.parsedID(), contactIndex.id);
    addClose(contactIndex, contactIndex.parsedID(), contactIndex.id);

  });
}
