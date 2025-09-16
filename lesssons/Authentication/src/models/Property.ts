import mongoose, { Schema, Document } from 'mongoose';

export interface IProperty extends Document {
    user?: mongoose.Types.ObjectId; 
    isApprove?: boolean;
    google_maps_link?: string;
    city?: string;
    district?: string;
    neighborhood?: string;
    street_address?: string;
    property_title?: string;
    property_type?: string;
    room_configuration?: string;
    gross_area?: number;
    net_area?: number;
    building_age?: number;
    floor_number?: number;
    total_floors?: number;
    heating_system?: string;
    bathrooms?: number;
    kitchen_type?: string;
    monthly_rent?: number;
    security_deposit?: number;
    parking?: string;
    nearest_university?: string;
    contact_name?: string;
    contact_email?: string;
    contact_phone?: string;
    description?: string;
    in_residential_complex?: boolean;
    elevator_available?: boolean;
    balcony_terrace?: boolean;
    garden_access?: boolean;
    fully_furnished?: boolean;
    smoking_allowed?: boolean;
    gym_fitness?: boolean;
    swimming_pool?: boolean;
    garden_green_area?: boolean;
    tv?: boolean;
    wifi?: boolean;
    air_conditioning?: boolean;
    microwave?: boolean;
    dishwasher?: boolean;
    coffee_machine?: boolean;
    washing_machine?: boolean;
    property_images?: string[];
    created_at?: Date;
    updated_at?: Date;
}

const PropertySchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
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

export default mongoose.model<IProperty>('Property', PropertySchema);
