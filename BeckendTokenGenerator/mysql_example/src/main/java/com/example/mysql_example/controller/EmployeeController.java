package com.example.mysql_example.controller;


import com.example.mysql_example.model.Employee;
import com.example.mysql_example.service.EmployeeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController

public class EmployeeController {
    @Autowired
    EmployeeService employeeService;
    @PostMapping ("/saveEmployee")
    public List<Employee> saveEmployees(@RequestBody List<Employee> employeeList)
    {
        return  employeeService.saveEmployeeData(employeeList);
    }
    @GetMapping("/getEmployees")
    public List<Employee> getEmployees(){

        return employeeService.getEmployee();
    }

    @GetMapping("/getEmployeesById/{empId}")
    public Optional<Employee> getEmployees(@PathVariable Long empId){

        return employeeService.getEmployeeById(empId);
    }

    @DeleteMapping("/deleteEmployeesByDesignation/{designation}")
    public List<Employee> deleteEmployeeByDesignation(@PathVariable String designation){
        return  employeeService.deleteEmployeeByDesignation(designation);
    }

    @GetMapping("/getEmployeesByDesignation/{designation}")
    public Optional<Employee> getEmployeesByDesignation (@PathVariable String designation){

        return employeeService.getEmployeeByDesignation(designation);
    }

    @RequestMapping(value = "/pagingAndShortingEmployees/{pageNumber}/{pageSize}", method = RequestMethod.GET)
    public Page<Employee> employeePage(@PathVariable Integer pageNumber,
                                       @PathVariable Integer pageSize){
        return  employeeService.getEmployeePagination(pageNumber,pageSize, null);
    }

    @RequestMapping(value = "/pagingAndShortingEmployees/{pageNumber}/" +
            "{pageSize}/{sortProperty}", method = RequestMethod.GET)
    public Page<Employee> employeePage(@PathVariable Integer pageNumber,
                                       @PathVariable Integer pageSize,
                                       @PathVariable String sortProperty){
        return  employeeService.getEmployeePagination(pageNumber,
                pageSize,
                sortProperty);
    }

    @GetMapping("/getEmployees2")
    public List<Employee> getEmployees2(){
        return employeeService.getEmployee2();
    }

    @GetMapping("/getEmployeesByDesignationAndActive/{activeState}/{designationList}")
    public List<Employee> getEmployeesByDesignationAndActive(@PathVariable Boolean activeState,
                                                             @PathVariable List<String> designationList){


        return  employeeService.getEmployeesByActiveAndDesignation(activeState,designationList);


    }

    @PutMapping("/updateEmployeeState/{activeState}/{empIdList}")
    public int updateEmployeeState(@PathVariable Boolean activeState,
                                   @PathVariable List<Long> empIdList){
        return employeeService.updateEmployeeState(activeState,empIdList);
    }

    @PostMapping("/saveEmployee2")
    public ResponseEntity<String> saveEmployees2(@RequestBody List<Employee> empData){
        return employeeService.saveEmployees2(empData);
    }

}
