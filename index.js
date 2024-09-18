let userForm = document.getElementById("user-form");

const retrieveEntries = () => {
	let entries = localStorage.getItem("userEntries");
	if (entries) {
		entries = JSON.parse(entries);
	} else {
		entries = [];
	}
	return entries;
};
let userEntries = retrieveEntries();
const displayEntries = () => {
	const entries = retrieveEntries();
	const tableEntries = entries
		.map((entry) => {
			const nameCell = `<td>${entry.name}</td>`;
			const emailCell = `<td>${entry.email}</td>`;
			const passwordCell = `<td>${entry.password}</td>`;
			const dobCell = `<td>${entry.dob}</td>`;
			const acceptedTermsCell = `<td>${entry.acceptedTerms}</td>`;

			const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptedTermsCell}</tr>`;
			return row;
		})
		.join("\n");

	const table = `<table>
    <th>Name</th>
    <th>Email</th>
    <th>Password</th>
    <th>Dob</th>
    <th>Accepted terms?</th>
    
    <tr>${tableEntries}</tr>
    </table>
    `;
	let details = document.getElementById("userEntries");
	details.innerHTML = table;
};
const saveUserForm = (event) => {
	event.preventDefault();
	const name = document.getElementById("name").value;
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;
	const dob = document.getElementById("dob").value;
	const acceptedTerms = document.getElementById("acceptTerms").checked;

	const entry = {
		name: name,
		email: email,
		password: password,
		dob: dob,
		acceptedTerms: acceptedTerms,
	};
	userEntries.push(entry);
	localStorage.setItem("userEntries", JSON.stringify(userEntries));
	displayEntries();
};
userForm.addEventListener("submit", saveUserForm);
displayEntries();
const email = document.getElementById("email");
const checkValidity = (element) => {
	if (element.validity.typeMismatch) {
		element.setCustomValidity("The email is not in correct format");
	} else {
		element.setCustomValidity("");
	}
};
email.addEventListener("input", checkValidity);
const dob = document.getElementById("dob");
const checkDobValidity = (event) => {
	const today = new Date();
	const birthDate = new Date(event.target.value);
	let age = today.getFullYear() - birthDate.getFullYear();
	const monthDifference = today.getMonth() - birthDate.getMonth();

	// Adjust age if the birth date hasn't occurred yet this year
	if (
		monthDifference < 0 ||
		(monthDifference === 0 && today.getDate() < birthDate.getDate())
	) {
		age--;
	}
	if (age < 18 || age > 55) {
		event.target.setCustomValidity("Age must be between 18 and 55.");
	} else {
		event.target.setCustomValidity(""); // Clear the custom validity message
	}
};
dob.addEventListener("input", checkDobValidity);