import { Location } from "./location.entity.js";
const locations = [
    new Location('12345', 'Location A', 'a02b91bc-3769-4221-beb1-d7a3aeba7dad'),
];
export class LocationRepository {
    findAll() {
        return locations;
    }
    findOne(item) {
        return locations.find((location) => location.id === item.id);
    }
    add(item) {
        locations.push(item);
        return item;
    }
    update(item) {
        const locationIdx = locations.findIndex((location) => location.id === item.id);
        if (locationIdx !== -1) {
            locations[locationIdx] = { ...locations[locationIdx], ...item };
        }
        return locations[locationIdx];
    }
    delete(item) {
        const locationIdx = locations.findIndex((location) => location.id === item.id);
        if (locationIdx !== -1) {
            const deletedLocation = locations[locationIdx];
            locations.splice(locationIdx, 1);
            return deletedLocation;
        }
    }
}
//# sourceMappingURL=location.repository.js.map