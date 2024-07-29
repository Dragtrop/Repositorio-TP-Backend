import { VehicleTypesRepository } from "./vehicleTypes.repository.js";
import { VehicleType } from "./vehicleType.entity.js";
const repository = new VehicleTypesRepository();
function sanitizeVehicleTypeInput(req, res, next) {
    req.body.sanitizedInput = {
        nombre: req.body.nombre,
        codigo: req.body.codigo,
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
    const vehicleType = repository.findOne({ id });
    if (!vehicleType) {
        return res.status(404).send({ message: 'Vehicle type not found' });
    }
    res.json({ data: vehicleType });
}
function add(req, res) {
    const input = req.body.sanitizedInput;
    const vehicleTypeInput = new VehicleType(input.nombre, input.codigo);
    const vehicleType = repository.add(vehicleTypeInput);
    return res.status(201).send({ message: 'Vehicle type created', data: vehicleType });
}
function update(req, res) {
    req.body.sanitizedInput.id = req.params.id;
    const vehicleType = repository.update(req.body.sanitizedInput);
    if (!vehicleType) {
        return res.status(404).send({ message: 'Vehicle type not found' });
    }
    return res.status(200).send({ message: 'Vehicle type updated successfully', data: vehicleType });
}
function remove(req, res) {
    const id = req.params.id;
    const vehicleType = repository.delete({ id });
    if (!vehicleType) {
        res.status(404).send({ message: 'Vehicle type not found' });
    }
    else {
        res.status(200).send({ message: 'Vehicle type deleted successfully' });
    }
}
export { sanitizeVehicleTypeInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=vehicleTypes.controler.js.map