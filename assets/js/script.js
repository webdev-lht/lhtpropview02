import { fetchMLSData } from "../js/app.js";

document.getElementById('showResultsBtn').addEventListener('click', renderResults);

async function renderResults() {
    const tableBody = document.getElementById('results');
    tableBody.innerHTML = '';

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
                
                //Filtering Logic (>20 Acres; <$20,000/Acre)
                if (acres >= 20 && pricePerAcre < 20000) {
                    const row = document.createElement('tr');
                    //Adding data for each property
                    row.innerHTML = `
                        <td>${mls}</td>
                        <td>${acres}</td>
                        <td>${listPrice}</td>
                        <td>${pricePerAcre}</td>
                        <td>${dom}</td>
                        <td>${county}</td>
                        <td>${address}</td>
                        <td>${schoolDistrict}</td>
                    `;
                    //Append row to the table body
                    tableBody.appendChild(row);
                }
            });
        } else {
            console.log('No data to display.')
        }
    } catch (error) {
        console.error('Error rendering results:', error)
    }
}

