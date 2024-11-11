// Predefined login credentials
const predefinedEmail = "ise@gmail.com";
const predefinedPassword = "class2023";

// Toggle the sidebar visibility
function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("active");
}

// Toggle between Login and Sign Up forms
function showLogin() {
    document.getElementById("loginForm").classList.add("active");
    document.getElementById("signUpForm").classList.remove("active");

    document.querySelector(".tab.active").classList.remove("active");
    document.querySelector(".tab:first-child").classList.add("active");
}

function showSignUp() {
    document.getElementById("loginForm").classList.remove("active");
    document.getElementById("signUpForm").classList.add("active");

    document.querySelector(".tab.active").classList.remove("active");
    document.querySelector(".tab:last-child").classList.add("active");
}

// Show the main container and hide the "Start Now" button when clicked
document.getElementById("startNowBtn").onclick = function() {
    document.getElementById("startNowBtnContainer").style.display = "none";
    document.getElementById("formContainer").style.display = "flex";
};

// Login function to verify email and password
function login(event) {
    event.preventDefault();  // Prevent form submission

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email === predefinedEmail && password === predefinedPassword) {
        window.location.href = "trs.html"; // Redirect to another HTML page in the same tab
    } else {
        alert("Incorrect email or password. Please try again.");
    }
}

// Placeholder functions for OTP functionality (unchanged)
let otpValue;

function sendOTP() {
    // This function is unchanged; OTP functionality is for Sign-Up only
}

function verifyOTP(event) {
    event.preventDefault();
    const otpInput = document.getElementById('otp_inp').value;

    if (otpInput == otpValue) {
        alert("Email address verified!");
    } else {
        alert("Invalid OTP. Please try again.");
    }
}

// Close sidebar when clicking outside
window.onclick = function(event) {
    const sidebar = document.getElementById("sidebar");
    if (!sidebar.contains(event.target) && sidebar.classList.contains("active") && event.target.id !== "hamburgerMenuBtn") {
        sidebar.classList.remove("active");
    }
};