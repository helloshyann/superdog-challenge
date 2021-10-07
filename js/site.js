function displayMessage(){
    let msg = "";

    msg = document.getElementById("message").value;

    Swal.fire(msg);
}