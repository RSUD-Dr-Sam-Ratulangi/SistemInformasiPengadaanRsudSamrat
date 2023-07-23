package com.example.pengadaandataprocessing.Service

import com.example.pengadaandataprocessing.Model.{QualityRate, StatusChange}
import com.example.pengadaandataprocessing.Repository.QualityRateRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class   QualityRateServiceImpl @Autowired()(qualityRateRepository: QualityRateRepository,
                                          qualityRateCalculator: QualityRateCalculator) extends QualityRateService {

  override def calculateAndSaveQualityRate(orderStatusData: List[StatusChange]): Unit = {
    // Convert StatusChange objects to QualityRate objects using the com.example.pengadaandataprocessing.Service.QualityRateCalculator
    val qualityRates = qualityRateCalculator.calculateQualityRate(orderStatusData)

    // Save the calculated quality rates to MongoDB using QualityRateRepository
    qualityRates.foreach(qualityRate => qualityRateRepository.save(qualityRate))
  }

  override def getTopVendors(numVendors: Int): List[QualityRate] = {
    qualityRateRepository.findTopNVendorsOrderByQualityRateDesc(numVendors).toList
  }

}
