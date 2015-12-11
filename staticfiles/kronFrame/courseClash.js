var vals = new Array(5); // stores user choices
var color = ['rgb(146, 208, 80)', 'rgb(255, 192, 0)','rgb(164, 205, 255)','rgb(255, 102, 102)', 'rgb(255, 102, 255)'];
getDefault();
function getDefault() {
	for(i = 1; i < 6; i++){
		noticeChange("Sub"+i, i);
		//console.log("Sub"+i);
	}
	console.log("Default Value Array: "+vals);
}
function noticeChange(Subj, j) {
	var e = document.getElementById(Subj);
	if(e != null) {
		var userChoice = e.options[e.selectedIndex].text;
		if(vals[j-1] != null) {
			if(vals.indexOf(userChoice) != -1 && userChoice != "-----") { // check if choice doesn't already exist or is no course
				alert("You have already chosen that course!");
				e.value = vals[j-1];
				vals[j-1] = "-----";
			}
			else if(userChoice == "-----") { // if user choice is no course
				var f = document.getElementsByClassName(vals[j-1]);
				for(i = 0; i < f.length; i++) {
					f[i].style.fontWeight = 'Normal';
					var elem = f[i].parentNode;
					elem.style.backgroundColor = '';
					var retrieveAll = elem.children;
					for(k = 0; k < retrieveAll.length; k++) {
						retrieveAll[k].style.display = 'Block';
					}
				}
				e.value = "-----";
				vals[j-1] = "-----";
			}
			else { // if new choice
				var f = document.getElementsByClassName(userChoice);
				var prevChoice = color[j-1];
				var printColor = findAll(f, userChoice, prevChoice);
				
				if(printColor != 0) { // if no clash found
					var g = document.getElementsByClassName(vals[j-1]);
					for(i = 0; i < g.length; i++) { // remove previous subject colors
						g[i].style.fontWeight = 'Normal';
						var elem = g[i].parentNode;
						elem.style.backgroundColor = '';
						var retrieveAll = elem.children;
						for(k = 0; k < retrieveAll.length; k++) {
							retrieveAll[k].style.display = 'Block';
						}
					}
					for(i = 0; i < f.length; i++) { // add current subject colors
						f[i].style.fontWeight = 'Bold';
						var elem = f[i].parentNode;
						elem.style.backgroundColor = color[j-1];
						var retrieveAll = elem.children;
						for(k = 0; k < retrieveAll.length; k++) {
							if(retrieveAll[k] != f[i])
							retrieveAll[k].style.display = 'None';
						}
					}
					vals[j-1] = userChoice; // update selected courses tracker
				}
				
				else {
					e.value = vals[j-1]; // reset value of select field
				}
			}
			console.log("Value Array: "+vals);
		}
		else {
			vals[j-1] = userChoice;
		}
	}
}
function findAll(f, userChoice, prevChoice) {
	for(i = 0; i < f.length; i++) {
		var elem = f[i].parentNode;
		if(elem.style.backgroundColor != '' && elem.style.backgroundColor != prevChoice) {
			alert("Clash between "+userChoice+" and "+vals[color.indexOf(elem.style.backgroundColor)]);
			return 0;
		}
	}
	return 1;
}