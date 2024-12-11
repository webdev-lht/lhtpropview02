import { fetchMLSData } from "../js/app.js";

document.getElementById('showResultsBtn').addEventListener('click', renderResults);

async function renderResults() {
    const tableBody = document.getElementById('results');
    const resultsCounter = document.getElementById('results-counter');
    tableBody.innerHTML = '';
    let count = 0;

    try {
        //Fetch MLS data from Firebase
        const data = await fetchMLSData();

        if(data) {
            //Iterate over each property data and add it to the table
            Object.values(data).forEach(property => {
                const row = document.createElement('tr');

                //Accessing properties using bracket notation
                const mls = property['property_MLS_Number'];
                const acres = property['property_Acres'];
                const listPrice = property['property_List_Price'];
                const dom = property['property_DOM'];
                const county = property['property_County'];
                const address = property['property_Address'];
                const schoolDistrict = property['property_School_District'];

                //Calculate Price per Acre
                const pricePerAcre = property.property_Acres > 0 ? (parseFloat(property.property_List_Price) / parseFloat(property.property_Acres)).toFixed(2) : 'N/A'; 
                
                //Filtering Logic (>20 Acres; <$30,000/Acre)
                if (acres >= 20 && pricePerAcre < 30000) {
                    //increment counter
                    count++;
                    const row = document.createElement('tr');
                    //Adding data for each property
                    row.innerHTML = `
                        <td><input type="checkbox" class="property-checkbox"></td>
                        <td>${mls}</td>
                        <td>${acres}</td>
                        <td>${listPrice}</td>
                        <td>${pricePerAcre}</td>
                        <td>${dom}</td>
                        <td>${county}</td>
                        <td>${address}</td>
                        <td>${schoolDistrict}</td>
                    `;

                    //Event listener to the checkbox
                    const checkbox = row.querySelector('.property-checkbox');
                    checkbox.addEventListener('change', (e) => {
                        if (e.target.checked) {
                            row.style.textDecoration = 'line-through';
                        } else {
                            row.style.textDecoration = 'none';
                        }
                    });
                    
                    //Append row to the table body
                    tableBody.appendChild(row);
                }
            });
        } else {
            console.log('No data to display.')
        }

        //update results counter
        resultsCounter.textContent = `Results: ${count}`;
    } catch (error) {
        console.error('Error rendering results:', error)
    }
}

