package com.example.mysql_example.repo;

import com.example.mysql_example.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface EmployeeRepo extends JpaRepository<Employee, Long> {

List<Employee> deleteByDesignation(String designation);
Optional<Employee> findTopByDesignationOrderBySalaryDesc(String designation);
@Query("select e from Employee e ")
List<Employee> findAllEmployeesQuery();

@Query("select e from Employee e where e.active=:activeState and e.designation in :designationList")
List<Employee> findEmployeeByActiveAndDesignationQuery(@Param("activeState") Boolean activeState,
                                                       @Param("designation") List<String> designationList);

@Modifying
@Query("update Employee e set e.active= ?1 where e.id in ?2 ")
int updateEmployeeStatebyEmployeeId(Boolean activeState,List<Long> empList);



}
