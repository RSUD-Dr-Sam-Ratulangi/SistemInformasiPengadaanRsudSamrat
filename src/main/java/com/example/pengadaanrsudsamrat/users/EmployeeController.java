package com.example.pengadaanrsudsamrat.users;

import com.example.pengadaanrsudsamrat.users.DTO.CreateEmployeeRequestDTO;
import com.example.pengadaanrsudsamrat.users.DTO.CreateEmployeeResponseDTO;
import com.example.pengadaanrsudsamrat.users.DTO.EmployeeRequestDTO;
import com.example.pengadaanrsudsamrat.users.DTO.EmployeeResponseDTO;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/employee")
public class EmployeeController {

    private final EmployeeService employeeService;


    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;

    }

    @PostMapping("/login")
    public ResponseEntity<EmployeeResponseDTO> login(@RequestBody EmployeeRequestDTO employeeRequestDTO) {
        EmployeeResponseDTO employeeResponseDTO = employeeService.login(employeeRequestDTO);
        if (employeeResponseDTO != null) {
            return ResponseEntity.ok(employeeResponseDTO);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping
    public ResponseEntity<CreateEmployeeResponseDTO> createEmployee(@RequestBody CreateEmployeeRequestDTO createEmployeeRequestDTO) {
        CreateEmployeeResponseDTO createdEmployee = employeeService.createEmployee(createEmployeeRequestDTO);
        return new ResponseEntity<>(createdEmployee, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<CreateEmployeeResponseDTO>> getAllEmployees() {
        List<CreateEmployeeResponseDTO> employees = employeeService.getAllEmployees();
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }

    @GetMapping("/{employeeId}")
    public ResponseEntity<CreateEmployeeResponseDTO> getEmployee(@PathVariable Long employeeId) {
        CreateEmployeeResponseDTO employee = employeeService.getEmployeeById(employeeId);
        return ResponseEntity.ok().body(employee);
    }


}

