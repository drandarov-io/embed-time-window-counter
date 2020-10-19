const params = new URLSearchParams(document.location.search);
const start_hour = params.get("start_hour");
const end_hour = params.get("end_hour");

console.info(start_hour);
console.info(end_hour);


function update_time() {
    let element = document.getElementById("widget_content")

    // Set the date we're counting down to
    let now = new Date();

    let start_date = new Date();
    start_date.setHours(start_hour);
    start_date.setMinutes(0);
    start_date.setSeconds(0);

    let end_date = new Date();
    end_date.setHours(end_hour);
    end_date.setMinutes(0);
    end_date.setSeconds(0);

    let countdown_date;

    if (start_date < now && now < end_date) {
        element.setAttribute("class", "inside")
        countdown_date = end_date
    } else if (now > end_date) {
        element.setAttribute("class", "outside")
        start_date.setDate(start_date.getDate() + 1)
        countdown_date = start_date
    } else if (start_date > now) {
        element.setAttribute("class", "outside")
        countdown_date = start_date
    }

    // Find the distance between now and the count down date
    let distance = countdown_date - now.getTime();

    // Time calculations for days, hours, minutes and seconds
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    //var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    element.innerHTML = days + "d " + hours + "h " + minutes + "m" //+ seconds + "s ";

    // If the count down is finished, write some text
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("widget_content").innerHTML = "EXPIRED";
    }
}

update_time()

// Update the count down every 60 seconds
let x = setInterval(update_time, 60000);
