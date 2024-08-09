document.querySelectorAll('input[type="number"]').forEach(inputNumer => {
    inputNumer.oninput = () => {
        if (inputNumer.value.length > inputNumer.maxLength) {
            inputNumber.value = inputNumer.value.slice(0, inputNumer.maxLength);
        }
    };
});


let loanAmount = document.getElementById('amount');
let loanInterest = document.getElementById('interest');
let loanTenure = document.getElementById('loanTenure');
let calculate = document.getElementById('calculate');

calculate.onclick = (e) => {
    e.preventDefault();

    let isYear = document.getElementById('year').checked;
    let isMonth = document.getElementById('month').checked;

    let noOfMonths = 0;

    if(isMonth == '' && isYear == ''){
        alert('Please select either yearly or monthly payment');
        return;
    }

    else{
        if(isYear == true){
            noOfMonths = loanTenure.value * 12;
        }
        else {
            noOfMonths = loanTenure.value;
        }
    }


    let r = parseFloat(loanInterest.value)/12/100;

    let p = loanAmount.value;

    let n = noOfMonths;

    // formula for EMI  (P * r * (1+r)^n)/ ((1+r)^n - 1)

    let emi = (p * r * Math.pow( (1 + r), n)) / (Math.pow((1 + r), n) - 1);

    let totalInterest = (emi * n) - p;

    let totalPayment = totalInterest + parseFloat(p);


    document.getElementById('emi').innerHTML = '₹ ' + Math.round(emi);
    
    
    document.getElementById('totalInterest').innerHTML = '₹ ' + Math.round(totalInterest);


    document.getElementById('totalPayment').innerHTML = '₹ ' + Math.round(totalPayment);


}

let clear = document.getElementById('clear');

    clear.onclick = (e) => {
        e.preventDefault();
        
        // Clear all input fields
        loanAmount.value = '';
        loanInterest.value = '';
        loanTenure.value = '';
        document.getElementById('year').checked = true;  // Reset to yearly by default

        // Clear the output fields
        document.getElementById('emi').innerHTML = '';
        document.getElementById('totalInterest').innerHTML = '';
        document.getElementById('totalPayment').innerHTML = '';
    };



    let save = document.getElementById('save');
    let recordsList = document.getElementById('recordsList');
    let clearRecords = document.getElementById('clearRecords');

    // Function to save the current calculation
    save.onclick = (e) => {
        e.preventDefault();

        // Get the current calculation results
        let emi = document.getElementById('emi').innerText;
        let totalInterest = document.getElementById('totalInterest').innerText;
        let totalPayment = document.getElementById('totalPayment').innerText;

        // Check if there are valid results to save
        if (emi && totalInterest && totalPayment) {
            // Create a new record element
            let record = document.createElement('div');
            record.innerHTML = `<strong>EMI:</strong> ${emi}, <strong>Total Interest:</strong> ${totalInterest}, <strong>Total Payment:</strong> ${totalPayment}`;
            
            // Append the record to the records list
            recordsList.appendChild(record);

            // Save the record to localStorage (for persistence)
            let records = JSON.parse(localStorage.getItem('emiRecords')) || [];
            records.push(record.innerHTML);
            localStorage.setItem('emiRecords', JSON.stringify(records));
        } else {
            alert('Please calculate the EMI before saving the record.');
        }
    };

    // Function to clear all saved records
    clearRecords.onclick = (e) => {
        e.preventDefault();
        recordsList.innerHTML = '';
        localStorage.removeItem('emiRecords');
    };

    // Function to load saved records from localStorage when the page loads
    window.onload = () => {
        let savedRecords = JSON.parse(localStorage.getItem('emiRecords')) || [];
        savedRecords.forEach(record => {
            let recordElement = document.createElement('div');
            recordElement.innerHTML = record;
            recordsList.appendChild(recordElement);
        });
    };