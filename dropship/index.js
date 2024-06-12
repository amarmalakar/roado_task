class ShipmentValidator {
    constructor(pickups, dropoffs, trips) {
        this.pickups = new Set(pickups);
        this.dropoffs = new Set(dropoffs);
        this.trips = trips;
    }
    validate() {
        const currentPickups = new Set();
        const currentDropoffs = new Set();
        for (const trip of this.trips) {
            // Validate pickups
            for (const pickup of trip.pickups) {
                if (!this.pickups.has(pickup)) {
                    return false;
                }
                currentPickups.add(pickup);
            }
            // Validate dropoffs
            for (const dropoff of trip.dropoffs) {
                if (!this.dropoffs.has(dropoff)) {
                    return false;
                }
                currentDropoffs.add(dropoff);
            }
            // Validate via points (if provided)
            if (trip.via) {
                if (this.dropoffs.has(trip.via)) {
                    return false;
                }
            }
        }
        // Check if all pickup points are covered
        if (currentPickups.size !== this.pickups.size) {
            return false;
        }
        // Check if all dropoff points are covered
        if (currentDropoffs.size !== this.dropoffs.size) {
            return false;
        }
        return true;
    }
}
// Example usage
const pickups = ['A', 'B'];
const dropoffs = ['C', 'D'];
const trips = [
    { pickups: ['A'], dropoffs: [], via: 'W' },
    { pickups: ['B'], dropoffs: [], via: 'W' },
    { pickups: [], dropoffs: ['C'], via: 'W' },
    { pickups: [], dropoffs: ['D'], via: 'W' }
];
const validator = new ShipmentValidator(pickups, dropoffs, trips);
console.log('Are the trips valid?', validator.validate());
const invalidTrips = [
    { pickups: ['A'], dropoffs: [], via: 'W' },
    { pickups: ['X'], dropoffs: [], via: 'W' },
    { pickups: [], dropoffs: ['C'], via: 'W' },
    { pickups: [], dropoffs: ['D'], via: 'W' }
];
const invalidValidator = new ShipmentValidator(pickups, dropoffs, invalidTrips);
console.log('Are the trips valid?:', invalidValidator.validate());
