import { LocationRepository } from "./location.repository.js";
import { Location } from "./location.entity.js";
const repository = new LocationRepository();
function sanitizeLocationInput(req, res, next) {
    req.body.sanitizedInput = {
        codigoPostal: req.body.codigoPostal,
        nombre: req.body.nombre,
    };
    Object.keys(req.body.sanitizedInput).forEach(key => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key];
        }
    });
    next();
}
function findAll(req, res) {
    res.json({ data: repository.findAll() });
}
function findOne(req, res) {
    const id = req.params.id;
    const location = repository.findOne({ id });
    if (!location) {
        return res.status(404).send({ message: 'Location not found' });
    }
    res.json({ data: location });
}
function add(req, res) {
    const input = req.body.sanitizedInput;
    const locationInput = new Location(input.codigoPostal, input.nombre);
    const location = repository.add(locationInput);
    return res.status(201).send({ message: 'Location created', data: location });
}
function update(req, res) {
    req.body.sanitizedInput.id = req.params.id;
    const location = repository.update(req.body.sanitizedInput);
    if (!location) {
        return res.status(404).send({ message: 'Location not found' });
    }
    return res.status(200).send({ message: 'Location updated successfully', data: location });
}
function remove(req, res) {
    const id = req.params.id;
    const location = repository.delete({ id });
    if (!location) {
        res.status(404).send({ message: 'Location not found' });
    }
    else {
        res.status(200).send({ message: 'Location deleted successfully' });
    }
}
export { sanitizeLocationInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=location.controler.js.map