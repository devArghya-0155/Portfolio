// TODO: Add SDKs for Firebase products that you want to use
const firebaseConfig = {
  apiKey: "AIzaSyD6DrEg8N1p-MrqxyoBme_IKfZoLTnFj9s",
  authDomain: "portfolio-contact-form-833fc.firebaseapp.com",
  databaseURL:
    "https://portfolio-contact-form-833fc-default-rtdb.firebaseio.com",
  projectId: "portfolio-contact-form-833fc",
  storageBucket: "portfolio-contact-form-833fc.appspot.com",
  messagingSenderId: "574260254729",
  appId: "1:574260254729:web:b118d4bc71b996f1abc0d8",
  measurementId: "G-QXZNKBM1LD",
};
firebase.initializeApp(firebaseConfig);
const contactFormDB = firebase.database().ref("contactForm");

// Initialize Firebase
// import gsap from "gsap";
// gsap.registerPlugin(ScrollTrigger);
// gsap.to()

const inputField = document.querySelectorAll("div.input-elements > input");
const sections = document.querySelectorAll("section[id]");
let lastScroll = window.pageYOffset || document.documentElement.scrollTop;
let scrollThresholdUp = 0,
  scrollThresholdDown = 0;

window.addEventListener("scroll", currentSection);

function currentSection() {
  //highlights the active section in the scroll bar.
  onScroll();
  let scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".container li a[href*=" + sectionId + "]")
        .classList.add("active");
    } else {
      document
        .querySelector(".container li a[href*=" + sectionId + "]")
        .classList.remove("active");
    }

    if (scrollY > sections[0].offsetHeight) {
      document.querySelector("nav").classList.remove("sidebar");
      document.querySelector("nav").classList.add("scroll-after");
    } else {
      document.querySelector("nav").classList.remove("scroll-after");
      document.querySelector("nav").classList.add("sidebar");
    }
  });
}

function onScroll() {
  //hides scroll bar or displays scroll bar.
  const currentScroll = window.pageYOffset;
  if (currentScroll > lastScroll && currentScroll > scrollThresholdDown) {
    document
      .querySelector(".container")
      .classList.remove("container_scroll_up");
    document.querySelector(".container").classList.add("container_scroll_down");
    scrollThresholdUp = currentScroll - 150;
  }
  if (currentScroll < lastScroll && currentScroll <= scrollThresholdUp) {
    document
      .querySelector(".container")
      .classList.remove("continer_scroll_down");
    document.querySelector(".container").classList.add("container_scroll_up");
    scrollThresholdDown = currentScroll + 150;
  }
  lastScroll = currentScroll;
}

// document.querySelector(".resume").addEventListener("click", () =>{
//   const a = document.createElement('a'), url = "./resume.pdf";
//   a.href = url;
//   a.download = "Arghya's Resume";
//   document.body.appendChild(a);
//   a.click();
//   document.body.removeChild(a);
// })

// Import the functions you need from the SDKs you need
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;
  save(name, email, subject, message);
  document.querySelector(".alertMessage").style.opacity = "1";
  setTimeout(() => {
    document.querySelector(".alertMessage").style.opacity = "0";
  }, 2000);
  document.getElementById("contactForm").reset();
}

const save = (name, email, subject, message) => {
  var newContactForm = contactFormDB.push();
  newContactForm.set({
    name: name,
    email: email,
    message: message,
    subject: subject,
  });
};

const menu = document.querySelector(".menu");
const close = document.querySelector(".close");
const sidebar = document.querySelector(".sidebar");
menu.addEventListener("click", function handleClick() {
  sidebar.classList.add("display");
  menu.setAttribute("style", "display:none");
  close.setAttribute("style", "display:block");
});
close.addEventListener("click", function handleClick() {
  sidebar.classList.remove("display");
  close.setAttribute("style", "display:none");
  menu.setAttribute("style", "display:block");
});
const navItems = document.querySelectorAll(".nav-items");
navItems.forEach((e) => {
  e.addEventListener("click", function handleClick() {
    sidebar.classList.remove("display");
    close.setAttribute("style", "display:none");
    menu.setAttribute("style", "display:block");
  });
});
