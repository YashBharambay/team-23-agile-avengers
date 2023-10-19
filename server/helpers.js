// First name, middle name, last name, age, gender, height, smoke, alcohol, activity, allergies, symptoms, other complaints, medications, recent visits, doctor
// contact: {address line, address line 2, city, zipcode, state, contact number}
// emergency contact: {name, contact number}
// insurance: {member id, group number, plan type, primary care provider}
// health data:{  date:  {weight, systolic-blood-pressure, diastolic-blood-pressure, cholesterole, glucose} }

function First_Name(FirstName) {
	if (typeof FirstName !== 'string') {
		throw `Input First Name is not a string`;
	}
	if (FirstName.trim() == '') {
		throw `Input for First Name is Empty`;
	}
	let TFirst = FirstName.trim();
	TFirst = FirstName.toLowerCase();
	const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
	const numberRegex = /\d/;
	if (symbolRegex.test(FirstName)) {
		throw `Invalid input has symbols in first name`;
	}
	if (numberRegex.test(FirstName)) {
		throw `Invalid input has numbers in first name`;
	}
}

function Last_Name(LastName) {
	if (typeof LastName !== 'string') {
		throw `Input Last Name is not a string`;
	}
	if (LastName.trim() == '') {
		throw `Input for Last Name is Empty`;
	}
	let Tlast = LastName.trim();
	Tlast = Tlast.toLowerCase();
	const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
	const numberRegex = /\d/;
	if (symbolRegex.test(LastName)) {
		throw `Invalid input has symbols in Last name`;
	}
	if (numberRegex.test(LastName)) {
		throw `Invalid input has numbers in Last name`;
	}
}

function Middle_Name(MiddleName) {
	if (typeof MiddleName !== 'string') {
		throw `Input Last Name is not a string`;
	}
	if (MiddleName.trim() == '') {
		throw `Input for Last Name is Empty`;
	}
	let TMiddle = MiddleName.trim();
	TMiddle = TMiddle.toLowerCase();
	const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
	const numberRegex = /\d/;
	if (symbolRegex.test(MiddleName)) {
		throw `Invalid input has symbols in Last name`;
	}
	if (numberRegex.test(MiddleName)) {
		throw `Invalid input has numbers in Last name`;
	}
}

function Patient_Age(Age) {
	if (typeof Age !== 'number') {
		throw `Age input is not a number`;
	}
	if (Age <= 0) {
		throw `Age should be greater than 0`;
	}
	if (Age > 999) {
		throw `Invalid age input`;
	}
}

function Patient_Gender(Gender) {
	if (typeof Gender !== 'string') {
		throw `Input is not a string`;
	}
	let LowerGender = Gender.trim();
	LowerGender = LowerGender.toLowerCase();
	const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
	const numberRegex = /\d/;
	if (symbolRegex.test(LowerGender)) {
		throw `Invalid gender input`;
	}
	if (numberRegex.test(LowerGender)) {
		throw `Invalid gender input`;
	}
	if (LowerGender === 'male' || LowerGender === 'female') {
		return true;
	} else {
		throw `Invalid gender`;
	}
}

function Patient_Height(Height) {
	if (typeof Height !== 'number') {
		throw `Invalid height input`;
	}
}

function Patient_Smoke(Smoke) {
	if (typeof Smoke !== 'string') {
		throw `Invalid Input at smoke`;
	}
	let TSmoke = Smoke.trim();
	TSmoke = TSmoke.toLowerCase();
	const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
	const numberRegex = /\d/;
	if (symbolRegex.test(TSmoke)) {
		throw `Invalid input has symbols in Last name`;
	}
	if (numberRegex.test(TSmoke)) {
		throw `Invalid input has numbers in Last name`;
	}
	if (TSmoke !== 'no' || TSmoke !== 'yes') {
		throw `Please enter only Yes ot No answer for smoke`;
	}
}

function Patient_Alcohol(Alcohol) {
	if (typeof Alcohol !== 'string') {
		throw `Invalid input for alcohol`;
	}
	if (Alcohol.trim() == '') {
		throw `Cannot pass a empty value`;
	}
	let TAlcohol = Alcohol.trim();
	TAlcohol = TAlcohol.toLowerCase();
	const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
	const numberRegex = /\d/;
	if (symbolRegex.test(TAlcohol)) {
		throw `Invalid input has symbols in Last name`;
	}
	if (numberRegex.test(TAlcohol)) {
		throw `Invalid input has numbers in Last name`;
	}
	if (TAlcohol !== 'yes' || TAlcohol !== 'no') {
		throw `Please give a yes or no answer for alcohol`;
	}
}

function Patient_Allergies(allergies) {
	if (typeof allergies !== 'string') {
		throw `Invalid Allergie Input`;
	}
	if (allergies.trim() == '') {
		throw `Cannot pass empty answer`;
	}
	let TAllergies = allergies.trim();
	TAllergies = TAllergies.toLowerCase();
	const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
	const numberRegex = /\d/;
	if (symbolRegex.test(TAllergies)) {
		throw `Invalid input has symbols in Last name`;
	}
	if (numberRegex.test(TAllergies)) {
		throw `Invalid input has numbers in Last name`;
	}
}

function Patient_Activity(Activity) {
	if (typeof Activity !== 'string') {
		throw `Input is not a string`;
	}
	if (Activity.trim() == '') {
		throw `cannot pass empty string`;
	}
	let TActivity = Activity.trim();
}
