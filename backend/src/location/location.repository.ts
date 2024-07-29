import { Repository } from "../shared/repository.js";
import { Location } from "./location.entity.js";

const locations = [
    new Location(
    '12345', 
    'Location A', 
    'a02b91bc-3769-4221-beb1-d7a3aeba7dad'),
];

export class LocationRepository implements Repository<Location> {

    public findAll(): Location[] | undefined {
        return locations;
    }

    public findOne(item: { id: string; }): Location | undefined {
        return locations.find((location) => location.id === item.id);
    }

    public add(item: Location): Location | undefined {
        locations.push(item);
        return item;
    }

    public update(item: Location): Location | undefined {
        const locationIdx = locations.findIndex((location) => location.id === item.id);
        if (locationIdx !== -1) {
            locations[locationIdx] = { ...locations[locationIdx], ...item };
        }
        return locations[locationIdx];
    }

    public delete(item: { id: string }): Location | undefined {
        const locationIdx = locations.findIndex((location) => location.id === item.id);
        if (locationIdx !== -1) {
            const deletedLocation = locations[locationIdx];
            locations.splice(locationIdx, 1);
            return deletedLocation;
        }
    }
}
