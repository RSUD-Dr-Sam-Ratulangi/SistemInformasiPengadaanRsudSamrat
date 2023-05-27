package com.example.pengadaanrsudsamrat.users;

import com.example.pengadaanrsudsamrat.users.DTO.CreateEmployeeRequestDTO;
import com.example.pengadaanrsudsamrat.users.DTO.CreateEmployeeResponseDTO;
import com.example.pengadaanrsudsamrat.users.DTO.EmployeeRequestDTO;
import com.example.pengadaanrsudsamrat.users.DTO.EmployeeResponseDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public EmployeeServiceImpl(EmployeeRepository employeeRepository, ModelMapper modelMapper) {
        this.employeeRepository = employeeRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public EmployeeResponseDTO login(EmployeeRequestDTO employeeRequestDTO) {
        Optional<EmployeeModel> employeeModelOptional = employeeRepository.findByUsername(employeeRequestDTO.getUsername());
        if (employeeModelOptional.isPresent()) {
            EmployeeModel employeeModel = employeeModelOptional.get();
            if (employeeRequestDTO.getPassword().equals(employeeModel.getPassword())) {
                return modelMapper.map(employeeModel, EmployeeResponseDTO.class);
            }
        }
        return null;
    }

    @Override
    public CreateEmployeeResponseDTO createEmployee(CreateEmployeeRequestDTO createEmployeeRequestDTO) {
        EmployeeModel employeeModel = modelMapper.map(createEmployeeRequestDTO, EmployeeModel.class);
        employeeModel.setRole(createEmployeeRequestDTO.getRole());
        EmployeeModel savedEmployee = employeeRepository.save(employeeModel);
        return modelMapper.map(savedEmployee, CreateEmployeeResponseDTO.class);
    }

    @Override
    public List<CreateEmployeeResponseDTO> getAllEmployees() {
        List<EmployeeModel> employees = employeeRepository.findAll();
        return employees.stream()
                .map(employee -> modelMapper.map(employee, CreateEmployeeResponseDTO.class))
                .collect(Collectors.toList());
    }


    @Override
    public CreateEmployeeResponseDTO getEmployeeById(Long id) {
        Optional<EmployeeModel> employeeModel = employeeRepository.findById(id);
        return employeeModel.map(model -> modelMapper.map(model, CreateEmployeeResponseDTO.class))
                .orElse(null);
    }





}
