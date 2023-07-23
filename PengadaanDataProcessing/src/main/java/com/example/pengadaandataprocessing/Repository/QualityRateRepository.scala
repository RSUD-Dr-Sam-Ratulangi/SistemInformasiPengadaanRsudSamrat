package com.example.pengadaandataprocessing.Repository

import com.example.pengadaandataprocessing.Model.QualityRate
import com.mongodb.client.model.Aggregates.limit
import org.springframework.data.mongodb.repository.{MongoRepository, Query}
import org.springframework.stereotype.Repository

@Repository
trait QualityRateRepository extends MongoRepository[QualityRate, String] {

  @Query(value = "{}", sort = "{ qualityRate : -1 }")
  def findTopNVendorsOrderByQualityRateDesc(limit: Int): Seq[QualityRate]


}

