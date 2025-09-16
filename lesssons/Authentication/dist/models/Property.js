"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const PropertySchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    isApprove: { type: Boolean, default: false },
    google_maps_link: String,
    city: String,
    district: String,
    neighborhood: String,
    street_address: String,
    property_title: String,
    property_type: { type: String, enum: ['apartment_for_rent', 'room_for_rent', 'shared_apartment', 'studio'] },
    room_configuration: { type: String, enum: ['1+0', '1+1', '2+0', '2+1', '3+0', '3+1', '4+1'] },
    gross_area: Number,
    net_area: Number,
    building_age: Number,
    floor_number: Number,
    total_floors: Number,
    heating_system: { type: String, enum: ['central_heating', 'natural_gas', 'combi_boiler', 'underfloor', 'electric', 'stove'] },
    bathrooms: Number,
    kitchen_type: String,
    monthly_rent: Number,
    security_deposit: Number,
    parking: String,
    nearest_university: String,
    contact_name: String,
    contact_email: String,
    contact_phone: String,
    description: String,
    in_residential_complex: { type: Boolean, default: false },
    elevator_available: { type: Boolean, default: false },
    balcony_terrace: { type: Boolean, default: false },
    garden_access: { type: Boolean, default: false },
    fully_furnished: { type: Boolean, default: false },
    smoking_allowed: { type: Boolean, default: false },
    gym_fitness: { type: Boolean, default: false },
    swimming_pool: { type: Boolean, default: false },
    garden_green_area: { type: Boolean, default: false },
    tv: { type: Boolean, default: false },
    wifi: { type: Boolean, default: false },
    air_conditioning: { type: Boolean, default: false },
    microwave: { type: Boolean, default: false },
    dishwasher: { type: Boolean, default: false },
    coffee_machine: { type: Boolean, default: false },
    washing_machine: { type: Boolean, default: false },
    property_images: [String],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});
exports.default = mongoose_1.default.model('Property', PropertySchema);
