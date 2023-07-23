package com.example.pengadaandataprocessing.Repository


import com.example.pengadaandataprocessing.Model.StatusChange
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository

@Repository
trait StatusChangeRepository extends MongoRepository[StatusChange, String] {
  // You can define custom query methods here if needed
}
