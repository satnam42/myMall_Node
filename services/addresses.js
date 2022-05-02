
const setAddress = async (model, address, context) => {
    const log = context.logger.start("services:addresses:setAddress");
    if (model.fullName !== "string" && model.fullName !== undefined) {
        address.fullName = model.fullName;
    }

    if (model.area !== "string" && model.area !== undefined) {
        address.area = model.area;
    }

    if (model.buildingNo !== "string" && model.buildingNo !== undefined) {
        address.buildingNo = model.buildingNo;
    }

    if (model.city !== "string" && model.city !== undefined) {
        address.city = model.city;
    }

    if (model.country !== "string" && model.country !== undefined) {
        address.country = model.country;
    }

    if (model.state !== "string" && model.state !== undefined) {
        address.state = model.state;
    }

    if (model.pinCode !== "string" && model.pinCode !== undefined) {
        address.pinCode = model.pinCode;
    }

    if (model.street !== "string" && model.street !== undefined) {
        address.street = model.street;
    }
    if (model.isDefault !== "string" && model.isDefault !== undefined) {
        address.isDefault = model.isDefault;
    }
    log.end();
    await address.save();
    return address;
};
//register address

const buildAddress = async (model, context) => {
    const { userId, fullName, area, buildingNo, city, country, state, pinCode, street, isDefault } = model;
    const log = context.logger.start(`services:addresses:buildAddress${model}`);
    const address = await new db.address({
        fullName: fullName,
        user: userId,
        area: area,
        buildingNo: buildingNo,
        city: city,
        country: country,
        state: state,
        pinCode: pinCode,
        street: street,
        isDefault: isDefault
    }).save();
    log.end();
    return address;
};

const create = async (model, context) => {
    const log = context.logger.start("services:addresses:create");
    address = buildAddress(model, context);
    log.end();
    return address;

};


const getUserById = async (id, context) => {
    const log = context.logger.start(`services:addresses:getUserById`);
    if (!id) {
        throw new Error("user id is required");
    }
    let addresses = await db.address.find({ user: id })
    if (!addresses) {
        throw new Error("address not found");
    }
    log.end();
    return addresses;
};
const getAddressById = async (id, context) => {
    const log = context.logger.start(`services:addresses:getAddressById`);
    if (!id) {
        throw new Error(" id is required");
    }
    const address = await db.address.findById(id)
    if (!address) {
        throw new Error("address not found");
    }
    log.end();
    return address;
};

const update = async (id, model, context) => {
    const log = context.logger.start(`services:addresses:update`);
    let entity = await db.address.findById(id)
    if (!entity) {
        throw new Error("invalid address");
    }
    const address = await setAddress(model, entity, context);
    log.end();
    return address
};


exports.create = create;
exports.getUserById = getUserById;
exports.update = update;
exports.getAddressById = getAddressById;