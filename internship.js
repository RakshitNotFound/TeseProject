// JSON data given to me
const energyData = [
    {"facility": "Facility A", "month": "January", "energy_consumption_kwh": 1500},
    {"facility": "Facility A", "month": "February", "energy_consumption_kwh": 1700},
    {"facility": "Facility B", "month": "January", "energy_consumption_kwh": 1200}
];

const waterData = [
    {"facility": "Facility A", "day": "2024-01-01", "water_usage_liters": 100},
    {"facility": "Facility A", "day": "2024-01-02", "water_usage_liters": 120},
    {"facility": "Facility B", "day": "2024-01-01", "water_usage_liters": 90}
];

const wasteData = [
    {"facility": "Facility A", "quarter": "Q1", "waste_produced_kg": 300},
    {"facility": "Facility A", "quarter": "Q2", "waste_produced_kg": 350},
    {"facility": "Facility B", "quarter": "Q1", "waste_produced_kg": 250}
];

function processEnergyData(data) {
    const result = {};
    //looping through the data
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const facility = item.facility;
        const month = item.month;
        
        if (!result[facility]) {
            result[facility] = { energy: 0 };
        }
      // Hard checking for month === January
        
        if (month === 'January') {
            result[facility].energy += item.energy_consumption_kwh;
        }
    }
    
    return result;
}

function processWaterData(data) {
    const result = {};
    //looping through Water Data
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const facility = item.facility;
        const day = new Date(item.day);
        
        if (!result[facility]) {
            result[facility] = { water: [] };
        }
        
        if (day.getFullYear() === 2024 && day.getMonth() === 0) {
            result[facility].water.push(item.water_usage_liters);
        }
    }
    
    return result;
}

function processWasteData(data) {
    const result = {};
    
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const facility = item.facility;
        const quarter = item.quarter;
        
        if (!result[facility]) {
            result[facility] = { waste: 0 };
        }
        
        if (quarter === 'Q1') {
            result[facility].waste += item.waste_produced_kg;
        }
    }
    
    return result;
}

function calculateMetrics(energyData, waterData, wasteData) {
    const result = {};
  //getting keys and no duplication
    const facilities = [...new Set([...Object.keys(energyData), ...Object.keys(waterData), ...Object.keys(wasteData)])];
    
    for (let i = 0; i < facilities.length; i++) {
        const facility = facilities[i];
        const energy = energyData[facility]?.energy || 0;
        const water = waterData[facility]?.water?.reduce((sum, val) => sum + val, 0) / waterData[facility]?.water?.length || 0;
        const waste = wasteData[facility]?.waste || 0;
        
        result[facility] = {
            energy: `${energy.toFixed(2)} kWh`,
            water: `${water.toFixed(2)} liters`,
            waste: `${waste.toFixed(2)} kg`
        };
    }
    
    return result;
}

function printResults(results) {
    console.log('\n');
    Object.entries(results).forEach(([facility, metrics]) => {
        console.log(`${facility}:`);
        console.log(`- Total Energy Consumption in January: ${metrics.energy}`);
        console.log(`- Average Daily Water Usage in January: ${metrics.water}`);
        console.log(`- Total Waste Produced in Q1: ${metrics.waste}`);
        console.log('\n');
    });
}

//  execution
const processedEnergy = processEnergyData(energyData);
const processedWater = processWaterData(waterData);
const processedWaste = processWasteData(wasteData);

const finalMetrics = calculateMetrics(processedEnergy, processedWater, processedWaste);
printResults(finalMetrics);
