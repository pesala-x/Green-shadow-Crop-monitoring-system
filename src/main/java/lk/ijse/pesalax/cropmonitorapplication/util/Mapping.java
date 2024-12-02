package lk.ijse.pesalax.cropmonitorapplication.util;

import lk.ijse.pesalax.cropmonitorapplication.dto.impl.*;
import lk.ijse.pesalax.cropmonitorapplication.entity.impl.*;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class Mapping {
    @Autowired
    private ModelMapper modelMapper;

    // Field mappings
    public FieldDTO convertToFieldDTO(Field field) {
        return modelMapper.map(field, FieldDTO.class);
    }

    public Field convertToField(FieldDTO fieldDTO) {
        return modelMapper.map(fieldDTO, Field.class);
    }

    public List<FieldDTO> convertToFieldListDTO(List<Field> fields) {
        return modelMapper.map(fields, new TypeToken<List<FieldDTO>>() {
        }.getType());
    }

    // Vehicle mappings
    public VehicleDTO convertToVehicleDTO(Vehicle vehicle) {
        return modelMapper.map(vehicle, VehicleDTO.class);
    }

    public Vehicle convertToVehicle(VehicleDTO vehicleDTO) {
        return modelMapper.map(vehicleDTO, Vehicle.class);
    }

    public List<VehicleDTO> convertToVehicleListDTO(List<Vehicle> vehicles) {
        return modelMapper.map(vehicles, new TypeToken<List<VehicleDTO>>() {}.getType());
    }

    //Crop mappings
    public CropDTO convertToCropDTO(Crop crop) {
        return modelMapper.map(crop, CropDTO.class);
    }
    public Crop convertToCrop(CropDTO cropDTO) {
        return modelMapper.map(cropDTO, Crop.class);
    }
    public List<CropDTO> convertToCropListDTO(List<Crop> crops) {
        return modelMapper.map(crops, new TypeToken<List<CropDTO>>() {}.getType());
    }

    //Staff mappings
    public StaffDTO convertToStaffDTO(Staff staff) {
        return modelMapper.map(staff, StaffDTO.class);
    }

    public Staff convertToStaff(StaffDTO staffDTO) {
        return modelMapper.map(staffDTO, Staff.class);
    }

    public List<StaffDTO> convertToStaffListDTO(List<Staff> staff) {
        return modelMapper.map(staff, new TypeToken<List<StaffDTO>>() {}.getType());
    }

    //Equipment mapping
    public EquipmentDTO convertToEquipmentDTO(Equipment equipment) {
        return modelMapper.map(equipment, EquipmentDTO.class);
    }

    public Equipment convertToEquipment(EquipmentDTO equipmentDTO) {
        return modelMapper.map(equipmentDTO, Equipment.class);
    }

    public List<EquipmentDTO> convertToEquipmentListDTO(List<Equipment> equipments) {
        return modelMapper.map(equipments, new TypeToken<List<EquipmentDTO>>() {}.getType());
    }
}
