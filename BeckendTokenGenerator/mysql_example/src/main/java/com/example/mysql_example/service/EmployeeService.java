package com.example.mysql_example.service;

import com.example.mysql_example.model.Employee;
import com.example.mysql_example.repo.EmployeeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class EmployeeService {

    @Autowired
    EmployeeRepo employeeRepo;
    public List<Employee> saveEmployeeData(List<Employee> employeeList) {

        return employeeRepo.saveAll(employeeList);
    }

    public List<Employee> getEmployee() {
        return employeeRepo.findAll();
    }

    public Optional<Employee> getEmployeeById(Long empId) {
        return employeeRepo.findById(empId);
    }

    public List<Employee> deleteEmployeeByDesignation(String designation) {

        return employeeRepo.deleteByDesignation(designation);

    }

    public Optional<Employee> getEmployeeByDesignation(String designation) {

        return employeeRepo.findTopByDesignationOrderBySalaryDesc(designation);

    }

    public Page<Employee> getEmployeePagination(Integer pageNumber, Integer pageSize, String sortProperty) {
        //Sort sort = Sort.by(Sort.Direction.ASC,"name");
        Pageable pageable = null;
        if(null != sortProperty){
             pageable = PageRequest.of(pageNumber,pageSize,Sort.Direction.ASC,sortProperty);
        }else {
             pageable = PageRequest.of(pageNumber,pageSize,Sort.Direction.ASC,"name");
        }

        return  employeeRepo.findAll(pageable);

    }

    public List<Employee> getEmployee2() {
        return employeeRepo.findAllEmployeesQuery();
    }

    public List<Employee> getEmployeesByActiveAndDesignation(Boolean activeState, List<String> designationList) {
        return employeeRepo.findEmployeeByActiveAndDesignationQuery(activeState, designationList);
    }

    public int updateEmployeeState(Boolean activeState, List<Long> empIdList) {
        return employeeRepo.updateEmployeeStatebyEmployeeId(activeState,empIdList);
    }

    public ResponseEntity<String> saveEmployees2(List<Employee> empData) {
     employeeRepo.saveAll(empData);
     return ResponseEntity.ok("data saved");

    }
}
